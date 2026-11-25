// 1TakePass — 3D Home Showcase & Emotional-Value Quiz Progress Bar
// Built with Three.js r186 (PMREM RoomEnvironment, GLSL Sky Dome, ExtrudeGeometry Sculpted Car).
// - Home: Interactive HK 1A P-plate private car expressway showcase (P/R/N/D, lane change, horn, orbit).
// - Quiz: Calm, zero-distraction horizontal 3D Emotional Progress Bar (sits STILL while reading;
//         wakes on-demand ONLY when advancing/answering/tapping for emotional encouragement & celebration!).
// - Summary: Victory trophy ring celebration.

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
  renderer.domElement.setAttribute("aria-label", "1TakePass 互動 3D P 牌私家車與進度展示");
  viewport.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const bgColor = new THREE.Color(isDarkTheme() ? 0x0f1724 : 0xdbeeff);
  scene.background = bgColor;
  const fog = new THREE.Fog(bgColor.getHex(), 15, 38);
  scene.fog = fog;

  // Lightweight GLSL Procedural Sky Dome (Home & Summary modes; hidden in Quiz progress mode for crisp studio backdrop)
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(isDarkTheme() ? 0x050914 : 0x4f9ae3) },
    uHorizonColor: { value: new THREE.Color(isDarkTheme() ? 0x132036 : 0xdbeeff) },
    uGroundColor: { value: new THREE.Color(isDarkTheme() ? 0x0b1521 : 0x89a89a) },
    uSunDir: { value: new THREE.Vector3(0.32, 0.36, -0.88).normalize() },
    uSunIntensity: { value: isDarkTheme() ? 0.0 : 1.0 },
    uStarIntensity: { value: isDarkTheme() ? 0.9 : 0.0 }
  };
  const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(62, 24, 14),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: `
        varying vec3 vWorldDir;
        void main() {
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uGroundColor;
        uniform vec3 uSunDir;
        uniform float uSunIntensity;
        uniform float uStarIntensity;
        varying vec3 vWorldDir;
        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }
        void main() {
          vec3 dir = normalize(vWorldDir);
          float h = dir.y;
          vec3 col = h >= 0.0
            ? mix(uHorizonColor, uTopColor, pow(clamp(h, 0.0, 1.0), 0.58))
            : mix(uHorizonColor, uGroundColor, clamp(-h * 3.5, 0.0, 1.0));
          if (uSunIntensity > 0.01 && h > -0.05) {
            float sunDot = max(dot(dir, uSunDir), 0.0);
            col += vec3(1.0, 0.94, 0.78) * (pow(sunDot, 16.0) * 0.24 + pow(sunDot, 140.0) * 0.72) * uSunIntensity;
          }
          if (uStarIntensity > 0.01 && h > 0.12) {
            vec2 grid = floor(dir.xz / (dir.y + 0.15) * 42.0);
            float rnd = hash21(grid);
            if (rnd > 0.986) {
              col += vec3(0.85, 0.92, 1.0) * smoothstep(0.12, 0.35, h) * uStarIntensity * 0.7;
            }
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
  );
  scene.add(skyDome);

  // Studio environment reflections via PMREM + RoomEnvironment
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envRT = pmrem.fromScene(roomEnv, 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = isDarkTheme() ? 0.45 : 0.78;
  roomEnv.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 90);
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

  // ==================== LIGHTING ====================
  const hemiLight = new THREE.HemisphereLight(0xd4ecff, 0x6f8478, 0.92);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff7e8, 2.55);
  sunLight.position.set(6, 9, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.left = -9;
  sunLight.shadow.camera.right = 9;
  sunLight.shadow.camera.top = 8;
  sunLight.shadow.camera.bottom = -8;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 28;
  sunLight.shadow.normalBias = 0.025;
  sunLight.shadow.bias = -0.0002;
  sunLight.shadow.intensity = 0.5;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x6eb5ff, 0.72);
  rimLight.position.set(-5, 4, -6);
  scene.add(rimLight);

  // ==================== CANVAS TEXTURES ====================
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

  function makeRepeatingTex(w, h, drawFn, { isColor = true, repeatX = 1, repeatY = 10 } = {}) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    drawFn(ctx, w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    if (isColor) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return tex;
  }

  const glowHaloTex = makeCanvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,0.96)");
    g.addColorStop(0.32, "rgba(255,255,255,0.44)");
    g.addColorStop(0.7, "rgba(255,255,255,0.1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  function makeGlowHalo(colorHex, size = 0.6, opacity = 0.7) {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowHaloTex,
        color: colorHex,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    sp.scale.set(size, size, 1);
    return sp;
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

  const laneArrowTex = makeCanvasTexture(96, 96, (ctx, w, h) => {
    ctx.fillStyle = "#141b24";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.moveTo(w / 2, 78);
    ctx.lineTo(22, 46); ctx.lineTo(38, 46); ctx.lineTo(38, 18);
    ctx.lineTo(58, 18); ctx.lineTo(58, 46); ctx.lineTo(74, 46);
    ctx.closePath();
    ctx.fill();
  });

  const checkeredBannerTex = makeCanvasTexture(256, 64, (ctx, w, h) => {
    const sq = 16;
    for (let y = 0; y < h; y += sq) {
      for (let x = 0; x < w; x += sq) {
        ctx.fillStyle = ((x / sq + y / sq) % 2 === 0) ? "#f8fafc" : "#111827";
        ctx.fillRect(x, y, sq, sq);
      }
    }
    ctx.fillStyle = "#007a4d";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 46, 10, 92, 44, 10);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1✓ PASS", w / 2, h / 2 + 1);
  });

  const passBadgeTex = makeCanvasTexture(160, 56, (ctx, w, h) => {
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 12);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.font = "900 26px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("16/20 及格", w / 2, h / 2 + 1);
  });

  const contactShadowTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    grad.addColorStop(0, "rgba(10, 16, 28, 0.52)");
    grad.addColorStop(0.55, "rgba(10, 16, 28, 0.22)");
    grad.addColorStop(1, "rgba(10, 16, 28, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  // Procedural PBR Asphalt, HK Sidewalk, Kerb & Grass textures (Home Showcase)
  const asphaltColorTex = makeRepeatingTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#363e4b";
    ctx.fillRect(0, 0, w, h);
    const drawTrack = (cx) => {
      const g = ctx.createLinearGradient(cx - 28, 0, cx + 28, 0);
      g.addColorStop(0, "rgba(18,22,30,0)");
      g.addColorStop(0.5, "rgba(18,22,30,0.22)");
      g.addColorStop(1, "rgba(18,22,30,0)");
      ctx.fillStyle = g;
      ctx.fillRect(cx - 28, 0, 56, h);
    };
    drawTrack(w * 0.27);
    drawTrack(w * 0.73);
    let seed = 1337;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 2000; i++) {
      const v = rand() > 0.5 ? 76 : 36;
      ctx.fillStyle = `rgba(${v},${v + 5},${v + 12},0.34)`;
      ctx.fillRect(rand() * w, rand() * h, 2, 2);
    }
  }, { isColor: true, repeatX: 1, repeatY: 11 });

  const asphaltRoughTex = makeRepeatingTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "rgb(218,218,218)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(172,172,172)";
    ctx.fillRect(w * 0.21, 0, 34, h);
    ctx.fillRect(w * 0.67, 0, 34, h);
  }, { isColor: false, repeatX: 1, repeatY: 11 });

  const pavementTex = makeRepeatingTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#b8c1cc";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(51,65,85,0.28)";
    ctx.lineWidth = 2;
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      const off = (y / 32) % 2 === 0 ? 0 : 16;
      for (let x = off; x < w; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 32); ctx.stroke();
      }
    }
  }, { isColor: true, repeatX: 2, repeatY: 22 });

  const curbTex = makeRepeatingTex(64, 128, (ctx, w, h) => {
    ctx.fillStyle = "#d5dce4";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(0, 0, w, 4);
    ctx.fillRect(0, h / 2, w, 4);
  }, { isColor: true, repeatX: 1, repeatY: 22 });

  const vergeTex = makeRepeatingTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#488f68";
    ctx.fillRect(0, 0, w, h);
    let seed = 9001;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = rand() > 0.5 ? "rgba(32,96,62,0.26)" : "rgba(116,178,136,0.22)";
      ctx.fillRect(rand() * w, rand() * h, 4, 6);
    }
  }, { isColor: true, repeatX: 6, repeatY: 14 });

  const skylineWinTex = makeCanvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 4; col++) {
        if (((row * 7 + col * 3) % 3) === 0) {
          ctx.fillStyle = (row + col) % 2 === 0 ? "#fde68a" : "#bfdbfe";
          ctx.fillRect(10 + col * 28, 18 + row * 28, 20, 14);
        }
      }
    }
  });

  // ==================== HOME SHOWCASE WORLD (ONLY SHOWN ON HOME & SUMMARY) ====================
  const homeWorldGroup = new THREE.Group();
  scene.add(homeWorldGroup);

  const roadMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: asphaltColorTex, roughnessMap: asphaltRoughTex, bumpMap: asphaltRoughTex,
    bumpScale: 0.015, roughness: 0.9, metalness: 0.05
  });
  const sidewalkMat = new THREE.MeshStandardMaterial({ map: pavementTex, roughness: 0.85, metalness: 0.04 });
  const vergeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: vergeTex, roughness: 0.95 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: curbTex, roughness: 0.74 });
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.48 });
  const edgeLineMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f9, roughness: 0.52 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x9aa5b4, roughness: 0.4, metalness: 0.6 });
  const hkRailMat = new THREE.MeshStandardMaterial({ color: 0xb0bac6, roughness: 0.38, metalness: 0.65 });
  const lampHeadMat = new THREE.MeshStandardMaterial({
    color: 0xfff3d1, emissive: 0xffd580, emissiveIntensity: 0.35, roughness: 0.25
  });
  const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x1f734b, roughness: 0.84 });
  const treeFoliageLightMat = new THREE.MeshStandardMaterial({ color: 0x2f8f5f, roughness: 0.8 });
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.9 });

  const studRedMat = new THREE.MeshStandardMaterial({ color: 0xe11d24, emissive: 0xe11d24, emissiveIntensity: 0.25, roughness: 0.3 });
  const studWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.3 });
  const studAmberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.3 });

  const roadWidth = 4.6;
  const roadLen = 46;

  const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, roadLen), roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.set(0, 0, -8);
  roadMesh.receiveShadow = true;
  homeWorldGroup.add(roadMesh);

  const sidewalkGeo = new THREE.PlaneGeometry(2.1, roadLen);
  [-1, 1].forEach((s) => {
    const sw = new THREE.Mesh(sidewalkGeo, sidewalkMat);
    sw.rotation.x = -Math.PI / 2;
    sw.position.set(s * (roadWidth / 2 + 1.32), 0.04, -8);
    sw.receiveShadow = true;
    homeWorldGroup.add(sw);

    const vg = new THREE.Mesh(new THREE.PlaneGeometry(24, roadLen), vergeMat);
    vg.rotation.x = -Math.PI / 2;
    vg.position.set(s * (roadWidth / 2 + 12.15), -0.02, -8);
    vg.receiveShadow = true;
    homeWorldGroup.add(vg);

    const cb = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, roadLen), curbMat);
    cb.position.set(s * (roadWidth / 2 + 0.14), 0.06, -8);
    cb.receiveShadow = true;
    homeWorldGroup.add(cb);

    const el = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadLen), edgeLineMat);
    el.rotation.x = -Math.PI / 2;
    el.position.set(s * (roadWidth / 2 - 0.22), 0.006, -8);
    homeWorldGroup.add(el);

    const railTop = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, roadLen), hkRailMat);
    railTop.position.set(s * (roadWidth / 2 + 0.34), 0.68, -8);
    const railMid = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, roadLen), hkRailMat);
    railMid.position.set(s * (roadWidth / 2 + 0.34), 0.34, -8);
    homeWorldGroup.add(railTop, railMid);
  });

  const DASH_COUNT = 18;
  const DASH_STEP = 2.4;
  const dashGeo = new THREE.PlaneGeometry(0.11, 1.05);
  dashGeo.rotateX(-Math.PI / 2);
  const dashInst = new THREE.InstancedMesh(dashGeo, dashMat, DASH_COUNT);
  const studGeo = new THREE.BoxGeometry(0.1, 0.028, 0.14);
  const studsLeft = new THREE.InstancedMesh(studGeo, studRedMat, DASH_COUNT);
  const studsMid = new THREE.InstancedMesh(studGeo, studWhiteMat, DASH_COUNT);
  const studsRight = new THREE.InstancedMesh(studGeo, studAmberMat, DASH_COUNT);
  const railPostGeo = new THREE.BoxGeometry(0.04, 0.68, 0.04);
  const railPostInstL = new THREE.InstancedMesh(railPostGeo, hkRailMat, 16);
  const railPostInstR = new THREE.InstancedMesh(railPostGeo, hkRailMat, 16);
  [dashInst, studsLeft, studsMid, studsRight, railPostInstL, railPostInstR].forEach((m) => {
    m.frustumCulled = false;
    homeWorldGroup.add(m);
  });

  // Roadside streetlamps & lush multi-layered HK trees
  const PROP_COUNT = 6;
  const PROP_SPAN = 36;
  const roadsideProps = [];
  const streetLampHalos = [];
  const poleGeo = new THREE.CylinderGeometry(0.045, 0.06, 2.75, 8);
  const armGeo = new THREE.BoxGeometry(0.95, 0.05, 0.05);
  const bulbGeo = new THREE.BoxGeometry(0.26, 0.06, 0.13);
  const treeCanopyA = new THREE.IcosahedronGeometry(0.56, 1);
  const treeCanopyB = new THREE.IcosahedronGeometry(0.42, 1);
  const treeTrunkGeo = new THREE.CylinderGeometry(0.085, 0.13, 0.72, 7);

  for (let i = 0; i < PROP_COUNT; i++) {
    const pair = new THREE.Group();
    const zBase = -i * (PROP_SPAN / PROP_COUNT) + 4;

    const lampL = new THREE.Group();
    const pL = new THREE.Mesh(poleGeo, poleMat); pL.position.y = 1.37; pL.castShadow = true;
    const aL = new THREE.Mesh(armGeo, poleMat); aL.position.set(0.45, 2.7, 0);
    const bL = new THREE.Mesh(bulbGeo, lampHeadMat); bL.position.set(0.84, 2.66, 0);
    const hL = makeGlowHalo(0xffd580, 1.05, 0.0); hL.position.set(0.84, 2.62, 0);
    streetLampHalos.push(hL);
    lampL.add(pL, aL, bL, hL);
    lampL.position.set(-roadWidth / 2 - 1.12, 0, 0);
    pair.add(lampL);

    const lampR = new THREE.Group();
    const pR = new THREE.Mesh(poleGeo, poleMat); pR.position.y = 1.37; pR.castShadow = true;
    const aR = new THREE.Mesh(armGeo, poleMat); aR.position.set(-0.45, 2.7, 0);
    const bR = new THREE.Mesh(bulbGeo, lampHeadMat); bR.position.set(-0.84, 2.66, 0);
    const hR = makeGlowHalo(0xffd580, 1.05, 0.0); hR.position.set(-0.84, 2.62, 0);
    streetLampHalos.push(hR);
    lampR.add(pR, aR, bR, hR);
    lampR.position.set(roadWidth / 2 + 1.12, 0, -2.5);
    pair.add(lampR);

    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat); trunk.position.y = 0.36; trunk.castShadow = true;
    const cMain = new THREE.Mesh(treeCanopyA, treeFoliageMat); cMain.position.set(0, 1.08, 0); cMain.castShadow = true;
    const cSub1 = new THREE.Mesh(treeCanopyB, treeFoliageLightMat); cSub1.position.set(0.28, 1.32, 0.14);
    const cSub2 = new THREE.Mesh(treeCanopyB, treeFoliageMat); cSub2.position.set(-0.26, 0.98, -0.18);
    tree.add(trunk, cMain, cSub1, cSub2);
    const side = i % 2 === 0 ? -1 : 1;
    tree.position.set(side * (roadWidth / 2 + 2.15 + (i % 3) * 0.45), 0, -1.2);
    tree.scale.setScalar(0.86 + (i % 3) * 0.15);
    pair.add(tree);

    pair.position.z = zBase;
    homeWorldGroup.add(pair);
    roadsideProps.push(pair);
  }

  // Distant HK Lion Rock ridge + Victoria Harbour skyline silhouette
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x3b6e5c, roughness: 0.95 });
  const skylineTowerMat = new THREE.MeshStandardMaterial({
    color: 0x64748b, emissive: 0xfde68a, emissiveMap: skylineWinTex, emissiveIntensity: 0.12, roughness: 0.78
  });
  [
    { x: -16, r: 9.5, h: 6.2, z: -31 },
    { x: -5,  r: 8.0, h: 4.8, z: -32.5 },
    { x: 6,   r: 9.0, h: 5.5, z: -32 },
    { x: 17,  r: 10.2, h: 6.8, z: -30.5 }
  ].forEach((hs) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(hs.r, hs.h, 7), hillMat);
    hill.position.set(hs.x, hs.h * 0.38, hs.z);
    hill.scale.set(1.5, 1, 0.65);
    homeWorldGroup.add(hill);
  });
  for (let i = 0; i < 14; i++) {
    const tx = -22 + i * 3.35 + ((i % 2) * 0.4);
    if (Math.abs(tx) < 3.4) continue;
    const th = 4.2 + ((i * 37) % 6) * 1.45;
    const tw = 1.6 + (i % 3) * 0.45;
    const tower = new THREE.Mesh(new THREE.BoxGeometry(tw, th, 1.8), skylineTowerMat);
    tower.position.set(tx, th / 2 - 0.1, -26.8 - (i % 3) * 1.4);
    homeWorldGroup.add(tower);
  }

  // Overhead 1TakePass HK Expressway Green Gantry
  const gantry = new THREE.Group();
  const gpL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.7, 0.18), poleMat); gpL.position.set(-roadWidth / 2 - 0.5, 1.35, 0); gpL.castShadow = true;
  const gpR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.7, 0.18), poleMat); gpR.position.set(roadWidth / 2 + 0.5, 1.35, 0); gpR.castShadow = true;
  const gBeam = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 1.2, 0.16, 0.16), poleMat); gBeam.position.set(0, 2.62, 0);
  const gantryBoardMat = new THREE.MeshStandardMaterial({
    map: gantrySignTex, roughness: 0.38, metalness: 0.05, emissive: 0x003d25, emissiveIntensity: 0.2
  });
  const gBoard = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.92, 0.08), [
    poleMat, poleMat, poleMat, poleMat, gantryBoardMat, gantryBoardMat
  ]);
  gBoard.position.set(0, 2.55, 0.08);
  gBoard.castShadow = true;
  const laneSigMat = new THREE.MeshStandardMaterial({
    map: laneArrowTex, emissive: 0x10b981, emissiveMap: laneArrowTex, emissiveIntensity: 0.85, roughness: 0.3
  });
  const sigGeo = new THREE.BoxGeometry(0.42, 0.42, 0.12);
  const sigL = new THREE.Mesh(sigGeo, [poleMat, poleMat, poleMat, poleMat, laneSigMat, poleMat]); sigL.position.set(-1.05, 1.9, 0.06);
  const sigR = new THREE.Mesh(sigGeo, [poleMat, poleMat, poleMat, poleMat, laneSigMat, poleMat]); sigR.position.set(1.05, 1.9, 0.06);
  gantry.add(gpL, gpR, gBeam, gBoard, sigL, sigR);
  gantry.position.set(0, 0, -10.5);
  homeWorldGroup.add(gantry);

  // ==================== EMOTIONAL 3D QUIZ PROGRESS TRACK (ONLY SHOWN IN QUIZ MODE!) ====================
  const TRACK_MIN_X = -6.2;
  const TRACK_MAX_X = 6.2;
  const TRACK_SPAN = TRACK_MAX_X - TRACK_MIN_X;

  const progressTrackGroup = new THREE.Group();
  progressTrackGroup.visible = false;
  scene.add(progressTrackGroup);

  const trackFloorMat = new THREE.MeshStandardMaterial({ color: 0xe6edf6, roughness: 0.92 });
  const trackFloor = new THREE.Mesh(new THREE.PlaneGeometry(42, 16), trackFloorMat);
  trackFloor.rotation.x = -Math.PI / 2;
  trackFloor.position.set(0, -0.06, 0);
  trackFloor.receiveShadow = true;
  progressTrackGroup.add(trackFloor);

  // Clean horizontal elevated 3D runway bar (pure progress metaphor — ZERO road rules!)
  const trackDeckMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.72, metalness: 0.08 });
  const trackDeck = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 2.2, 0.14, 1.55), trackDeckMat);
  trackDeck.position.set(0, -0.07, 0);
  trackDeck.receiveShadow = true;
  progressTrackGroup.add(trackDeck);

  const trackEdgeMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.55 });
  [-0.78, 0.78].forEach((rz) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 2.24, 0.07, 0.07), trackEdgeMat);
    rail.position.set(0, 0.015, rz);
    progressTrackGroup.add(rail);
  });

  // Glowing filled progress ribbon trailing cleanly behind the car (0% -> 100%)
  const progressFillMat = new THREE.MeshStandardMaterial({
    color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.62, roughness: 0.28
  });
  const progressFillMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 0.055, 0.66), progressFillMat);
  progressFillMesh.position.set(TRACK_MIN_X, 0.025, 0);
  progressTrackGroup.add(progressFillMesh);

  // Unfilled guide rail ahead of the car
  const guideRailMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
  const guideRail = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN, 0.022, 0.22), guideRailMat);
  guideRail.position.set(0, 0.012, 0);
  progressTrackGroup.add(guideRail);

  // 25% / 50% / 75% checkpoint dots along the track
  const milestoneDots = [0.25, 0.5, 0.75].map((pct) => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, emissive: 0x10b981, emissiveIntensity: 0.0, roughness: 0.35
    });
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 18), mat);
    dot.position.set(TRACK_MIN_X + TRACK_SPAN * pct, 0.032, 0.48);
    progressTrackGroup.add(dot);
    return { pct, mat };
  });

  // Start Marker Flag on far left (起點)
  const startPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 1.15, 8), poleMat);
  startPost.position.set(TRACK_MIN_X - 0.85, 0.57, -0.58);
  const startFlag = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.34, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x0b67c7, emissive: 0x0b67c7, emissiveIntensity: 0.28, roughness: 0.35 })
  );
  startFlag.position.set(TRACK_MIN_X - 0.57, 0.98, -0.58);
  progressTrackGroup.add(startPost, startFlag);

  // Optional 16/20 Golden Pass Line Marker (80% mark — front-facing sign cleanly readable!)
  const passArchGroup = new THREE.Group();
  const passArchMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.3, metalness: 0.45
  });
  const passArchX = TRACK_MIN_X + TRACK_SPAN * 0.8;
  const passPost = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 1.32, 8), passArchMat);
  passPost.position.set(passArchX, 0.66, -0.64);
  const passBadge = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.38, 0.08),
    new THREE.MeshStandardMaterial({ map: passBadgeTex, emissive: 0xf59e0b, emissiveIntensity: 0.24, roughness: 0.3 })
  );
  passBadge.position.set(passArchX, 1.32, -0.62);
  const passLine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 1.48), passArchMat);
  passLine.position.set(passArchX, 0.028, 0);
  const passHalo = makeGlowHalo(0xfacc15, 1.4, 0.0);
  passHalo.position.set(passArchX, 1.32, -0.5);
  passArchGroup.add(passPost, passBadge, passLine, passHalo);
  passArchGroup.visible = false;
  progressTrackGroup.add(passArchGroup);

  // Checkered Finish Arch on far right (終點 1✓ PASS — facing directly toward camera!)
  const finishArchGroup = new THREE.Group();
  const finishX = TRACK_MAX_X + 0.72;
  [-0.56, 0.56].forEach((fxOff) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.38, 10), poleMat);
    p.position.set(finishX + fxOff * 0.1, 0.69, fxOff > 0 ? -0.68 : 0.68);
    finishArchGroup.add(p);
  });
  const finishBanner = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.44, 0.09),
    new THREE.MeshStandardMaterial({ map: checkeredBannerTex, emissive: 0x059669, emissiveIntensity: 0.2, roughness: 0.32 })
  );
  finishBanner.position.set(finishX, 1.36, -0.6);
  const finishHalo = makeGlowHalo(0x10b981, 1.5, 0.16);
  finishHalo.position.set(finishX, 1.36, -0.45);
  finishArchGroup.add(finishBanner, finishHalo);
  progressTrackGroup.add(finishArchGroup);

  // ==================== HERO 3D HK 1A PRIVATE CAR (Sculpted Hatchback) ====================
  const carRoot = new THREE.Group();
  const carBodyGroup = new THREE.Group();
  carRoot.add(carBodyGroup);
  scene.add(carRoot);

  const paintMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b67c7, roughness: 0.18, metalness: 0.32, clearcoat: 1.0, clearcoatRoughness: 0.06
  });
  const roofMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7fb, roughness: 0.22, metalness: 0.12, clearcoat: 0.95, clearcoatRoughness: 0.08
  });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x1b222e, roughness: 0.6, metalness: 0.28 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x142030, roughness: 0.06, metalness: 0.24, clearcoat: 1.0, clearcoatRoughness: 0.04
  });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe6edf5, roughness: 0.18, metalness: 0.9 });
  const caliperMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.4 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x191d24, roughness: 0.88, metalness: 0.05 });

  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, emissive: 0xfff3c4, emissiveIntensity: 0.7, roughness: 0.15 });
  const brakeLightMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, emissive: 0xef4444, emissiveIntensity: 0.35, roughness: 0.18 });
  const reverseLightMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: 0xffffff, emissiveIntensity: 0.0, roughness: 0.2 });
  const blinkerLeftMat = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.1, roughness: 0.25 });
  const blinkerRightMat = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.1, roughness: 0.25 });

  const heroProfile = new THREE.Shape();
  heroProfile.moveTo(-1.12, 0.18);
  heroProfile.lineTo(1.12, 0.18);
  heroProfile.lineTo(1.14, 0.38);
  heroProfile.lineTo(0.96, 0.53);
  heroProfile.lineTo(0.46, 0.59);
  heroProfile.lineTo(0.16, 0.90);
  heroProfile.lineTo(-0.62, 0.90);
  heroProfile.lineTo(-0.92, 0.62);
  heroProfile.lineTo(-1.10, 0.54);
  heroProfile.lineTo(-1.14, 0.36);
  heroProfile.closePath();

  const heroShellGeo = new THREE.ExtrudeGeometry(heroProfile, {
    depth: 0.98, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.045, bevelSegments: 3
  });
  heroShellGeo.translate(0, 0, -0.49);
  heroShellGeo.rotateY(Math.PI / 2);

  const lowerBody = new THREE.Mesh(heroShellGeo, paintMat);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  carBodyGroup.add(lowerBody);

  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.065, 0.84), roofMat);
  cabinRoof.position.set(0, 0.93, 0.22);
  cabinRoof.castShadow = true;
  const rearSpoiler = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.045, 0.16), trimMat);
  rearSpoiler.position.set(0, 0.93, 0.68);
  rearSpoiler.rotation.x = 0.14;
  const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.23, 0.92), glassMat);
  sideGlass.position.set(0, 0.74, 0.18);
  const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 0.04), glassMat);
  frontGlass.position.set(0, 0.74, -0.34);
  frontGlass.rotation.x = -0.68;
  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.31, 0.04), glassMat);
  rearGlass.position.set(0, 0.75, 0.79);
  rearGlass.rotation.x = 0.68;
  carBodyGroup.add(cabinRoof, rearSpoiler, sideGlass, frontGlass, rearGlass);

  const bumperFront = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.13, 0.16), trimMat);
  bumperFront.position.set(0, 0.22, -1.11);
  const bumperRear = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.14, 0.16), trimMat);
  bumperRear.position.set(0, 0.22, 1.11);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.12, 0.05), trimMat);
  grille.position.set(0, 0.35, -1.16);
  const grilleChrome = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.032, 0.06), chromeMat);
  grilleChrome.position.set(0, 0.37, -1.17);
  [-0.53, 0.53].forEach((sx) => {
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 1.24), trimMat);
    skirt.position.set(sx, 0.19, 0);
    carBodyGroup.add(skirt);
  });
  carBodyGroup.add(bumperFront, bumperRear, grille, grilleChrome);

  const mirrorGeo = new THREE.BoxGeometry(0.15, 0.075, 0.11);
  [-0.57, 0.57].forEach((mx) => {
    const mirror = new THREE.Mesh(mirrorGeo, paintMat);
    mirror.position.set(mx, 0.62, -0.32);
    mirror.castShadow = true;
    carBodyGroup.add(mirror);
  });

  const lampGeo = new THREE.BoxGeometry(0.24, 0.095, 0.055);
  const smallLampGeo = new THREE.BoxGeometry(0.11, 0.08, 0.055);
  const tailBar = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.04, 0.045), brakeLightMat);
  tailBar.position.set(0, 0.45, 1.145);
  carBodyGroup.add(tailBar);

  const brakeHalos = [];
  const headHalos = [];
  [-0.36, 0.36].forEach((lx) => {
    const hl = new THREE.Mesh(lampGeo, headlightMat); hl.position.set(lx, 0.41, -1.15);
    const tl = new THREE.Mesh(lampGeo, brakeLightMat); tl.position.set(lx, 0.44, 1.15);
    const bh = makeGlowHalo(0xef4444, 0.54, 0.2); bh.position.set(lx, 0.44, 1.22);
    const hh = makeGlowHalo(0xfff4c8, 0.56, 0.16); hh.position.set(lx, 0.41, -1.22);
    brakeHalos.push(bh);
    headHalos.push(hh);
    carBodyGroup.add(hl, tl, bh, hh);
  });
  [-0.18, 0.18].forEach((lx) => {
    const rl = new THREE.Mesh(smallLampGeo, reverseLightMat); rl.position.set(lx, 0.44, 1.155);
    carBodyGroup.add(rl);
  });

  const blFL = new THREE.Mesh(smallLampGeo, blinkerLeftMat); blFL.position.set(-0.48, 0.39, -1.13);
  const blRL = new THREE.Mesh(smallLampGeo, blinkerLeftMat); blRL.position.set(-0.48, 0.44, 1.155);
  const blFR = new THREE.Mesh(smallLampGeo, blinkerRightMat); blFR.position.set(0.48, 0.39, -1.13);
  const blRR = new THREE.Mesh(smallLampGeo, blinkerRightMat); blRR.position.set(0.48, 0.44, 1.155);
  carBodyGroup.add(blFL, blRL, blFR, blRR);

  const beamGeo = new THREE.ConeGeometry(0.5, 2.6, 16, 1, true);
  beamGeo.rotateX(Math.PI / 2);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfff2bf, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const beamL = new THREE.Mesh(beamGeo, beamMat); beamL.position.set(-0.36, 0.33, -2.45);
  const beamR = new THREE.Mesh(beamGeo, beamMat); beamR.position.set(0.36, 0.33, -2.45);
  const headGroundPoolMat = new THREE.MeshBasicMaterial({
    map: glowHaloTex, color: 0xfff3c4, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const headGroundPool = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 4.4), headGroundPoolMat);
  headGroundPool.rotation.x = -Math.PI / 2;
  headGroundPool.position.set(0, 0.015, -3.35);
  const brakeGroundPoolMat = new THREE.MeshBasicMaterial({
    map: glowHaloTex, color: 0xef4444, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const brakeGroundPool = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.7), brakeGroundPoolMat);
  brakeGroundPool.rotation.x = -Math.PI / 2;
  brakeGroundPool.position.set(0, 0.015, 1.7);
  carBodyGroup.add(beamL, beamR, headGroundPool, brakeGroundPool);

  const pPlateMat = new THREE.MeshStandardMaterial({ map: pPlateTex, roughness: 0.32 });
  const pPlateGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const pRear = new THREE.Mesh(pPlateGeo, pPlateMat); pRear.position.set(0.28, 0.72, 0.90); pRear.rotation.x = -0.64;
  const pFront = new THREE.Mesh(pPlateGeo, pPlateMat); pFront.position.set(-0.32, 0.72, -0.40); pFront.rotation.x = 0.64;
  // Side P-badge visible clearly on side-profile Quiz progress bar!
  const pSide = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.22), pPlateMat);
  pSide.position.set(0.555, 0.44, -0.1);
  carBodyGroup.add(pRear, pFront, pSide);

  const plateGeo = new THREE.PlaneGeometry(0.38, 0.11);
  const rearPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: rearPlateTex, emissive: 0xfacc15, emissiveIntensity: 0.18, roughness: 0.38 }));
  rearPlate.position.set(0, 0.28, 1.2);
  const frontPlate = new THREE.Mesh(plateGeo, new THREE.MeshStandardMaterial({ map: frontPlateTex, roughness: 0.38 }));
  frontPlate.position.set(0, 0.26, -1.2);
  frontPlate.rotation.y = Math.PI;
  carBodyGroup.add(rearPlate, frontPlate);

  const wheelSpinners = [];
  const frontWheelPivots = [];
  const wheelRadius = 0.21;
  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.175, 22);
  tireGeo.rotateZ(Math.PI / 2);
  const rimGeo = new THREE.CylinderGeometry(0.132, 0.132, 0.182, 14);
  rimGeo.rotateZ(Math.PI / 2);
  const spokeGeo = new THREE.BoxGeometry(0.19, 0.032, 0.22);
  const caliperGeo = new THREE.BoxGeometry(0.11, 0.09, 0.075);

  [
    { x: -0.55, z: -0.68, front: true },
    { x: 0.55, z: -0.68, front: true },
    { x: -0.55, z: 0.68, front: false },
    { x: 0.55, z: 0.68, front: false }
  ].forEach((wc) => {
    const pivot = new THREE.Group();
    pivot.position.set(wc.x, wheelRadius, wc.z);
    const spin = new THREE.Group();
    const tire = new THREE.Mesh(tireGeo, tireMat); tire.castShadow = true;
    const rim = new THREE.Mesh(rimGeo, chromeMat);
    const spokeA = new THREE.Mesh(spokeGeo, trimMat);
    const spokeB = new THREE.Mesh(spokeGeo, trimMat); spokeB.rotation.x = Math.PI / 3;
    const spokeC = new THREE.Mesh(spokeGeo, trimMat); spokeC.rotation.x = (Math.PI * 2) / 3;
    spin.add(tire, rim, spokeA, spokeB, spokeC);
    const caliper = new THREE.Mesh(caliperGeo, caliperMat);
    caliper.position.set(wc.x < 0 ? 0.02 : -0.02, 0.04, 0.06);
    pivot.add(spin, caliper);
    carRoot.add(pivot);
    wheelSpinners.push(spin);
    if (wc.front) frontWheelPivots.push(pivot);
  });

  const shadowBlob = new THREE.Mesh(
    new THREE.PlaneGeometry(1.78, 2.98),
    new THREE.MeshBasicMaterial({ map: contactShadowTex, transparent: true, depthWrite: false })
  );
  shadowBlob.rotation.x = -Math.PI / 2;
  shadowBlob.position.set(0, 0.012, 0);
  carRoot.add(shadowBlob);

  // Subtle golden aura sprite behind car when on 3+ combo streak in Quiz!
  const streakAura = makeGlowHalo(0xfacc15, 2.4, 0.0);
  streakAura.position.set(0, 0.6, 0);
  carRoot.add(streakAura);

  const carHitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.15, 2.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  carHitProxy.position.set(0, 0.55, 0);
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
  scene.add(sparkInst);

  const sparks = Array.from({ length: SPARK_COUNT }, () => ({
    active: false, life: 0, maxLife: 1,
    pos: new THREE.Vector3(0, -20, 0), vel: new THREE.Vector3(), rot: 0
  }));

  function hasActiveSparks() {
    for (let i = 0; i < SPARK_COUNT; i++) if (sparks[i].active) return true;
    return false;
  }

  function emitSparks(count, colorHex, originX = carRoot.position.x, originY = 0.62, originZ = carRoot.position.z) {
    if (prefersReducedMotion()) return;
    sparkMat.emissive.setHex(colorHex);
    sparkMat.color.setHex(colorHex);
    let spawned = 0;
    for (let i = 0; i < SPARK_COUNT && spawned < count; i++) {
      const s = sparks[i];
      if (s.active) continue;
      s.active = true;
      s.life = 0;
      s.maxLife = 0.6 + Math.random() * 0.45;
      s.pos.set(
        originX + (Math.random() - 0.5) * 1.1,
        originY + Math.random() * 0.45,
        originZ + (Math.random() - 0.5) * 0.8
      );
      s.vel.set((Math.random() - 0.5) * 2.6, 1.5 + Math.random() * 2.3, (Math.random() - 0.5) * 1.4);
      s.rot = Math.random() * Math.PI * 2;
      spawned++;
    }
  }

  // ==================== STATE ====================
  const LEFT_LANE_X = -1.05;
  const RIGHT_LANE_X = 1.05;

  const state = {
    mode: "home", // "home" | "quiz" | "summary"
    gear: "D",
    lane: "left",
    targetX: LEFT_LANE_X,
    roadSpeed: 5.0,
    roadOffset: 0,
    boostTimer: 0,
    brakeTimer: 0,
    hazardTimer: 0,
    blinkerTimer: 0,
    blinkerDir: 0,
    hopPhase: 0,
    wobbleTimer: 0,
    flashTimer: 0,
    combo: 0,
    readiness: 0,
    summaryPassed: true,
    isVisible: true,
    isDark: isDarkTheme(),
    animRunning: false,
    hasExternalMount: false,
    // Quiz Emotional Progress Bar state (calm & STILL while reading; wakes only on answer/step/click!)
    progressRatio: 0,
    quizAnswered: 0,
    quizTotal: 20,
    quizRight: 0,
    quizIsExam: false,
    quizPassMin: 16,
    quizRevealAtEnd: false,
    quizMoodText: "出發！一步一步行向 1 Take Pass",
    quizMoodTone: "neutral", // "neutral" | "right" | "streak" | "wrong" | "passed"
    quizPassedNotified: false,
    quizWakeTimer: 0
  };

  carRoot.position.set(LEFT_LANE_X, 0, 0.25);

  const dummy = new THREE.Object3D();
  const targetBgColor = new THREE.Color();
  const targetSkyTop = new THREE.Color();
  const targetSkyGround = new THREE.Color();
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

  function pickDefaultMoodText() {
    const pct = Math.round(state.progressRatio * 100);
    if (state.quizAnswered === 0) return "出發！一步一步行向 1 Take Pass";
    if (state.quizIsExam && !state.quizRevealAtEnd && state.quizRight >= state.quizPassMin) {
      return `已衝過及格線（${state.quizRight}/${state.quizPassMin}）· 穩住陣腳！`;
    }
    if (pct >= 85) return "就到終點喇 · 最後衝刺！";
    if (pct >= 50) return "過咗一半喇 · 保持好節奏！";
    if (state.quizRevealAtEnd) return `已作答 ${state.quizAnswered}/${state.quizTotal} 題 · 沉住氣穩陣過關`;
    return "穩陣前進 · 每做一題離 1 Take Pass 更近！";
  }

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
        hudStatus.dataset.tone = state.summaryPassed ? "right" : "neutral";
      } else if (state.mode === "quiz") {
        hudStatus.textContent = state.quizMoodText || pickDefaultMoodText();
        hudStatus.dataset.tone = state.quizMoodTone || "neutral";
      } else {
        const gearText = {
          P: "P 波泊定",
          R: "R 波倒車",
          N: "N 波空波",
          D: state.lane === "left" ? "D 波靠左巡航" : "D 波右線超車"
        }[state.gear];
        hudStatus.textContent = `3D 模擬車道 · ${gearText}`;
        hudStatus.dataset.tone = "neutral";
      }
    }
    if (hudSpeed && state.mode === "quiz") {
      const pct = Math.round(state.progressRatio * 100);
      hudSpeed.textContent = `${state.quizAnswered}/${state.quizTotal} · ${pct}%`;
    }
  }

  function wakeQuizAnim(seconds = 1.05) {
    if (state.mode !== "quiz") return;
    state.quizWakeTimer = Math.max(state.quizWakeTimer, seconds);
    if (prefersReducedMotion()) {
      snapQuizProgressImmediate();
      renderSingleFrame();
      return;
    }
    startLoopIfAllowed();
  }

  function snapQuizProgressImmediate() {
    if (state.mode !== "quiz") return;
    const tx = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;
    carRoot.position.set(tx, 0, 0);
    updateProgressTrackVisuals();
  }

  function updateProgressTrackVisuals() {
    const filledSpan = Math.max(0.06, carRoot.position.x - TRACK_MIN_X);
    progressFillMesh.scale.x = filledSpan;
    progressFillMesh.position.x = TRACK_MIN_X + filledSpan * 0.5;

    const isStreak = !state.quizRevealAtEnd && state.combo >= 3;
    const isPassed = state.quizIsExam && !state.quizRevealAtEnd && state.quizRight >= state.quizPassMin;
    if (isPassed || isStreak) {
      progressFillMat.color.setHex(0xf59e0b);
      progressFillMat.emissive.setHex(0xd97706);
      progressFillMat.emissiveIntensity = 0.65;
    } else if (state.quizRevealAtEnd) {
      progressFillMat.color.setHex(0x0b67c7);
      progressFillMat.emissive.setHex(0x0284c7);
      progressFillMat.emissiveIntensity = 0.45;
    } else {
      progressFillMat.color.setHex(0x10b981);
      progressFillMat.emissive.setHex(0x059669);
      progressFillMat.emissiveIntensity = 0.52;
    }

    const curPct = THREE.MathUtils.clamp((carRoot.position.x - TRACK_MIN_X) / TRACK_SPAN, 0, 1);
    for (const m of milestoneDots) {
      const reached = curPct >= m.pct - 0.015;
      m.mat.color.setHex(reached ? 0x10b981 : 0x64748b);
      m.mat.emissiveIntensity = reached ? 0.65 : 0.0;
    }

    passArchGroup.visible = state.quizIsExam && state.quizTotal >= 10;
    passArchMat.emissiveIntensity = isPassed ? 1.1 : 0.22;
    passHalo.material.opacity = isPassed ? 0.72 : 0.0;
    finishHalo.material.opacity = curPct >= 0.96 ? 0.75 : 0.14;
    streakAura.material.opacity = state.mode === "quiz" && (isStreak || isPassed) ? 0.42 : 0.0;
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
    if (state.mode === "home" && state.gear === "D") state.boostTimer = 0.9;
    emitSparks(14, state.mode === "quiz" ? 0xfacc15 : 0x3898ff);
    if (typeof window.playOneTakeHorn === "function") window.playOneTakeHorn();
    if (state.mode === "quiz") {
      state.quizMoodText = "呠呠！深呼吸一下，你一定 1 Take Pass！";
      state.quizMoodTone = "streak";
      updateHudUI();
      wakeQuizAnim(1.1);
    } else if (prefersReducedMotion()) {
      renderSingleFrame();
    }
  }

  hudGearBtns.forEach((b) => b.addEventListener("click", () => setGear(b.dataset.gear)));
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
    const hit = raycaster.intersectObjects(pickables, false).length > 0;
    renderer.domElement.style.cursor = hit ? "pointer" : state.mode === "quiz" ? "default" : "grab";
  });

  // ==================== MOUNTING & CAMERA MODES ====================
  function fitQuizProgressCamera() {
    const halfW = 8.05; // fills ~88% of viewport width edge-to-edge on desktop AND mobile!
    const halfH = 1.04; // fits car + 16/20 & 1✓ PASS banners cleanly top-to-bottom!
    camera.fov = 26;
    const tanHalfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const tanHalfH = tanHalfV * Math.max(1.5, camera.aspect);
    const camZ = Math.max(halfW / tanHalfH, halfH / tanHalfV);
    camera.position.set(0, camZ * 0.14 + 0.42, camZ);
    controls.target.set(0, 0.56, 0);
    controls.enabled = false;
    camera.updateProjectionMatrix();
    controls.update();
  }

  function snapCameraForMode(mode) {
    if (mode === "quiz") {
      fitQuizProgressCamera();
      return;
    } else if (mode === "summary") {
      camera.fov = 36;
      camera.updateProjectionMatrix();
      camera.position.set(3.2, 2.05, 4.1);
      controls.target.set(0, 0.72, 0.15);
      controls.enabled = true;
    } else {
      camera.fov = 36;
      camera.updateProjectionMatrix();
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
    if (state.mode === "quiz") {
      fitQuizProgressCamera();
    } else {
      camera.updateProjectionMatrix();
    }
    renderer.setSize(w, h, false);
    renderSingleFrame();
  }

  const resizeObserver = new ResizeObserver(() => resizeRenderer());
  resizeObserver.observe(viewport);

  function mountToView(mode, opts = {}) {
    state.hasExternalMount = true;
    const slotId =
      mode === "quiz" ? "quiz-3d-slot" : mode === "summary" ? "summary-3d-slot" : mode === "home" ? "home-3d-slot" : null;

    if (!slotId) {
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
      homeWorldGroup.visible = true;
      progressTrackGroup.visible = false;
      skyDome.visible = true;
      trophyGroup.visible = false;
      pSide.visible = false;
      carRoot.scale.setScalar(1);
      carRoot.rotation.set(0, 0, 0);
      carBodyGroup.rotation.set(0, 0, 0);
      state.gear = "D";
      state.lane = "left";
      state.targetX = LEFT_LANE_X;
      carRoot.position.set(LEFT_LANE_X, 0, 0.25);
      gantry.position.z = -10.5;
      streakAura.material.opacity = 0;
    } else if (mode === "summary") {
      homeWorldGroup.visible = true;
      progressTrackGroup.visible = false;
      skyDome.visible = true;
      trophyGroup.visible = true;
      pSide.visible = false;
      carRoot.scale.setScalar(1);
      carRoot.rotation.set(0, 0, 0);
      carBodyGroup.rotation.set(0, 0, 0);
      state.summaryPassed = opts.passed !== false;
      state.gear = "P";
      state.lane = "left";
      state.targetX = 0;
      carRoot.position.set(0, 0, 0.25);
      trophyRingMat.color.setHex(state.summaryPassed ? 0x10b981 : 0xf59e0b);
      trophyRingMat.emissive.setHex(state.summaryPassed ? 0x059669 : 0xb45309);
      trophyStar.visible = state.summaryPassed;
      streakAura.material.opacity = 0;
      if (state.summaryPassed) emitSparks(24, 0xfacc15);
      else state.hazardTimer = 2.0;
    } else if (mode === "quiz") {
      homeWorldGroup.visible = false;
      progressTrackGroup.visible = true;
      skyDome.visible = false;
      trophyGroup.visible = false;
      pSide.visible = true;
      carRoot.scale.setScalar(0.92);
      carRoot.rotation.set(0, -Math.PI / 2, 0); // clean side profile facing RIGHT (+X toward Finish!)
      carBodyGroup.rotation.set(0, 0, 0);
      carRoot.position.z = 0;
      state.combo = opts.combo || 0;
      if (changedMode) {
        state.quizPassedNotified = false;
        state.quizMoodTone = "neutral";
        state.quizMoodText = pickDefaultMoodText();
        carRoot.position.x = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;
      }
      updateProgressTrackVisuals();
    }

    if (changedMode || mode === "summary") snapCameraForMode(mode);
    updateHudUI();
    resizeRenderer();

    if (mode === "quiz") {
      // Calm & STILL at rest in quiz mode — only render a fresh frame unless an animation is active!
      if (state.quizWakeTimer > 0) startLoopIfAllowed();
      else {
        pauseLoop();
        renderSingleFrame();
      }
    } else {
      startLoopIfAllowed();
    }
  }

  // ==================== PUBLIC API FOR app.js ====================
  window.OneTake3D = {
    mount: mountToView,
    supportsQuestion() {
      // Pure emotional progress bar works cleanly on ALL 300 questions!
      return true;
    },
    setTheme(dark) {
      state.isDark = !!dark;
      applyThemeColors(1);
      renderSingleFrame();
    },
    setReadiness(pct) {
      state.readiness = Math.max(0, Math.min(100, Number(pct) || 0));
    },
    setProgress({ answered = 0, total = 20, right = 0, combo = 0, isExam = false, passMin = 16, revealAtEnd = false, snap = false } = {}) {
      const safeTotal = Math.max(1, total);
      const nextRatio = THREE.MathUtils.clamp(answered / safeTotal, 0, 1);
      const moved = Math.abs(nextRatio - state.progressRatio) > 0.001;
      state.quizAnswered = answered;
      state.quizTotal = safeTotal;
      state.quizRight = right;
      state.combo = combo;
      state.quizIsExam = !!isExam;
      state.quizPassMin = passMin;
      state.quizRevealAtEnd = !!revealAtEnd;
      state.progressRatio = nextRatio;
      state.targetX = TRACK_MIN_X + TRACK_SPAN * nextRatio;

      if (answered === 0) {
        state.quizPassedNotified = false;
        state.quizMoodTone = "neutral";
        state.quizMoodText = pickDefaultMoodText();
      } else if (snap || revealAtEnd) {
        state.quizMoodTone = "neutral";
        state.quizMoodText = pickDefaultMoodText();
      }

      if (state.mode !== "quiz") return;
      if (snap || prefersReducedMotion()) {
        snapQuizProgressImmediate();
        updateHudUI();
        renderSingleFrame();
      } else if (moved) {
        updateHudUI();
        wakeQuizAnim(0.95);
      } else {
        updateProgressTrackVisuals();
        updateHudUI();
        if (!state.animRunning) renderSingleFrame();
      }
    },
    reactAnswer({ isRight, combo = 0, wasPreviouslyWrong = false, answered = 1, total = 20, right = 0, isExam = false, passMin = 16, emotion = null }) {
      const safeTotal = Math.max(1, total);
      state.quizAnswered = answered;
      state.quizTotal = safeTotal;
      state.quizRight = right;
      state.combo = isRight ? combo : 0;
      state.quizIsExam = !!isExam;
      state.quizPassMin = passMin;
      state.progressRatio = THREE.MathUtils.clamp(answered / safeTotal, 0, 1);
      state.targetX = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;

      const justPassedExam = isExam && isRight && right >= passMin && !state.quizPassedNotified;
      if (justPassedExam) state.quizPassedNotified = true;

      if (isRight) {
        state.hopPhase = 1.0;
        state.flashTimer = 0.48;
        state.brakeTimer = 0;
        state.hazardTimer = 0;
        if (justPassedExam) {
          state.quizMoodTone = "passed";
          state.quizMoodText = `衝過及格線（${right}/${passMin}）！1 Take Pass 喺望！`;
          emitSparks(28, 0xfacc15, passArchX, 1.05, 0);
          emitSparks(14, 0x10b981);
        } else if (wasPreviouslyWrong) {
          state.quizMoodTone = "right";
          state.quizMoodText = emotion?.text || "錯題擊破！越嚟越穩陣！";
          emitSparks(22, 0x10b981);
        } else if (combo >= 3) {
          state.quizMoodTone = "streak";
          const raw = emotion?.text || "手風超順，繼續衝！";
          state.quizMoodText = /連中/.test(raw) ? raw : `${combo} 連中！${raw}`;
          emitSparks(20, 0xfacc15);
        } else {
          state.quizMoodTone = "right";
          state.quizMoodText = emotion?.text || "穩陣！又向 1 Take Pass 行前一步！";
          emitSparks(14, 0x10b981);
        }
      } else {
        state.brakeTimer = 0.85;
        state.hazardTimer = 1.05;
        state.wobbleTimer = 0.55;
        state.quizMoodTone = "wrong";
        state.quizMoodText = emotion?.text || "唔緊要，考前踩一踩停記低好過考場錯！";
      }

      updateHudUI();
      if (state.mode === "quiz") {
        wakeQuizAnim(isRight ? 1.15 : 1.15);
      }
    },
    _debugState() {
      return {
        mode: state.mode,
        animRunning: state.animRunning,
        progressRatio: Number(state.progressRatio.toFixed(3)),
        carX: Number(carRoot.position.x.toFixed(3)),
        targetX: Number(state.targetX.toFixed(3)),
        moodText: state.quizMoodText,
        moodTone: state.quizMoodTone,
        homeWorldVisible: homeWorldGroup.visible,
        progressTrackVisible: progressTrackGroup.visible
      };
    }
  };

  // ==================== THEME & ANIMATION LOOP (ON-DEMAND IN QUIZ!) ====================
  const timer = new THREE.Timer();
  timer.connect(document);

  function applyThemeColors(lerpFactor) {
    const dark = state.isDark;
    if (state.mode === "quiz") {
      // Crisp, calm studio card backdrop matching Light / Dark theme cleanly
      targetBgColor.setHex(dark ? 0x111827 : 0xf1f5fb);
      bgColor.lerp(targetBgColor, lerpFactor);
      fog.color.copy(bgColor);
      fog.near = 26;
      fog.far = 55;
      trackFloorMat.color.setHex(dark ? 0x162032 : 0xe7eef7);
      trackDeckMat.color.setHex(dark ? 0x263244 : 0x334155);
      trackEdgeMat.color.setHex(dark ? 0x475569 : 0xcbd5e1);
      sunLight.intensity = dark ? 1.9 : 2.35;
      hemiLight.intensity = dark ? 0.85 : 1.05;
      scene.environmentIntensity = dark ? 0.6 : 0.82;
      beamMat.opacity = state.flashTimer > 0 ? 0.28 : 0.0;
      headGroundPoolMat.opacity = 0.0;
      headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : 0.75;
      for (const hh of headHalos) hh.material.opacity = state.flashTimer > 0 ? 0.8 : 0.14;
      return;
    }

    targetBgColor.setHex(dark ? 0x132036 : 0xdbeeff);
    targetSkyTop.setHex(dark ? 0x050914 : 0x4f9ae3);
    targetSkyGround.setHex(dark ? 0x0b1521 : 0x89a89a);
    bgColor.lerp(targetBgColor, lerpFactor);
    fog.color.copy(bgColor);
    fog.near = dark ? 12 : 16;
    fog.far = dark ? 31 : 38;
    skyUniforms.uHorizonColor.value.copy(bgColor);
    skyUniforms.uTopColor.value.lerp(targetSkyTop, lerpFactor);
    skyUniforms.uGroundColor.value.lerp(targetSkyGround, lerpFactor);
    skyUniforms.uSunIntensity.value = dark ? 0.0 : 1.0;
    skyUniforms.uStarIntensity.value = dark ? 0.9 : 0.0;

    sunLight.intensity = dark ? 0.95 : 2.55;
    hemiLight.intensity = dark ? 0.56 : 0.95;
    scene.environmentIntensity = dark ? 0.45 : 0.78;
    targetVergeColor.setHex(dark ? 0x456b58 : 0xffffff);
    vergeMat.color.lerp(targetVergeColor, lerpFactor);
    skylineTowerMat.emissiveIntensity = dark ? 0.85 : 0.1;
    hillMat.color.setHex(dark ? 0x10232b : 0x3b6e5c);
    lampHeadMat.emissiveIntensity = dark ? 2.5 : 0.2;
    for (const sh of streetLampHalos) sh.material.opacity = dark ? 0.72 : 0.0;
    gantryBoardMat.emissiveIntensity = dark ? 0.52 : 0.16;

    const studGlow = dark ? 1.7 : 0.2;
    studRedMat.emissiveIntensity = studGlow;
    studWhiteMat.emissiveIntensity = studGlow;
    studAmberMat.emissiveIntensity = studGlow;

    beamMat.opacity = state.flashTimer > 0 ? 0.36 : dark ? 0.22 : 0.0;
    headGroundPoolMat.opacity = state.flashTimer > 0 ? 0.5 : dark ? 0.3 : 0.0;
    headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : dark ? 2.2 : 0.65;
    for (const hh of headHalos) hh.material.opacity = state.flashTimer > 0 ? 0.85 : dark ? 0.55 : 0.12;
  }

  function stepSparks(dt) {
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
  }

  function stepScene(dt, elapsed) {
    const lerpFactor = dt > 0 ? Math.min(1, dt * 7) : 1;
    applyThemeColors(lerpFactor);

    if (state.boostTimer > 0) state.boostTimer = Math.max(0, state.boostTimer - dt);
    if (state.brakeTimer > 0) state.brakeTimer = Math.max(0, state.brakeTimer - dt);
    if (state.hazardTimer > 0) state.hazardTimer = Math.max(0, state.hazardTimer - dt);
    if (state.blinkerTimer > 0) state.blinkerTimer = Math.max(0, state.blinkerTimer - dt);
    if (state.flashTimer > 0) state.flashTimer = Math.max(0, state.flashTimer - dt);
    if (state.wobbleTimer > 0) state.wobbleTimer = Math.max(0, state.wobbleTimer - dt);
    if (state.hopPhase > 0) state.hopPhase = Math.max(0, state.hopPhase - dt * 2.6);

    if (state.mode === "quiz") {
      // ==================== CALM EMOTIONAL 3D PROGRESS BAR STEP ====================
      const prevX = carRoot.position.x;
      carRoot.position.x = THREE.MathUtils.damp(carRoot.position.x, state.targetX, 6.2, dt);
      if (Math.abs(carRoot.position.x - state.targetX) < 0.004) carRoot.position.x = state.targetX;

      const dx = carRoot.position.x - prevX;
      // Wheels roll ONLY when gliding to a new progress milestone — completely STILL at rest!
      if (Math.abs(dx) > 0.0001) {
        const rollDelta = dx / (wheelRadius * 0.92);
        for (const ws of wheelSpinners) ws.rotation.x -= rollDelta;
      }
      for (const fp of frontWheelPivots) fp.rotation.y = 0;

      const hopY = Math.sin(state.hopPhase * Math.PI) * 0.22;
      carBodyGroup.position.y = hopY;
      // Cute gentle brake nod on wrong answer or forward lean when gliding
      const wobblePitch = state.wobbleTimer > 0 ? Math.sin(state.wobbleTimer * 20) * 0.065 : 0;
      const glidePitch = THREE.MathUtils.clamp(-dx * 0.25, -0.05, 0.05);
      carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, wobblePitch + glidePitch, 10, dt);
      carBodyGroup.rotation.z = 0;

      const braking = state.brakeTimer > 0;
      brakeLightMat.emissiveIntensity = braking ? 3.0 : 0.35;
      for (const bh of brakeHalos) bh.material.opacity = braking ? 0.78 : 0.1;
      brakeGroundPoolMat.opacity = 0;
      reverseLightMat.emissiveIntensity = 0;

      const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
      const hazOn = state.hazardTimer > 0 && blinkOn;
      blinkerLeftMat.emissiveIntensity = hazOn ? 2.8 : 0.08;
      blinkerRightMat.emissiveIntensity = hazOn ? 2.8 : 0.08;

      updateProgressTrackVisuals();
      stepSparks(dt);

      // Auto-sleep the animation loop as soon as glide + emotional reaction finish!
      if (state.quizWakeTimer > 0) state.quizWakeTimer = Math.max(0, state.quizWakeTimer - dt);
      const settled =
        Math.abs(carRoot.position.x - state.targetX) < 0.004 &&
        state.hopPhase <= 0 &&
        state.brakeTimer <= 0 &&
        state.hazardTimer <= 0 &&
        state.flashTimer <= 0 &&
        state.wobbleTimer <= 0 &&
        !hasActiveSparks() &&
        state.quizWakeTimer <= 0;
      if (settled && state.animRunning) {
        carBodyGroup.position.y = 0;
        carBodyGroup.rotation.set(0, 0, 0);
        pauseLoop();
      }
      return;
    }

    // ==================== HOME & SUMMARY SHOWCASE STEP ====================
    let desiredSpeed = 0;
    if (state.mode === "summary" || state.gear === "P") desiredSpeed = 0;
    else if (state.gear === "D") {
      const base = 5.4 + state.readiness * 0.02;
      desiredSpeed = Math.max(0.4, base + (state.boostTimer > 0 ? 4.2 : 0) - (state.brakeTimer > 0 ? 3.5 : 0));
    } else if (state.gear === "R") desiredSpeed = -2.4;
    else if (state.gear === "N") desiredSpeed = 0.6;

    state.roadSpeed = THREE.MathUtils.damp(state.roadSpeed, desiredSpeed, 4.8, dt);
    state.roadOffset = (state.roadOffset + state.roadSpeed * dt) % 10000;

    const roadTexV = -(state.roadOffset / roadLen) * 11;
    asphaltColorTex.offset.y = roadTexV;
    asphaltRoughTex.offset.y = roadTexV;
    pavementTex.offset.y = -(state.roadOffset / roadLen) * 22;
    curbTex.offset.y = -(state.roadOffset / roadLen) * 22;

    if (hudSpeed) {
      const kmh = state.gear === "P" || state.mode === "summary" || Math.abs(state.roadSpeed) < 0.15
        ? 0
        : Math.min(70, Math.round(Math.abs(state.roadSpeed) * 8.2));
      hudSpeed.textContent = `${state.gear} · ${kmh} km/h`;
    }

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

    const rMod = ((state.roadOffset % 2.4) + 2.4) % 2.4;
    for (let i = 0; i < 16; i++) {
      const rz = -16 * 2.4 * 0.72 + i * 2.4 + rMod;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.position.set(-roadWidth / 2 - 0.34, 0.36, rz);
      dummy.updateMatrix();
      railPostInstL.setMatrixAt(i, dummy.matrix);
      dummy.position.set(roadWidth / 2 + 0.34, 0.36, rz);
      dummy.updateMatrix();
      railPostInstR.setMatrixAt(i, dummy.matrix);
    }
    railPostInstL.instanceMatrix.needsUpdate = true;
    railPostInstR.instanceMatrix.needsUpdate = true;

    for (const prop of roadsideProps) {
      let z = prop.position.z + state.roadSpeed * dt;
      if (z > 8) z -= PROP_SPAN;
      else if (z < -PROP_SPAN + 8) z += PROP_SPAN;
      prop.position.z = z;
    }

    let gz = gantry.position.z + state.roadSpeed * dt;
    if (gz > 7.5) gz = -24;
    else if (gz < -25) gz = 7.0;
    gantry.position.z = gz;

    const prevX = carRoot.position.x;
    carRoot.position.x = THREE.MathUtils.damp(carRoot.position.x, state.targetX, 5.2, dt);
    const latVel = dt > 0.0001 ? (carRoot.position.x - prevX) / dt : 0;
    const steerAngle = THREE.MathUtils.clamp(-latVel * 0.18, -0.34, 0.34);
    for (const fp of frontWheelPivots) fp.rotation.y = THREE.MathUtils.damp(fp.rotation.y, steerAngle, 10, dt);

    const wheelDelta = (state.roadSpeed * dt) / wheelRadius;
    for (const ws of wheelSpinners) ws.rotation.x -= wheelDelta;

    const hopY = Math.sin(state.hopPhase * Math.PI) * 0.15;
    const engineVib = Math.sin(elapsed * (state.roadSpeed !== 0 ? 18 : 11)) * (state.gear === "P" ? 0.003 : 0.008);
    carBodyGroup.position.y = hopY + engineVib;
    carBodyGroup.rotation.z = THREE.MathUtils.damp(carBodyGroup.rotation.z, -latVel * 0.072, 7.5, dt);
    const targetPitch = state.brakeTimer > 0 && Math.abs(state.roadSpeed) > 0.3 ? -0.065 : state.boostTimer > 0 ? 0.05 : 0;
    carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, targetPitch, 8.5, dt);

    const braking = state.brakeTimer > 0 || state.gear === "P";
    brakeLightMat.emissiveIntensity = braking ? 3.0 : state.isDark ? 0.95 : 0.3;
    for (const bh of brakeHalos) bh.material.opacity = braking ? 0.78 : state.isDark ? 0.28 : 0.08;
    brakeGroundPoolMat.opacity = braking ? (state.isDark ? 0.55 : 0.28) : state.isDark ? 0.16 : 0.0;
    reverseLightMat.emissiveIntensity = state.gear === "R" ? 2.4 : 0.0;

    const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
    const leftBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir < 0)) && blinkOn;
    const rightBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir > 0)) && blinkOn;
    blinkerLeftMat.emissiveIntensity = leftBlink ? 2.8 : 0.08;
    blinkerRightMat.emissiveIntensity = rightBlink ? 2.8 : 0.08;

    if (trophyGroup.visible) {
      trophyStar.rotation.y += dt * 1.9;
      trophyStar.position.y = 1.56 + Math.sin(elapsed * 2.8) * 0.08;
      trophyRing.rotation.z = elapsed * 0.6;
      if (state.summaryPassed && Math.random() < dt * 4) emitSparks(1, Math.random() > 0.5 ? 0xfacc15 : 0x10b981);
    }

    stepSparks(dt);

    controls.autoRotate = state.mode === "summary";
    controls.autoRotateSpeed = 1.1;
    controls.update(dt);
  }

  function renderSingleFrame() {
    stepScene(0, 0);
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
      timer.update();
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
      if (state.isVisible) {
        if (state.mode === "quiz") {
          if (state.quizWakeTimer > 0) startLoopIfAllowed();
          else renderSingleFrame();
        } else {
          startLoopIfAllowed();
        }
      } else {
        pauseLoop();
      }
    },
    { threshold: 0.05 }
  );
  io.observe(shell);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseLoop();
    else if (state.mode !== "quiz" || state.quizWakeTimer > 0) startLoopIfAllowed();
  });

  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    pauseLoop();
  });
  renderer.domElement.addEventListener("webglcontextrestored", () => {
    if (state.mode === "quiz") renderSingleFrame();
    else startLoopIfAllowed();
  });

  Promise.resolve(renderer.compileAsync ? renderer.compileAsync(scene, camera) : null)
    .catch(() => {})
    .finally(() => {
      if (!state.hasExternalMount) mountToView("home");
    });
})();
