// 1TakePass — Interactive 3D HK Automatic (1A) Driving Simulator & Question Visualizer
// Built with Three.js r186 following CloudAI-X/threejs-skills
// Single shared WebGLRenderer cleanly reparented across Home / Quiz / Summary views.
// Every single question dynamically stages a matching 3D HK driving scenario & live maneuver reaction.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createHongKongWorldProps } from "./world3d.js";

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
  const bgColor = new THREE.Color(isDarkTheme() ? 0x0f1724 : 0xdbeeff);
  scene.background = bgColor;
  const fog = new THREE.Fog(bgColor.getHex(), 15, 36);
  scene.fog = fog;

  // Lightweight GLSL Procedural Sky Dome (day azure + sun halo / rain storm clouds / starry HK night!)
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(isDarkTheme() ? 0x060b18 : 0x5ca4e6) },
    uHorizonColor: { value: new THREE.Color(isDarkTheme() ? 0x16243d : 0xdbeeff) },
    uGroundColor: { value: new THREE.Color(isDarkTheme() ? 0x0c1622 : 0x89a89a) },
    uSunDir: { value: new THREE.Vector3(0.32, 0.36, -0.88).normalize() },
    uSunIntensity: { value: isDarkTheme() ? 0.0 : 1.0 },
    uStarIntensity: { value: isDarkTheme() ? 0.85 : 0.0 }
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
      } else if (kind === "amber") {
        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 24, 0, Math.PI * 2);
        ctx.fill();
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
  const laneAmberTex = makeLaneSignalTex("amber");

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

  // Shared lightweight radial glow sprite helper (zero heavy post-processing; silky 60fps on mobile!)
  const glowHaloTex = makeCanvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,0.96)");
    g.addColorStop(0.32, "rgba(255,255,255,0.44)");
    g.addColorStop(0.7, "rgba(255,255,255,0.1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  function makeGlowHalo(colorHex, size = 0.6, opacity = 0.72) {
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

  // ==================== PROCEDURAL PBR ROAD, SIDEWALK, KERB & GRASS TEXTURES ====================
  const makeRepeatingTex = (w, h, drawFn, { isColor = true, repeatX = 1, repeatY = 10 } = {}) => {
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
  };

  // Asphalt color map: rich dark Hong Kong tarmac aggregate + subtle twin wheel wear tracks
  const asphaltColorTex = makeRepeatingTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#363e4b";
    ctx.fillRect(0, 0, w, h);
    // Subtle darker twin tire wear lanes (left lane x~26%, right lane x~74%)
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
    // Aggregate asphalt stone speckles (deterministic pseudo-random — zero flicker)
    let seed = 1337;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 2400; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const v = rand() > 0.5 ? 76 : 36;
      ctx.fillStyle = `rgba(${v},${v + 5},${v + 12},0.35)`;
      ctx.fillRect(x, y, 2, 2);
    }
  }, { isColor: true, repeatX: 1, repeatY: 11 });

  // Asphalt roughness map (LINEAR scalar — smooth specular patches shine realistically in rain!)
  const asphaltRoughTex = makeRepeatingTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "rgb(218,218,218)";
    ctx.fillRect(0, 0, w, h);
    // Slightly smoother tire tracks
    ctx.fillStyle = "rgb(172,172,172)";
    ctx.fillRect(w * 0.21, 0, 34, h);
    ctx.fillRect(w * 0.67, 0, 34, h);
    // Organic micro-puddle patches (glossy when wet!)
    let seed = 4242;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 24; i++) {
      const px = rand() * w;
      const py = rand() * h;
      const pr = 12 + rand() * 24;
      const g = ctx.createRadialGradient(px, py, 2, px, py, pr);
      g.addColorStop(0, "rgba(75,75,75,0.7)");
      g.addColorStop(1, "rgba(218,218,218,0)");
      ctx.fillStyle = g;
      ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
    }
  }, { isColor: false, repeatX: 1, repeatY: 11 });

  // Hong Kong grey concrete paving tiles for pedestrian sidewalks
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

  // Hong Kong segmented concrete kerb texture
  const curbTex = makeRepeatingTex(64, 128, (ctx, w, h) => {
    ctx.fillStyle = "#d5dce4";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(0, 0, w, 4);
    ctx.fillRect(0, h / 2, w, 4);
    ctx.fillStyle = "rgba(30,41,59,0.14)";
    ctx.fillRect(0, 0, 8, h);
  }, { isColor: true, repeatX: 1, repeatY: 22 });

  // Natural mottled HK tropical meadow verge (never flat solid neon green!)
  const vergeTex = makeRepeatingTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#488f68";
    ctx.fillRect(0, 0, w, h);
    let seed = 9001;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 650; i++) {
      ctx.fillStyle = rand() > 0.5 ? "rgba(32,96,62,0.26)" : "rgba(116,178,136,0.22)";
      ctx.fillRect(rand() * w, rand() * h, 4, 6);
    }
  }, { isColor: true, repeatX: 6, repeatY: 14 });

  // ==================== SHARED MATERIALS ====================
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: asphaltColorTex,
    roughnessMap: asphaltRoughTex,
    bumpMap: asphaltRoughTex,
    bumpScale: 0.015,
    roughness: 0.92,
    metalness: 0.05
  });
  const sidewalkMat = new THREE.MeshStandardMaterial({ map: pavementTex, roughness: 0.85, metalness: 0.04 });
  const vergeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: vergeTex, roughness: 0.95 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: curbTex, roughness: 0.74 });
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.48 });
  const edgeLineMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f9, roughness: 0.52 });
  const doubleYellowMat = new THREE.MeshStandardMaterial({ color: 0xf5b700, roughness: 0.48 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x9aa5b4, roughness: 0.4, metalness: 0.6 });
  const hkRailMat = new THREE.MeshStandardMaterial({ color: 0xb0bac6, roughness: 0.38, metalness: 0.65 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e2530, roughness: 0.5, metalness: 0.45 });
  const lampHeadMat = new THREE.MeshStandardMaterial({
    color: 0xfff3d1,
    emissive: 0xffd580,
    emissiveIntensity: 0.35,
    roughness: 0.25
  });
  const coneOrangeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.52 });
  const coneStripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
  const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x1f734b, roughness: 0.84 });
  const treeFoliageLightMat = new THREE.MeshStandardMaterial({ color: 0x2f8f5f, roughness: 0.8 });
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.9 });

  // Authentic HK Road Users' Code p.62 cat's-eye studs
  const studRedMat = new THREE.MeshStandardMaterial({ color: 0xe11d24, emissive: 0xe11d24, emissiveIntensity: 0.25, roughness: 0.3 });
  const studWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.3 });
  const studAmberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.3 });

  // ==================== ROAD, HK SIDEWALKS & EXPRESSWAY ====================
  const roadWidth = 4.6;
  const roadLen = 46;

  const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, roadLen), roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.set(0, 0, -8);
  roadMesh.receiveShadow = true;
  roadMesh.matrixAutoUpdate = false;
  roadMesh.updateMatrix();
  worldPivot.add(roadMesh);

  // Authentic HK Tiled Sidewalk Strips along both curbs!
  const sidewalkGeo = new THREE.PlaneGeometry(2.1, roadLen);
  const leftSidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  leftSidewalk.rotation.x = -Math.PI / 2;
  leftSidewalk.position.set(-roadWidth / 2 - 1.32, 0.04, -8);
  leftSidewalk.receiveShadow = true;
  worldPivot.add(leftSidewalk);

  const rightSidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  rightSidewalk.rotation.x = -Math.PI / 2;
  rightSidewalk.position.set(roadWidth / 2 + 1.32, 0.04, -8);
  rightSidewalk.receiveShadow = true;
  worldPivot.add(rightSidewalk);

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
    line.position.set(lx, 0.006, -8);
    line.matrixAutoUpdate = false;
    line.updateMatrix();
    worldPivot.add(line);
  });

  // Curb yellow lines (prominently emphasized in parking/no-stopping scenarios!)
  const curbYellow1 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadLen), doubleYellowMat);
  curbYellow1.rotation.x = -Math.PI / 2;
  curbYellow1.position.set(-roadWidth / 2 + 0.07, 0.008, -8);
  worldPivot.add(curbYellow1);

  const curbYellow2 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadLen), doubleYellowMat);
  curbYellow2.rotation.x = -Math.PI / 2;
  curbYellow2.position.set(-roadWidth / 2 + 0.2, 0.008, -8);
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

  // Authentic Iconic Hong Kong Grey Galvanized Pedestrian Guardrails (InstancedMesh — 0 GC, 2 draw calls!)
  const RAIL_COUNT = 16;
  const RAIL_STEP = 2.4;
  const railPostGeo = new THREE.BoxGeometry(0.04, 0.68, 0.04);
  const railBarGeo = new THREE.BoxGeometry(0.035, 0.045, 2.35);
  const railPostInstL = new THREE.InstancedMesh(railPostGeo, hkRailMat, RAIL_COUNT);
  const railPostInstR = new THREE.InstancedMesh(railPostGeo, hkRailMat, RAIL_COUNT);
  const railTopBarL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, roadLen), hkRailMat);
  railTopBarL.position.set(-roadWidth / 2 - 0.34, 0.68, -8);
  const railMidBarL = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, roadLen), hkRailMat);
  railMidBarL.position.set(-roadWidth / 2 - 0.34, 0.34, -8);
  const railTopBarR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, roadLen), hkRailMat);
  railTopBarR.position.set(roadWidth / 2 + 0.34, 0.68, -8);
  const railMidBarR = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, roadLen), hkRailMat);
  railMidBarR.position.set(roadWidth / 2 + 0.34, 0.34, -8);
  const hkRailLeftGroup = new THREE.Group();
  hkRailLeftGroup.add(railPostInstL, railTopBarL, railMidBarL);
  const hkRailRightGroup = new THREE.Group();
  hkRailRightGroup.add(railPostInstR, railTopBarR, railMidBarR);
  railPostInstL.frustumCulled = false;
  railPostInstR.frustumCulled = false;
  worldPivot.add(hkRailLeftGroup, hkRailRightGroup);

  // Scrolling roadside street lamps + glowing night halos + multi-layered lush HK trees
  const PROP_COUNT = 6;
  const PROP_SPAN = 36;
  const roadsideProps = [];
  const streetLampHalos = [];
  const poleGeo = new THREE.CylinderGeometry(0.045, 0.06, 2.75, 8);
  const armGeo = new THREE.BoxGeometry(0.95, 0.05, 0.05);
  const bulbGeo = new THREE.BoxGeometry(0.26, 0.06, 0.13);
  const coneBaseGeo = new THREE.BoxGeometry(0.24, 0.04, 0.24);
  const coneBodyGeo = new THREE.ConeGeometry(0.1, 0.34, 12);
  const coneBandGeo = new THREE.CylinderGeometry(0.052, 0.072, 0.09, 12);
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
    // Placed slightly further out on pavement so roadside signs & traffic lights ALWAYS stand cleanly in front!
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

    // Multi-layered lush HK tropical roadside tree (3-puff organic canopy — no toy cones!)
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
  const tlHaloRed = makeGlowHalo(0xef4444, 0.65, 0.0); tlHaloRed.position.set(0, 2.31, 0.2);
  const tlHaloAmber = makeGlowHalo(0xf59e0b, 0.65, 0.0); tlHaloAmber.position.set(0, 2.02, 0.2);
  const tlHaloGreen = makeGlowHalo(0x10b981, 0.65, 0.0); tlHaloGreen.position.set(0, 1.73, 0.2);

  const tlArrowBox = new THREE.Group();
  tlArrowBox.visible = false;
  const arrowHousing = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.24), darkMetalMat);
  arrowHousing.position.set(-0.37, 1.73, 0);
  const arrowFaceMat = new THREE.MeshStandardMaterial({
    map: greenArrowLampTex, emissive: 0x10b981, emissiveMap: greenArrowLampTex, emissiveIntensity: 1.8, roughness: 0.2
  });
  const arrowFace = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.28), arrowFaceMat);
  arrowFace.position.set(-0.37, 1.73, 0.125);
  const tlArrowHalo = makeGlowHalo(0x10b981, 0.56, 0.65); tlArrowHalo.position.set(-0.37, 1.73, 0.17);
  tlArrowBox.add(arrowHousing, arrowFace, tlArrowHalo);

  // Twin wigwag alternating red warning lights (fire station exit)
  const wigwagBox = new THREE.Group();
  wigwagBox.visible = false;
  const wwHousing = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.36, 0.22), darkMetalMat);
  wwHousing.position.set(0.12, 1.95, 0);
  const wwLeftMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, emissive: 0xef4444, emissiveIntensity: 0.1, roughness: 0.2 });
  const wwRightMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, emissive: 0xef4444, emissiveIntensity: 0.1, roughness: 0.2 });
  const wwL = new THREE.Mesh(tlLensGeo, wwLeftMat); wwL.position.set(-0.06, 1.95, 0.12);
  const wwR = new THREE.Mesh(tlLensGeo, wwRightMat); wwR.position.set(0.3, 1.95, 0.12);
  const wwHaloL = makeGlowHalo(0xef4444, 0.65, 0.0); wwHaloL.position.set(-0.06, 1.95, 0.18);
  const wwHaloR = makeGlowHalo(0xef4444, 0.65, 0.0); wwHaloR.position.set(0.3, 1.95, 0.18);
  wigwagBox.add(wwHousing, wwL, wwR, wwHaloL, wwHaloR);

  tlAssembly.add(tlPost, tlHead, tlRed, tlAmber, tlGreen, tlHaloRed, tlHaloAmber, tlHaloGreen, tlArrowBox, wigwagBox);
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
  const zebraDecorGroup = new THREE.Group();
  const zebraMat = new THREE.MeshStandardMaterial({ map: zebraTex, roughness: 0.85 });
  const zebraRoad = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth - 0.4, 1.55), zebraMat);
  zebraRoad.rotation.x = -Math.PI / 2;
  zebraRoad.position.set(0, 0.012, -3.15);

  const beaconGlowMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.4, roughness: 0.25
  });
  const beaconHalos = [];
  [-2.82, 2.82].forEach((bx) => {
    const bp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 1.85, 8), darkMetalMat);
    bp.position.set(bx, 0.92, -3.15);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), beaconGlowMat);
    globe.position.set(bx, 1.94, -3.15);
    const bh = makeGlowHalo(0xf59e0b, 0.72, 0.65);
    bh.position.set(bx, 1.94, -3.15);
    beaconHalos.push(bh);
    zebraDecorGroup.add(bp, globe, bh);
  });
  zebraDecorGroup.add(zebraRoad);

  // Stylized 3D Pedestrian walking across zebra or Green-Man crossing
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
  zebraGroup.add(zebraDecorGroup, pedGroup);
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
  const railMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25, metalness: 0.85 });
  [-0.42, 0.42].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 16), railMat);
    rail.position.set(rx, 0.018, -4.5);
    railGroup.add(rail);
  });
  yellowBoxGroup.add(railGroup);
  scenarioRoot.add(yellowBoxGroup);

  // 5. 3D Double White Lines (crisp spacing & contrast so solid vs broken side is unmistakable!)
  const doubleWhiteGroup = new THREE.Group();
  doubleWhiteGroup.visible = false;
  const dwLineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x334155, emissiveIntensity: 0.25, roughness: 0.4 });
  const dwRightSolid = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 26), dwLineMat);
  dwRightSolid.rotation.x = -Math.PI / 2;
  dwRightSolid.position.set(0.14, 0.014, -6);
  const dwLeftSolid = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 26), dwLineMat);
  dwLeftSolid.rotation.x = -Math.PI / 2;
  dwLeftSolid.position.set(-0.14, 0.014, -6);
  const dwLeftBroken = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 1.05), dwLineMat);
    seg.rotation.x = -Math.PI / 2;
    seg.position.set(-0.14, 0.014, 4 - i * 2.1);
    dwLeftBroken.add(seg);
  }
  doubleWhiteGroup.add(dwRightSolid, dwLeftSolid, dwLeftBroken);
  scenarioRoot.add(doubleWhiteGroup);

  // Helper: grounded wheels & rear tail lights for NPC vehicles (zero floating boxes!)
  const npcWheelGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.16, 14);
  npcWheelGeo.rotateZ(Math.PI / 2);
  const npcTireMat = new THREE.MeshStandardMaterial({ color: 0x181c22, roughness: 0.9 });
  const npcTailMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, emissive: 0xef4444, emissiveIntensity: 1.1 });
  function addNpcWheels(group, halfX, zPositions) {
    for (const wz of zPositions) {
      for (const wx of [-halfX, halfX]) {
        const w = new THREE.Mesh(npcWheelGeo, npcTireMat);
        w.position.set(wx, 0.21, wz);
        group.add(w);
      }
    }
  }

  // 6. 3D Roadworks Truck + Flashing Amber Matrix Board + Properly Tapered Safety Cones
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
  addNpcWheels(rwTruck, 0.56, [-0.58, 0.58]);
  [-0.38, 0.38].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), npcTailMat);
    tl.position.set(tx, 0.42, 0.96);
    rwTruck.add(tl);
  });

  const rwLampGeo = new THREE.SphereGeometry(0.075, 10, 8);
  const rwLampMatA = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 2.0 });
  const rwLampMatB = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.2 });
  const rwTL = new THREE.Mesh(rwLampGeo, rwLampMatA); rwTL.position.set(-0.36, 1.72, 0.99);
  const rwBR = new THREE.Mesh(rwLampGeo, rwLampMatA); rwBR.position.set(0.36, 1.32, 0.99);
  const rwTR = new THREE.Mesh(rwLampGeo, rwLampMatB); rwTR.position.set(0.36, 1.72, 0.99);
  const rwBL = new THREE.Mesh(rwLampGeo, rwLampMatB); rwBL.position.set(-0.36, 1.32, 0.99);
  rwTruck.add(rwTL, rwBR, rwTR, rwBL);
  rwTruck.position.set(1.05, 0, -5.2);
  roadworksGroup.add(rwTruck);

  // Correct HK safety taper: starts near right curb closer to traffic and tapers INWARD toward center to guide cars LEFT!
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Group();
    const cb = new THREE.Mesh(coneBaseGeo, coneOrangeMat); cb.position.y = 0.02;
    const co = new THREE.Mesh(coneBodyGeo, coneOrangeMat); co.position.y = 0.2; co.castShadow = true;
    const cs = new THREE.Mesh(coneBandGeo, coneStripeMat); cs.position.y = 0.22;
    c.add(cb, co, cs);
    c.position.set(1.72 - i * 0.46, 0, -2.1 - i * 0.68);
    roadworksGroup.add(c);
  }
  scenarioRoot.add(roadworksGroup);

  // 7. 3D HK Ambulance (Flashing Red/Blue Lightbar, overtaking FORWARD in right lane!) + 3D Warning Triangle
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
  const ambHaloL = makeGlowHalo(0xef4444, 0.95, 0.85); ambHaloL.position.set(-0.22, 1.28, -0.45);
  const ambHaloR = makeGlowHalo(0x3b82f6, 0.95, 0.85); ambHaloR.position.set(0.22, 1.28, -0.45);
  ambGroup.add(ambBody, ambStripe, ambLightL, ambLightR, ambHaloL, ambHaloR);
  addNpcWheels(ambGroup, 0.54, [-0.72, 0.72]);
  [-0.36, 0.36].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.05), npcTailMat);
    tl.position.set(tx, 0.44, 1.19);
    ambGroup.add(tl);
  });
  ambGroup.position.set(1.05, 0, -1.5);
  emergencyGroup.add(ambGroup);
  scenarioRoot.add(emergencyGroup);

  // 3D Red Reflective Breakdown Warning Triangle (placed behind car ONLY on <=50 km/h roads!)
  const warningTriangleGroup = new THREE.Group();
  warningTriangleGroup.visible = false;
  const triOuter = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.44, 3),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xef4444, emissiveIntensity: 0.65, roughness: 0.3 })
  );
  triOuter.scale.set(1, 1, 0.14);
  triOuter.position.set(0, 0.24, 0);
  const triBase = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.18), darkMetalMat);
  triBase.position.set(0, 0.02, 0);
  warningTriangleGroup.add(triOuter, triBase);
  warningTriangleGroup.position.set(-1.55, 0, 2.55);
  scenarioRoot.add(warningTriangleGroup);

  // 8. 3D HK Double-Decker Bus (KMB-style red + gold band + upper/lower glass decks + glowing LED route box!)
  const busRouteTex = makeCanvasTexture(128, 48, (ctx, w, h) => {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "900 32px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1A  尖沙咀", w / 2, h / 2 + 2);
  });
  const busGroup = new THREE.Group();
  busGroup.visible = false;
  const busBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.24, 1.72, 3.68),
    new THREE.MeshPhysicalMaterial({ color: 0xc21e25, roughness: 0.26, metalness: 0.12, clearcoat: 0.85 })
  );
  busBody.position.y = 1.06;
  busBody.castShadow = true;
  const busBand = new THREE.Mesh(
    new THREE.BoxGeometry(1.26, 0.22, 3.7),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.36 })
  );
  busBand.position.y = 0.98;
  const busWinMat = new THREE.MeshPhysicalMaterial({ color: 0x152030, roughness: 0.1, metalness: 0.25, clearcoat: 1.0 });
  const busGlassTop = new THREE.Mesh(new THREE.BoxGeometry(1.255, 0.42, 3.38), busWinMat);
  busGlassTop.position.y = 1.52;
  const busGlassBot = new THREE.Mesh(new THREE.BoxGeometry(1.255, 0.34, 3.1), busWinMat);
  busGlassBot.position.y = 0.66;
  const busAcPod = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.14, 1.8), curbMat);
  busAcPod.position.set(0, 1.98, 0.1);
  const busRouteMat = new THREE.MeshStandardMaterial({
    map: busRouteTex, emissive: 0xf59e0b, emissiveMap: busRouteTex, emissiveIntensity: 1.1
  });
  const busRouteFront = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.22), busRouteMat);
  busRouteFront.position.set(0, 1.15, -1.855);
  busRouteFront.rotation.y = Math.PI;
  const busRouteRear = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.2), busRouteMat);
  busRouteRear.position.set(0, 1.15, 1.855);
  busGroup.add(busBody, busBand, busGlassTop, busGlassBot, busAcPod, busRouteFront, busRouteRear);
  addNpcWheels(busGroup, 0.58, [-1.18, 0.96]);
  [-0.4, 0.4].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.11, 0.05), npcTailMat);
    tl.position.set(tx, 0.46, 1.86);
    const hl = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.12, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfffbeb, emissiveIntensity: 2.2 })
    );
    hl.position.set(tx, 0.46, -1.86);
    const busHlHalo = makeGlowHalo(0xfff4cc, 0.58, 0.55);
    busHlHalo.position.set(tx, 0.46, -1.94);
    busGroup.add(tl, hl, busHlHalo);
  });
  busGroup.position.set(-1.05, 0, -5.8);
  scenarioRoot.add(busGroup);

  // 9. 3D Sculpted NPC Lead Vehicle (beveled profile, wheels, tail lights, right blinker & animated 3D Driver Hand-Signal Arm!)
  const npcCarGroup = new THREE.Group();
  npcCarGroup.visible = false;
  const npcSideShape = new THREE.Shape();
  npcSideShape.moveTo(-1.04, 0.17);
  npcSideShape.lineTo(1.04, 0.17);
  npcSideShape.lineTo(1.04, 0.45);
  npcSideShape.lineTo(0.84, 0.56);
  npcSideShape.lineTo(0.46, 0.6);
  npcSideShape.lineTo(0.24, 0.87);
  npcSideShape.lineTo(-0.5, 0.87);
  npcSideShape.lineTo(-0.76, 0.57);
  npcSideShape.lineTo(-1.02, 0.5);
  npcSideShape.closePath();
  const npcBodyGeo = new THREE.ExtrudeGeometry(npcSideShape, {
    depth: 0.94, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2
  });
  npcBodyGeo.translate(0, 0, -0.47);
  npcBodyGeo.rotateY(Math.PI / 2);
  const npcBody = new THREE.Mesh(
    npcBodyGeo,
    new THREE.MeshPhysicalMaterial({ color: 0xe6ecf4, roughness: 0.22, metalness: 0.24, clearcoat: 0.95, clearcoatRoughness: 0.08 })
  );
  npcBody.castShadow = true;
  const npcCabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.96, 0.24, 0.9),
    new THREE.MeshPhysicalMaterial({ color: 0x182334, roughness: 0.08, metalness: 0.25, clearcoat: 1.0 })
  );
  npcCabin.position.set(0, 0.71, 0.08);
  const npcBumperR = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.12, 0.1), darkMetalMat);
  npcBumperR.position.set(0, 0.23, 1.04);
  [-0.34, 0.34].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.09, 0.05), npcTailMat);
    tl.position.set(tx, 0.42, 1.06);
    npcCarGroup.add(tl);
  });
  const npcRightBlinkerMat = new THREE.MeshStandardMaterial({
    color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.08, roughness: 0.25
  });
  const npcBlinkRR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), npcRightBlinkerMat);
  npcBlinkRR.position.set(0.46, 0.42, 1.065);
  const npcBlinkFR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), npcRightBlinkerMat);
  npcBlinkFR.position.set(0.46, 0.4, -1.055);
  // 3D Driver Right Arm extending out HK right-hand-drive window for hand-signal questions (q64/q76/q115!)
  const driverArmPivot = new THREE.Group();
  driverArmPivot.visible = false;
  driverArmPivot.position.set(0.48, 0.68, -0.02);
  const armSleeve = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.13, 0.13),
    new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0x9a3412, emissiveIntensity: 0.35, roughness: 0.45 })
  );
  armSleeve.position.set(0.28, 0, 0);
  const armHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.11, 0.15),
    new THREE.MeshStandardMaterial({ color: 0xfdba74, emissive: 0x7c2d12, emissiveIntensity: 0.2, roughness: 0.5 })
  );
  armHand.position.set(0.66, 0, 0);
  driverArmPivot.add(armSleeve, armHand);
  npcCarGroup.add(npcBody, npcCabin, npcBumperR, npcBlinkRR, npcBlinkFR, driverArmPivot);
  addNpcWheels(npcCarGroup, 0.5, [-0.64, 0.64]);
  npcCarGroup.position.set(-1.05, 0, -4.6);
  scenarioRoot.add(npcCarGroup);

  // 10. 3D Hong Kong 2-Lane Roundabout (full circular asphalt apron + dashed lane ring + central island!)
  const roundaboutGroup = new THREE.Group();
  roundaboutGroup.visible = false;
  const rbApron = new THREE.Mesh(new THREE.CylinderGeometry(4.35, 4.35, 0.02, 36), roadMat);
  rbApron.position.set(0, 0.008, -6.2);
  rbApron.receiveShadow = true;
  const rbOuterCurb = new THREE.Mesh(new THREE.TorusGeometry(4.42, 0.1, 10, 40), curbMat);
  rbOuterCurb.rotation.x = Math.PI / 2;
  rbOuterCurb.position.set(0, 0.06, -6.2);
  const rbLaneRing = new THREE.Mesh(new THREE.RingGeometry(2.85, 2.95, 40), edgeLineMat);
  rbLaneRing.rotation.x = -Math.PI / 2;
  rbLaneRing.position.set(0, 0.022, -6.2);
  const rbIsland = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.55, 0.24, 28),
    new THREE.MeshStandardMaterial({ color: 0x2d7d57, roughness: 0.9 })
  );
  rbIsland.position.set(0, 0.13, -6.2);
  rbIsland.receiveShadow = true;
  const rbCurb = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.08, 10, 32), curbMat);
  rbCurb.rotation.x = Math.PI / 2;
  rbCurb.position.set(0, 0.09, -6.2);
  roundaboutGroup.add(rbApron, rbOuterCurb, rbLaneRing, rbIsland, rbCurb);
  scenarioRoot.add(roundaboutGroup);

  // 11. 3D Hong Kong Tunnel Portal & Interior Lights (wide clearance, zero streetlamp/gantry clipping!)
  const tunnelGroup = new THREE.Group();
  tunnelGroup.visible = false;
  const tunnelWallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
  const tunnelLightMat = new THREE.MeshStandardMaterial({
    color: 0xfff7d6, emissive: 0xfde68a, emissiveIntensity: 1.8, roughness: 0.2
  });
  const tunRoof = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 2.4, 0.36, 28), tunnelWallMat);
  tunRoof.position.set(0, 3.45, -14.5);
  const tunWallL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.5, 28), tunnelWallMat);
  tunWallL.position.set(-roadWidth / 2 - 1.0, 1.75, -14.5);
  const tunWallR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.5, 28), tunnelWallMat);
  tunWallR.position.set(roadWidth / 2 + 1.0, 1.75, -14.5);
  tunnelGroup.add(tunRoof, tunWallL, tunWallR);
  for (let i = 0; i < 6; i++) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.3), tunnelLightMat);
    strip.position.set(0, 3.24, -2.5 - i * 4.2);
    tunnelGroup.add(strip);
  }
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

  // 13..30. Modular Real-World HK 3D Road Transformations & Actors (world3d.js)
  const hkWorld = createHongKongWorldProps({
    THREE,
    scenarioRoot,
    roadWidth,
    roadLen,
    mats: {
      roadMat,
      vergeMat,
      curbMat,
      edgeLineMat,
      darkMetalMat,
      poleMat,
      coneOrangeMat,
      coneStripeMat,
      npcTailMat
    },
    geos: { coneBaseGeo, coneBodyGeo, coneBandGeo },
    makeCanvasTexture,
    addNpcWheels
  });
  const wg = hkWorld.groups;
  const wt = hkWorld.textures;

  // ==================== HERO 3D HK 1A PRIVATE CAR (Sculpted Aerodynamic Hatchback + Glow Pools!) ====================
  const carRoot = new THREE.Group();
  const carBodyGroup = new THREE.Group();
  carRoot.add(carBodyGroup);
  worldPivot.add(carRoot);

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

  // Sculpted beveled aerodynamic hatchback silhouette (2D side profile extruded along X!)
  const heroProfile = new THREE.Shape();
  heroProfile.moveTo(-1.12, 0.18);  // rear lower
  heroProfile.lineTo(1.12, 0.18);   // front lower
  heroProfile.lineTo(1.14, 0.38);   // front bumper nose
  heroProfile.lineTo(0.96, 0.53);   // sloped hood front
  heroProfile.lineTo(0.46, 0.59);   // base of front windshield
  heroProfile.lineTo(0.16, 0.90);   // roof front brow
  heroProfile.lineTo(-0.62, 0.90);  // roof rear spoiler edge
  heroProfile.lineTo(-0.92, 0.62);  // raked rear hatch glass
  heroProfile.lineTo(-1.10, 0.54);  // rear tail lip
  heroProfile.lineTo(-1.14, 0.36);  // rear bumper
  heroProfile.closePath();

  const heroShellGeo = new THREE.ExtrudeGeometry(heroProfile, {
    depth: 0.98,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.045,
    bevelSegments: 3
  });
  heroShellGeo.translate(0, 0, -0.49);
  heroShellGeo.rotateY(Math.PI / 2); // +X side profile now faces -Z (forward)!

  const lowerBody = new THREE.Mesh(heroShellGeo, paintMat);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  carBodyGroup.add(lowerBody);

  // Contrasting crisp pearl-white floating roof cap + subtle rear spoiler lip
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.065, 0.84), roofMat);
  cabinRoof.position.set(0, 0.93, 0.22);
  cabinRoof.castShadow = true;
  const rearSpoiler = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.045, 0.16), trimMat);
  rearSpoiler.position.set(0, 0.93, 0.68);
  rearSpoiler.rotation.x = 0.14;
  // Tinted panoramic cabin glazing wrapping front, sides & sloped rear hatch
  const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.23, 0.92), glassMat);
  sideGlass.position.set(0, 0.74, 0.18);
  const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 0.04), glassMat);
  frontGlass.position.set(0, 0.74, -0.34);
  frontGlass.rotation.x = -0.68;
  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.31, 0.04), glassMat);
  rearGlass.position.set(0, 0.75, 0.79);
  rearGlass.rotation.x = 0.68;
  carBodyGroup.add(cabinRoof, rearSpoiler, sideGlass, frontGlass, rearGlass);

  // Sculpted lower rocker skirts, wheel-arch accent moldings, bumpers & chrome grille
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

  // Modern LED tail-light bar + separate glowing brake/headlight halos!
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
    const bh = makeGlowHalo(0xef4444, 0.56, 0.25); bh.position.set(lx, 0.44, 1.22);
    const hh = makeGlowHalo(0xfff4c8, 0.58, 0.18); hh.position.set(lx, 0.41, -1.22);
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

  // Volumetric headlight cones + ground headlight & red brake reflection pools on asphalt!
  const beamGeo = new THREE.ConeGeometry(0.52, 2.8, 16, 1, true);
  beamGeo.rotateX(Math.PI / 2);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfff2bf, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const beamL = new THREE.Mesh(beamGeo, beamMat); beamL.position.set(-0.36, 0.33, -2.55);
  const beamR = new THREE.Mesh(beamGeo, beamMat); beamR.position.set(0.36, 0.33, -2.55);
  const headGroundPoolMat = new THREE.MeshBasicMaterial({
    map: glowHaloTex, color: 0xfff3c4, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const headGroundPool = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.6), headGroundPoolMat);
  headGroundPool.rotation.x = -Math.PI / 2;
  headGroundPool.position.set(0, 0.015, -3.45);
  const brakeGroundPoolMat = new THREE.MeshBasicMaterial({
    map: glowHaloTex, color: 0xef4444, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const brakeGroundPool = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.8), brakeGroundPoolMat);
  brakeGroundPool.rotation.x = -Math.PI / 2;
  brakeGroundPool.position.set(0, 0.015, 1.72);
  carBodyGroup.add(beamL, beamR, headGroundPool, brakeGroundPool);

  const pPlateMat = new THREE.MeshStandardMaterial({ map: pPlateTex, roughness: 0.32 });
  const pPlateGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const pRear = new THREE.Mesh(pPlateGeo, pPlateMat); pRear.position.set(0.28, 0.72, 0.90); pRear.rotation.x = -0.64;
  const pFront = new THREE.Mesh(pPlateGeo, pPlateMat); pFront.position.set(-0.32, 0.72, -0.40); pFront.rotation.x = 0.64;
  carBodyGroup.add(pRear, pFront);

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

  // Ground slope-parking front-wheel turn indicator arrow (makes uphill-right / downhill-left unmistakable!)
  const slopeSteerArrowTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.moveTo(w * 0.5, 10);
    ctx.lineTo(w * 0.86, 56);
    ctx.lineTo(w * 0.64, 56);
    ctx.lineTo(w * 0.64, 118);
    ctx.lineTo(w * 0.36, 118);
    ctx.lineTo(w * 0.36, 56);
    ctx.lineTo(w * 0.14, 56);
    ctx.closePath();
    ctx.fill();
  });
  const slopeSteerArrow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.75, 0.75),
    new THREE.MeshBasicMaterial({ map: slopeSteerArrowTex, transparent: true, opacity: 0.95, depthWrite: false })
  );
  slopeSteerArrow.rotation.x = -Math.PI / 2;
  slopeSteerArrow.position.set(-0.15, 0.026, -1.62);
  slopeSteerArrow.visible = false;
  carRoot.add(slopeSteerArrow);

  // Rain tire spray droplets pooled behind rear wheels (zero allocations!)
  const SPRAY_COUNT = 26;
  const sprayGeo = new THREE.SphereGeometry(0.036, 6, 5);
  const sprayMat = new THREE.MeshBasicMaterial({ color: 0xdbeafe, transparent: true, opacity: 0.48, depthWrite: false });
  const sprayInst = new THREE.InstancedMesh(sprayGeo, sprayMat, SPRAY_COUNT);
  sprayInst.visible = false;
  sprayInst.frustumCulled = false;
  worldPivot.add(sprayInst);
  const sprayDrops = Array.from({ length: SPRAY_COUNT }, (_, idx) => ({
    side: idx % 2 === 0 ? -0.55 : 0.55,
    t: Math.random()
  }));

  const shadowBlob = new THREE.Mesh(
    new THREE.PlaneGeometry(1.78, 2.98),
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
    scenarioSlow: false,
    scenarioCanOvertake: false,
    scenarioAmberGantry: false,
    scenarioBrakeDemo: false,
    scenarioPedSlow: false,
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
    hasExternalMount: false,
    cameraMode: "chase", // "chase" | "pov" | "top"
    replayTimeoutId: null
  };

  carRoot.position.set(LEFT_LANE_X, 0, 0.25);

  let latestSignReqKey = null;

  function applySignBoardTexture(tex) {
    spFaceMat.map = tex;
    spFaceMat.needsUpdate = true;
    const img = tex?.image;
    if (img && img.width && img.height) {
      const ar = THREE.MathUtils.clamp(img.width / img.height, 0.58, 2.2);
      const maxDim = 0.92;
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
    tlHead.visible = true;
    tlRed.visible = tlAmber.visible = tlGreen.visible = true;
    tlRedMat.emissiveIntensity = 0.05;
    tlAmberMat.emissiveIntensity = 0.05;
    tlGreenMat.emissiveIntensity = 0.05;
    stopLineMesh.visible = false;
    stopLineMesh.position.set(0, 0.012, -1.95);
    tlArrowBox.visible = false;
    wigwagBox.visible = false;
    signPostGroup.visible = false;
    signPostGroup.position.set(-3.12, 0, -6.8);
    signPostGroup.rotation.y = 0.14;
    zebraGroup.visible = false;
    zebraDecorGroup.visible = true;
    yellowBoxGroup.visible = false;
    ybMesh.visible = true;
    doubleWhiteGroup.visible = false;
    dwLeftBroken.position.z = 0;
    roadworksGroup.visible = false;
    roadworksGroup.position.set(0, 0, -2.0);
    emergencyGroup.visible = false;
    ambGroup.position.set(1.05, 0, 1.8);
    warningTriangleGroup.visible = false;
    busGroup.visible = false;
    busGroup.rotation.y = 0;
    busGroup.position.set(-1.05, 0, -5.8);
    npcCarGroup.visible = false;
    npcCarGroup.position.set(-1.05, 0, -4.6);
    driverArmPivot.visible = false;
    driverArmPivot.rotation.set(0, 0, 0);
    npcRightBlinkerMat.emissiveIntensity = 0.08;
    roundaboutGroup.visible = false;
    roundaboutGroup.position.set(0, 0, 0);
    tunnelGroup.visible = false;
    rainInst.visible = false;
    sprayInst.visible = false;
    slopeSteerArrow.visible = false;
    curbYellow1.visible = true;
    curbYellow2.visible = false;
    leftCurb.visible = true;
    rightCurb.visible = true;
    leftSidewalk.visible = true;
    rightSidewalk.visible = true;
    hkRailLeftGroup.visible = true;
    hkRailRightGroup.visible = true;
    dashInst.visible = true;
    studsLeft.visible = true;
    studsMid.visible = true;
    studsRight.visible = true;
    gantry.visible = true;
    gBoard.visible = true;
    gantryBoardMat.map = gantrySignTex;
    gantryBoardMat.needsUpdate = true;
    for (const prop of roadsideProps) prop.visible = true;
    spPoleMat.color.setHex(0x94a3b8);
    if (state.replayTimeoutId) {
      clearTimeout(state.replayTimeoutId);
      state.replayTimeoutId = null;
    }
    hkWorld.resetAll();

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
    state.scenarioSlow = false;
    state.scenarioCanOvertake = false;
    state.scenarioAmberGantry = false;
    state.scenarioBrakeDemo = false;
    state.scenarioPedSlow = false;
    state.scenarioContraflowBus = false;
    state.scenarioArmSignal = null;
    state.scenarioNpcRightBlink = false;
    state.scenarioGreenManFlash = false;
    state.scenarioAbortOvertake = false;
    state.scenarioPassLeft = false;
    state.scenarioNpcTargetZ = -4.8;
    state.scenarioOutcome = null;
    state.scenarioRevealLabel = "";
    state.targetCarYaw = 0;
    state.targetZ = 0.25;
    state.targetX = state.lane === "left" ? LEFT_LANE_X : RIGHT_LANE_X;
    state.hazardTimer = 0;
    state.blinkerTimer = 0;
    state.brakeTimer = 0;
  }

  // Purely abstract law/number/first-aid/cabin/licensing questions that do NOT depict a road scene:
  // Smartly hide the 3D road stage on these questions so 100% of shown 3D scenes genuinely match the question!
  const HIDE_3D_IDS = new Set([
    "q01","q02","q04","q05","q06","q07","q10","q11","q12","q14","q17",
    "q45","q46","q71","q72",
    "q122","q123","q124","q125","q126","q127","q128","q129","q130","q131","q132","q133",
    "q149","q159","q160","q164","q167","q168","q171","q172","q178","q179","q186","q187","q188",
    "q195","q197","q200","q201","q205","q206","q207","q208","q209","q210","q211","q212","q213","q214","q215","q216",
    "q230","q231","q232","q233","q246","q256","q257","q266","q267","q268","q270","q272","q273",
    "q286","q287","q288","q290","q291","q292","q297","q298"
  ]);

  // Non-roadside illustrations (vehicle plates, road-surface markings, signal diagrams, multi-pole charts)
  const NON_ROADSIDE_SIGNS = new Set([
    "p_plate",
    "long_vehicle_plate",
    "pole_colors",
    "zebra_crossing_mark",
    "yellow_box_normal",
    "tram_stop_mark",
    "school_patrol"
  ]);

  function isRoadsideSignAsset(s) {
    if (!s || NON_ROADSIDE_SIGNS.has(s)) return false;
    return !(
      s.startsWith("signal_") ||
      s.startsWith("hand_") ||
      s.startsWith("road_") ||
      s.startsWith("slope_") ||
      s.startsWith("stopping_") ||
      s.startsWith("roundabout") ||
      s.startsWith("roadworks") ||
      s.startsWith("lane_signal")
    );
  }

  // Precision classifier grounded strictly in q.sign + q.prompt (never polluted by broad chapter section titles!)
  function classifyQuestionScenario(q) {
    const s = q.sign || "";
    const p = q.prompt || "";

    // 1. Exact official sign-key routing first (100% deterministic, zero keyword collisions!)
    if (s === "signal_red_amber") return "traffic_red_amber";
    if (s === "signal_red_green_arrow") return "traffic_green_arrow";
    if (s === "signal_wigwag") return "traffic_wigwag";
    if (s.startsWith("lane_signal") || s === "tunnel_start" || s === "no_dangerous_goods" || s === "no_lane_change") return "tunnel_overhead";
    if (s.startsWith("roadworks") || s === "warn_roadworks") return "roadworks";
    if (s.startsWith("slope_park") || s === "warn_steep_down") return "slope_hill";
    if (s.startsWith("roundabout") || s === "warn_roundabout") return "roundabout";
    if (s.includes("yellow_box") || s === "lrt_tram_only" || s === "warn_lrt_tram" || s === "tram_stop_mark") return "yellow_box_rail";
    if (s === "zebra_crossing_mark" || s === "warn_zebra_ahead" || s === "warn_children" || s === "warn_disabled" || s === "pedestrian_priority" || s === "school_patrol") return "pedestrian_zebra";
    if (s.includes("double_white") || s === "road_white_lines") return "road_markings_white";
    if (s.includes("yellow_lines") || s === "no_stopping" || s === "no_parking" || s === "parking_general" || s === "pole_colors") return "parking_curb";
    if (s.includes("bus_lane") || s === "contraflow_bus") return "bus_lane";
    if (s === "stopping_buses" || s === "stopping_distance_chart" || s === "no_overtaking") return "highway_overtake";
    if (s === "wind_affected") return "weather_night_rain";
    if (s.startsWith("hand_signal")) return "maneuver_signal";
    if (s === "p_plate") return "cockpit_safety";
    if (s === "long_vehicle_plate") return "highway_overtake";
    if (s) return "roadside_sign_3d";

    // 2. Text-question routing strictly on prompt text
    if (/紅燈與黃燈|紅黃燈|紅燈仍然亮着/.test(p)) return "traffic_red_amber";
    if (/綠色箭嘴|右轉箭嘴|綠箭嘴/.test(p)) return "traffic_green_arrow";
    if (/交替閃動.*紅燈|紅色警告閃燈|消防局門外/.test(p)) return "traffic_wigwag";
    if (/行人隧道|斑馬線|綠色人像|過馬路守則|視障|反光物料|行人優先使用區|沒有行人路|對行人須加倍留意/.test(p) && !/全部失靈|完全失靈/.test(p)) {
      return "pedestrian_zebra";
    }
    if (/警務人員.*指揮|警務人員.*截停/.test(p)) return "maneuver_signal";
    if (/交通燈|單一黃燈|右轉袋口位|輔助交通燈|臨時交通燈/.test(p) && !/不設交通燈/.test(p)) return "traffic_light_general";
    if (/架空行車線信號|架空方向指示|隧道/.test(p) && !/行人隧道/.test(p)) return "tunnel_overhead";
    if (/道路工程|工程車|閃爍箭嘴/.test(p)) return "roadworks";
    if (/斜路|斜坡|上坡|下坡/.test(p)) return "slope_hill";
    if (/迴旋處/.test(p)) return "roundabout";
    if (/黃色方格|黃色交叉方格|黃格|電車|輕鐵/.test(p)) return "yellow_box_rail";
    if (/巴士線/.test(p)) return "bus_lane";
    if (/雙白線|警告線|白色斜線|人字形|反光路釘/.test(p)) return "road_markings_white";
    if (/大霧.*泊車/.test(p)) return "weather_night_rain";
    if (/不准停車|不准泊車|禁止泊車|限制區|紅杆|綠杆|黃色斜線|公眾泊車|指定泊車處|燈距不超過/.test(p)) return "parking_curb";
    if (/公共巴士|雙層巴士|巴士.*最高車速|巴士.*超車/.test(p)) return "bus_lane";
    if (/救護車|緊急服務車輛|壞車|危險警告燈|死火燈|路肩|交通意外|急救|999|里程標誌|傷者|傷亡/.test(p)) return "emergency_hazard";
    if (/閃動大燈|倒車|手號|方向指示燈|轉左|轉右|剎車燈|停車燈/.test(p) && !/的士/.test(p)) return "maneuver_signal";
    if (/大霧|薄霧|雨|濕滑|滑溜|水浸|強風|熱帶氣旋|夜間|高燈|低燈|車頭大燈|能見度/.test(p)) return "weather_night_rain";
    if (/超車|超越停泊|跟車|停車距離|兩秒|車速限制|最高車速|快速公路|三條行車線|加速行車線|切入|窄路.*迎面|讓路|行車線箭嘴|的士或公共小型巴士/.test(p)) return "highway_overtake";
    if (/停車熄匙|自動波|泊車波|P 波|安全帶|酒精|藥駕|毒駕|記分|暫准駕駛|流動電訊|胎紋|輔助駕駛|兒童束縛|氣袋|嬰兒|視力標準/.test(p)) return "cockpit_safety";
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

    if (isRoadsideSignAsset(s)) {
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
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：紅黃燈齊亮路口";
        break;

      case "traffic_green_arrow": {
        trafficGroup.visible = true;
        stopLineMesh.visible = true;
        const isNotTurningArrow = /並不打算/.test(p);
        const isRightPocketGreen = /右轉袋口位|右轉箭嘴熄滅/.test(p);
        if (isRightPocketGreen) {
          tlRedMat.emissiveIntensity = 0.04;
          tlAmberMat.emissiveIntensity = 0.04;
          tlGreenMat.emissiveIntensity = 2.4;
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 10;
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：全綠燈右轉袋口位";
        } else {
          tlArrowBox.visible = true;
          tlRedMat.emissiveIntensity = 2.6;
          tlAmberMat.emissiveIntensity = 0.04;
          tlGreenMat.emissiveIntensity = 0.04;
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          if (isNotTurningArrow) {
            state.lane = "right";
            state.targetX = RIGHT_LANE_X;
            state.scenarioLabel = "實境：綠箭嘴路口直行線";
          } else {
            state.blinkerDir = -1;
            state.blinkerTimer = 10;
            state.scenarioLabel = "實境：紅燈＋左轉綠箭嘴";
          }
        }
        break;
      }

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
        const isFailed = /全部失靈|完全失靈/.test(p);
        const isAmber = !isFailed && /單一黃燈|黃燈/.test(p);
        const isGreen = !isFailed && !isAmber && /綠燈|右轉袋口位/.test(p);
        const isRoadworksTemp = /工程/.test(p);
        if (isRoadworksTemp) roadworksGroup.visible = true;

        if (isFailed) {
          // ALL 3 lenses dark/off!
          tlRedMat.emissiveIntensity = 0.01;
          tlAmberMat.emissiveIntensity = 0.01;
          tlGreenMat.emissiveIntensity = 0.01;
          state.scenarioStopped = false;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：交通燈失靈路口";
        } else {
          tlRedMat.emissiveIntensity = !isAmber && !isGreen ? 2.6 : 0.04;
          tlAmberMat.emissiveIntensity = isAmber ? 2.5 : 0.04;
          tlGreenMat.emissiveIntensity = isGreen ? 2.4 : 0.04;
          state.scenarioStopped = !isGreen;
          if (!isGreen) state.brakeTimer = 99;
          if (/右轉袋口位/.test(p)) {
            state.lane = "right";
            state.targetX = RIGHT_LANE_X;
            state.blinkerDir = 1;
            state.blinkerTimer = 8;
          }
          state.scenarioLabel = isRoadworksTemp
            ? "實境：工程臨時交通燈"
            : isGreen
              ? "實境：綠燈通行路口"
              : isAmber
                ? "實境：單一黃燈路口"
                : "實境：紅燈停車線前";
        }
        break;
      }

      case "tunnel_overhead": {
        tunnelGroup.visible = true;
        gBoard.visible = false;
        for (const prop of roadsideProps) prop.visible = false;
        gantry.position.z = -5.6;
        const isBreakdown = /壞車|起火/.test(p);
        const isCross = s === "lane_signal_cross" || /紅色交叉/.test(p);
        const isMerge = s === "lane_signal_merge_left" || /左下斜箭嘴|斜箭嘴/.test(p);
        const isAmberFlash = /黃燈閃動/.test(p);

        if (isBreakdown) {
          state.scenarioStopped = true;
          state.gear = "P";
          state.hazardTimer = 16;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：隧道內壞車亮死火燈";
        } else if (isCross) {
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
        } else if (isAmberFlash) {
          laneSignalLeftMat.map = laneAmberTex;
          laneSignalLeftMat.emissiveMap = laneAmberTex;
          laneSignalLeftMat.emissive.setHex(0xf59e0b);
          laneSignalRightMat.map = laneAmberTex;
          laneSignalRightMat.emissiveMap = laneAmberTex;
          laneSignalRightMat.emissive.setHex(0xf59e0b);
          state.scenarioAmberGantry = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：架空黃燈閃動警告";
        } else {
          state.scenarioLabel = "實境：香港隧道行車";
        }
        state.scenarioWeather = "night";
        break;
      }

      case "roadworks":
        roadworksGroup.visible = true;
        roadworksGroup.position.set(0, 0, -2.0);
        state.scenarioSlow = true;
        state.scenarioLabel = /工程車/.test(p) ? "實境：工程車閃燈警告" : "實境：前方道路工程改道";
        break;

      case "slope_hill": {
        const noKerb = s === "slope_park_no_kerb" || /沒有路邊石/.test(p);
        const isDown = !noKerb && /下坡|向下斜|1:8|1:5/.test(p);
        state.scenarioSlope = isDown ? -0.15 : 0.15;
        leftCurb.visible = !noKerb;
        if (/泊車|斜路泊/.test(p)) {
          state.scenarioStopped = true;
          state.targetX = -1.45;
          state.gear = "P";
          state.scenarioLabel = noKerb ? "實境：無石壆斜路泊車" : isDown ? "實境：下斜靠壆泊車" : "實境：上斜靠壆泊車";
        } else {
          state.scenarioSlow = true;
          state.scenarioLabel = isDown ? "實境：陡斜落斜低波行車" : "實境：斜坡行車";
        }
        break;
      }

      case "roundabout":
        roundaboutGroup.visible = true;
        gantry.visible = false;
        dashInst.visible = false;
        studsLeft.visible = studsMid.visible = studsRight.visible = false;
        curbYellow1.visible = false;
        leftCurb.visible = rightCurb.visible = false;
        for (const prop of roadsideProps) prop.visible = false;
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.targetX = 0;
        state.scenarioLabel = "實境：香港兩線迴旋處";
        break;

      case "yellow_box_rail": {
        const isActualYellowBox = /黃色方格|黃色交叉方格|黃格/.test(p) || s.includes("yellow_box");
        const isTramOrLrt = /電車|輕鐵|路軌/.test(p) || s === "lrt_tram_only" || s === "warn_lrt_tram" || s === "tram_stop_mark";
        yellowBoxGroup.visible = true;
        ybMesh.visible = isActualYellowBox;
        railGroup.visible = isTramOrLrt;
        dashInst.visible = false;
        studsMid.visible = false;
        if (isTramOrLrt && !isActualYellowBox) {
          // q121 / q277 / q280 / q91 / q109: Authentic HK Green Double-Decker Tram on rails + yellow stop line (NO fake yellow box!)
          wg.hkTramGroup.visible = true;
          wg.yellowStopLineMesh.visible = s === "tram_stop_mark" || /黃色停車線/.test(p);
          state.scenarioStopped = wg.yellowStopLineMesh.visible || /電車站/.test(p);
          if (state.scenarioStopped) state.brakeTimer = 99;
          state.scenarioLabel = wg.yellowStopLineMesh.visible ? "實境：電車站黃色停車線" : "實境：香港電車／輕鐵專線";
        } else {
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = isTramOrLrt ? "實境：電車／輕鐵黃格路口" : "實境：黃色方格路口";
        }
        break;
      }

      case "road_markings_white":
        if (/雙白線/.test(p) || s.includes("double_white")) {
          doubleWhiteGroup.visible = true;
          dashInst.visible = false;
          studsMid.visible = false;
          const brokenOnYourSide = s === "road_double_white_broken" || /虛線/.test(p);
          dwLeftSolid.visible = !brokenOnYourSide;
          dwLeftBroken.visible = brokenOnYourSide;
          state.scenarioLabel = brokenOnYourSide ? "實境：靠你一邊虛雙白線" : "實境：連續雙白實線";
        } else if (s === "road_white_lines" || /三種白色單行虛線/.test(p)) {
          // q25: Three distinct white dashed line patterns side-by-side (short / medium / long-warning)!
          wg.threeWhiteLinesGroup.visible = true;
          dashInst.visible = false;
          studsMid.visible = false;
          state.scenarioLabel = "實境：三種白色單行虛線（最右為警告線）";
        } else if (/反光路釘/.test(p)) {
          state.scenarioWeather = "night";
          state.scenarioLabel = "實境：紅白琥珀反光路釘";
        } else {
          state.scenarioLabel = "實境：白色警告線與道路標記";
        }
        break;

      case "parking_curb":
        if (/快速公路.*並不會設置|為何「快速公路」/.test(p)) {
          // q234: Expressway legally forbids stopping WITHOUT yellow lines — show ZERO yellow lines on 3-lane expressway!
          curbYellow1.visible = false;
          curbYellow2.visible = false;
          wg.threeLaneGroup.visible = true;
          rightCurb.visible = false;
          studsRight.visible = false;
          gantry.visible = true;
          state.scenarioLabel = "實境：快速公路（不設黃線即禁停車）";
        } else if (s === "road_yellow_lines" || /單行黃色虛線/.test(p)) {
          // q44: Actual single dashed yellow line along left curb (NOT double solid yellow)!
          curbYellow1.visible = false;
          curbYellow2.visible = false;
          wg.curbYellowDashedGroup.visible = true;
          state.scenarioLabel = "實境：路旁單行黃色虛線";
        } else if (/紅杆|綠杆|顏色標誌杆|黃色杆/.test(p) || s === "pole_colors") {
          // q43 / q117: Authentic HK colored restriction poles standing along left curb!
          curbYellow2.visible = true;
          wg.coloredPolesGroup.visible = true;
          if (/紅杆/.test(p)) {
            wg.poleRed.visible = true;
            wg.poleGreen.visible = true;
            state.scenarioLabel = "實境：紅杆／綠杆不准停車限制區";
          } else {
            wg.poleYellow.visible = true;
            wg.poleGrey.visible = true;
            state.scenarioLabel = "實境：黃杆／灰杆不准停車限制區";
          }
        } else {
          curbYellow2.visible = true;
          state.targetX = LEFT_LANE_X;
          state.scenarioLabel = "實境：路旁禁區黃線與泊車規則";
        }
        break;

      case "bus_lane":
        busGroup.visible = true;
        state.lane = "right";
        state.targetX = RIGHT_LANE_X;
        if (s === "contraflow_bus" || /反向行駛巴士線/.test(p)) {
          // q30: Contraflow bus lane — HK double-decker bus approaches TOWARD you with white headlights!
          busGroup.rotation.y = Math.PI;
          busGroup.position.set(-1.05, 0, -11.5);
          state.scenarioContraflowBus = true;
          state.scenarioLabel = "實境：對面反向行駛巴士線";
        } else {
          state.scenarioLabel = "實境：香港巴士專線旁行車";
        }
        break;

      case "pedestrian_zebra": {
        zebraGroup.visible = true;
        const isGreenManCrossing = /綠色人像/.test(p);
        const isGreenWithElderly = /綠燈剛亮起|長者/.test(p);
        if (isGreenManCrossing) {
          // q65 / q154 / q163 / q196: Real HK Green-Man Pedestrian Signal Crossing (NOT zebra Belisha beacons!)
          zebraDecorGroup.visible = false;
          wg.greenManGroup.visible = true;
          state.scenarioGreenManFlash = /閃動|發聲裝置/.test(p);
          if (isGreenWithElderly) {
            trafficGroup.visible = true;
            trafficGroup.position.set(0, 0, -1.35);
            stopLineMesh.visible = true;
            tlRedMat.emissiveIntensity = 0.04;
            tlAmberMat.emissiveIntensity = 0.04;
            tlGreenMat.emissiveIntensity = 2.4;
            state.scenarioPedSlow = true;
            state.scenarioLabel = "實境：綠燈仍須讓行人先過";
          } else {
            state.scenarioLabel = state.scenarioGreenManFlash ? "實境：綠色人像閃動過路處" : "實境：綠色人像過路處";
          }
        } else if (/反光物料|漆黑/.test(p)) {
          state.scenarioWeather = "night";
          state.scenarioLabel = "實境：夜間行人反光過路";
        } else if (s === "warn_children" || /兒童|學校/.test(p)) {
          state.scenarioLabel = "實境：學校區雙黃閃燈過路處";
        } else {
          state.scenarioLabel = "實境：斑馬線行人過馬路";
        }
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        break;
      }

      case "emergency_hazard":
        if (/救護車|緊急服務車輛/.test(p)) {
          emergencyGroup.visible = true;
          ambGroup.position.set(1.05, 0, 1.8);
          state.scenarioLabel = "實境：緊急救援車響號超前";
        } else {
          state.scenarioStopped = true;
          state.targetX = -1.55;
          state.hazardTimer = 16;
          state.brakeTimer = 99;
          state.gear = "P";
          // Show 3D warning triangle ONLY for <=50 km/h warning-triangle questions (never for expressway >50 km/h!)
          if (/三角形警告牌/.test(p) && !/超過每小時 50 公里/.test(p)) {
            warningTriangleGroup.visible = true;
            state.scenarioLabel = "實境：低速路壞車放三角牌";
          } else {
            state.scenarioLabel = /危險警告燈|死火燈/.test(p) ? "實境：危險警告燈（死火燈）示範" : "實境：壞車亮死火燈停靠路肩";
          }
        }
        break;

      case "weather_night_rain":
        if (/大霧.*泊車/.test(p)) {
          state.scenarioWeather = "fog";
          state.scenarioStopped = true;
          state.gear = "P";
          state.targetX = -1.48;
          state.scenarioLabel = "實境：大霧路旁泊車亮車燈";
        } else if (/雨|濕滑|滑溜|水浸|水膜|強風|熱帶氣旋/.test(p)) {
          rainInst.visible = !/強風|熱帶氣旋/.test(p) || /雨/.test(p);
          state.scenarioWeather = "rain";
          state.scenarioSlow = true;
          if (/停車距離|四秒|兩秒/.test(p)) {
            // q16 / q18: Wet stopping distance / 4-second rule with DOUBLED red braking zone!
            wg.stoppingZonesGroup.visible = true;
            wg.brakingStrip.scale.y = 1.75;
            wg.brakingStrip.position.z = -5.7;
            npcCarGroup.visible = true;
            npcCarGroup.position.set(-1.05, 0, -9.5);
            state.scenarioNpcTargetZ = -9.5;
          }
          state.scenarioLabel = /強風|熱帶氣旋/.test(p) ? "實境：強風大雨橫風警覺" : "實境：雨天濕滑路面行車";
        } else if (/霧|能見度/.test(p)) {
          state.scenarioWeather = "fog";
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：大霧低能見度行車";
        } else {
          state.scenarioWeather = "night";
          state.scenarioLabel = "實境：夜間開燈行車";
        }
        break;

      case "highway_overtake": {
        npcCarGroup.visible = true;
        const noOvertakeRule =
          s === "no_overtaking" ||
          s === "stopping_buses" ||
          s === "stopping_distance_chart" ||
          s === "long_vehicle_plate" ||
          /不應超車|不准超車|不可超車|讓路|停車距離|兩秒|跟車|減慢|切勿.*換線|禁止使用最右線|錯過|最高車速|速度計|三條行車線|純電動車|500 米|港珠澳|靠右駛道路|的士或公共小型巴士|加速行車線|折返/.test(p);
        state.scenarioCanOvertake = !noOvertakeRule;
        if (/港珠澳|靠右駛道路/.test(p)) {
          // q244: HZMB Hong Kong Link Road right-hand traffic — car genuinely drives on RIGHT (no answer spoiler)!
          npcCarGroup.visible = false;
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.scenarioLabel = "實境：快速公路靠右駛道路示範";
        } else if (/左方超車/.test(p)) {
          // q19: Lead car in right/center with RIGHT BLINKER flashing -> pass cleanly on the LEFT!
          npcCarGroup.position.set(0.55, 0, -4.6);
          state.scenarioNpcRightBlink = true;
          state.scenarioPassLeft = true;
          state.scenarioCanOvertake = false;
          state.scenarioLabel = "實境：前車打右燈準備轉右";
        } else if (/前車突然加速/.test(p)) {
          // q135: Start alongside in right lane; on right answer safely abort overtake back to left lane!
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          npcCarGroup.position.set(-1.05, 0, -2.1);
          state.scenarioNpcTargetZ = -2.1;
          state.scenarioAbortOvertake = true;
          state.scenarioCanOvertake = false;
          state.scenarioLabel = "實境：超車遇前車加速 · 折返原線";
        } else if (s === "long_vehicle_plate") {
          npcCarGroup.visible = false;
          busGroup.visible = true;
          busGroup.position.set(-1.05, 0, -5.8);
          state.scenarioLabel = "實境：長車前方盲點與距離";
        } else if (/停車距離|兩秒|跟車/.test(p)) {
          // q15 / q118 / q134: Show Thinking Distance (Amber) + Braking Distance (Red) strips ahead!
          wg.stoppingZonesGroup.visible = true;
          npcCarGroup.position.set(-1.05, 0, -7.2);
          state.scenarioNpcTargetZ = -7.2;
          state.scenarioLabel = "實境：思考＋剎車安全距離示範";
        } else if (/的士|切入/.test(p)) {
          state.scenarioLabel = "實境：跟車安全距離示範";
        } else if (s === "no_overtaking" || /不應超車/.test(p)) {
          state.scenarioLabel = "實境：禁超車路段保持跟車";
        } else if (/禁止使用最右線|三條行車線|500 米|錯過|速度計|最高車速|純電動車|加速行車線/.test(p)) {
          state.scenarioLabel = "實境：香港快速公路行車規則";
        } else {
          state.scenarioLabel = "實境：超車與切線判斷";
        }
        break;
      }

      case "maneuver_signal":
        if (/騎單車/.test(p) && /手號/.test(p)) {
          // q202: Cyclist hand signal question — show cyclist cleanly (anti-spoiler pre-answer!)
          wg.cyclistGroup.visible = true;
          wg.cyclistGroup.position.set(-1.45, 0, -4.0);
          wg.cityBuildingsGroup.visible = true;
          gantry.visible = false;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：騎單車者慢駛／停車手號";
        } else if (s.startsWith("hand_signal") || /手號|逆時針打圈|掌心向下|平舉指向右/.test(p)) {
          // q64 / q76 / q115: Lead car extends BOLD 3D RIGHT ARM doing exact HK hand signal!
          npcCarGroup.visible = true;
          npcCarGroup.position.set(-1.32, 0, -3.1);
          state.scenarioNpcTargetZ = -3.1;
          state.targetX = -0.82;
          driverArmPivot.visible = true;
          if (s === "hand_signal_left" || /逆時針/.test(p)) {
            state.scenarioArmSignal = "left_circle";
            state.scenarioLabel = "實境：前車右臂逆時針打圈（轉左）";
          } else if (s === "hand_signal_right" || /平舉指向右/.test(p)) {
            state.scenarioArmSignal = "right_point";
            state.scenarioLabel = "實境：前車右臂平舉（轉右／駛出）";
          } else {
            state.scenarioArmSignal = "slow_wave";
            state.scenarioSlow = true;
            state.scenarioLabel = "實境：前車右臂上下擺動（慢駛／停車）";
          }
        } else if (/剎車燈|停車燈/.test(p)) {
          state.scenarioWeather = "night";
          state.scenarioBrakeDemo = true;
          state.scenarioLabel = "實境：車尾後燈與剎車燈分別";
        } else if (/閃動大燈/.test(p)) {
          state.flashTimer = 1.6;
          state.scenarioLabel = "實境：閃動大燈與安全倒車";
        } else if (/倒車/.test(p)) {
          state.gear = "R";
          state.scenarioLabel = "實境：R 波倒車操作示範";
        } else if (/警務人員|交通督導員/.test(p)) {
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：遵從警員交通指揮";
        } else if (/轉左/.test(p) && !/轉右/.test(p)) {
          state.blinkerDir = -1;
          state.blinkerTimer = 8;
          state.scenarioLabel = "實境：左轉信號與路口";
        } else if (/轉右/.test(p) && !/轉左/.test(p)) {
          state.blinkerDir = 1;
          state.blinkerTimer = 8;
          state.scenarioLabel = "實境：右轉信號與路口";
        } else if (/慢駛|減速/.test(p)) {
          state.scenarioSlow = true;
          state.brakeTimer = 2.5;
          state.scenarioLabel = "實境：慢駛停車信號";
        } else {
          state.blinkerDir = -1;
          state.blinkerTimer = 6;
          state.scenarioLabel = "實境：方向指示燈與手號";
        }
        break;

      case "roadside_sign_3d": {
        // Transform the ACTUAL 3D ROAD & ENVIRONMENT to match every single HK road sign in real life!
        gantry.visible = false;
        if (s === "warn_dual_end") {
          // q58: Divided dual carriageway with raised median ending ahead into a two-way road + oncoming car!
          wg.dualEndGroup.visible = true;
          wg.oncomingCarGroup.visible = true;
          wg.oncomingCarGroup.position.set(1.05, 0, -11.5);
          dashInst.visible = false;
          studsMid.visible = false;
          state.scenarioLabel = "實境：分隔車路終止 · 轉雙程路";
        } else if (s === "warn_narrow_both") {
          // q102: Road physically narrows inward on BOTH sides ahead!
          wg.narrowRoadGroup.visible = true;
          leftCurb.visible = rightCurb.visible = false;
          curbYellow1.visible = false;
          dashInst.visible = false;
          studsLeft.visible = studsMid.visible = studsRight.visible = false;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方道路兩邊收窄";
        } else if (s === "passing_place") {
          // q114: Narrow single-track road + left-side pull-in passing bay + oncoming car!
          wg.narrowRoadGroup.visible = true;
          wg.passingPlaceGroup.visible = true;
          wg.oncomingCarGroup.visible = true;
          wg.oncomingCarGroup.position.set(0, 0, -13.5);
          leftCurb.visible = rightCurb.visible = false;
          curbYellow1.visible = false;
          dashInst.visible = false;
          studsLeft.visible = studsMid.visible = studsRight.visible = false;
          state.targetX = 0;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：狹窄單行路讓車處";
        } else if (s === "no_through_road") {
          // q59: Red/white barricade wall sealing off dead-end cul-de-sac ahead!
          wg.deadEndGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方此路不通（掘頭路）";
        } else if (s === "pass_either_side" || s === "keep_left") {
          // q53 / q85: Raised concrete pedestrian refuge island + amber bollard in road center!
          wg.refugeIslandGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          dashInst.visible = false;
          studsMid.visible = false;
          state.scenarioLabel = s === "keep_left" ? "實境：安全島 · 靠左駛過" : "實境：安全島 · 左右可通過";
        } else if (s === "warn_crossroads" || s === "warn_two_way_cross" || s === "give_way" || s === "stop_oct") {
          // q105 / q57 / q81 / q51: Actual 3D perpendicular cross-street + live cross-traffic cars!
          wg.crossroadGroup.visible = true;
          wg.crossCarA.visible = true;
          wg.crossCarB.visible = s === "warn_two_way_cross" || s === "warn_crossroads";
          wg.giveWayLine.visible = s === "give_way";
          if (s === "stop_oct") stopLineMesh.visible = true;
          wg.cityBuildingsGroup.visible = true;
          leftCurb.visible = rightCurb.visible = false;
          curbYellow1.visible = false;
          dashInst.visible = false;
          state.scenarioSlow = true;
          state.scenarioLabel =
            s === "warn_two_way_cross"
              ? "實境：雙程路橫過單程路口"
              : s === "give_way"
                ? "實境：讓路路口 · 橫向車流"
                : s === "stop_oct"
                  ? "實境：STOP 停車路口"
                  : "實境：前面十字路口交匯";
        } else if (s === "warn_two_way_ahead") {
          // q116: Oncoming vehicle approaching with white headlights ahead!
          wg.oncomingCarGroup.visible = true;
          wg.oncomingCarGroup.position.set(1.05, 0, -10.0);
          state.scenarioLabel = "實境：前面轉為雙程行車";
        } else if (s === "one_way") {
          // q52: One-way urban street with twin forward lane arrows & fellow forward car!
          wg.roadArrowGroup.visible = true;
          wg.arrowLeftMat.map = wt.arrowAheadTex;
          wg.arrowRightMat.map = wt.arrowAheadTex;
          wg.arrowL.visible = true;
          wg.arrowR.visible = true;
          wg.cityBuildingsGroup.visible = true;
          npcCarGroup.visible = true;
          npcCarGroup.position.set(1.05, 0, -5.2);
          state.scenarioLabel = "實境：單程行車街道";
        } else if (s === "turn_left_ahead" || s === "no_left_turn" || s === "ahead_only") {
          // q86 / q84 / q73: 3D side-road branching left + painted lane arrows!
          wg.sideRoadGroup.visible = true;
          wg.roadArrowGroup.visible = true;
          wg.arrowLeftMat.map = s === "turn_left_ahead" ? wt.arrowLeftTex : wt.arrowAheadTex;
          wg.arrowL.visible = true;
          wg.arrowR.visible = false;
          wg.cityBuildingsGroup.visible = true;
          leftCurb.visible = false;
          curbYellow1.visible = false;
          state.scenarioLabel =
            s === "turn_left_ahead"
              ? "實境：前面路口必須左轉"
              : s === "no_left_turn"
                ? "實境：前面路口不准左轉"
                : "實境：前面只准向前駛";
        } else if (s === "no_u_turn") {
          // q83: Central divider + forward lane arrow!
          wg.dualEndGroup.visible = true;
          wg.roadArrowGroup.visible = true;
          wg.arrowLeftMat.map = wt.arrowAheadTex;
          wg.arrowL.visible = true;
          wg.arrowR.visible = false;
          wg.cityBuildingsGroup.visible = true;
          dashInst.visible = false;
          studsMid.visible = false;
          state.scenarioLabel = "實境：道路中央禁止掉頭";
        } else if (s === "no_entry") {
          // q82: Prohibited entrance with oncoming car emerging + red/white bollards!
          wg.oncomingCarGroup.visible = true;
          wg.oncomingCarGroup.position.set(-0.2, 0, -10.5);
          wg.bollardGateGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：單程出口 · 不准駛入";
        } else if (s === "height_limit_45" || s === "weight_limit_10t" || s === "no_bicycles") {
          // q94 / q95 / q93: Real 3D concrete overpass bridge (show 4.5m clearance stripe ONLY for height_limit!)
          wg.bridgeGroup.visible = true;
          wg.bridgeFascia.visible = s === "height_limit_45";
          if (s === "weight_limit_10t") {
            wg.lorryGroup.visible = true;
            wg.lorryGroup.position.set(1.05, 0, -7.8);
          }
          state.scenarioLabel =
            s === "height_limit_45"
              ? "實境：前方限高 4.5 米天橋"
              : s === "weight_limit_10t"
                ? "實境：前方限重 10 公噸橋樑"
                : "實境：天橋入口禁止單車";
        } else if (s === "cycle_track" || s === "cycle_dismount" || s === "warn_cyclists") {
          // q89 / q90 / q110: Real 3D bicycle + helmeted cyclist & HK painted cycle track!
          wg.cyclistGroup.visible = true;
          if (s === "cycle_track" || s === "cycle_dismount") {
            wg.cycleTrackMesh.visible = true;
            wg.cyclistGroup.position.set(-3.35, 0, -4.8);
          } else {
            wg.cyclistGroup.position.set(-1.68, 0, -4.6);
          }
          state.scenarioSlow = true;
          state.scenarioLabel = s === "warn_cyclists" ? "實境：前方有騎單車者" : "實境：單車徑與騎單車規則";
        } else if (s === "warn_camera") {
          // q77: Iconic HK orange speed / red-light camera pole!
          wg.speedCameraGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioLabel = "實境：前方偵速／衝紅燈攝影機";
        } else if (s === "police_stop") {
          // q87: HK Police patrol car roadblock + cones!
          wg.policeBlockGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方警方路障檢查點";
        } else if (s === "warn_slippery") {
          // q112: Glistening wet/slick oil patch right on asphalt!
          wg.slipperyPatchGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方濕滑路面警示";
        } else if (s === "warn_loose_chippings") {
          // q113: Scattered 3D grey loose gravel stones across road!
          wg.gravelPatchGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方鬆脫碎石路面";
        } else if (s === "countdown_green_3" || s === "expressway_start" || s === "expressway_end" || s === "mileage_route9") {
          // q37 / q32 / q100 / q68: Real 3D branching expressway slip-road + 300/200/100m countdown boards!
          gantry.visible = true;
          wg.slipRoadGroup.visible = true;
          if (s === "expressway_start" || s === "mileage_route9") {
            wg.threeLaneGroup.visible = true;
            rightCurb.visible = false;
            studsRight.visible = false;
          }
          state.scenarioLabel =
            s === "countdown_green_3"
              ? "實境：快速公路 300 米出口減速線"
              : s === "mileage_route9"
                ? "實境：九號幹線里程標誌"
                : s === "expressway_end"
                  ? "實境：快速公路終止路段"
                  : "實境：香港快速公路起點";
        } else if (s === "no_horn") {
          // q21: White 3D Hospital building with Red Cross clearly visible beside street!
          wg.hospitalGroup.visible = true;
          state.scenarioLabel = "實境：醫院寂靜地帶（禁響號）";
        } else if (s === "warn_blackspot" || s === "warn_ped_blackspot") {
          // q56 / q104: Yellow-black HK sharp-bend chevron boards!
          wg.chevronCurveGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = s === "warn_ped_blackspot" ? "實境：前方行人意外黑點" : "實境：前方交通意外黑點彎位";
        } else if (s === "warn_traffic_lights") {
          // q103: Real 3D traffic lights visible further down the urban road!
          trafficGroup.visible = true;
          trafficGroup.position.set(0, 0, -4.8);
          tlRedMat.emissiveIntensity = 0.04;
          tlAmberMat.emissiveIntensity = 2.4;
          tlGreenMat.emissiveIntensity = 0.04;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：前方交通燈號路口";
        } else if (s === "speed_limit_50") {
          // q96: Bold white "50" painted directly on the road asphalt!
          wg.roadSpeed50Mesh.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioLabel = "實境：時速 50 公里市區限速";
        } else {
          // q09 / q54 / q74 / q92 / q97: Restricted-access urban street with red/white bollards!
          wg.bollardGateGroup.visible = true;
          wg.cityBuildingsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：車輛／行人限制管制路段";
        }
        break;
      }

      case "cockpit_safety":
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
        if (/視力標準|23 米/.test(p)) {
          // q01: 23m licence plate eyesight check — parked car directly ahead displaying plate!
          wg.parkingBayGroup.visible = true;
          npcCarGroup.visible = true;
          npcCarGroup.position.set(-1.42, 0, -5.6);
          state.gear = "P";
          state.scenarioStopped = true;
          state.targetX = -1.42;
          state.scenarioLabel = "實境：23 米視力測試讀車牌";
        } else if (/酒精|藥駕|毒駕|呼氣測試/.test(p)) {
          // q02 / q129: HK Police random breathalyser checkpoint!
          wg.policeBlockGroup.visible = true;
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：警方路障隨機呼氣測試";
        } else if (/輪胎|胎紋/.test(p)) {
          // q04: Parked in bay with close-up side-wheel view!
          wg.parkingBayGroup.visible = true;
          state.gear = "P";
          state.scenarioStopped = true;
          state.targetX = -1.42;
          state.scenarioLabel = "實境：輪胎胎紋安全檢查";
        } else if (/迎頭相撞/.test(p)) {
          // q207: Oncoming vehicle visual for head-on collision seatbelt physics!
          wg.oncomingCarGroup.visible = true;
          wg.oncomingCarGroup.position.set(1.05, 0, -9.5);
          state.scenarioLabel = "實境：安全帶防撞保護示範";
        } else if (/停車熄匙|泊車波|P 波|下車/.test(p)) {
          wg.parkingBayGroup.visible = true;
          state.gear = "P";
          state.scenarioStopped = true;
          state.targetX = -1.42;
          state.scenarioLabel = "實境：自動波 P 波停泊檢查";
        } else if (s === "p_plate" || /暫准駕駛|P 牌/.test(p)) {
          gantry.visible = true;
          wg.cityBuildingsGroup.visible = false;
          wg.threeLaneGroup.visible = true;
          rightCurb.visible = false;
          studsRight.visible = false;
          state.scenarioLabel = "實境：P 牌自動波快速公路巡航";
        } else {
          // Seatbelt / child seat / mobile device / driving improvement — parked/urban HK street!
          wg.parkingBayGroup.visible = /兒童|嬰兒|安全帶|氣袋|輔助駕駛/.test(p);
          if (wg.parkingBayGroup.visible) {
            state.gear = "P";
            state.scenarioStopped = true;
            state.targetX = -1.42;
          }
          state.scenarioLabel = "實境：1A 自動波車廂安全守則";
        }
        break;

      default: {
        // Every remaining city_cruising question gets its own authentic HK real-world street & actor!
        gantry.visible = false;
        wg.cityBuildingsGroup.visible = true;
        if (/電單車/.test(p)) {
          wg.motorcycleGroup.visible = true;
          state.scenarioLabel = "實境：香港電單車行車示範";
        } else if (/的士|輪椅/.test(p)) {
          wg.taxiGroup.visible = true;
          state.scenarioLabel = "實境：香港市區的士與無障礙出行";
        } else if (/拖車/.test(p)) {
          wg.lorryGroup.visible = true;
          wg.towGroup.visible = true;
          wg.lorryGroup.position.set(1.05, 0, -8.8);
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：拖車繩拖曳車輛距離";
        } else if (/伸懸|貨物|貨車|長車|重型車輛/.test(p)) {
          wg.lorryGroup.visible = true;
          wg.lorryFlagGroup.visible = /伸懸|警示裝置/.test(p);
          if (/高度上限/.test(p)) wg.bridgeGroup.visible = true;
          state.scenarioLabel = wg.lorryFlagGroup.visible ? "實境：貨車伸懸貨物掛紅旗" : "實境：重型貨車行車與載貨規則";
        } else if (/單車/.test(p)) {
          wg.cyclistGroup.visible = true;
          if (/單車徑|泊車處|推單車|尺碼/.test(p)) {
            wg.cycleTrackMesh.visible = true;
            wg.cyclistGroup.position.set(-3.35, 0, -4.8);
          }
          if (/停泊車輛/.test(p)) wg.parkedCarsGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：道路單車安全規則";
        } else if (/動物|騎馬|牽馬|遊行/.test(p)) {
          wg.animalGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：路旁動物慢駛禮讓";
        } else if (/停放了車輛|停泊車輛|馬路的一邊.*下車|雙排泊車|不應停留/.test(p)) {
          wg.parkedCarsGroup.visible = true;
          state.targetX = 0.45;
          state.scenarioSlow = true;
          state.scenarioLabel = /單程路/.test(p) ? "實境：單程路同向停泊車輛" : "實境：路邊停泊車輛與安全空間";
        } else if (/支路路口/.test(p)) {
          wg.crossroadGroup.visible = true;
          wg.giveWayLine.visible = true;
          leftCurb.visible = rightCurb.visible = false;
          curbYellow1.visible = false;
          dashInst.visible = false;
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：支路出大路觀察來車";
        } else if (/單程路/.test(p)) {
          wg.roadArrowGroup.visible = true;
          wg.arrowLeftMat.map = wt.arrowAheadTex;
          wg.arrowRightMat.map = wt.arrowAheadTex;
          wg.arrowL.visible = true;
          wg.arrowR.visible = true;
          state.scenarioLabel = "實境：香港雙線單程路行車";
        } else if (/行車時間顯示/.test(p)) {
          wg.jtiBoardGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioLabel = "實境：行車時間顯示系統（紅黃綠）";
        } else if (/危險標記/.test(p)) {
          wg.hazardPostsGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioWeather = "night";
          state.scenarioLabel = "實境：紅白琥珀路邊危險標記";
        } else if (/四種底色|形狀與顏色/.test(p)) {
          gantry.visible = true;
          gantry.position.z = -7.2;
          gantryBoardMat.map = wt.gantryColorsTex;
          gantryBoardMat.needsUpdate = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioLabel = "實境：香港四色方向指示牌";
        } else if (/文字警告標誌|改道標誌/.test(p)) {
          gantry.visible = true;
          gantry.position.z = -7.2;
          gantryBoardMat.map = wt.gantryTempTex;
          gantryBoardMat.needsUpdate = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioLabel = "實境：紅底文字警告與黃底改道牌";
        } else if (/主要幹線編號/.test(p)) {
          gantry.visible = true;
          wg.threeLaneGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          rightCurb.visible = false;
          studsRight.visible = false;
          state.scenarioLabel = "實境：香港主要幹線系統";
        } else if (/窄路|迂迴/.test(p)) {
          wg.narrowRoadGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          leftCurb.visible = rightCurb.visible = false;
          curbYellow1.visible = false;
          dashInst.visible = false;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：狹窄迂迴道路禮讓";
        } else if (/遺下或拋出物件/.test(p)) {
          wg.obstacleBoxGroup.visible = true;
          state.scenarioSlow = true;
          state.scenarioLabel = "實境：路面障礙物清除與警告";
        } else if (/70 km\/h 進入 50 km\/h|速度計/.test(p)) {
          wg.roadSpeed50Mesh.visible = true;
          wg.slipRoadGroup.visible = true;
          wg.cityBuildingsGroup.visible = false;
          state.scenarioLabel = "實境：高速轉入 50 km/h 減速";
        } else if (/安全檢查及加油|疲倦|鞋履|上車前|開車前|幼童|執照|年齡|載客|儀錶板|記分|服食藥物|學牌/.test(p)) {
          wg.parkingBayGroup.visible = true;
          state.gear = "P";
          state.scenarioStopped = true;
          state.targetX = -1.42;
          state.scenarioLabel = "實境：開車前安全檢查與法例";
        } else {
          state.scenarioLabel = "實境：香港市區街道行車";
        }
        break;
      }
    }

    // ==================== ENHANCE EXISTING SCENARIOS WITH REAL-WORLD ROAD DETAILS ====================
    if (kind === "weather_night_rain") {
      if (/迎面車輛開高燈|目眩/.test(p)) {
        wg.oncomingCarGroup.visible = true;
        wg.oncomingCarGroup.position.set(1.05, 0, -9.2);
        if (wg.oncomingGlare) wg.oncomingGlare.visible = true;
        state.scenarioLabel = "實境：夜間迎面高燈目眩";
      } else if (/水浸|積水/.test(p)) {
        wg.floodWaterMesh.visible = true;
        state.scenarioLabel = "實境：水浸積水街道慢駛";
      } else if (/滑溜|剛落雨/.test(p)) {
        wg.slipperyPatchGroup.visible = true;
      } else if (s === "wind_affected" || /強風|熱帶氣旋/.test(p)) {
        wg.lorryGroup.visible = true;
        wg.lorryGroup.position.set(1.05, 0, -7.2);
      }
    }
    if (kind === "highway_overtake") {
      if (/三條行車線|禁止使用最右線|純電動車|港珠澳|靠右駛道路/.test(p)) {
        wg.threeLaneGroup.visible = true;
        rightCurb.visible = false;
        studsRight.visible = false;
      } else if (/加速行車線|500 米|錯過/.test(p)) {
        wg.slipRoadGroup.visible = true;
      } else if (/不應超車|彎路|坡頂/.test(p)) {
        wg.chevronCurveGroup.visible = true;
        gantry.visible = false;
      } else if (/的士|小巴/.test(p)) {
        npcCarGroup.visible = false;
        wg.taxiGroup.visible = true;
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
      } else if (/超越停泊/.test(p)) {
        npcCarGroup.visible = false;
        wg.parkedCarsGroup.visible = true;
        wg.oncomingCarGroup.visible = true;
        wg.oncomingCarGroup.position.set(1.05, 0, -11.5);
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
      } else if (/窄路.*迎面/.test(p)) {
        npcCarGroup.visible = false;
        wg.narrowRoadGroup.visible = true;
        wg.oncomingCarGroup.visible = true;
        wg.oncomingCarGroup.position.set(0, 0, -13.0);
        leftCurb.visible = rightCurb.visible = false;
        curbYellow1.visible = false;
        dashInst.visible = false;
        gantry.visible = false;
      } else if (/小路出大路/.test(p)) {
        npcCarGroup.visible = false;
        wg.crossroadGroup.visible = true;
        wg.giveWayLine.visible = true;
        leftCurb.visible = rightCurb.visible = false;
        curbYellow1.visible = false;
        dashInst.visible = false;
        gantry.visible = false;
      } else if (/預設最高車速|50 公里/.test(p) && !/停車距離/.test(p)) {
        npcCarGroup.visible = false;
        wg.roadSpeed50Mesh.visible = true;
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
      } else if (s === "long_vehicle_plate") {
        busGroup.visible = false;
        wg.lorryGroup.visible = true;
        wg.lorryGroup.position.set(-1.05, 0, -7.2);
      }
    }
    if (kind === "road_markings_white") {
      if (/白色斜線|人字形/.test(p)) {
        wg.chevronHatchMesh.visible = true;
        dashInst.visible = false;
        studsMid.visible = false;
        gantry.visible = false;
        state.scenarioLabel = "實境：白色斜線／人字形禁區標記";
      }
    }
    if (kind === "roundabout") {
      if (/黃色橫條/.test(p)) {
        wg.yellowBarsGroup.visible = true;
        state.scenarioLabel = "實境：迴旋處前黃色橫條減速標記";
      } else if (/騎單車/.test(p)) {
        wg.cyclistGroup.visible = true;
        wg.cyclistGroup.position.set(-1.6, 0, -3.4);
        state.scenarioLabel = "實境：單車靠左外圈行迴旋處";
      }
    }
    if (kind === "tunnel_overhead") {
      if (/東.*中.*西/.test(p)) {
        tunnelGroup.visible = false;
        gBoard.visible = true;
        gantry.position.z = -7.2;
        gantryBoardMat.map = wt.gantryHarbourTex;
        gantryBoardMat.needsUpdate = true;
        state.scenarioWeather = "clear";
        for (const prop of roadsideProps) prop.visible = true;
        state.scenarioLabel = "實境：東／中／西三條過海隧道標誌";
      } else if (/跌下貨物|漏出/.test(p)) {
        wg.obstacleBoxGroup.visible = true;
      } else if (/單管雙程/.test(p)) {
        // q161: Single-tube two-way tunnel with oncoming car in opposite lane!
        wg.oncomingCarGroup.visible = true;
        wg.oncomingCarGroup.position.set(1.05, 0, -11.0);
        state.scenarioLabel = "實境：單管雙程行車隧道";
      }
    }
    if (kind === "maneuver_signal") {
      if (/警務人員|交通督導員/.test(p)) {
        wg.policeBlockGroup.visible = true;
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
      } else if (/路口.*轉右|路口.*轉左/.test(p)) {
        wg.crossroadGroup.visible = true;
        wg.cityBuildingsGroup.visible = true;
        leftCurb.visible = rightCurb.visible = false;
        curbYellow1.visible = false;
        dashInst.visible = false;
        gantry.visible = false;
      } else if (/騎單車/.test(p)) {
        wg.cyclistGroup.visible = true;
        wg.cityBuildingsGroup.visible = true;
        gantry.visible = false;
      }
    }
    if (kind === "bus_lane" && /騎單車/.test(p)) {
      wg.cyclistGroup.visible = true;
      wg.cyclistGroup.position.set(-1.72, 0, -3.5);
    }
    if (
      kind === "traffic_red_amber" ||
      kind === "traffic_green_arrow" ||
      kind === "traffic_wigwag" ||
      kind === "traffic_light_general" ||
      kind === "pedestrian_zebra" ||
      kind === "yellow_box_rail" ||
      (kind === "parking_curb" && !wg.threeLaneGroup.visible) ||
      kind === "bus_lane"
    ) {
      wg.cityBuildingsGroup.visible = true;
    }

    // Hide expressway overhead gantry on city crossings, intersections & slope parking for HK realism!
    if (
      kind === "pedestrian_zebra" ||
      kind === "traffic_red_amber" ||
      kind === "traffic_green_arrow" ||
      kind === "traffic_wigwag" ||
      kind === "traffic_light_general" ||
      kind === "yellow_box_rail" ||
      (kind === "parking_curb" && !wg.threeLaneGroup.visible) ||
      kind === "bus_lane" ||
      (kind === "slope_hill" && state.scenarioStopped)
    ) {
      gantry.visible = false;
    }
    if ((kind === "slope_hill" && state.scenarioStopped) || wg.crossroadGroup.visible || wg.narrowRoadGroup.visible) {
      for (const prop of roadsideProps) prop.visible = false;
    }

    // Smartly show authentic HK sidewalks & galvanized guardrails ONLY where they fit real HK road geometry (zero clipping!)
    const hideLeftPavement =
      !leftCurb.visible ||
      wg.crossroadGroup.visible ||
      wg.narrowRoadGroup.visible ||
      wg.sideRoadGroup.visible ||
      roundaboutGroup.visible ||
      wg.slipRoadGroup.visible ||
      wg.cycleTrackMesh.visible ||
      tunnelGroup.visible;
    const hideRightPavement =
      !rightCurb.visible ||
      wg.crossroadGroup.visible ||
      wg.narrowRoadGroup.visible ||
      roundaboutGroup.visible ||
      wg.threeLaneGroup.visible ||
      tunnelGroup.visible;
    leftSidewalk.visible = !hideLeftPavement;
    rightSidewalk.visible = !hideRightPavement;
    // Keep guardrails off immediate pedestrian crossings, colored pole kerbs, slope close-up & expressways
    const isExpresswayLike = gantry.visible && !wg.cityBuildingsGroup.visible;
    hkRailLeftGroup.visible =
      !hideLeftPavement &&
      !zebraGroup.visible &&
      !trafficGroup.visible &&
      !wg.coloredPolesGroup.visible &&
      !wg.parkingBayGroup.visible &&
      !(kind === "slope_hill" && state.scenarioStopped) &&
      !isExpresswayLike;
    hkRailRightGroup.visible =
      !hideRightPavement &&
      !zebraGroup.visible &&
      !isExpresswayLike;
    // Keep distant HK skyline visible outdoors, hidden inside enclosed tunnels!
    if (wg.hkSkylineGroup) wg.hkSkylineGroup.visible = !tunnelGroup.visible;

    // Ground roadside signpost cleanly outside curb on pavement (right side if traffic light occupies left)
    // Stands cleanly IN FRONT of the outward streetlamps (x = -3.35) AND clear of curb-hugging cars!
    if (trafficGroup.visible && signPostGroup.visible) {
      signPostGroup.position.set(3.02, 0, state.scenarioStopped ? -4.4 : -7.2);
      signPostGroup.rotation.y = -0.14;
    } else if (signPostGroup.visible) {
      signPostGroup.position.set(-3.02, 0, state.scenarioStopped ? -4.4 : -6.8);
      signPostGroup.rotation.y = 0.14;
    }

    // Snap car pose, slope & speed cleanly on question switch so previous question never bleeds into new one!
    carRoot.position.x = state.targetX;
    carRoot.position.z = state.targetZ;
    carRoot.rotation.y = state.targetCarYaw;
    worldPivot.rotation.x = state.scenarioSlope;
    state.roadSpeed = state.scenarioStopped || state.gear === "P" ? 0 : state.gear === "R" ? -2.4 : state.scenarioSlow ? 2.6 : 4.6;

    // Anti-spoiler HUD label: on sign/meaning identification questions, keep the top text bar neutral
    // BEFORE answering (while keeping the full real-world 3D road geometry visible!), then reveal the
    // specific HK scenario label right AFTER answering to reinforce learning!
    state.scenarioRevealLabel = state.scenarioLabel;
    const asksMeaning =
      /代表甚麼|表示甚麼|甚麼意思|有何意思|甚麼指令|甚麼限制|甚麼情況|甚麼設施|甚麼危險|有何分別|哪一條是|各自代表|正確手勢是怎樣/.test(p) &&
      (Boolean(s) || /反光路釘|危險標記|四種底色|行車時間顯示|東.*中.*西|黃色橫條|文字警告|手號/.test(p));
    if (asksMeaning) {
      state.scenarioLabel = s ? "3D 路況實境 · 觀察路面與標誌作答" : "3D 路況實境 · 觀察路面細節作答";
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
  const hudCamBtn = document.getElementById("btn-3d-cam");
  const hudReplayBtn = document.getElementById("btn-3d-replay");
  const hudStatus = document.getElementById("stage-3d-status");
  const hudSpeed = document.getElementById("stage-3d-speed");

  const CAM_LABELS = { chase: "視角：追尾", pov: "視角：司機位", top: "視角：俯視" };

  function updateHudUI() {
    hudGearBtns.forEach((b) => {
      const active = b.dataset.gear === state.gear;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (hudLaneBtn) {
      hudLaneBtn.textContent = state.lane === "left" ? "切右線超車" : "返回左線";
    }
    if (hudCamBtn) {
      hudCamBtn.hidden = state.mode !== "quiz";
      hudCamBtn.textContent = CAM_LABELS[state.cameraMode] || CAM_LABELS.chase;
    }
    if (hudReplayBtn) {
      const canReplay = state.mode === "quiz" && state.scenarioOutcome !== null && Boolean(state.activeQuestion);
      hudReplayBtn.hidden = !canReplay;
      hudReplayBtn.classList.toggle("is-highlight", state.scenarioOutcome === "wrong");
      hudReplayBtn.textContent = state.scenarioOutcome === "wrong" ? "重播正確做法 ▶" : "重播示範 ▶";
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

  function setCameraMode(mode) {
    if (!["chase", "pov", "top"].includes(mode)) return;
    state.cameraMode = mode;
    snapQuizCameraForScenario();
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  function cycleCameraMode() {
    const order = ["chase", "pov", "top"];
    const next = order[(order.indexOf(state.cameraMode) + 1) % order.length];
    setCameraMode(next);
  }

  function replayCorrectDemo() {
    const q = state.activeQuestion;
    if (state.mode !== "quiz" || !q) return;
    const savedReveal = state.scenarioRevealLabel || state.scenarioLabel;
    applyQuestionScenario(q);
    state.scenarioRevealLabel = savedReveal;
    state.scenarioLabel = `${savedReveal} · 重播示範中`;
    state.scenarioOutcome = "right";
    updateHudUI();
    if (prefersReducedMotion()) {
      applyAnsweredPosture(true, q, { silent: false, combo: state.combo });
      updateHudUI();
      renderSingleFrame();
      return;
    }
    state.replayTimeoutId = setTimeout(() => {
      state.replayTimeoutId = null;
      if (state.activeQuestion?.id !== q.id) return;
      applyAnsweredPosture(true, q, { silent: false, combo: state.combo });
      updateHudUI();
    }, 240);
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
  if (hudCamBtn) hudCamBtn.addEventListener("click", cycleCameraMode);
  if (hudReplayBtn) hudReplayBtn.addEventListener("click", replayCorrectDemo);

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

  // ==================== MOUNTING & CAMERA MODES (CHASE / DRIVER POV / BIRD'S-EYE TOP) ====================
  function snapQuizCameraForScenario() {
    if (state.mode !== "quiz") return;
    if (state.cameraMode === "pov") {
      // HK Right-Hand-Drive Driver Windshield POV: clear view over blue bonnet down the road ahead!
      camera.position.set(carRoot.position.x + 0.18, 1.04, carRoot.position.z - 0.36);
      controls.target.set(carRoot.position.x + 0.06, 0.72, carRoot.position.z - 12.0);
    } else if (state.cameraMode === "top") {
      // Bird's-Eye Overview: crystal-clear view of roundabouts, yellow boxes, road markings & lane positioning!
      camera.position.set(0, 7.6, 3.2);
      controls.target.set(0, 0.0, -4.5);
    } else if ((state.scenario === "slope_hill" && state.scenarioStopped) || /輪胎胎紋|胎紋/.test(state.activeQuestion?.prompt || "")) {
      // Low side-kerb close-up angled along front-left wheel & kerb so wheel turn right/left + slope tilt + tire are unmistakable!
      camera.position.set(-3.05, 1.12, 1.55);
      controls.target.set(-1.35, 0.34, -0.55);
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
    // Reveal the full educational HK scenario label once answered!
    if (state.scenarioRevealLabel) state.scenarioLabel = state.scenarioRevealLabel;

    if (isRight) {
      if (!silent) {
        state.hopPhase = 1.0;
        state.flashTimer = 0.4;
        emitSparks(wasPreviouslyWrong ? 24 : combo >= 3 ? 22 : 14, combo >= 3 ? 0xfacc15 : 0x10b981);
      }

      // Scenario-specific RIGHT driving demonstration (100% faithful to HK Road Users' Code!)
      if (kind === "traffic_green_arrow") {
        if (/並不打算/.test(p)) {
          // Stay cleanly in straight lane, NOT entering left-arrow lane!
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：不轉向 · 切勿阻擋箭嘴線";
        } else if (/右轉袋口位|右轉箭嘴熄滅/.test(p)) {
          state.scenarioStopped = false;
          state.brakeTimer = 0;
          state.targetCarYaw = -0.24;
          state.targetX = 1.45;
          if (!silent) state.boostTimer = 0.9;
          state.scenarioLabel = "實境：安全空隙完成右轉";
        } else {
          state.scenarioStopped = false;
          state.scenarioSlow = true;
          state.brakeTimer = 0;
          state.targetCarYaw = 0.16;
          state.targetX = -1.35;
          state.scenarioLabel = "實境：跟左轉綠箭嘴安全左轉";
        }
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
        state.scenarioLabel = /綠燈剛亮起|長者/.test(p)
          ? "實境：綠燈仍須讓行人先過"
          : wg.greenManGroup.visible
            ? "實境：綠色人像過路處 · 禮讓行人"
            : "實境：斑馬線讓行人先過";
      } else if (kind === "yellow_box_rail") {
        if (ybMesh.visible) {
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：出口受阻 · 留守黃格外";
        } else if (wg.yellowStopLineMesh.visible) {
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：電車站黃色停車線 · 停車讓客";
        } else {
          state.scenarioStopped = false;
          state.scenarioSlow = true;
          state.brakeTimer = 0;
          state.scenarioLabel = "實境：安全讓行香港電車／輕鐵";
        }
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
        const goRight = /轉右|掉頭/.test(p) && !/騎單車|單車/.test(p);
        state.scenarioStopped = false;
        state.brakeTimer = 0;
        state.lane = goRight ? "right" : "left";
        state.targetX = goRight ? RIGHT_LANE_X : LEFT_LANE_X;
        state.blinkerDir = goRight ? 1 : -1;
        state.blinkerTimer = 2.4;
        if (!silent) state.boostTimer = 1.0;
        state.scenarioLabel = goRight ? "實境：迴旋處轉右 · 選用右線" : "實境：迴旋處靠左線進入";
      } else if (kind === "tunnel_overhead") {
        if (state.scenarioStopped) {
          // Breakdown inside tunnel: stay parked with hazards ON!
          state.hazardTimer = 16;
          state.brakeTimer = 99;
        } else if (/尚未能安全換線/.test(p)) {
          // q254: stop in current lane before obstruction/red light
          state.scenarioStopped = true;
          state.brakeTimer = 99;
          state.scenarioLabel = "實境：未能安全切線 · 原線停車等候";
        } else if (state.lane === "right") {
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
          state.boostTimer = 0.7;
        }
      } else if (kind === "road_markings_white" && doubleWhiteGroup.visible) {
        if (dwLeftBroken.visible && !/停車/.test(p)) {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 1.6;
          if (!silent) state.boostTimer = 1.0;
        } else if (!silent) {
          state.boostTimer = 0.6;
        }
      } else if (kind === "roadside_sign_3d" && (s === "stop_oct" || s === "police_stop")) {
        stopLineMesh.position.set(0, 0.012, -1.95);
        stopLineMesh.visible = true;
        signPostGroup.position.set(-3.02, 0, -4.0);
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = s === "police_stop" ? "實境：警方路障 · 標誌前停車" : "實境：停車標誌 · 停車線前全停";
      } else if (kind === "roadside_sign_3d" && s === "give_way") {
        state.scenarioSlow = true;
        state.brakeTimer = 2.2;
        state.scenarioLabel = "實境：讓路標誌 · 減速準備讓路";
      } else if (kind === "roadside_sign_3d" && s === "passing_place") {
        state.targetX = -1.85;
        state.blinkerDir = -1;
        state.blinkerTimer = 2.0;
        state.scenarioStopped = true;
        state.brakeTimer = 99;
        state.scenarioLabel = "實境：駛入左邊讓車處暫停禮讓";
      } else if (kind === "roadside_sign_3d" && s === "turn_left_ahead") {
        state.blinkerDir = -1;
        state.blinkerTimer = 2.0;
        state.targetCarYaw = 0.2;
        state.targetX = -1.35;
        state.scenarioSlow = true;
        state.scenarioLabel = "實境：依指示前面路口左轉";
      } else if (wg.policeBlockGroup.visible || wg.deadEndGroup.visible || wg.bollardGateGroup.visible || wg.parkingBayGroup.visible) {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
      } else if (kind === "highway_overtake") {
        if (state.scenarioAbortOvertake) {
          // q135: Lead car accelerated -> indicate left, slow gently, return cleanly behind lead car in left lane!
          state.lane = "left";
          state.targetX = LEFT_LANE_X;
          state.blinkerDir = -1;
          state.blinkerTimer = 2.0;
          state.brakeTimer = 1.0;
          state.scenarioNpcTargetZ = -5.6;
        } else if (state.scenarioPassLeft) {
          // q19: Lead car signalling right -> pass smoothly on the LEFT!
          state.lane = "left";
          state.targetX = LEFT_LANE_X;
          if (!silent) state.boostTimer = 0.9;
        } else if (/港珠澳/.test(p)) {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
        } else if (state.scenarioCanOvertake) {
          state.lane = "right";
          state.targetX = RIGHT_LANE_X;
          state.blinkerDir = 1;
          state.blinkerTimer = 1.8;
          if (!silent) state.boostTimer = 1.25;
        } else {
          // Hold safely in left lane (no illegal overtaking on no-overtake / P-plate / following-distance questions!)
          state.lane = "left";
          state.targetX = LEFT_LANE_X;
          if (!silent) state.boostTimer = 0.35;
        }
      } else if (kind === "roadworks") {
        state.lane = "left";
        state.targetX = LEFT_LANE_X;
        state.blinkerDir = -1;
        state.blinkerTimer = 1.4;
        if (!silent) state.boostTimer = 0.85;
      } else if (kind === "emergency_hazard" && emergencyGroup.visible) {
        state.targetX = -1.48;
        state.blinkerDir = -1;
        state.blinkerTimer = 1.8;
        state.scenarioLabel = "實境：靠左讓路予緊急車輛";
      } else if (kind === "emergency_hazard" || (kind === "weather_night_rain" && state.scenarioStopped) || (kind === "maneuver_signal" && state.scenarioStopped)) {
        state.scenarioStopped = true;
        state.brakeTimer = 99;
      } else if (kind === "traffic_light_general" && state.scenarioStopped) {
        state.brakeTimer = 99;
      } else if (kind === "cockpit_safety" && state.gear === "P") {
        state.scenarioStopped = true;
      } else if (kind === "maneuver_signal" && state.gear === "R") {
        // Keep reversing cleanly in R!
        state.scenarioStopped = false;
      } else {
        state.gear = "D";
        state.scenarioStopped = false;
        state.brakeTimer = 0;
        if (!silent) state.boostTimer = wasPreviouslyWrong ? 1.2 : combo >= 3 ? 1.0 : 0.75;
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
    supportsQuestion(q) {
      return !!(q && !HIDE_3D_IDS.has(q.id));
    },
    setCameraMode,
    replayCorrectDemo,
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
    },
    _debugState() {
      const proj = (v) => {
        const p = v.clone().project(camera);
        return { x: Number(p.x.toFixed(3)), y: Number(p.y.toFixed(3)), z: Number(p.z.toFixed(3)) };
      };
      return {
        id: state.activeQuestionId,
        scenario: state.scenario,
        label: state.scenarioLabel,
        gear: state.gear,
        lane: state.lane,
        stopped: state.scenarioStopped,
        slope: state.scenarioSlope,
        parkedWheel: state.scenarioParkedWheel,
        canOvertake: state.scenarioCanOvertake,
        weather: state.scenarioWeather,
        signPostVisible: signPostGroup.visible,
        trafficVisible: trafficGroup.visible,
        tunnelVisible: tunnelGroup.visible,
        zebraVisible: zebraGroup.visible,
        roundaboutVisible: roundaboutGroup.visible,
        warningTriangleVisible: warningTriangleGroup.visible,
        carScreen: proj(new THREE.Vector3(carRoot.position.x, 0.45, carRoot.position.z)),
        signScreen: signPostGroup.visible ? proj(new THREE.Vector3(signPostGroup.position.x, 1.65, signPostGroup.position.z)) : null
      };
    }
  };

  // ==================== ANIMATION LOOP (THREE.Timer — r186) ====================
  const timer = new THREE.Timer();
  timer.connect(document);

  function updateThemeAndWeather(dt) {
    const isRain = state.mode === "quiz" && state.scenarioWeather === "rain";
    const isNightWeather = state.mode === "quiz" && state.scenarioWeather === "night";
    const isFog = state.mode === "quiz" && state.scenarioWeather === "fog";
    const forceNight = isNightWeather || isRain;
    const dark = state.isDark || forceNight;

    const horizonHex = isFog
      ? (state.isDark ? 0x1e293b : 0xdce4ed)
      : isRain
        ? 0x263547
        : dark
          ? 0x132036
          : 0xdbeeff;
    const topHex = isFog
      ? (state.isDark ? 0x131d2d : 0x9cb1c4)
      : isRain
        ? 0x101827
        : dark
          ? 0x050914
          : 0x4f9ae3;
    const groundHex = dark ? 0x0b1521 : 0x89a89a;

    targetBgColor.setHex(horizonHex);
    targetSkyTop.setHex(topHex);
    targetSkyGround.setHex(groundHex);
    const lerpSpeed = dt > 0 ? Math.min(1, dt * 6.5) : 1;
    bgColor.lerp(targetBgColor, lerpSpeed);
    fog.color.copy(bgColor);
    skyUniforms.uHorizonColor.value.copy(bgColor);
    skyUniforms.uTopColor.value.lerp(targetSkyTop, lerpSpeed);
    skyUniforms.uGroundColor.value.lerp(targetSkyGround, lerpSpeed);
    skyUniforms.uSunIntensity.value = THREE.MathUtils.damp(skyUniforms.uSunIntensity.value, !dark && !isFog && !isRain ? 1.0 : 0.0, 5, dt || 0.16);
    skyUniforms.uStarIntensity.value = THREE.MathUtils.damp(skyUniforms.uStarIntensity.value, dark && !isFog && !isRain ? 0.9 : 0.0, 5, dt || 0.16);

    fog.near = THREE.MathUtils.damp(fog.near, isFog ? 5.5 : dark ? 12 : 16, 5, dt || 0.16);
    fog.far = THREE.MathUtils.damp(fog.far, isFog ? 16 : dark ? 31 : 38, 5, dt || 0.16);

    sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, dark ? 0.95 : isFog ? 1.55 : 2.6, 6, dt || 0.16);
    hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, dark ? 0.56 : 0.95, 6, dt || 0.16);
    scene.environmentIntensity = THREE.MathUtils.damp(scene.environmentIntensity, isRain ? 0.88 : dark ? 0.45 : 0.78, 6, dt || 0.16);

    // Dynamic Wet Asphalt PBR response: glossy specular tarmac when raining or flooded!
    const isWet = isRain || wg.floodWaterMesh.visible || wg.slipperyPatchGroup.visible;
    roadMat.roughness = THREE.MathUtils.damp(roadMat.roughness, isWet ? 0.22 : 0.92, 5, dt || 0.16);
    roadMat.metalness = THREE.MathUtils.damp(roadMat.metalness, isWet ? 0.26 : 0.05, 5, dt || 0.16);

    targetVergeColor.setHex(dark ? 0x456b58 : 0xffffff);
    vergeMat.color.lerp(targetVergeColor, lerpSpeed);
    lampHeadMat.emissiveIntensity = THREE.MathUtils.damp(lampHeadMat.emissiveIntensity, dark ? 2.5 : 0.2, 6, dt || 0.16);
    const lampHaloOp = dark ? 0.72 : 0.0;
    for (const sh of streetLampHalos) sh.material.opacity = THREE.MathUtils.damp(sh.material.opacity, lampHaloOp, 6, dt || 0.16);
    gantryBoardMat.emissiveIntensity = THREE.MathUtils.damp(gantryBoardMat.emissiveIntensity, dark ? 0.52 : 0.16, 6, dt || 0.16);

    const studGlow = dark ? 1.7 : 0.2;
    studRedMat.emissiveIntensity = studGlow;
    studWhiteMat.emissiveIntensity = studGlow;
    studAmberMat.emissiveIntensity = studGlow;

    const targetBeamOpacity = state.flashTimer > 0 ? 0.36 : (dark || isFog) ? 0.22 : 0.0;
    beamMat.opacity = THREE.MathUtils.damp(beamMat.opacity, targetBeamOpacity, 10, dt || 0.16);
    headGroundPoolMat.opacity = THREE.MathUtils.damp(headGroundPoolMat.opacity, state.flashTimer > 0 ? 0.52 : (dark || isFog) ? 0.32 : 0.0, 10, dt || 0.16);
    headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : (dark || isFog) ? 2.2 : 0.65;
    const headHaloOp = state.flashTimer > 0 ? 0.85 : (dark || isFog) ? 0.55 : 0.12;
    for (const hh of headHalos) hh.material.opacity = headHaloOp;
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
      const quizBase = state.scenarioSlow ? 2.6 : 4.6 + Math.min(state.combo, 6) * 0.45;
      const base = state.mode === "quiz" ? quizBase : 5.4 + state.readiness * 0.02;
      desiredSpeed = Math.max(0.4, base + (state.boostTimer > 0 ? 4.2 : 0) - (state.brakeTimer > 0 ? 3.5 : 0));
    } else if (state.gear === "R") {
      desiredSpeed = -2.4;
    } else if (state.gear === "N") {
      desiredSpeed = 0.6;
    }

    state.roadSpeed = THREE.MathUtils.damp(state.roadSpeed, desiredSpeed, 4.8, dt);
    state.roadOffset = (state.roadOffset + state.roadSpeed * dt) % 10000;

    // 1:1 Ground-locked scrolling for procedural PBR asphalt, HK sidewalk tiles & kerb blocks!
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

    // Update scrolling instanced road dashes, HK cat's-eyes & HK galvanized pedestrian guardrail posts
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

    if (hkRailLeftGroup.visible || hkRailRightGroup.visible) {
      const totalRailSpan = RAIL_COUNT * RAIL_STEP;
      const rMod = ((state.roadOffset % RAIL_STEP) + RAIL_STEP) % RAIL_STEP;
      for (let i = 0; i < RAIL_COUNT; i++) {
        const rz = -totalRailSpan * 0.72 + i * RAIL_STEP + rMod;
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
    }

    // Scroll roadside props & gantry (1:1 synced with ground roadSpeed — nothing hovers glued to the car!)
    for (const prop of roadsideProps) {
      let z = prop.position.z + state.roadSpeed * dt;
      if (z > 8) z -= PROP_SPAN;
      else if (z < -PROP_SPAN + 8) z += PROP_SPAN;
      prop.position.z = z;
    }

    {
      let gz = gantry.position.z + state.roadSpeed * dt;
      const gantryWrapFront = state.mode === "quiz" ? -2.2 : 7.5;
      const gantryResetBack = state.scenario === "tunnel_overhead" ? -18.5 : -24;
      if (gz > gantryWrapFront) gz = gantryResetBack;
      else if (gz < gantryResetBack - 1) gz = gantryWrapFront - 0.5;
      gantry.position.z = gz;
    }

    // Ground-locked 1:1 scrolling with tight wrap bounds so props pass beside car cleanly without filling lens!
    if (Math.abs(state.roadSpeed) > 0.05) {
      if (signPostGroup.visible) {
        let sz = signPostGroup.position.z + state.roadSpeed * dt;
        if (sz > 2.2) sz = -15.5;
        else if (sz < -16.5) sz = 1.6;
        signPostGroup.position.z = sz;
      }
      if (trafficGroup.visible) {
        let tz = trafficGroup.position.z + state.roadSpeed * dt;
        if (tz > 2.6) tz = -15.5;
        else if (tz < -16.5) tz = 2.0;
        trafficGroup.position.z = tz;
        if (stopLineMesh.visible) stopLineMesh.position.z = -1.95 + tz;
      }
      if (roadworksGroup.visible) {
        let rz = roadworksGroup.position.z + state.roadSpeed * dt;
        if (rz > 4.5) rz = -14.0;
        else if (rz < -15.0) rz = 3.8;
        roadworksGroup.position.z = rz;
      }
      if (roundaboutGroup.visible) {
        let rbz = roundaboutGroup.position.z + state.roadSpeed * dt;
        if (rbz > 5.5) rbz = -13.5;
        roundaboutGroup.position.z = rbz;
      }
    }
    if (doubleWhiteGroup.visible && dwLeftBroken.visible) {
      dwLeftBroken.position.z = ((state.roadOffset % 2.1) + 2.1) % 2.1;
    }

    // Animate modular real-world HK 3D road actors & dynamic scrolling structures
    const isDarkNow = state.isDark || state.scenarioWeather === "night" || state.scenarioWeather === "rain";
    hkWorld.animate(dt, elapsed, {
      roadSpeed: state.roadSpeed,
      roadOffset: state.roadOffset,
      greenManFlash: state.scenarioGreenManFlash,
      isNight: isDarkNow
    });

    // Traffic-light lens glow halos track active lenses cleanly!
    if (trafficGroup.visible) {
      tlHaloRed.material.opacity = tlRed.visible && tlRedMat.emissiveIntensity > 1.0 ? 0.78 : 0.0;
      tlHaloAmber.material.opacity = tlAmber.visible && tlAmberMat.emissiveIntensity > 1.0 ? 0.78 : 0.0;
      tlHaloGreen.material.opacity = tlGreen.visible && tlGreenMat.emissiveIntensity > 1.0 ? 0.78 : 0.0;
    }

    // Animate scenario-specific dynamic props
    if (state.scenarioAmberGantry) {
      const pulse = Math.floor(elapsed * 2.5) % 2 === 0 ? 1.5 : 0.15;
      laneSignalLeftMat.emissiveIntensity = pulse;
      laneSignalRightMat.emissiveIntensity = pulse;
    } else {
      laneSignalLeftMat.emissiveIntensity = 0.85;
      laneSignalRightMat.emissiveIntensity = 0.85;
    }
    if (wigwagBox.visible) {
      const alt = Math.floor(elapsed * 2.4) % 2 === 0;
      wwLeftMat.emissiveIntensity = alt ? 2.8 : 0.08;
      wwRightMat.emissiveIntensity = alt ? 0.08 : 2.8;
      wwHaloL.material.opacity = alt ? 0.85 : 0.0;
      wwHaloR.material.opacity = alt ? 0.0 : 0.85;
    }
    if (zebraGroup.visible) {
      const bWave = Math.sin(elapsed * 5.2) * 0.5 + 0.5;
      beaconGlowMat.emissiveIntensity = 0.7 + bWave * 1.6;
      for (const bh of beaconHalos) bh.material.opacity = 0.25 + bWave * 0.62;
      const pedRate = state.scenarioPedSlow ? 0.45 : 0.9;
      pedGroup.position.x = Math.sin(elapsed * pedRate) * 1.5;
      pedGroup.position.y = Math.abs(Math.sin(elapsed * pedRate * 7.0)) * 0.04;
    }
    if (roadworksGroup.visible) {
      const diag = Math.floor(elapsed * 2.2) % 2 === 0;
      rwLampMatA.emissiveIntensity = diag ? 2.6 : 0.15;
      rwLampMatB.emissiveIntensity = diag ? 0.15 : 2.6;
    }
    if (emergencyGroup.visible) {
      // HK Ambulance overtakes FORWARD (-Z) in the right lane (never drives backwards!)
      const alt = Math.floor(elapsed * 6.5) % 2 === 0;
      ambRedMat.emissiveIntensity = alt ? 3.2 : 0.2;
      ambBlueMat.emissiveIntensity = alt ? 0.2 : 3.2;
      ambHaloL.material.opacity = alt ? 0.88 : 0.08;
      ambHaloR.material.opacity = alt ? 0.08 : 0.88;
      ambGroup.position.z -= dt * 3.8;
      if (ambGroup.position.z < -15.5) ambGroup.position.z = 2.6;
    }
    if (busGroup.visible) {
      if (state.scenarioContraflowBus) {
        // q30: Contraflow HK double-decker bus approaches TOWARD you (+Z) in opposite left lane!
        const rel = Math.max(4.5, Math.abs(state.roadSpeed) + 3.5);
        busGroup.position.z += rel * dt;
        if (busGroup.position.z > 4.6) busGroup.position.z = -16.5;
      } else {
        busGroup.position.z = -5.6 + Math.sin(elapsed * 0.7) * 0.65;
      }
    }
    if (npcCarGroup.visible) {
      const overtakingNow =
        (state.scenarioOutcome === "right" && state.scenarioCanOvertake && state.lane === "right") ||
        (state.scenarioOutcome === "right" && state.scenarioPassLeft);
      npcCarGroup.position.z = overtakingNow
        ? THREE.MathUtils.damp(npcCarGroup.position.z, 2.2, 1.4, dt)
        : THREE.MathUtils.damp(npcCarGroup.position.z, state.scenarioNpcTargetZ + Math.sin(elapsed * 1.0) * 0.25, 3.0, dt);

      if (state.scenarioNpcRightBlink) {
        npcRightBlinkerMat.emissiveIntensity = Math.floor(elapsed * 5.5) % 2 === 0 ? 3.0 : 0.08;
      } else {
        npcRightBlinkerMat.emissiveIntensity = 0.08;
      }
      if (driverArmPivot.visible) {
        if (state.scenarioArmSignal === "left_circle") {
          driverArmPivot.rotation.z = Math.sin(elapsed * 4.8) * 0.45;
          driverArmPivot.rotation.y = Math.cos(elapsed * 4.8) * 0.35;
        } else if (state.scenarioArmSignal === "slow_wave") {
          driverArmPivot.rotation.z = Math.sin(elapsed * 5.2) * 0.46;
          driverArmPivot.rotation.y = 0;
        } else {
          driverArmPivot.rotation.z = 0;
          driverArmPivot.rotation.y = 0;
        }
      }
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
    let steerAngle = THREE.MathUtils.clamp(-latVel * 0.18, -0.36, 0.36);
    if (state.scenarioParkedWheel === "right") steerAngle = -0.62;
    else if (state.scenarioParkedWheel === "left") steerAngle = 0.62;

    for (const fp of frontWheelPivots) {
      fp.rotation.y = THREE.MathUtils.damp(fp.rotation.y, steerAngle, 10, dt);
    }

    // Slope parking directional steering indicator arrow on ground beside front-left wheel!
    if (state.scenarioParkedWheel) {
      slopeSteerArrow.visible = true;
      slopeSteerArrow.rotation.z = state.scenarioParkedWheel === "right" ? -0.68 : 0.68;
      slopeSteerArrow.material.opacity = 0.62 + Math.sin(elapsed * 5.0) * 0.28;
    } else {
      slopeSteerArrow.visible = false;
    }

    const wheelDelta = (state.roadSpeed * dt) / wheelRadius;
    for (const ws of wheelSpinners) ws.rotation.x -= wheelDelta;

    // Rain tire spray droplets kicking up behind both rear tires when moving in rain!
    const showSpray = rainInst.visible && Math.abs(state.roadSpeed) > 0.6;
    sprayInst.visible = showSpray;
    if (showSpray) {
      for (let i = 0; i < SPRAY_COUNT; i++) {
        const sp = sprayDrops[i];
        sp.t = (sp.t + dt * 2.1) % 1;
        const px = carRoot.position.x + sp.side + Math.sin(i * 4.7) * 0.14 * sp.t;
        const py = 0.06 + Math.sin(sp.t * Math.PI) * 0.38;
        const pz = carRoot.position.z + 0.78 + sp.t * 1.45;
        dummy.position.set(px, py, pz);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar((1 - sp.t) * 1.15);
        dummy.updateMatrix();
        sprayInst.setMatrixAt(i, dummy.matrix);
      }
      sprayInst.instanceMatrix.needsUpdate = true;
    }

    const hopY = Math.sin(state.hopPhase * Math.PI) * 0.15;
    const engineVib = Math.sin(elapsed * (state.roadSpeed !== 0 ? 18 : 11)) * (state.gear === "P" ? 0.003 : 0.008);
    carBodyGroup.position.y = hopY + engineVib;
    carBodyGroup.rotation.z = THREE.MathUtils.damp(carBodyGroup.rotation.z, -latVel * 0.072, 7.5, dt);
    const targetPitch = state.brakeTimer > 0 && Math.abs(state.roadSpeed) > 0.3 ? -0.068 : state.boostTimer > 0 ? 0.052 : 0;
    carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, targetPitch, 8.5, dt);

    // Brake, reverse, blinker lamps + glowing red brake halos & asphalt reflection pool!
    const demoBrakePulse = state.scenarioBrakeDemo && Math.floor(elapsed * 1.4) % 2 === 0;
    const braking = state.brakeTimer > 0 || state.gear === "P" || state.scenarioStopped || demoBrakePulse;
    brakeLightMat.emissiveIntensity = braking ? 3.0 : isDarkNow ? 0.95 : 0.3;
    const targetBrakeHalo = braking ? 0.78 : isDarkNow ? 0.28 : 0.08;
    for (const bh of brakeHalos) bh.material.opacity = targetBrakeHalo;
    brakeGroundPoolMat.opacity = THREE.MathUtils.damp(
      brakeGroundPoolMat.opacity,
      braking ? (isDarkNow ? 0.55 : 0.3) : isDarkNow ? 0.16 : 0.0,
      9,
      dt || 0.16
    );
    reverseLightMat.emissiveIntensity = state.gear === "R" ? 2.4 : 0.0;

    const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
    const leftBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir < 0)) && blinkOn;
    const rightBlink = (state.hazardTimer > 0 || (state.blinkerTimer > 0 && state.blinkerDir > 0)) && blinkOn;
    blinkerLeftMat.emissiveIntensity = leftBlink ? 2.8 : 0.08;
    blinkerRightMat.emissiveIntensity = rightBlink ? 2.8 : 0.08;

    // Live POV cockpit camera follows smooth lane changes & overtakes!
    if (state.mode === "quiz" && state.cameraMode === "pov") {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, carRoot.position.x + 0.18, 8, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.04 + hopY * 0.4, 8, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, carRoot.position.z - 0.36, 8, dt);
      controls.target.x = THREE.MathUtils.damp(controls.target.x, carRoot.position.x + 0.06, 8, dt);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, 0.72, 8, dt);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, carRoot.position.z - 12.0, 8, dt);
    }

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
