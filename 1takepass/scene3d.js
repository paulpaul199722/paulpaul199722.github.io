// 1TakePass — Interactive 3D HK Automatic (1A) Driving Simulator & Question Visualizer
// Built with Three.js r186 following CloudAI-X/threejs-skills
// Single shared WebGLRenderer cleanly reparented across Home / Quiz / Summary views.
// Every single question dynamically stages a matching 3D HK driving scenario & live maneuver reaction.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

(() => {
  "use strict";

  const shell = document.getElementById("stage-3d-shell");
  const viewport = document.getElementById("stage-3d-viewport");
  if (!shell || !viewport) return;

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isDarkTheme = () => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark") return true;
    if (attr === "light") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  // ==================== RENDERER & SCENE ====================
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false
    });
  } catch (err) {
    console.warn("WebGL unavailable; 3D stage disabled gracefully:", err);
    shell.hidden = true;
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = "stage-3d-canvas";
  renderer.domElement.setAttribute("aria-label", "互動 3D 香港自動波 P 牌私家車實境駕駛場景");
  viewport.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const bgColor = new THREE.Color(isDarkTheme() ? 0x0f1724 : 0xeaf3fb);
  scene.background = bgColor;
  const fog = new THREE.Fog(bgColor.getHex(), 14, 34);
  scene.fog = fog;

  // Studio environment reflections via PMREM + RoomEnvironment (threejs-lighting)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envRT = pmrem.fromScene(roomEnv, 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = isDarkTheme() ? 0.42 : 0.72;
  roomEnv.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 80);
  camera.position.set(3.4, 2.25, 4.9);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.minAzimuthAngle = -Math.PI * 0.48;
  controls.maxAzimuthAngle = Math.PI * 0.48;
  controls.target.set(0, 0.55, -0.3);
  controls.update();

  // Master world group (tilts cleanly for uphill / downhill slope scenarios!)
  const worldPivot = new THREE.Group();
  scene.add(worldPivot);

  // ==================== LIGHTING ====================
  const hemiLight = new THREE.HemisphereLight(0xd4ecff, 0x6f8478, 0.9);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff7e8, 2.5);
  sunLight.position.set(6, 9, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.left = -8;
  sunLight.shadow.camera.right = 8;
  sunLight.shadow.camera.top = 8;
  sunLight.shadow.camera.bottom = -8;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 28;
  sunLight.shadow.normalBias = 0.025;
  sunLight.shadow.bias = -0.0002;
  sunLight.shadow.intensity = 0.52;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x6eb5ff, 0.7);
  rimLight.position.set(-5, 4, -6);
  scene.add(rimLight);

  // ==================== CANVAS TEXTURES (SRGBColorSpace) ====================
  function makeCanvasTexture(width, height, drawFn) {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const ctx = c.getContext("2d");
    drawFn(ctx, width, height);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return tex;
  }

  const pPlateTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#d0d5dd";
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, w - 6, h - 6);
    ctx.fillStyle = "#e11d24";
    ctx.font = "900 94px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P", w / 2, h / 2 + 5);
  });

  const makePlateTex = (bg) =>
    makeCanvasTexture(256, 72, (ctx, w, h) => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#181d26";
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, w - 6, h - 6);
      ctx.fillStyle = "#111622";
      ctx.font = "900 42px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("1TAKE", w / 2, h / 2 + 2);
    });

  const frontPlateTex = makePlateTex("#f8fafc");
  const rearPlateTex = makePlateTex("#facc15");

  const gantrySignTex = makeCanvasTexture(512, 144, (ctx, w, h) => {
    ctx.fillStyle = "#007a4d";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(28, 30, 74, 84, 14);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.font = "900 44px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1A", 65, 74);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.font = "800 38px 'Noto Sans TC', system-ui, sans-serif";
    ctx.fillText("1TakePass 快速公路", 122, 58);
    ctx.font = "700 24px system-ui, sans-serif";
    ctx.fillStyle = "#d1fae5";
    ctx.fillText("HK AUTOMATIC · PASS ≥ 16/20", 122, 102);
  });

  const makeLaneSignalTex = (kind) =>
    makeCanvasTexture(96, 96, (ctx, w, h) => {
      ctx.fillStyle = "#141b24";
      ctx.fillRect(0, 0, w, h);
      if (kind === "cross") {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(22, 22); ctx.lineTo(74, 74);
        ctx.moveTo(74, 22); ctx.lineTo(22, 74);
        ctx.stroke();
      } else if (kind === "merge_left") {
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 11;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(72, 24); ctx.lineTo(26, 70);
        ctx.moveTo(26, 44); ctx.lineTo(26, 70); ctx.lineTo(52, 70);
        ctx.stroke();
      } else {
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.moveTo(w / 2, 78);
        ctx.lineTo(22, 46); ctx.lineTo(38, 46); ctx.lineTo(38, 18);
        ctx.lineTo(58, 18); ctx.lineTo(58, 46); ctx.lineTo(74, 46);
        ctx.closePath();
        ctx.fill();
      }
    });

  const laneArrowTex = makeLaneSignalTex("down");
  const laneCrossTex = makeLaneSignalTex("cross");
  const laneMergeTex = makeLaneSignalTex("merge_left");

  const yellowBoxTex = makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#353c48";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.lineWidth = 7;
    for (let i = -w; i <= w * 2; i += 44) {
      ctx.beginPath(); ctx.moveTo(i, 8); ctx.lineTo(i + h, h - 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i, h - 8); ctx.lineTo(i + h, 8); ctx.stroke();
    }
  });

  const zebraTex = makeCanvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = "#353c48";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#f8fafc";
    for (let x = 14; x < w - 14; x += 34) {
      ctx.fillRect(x, 14, 18, h - 28);
    }
  });

  const greenArrowLampTex = makeCanvasTexture(96, 96, (ctx, w, h) => {
    ctx.fillStyle = "#0b1a14";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.moveTo(18, 48); ctx.lineTo(48, 22); ctx.lineTo(48, 38);
    ctx.lineTo(78, 38); ctx.lineTo(78, 58); ctx.lineTo(48, 58); ctx.lineTo(48, 74);
    ctx.closePath();
    ctx.fill();
  });

  const contactShadowTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    grad.addColorStop(0, "rgba(10, 16, 28, 0.55)");
    grad.addColorStop(0.55, "rgba(10, 16, 28, 0.25)");
    grad.addColorStop(1, "rgba(10, 16, 28, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  // Official PDF Sign Texture Cache for 3D Roadside Signpost!
  const textureLoader = new THREE.TextureLoader();
  const signTexCache = new Map();

  // ==================== SHARED MATERIALS ====================
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x353c48, roughness: 0.9, metalness: 0.04 });
  const vergeMat = new THREE.MeshStandardMaterial({ color: 0x3d8b63, roughness: 0.95 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xcbd2da, roughness: 0.78 });
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
  const edgeLineMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f9, roughness: 0.55 });
  const doubleYellowMat = new THREE.MeshStandardMaterial({ color: 0xf5b700, roughness: 0.5 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x9aa5b4, roughness: 0.45, metalness: 0.55 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e2530, roughness: 0.55, metalness: 0.4 });
  const lampHeadMat = new THREE.MeshStandardMaterial({
    color: 0xfff3d1,
    emissive: 0xffd580,
    emissiveIntensity: 0.35,
    roughness: 0.25
  });
  const coneOrangeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.55 });
  const coneStripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x1e6f4a, roughness: 0.85 });
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.9 });

  // Authentic HK Road Users' Code p.62 cat's-eye studs
  const studRedMat = new THREE.MeshStandardMaterial({ color: 0xe11d24, emissive: 0xe11d24, emissiveIntensity: 0.25, roughness: 0.3 });
  const studWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.3 });
  const studAmberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.3 });

  // ==================== ROAD & EXPRESSWAY ====================
  const roadWidth = 4.6;
  const roadLen = 46;

  const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, roadLen), roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.set(0, 0, -8);
  roadMesh.receiveShadow = true;
  roadMesh.matrixAutoUpdate = false;
  roadMesh.updateMatrix();
  worldPivot.add(roadMesh);

  const vergeGeo = new THREE.PlaneGeometry(24, roadLen);
  const leftVerge = new THREE.Mesh(vergeGeo, vergeMat);
  leftVerge.rotation.x = -Math.PI / 2;
  leftVerge.position.set(-roadWidth / 2 - 12.15, -0.02, -8);
  leftVerge.receiveShadow = true;
  leftVerge.matrixAutoUpdate = false;
  leftVerge.updateMatrix();
  worldPivot.add(leftVerge);

  const rightVerge = new THREE.Mesh(vergeGeo, vergeMat);
  rightVerge.rotation.x = -Math.PI / 2;
  rightVerge.position.set(roadWidth / 2 + 12.15, -0.02, -8);
  rightVerge.receiveShadow = true;
  rightVerge.matrixAutoUpdate = false;
  rightVerge.updateMatrix();
  worldPivot.add(rightVerge);

  const curbGeo = new THREE.BoxGeometry(0.28, 0.14, roadLen);
  const leftCurb = new THREE.Mesh(curbGeo, curbMat);
  leftCurb.position.set(-roadWidth / 2 - 0.14, 0.06, -8);
  leftCurb.receiveShadow = true;
  worldPivot.add(leftCurb);

  const rightCurb = new THREE.Mesh(curbGeo, curbMat);
  rightCurb.position.set(roadWidth / 2 + 0.14, 0.06, -8);
  rightCurb.receiveShadow = true;
  worldPivot.add(rightCurb);

  const edgeLineGeo = new THREE.PlaneGeometry(0.08, roadLen);
  [-roadWidth / 2 + 0.22, roadWidth / 2 - 0.22].forEach((lx) => {
    const line = new THREE.Mesh(edgeLineGeo, edgeLineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(lx, 0.005, -8);
    line.matrixAutoUpdate = false;
    line.updateMatrix();
    worldPivot.add(line);
  });

  // Curb yellow lines (prominently emphasized in parking/no-stopping scenarios!)
  const curbYellow1 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadLen), doubleYellowMat);
  curbYellow1.rotation.x = -Math.PI / 2;
  curbYellow1.position.set(-roadWidth / 2 + 0.07, 0.007, -8);
  worldPivot.add(curbYellow1);

  const curbYellow2 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadLen), doubleYellowMat);
  curbYellow2.rotation.x = -Math.PI / 2;
  curbYellow2.position.set(-roadWidth / 2 + 0.2, 0.007, -8);
  curbYellow2.visible = false;
  worldPivot.add(curbYellow2);

  // Instanced scrolling center dashes + HK cat's-eye studs
  const DASH_COUNT = 18;
  const DASH_STEP = 2.4;
  const dashGeo = new THREE.PlaneGeometry(0.11, 1.05);
  dashGeo.rotateX(-Math.PI / 2);
  const dashInst = new THREE.InstancedMesh(dashGeo, dashMat, DASH_COUNT);
  dashInst.frustumCulled = false;
  worldPivot.add(dashInst);

  const studGeo = new THREE.BoxGeometry(0.1, 0.028, 0.14);
  const studsLeft = new THREE.InstancedMesh(studGeo, studRedMat, DASH_COUNT);
  const studsMid = new THREE.InstancedMesh(studGeo, studWhiteMat, DASH_COUNT);
  const studsRight = new THREE.InstancedMesh(studGeo, studAmberMat, DASH_COUNT);
  [studsLeft, studsMid, studsRight].forEach((m) => {
    m.frustumCulled = false;
    worldPivot.add(m);
  });

  // Scrolling roadside street lamps + safety cones + trees
  const PROP_COUNT = 6;
  const PROP_SPAN = 36;
  const roadsideProps = [];
  const poleGeo = new THREE.CylinderGeometry(0.045, 0.06, 2.7, 8);
  const armGeo = new THREE.BoxGeometry(0.65, 0.05, 0.05);
  const bulbGeo = new THREE.BoxGeometry(0.24, 0.06, 0.12);
  const coneBaseGeo = new THREE.BoxGeometry(0.24, 0.04, 0.24);
  const coneBodyGeo = new THREE.ConeGeometry(0.1, 0.34, 12);
  const coneBandGeo = new THREE.CylinderGeometry(0.052, 0.072, 0.09, 12);
  const treeConeGeo = new THREE.ConeGeometry(0.55, 1.35, 7);
  const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.13, 0.45, 7);

  for (let i = 0; i < PROP_COUNT; i++) {
    const pair = new THREE.Group();
    const zBase = -i * (PROP_SPAN / PROP_COUNT) + 4;

    const lampL = new THREE.Group();
    const pL = new THREE.Mesh(poleGeo, poleMat); pL.position.y = 1.35; pL.castShadow = true;
    const aL = new THREE.Mesh(armGeo, poleMat); aL.position.set(0.3, 2.66, 0);
    const bL = new THREE.Mesh(bulbGeo, lampHeadMat); bL.position.set(0.55, 2.62, 0);
    lampL.add(pL, aL, bL);
    lampL.position.set(-roadWidth / 2 - 0.55, 0, 0);
    pair.add(lampL);

    const lampR = new THREE.Group();
    const pR = new THREE.Mesh(poleGeo, poleMat); pR.position.y = 1.35; pR.castShadow = true;
    const aR = new THREE.Mesh(armGeo, poleMat); aR.position.set(-0.3, 2.66, 0);
    const bR = new THREE.Mesh(bulbGeo, lampHeadMat); bR.position.set(-0.55, 2.62, 0);
    lampR.add(pR, aR, bR);
    lampR.position.set(roadWidth / 2 + 0.55, 0, -2.5);
    pair.add(lampR);

    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat); trunk.position.y = 0.22;
    const foliage = new THREE.Mesh(treeConeGeo, treeFoliageMat); foliage.position.y = 1.05; foliage.castShadow = true;
    tree.add(trunk, foliage);
    const side = i % 2 === 0 ? -1 : 1;
    tree.position.set(side * (roadWidth / 2 + 1.85 + (i % 3) * 0.45), 0, -1.2);
    tree.scale.setScalar(0.85 + (i % 3) * 0.14);
    pair.add(tree);

    pair.position.z = zBase;
    worldPivot.add(pair);
    roadsideProps.push(pair);
  }

  // Overhead HK Expressway Green Gantry
  const gantry = new THREE.Group();
  const gantryPillarGeo = new THREE.BoxGeometry(0.18, 2.7, 0.18);
  const gpL = new THREE.Mesh(gantryPillarGeo, poleMat); gpL.position.set(-roadWidth / 2 - 0.5, 1.35, 0); gpL.castShadow = true;
  const gpR = new THREE.Mesh(gantryPillarGeo, poleMat); gpR.position.set(roadWidth / 2 + 0.5, 1.35, 0); gpR.castShadow = true;
  const gBeam = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 1.2, 0.16, 0.16), poleMat); gBeam.position.set(0, 2.62, 0);

  const gantryBoardMat = new THREE.MeshStandardMaterial({
    map: gantrySignTex, roughness: 0.38, metalness: 0.05, emissive: 0x003d25, emissiveIntensity: 0.22
  });
  const gBoard = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.92, 0.08), [
    poleMat, poleMat, poleMat, poleMat, gantryBoardMat, gantryBoardMat
  ]);
  gBoard.position.set(0, 2.55, 0.08);
  gBoard.castShadow = true;

  const laneSignalLeftMat = new THREE.MeshStandardMaterial({
    map: laneArrowTex, emissive: 0x10b981, emissiveMap: laneArrowTex, emissiveIntensity: 0.85, roughness: 0.3
  });
  const laneSignalRightMat = new THREE.MeshStandardMaterial({
    map: laneArrowTex, emissive: 0x10b981, emissiveMap: laneArrowTex, emissiveIntensity: 0.85, roughness: 0.3
  });
  const sigGeo = new THREE.BoxGeometry(0.42, 0.42, 0.12);
  const sigL = new THREE.Mesh(sigGeo, [poleMat, poleMat, poleMat, poleMat, laneSignalLeftMat, poleMat]);
  sigL.position.set(-1.05, 1.9, 0.06);
  const sigR = new THREE.Mesh(sigGeo, [poleMat, poleMat, poleMat, poleMat, laneSignalRightMat, poleMat]);
  sigR.position.set(1.05, 1.9, 0.06);

  gantry.add(gpL, gpR, gBeam, gBoard, sigL, sigR);
  gantry.position.set(0, 0, -10.5);
  worldPivot.add(gantry);

  // ==================== QUESTION-SPECIFIC 3D SCENARIO PROPS (ZERO-ALLOC POOL) ====================
  const scenarioRoot = new THREE.Group();
  worldPivot.add(scenarioRoot);

  // 1. 3D Traffic Light + Optional Left Green Arrow + Wigwag Twin Red Flashers + Independent Stop Line
  const trafficGroup = new THREE.Group();
  trafficGroup.visible = false;
  const tlAssembly = new THREE.Group();
  // Planted properly OUTSIDE the left curb on the pavement (curb ends at x = -2.58)
  tlAssembly.position.set(-2.82, 0, -3.5);
  tlAssembly.rotation.y = 0.08;

  const tlPost = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 2.25, 10), darkMetalMat);
  tlPost.position.set(0, 1.12, 0);
  tlPost.castShadow = true;
  const tlHead = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.95, 0.28), darkMetalMat);
  tlHead.position.set(0, 2.02, 0);
  tlHead.castShadow = true;

  const tlRedMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, emissive: 0xef4444, emissiveIntensity: 0.05, roughness: 0.2 });
  const tlAmberMat = new THREE.MeshStandardMaterial({ color: 0x451a03, emissive: 0xf59e0b, emissiveIntensity: 0.05, roughness: 0.2 });
  const tlGreenMat = new THREE.MeshStandardMaterial({ color: 0x052e16, emissive: 0x10b981, emissiveIntensity: 0.05, roughness: 0.2 });
  const tlLensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.05, 16);
  tlLensGeo.rotateX(Math.PI / 2);

  const tlRed = new THREE.Mesh(tlLensGeo, tlRedMat); tlRed.position.set(0, 2.31, 0.15);
  const tlAmber = new THREE.Mesh(tlLensGeo, tlAmberMat); tlAmber.position.set(0, 2.02, 0.15);
  const tlGreen = new THREE.Mesh(tlLensGeo, tlGreenMat); tlGreen.position.set(0, 1.73, 0.15);

  const tlArrowBox = new THREE.Group();
  tlArrowBox.visible = false;
  const arrowHousing = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.24), darkMetalMat);
  arrowHousing.position.set(-0.37, 1.73, 0);
  const arrowFaceMat = new THREE.MeshStandardMaterial({
    map: greenArrowLampTex, emissive: 0x10b981, emissiveMap: greenArrowLampTex, emissiveIntensity: 1.8, roughness: 0.2
  });
  const arrowFace = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.28), arrowFaceMat);
  arrowFace.position.set(-0.37, 1.73, 0.125);
  tlArrowBox.add(arrowHousing, arrowFace);

  // Twin wigwag alternating red warning lights (fire station exit)
  const wigwagBox = new THREE.Group();
  wigwagBox.visible = false;
  const wwHousing = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.36, 0.22), darkMetalMat);
  wwHousing.position.set(0.12, 1.95, 0);
  const wwLeftMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, emissive: 0xef4444, emissiveIntensity: 0.1, roughness: 0.2 });
  const wwRightMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, emissive: 0xef4444, emissiveIntensity: 0.1, roughness: 0.2 });
  const wwL = new THREE.Mesh(tlLensGeo, wwLeftMat); wwL.position.set(-0.06, 1.95, 0.12);
  const wwR = new THREE.Mesh(tlLensGeo, wwRightMat); wwR.position.set(0.3, 1.95, 0.12);
  wigwagBox.add(wwHousing, wwL, wwR);

  tlAssembly.add(tlPost, tlHead, tlRed, tlAmber, tlGreen, tlArrowBox, wigwagBox);
  trafficGroup.add(tlAssembly);
  scenarioRoot.add(trafficGroup);

  // Independent white stop line across the road (used by traffic lights AND stop_oct!)
  const stopLineMesh = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth - 0.5, 0.24), edgeLineMat);
  stopLineMesh.rotation.x = -Math.PI / 2;
  stopLineMesh.position.set(0, 0.012, -1.95);
  stopLineMesh.visible = false;
  scenarioRoot.add(stopLineMesh);

  // 2. 3D Roadside Official PDF Signpost (planted outside curb on left pavement; scrolls with road when moving!)
  const signPostGroup = new THREE.Group();
  signPostGroup.visible = false;
  const spPoleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.5 });
  const spBase = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.12, 10), curbMat);
  spBase.position.set(0, 0.06, 0);
  const spPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.92, 10), spPoleMat);
  spPole.position.set(0, 0.96, 0);
  spPole.castShadow = true;
  const spBackMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.45, metalness: 0.35 });
  const spFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32, metalness: 0.02 });
  const spBoard = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.045), [
    spBackMat, spBackMat, spBackMat, spBackMat, spFaceMat, spBackMat
  ]);
  spBoard.position.set(0, 1.66, 0.03);
  spBoard.castShadow = true;
  signPostGroup.add(spBase, spPole, spBoard);
  signPostGroup.position.set(-2.95, 0, -7.2);
  signPostGroup.rotation.y = 0.12;
  scenarioRoot.add(signPostGroup);

  // 3. 3D Zebra Crossing + Glowing Belisha Beacons + Animated Pedestrian
  const zebraGroup = new THREE.Group();
  zebraGroup.visible = false;
  const zebraMat = new THREE.MeshStandardMaterial({ map: zebraTex, roughness: 0.85 });
  const zebraRoad = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth - 0.4, 1.55), zebraMat);
  zebraRoad.rotation.x = -Math.PI / 2;
  zebraRoad.position.set(0, 0.012, -3.15);

  const beaconGlowMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.4, roughness: 0.25
  });
  [-2.82, 2.82].forEach((bx) => {
    const bp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 1.85, 8), darkMetalMat);
    bp.position.set(bx, 0.92, -3.15);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), beaconGlowMat);
    globe.position.set(bx, 1.94, -3.15);
    zebraGroup.add(bp, globe);
  });

  // Stylized 3D Pedestrian walking across zebra
  const pedGroup = new THREE.Group();
  const pedBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.14, 0.36, 6, 10),
    new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.7 })
  );
  pedBody.position.y = 0.54;
  pedBody.castShadow = true;
  const pedHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0xf6c9a5, roughness: 0.65 })
  );
  pedHead.position.y = 0.96;
  pedHead.castShadow = true;
  pedGroup.add(pedBody, pedHead);
  pedGroup.position.set(-1.3, 0, -3.15);
  zebraGroup.add(zebraRoad, pedGroup);
  scenarioRoot.add(zebraGroup);

  // 4. 3D Yellow Box Junction + Tram/LRT Rails
  const yellowBoxGroup = new THREE.Group();
  yellowBoxGroup.visible = false;
  const ybMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth - 0.55, 3.2),
    new THREE.MeshStandardMaterial({ map: yellowBoxTex, roughness: 0.82 })
  );
  ybMesh.rotation.x = -Math.PI / 2;
  ybMesh.position.set(0, 0.011, -3.2);
  yellowBoxGroup.add(ybMesh);

  const railGroup = new THREE.Group();
  const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.8 });
  [-0.36, 0.36].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.025, 16), railMat);
    rail.position.set(rx, 0.016, -4.5);
    railGroup.add(rail);
  });
  yellowBoxGroup.add(railGroup);
  scenarioRoot.add(yellowBoxGroup);

  // 5. 3D Double White Lines (solid-solid OR broken on left side)
  const doubleWhiteGroup = new THREE.Group();
  doubleWhiteGroup.visible = false;
  const dwRightSolid = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 26), edgeLineMat);
  dwRightSolid.rotation.x = -Math.PI / 2;
  dwRightSolid.position.set(0.1, 0.013, -6);
  const dwLeftSolid = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 26), edgeLineMat);
  dwLeftSolid.rotation.x = -Math.PI / 2;
  dwLeftSolid.position.set(-0.1, 0.013, -6);
  const dwLeftBroken = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 1.0), edgeLineMat);
    seg.rotation.x = -Math.PI / 2;
    seg.position.set(-0.1, 0.013, 4 - i * 2.1);
    dwLeftBroken.add(seg);
  }
  doubleWhiteGroup.add(dwRightSolid, dwLeftSolid, dwLeftBroken);
  scenarioRoot.add(doubleWhiteGroup);

  // 6. 3D Roadworks Truck + Flashing Amber Matrix Board + Safety Cones
  const roadworksGroup = new THREE.Group();
  roadworksGroup.visible = false;
  const rwTruck = new THREE.Group();
  const rwCab = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.95, 1.9),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.42, metalness: 0.15 })
  );
  rwCab.position.set(0, 0.68, 0);
  rwCab.castShadow = true;
  const rwBoardBack = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.72, 0.1), darkMetalMat);
  rwBoardBack.position.set(0, 1.52, 0.92);
  rwTruck.add(rwCab, rwBoardBack);

  const rwLampGeo = new THREE.SphereGeometry(0.075, 10, 8);
  const rwLampMatA = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 2.0 });
  const rwLampMatB = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.2 });
  const rwTL = new THREE.Mesh(rwLampGeo, rwLampMatA); rwTL.position.set(-0.36, 1.72, 0.99);
  const rwBR = new THREE.Mesh(rwLampGeo, rwLampMatA); rwBR.position.set(0.36, 1.32, 0.99);
  const rwTR = new THREE.Mesh(rwLampGeo, rwLampMatB); rwTR.position.set(0.36, 1.72, 0.99);
  const rwBL = new THREE.Mesh(rwLampGeo, rwLampMatB); rwBL.position.set(-0.36, 1.32, 0.99);
  rwTruck.add(rwTL, rwBR, rwTR, rwBL);
  rwTruck.position.set(1.05, 0, -4.6);
  roadworksGroup.add(rwTruck);

  for (let i = 0; i < 4; i++) {
    const c = new THREE.Group();
    const cb = new THREE.Mesh(coneBaseGeo, coneOrangeMat); cb.position.y = 0.02;
    const co = new THREE.Mesh(coneBodyGeo, coneOrangeMat); co.position.y = 0.2; co.castShadow = true;
    const cs = new THREE.Mesh(coneBandGeo, coneStripeMat); cs.position.y = 0.22;
    c.add(cb, co, cs);
    c.position.set(0.28 + i * 0.25, 0, -2.2 - i * 0.65);
    roadworksGroup.add(c);
  }
  scenarioRoot.add(roadworksGroup);

  // 7. 3D HK Ambulance (Flashing Red/Blue Lightbar!) + Breakdown Warning Triangle
  const emergencyGroup = new THREE.Group();
  emergencyGroup.visible = false;
  const ambGroup = new THREE.Group();
  const ambBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.12, 0.96, 2.35),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.25, clearcoat: 0.8 })
  );
  ambBody.position.y = 0.68;
  ambBody.castShadow = true;
  const ambStripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.14, 0.16, 2.37),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 })
  );
  ambStripe.position.y = 0.56;
  const ambBlueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, emissive: 0x3b82f6, emissiveIntensity: 2.5 });
  const ambRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, emissive: 0xef4444, emissiveIntensity: 2.5 });
  const ambLightL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.18), ambRedMat);
  ambLightL.position.set(-0.22, 1.24, -0.45);
  const ambLightR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.18), ambBlueMat);
  ambLightR.position.set(0.22, 1.24, -0.45);
  ambGroup.add(ambBody, ambStripe, ambLightL, ambLightR);
  ambGroup.position.set(1.05, 0, -5.5);
  emergencyGroup.add(ambGroup);
  scenarioRoot.add(emergencyGroup);

  // 8. 3D HK Double-Decker Bus (for Bus Lane & Heavy Vehicle questions!)
  const busGroup = new THREE.Group();
  busGroup.visible = false;
  const busBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.22, 1.65, 3.6),
    new THREE.MeshPhysicalMaterial({ color: 0xb91c1c, roughness: 0.32, clearcoat: 0.7 })
  );
  busBody.position.y = 1.02;
  busBody.castShadow = true;
  const busBand = new THREE.Mesh(
    new THREE.BoxGeometry(1.24, 0.24, 3.62),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
  );
  busBand.position.y = 0.96;
  const busGlass = new THREE.Mesh(
    new THREE.BoxGeometry(1.235, 0.42, 3.2),
    new THREE.MeshStandardMaterial({ color: 0x182230, roughness: 0.15 })
  );
  busGlass.position.y = 1.48;
  busGroup.add(busBody, busBand, busGlass);
  busGroup.position.set(-1.05, 0, -5.8);
  scenarioRoot.add(busGroup);

  // 9. 3D NPC Lead Vehicle (for Overtaking / Following Distance / 2-Second Rule!)
  const npcCarGroup = new THREE.Group();
  npcCarGroup.visible = false;
  const npcBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.36, 2.05),
    new THREE.MeshPhysicalMaterial({ color: 0xe2e8f0, roughness: 0.28, metalness: 0.2, clearcoat: 0.85 })
  );
  npcBody.position.y = 0.38;
  npcBody.castShadow = true;
  const npcCabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 0.32, 1.05),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.15 })
  );
  npcCabin.position.set(0, 0.7, 0.06);
  const npcTailMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, emissive: 0xef4444, emissiveIntensity: 1.1 });
  [-0.34, 0.34].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), npcTailMat);
    tl.position.set(tx, 0.42, 1.04);
    npcCarGroup.add(tl);
  });
  npcCarGroup.add(npcBody, npcCabin);
  npcCarGroup.position.set(-1.05, 0, -4.6);
  scenarioRoot.add(npcCarGroup);

  // 10. 3D Roundabout Central Island (positioned clearly ahead of yield line!)
  const roundaboutGroup = new THREE.Group();
  roundaboutGroup.visible = false;
  const rbIsland = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.6, 0.24, 28),
    new THREE.MeshStandardMaterial({ color: 0x2d7d57, roughness: 0.9 })
  );
  rbIsland.position.set(0, 0.12, -6.2);
  rbIsland.receiveShadow = true;
  const rbCurb = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.08, 10, 32), curbMat);
  rbCurb.rotation.x = Math.PI / 2;
  rbCurb.position.set(0, 0.08, -6.2);
  roundaboutGroup.add(rbIsland, rbCurb);
  scenarioRoot.add(roundaboutGroup);

  // 11. 3D Tunnel Arch Portal (for Tunnel & Overhead Lane Signal questions!)
  const tunnelGroup = new THREE.Group();
  tunnelGroup.visible = false;
  const tunnelWallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
  const tunRoof = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 1.4, 0.35, 14), tunnelWallMat);
  tunRoof.position.set(0, 3.05, -8.5);
  const tunWallL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.1, 14), tunnelWallMat);
  tunWallL.position.set(-roadWidth / 2 - 0.55, 1.55, -8.5);
  const tunWallR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.1, 14), tunnelWallMat);
  tunWallR.position.set(roadWidth / 2 + 0.55, 1.55, -8.5);
  tunnelGroup.add(tunRoof, tunWallL, tunWallR);
  scenarioRoot.add(tunnelGroup);

  // 12. 3D Rain Streaks (InstancedMesh — active only in Rain / Wet / Typhoon questions!)
  const RAIN_COUNT = 75;
  const rainGeo = new THREE.BoxGeometry(0.018, 0.42, 0.018);
  const rainMat = new THREE.MeshBasicMaterial({ color: 0xcbe4ff, transparent: true, opacity: 0.55 });
  const rainInst = new THREE.InstancedMesh(rainGeo, rainMat, RAIN_COUNT);
  rainInst.visible = false;
  rainInst.frustumCulled = false;
  scene.add(rainInst);
  const rainDrops = Array.from({ length: RAIN_COUNT }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: Math.random() * 5 + 0.5,
    z: (Math.random() - 0.5) * 12 - 2,
    spd: 7 + Math.random() * 4
  }));

  // ==================== HERO 3D HK 1A PRIVATE CAR ====================
  const carRoot = new THREE.Group();
  const carBodyGroup = new THREE.Group();
  carRoot.add(carBodyGroup);
  worldPivot.add(carRoot);

  const paintMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b67c7, roughness: 0.22, metalness: 0.24, clearcoat: 1.0, clearcoatRoughness: 0.09
  });
  const roofMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7fb, roughness: 0.26, metalness: 0.08, clearcoat: 0.9, clearcoatRoughness: 0.12
  });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x1f2733, roughness: 0.65, metalness: 0.25 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a2636, roughness: 0.08, metalness: 0.18, clearcoat: 1.0, clearcoatRoughness: 0.05
  });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.22, metalness: 0.85 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x191d24, roughness: 0.88, metalness: 0.05 });

  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, emissive: 0xfff3c4, emissiveIntensity: 0.7, roughness: 0.15 });
  const brakeLightMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, emissive: 0xef4444, emissiveIntensity: 0.35, roughness: 0.2 });
  const reverseLightMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: 0xffffff, emissiveIntensity: 0.0, roughness: 0.2 });
  const blinkerLeftMat = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.1, roughness: 0.25 });
  const blinkerRightMat = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.1, roughness: 0.25 });

  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.34, 2.24), paintMat);
  lowerBody.position.set(0, 0.37, 0);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  carBodyGroup.add(lowerBody);

  const bumperFront = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.15, 0.16), trimMat);
  bumperFront.position.set(0, 0.25, -1.12);
  bumperFront.castShadow = true;
  const bumperRear = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.16, 0.16), trimMat);
  bumperRear.position.set(0, 0.25, 1.12);
  bumperRear.castShadow = true;
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.04), chromeMat);
  grille.position.set(0, 0.36, -1.13);
  carBodyGroup.add(bumperFront, bumperRear, grille);

  const cabinGlass = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 1.18), glassMat);
  cabinGlass.position.set(0, 0.7, 0.08);
  cabinGlass.castShadow = true;
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 1.08), roofMat);
  cabinRoof.position.set(0, 0.89, 0.1);
  cabinRoof.castShadow = true;
  carBodyGroup.add(cabinGlass, cabinRoof);

  const mirrorGeo = new THREE.BoxGeometry(0.14, 0.08, 0.1);
  [-0.56, 0.56].forEach((mx) => {
    const mirror = new THREE.Mesh(mirrorGeo, paintMat);
    mirror.position.set(mx, 0.58, -0.34);
    mirror.castShadow = true;
    carBodyGroup.add(mirror);
  });

  const lampGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05);
  const smallLampGeo = new THREE.BoxGeometry(0.11, 0.08, 0.05);

  [-0.36, 0.36].forEach((lx) => {
    const hl = new THREE.Mesh(lampGeo, headlightMat); hl.position.set(lx, 0.4, -1.12);
    const tl = new THREE.Mesh(lampGeo, brakeLightMat); tl.position.set(lx, 0.42, 1.12);
    carBodyGroup.add(hl, tl);
  });
  [-0.18, 0.18].forEach((lx) => {
    const rl = new THREE.Mesh(smallLampGeo, reverseLightMat); rl.position.set(lx, 0.42, 1.125);
    carBodyGroup.add(rl);
  });

  const blFL = new THREE.Mesh(smallLampGeo, blinkerLeftMat); blFL.position.set(-0.48, 0.38, -1.11);
  const blRL = new THREE.Mesh(smallLampGeo, blinkerLeftMat); blRL.position.set(-0.48, 0.42, 1.125);
  const blFR = new THREE.Mesh(smallLampGeo, blinkerRightMat); blFR.position.set(0.48, 0.38, -1.11);
  const blRR = new THREE.Mesh(smallLampGeo, blinkerRightMat); blRR.position.set(0.48, 0.42, 1.125);
  carBodyGroup.add(blFL, blRL, blFR, blRR);

  const beamGeo = new THREE.ConeGeometry(0.46, 2.4, 16, 1, true);
  beamGeo.rotateX(Math.PI / 2);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfff2bf, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const beamL = new THREE.Mesh(beamGeo, beamMat); beamL.position.set(-0.36, 0.32, -2.32);
  const beamR = new THREE.Mesh(beamGeo, beamMat); beamR.position.set(0.36, 0.32, -2.32);
  carBodyGroup.add(beamL, beamR);

  const pPlateMat = new THREE.MeshStandardMaterial({ map: pPlateTex, roughness: 0.35 });
  const pPlateGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const pRear = new THREE.Mesh(pPlateGeo, pPlateMat); pRear.position.set(0.28, 0.67, 0.69); pRear.rotation.x = -0.14;
  const pFront = new THREE.Mesh(pPlateGeo, pPlateMat); pFront.position.set(-0.32, 0.66, -0.52); pFront.rotation.x = 0.14;
  carBodyGroup.add(pRear, pFront);

  const plateGeo = new THREE.PlaneGeometry(0.38, 0.11);
  const rearPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: rearPlateTex, roughness: 0.4 }));
  rearPlate.position.set(0, 0.29, 1.21);
  const frontPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: frontPlateTex, roughness: 0.4 }));
  frontPlate.position.set(0, 0.27, -1.21);
  frontPlate.rotation.y = Math.PI;
  carBodyGroup.add(rearPlate, frontPlate);

  const wheelSpinners = [];
  const frontWheelPivots = [];
  const wheelRadius = 0.21;
  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.17, 20);
  tireGeo.rotateZ(Math.PI / 2);
  const rimGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.18, 12);
  rimGeo.rotateZ(Math.PI / 2);
  const spokeGeo = new THREE.BoxGeometry(0.19, 0.035, 0.2);

  [
    { x: -0.54, z: -0.68, front: true },
    { x: 0.54, z: -0.68, front: true },
    { x: -0.54, z: 0.68, front: false },
    { x: 0.54, z: 0.68, front: false }
  ].forEach((wc) => {
    const pivot = new THREE.Group();
    pivot.position.set(wc.x, wheelRadius, wc.z);
    const spin = new THREE.Group();
    const tire = new THREE.Mesh(tireGeo, tireMat); tire.castShadow = true;
    const rim = new THREE.Mesh(rimGeo, chromeMat);
    const spokeA = new THREE.Mesh(spokeGeo, trimMat);
    const spokeB = new THREE.Mesh(spokeGeo, trimMat); spokeB.rotation.x = Math.PI / 2;
    spin.add(tire, rim, spokeA, spokeB);
    pivot.add(spin);
    carRoot.add(pivot);
    wheelSpinners.push(spin);
    if (wc.front) frontWheelPivots.push(pivot);
  });

  const shadowBlob = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 2.95),
    new THREE.MeshBasicMaterial({ map: contactShadowTex, transparent: true, depthWrite: false })
  );
  shadowBlob.rotation.x = -Math.PI / 2;
  shadowBlob.position.set(0, 0.012, 0);
  carRoot.add(shadowBlob);

  const carHitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.05, 2.55),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  carHitProxy.position.set(0, 0.52, 0);
  carHitProxy.layers.set(1);
  carRoot.add(carHitProxy);

  // ==================== VICTORY TROPHY HALO (SUMMARY MODE) ====================
  const trophyGroup = new THREE.Group();
  trophyGroup.visible = false;
  const trophyRingMat = new THREE.MeshStandardMaterial({
    color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.55, roughness: 0.22, metalness: 0.72
  });
  const trophyRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.048, 12, 48), trophyRingMat);
  trophyRing.rotation.x = Math.PI / 2;
  trophyRing.position.y = 1.48;
  const trophyStarMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.8
  });
  const trophyStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), trophyStarMat);
  trophyStar.position.y = 1.56;
  trophyGroup.add(trophyRing, trophyStar);
  carRoot.add(trophyGroup);

  // ==================== POOLED 3D SPARKLE PARTICLES ====================
  const SPARK_COUNT = 36;
  const sparkGeo = new THREE.OctahedronGeometry(0.085, 0);
  const sparkMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0x10b981, emissiveIntensity: 0.65, roughness: 0.2, metalness: 0.6
  });
  const sparkInst = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparkInst.frustumCulled = false;
  worldPivot.add(sparkInst);

  const sparks = Array.from({ length: SPARK_COUNT }, () => ({
    active: false, life: 0, maxLife: 1,
    pos: new THREE.Vector3(0, -10, 0), vel: new THREE.Vector3(), rot: 0
  }));

  function emitSparks(count, colorHex) {
    if (prefersReducedMotion()) return;
    sparkMat.emissive.setHex(colorHex);
    sparkMat.color.setHex(colorHex);
    let spawned = 0;
    for (let i = 0; i < SPARK_COUNT && spawned < count; i++) {
      const s = sparks[i];
      if (s.active) continue;
      s.active = true;
      s.life = 0;
      s.maxLife = 0.65 + Math.random() * 0.55;
      s.pos.set(
        carRoot.position.x + (Math.random() - 0.5) * 1.0,
        0.55 + Math.random() * 0.45,
        carRoot.position.z + (Math.random() - 0.5) * 1.4
      );
      s.vel.set((Math.random() - 0.5) * 2.8, 1.6 + Math.random() * 2.6, (Math.random() - 0.5) * 2.2 + 0.8);
      s.rot = Math.random() * Math.PI * 2;
      spawned++;
    }
  }

  // ==================== SCENARIO DIRECTOR (ALL 300 QUESTIONS!) ====================
  const LEFT_LANE_X = -1.05;
  const RIGHT_LANE_X = 1.05;

  const state = {
    mode: "home", // "home" | "quiz" | "summary"
    activeQuestionId: null,
    activeQuestion: null,
    scenario: "expressway",
    scenarioLabel: "3D 模擬車道 · D 波靠左巡航",
    scenarioWeather: "clear", // "clear" | "rain" | "night" | "fog"
    scenarioSlope: 0, // radians tilt for slope_hill
    scenarioParkedWheel: null, // null | "right" | "left" (for slope parking demonstration)
    scenarioStopped: false,
    scenarioOutcome: null, // null | "right" | "wrong"
    gear: "D",
    lane: "left",
    targetX: LEFT_LANE_X,
    targetZ: 0.25,
    targetCarYaw: 0,
    roadSpeed: 4.8,
    roadOffset: 0,
    boostTimer: 0,
    brakeTimer: 0,
    hazardTimer: 0,
    blinkerTimer: 0,
    blinkerDir: 0,
    hopPhase: 0,
    flashTimer: 0,
    combo: 0,
    readiness: 0,
    summaryPassed: true,
    isVisible: true,
    isDark: isDarkTheme(),
    animRunning: false,
    hasExternalMount: false
  };

  carRoot.position.set(LEFT_LANE_X, 0, 0.25);

  let latestSignReqKey = null;

  function applySignBoardTexture(tex) {
    spFaceMat.map = tex;
    spFaceMat.needsUpdate = true;
    const img = tex?.image;
    if (img && img.width && img.height) {
      const ar = THREE.MathUtils.clamp(img.width / img.height, 0.62, 1.65);
      const maxDim = 0.88;
      const bw = ar >= 1 ? maxDim : maxDim * ar;
      const bh = ar >= 1 ? maxDim / ar : maxDim;
      spBoard.scale.set(bw, bh, 1);
      spBoard.position.y = 1.32 + bh * 0.45;
    } else {
      spBoard.scale.set(0.84, 0.84, 1);
      spBoard.position.y = 1.66;
    }
  }

  function loadSignOn3DPost(signKey) {
    const asset = window.SIGN_ASSETS?.[signKey];
    if (!asset) {
      latestSignReqKey = null;
      signPostGroup.visible = false;
      return;
    }
    latestSignReqKey = signKey;
    signPostGroup.visible = true;
    const cached = signTexCache.get(signKey);
    if (cached) {
      applySignBoardTexture(cached);
      return;
    }
    textureLoader.load(
      asset.src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        signTexCache.set(signKey, tex);
        if (state.mode === "quiz" && signPostGroup.visible && latestSignReqKey === signKey) {
          applySignBoardTexture(tex);
          if (prefersReducedMotion()) renderSingleFrame();
        }
      },
      undefined,
      () => {
        if (latestSignReqKey === signKey) signPostGroup.visible = false;
      }
    );
  }

  function resetAllScenarioProps() {
    latestSignReqKey = null;
    trafficGroup.visible = false;
    trafficGroup.position.set(0, 0, 0);
    stopLineMesh.visible = false;
    stopLineMesh.position.set(0, 0.012, -1.95);
    tlArrowBox.visible = false;
    wigwagBox.visible = false;
    signPostGroup.visible = false;
    signPostGroup.position.set(-2.95, 0, -7.2);
    signPostGroup.rotation.y = 0.12;
    zebraGroup.visible = false;
    yellowBoxGroup.visible = false;
    doubleWhiteGroup.visible = false;
    dwLeftBroken.position.z = 0;
    roadworksGroup.visible = false;
    roadworksGroup.position.set(0, 0, -4.2);
    emergencyGroup.visible = false;
    busGroup.visible = false;
    npcCarGroup.visible = false;
    roundaboutGroup.visible = false;
    roundaboutGroup.position.set(0, 0, 0);
    tunnelGroup.visible = false;
    rainInst.visible = false;
    curbYellow2.visible = false;
    leftCurb.visible = true;
    dashInst.visible = true;
    gantry.visible = true;
    spPoleMat.color.setHex(0x94a3b8);

    // Reset gantry lane signals to green down arrow
    laneSignalLeftMat.map = laneArrowTex;
    laneSignalLeftMat.emissiveMap = laneArrowTex;
    laneSignalLeftMat.emissive.setHex(0x10b981);
    laneSignalRightMat.map = laneArrowTex;
    laneSignalRightMat.emissiveMap = laneArrowTex;
    laneSignalRightMat.emissive.setHex(0x10b981);

    state.scenario = "expressway";
    state.scenarioWeather = "clear";
    state.scenarioSlope = 0;
    state.scenarioParkedWheel = null;
    state.scenarioStopped = false;
    state.scenarioOutcome = null;
    state.targetCarYaw = 0;
    state.targetZ = 0.25;
    state.targetX = state.lane === "left" ? LEFT_LANE_X : RIGHT_LANE_X;
    state.hazardTimer = 0;
    state.blinkerTimer = 0;
    state.brakeTimer = 0;
  }

  function classifyQuestionScenario(q) {
    const s = q.sign || "";
    const p = `${q.prompt || ""} ${q.source?.section || ""} ${q.category || ""}`;
    if (s === "signal_red_amber" || /紅燈與黃燈|紅黃燈|紅燈仍然亮着/.test(p)) return "traffic_red_amber";
    if (s === "signal_red_green_arrow" || /綠色箭嘴|綠箭嘴/.test(p)) return "traffic_green_arrow";
    if (s === "signal_wigwag" || /交替閃動.*紅燈|紅色警告閃燈|消防局/.test(p)) return "traffic_wigwag";
    if (/交通燈|綠燈|黃燈|紅燈|燈號/.test(p) && !/架空|工程車|危險警告燈|霧燈|車頭大燈|手號/.test(p)) return "traffic_light_general";
    if (s.startsWith("lane_signal") || /架空|行車線信號|隧道/.test(p)) return "tunnel_overhead";
    if (s.startsWith("roadworks") || /工程|雪糕筒|閃爍箭嘴/.test(p)) return "roadworks";
    if (s.startsWith("slope_park") || s === "warn_steep_down" || /斜路|斜坡|上坡|下坡/.test(p)) return "slope_hill";
    if (s.startsWith("roundabout") || /迴旋處/.test(p)) return "roundabout";
    if (s.includes("yellow_box") || /黃色方格|黃格|電車|輕鐵/.test(p)) return "yellow_box_rail";
    if (s.includes("double_white") || /雙白線|警告線|白色.*線|行車線界線|反光路釘/.test(p)) return "road_markings_white";
    if (s.includes("yellow_lines") || s === "no_stopping" || s === "no_parking" || /不准停車|不准泊車|黃線|紅杆|綠杆|泊車|停泊/.test(p)) return "parking_curb";
    if (s.includes("bus_lane") || s === "contraflow_bus" || /巴士線|巴士/.test(p)) return "bus_lane";
    if (/斑馬線|行人|學童|學校|長者|視障|過路處|綠公仔/.test(p)) return "pedestrian_zebra";
    if (/緊急|救護車|消防車|警車|壞車|意外|急救|起火|路肩/.test(p)) return "emergency_hazard";
    if (/霧|雨|夜間|晚上|大燈|高燈|低燈|濕滑|強風|颱風|能見度/.test(p)) return "weather_night_rain";
    if (/超車|爬頭|扒頭|盲點|讓路|切線|跟車|停車距離|兩秒|車速|限速|快速公路|切入/.test(p)) return "highway_overtake";
    if (s.startsWith("hand_signal") || /手號|響號|閃動大燈|倒車|掉頭|轉右|轉左/.test(p)) return "maneuver_signal";
    if (s) return "roadside_sign_3d";
    if (/酒精|酒駕|藥駕|安全帶|手提電話|流動電訊|P 牌|暫准|記分|車牌|輪胎|胎紋|自動波|兒童|安全椅|輔助駕駛|停車熄匙/.test(p)) return "cockpit_safety";
    return "city_cruising";
  }

  function applyQuestionScenario(q) {
    if (!q) return;
    resetAllScenarioProps();
    const kind = classifyQuestionScenario(q);
    state.scenario = kind;
    state.gear = "D";
    state.lane = "left";
    state.targetX = LEFT_LANE_X;

    const p = q.prompt || "";
    const s = q.sign || "";

    // If this question has an official PDF road sign (and isn't a traffic signal/chart diagram), mount it on our 3D signpost too!
    const isDiagramNotRoadsideSign =
      s.startsWith("signal_") || s.startsWith("hand_") || s.startsWith("road_") || s.startsWith("slope_") || s.startsWith("stopping_") || s.startsWith("roundabout") || s.startsWith("roadworks") || s.startsWith("lane_signal");
    if (s && !isDiagramNotRoadsideSign) {
      loadSignOn3DPost(s);
    }

    switch (kind) {
      case "traffic_red_amber":
        trafficGroup.visible = true;
        stopLineMesh.visible = true;
        tlRedMat.emissiveIntensity = 2.6;
        tlAmberMat.emissiveIntensity = 2.5;
        tlGreenMat.emissiveIntensity = 0.04;
        state.scenarioStopped = true;
        state.gear = "D";
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：紅黃燈齊亮路口";
        break;

      case "traffic_green_arrow":
        trafficGroup.visible = true;
        stopLineMesh.visible = true;
        tlArrowBox.visible = true;
        tlRedMat.emissiveIntensity = 2.6;
        tlAmberMat.emissiveIntensity = 0.04;
        tlGreenMat.emissiveIntensity = 0.04;
        state.scenarioStopped = true;
        state.blinkerDir = -1;
        state.blinkerTimer = 10;
        state.scenarioLabel = "實境：紅燈＋左轉綠箭嘴";
        break;

      case "traffic_wigwag":
        trafficGroup.visible = true;
        stopLineMesh.visible = true;
        tlHead.visible = false;
        tlRed.visible = tlAmber.visible = tlGreen.visible = false;
        wigwagBox.visible = true;
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：消防局紅色警告閃燈";
        break;

      case "traffic_light_general": {
        trafficGroup.visible = true;
        stopLineMesh.visible = true;
        tlHead.visible = true;
        tlRed.visible = tlAmber.visible = tlGreen.visible = true;
        const isAmber = /黃燈|黃色燈/.test(p);
        const isGreen = /綠燈|綠色燈/.test(p) && !/紅燈/.test(p);
        tlRedMat.emissiveIntensity = !isAmber && !isGreen ? 2.6 : 0.04;
        tlAmberMat.emissiveIntensity = isAmber ? 2.5 : 0.04;
        tlGreenMat.emissiveIntensity = isGreen ? 2.4 : 0.04;
        state.scenarioStopped = !isGreen;
        if (!isGreen) state.brakeTimer = 99;
        state.scenarioLabel = isGreen ? "實境：綠燈通行路口" : isAmber ? "實境：黃燈減速路口" : "實境：紅燈停車線前";
        break;
      }

      case "tunnel_overhead": {
        tunnelGroup.visible = true;
        gantry.position.z = -4.2;
        const isCross = s === "lane_signal_cross" || /紅色交叉|紅燈/.test(p);
        const isMerge = s === "lane_signal_merge_left" || /斜箭嘴/.test(p);
        if (isCross) {
          laneSignalLeftMat.map = laneCrossTex;
          laneSignalLeftMat.emissiveMap = laneCrossTex;
          laneSignalLeftMat.emissive.setHex(0xef4444);
          state.scenarioLabel = "實境：架空紅交叉封線";
        } else if (isMerge) {
          laneSignalRightMat.map = laneMergeTex;
          laneSignalRightMat.emissiveMap = laneMergeTex;
          laneSignalRightMat.emissive.setHex(0x10b981);
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.scenarioLabel = "實境：架空綠斜箭切線";
        } else {
          state.scenarioLabel = "實境：香港隧道行車";
        }
        state.scenarioWeather = "night";
        break;
      }

      case "roadworks":
        roadworksGroup.visible = true;
        state.scenarioLabel = "實境：工程車對角閃燈";
        break;

      case "slope_hill": {
        const isDown = /下坡|向下斜|1:8/.test(p);
        const noKerb = s === "slope_park_no_kerb" || /沒有路邊石/.test(p);
        state.scenarioSlope = isDown ? -0.14 : 0.14;
        leftCurb.visible = !noKerb;
        if (/泊車|斜路泊/.test(p)) {
          state.scenarioStopped = true;
          state.targetX = -1.45;
          state.gear = "P";
          state.scenarioLabel = noKerb ? "實境：無石壆斜路泊車" : isDown ? "實境：下斜靠壆泊車" : "實境：上斜靠壆泊車";
        } else {
          state.scenarioLabel = isDown ? "實境：1:8 落斜低波行車" : "實境：斜坡行車";
        }
        break;
      }

      case "roundabout":
        roundaboutGroup.visible = true;
        gantry.visible = false;
        // Calmly yield at roundabout entry before answering (no lane spoiler, zero floating island!)
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.targetX = 0;
        state.scenarioLabel = "實境：香港兩線迴旋處";
        break;

      case "yellow_box_rail":
        yellowBoxGroup.visible = true;
        railGroup.visible = /電車|輕鐵|路軌/.test(p);
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = railGroup.visible ? "實境：電車／輕鐵黃格路口" : "實境：黃色方格路口";
        break;

      case "road_markings_white":
        if (/雙白線/.test(p) || s.includes("double_white")) {
          doubleWhiteGroup.visible = true;
          dashInst.visible = false;
          const brokenOnYourSide = s === "road_double_white_broken" || /虛線/.test(p);
          dwLeftSolid.visible = !brokenOnYourSide;
          dwLeftBroken.visible = brokenOnYourSide;
          state.scenarioLabel = brokenOnYourSide ? "實境：靠你一邊虛雙白線" : "實境：連續雙白實線";
        } else {
          state.scenarioLabel = "實境：道路白線與反光路釘";
        }
        break;

      case "parking_curb":
        curbYellow2.visible = true;
        if (/紅杆/.test(p)) spPoleMat.color.setHex(0xdc2626);
        else if (/綠杆/.test(p)) spPoleMat.color.setHex(0x059669);
        else if (/黃杆/.test(p)) spPoleMat.color.setHex(0xeab308);
        state.targetX = -1.38;
        state.scenarioLabel = "實境：路旁禁區黃線與標誌";
        break;

      case "bus_lane":
        busGroup.visible = true;
        state.lane = "right";
        state.targetX = RIGHT_LANE_X;
        state.scenarioLabel = "實境：香港巴士專線旁行車";
        break;

      case "pedestrian_zebra":
        zebraGroup.visible = true;
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：斑馬線行人過馬路";
        break;

      case "emergency_hazard":
        if (/救護車|消防車|警車|緊急服務/.test(p)) {
          emergencyGroup.visible = true;
          state.scenarioLabel = "實境：緊急救援車響號駛近";
        } else {
          state.scenarioStopped = true;
          state.targetX = -1.55;
          state.hazardTimer = 14;
          state.gear = "P";
          state.scenarioLabel = "實境：壞車亮死火燈停靠路肩";
        }
        break;

      case "weather_night_rain":
        if (/雨|濕滑|水膜|颱風/.test(p)) {
          rainInst.visible = true;
          state.scenarioWeather = "rain";
          state.scenarioLabel = "實境：雨天濕滑路面行車";
        } else if (/霧|能見度/.test(p)) {
          state.scenarioWeather = "fog";
          state.scenarioLabel = "實境：大霧低能見度行車";
        } else {
          state.scenarioWeather = "night";
          state.scenarioLabel = "實境：夜間開燈行車";
        }
        break;

      case "highway_overtake":
        npcCarGroup.visible = true;
        state.scenarioLabel = /停車距離|兩秒|跟車/.test(p) ? "實境：跟車安全距離示範" : "實境：快速公路超車判斷";
        break;

      case "maneuver_signal":
        if (/倒車/.test(p)) {
          state.gear = "R";
          state.scenarioLabel = "實境：倒車操作示範";
        } else if (/轉左|逆時針/.test(p)) {
          state.blinkerDir = -1;
          state.blinkerTimer = 8;
          state.scenarioLabel = "實境：左轉信號與手號";
        } else if (/轉右/.test(p)) {
          state.blinkerDir = 1;
          state.blinkerTimer = 8;
          state.scenarioLabel = "實境：右轉信號與路口";
        } else {
          state.brakeTimer = 1.5;
          state.scenarioLabel = "實境：慢駛停車信號";
        }
        break;

      case "roadside_sign_3d":
        // Keep cruising cleanly up to the 3D sign before answering (no spoiler even for stop_oct!)
        state.scenarioLabel = "實境：前方香港交通標誌";
        break;

      case "cockpit_safety":
        if (/停車熄匙|泊車波|P 波/.test(p)) {
          state.gear = "P";
          state.scenarioStopped = true;
          state.scenarioLabel = "實境：自動波 P 波停泊檢查";
        } else {
          state.scenarioLabel = "實境：1A 自動波安全駕駛";
        }
        break;

      default:
        state.scenarioLabel = "實境：香港市區道路巡航";
        break;
    }

    // Ground roadside signpost cleanly outside curb on pavement (right side if traffic light occupies left)
    if (trafficGroup.visible && signPostGroup.visible) {
      signPostGroup.position.set(3.05, 0, state.scenarioStopped ? -4.4 : -7.2);
      signPostGroup.rotation.y = -0.14;
    } else if (signPostGroup.visible) {
      signPostGroup.position.set(-3.12, 0, state.scenarioStopped ? -4.4 : -6.8);
      signPostGroup.rotation.y = 0.14;
    }

    // Restore tlHead visibility unless wigwag explicitly hid it
    if (kind !== "traffic_wigwag") {
      tlHead.visible = true;
      tlRed.visible = tlAmber.visible = tlGreen.visible = true;
    }
    state.activeQuestionId = q.id;
    state.activeQuestion = q;
    snapQuizCameraForScenario();
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  // Reusable math scratch objects (ZERO per-frame heap allocations!)
  const dummy = new THREE.Object3D();
  const targetBgColor = new THREE.Color();
  const targetVergeColor = new THREE.Color();
  const raycaster = new THREE.Raycaster();
  raycaster.layers.set(1);
  const pointer = new THREE.Vector2();
  const pickables = [carHitProxy];

  // ==================== HUD HELPERS ====================
  const hudGearBtns = Array.from(document.querySelectorAll(".gear-btn"));
  const hudLaneBtn = document.getElementById("btn-3d-lane");
  const hudHonkBtn = document.getElementById("btn-3d-honk");
  const hudStatus = document.getElementById("stage-3d-status");
  const hudSpeed = document.getElementById("stage-3d-speed");

  function updateHudUI() {
    hudGearBtns.forEach((b) => {
      const active = b.dataset.gear === state.gear;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (hudLaneBtn) {
      hudLaneBtn.textContent = state.lane === "left" ? "切右線超車" : "返回左線";
    }
    if (hudStatus) {
      if (state.mode === "summary") {
        hudStatus.textContent = state.summaryPassed ? "1TakePass 衝線及格" : "整裝再出發";
      } else if (state.mode === "quiz") {
        if (state.scenarioOutcome === "right" && state.combo >= 3) {
          hudStatus.textContent = `${state.scenarioLabel} · ${state.combo} 連中`;
        } else {
          hudStatus.textContent = state.scenarioLabel;
        }
      } else {
        const gearText = {
          P: "P 波泊定",
          R: "R 波倒車",
          N: "N 波空波",
          D: state.lane === "left" ? "D 波靠左巡航" : "D 波右線超車"
        }[state.gear];
        hudStatus.textContent = `3D 模擬車道 · ${gearText}`;
      }
    }
  }

  function setGear(g) {
    if (!["P", "R", "N", "D"].includes(g)) return;
    state.gear = g;
    if (g === "P") state.brakeTimer = 0.55;
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  function toggleLane() {
    if (state.gear === "P") setGear("D");
    const next = state.lane === "left" ? "right" : "left";
    state.lane = next;
    state.targetX = next === "left" ? LEFT_LANE_X : RIGHT_LANE_X;
    state.blinkerDir = next === "left" ? -1 : 1;
    state.blinkerTimer = 1.5;
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  function triggerHonkBoost() {
    state.hopPhase = 1.0;
    state.flashTimer = 0.45;
    if (!state.scenarioStopped && (state.gear === "D" || state.mode === "quiz")) {
      state.boostTimer = 0.9;
    }
    emitSparks(14, 0x3898ff);
    if (typeof window.playOneTakeHorn === "function") window.playOneTakeHorn();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  hudGearBtns.forEach((b) => {
    b.addEventListener("click", () => setGear(b.dataset.gear));
  });
  if (hudLaneBtn) hudLaneBtn.addEventListener("click", toggleLane);
  if (hudHonkBtn) hudHonkBtn.addEventListener("click", triggerHonkBoost);

  let downX = 0;
  let downY = 0;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    downX = e.clientX;
    downY = e.clientY;
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 7) return;
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.intersectObjects(pickables, false).length > 0) {
      triggerHonkBoost();
    }
  });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (e.buttons !== 0) return;
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);
    renderer.domElement.style.cursor =
      raycaster.intersectObjects(pickables, false).length > 0 ? "pointer" : "grab";
  });

  // ==================== MOUNTING & CAMERA MODES ====================
  function snapQuizCameraForScenario() {
    if (state.mode !== "quiz") return;
    if (state.scenario === "slope_hill" && state.scenarioStopped) {
      // Side-kerb 3/4 view so tilted hill, kerb (or lack of kerb) and front wheel turn angle are crystal clear!
      camera.position.set(-3.15, 1.52, 3.15);
      controls.target.set(-1.15, 0.42, -0.25);
    } else {
      // Clean HK driving-simulator rear chase perspective: car cleanly centered, left pavement & road ahead 100% unobstructed!
      camera.position.set(-1.15, 1.85, 6.1);
      controls.target.set(-0.55, 0.45, -3.0);
    }
    controls.enabled = true;
    controls.update();
  }

  function snapCameraForMode(mode) {
    if (mode === "quiz") {
      snapQuizCameraForScenario();
      return;
    } else if (mode === "summary") {
      camera.position.set(3.2, 2.05, 4.1);
      controls.target.set(0, 0.72, 0.15);
      controls.enabled = true;
    } else {
      camera.position.set(3.4, 2.25, 4.9);
      controls.target.set(-0.2, 0.55, -0.4);
      controls.enabled = true;
    }
    controls.update();
  }

  function resizeRenderer() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    if (w < 10 || h < 10) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (prefersReducedMotion()) renderSingleFrame();
  }

  const resizeObserver = new ResizeObserver(() => resizeRenderer());
  resizeObserver.observe(viewport);

  function mountToView(mode, opts = {}) {
    state.hasExternalMount = true;
    const slotId =
      mode === "quiz" ? "quiz-3d-slot" : mode === "summary" ? "summary-3d-slot" : mode === "home" ? "home-3d-slot" : null;

    if (!slotId) {
      state.activeQuestionId = null;
      shell.hidden = true;
      pauseLoop();
      return;
    }

    const slot = document.getElementById(slotId);
    if (!slot) return;

    const changedMode = state.mode !== mode;
    state.mode = mode;
    shell.dataset.mode = mode;
    shell.hidden = false;
    if (shell.parentElement !== slot) slot.appendChild(shell);

    if (mode === "home") {
      state.activeQuestionId = null;
      resetAllScenarioProps();
      trophyGroup.visible = false;
      state.gear = "D";
      state.lane = "left";
      state.targetX = LEFT_LANE_X;
      gantry.position.z = -10.5;
    } else if (mode === "summary") {
      state.activeQuestionId = null;
      resetAllScenarioProps();
      state.summaryPassed = opts.passed !== false;
      state.gear = "P";
      state.lane = "left";
      state.targetX = 0;
      trophyGroup.visible = true;
      trophyRingMat.color.setHex(state.summaryPassed ? 0x10b981 : 0xf59e0b);
      trophyRingMat.emissive.setHex(state.summaryPassed ? 0x059669 : 0xb45309);
      trophyStar.visible = state.summaryPassed;
      if (state.summaryPassed) emitSparks(26, 0xfacc15);
      else state.hazardTimer = 2.4;
    } else if (mode === "quiz") {
      trophyGroup.visible = false;
      state.combo = opts.combo || 0;
    }

    if (changedMode || mode === "summary") snapCameraForMode(mode);
    updateHudUI();
    resizeRenderer();
    startLoopIfAllowed();
  }

  function applyAnsweredPosture(isRight, question, { silent = false, combo = 0, wasPreviouslyWrong = false } = {}) {
    const q = question || state.activeQuestion;
    const p = q?.prompt || "";
    const s = q?.sign || "";
    const kind = state.scenario;
    state.scenarioOutcome = isRight ? "right" : "wrong";

    if (isRight) {
      if (!silent) {
        state.hopPhase = 1.0;
        state.flashTimer = 0.4;
        emitSparks(wasPreviouslyWrong ? 24 : combo >= 3 ? 22 : 14, combo >= 3 ? 0xfacc15 : 0x10b981);
      }

      // Scenario-specific RIGHT driving demonstration!
      if (kind === "traffic_green_arrow") {
        state.scenarioStopped = false;
        state.brakeTimer = 0;
        state.targetCarYaw = 0.28;
        state.targetX = -1.55;
        if (!silent) state.boostTimer = 1.1;
        state.scenarioLabel = "實境：跟左轉綠箭嘴安全左轉";
      } else if (kind === "traffic_red_amber") {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：紅黃燈齊亮 · 穩守停車線";
      } else if (kind === "traffic_wigwag") {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：消防局閃紅燈 · 保持停車";
      } else if (kind === "pedestrian_zebra") {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：斑馬線讓行人先過";
      } else if (kind === "yellow_box_rail") {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：出口受阻 · 留守黃格外";
      } else if (kind === "slope_hill" && /泊車|斜路泊/.test(p)) {
        const isUpWithKerb = state.scenarioSlope > 0 && leftCurb.visible;
        state.scenarioParkedWheel = isUpWithKerb ? "right" : "left";
        state.gear = "P";
        state.scenarioStopped = true;
        state.scenarioLabel = isUpWithKerb
          ? "實境：上斜靠壆 · 前輪向右扭"
          : !leftCurb.visible
            ? "實境：無石壆斜路 · 前輪向左扭"
            : "實境：下斜靠壆 · 前輪向左扭";
      } else if (kind === "roundabout") {
        const goRight = /轉右|掉頭/.test(p);
        state.scenarioStopped = false;
        state.brakeTimer = 0;
        state.lane = goRight ? "right" : "left";
        state.targetX = goRight ? RIGHT_LANE_X : LEFT_LANE_X;
        state.blinkerDir = goRight ? 1 : -1;
        state.blinkerTimer = 2.4;
        if (!silent) state.boostTimer = 1.0;
        state.scenarioLabel = goRight ? "實境：迴旋處轉右 · 選用右線" : "實境：迴旋處靠左線進入";
      } else if (kind === "tunnel_overhead") {
        if (state.lane === "right") {
          state.lane = "left";
          state.targetX = LEFT_LANE_X;
          state.blinkerDir = -1;
          state.blinkerTimer = 1.8;
          if (!silent) state.boostTimer = 1.0;
          state.scenarioLabel = "實境：順綠斜箭安全切入左線";
        } else if (laneSignalLeftMat.map === laneCrossTex) {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 1.8;
          if (!silent) state.boostTimer = 1.0;
          state.scenarioLabel = "實境：避開紅交叉封閉車線";
        } else if (!silent) {
          state.boostTimer = 0.9;
        }
      } else if (kind === "road_markings_white" && doubleWhiteGroup.visible) {
        if (dwLeftBroken.visible) {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 1.6;
          if (!silent) state.boostTimer = 1.0;
        } else if (!silent) {
          state.boostTimer = 0.7;
        }
      } else if (kind === "roadside_sign_3d" && s === "stop_oct") {
        stopLineMesh.position.set(0, 0.012, -1.95);
        stopLineMesh.visible = true;
        signPostGroup.position.set(-3.12, 0, -4.0);
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：停車標誌 · 停車線前全停";
      } else if (kind === "highway_overtake") {
        if (/停車距離|兩秒|跟車/.test(p)) {
          if (!silent) state.boostTimer = 0.45;
        } else {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 1.8;
          if (!silent) state.boostTimer = 1.25;
        }
      } else if (kind === "roadworks") {
        state.lane = "left";
        state.targetX = LEFT_LANE_X;
        state.blinkerDir = -1;
        state.blinkerTimer = 1.4;
        if (!silent) state.boostTimer = 1.1;
      } else if (kind === "emergency_hazard" && emergencyGroup.visible) {
        state.targetX = -1.48;
        state.blinkerDir = -1;
        state.blinkerTimer = 1.8;
        state.scenarioLabel = "實境：靠左讓路予緊急車輛";
      } else if (kind === "traffic_light_general" && state.scenarioStopped) {
        state.brakeTimer = 99;
      } else if (kind === "cockpit_safety" && state.gear === "P") {
        state.scenarioStopped = true;
      } else {
        state.gear = "D";
        state.scenarioStopped = false;
        state.brakeTimer = 0;
        if (!silent) state.boostTimer = wasPreviouslyWrong ? 1.4 : combo >= 3 ? 1.2 : 0.85;
      }
    } else if (!silent) {
      // Examiner brake intervention: red brake lights + hazard lights blink!
      state.brakeTimer = 1.8;
      state.hazardTimer = 2.2;
      if (kind === "traffic_red_amber") {
        state.targetZ = -0.15;
        setTimeout(() => {
          if (state.scenario === "traffic_red_amber") state.targetZ = 0.25;
        }, 420);
      }
    }
  }

  // ==================== PUBLIC API FOR app.js ====================
  window.OneTake3D = {
    mount: mountToView,
    setTheme(dark) {
      state.isDark = !!dark;
      if (prefersReducedMotion()) renderSingleFrame();
    },
    setReadiness(pct) {
      state.readiness = Math.max(0, Math.min(100, Number(pct) || 0));
    },
    setQuestion(q, opts = {}) {
      if (state.mode !== "quiz" || !q) return;
      if (q.id === state.activeQuestionId && !opts.force) return;
      applyQuestionScenario(q);
      if (opts.answered) {
        applyAnsweredPosture(opts.answered.isRight, q, { silent: true });
        updateHudUI();
        if (prefersReducedMotion()) renderSingleFrame();
      }
    },
    reactAnswer({ isRight, combo = 0, wasPreviouslyWrong = false, question = null }) {
      state.combo = isRight ? combo : 0;
      applyAnsweredPosture(isRight, question, { silent: false, combo: state.combo, wasPreviouslyWrong });
      updateHudUI();
      if (prefersReducedMotion()) renderSingleFrame();
    }
  };

  // ==================== ANIMATION LOOP (THREE.Timer — r186) ====================
  const timer = new THREE.Timer();
  timer.connect(document);

  function updateThemeAndWeather(dt) {
    const forceNight = state.mode === "quiz" && (state.scenarioWeather === "night" || state.scenarioWeather === "rain");
    const isFog = state.mode === "quiz" && state.scenarioWeather === "fog";
    const dark = state.isDark || forceNight;

    const skyHex = isFog ? (state.isDark ? 0x1e293b : 0xdce4ed) : dark ? 0x0f1724 : 0xeaf3fb;
    targetBgColor.setHex(skyHex);
    const lerpSpeed = dt > 0 ? Math.min(1, dt * 6.5) : 1;
    bgColor.lerp(targetBgColor, lerpSpeed);
    fog.color.copy(bgColor);
    fog.near = THREE.MathUtils.damp(fog.near, isFog ? 5.5 : dark ? 11 : 14, 5, dt || 0.16);
    fog.far = THREE.MathUtils.damp(fog.far, isFog ? 16 : dark ? 28 : 34, 5, dt || 0.16);

    sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, dark ? 0.95 : isFog ? 1.5 : 2.55, 6, dt || 0.16);
    hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, dark ? 0.55 : 0.92, 6, dt || 0.16);
    scene.environmentIntensity = THREE.MathUtils.damp(scene.environmentIntensity, dark ? 0.42 : 0.74, 6, dt || 0.16);
    targetVergeColor.setHex(dark ? 0x16382b : 0x3d8b63);
    vergeMat.color.lerp(targetVergeColor, lerpSpeed);
    lampHeadMat.emissiveIntensity = THREE.MathUtils.damp(lampHeadMat.emissiveIntensity, dark ? 2.4 : 0.2, 6, dt || 0.16);
    gantryBoardMat.emissiveIntensity = THREE.MathUtils.damp(gantryBoardMat.emissiveIntensity, dark ? 0.48 : 0.14, 6, dt || 0.16);

    const studGlow = dark ? 1.6 : 0.2;
    studRedMat.emissiveIntensity = studGlow;
    studWhiteMat.emissiveIntensity = studGlow;
    studAmberMat.emissiveIntensity = studGlow;

    const targetBeamOpacity = state.flashTimer > 0 ? 0.34 : (dark || isFog) ? 0.2 : 0.0;
    beamMat.opacity = THREE.MathUtils.damp(beamMat.opacity, targetBeamOpacity, 10, dt || 0.16);
    headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : (dark || isFog) ? 2.2 : 0.65;
  }

  function stepScene(dt, elapsed) {
    updateThemeAndWeather(dt);

    if (state.boostTimer > 0) state.boostTimer = Math.max(0, state.boostTimer - dt);
    if (state.brakeTimer > 0 && state.brakeTimer < 50) state.brakeTimer = Math.max(0, state.brakeTimer - dt);
    if (state.hazardTimer > 0) state.hazardTimer = Math.max(0, state.hazardTimer - dt);
    if (state.blinkerTimer > 0) state.blinkerTimer = Math.max(0, state.blinkerTimer - dt);
    if (state.flashTimer > 0) state.flashTimer = Math.max(0, state.flashTimer - dt);
    if (state.hopPhase > 0) state.hopPhase = Math.max(0, state.hopPhase - dt * 2.8);

    // Smooth slope tilt of entire road + car!
    worldPivot.rotation.x = THREE.MathUtils.damp(worldPivot.rotation.x, state.scenarioSlope, 4.5, dt);

    // Target road speed
    let desiredSpeed = 0;
    if (state.mode === "summary" || state.scenarioStopped || state.gear === "P") {
      desiredSpeed = 0;
    } else if (state.gear === "D") {
      const base = state.mode === "quiz" ? 4.6 + Math.min(state.combo, 6) * 0.55 : 5.4 + state.readiness * 0.02;
      desiredSpeed = base + (state.boostTimer > 0 ? 4.5 : 0) - (state.brakeTimer > 0 ? 3.8 : 0);
    } else if (state.gear === "R") {
      desiredSpeed = -2.6;
    } else if (state.gear === "N") {
      desiredSpeed = 0.6;
    }

    state.roadSpeed = THREE.MathUtils.damp(state.roadSpeed, desiredSpeed, 4.8, dt);
    state.roadOffset = (state.roadOffset + state.roadSpeed * dt) % 10000;

    if (hudSpeed) {
      const kmh = state.gear === "P" || state.mode === "summary" || Math.abs(state.roadSpeed) < 0.15
        ? 0
        : Math.min(70, Math.round(Math.abs(state.roadSpeed) * 8.2));
      hudSpeed.textContent = `${state.gear} · ${kmh} km/h`;
    }

    // Update scrolling instanced road dashes & cat's-eyes
    const totalDashSpan = DASH_COUNT * DASH_STEP;
    const modOff = ((state.roadOffset % DASH_STEP) + DASH_STEP) % DASH_STEP;
    for (let i = 0; i < DASH_COUNT; i++) {
      const z = -totalDashSpan * 0.72 + i * DASH_STEP + modOff;
      dummy.position.set(0, 0.008, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      dashInst.setMatrixAt(i, dummy.matrix);

      dummy.position.set(-roadWidth / 2 + 0.22, 0.015, z);
      dummy.updateMatrix();
      studsLeft.setMatrixAt(i, dummy.matrix);

      dummy.position.set(0, 0.015, z + DASH_STEP * 0.5);
      dummy.updateMatrix();
      studsMid.setMatrixAt(i, dummy.matrix);

      dummy.position.set(roadWidth / 2 - 0.22, 0.015, z);
      dummy.updateMatrix();
      studsRight.setMatrixAt(i, dummy.matrix);
    }
    dashInst.instanceMatrix.needsUpdate = true;
    studsLeft.instanceMatrix.needsUpdate = true;
    studsMid.instanceMatrix.needsUpdate = true;
    studsRight.instanceMatrix.needsUpdate = true;

    // Scroll roadside props & gantry (1:1 synced with ground roadSpeed — nothing hovers glued to the car!)
    for (const prop of roadsideProps) {
      let z = prop.position.z + state.roadSpeed * dt;
      if (z > 8) z -= PROP_SPAN;
      else if (z < -PROP_SPAN + 8) z += PROP_SPAN;
      prop.position.z = z;
    }

    {
      let gz = gantry.position.z + state.roadSpeed * dt;
      const gantryWrapFront = state.mode === "quiz" ? -2.0 : 7.5;
      const gantryResetBack = state.scenario === "tunnel_overhead" ? -18.5 : -24;
      if (gz > gantryWrapFront) gz = gantryResetBack;
      else if (gz < gantryResetBack - 1) gz = gantryWrapFront - 0.5;
      gantry.position.z = gz;
    }

    // Ground-locked 1:1 scrolling for scenario roadside signs, intersections, roadworks & markings when moving!
    if (Math.abs(state.roadSpeed) > 0.05) {
      if (signPostGroup.visible) {
        let sz = signPostGroup.position.z + state.roadSpeed * dt;
        if (sz > 5.5) sz = -14.5;
        else if (sz < -15.5) sz = 4.5;
        signPostGroup.position.z = sz;
      }
      if (trafficGroup.visible) {
        let tz = trafficGroup.position.z + state.roadSpeed * dt;
        if (tz > 7.5) tz = -15.0;
        else if (tz < -16.0) tz = 6.5;
        trafficGroup.position.z = tz;
        if (stopLineMesh.visible) stopLineMesh.position.z = -1.95 + tz;
      }
      if (roadworksGroup.visible) {
        let rz = roadworksGroup.position.z + state.roadSpeed * dt;
        if (rz > 9.5) rz = -14.0;
        else if (rz < -15.0) rz = 8.5;
        roadworksGroup.position.z = rz;
      }
      if (roundaboutGroup.visible) {
        let rbz = roundaboutGroup.position.z + state.roadSpeed * dt;
        if (rbz > 10.0) rbz = -12.0;
        roundaboutGroup.position.z = rbz;
      }
    }
    if (doubleWhiteGroup.visible && dwLeftBroken.visible) {
      dwLeftBroken.position.z = ((state.roadOffset % 2.1) + 2.1) % 2.1;
    }

    // Animate scenario-specific dynamic props
    if (wigwagBox.visible) {
      const alt = Math.floor(elapsed * 2.4) % 2 === 0;
      wwLeftMat.emissiveIntensity = alt ? 2.8 : 0.08;
      wwRightMat.emissiveIntensity = alt ? 0.08 : 2.8;
    }
    if (zebraGroup.visible) {
      beaconGlowMat.emissiveIntensity = 0.7 + (Math.sin(elapsed * 5.2) * 0.5 + 0.5) * 1.6;
      pedGroup.position.x = Math.sin(elapsed * 0.9) * 1.45;
      pedGroup.position.y = Math.abs(Math.sin(elapsed * 6.5)) * 0.04;
    }
    if (roadworksGroup.visible) {
      const diag = Math.floor(elapsed * 2.2) % 2 === 0;
      rwLampMatA.emissiveIntensity = diag ? 2.6 : 0.15;
      rwLampMatB.emissiveIntensity = diag ? 0.15 : 2.6;
    }
    if (emergencyGroup.visible) {
      const alt = Math.floor(elapsed * 6.5) % 2 === 0;
      ambRedMat.emissiveIntensity = alt ? 3.2 : 0.2;
      ambBlueMat.emissiveIntensity = alt ? 0.2 : 3.2;
      ambGroup.position.z += dt * 1.8;
      if (ambGroup.position.z > 4.5) ambGroup.position.z = -11;
    }
    if (busGroup.visible) {
      busGroup.position.z = -5.4 + Math.sin(elapsed * 0.8) * 0.8;
    }
    if (npcCarGroup.visible) {
      npcCarGroup.position.z = state.scenarioOutcome === "right"
        ? THREE.MathUtils.damp(npcCarGroup.position.z, 2.2, 1.4, dt)
        : -4.4 + Math.sin(elapsed * 1.1) * 0.45;
    }
    if (rainInst.visible) {
      for (let i = 0; i < RAIN_COUNT; i++) {
        const d = rainDrops[i];
        d.y -= d.spd * dt;
        d.z += 2.2 * dt;
        if (d.y < 0.1) { d.y = 4.6 + Math.random() * 1.2; d.z = (Math.random() - 0.5) * 12 - 2; }
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(0.18, 0, 0.08);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        rainInst.setMatrixAt(i, dummy.matrix);
      }
      rainInst.instanceMatrix.needsUpdate = true;
    }

    // Car lateral steering, yaw, wheel angle & suspension
    const prevX = carRoot.position.x;
    carRoot.position.x = THREE.MathUtils.damp(carRoot.position.x, state.targetX, 5.2, dt);
    carRoot.position.z = THREE.MathUtils.damp(carRoot.position.z, state.targetZ, 4.5, dt);
    carRoot.rotation.y = THREE.MathUtils.damp(carRoot.rotation.y, state.targetCarYaw, 5.0, dt);

    const latVel = dt > 0.0001 ? (carRoot.position.x - prevX) / dt : 0;
    let steerAngle = THREE.MathUtils.clamp(-latVel * 0.16, -0.34, 0.34);
    if (state.scenarioParkedWheel === "right") steerAngle = -0.45;
    else if (state.scenarioParkedWheel === "left") steerAngle = 0.45;

    for (const fp of frontWheelPivots) {
      fp.rotation.y = THREE.MathUtils.damp(fp.rotation.y, steerAngle, 10, dt);
    }

    const wheelDelta = (state.roadSpeed * dt) / wheelRadius;
    for (const ws of wheelSpinners) ws.rotation.x -= wheelDelta;

    const hopY = Math.sin(state.hopPhase * Math.PI) * 0.15;
    const engineVib = Math.sin(elapsed * (state.roadSpeed !== 0 ? 18 : 11)) * (state.gear === "P" ? 0.003 : 0.008);
    carBodyGroup.position.y = hopY + engineVib;
    carBodyGroup.rotation.z = THREE.MathUtils.damp(carBodyGroup.rotation.z, -latVel * 0.055, 8, dt);
    const targetPitch = state.brakeTimer > 0 && Math.abs(state.roadSpeed) > 0.3 ? -0.05 : state.boostTimer > 0 ? 0.04 : 0;
    carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, targetPitch, 9, dt);

    // Brake, reverse & blinker lamps
    const braking = state.brakeTimer > 0 || state.gear === "P" || state.scenarioStopped;
    brakeLightMat.emissiveIntensity = braking ? 2.6 : (state.isDark || state.scenarioWeather === "night") ? 0.9 : 0.28;
    reverseLightMat.emissiveIntensity = state.gear === "R" ? 2.4 : 0.0;

    const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
    const leftBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir < 0)) && blinkOn;
    const rightBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir > 0)) && blinkOn;
    blinkerLeftMat.emissiveIntensity = leftBlink ? 2.8 : 0.08;
    blinkerRightMat.emissiveIntensity = rightBlink ? 2.8 : 0.08;

    // Trophy animation
    if (trophyGroup.visible) {
      trophyStar.rotation.y += dt * 1.9;
      trophyStar.position.y = 1.56 + Math.sin(elapsed * 2.8) * 0.08;
      trophyRing.rotation.z = elapsed * 0.6;
      if (state.summaryPassed && Math.random() < dt * 4) emitSparks(1, Math.random() > 0.5 ? 0xfacc15 : 0x10b981);
    }

    // Pooled 3D sparkles
    for (let i = 0; i < SPARK_COUNT; i++) {
      const s = sparks[i];
      if (!s.active) {
        dummy.position.set(0, -20, 0);
        dummy.scale.setScalar(0.001);
        dummy.updateMatrix();
        sparkInst.setMatrixAt(i, dummy.matrix);
        continue;
      }
      s.life += dt;
      if (s.life >= s.maxLife) {
        s.active = false;
        dummy.position.set(0, -20, 0);
        dummy.scale.setScalar(0.001);
        dummy.updateMatrix();
        sparkInst.setMatrixAt(i, dummy.matrix);
        continue;
      }
      s.pos.addScaledVector(s.vel, dt);
      s.vel.y -= 5.2 * dt;
      s.rot += dt * 5;
      const sc = Math.sin((1 - s.life / s.maxLife) * Math.PI * 0.5) * 1.1;
      dummy.position.copy(s.pos);
      dummy.rotation.set(s.rot, s.rot * 0.8, 0);
      dummy.scale.setScalar(Math.max(0.001, sc));
      dummy.updateMatrix();
      sparkInst.setMatrixAt(i, dummy.matrix);
    }
    sparkInst.instanceMatrix.needsUpdate = true;

    // OrbitControls update across all modes (interactive drag enabled everywhere!)
    controls.autoRotate = state.mode === "summary";
    controls.autoRotateSpeed = 1.1;
    controls.update(dt);
  }

  function renderSingleFrame() {
    stepScene(0.016, 0);
    renderer.render(scene, camera);
  }

  function animate() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const elapsed = timer.getElapsed();
    stepScene(dt, elapsed);
    renderer.render(scene, camera);
  }

  function startLoopIfAllowed() {
    if (shell.hidden || !state.isVisible || document.hidden) return;
    if (prefersReducedMotion()) {
      renderSingleFrame();
      return;
    }
    if (!state.animRunning) {
      state.animRunning = true;
      renderer.setAnimationLoop(animate);
    }
  }

  function pauseLoop() {
    if (state.animRunning) {
      state.animRunning = false;
      renderer.setAnimationLoop(null);
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      state.isVisible = entries.some((e) => e.isIntersecting);
      if (state.isVisible) startLoopIfAllowed();
      else pauseLoop();
    },
    { threshold: 0.05 }
  );
  io.observe(shell);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseLoop();
    else startLoopIfAllowed();
  });

  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    pauseLoop();
  });
  renderer.domElement.addEventListener("webglcontextrestored", () => {
    startLoopIfAllowed();
  });

  Promise.resolve(renderer.compileAsync ? renderer.compileAsync(scene, camera) : null)
    .catch(() => {})
    .finally(() => {
      if (!state.hasExternalMount) mountToView("home");
    });
})();
