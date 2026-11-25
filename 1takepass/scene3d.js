// 1TakePass — Interactive 3D HK Automatic (1A) Driving Stage
// Built with Three.js r186 following CloudAI-X/threejs-skills
// Single shared WebGLRenderer cleanly reparented across Home / Quiz / Summary views.

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
  renderer.shadowMap.type = THREE.PCFShadowMap; // r186 soft PCF (PCFSoftShadowMap deprecated)
  renderer.domElement.className = "stage-3d-canvas";
  renderer.domElement.setAttribute("aria-label", "互動 3D 香港自動波 P 牌私家車駕駛場景");
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
  controls.minPolarAngle = Math.PI * 0.22;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.minAzimuthAngle = -Math.PI * 0.45;
  controls.maxAzimuthAngle = Math.PI * 0.45;
  controls.target.set(0, 0.55, -0.3);
  controls.update();

  // ==================== LIGHTING ====================
  const hemiLight = new THREE.HemisphereLight(0xd4ecff, 0x6f8478, 0.9);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff7e8, 2.5);
  sunLight.position.set(6, 9, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.left = -7;
  sunLight.shadow.camera.right = 7;
  sunLight.shadow.camera.top = 7;
  sunLight.shadow.camera.bottom = -7;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 26;
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
    // Yellow HK route shield
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

  const laneArrowTex = makeCanvasTexture(96, 96, (ctx, w, h) => {
    ctx.fillStyle = "#151c26";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.moveTo(w / 2, 78);
    ctx.lineTo(22, 46);
    ctx.lineTo(38, 46);
    ctx.lineTo(38, 18);
    ctx.lineTo(58, 18);
    ctx.lineTo(58, 46);
    ctx.lineTo(74, 46);
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

  // ==================== SHARED MATERIALS ====================
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x353c48, roughness: 0.9, metalness: 0.04 });
  const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x2a313b, roughness: 0.92 });
  const vergeMat = new THREE.MeshStandardMaterial({ color: 0x3d8b63, roughness: 0.95 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xcbd2da, roughness: 0.78 });
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
  const edgeLineMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f9, roughness: 0.55 });
  const doubleYellowMat = new THREE.MeshStandardMaterial({ color: 0xf5b700, roughness: 0.5 });

  // Authentic HK Road Users' Code p.62 reflective cat's-eyes (Left: Red, Center: White, Right: Amber)
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
  scene.add(roadMesh);

  // Left & right green HK hillside verges
  const vergeGeo = new THREE.PlaneGeometry(24, roadLen);
  const leftVerge = new THREE.Mesh(vergeGeo, vergeMat);
  leftVerge.rotation.x = -Math.PI / 2;
  leftVerge.position.set(-roadWidth / 2 - 12.15, -0.02, -8);
  leftVerge.receiveShadow = true;
  leftVerge.matrixAutoUpdate = false;
  leftVerge.updateMatrix();
  scene.add(leftVerge);

  const rightVerge = new THREE.Mesh(vergeGeo, vergeMat);
  rightVerge.rotation.x = -Math.PI / 2;
  rightVerge.position.set(roadWidth / 2 + 12.15, -0.02, -8);
  rightVerge.receiveShadow = true;
  rightVerge.matrixAutoUpdate = false;
  rightVerge.updateMatrix();
  scene.add(rightVerge);

  // Curbs & safety barriers
  const curbGeo = new THREE.BoxGeometry(0.28, 0.14, roadLen);
  [-roadWidth / 2 - 0.14, roadWidth / 2 + 0.14].forEach((cx) => {
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(cx, 0.06, -8);
    curb.receiveShadow = true;
    curb.matrixAutoUpdate = false;
    curb.updateMatrix();
    scene.add(curb);
  });

  // Static left/right solid edge lines + double yellow line on left curb hint
  const edgeLineGeo = new THREE.PlaneGeometry(0.08, roadLen);
  [-roadWidth / 2 + 0.22, roadWidth / 2 - 0.22].forEach((lx) => {
    const line = new THREE.Mesh(edgeLineGeo, edgeLineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(lx, 0.005, -8);
    line.matrixAutoUpdate = false;
    line.updateMatrix();
    scene.add(line);
  });

  // Thin yellow shoulder accent line on far left
  const yellowAccent = new THREE.Mesh(new THREE.PlaneGeometry(0.06, roadLen), doubleYellowMat);
  yellowAccent.rotation.x = -Math.PI / 2;
  yellowAccent.position.set(-roadWidth / 2 + 0.08, 0.006, -8);
  yellowAccent.matrixAutoUpdate = false;
  yellowAccent.updateMatrix();
  scene.add(yellowAccent);

  // Instanced scrolling center dashes + HK cat's-eye studs
  const DASH_COUNT = 18;
  const DASH_STEP = 2.4;
  const dashGeo = new THREE.PlaneGeometry(0.11, 1.05);
  dashGeo.rotateX(-Math.PI / 2);
  const dashInst = new THREE.InstancedMesh(dashGeo, dashMat, DASH_COUNT);
  dashInst.frustumCulled = false;
  scene.add(dashInst);

  const studGeo = new THREE.BoxGeometry(0.1, 0.028, 0.14);
  const studsLeft = new THREE.InstancedMesh(studGeo, studRedMat, DASH_COUNT);
  const studsMid = new THREE.InstancedMesh(studGeo, studWhiteMat, DASH_COUNT);
  const studsRight = new THREE.InstancedMesh(studGeo, studAmberMat, DASH_COUNT);
  [studsLeft, studsMid, studsRight].forEach((m) => {
    m.frustumCulled = false;
    scene.add(m);
  });

  // Scrolling roadside street lamps + safety cones (InstancedMesh / pooled groups)
  const PROP_COUNT = 6;
  const PROP_SPAN = 36;
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x9aa5b4, roughness: 0.45, metalness: 0.55 });
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

    // Left lamp post
    const lampL = new THREE.Group();
    const pL = new THREE.Mesh(poleGeo, poleMat);
    pL.position.y = 1.35;
    pL.castShadow = true;
    const aL = new THREE.Mesh(armGeo, poleMat);
    aL.position.set(0.3, 2.66, 0);
    const bL = new THREE.Mesh(bulbGeo, lampHeadMat);
    bL.position.set(0.55, 2.62, 0);
    lampL.add(pL, aL, bL);
    lampL.position.set(-roadWidth / 2 - 0.55, 0, 0);
    pair.add(lampL);

    // Right lamp post (staggered)
    const lampR = new THREE.Group();
    const pR = new THREE.Mesh(poleGeo, poleMat);
    pR.position.y = 1.35;
    pR.castShadow = true;
    const aR = new THREE.Mesh(armGeo, poleMat);
    aR.position.set(-0.3, 2.66, 0);
    const bR = new THREE.Mesh(bulbGeo, lampHeadMat);
    bR.position.set(-0.55, 2.62, 0);
    lampR.add(pR, aR, bR);
    lampR.position.set(roadWidth / 2 + 0.55, 0, -2.5);
    pair.add(lampR);

    // Stylized HK roadside tree on alternating sides
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
    trunk.position.y = 0.22;
    const foliage = new THREE.Mesh(treeConeGeo, treeFoliageMat);
    foliage.position.y = 1.05;
    foliage.castShadow = true;
    tree.add(trunk, foliage);
    const side = i % 2 === 0 ? -1 : 1;
    tree.position.set(side * (roadWidth / 2 + 1.8 + (i % 3) * 0.45), 0, -1.2);
    tree.scale.setScalar(0.85 + (i % 3) * 0.14);
    pair.add(tree);

    // Mini orange traffic cone on right shoulder every other bay
    if (i % 2 === 1) {
      const cone = new THREE.Group();
      const cb = new THREE.Mesh(coneBaseGeo, coneOrangeMat);
      cb.position.y = 0.02;
      const co = new THREE.Mesh(coneBodyGeo, coneOrangeMat);
      co.position.y = 0.2;
      co.castShadow = true;
      const cs = new THREE.Mesh(coneBandGeo, coneStripeMat);
      cs.position.y = 0.22;
      cone.add(cb, co, cs);
      cone.position.set(roadWidth / 2 + 0.35, 0, 1.2);
      pair.add(cone);
    }

    pair.position.z = zBase;
    pair.userData.baseZ = zBase;
    scene.add(pair);
    roadsideProps.push(pair);
  }

  // Overhead HK Expressway Green Gantry (scrolls cyclically overhead!)
  const gantry = new THREE.Group();
  const gantryPillarGeo = new THREE.BoxGeometry(0.18, 2.7, 0.18);
  const gpL = new THREE.Mesh(gantryPillarGeo, poleMat);
  gpL.position.set(-roadWidth / 2 - 0.5, 1.35, 0);
  gpL.castShadow = true;
  const gpR = new THREE.Mesh(gantryPillarGeo, poleMat);
  gpR.position.set(roadWidth / 2 + 0.5, 1.35, 0);
  gpR.castShadow = true;
  const gBeam = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 1.2, 0.16, 0.16), poleMat);
  gBeam.position.set(0, 2.62, 0);

  const gantryBoardMat = new THREE.MeshStandardMaterial({
    map: gantrySignTex,
    roughness: 0.38,
    metalness: 0.05,
    emissive: 0x003d25,
    emissiveIntensity: 0.22
  });
  const gBoard = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.92, 0.08), [
    poleMat, poleMat, poleMat, poleMat, gantryBoardMat, gantryBoardMat
  ]);
  gBoard.position.set(0, 2.55, 0.08);
  gBoard.castShadow = true;

  const laneSignalMat = new THREE.MeshStandardMaterial({
    map: laneArrowTex,
    emissive: 0x10b981,
    emissiveMap: laneArrowTex,
    emissiveIntensity: 0.7,
    roughness: 0.3
  });
  const sigGeo = new THREE.BoxGeometry(0.38, 0.38, 0.12);
  [-1.05, 1.05].forEach((sx) => {
    const sig = new THREE.Mesh(sigGeo, [
      poleMat, poleMat, poleMat, poleMat, laneSignalMat, poleMat
    ]);
    sig.position.set(sx, 1.9, 0.06);
    gantry.add(sig);
  });

  gantry.add(gpL, gpR, gBeam, gBoard);
  gantry.position.set(0, 0, -11.5);
  scene.add(gantry);

  // ==================== HERO 3D HK 1A PRIVATE CAR ====================
  const carRoot = new THREE.Group();
  const carBodyGroup = new THREE.Group(); // suspension bounce / pitch / roll
  carRoot.add(carBodyGroup);
  scene.add(carRoot);

  // Materials for stylized glossy HK Private Car (Cobalt + Pearl accents)
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b67c7,
    roughness: 0.22,
    metalness: 0.24,
    clearcoat: 1.0,
    clearcoatRoughness: 0.09
  });
  const roofMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7fb,
    roughness: 0.26,
    metalness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.12
  });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x1f2733, roughness: 0.65, metalness: 0.25 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a2636,
    roughness: 0.08,
    metalness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.22, metalness: 0.85 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x191d24, roughness: 0.88, metalness: 0.05 });

  // Dynamic light materials
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfffbeb,
    emissive: 0xfff3c4,
    emissiveIntensity: 0.7,
    roughness: 0.15
  });
  const brakeLightMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b,
    emissive: 0xef4444,
    emissiveIntensity: 0.35,
    roughness: 0.2
  });
  const reverseLightMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    emissive: 0xffffff,
    emissiveIntensity: 0.0,
    roughness: 0.2
  });
  const blinkerLeftMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.1,
    roughness: 0.25
  });
  const blinkerRightMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.1,
    roughness: 0.25
  });

  // Lower chassis + sculpted hood/trunk
  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.34, 2.24), paintMat);
  lowerBody.position.set(0, 0.37, 0);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  carBodyGroup.add(lowerBody);

  // Slight front hood slope + rear trunk accent
  const bumperFront = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.15, 0.16), trimMat);
  bumperFront.position.set(0, 0.25, -1.12);
  bumperFront.castShadow = true;
  const bumperRear = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.16, 0.16), trimMat);
  bumperRear.position.set(0, 0.25, 1.12);
  bumperRear.castShadow = true;
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.04), chromeMat);
  grille.position.set(0, 0.36, -1.13);
  carBodyGroup.add(bumperFront, bumperRear, grille);

  // Cabin greenhouse (contrast pearl roof + sleek dark glass)
  const cabinGlass = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 1.18), glassMat);
  cabinGlass.position.set(0, 0.7, 0.08);
  cabinGlass.castShadow = true;
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 1.08), roofMat);
  cabinRoof.position.set(0, 0.89, 0.1);
  cabinRoof.castShadow = true;
  carBodyGroup.add(cabinGlass, cabinRoof);

  // Side mirrors
  const mirrorGeo = new THREE.BoxGeometry(0.14, 0.08, 0.1);
  [-0.56, 0.56].forEach((mx) => {
    const mirror = new THREE.Mesh(mirrorGeo, paintMat);
    mirror.position.set(mx, 0.58, -0.34);
    mirror.castShadow = true;
    carBodyGroup.add(mirror);
  });

  // Headlights, brake lights, reverse lights, amber blinkers
  const lampGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05);
  const smallLampGeo = new THREE.BoxGeometry(0.11, 0.08, 0.05);

  [-0.36, 0.36].forEach((lx) => {
    const hl = new THREE.Mesh(lampGeo, headlightMat);
    hl.position.set(lx, 0.4, -1.12);
    const tl = new THREE.Mesh(lampGeo, brakeLightMat);
    tl.position.set(lx, 0.42, 1.12);
    carBodyGroup.add(hl, tl);
  });

  [-0.18, 0.18].forEach((lx) => {
    const rl = new THREE.Mesh(smallLampGeo, reverseLightMat);
    rl.position.set(lx, 0.42, 1.125);
    carBodyGroup.add(rl);
  });

  // Front & rear left/right amber blinkers
  const blFL = new THREE.Mesh(smallLampGeo, blinkerLeftMat);
  blFL.position.set(-0.48, 0.38, -1.11);
  const blRL = new THREE.Mesh(smallLampGeo, blinkerLeftMat);
  blRL.position.set(-0.48, 0.42, 1.125);
  const blFR = new THREE.Mesh(smallLampGeo, blinkerRightMat);
  blFR.position.set(0.48, 0.38, -1.11);
  const blRR = new THREE.Mesh(smallLampGeo, blinkerRightMat);
  blRR.position.set(0.48, 0.42, 1.125);
  carBodyGroup.add(blFL, blRL, blFR, blRR);

  // Translucent headlight beam cones (visible in dark mode & on flash!)
  const beamGeo = new THREE.ConeGeometry(0.46, 2.4, 16, 1, true);
  beamGeo.rotateX(Math.PI / 2);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfff2bf,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const beamL = new THREE.Mesh(beamGeo, beamMat);
  beamL.position.set(-0.36, 0.32, -2.32);
  const beamR = new THREE.Mesh(beamGeo, beamMat);
  beamR.position.set(0.36, 0.32, -2.32);
  carBodyGroup.add(beamL, beamR);

  // Official HK Red "P" Plates (front + rear!) & "1TAKE" License Plates
  const pPlateMat = new THREE.MeshStandardMaterial({ map: pPlateTex, roughness: 0.35 });
  const pPlateGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const pRear = new THREE.Mesh(pPlateGeo, pPlateMat);
  pRear.position.set(0.28, 0.67, 0.69);
  pRear.rotation.x = -0.14;
  const pFront = new THREE.Mesh(pPlateGeo, pPlateMat);
  pFront.position.set(-0.32, 0.66, -0.52);
  pFront.rotation.x = 0.14;
  carBodyGroup.add(pRear, pFront);

  const plateGeo = new THREE.PlaneGeometry(0.38, 0.11);
  const rearPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: rearPlateTex, roughness: 0.4 }));
  rearPlate.position.set(0, 0.29, 1.21);
  const frontPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: frontPlateTex, roughness: 0.4 }));
  frontPlate.position.set(0, 0.27, -1.21);
  frontPlate.rotation.y = Math.PI;
  carBodyGroup.add(rearPlate, frontPlate);

  // 4 Wheels (with steering pivots on front wheels)
  const wheelSpinners = [];
  const frontWheelPivots = [];
  const wheelRadius = 0.21;
  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.17, 20);
  tireGeo.rotateZ(Math.PI / 2);
  const rimGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.18, 12);
  rimGeo.rotateZ(Math.PI / 2);
  const spokeGeo = new THREE.BoxGeometry(0.19, 0.035, 0.2);

  const wheelCoords = [
    { x: -0.54, z: -0.68, front: true },
    { x: 0.54, z: -0.68, front: true },
    { x: -0.54, z: 0.68, front: false },
    { x: 0.54, z: 0.68, front: false }
  ];

  for (const wc of wheelCoords) {
    const pivot = new THREE.Group();
    pivot.position.set(wc.x, wheelRadius, wc.z);
    const spin = new THREE.Group();
    const tire = new THREE.Mesh(tireGeo, tireMat);
    tire.castShadow = true;
    const rim = new THREE.Mesh(rimGeo, chromeMat);
    const spokeA = new THREE.Mesh(spokeGeo, trimMat);
    const spokeB = new THREE.Mesh(spokeGeo, trimMat);
    spokeB.rotation.x = Math.PI / 2;
    spin.add(tire, rim, spokeA, spokeB);
    pivot.add(spin);
    carRoot.add(pivot);
    wheelSpinners.push(spin);
    if (wc.front) frontWheelPivots.push(pivot);
  }

  // Grounded contact shadow blob under car (threejs-lighting)
  const shadowBlob = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 2.95),
    new THREE.MeshBasicMaterial({ map: contactShadowTex, transparent: true, depthWrite: false })
  );
  shadowBlob.rotation.x = -Math.PI / 2;
  shadowBlob.position.set(0, 0.012, 0);
  carRoot.add(shadowBlob);

  // Layer-1 invisible click proxy around car for ultra-fast raycasting (threejs-performance)
  const carHitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.05, 2.55),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  carHitProxy.position.set(0, 0.52, 0);
  carHitProxy.layers.set(1); // pick-only layer (camera ignores layer 1)
  carRoot.add(carHitProxy);

  // ==================== VICTORY TROPHY HALO (SUMMARY MODE) ====================
  const trophyGroup = new THREE.Group();
  trophyGroup.visible = false;
  const trophyRingMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.55,
    roughness: 0.22,
    metalness: 0.72
  });
  const trophyRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.048, 12, 48), trophyRingMat);
  trophyRing.rotation.x = Math.PI / 2;
  trophyRing.position.y = 1.48;

  const trophyStarMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8
  });
  const trophyStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), trophyStarMat);
  trophyStar.position.y = 1.56;
  trophyGroup.add(trophyRing, trophyStar);
  carRoot.add(trophyGroup);

  // ==================== POOLED 3D SPARKLE PARTICLES (InstancedMesh) ====================
  const SPARK_COUNT = 36;
  const sparkGeo = new THREE.OctahedronGeometry(0.085, 0);
  const sparkMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x10b981,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.6
  });
  const sparkInst = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparkInst.frustumCulled = false;
  scene.add(sparkInst);

  const sparks = Array.from({ length: SPARK_COUNT }, () => ({
    active: false,
    life: 0,
    maxLife: 1,
    pos: new THREE.Vector3(0, -10, 0),
    vel: new THREE.Vector3(),
    rot: 0
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
      s.vel.set(
        (Math.random() - 0.5) * 2.8,
        1.6 + Math.random() * 2.6,
        (Math.random() - 0.5) * 2.2 + 0.8
      );
      s.rot = Math.random() * Math.PI * 2;
      spawned++;
    }
  }

  // ==================== SIMULATION STATE ====================
  const LEFT_LANE_X = -1.05; // Authentic HK Left-Hand Drive default lane!
  const RIGHT_LANE_X = 1.05;

  const state = {
    mode: "home", // "home" | "quiz" | "summary"
    gear: "D", // "P" | "R" | "N" | "D"
    lane: "left", // "left" | "right"
    targetX: LEFT_LANE_X,
    roadSpeed: 4.8,
    roadOffset: 0,
    boostTimer: 0,
    brakeTimer: 0,
    hazardTimer: 0,
    blinkerTimer: 0,
    blinkerDir: 0, // -1 left, +1 right
    hopPhase: 0,
    flashTimer: 0,
    combo: 0,
    readiness: 0,
    summaryPassed: true,
    isVisible: true,
    isDark: isDarkTheme(),
    animRunning: false
  };

  carRoot.position.set(LEFT_LANE_X, 0, 0.25);

  // Reusable math scratch objects (ZERO per-frame heap allocations!)
  const dummy = new THREE.Object3D();
  const targetBgColor = new THREE.Color();
  const targetCamPos = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();
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
        hudStatus.textContent =
          state.combo >= 3 ? `Turbo ${state.combo} 連中` : `自動波 1A · ${state.lane === "left" ? "靠左行車" : "右線超車"}`;
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
    if (state.gear === "D" || state.mode === "quiz") {
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

  // Pointer raycasting on the 3D car (click/tap to honk & bounce, drag to orbit)
  let downX = 0;
  let downY = 0;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    downX = e.clientX;
    downY = e.clientY;
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 7) return; // was orbit drag
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
  function snapCameraForMode(mode) {
    if (mode === "quiz") {
      camera.position.set(2.8, 1.55, 4.1);
      controls.target.set(0, 0.5, -0.5);
      controls.enabled = false;
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
    const slotId =
      mode === "quiz" ? "quiz-3d-slot" : mode === "summary" ? "summary-3d-slot" : mode === "home" ? "home-3d-slot" : null;

    if (!slotId) {
      shell.hidden = true;
      pauseLoop();
      return;
    }

    const slot = document.getElementById(slotId);
    if (!slot) return;

    state.mode = mode;
    shell.dataset.mode = mode;
    shell.hidden = false;
    if (shell.parentElement !== slot) slot.appendChild(shell);

    if (mode === "summary") {
      state.summaryPassed = opts.passed !== false;
      state.gear = "P";
      state.lane = "left";
      state.targetX = 0; // park center stage for victory celebration!
      trophyGroup.visible = true;
      trophyRingMat.color.setHex(state.summaryPassed ? 0x10b981 : 0xf59e0b);
      trophyRingMat.emissive.setHex(state.summaryPassed ? 0x059669 : 0xb45309);
      trophyStar.visible = state.summaryPassed;
      if (state.summaryPassed) emitSparks(26, 0xfacc15);
      else state.hazardTimer = 2.4;
    } else {
      trophyGroup.visible = false;
      state.targetX = state.lane === "left" ? LEFT_LANE_X : RIGHT_LANE_X;
      if (mode === "quiz") {
        state.gear = "D";
        state.combo = opts.combo || 0;
      }
    }

    snapCameraForMode(mode);
    updateHudUI();
    resizeRenderer();
    startLoopIfAllowed();
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
    reactAnswer({ isRight, combo = 0, wasPreviouslyWrong = false }) {
      state.combo = isRight ? combo : 0;
      if (isRight) {
        state.gear = "D";
        state.boostTimer = wasPreviouslyWrong ? 1.5 : combo >= 3 ? 1.3 : 0.85;
        state.hopPhase = 1.0;
        state.flashTimer = 0.35;
        emitSparks(wasPreviouslyWrong ? 26 : combo >= 3 ? 22 : 14, combo >= 3 ? 0xfacc15 : 0x10b981);
        // Playful overtaking maneuver on 3+ streak!
        if (combo >= 3 && state.lane === "left") toggleLane();
      } else {
        state.brakeTimer = 1.35;
        state.hazardTimer = 1.8;
        if (state.lane === "right") toggleLane();
      }
      updateHudUI();
      if (prefersReducedMotion()) renderSingleFrame();
    }
  };

  // ==================== ANIMATION LOOP (THREE.Timer — r186) ====================
  const timer = new THREE.Timer();
  timer.connect(document);

  function updateThemeMaterials(dt) {
    const dark = state.isDark;
    targetBgColor.setHex(dark ? 0x0f1724 : 0xeaf3fb);
    const lerpSpeed = dt > 0 ? Math.min(1, dt * 7) : 1;
    bgColor.lerp(targetBgColor, lerpSpeed);
    fog.color.copy(bgColor);

    sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, dark ? 0.95 : 2.55, 6, dt || 0.16);
    hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, dark ? 0.55 : 0.92, 6, dt || 0.16);
    scene.environmentIntensity = THREE.MathUtils.damp(scene.environmentIntensity, dark ? 0.42 : 0.74, 6, dt || 0.16);
    vergeMat.color.lerp(targetBgColor.setHex(dark ? 0x16382b : 0x3d8b63), lerpSpeed);
    lampHeadMat.emissiveIntensity = THREE.MathUtils.damp(lampHeadMat.emissiveIntensity, dark ? 2.4 : 0.2, 6, dt || 0.16);
    gantryBoardMat.emissiveIntensity = THREE.MathUtils.damp(gantryBoardMat.emissiveIntensity, dark ? 0.45 : 0.14, 6, dt || 0.16);

    const studGlow = dark ? 1.55 : 0.2;
    studRedMat.emissiveIntensity = studGlow;
    studWhiteMat.emissiveIntensity = studGlow;
    studAmberMat.emissiveIntensity = studGlow;

    const targetBeamOpacity = state.flashTimer > 0 ? 0.34 : dark ? 0.18 : 0.0;
    beamMat.opacity = THREE.MathUtils.damp(beamMat.opacity, targetBeamOpacity, 10, dt || 0.16);
    headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : dark ? 2.1 : 0.65;
  }

  function stepScene(dt, elapsed) {
    updateThemeMaterials(dt);

    // Decay timers
    if (state.boostTimer > 0) state.boostTimer = Math.max(0, state.boostTimer - dt);
    if (state.brakeTimer > 0) state.brakeTimer = Math.max(0, state.brakeTimer - dt);
    if (state.hazardTimer > 0) state.hazardTimer = Math.max(0, state.hazardTimer - dt);
    if (state.blinkerTimer > 0) state.blinkerTimer = Math.max(0, state.blinkerTimer - dt);
    if (state.flashTimer > 0) state.flashTimer = Math.max(0, state.flashTimer - dt);
    if (state.hopPhase > 0) state.hopPhase = Math.max(0, state.hopPhase - dt * 2.8);

    // Target road speed based on gear, mode, boost & braking
    let desiredSpeed = 0;
    if (state.mode === "summary") {
      desiredSpeed = 0;
    } else if (state.gear === "D") {
      const base = state.mode === "quiz" ? 6.2 + Math.min(state.combo, 6) * 0.75 : 5.4 + state.readiness * 0.02;
      desiredSpeed = base + (state.boostTimer > 0 ? 5.2 : 0) - (state.brakeTimer > 0 ? 4.4 : 0);
    } else if (state.gear === "R") {
      desiredSpeed = -2.8;
    } else if (state.gear === "N") {
      desiredSpeed = 0.6;
    } else {
      desiredSpeed = 0;
    }

    state.roadSpeed = THREE.MathUtils.damp(state.roadSpeed, desiredSpeed, 4.8, dt);
    state.roadOffset = (state.roadOffset + state.roadSpeed * dt) % 10000;

    // Live km/h readout
    if (hudSpeed) {
      const kmh = state.gear === "P" || state.mode === "summary"
        ? 0
        : Math.min(70, Math.round(Math.abs(state.roadSpeed) * 8.2));
      hudSpeed.textContent = `${state.gear} · ${kmh} km/h`;
    }

    // Update scrolling instanced road dashes & HK cat's-eye studs
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

    // Scroll roadside props & HK expressway gantry
    for (const prop of roadsideProps) {
      let z = prop.position.z + state.roadSpeed * dt;
      if (z > 8) z -= PROP_SPAN;
      else if (z < -PROP_SPAN + 8) z += PROP_SPAN;
      prop.position.z = z;
    }

    let gz = gantry.position.z + state.roadSpeed * dt;
    // In compact quiz camera, wrap gantry before its right pillar passes between camera & car
    const gantryWrapFront = state.mode === "quiz" ? -1.4 : 7.5;
    if (gz > gantryWrapFront) gz = -24;
    else if (gz < -25) gz = gantryWrapFront - 0.5;
    gantry.position.z = gz;

    // Car lateral lane steering + body roll + front-wheel steer angle
    const prevX = carRoot.position.x;
    carRoot.position.x = THREE.MathUtils.damp(carRoot.position.x, state.targetX, 5.5, dt);
    const latVel = dt > 0.0001 ? (carRoot.position.x - prevX) / dt : 0;
    const steerAngle = THREE.MathUtils.clamp(-latVel * 0.16, -0.34, 0.34);

    for (const fp of frontWheelPivots) {
      fp.rotation.y = THREE.MathUtils.damp(fp.rotation.y, steerAngle, 12, dt);
    }

    // Wheel spin matches road velocity
    const wheelDelta = (state.roadSpeed * dt) / wheelRadius;
    for (const ws of wheelSpinners) {
      ws.rotation.x -= wheelDelta;
    }

    // Playful chassis bounce, pitch (accelerate squat / brake dive), and roll
    const hopY = Math.sin(state.hopPhase * Math.PI) * 0.16;
    const engineVib = Math.sin(elapsed * (state.roadSpeed !== 0 ? 18 : 11)) * (state.gear === "P" ? 0.004 : 0.009);
    carBodyGroup.position.y = hopY + engineVib;
    carBodyGroup.rotation.z = THREE.MathUtils.damp(carBodyGroup.rotation.z, -latVel * 0.055, 8, dt);
    const targetPitch = state.brakeTimer > 0 ? -0.055 : state.boostTimer > 0 ? 0.045 : 0;
    carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, targetPitch, 9, dt);

    // Brake, reverse & amber blinker lights
    const braking = state.brakeTimer > 0 || state.gear === "P";
    brakeLightMat.emissiveIntensity = braking ? 2.6 : state.isDark ? 0.85 : 0.28;
    reverseLightMat.emissiveIntensity = state.gear === "R" ? 2.4 : 0.0;

    const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
    const leftBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir < 0)) && blinkOn;
    const rightBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir > 0)) && blinkOn;
    blinkerLeftMat.emissiveIntensity = leftBlink ? 2.8 : 0.08;
    blinkerRightMat.emissiveIntensity = rightBlink ? 2.8 : 0.08;

    // Summary celebration trophy animation & gentle hero orbit
    if (trophyGroup.visible) {
      trophyStar.rotation.y += dt * 1.9;
      trophyStar.position.y = 1.56 + Math.sin(elapsed * 2.8) * 0.08;
      trophyRing.rotation.z = elapsed * 0.6;
      if (state.summaryPassed && Math.random() < dt * 4) emitSparks(1, Math.random() > 0.5 ? 0xfacc15 : 0x10b981);
    }

    // Update pooled 3D sparkle particles
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

    // Camera subtle follow in quiz mode / OrbitControls damping in home & summary
    if (state.mode === "quiz") {
      targetCamPos.set(2.75 + carRoot.position.x * 0.25, 1.52, 4.05 + (state.boostTimer > 0 ? 0.35 : 0));
      targetLookAt.set(carRoot.position.x * 0.45, 0.5, -0.55);
      camera.position.lerp(targetCamPos, Math.min(1, dt * 4));
      camera.lookAt(targetLookAt);
    } else {
      controls.autoRotate = state.mode === "summary";
      controls.autoRotateSpeed = 1.1;
      controls.update(dt);
    }
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

  // Pause automatically when off-screen or tab hidden (0% idle GPU drain)
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

  // Precompile shaders asynchronously to prevent first-frame jank (threejs-performance)
  Promise.resolve(renderer.compileAsync ? renderer.compileAsync(scene, camera) : null)
    .catch(() => {})
    .finally(() => {
      mountToView("home");
    });
})();
