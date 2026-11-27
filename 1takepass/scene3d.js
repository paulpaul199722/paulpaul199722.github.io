// 1TakePass — AAA Miniature Hong Kong 3D Showcase & Emotional-Value Progress Diorama
// Built with Three.js r186 applying threejs-aaa-graphics-builder, shader-cookbook & game-feel skills:
// - Home: Interactive HK 1A P-plate private car expressway showcase (P/R/N/D, lane change, horn, orbit).
// - Quiz: Serene-at-rest Miniature Hong Kong Coastal Diorama Emotional Progress Bar:
//   * Evolving Morning -> Golden-Hour Sunset sky backdrop as progress advances (0% -> 100%)
//   * Iconic HK mini skyline (BoC Tower geometric prism, IFC spire, Lion Rock hills, fluffy clouds, trees)
//   * Custom GLSL animated shimmer progress ribbon + Fresnel rim lighting on hero car
//   * True damped spring physics + volume-preserving squash-and-stretch + exhaust puffs + 3D confetti
//   * Floating 3D Emotion Pop-up sticker above car (+1, Streak, Redeemed, 16/20 Pass, Comfort)
//   * Auto-sleeps COMPLETELY STILL at rest while reading (zero distraction, zero battery drain!)
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

  // ==================== DETERMINISTIC EASING & SEEDED NOISE (game-feel.md) ====================
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutBack = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  let rngSeed = 199722;
  const seededRand = () => {
    rngSeed = (rngSeed * 16807) % 2147483647;
    return (rngSeed - 1) / 2147483646;
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

  const isMobileScreen = () => window.innerWidth <= 640;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileScreen() ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = "stage-3d-canvas";
  renderer.domElement.setAttribute("aria-label", "1TakePass 互動 3D 香港 P 牌私家車與情緒進度條");
  viewport.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const bgColor = new THREE.Color(isDarkTheme() ? 0x0f1724 : 0xdbeeff);
  scene.background = bgColor;
  const fog = new THREE.Fog(bgColor.getHex(), 16, 40);
  scene.fog = fog;

  // ==================== PROCEDURAL GLSL GRADIENT SKY DOME (shader-cookbook.md) ====================
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(isDarkTheme() ? 0x050914 : 0x4f9ae3) },
    uHorizonColor: { value: new THREE.Color(isDarkTheme() ? 0x132036 : 0xdbeeff) },
    uGroundColor: { value: new THREE.Color(isDarkTheme() ? 0x0b1521 : 0x89a89a) },
    uSunColor: { value: new THREE.Color(0xfff2cc) },
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
        uniform vec3 uSunColor;
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
            ? mix(uHorizonColor, uTopColor, pow(clamp(h, 0.0, 1.0), 0.56))
            : mix(uHorizonColor, uGroundColor, clamp(-h * 3.2, 0.0, 1.0));
          if (uSunIntensity > 0.01 && h > -0.08) {
            float sunDot = max(dot(dir, uSunDir), 0.0);
            col += uSunColor * (pow(sunDot, 10.0) * 0.28 + pow(sunDot, 120.0) * 0.78) * uSunIntensity;
          }
          if (uStarIntensity > 0.01 && h > 0.06) {
            vec2 grid = floor(dir.xz / (dir.y + 0.16) * 44.0);
            float rnd = hash21(grid);
            if (rnd > 0.985) {
              col += vec3(0.88, 0.94, 1.0) * smoothstep(0.06, 0.3, h) * uStarIntensity * 0.78;
            }
          }
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    })
  );
  skyDome.frustumCulled = false;
  scene.add(skyDome);

  // Studio environment reflections via PMREM + RoomEnvironment (shader-cookbook.md)
  let envRT = null;
  function rebuildEnvironment() {
    if (envRT) {
      envRT.dispose();
      envRT = null;
    }
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    envRT = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    roomEnv.dispose();
    pmrem.dispose();
  }
  rebuildEnvironment();
  scene.environmentIntensity = isDarkTheme() ? 0.52 : 0.85;

  const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 95);
  camera.position.set(3.4, 2.25, 4.9);

  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.domElement.style.touchAction = "pan-y";
  controls.enableDamping = !prefersReducedMotion();
  controls.dampingFactor = 0.07;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.minAzimuthAngle = -Math.PI * 0.48;
  controls.maxAzimuthAngle = Math.PI * 0.48;
  controls.target.set(0, 0.55, -0.3);
  controls.update();

  let isSnappingCamera = false;
  controls.addEventListener("change", () => {
    if (!isSnappingCamera && !state.animRunning && !shell.hidden && state.mode) {
      renderer.render(scene, camera);
    }
  });

  // ==================== KEY + FILL + RIM LIGHTING RIG (authoring-recipes.md) ====================
  const hemiLight = new THREE.HemisphereLight(0xdaf0ff, 0x7e9485, 0.98);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.65);
  sunLight.position.set(6, 9, 6);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.left = -9.5;
  sunLight.shadow.camera.right = 9.5;
  sunLight.shadow.camera.top = 7;
  sunLight.shadow.camera.bottom = -7;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 30;
  sunLight.shadow.normalBias = 0.025;
  sunLight.shadow.bias = -0.0003;
  sunLight.shadow.intensity = 0.48;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x7cc4ff, 0.82);
  rimLight.position.set(-5, 4.5, -6);
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

  const checkeredBannerTex = makeCanvasTexture(256, 72, (ctx, w, h) => {
    const sq = 16;
    for (let y = 0; y < h; y += sq) {
      for (let x = 0; x < w; x += sq) {
        ctx.fillStyle = ((x / sq + y / sq) % 2 === 0) ? "#ffffff" : "#111827";
        ctx.fillRect(x, y, sq, sq);
      }
    }
    ctx.fillStyle = "#007a4d";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 58, 10, 116, 52, 12);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1✓ PASS", w / 2, h / 2 + 1);
  });

  const passBadgeTex = makeCanvasTexture(180, 64, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#fde047");
    g.addColorStop(1, "#f59e0b");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 14);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#111827";
    ctx.font = "900 28px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("16/20 及格", w / 2, h / 2 + 1);
  });

  const startFlagTex = makeCanvasTexture(128, 72, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#2563eb");
    g.addColorStop(1, "#0b67c7");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(3, 3, w - 6, h - 6, 12);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 30px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("起點", w / 2, h / 2 + 1);
  });

  const contactShadowTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    grad.addColorStop(0, "rgba(10, 16, 28, 0.56)");
    grad.addColorStop(0.55, "rgba(10, 16, 28, 0.24)");
    grad.addColorStop(1, "rgba(10, 16, 28, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  // Procedural PBR Asphalt, Sidewalk, Kerb, Grass & HK Skyline Window Maps
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

  // Bank of China Tower geometric diagonal facade texture + emissive LED outline mask for Victoria Harbour night!
  const bocFacadeTex = makeCanvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = "#b8c7d9";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    for (let y = 0; y < h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(w, y + 64);
      ctx.moveTo(w, y); ctx.lineTo(0, y + 64);
      ctx.moveTo(0, y); ctx.lineTo(w, y);
      ctx.stroke();
    }
  });
  const bocEmissiveTex = makeCanvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#e0f2fe";
    ctx.lineWidth = 5;
    for (let y = 0; y < h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(w, y + 64);
      ctx.moveTo(w, y); ctx.lineTo(0, y + 64);
      ctx.moveTo(0, y); ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeRect(2, 2, w - 4, h - 4);
  });

  // Reusable Floating 3D Emotion Pop-up Sticker Canvas (drawn on demand when user answers / taps car!)
  const popCanvas = document.createElement("canvas");
  popCanvas.width = 320;
  popCanvas.height = 96;
  const popCtx = popCanvas.getContext("2d");
  const popTex = new THREE.CanvasTexture(popCanvas);
  popTex.colorSpace = THREE.SRGBColorSpace;
  const popMat = new THREE.SpriteMaterial({
    map: popTex, transparent: true, opacity: 0.0, depthWrite: false, depthTest: false
  });
  const emotionPopSprite = new THREE.Sprite(popMat);
  emotionPopSprite.scale.set(2.45, 0.74, 1);
  emotionPopSprite.renderOrder = 20;
  emotionPopSprite.visible = false;
  scene.add(emotionPopSprite);

  function showEmotionPop(text, tone = "right") {
    const pal = {
      right:  { bg: "#059669", border: "#a7f3d0", fg: "#ffffff" },
      streak: { bg: "#d97706", border: "#fef08a", fg: "#ffffff" },
      passed: { bg: "#047857", border: "#fde047", fg: "#ffffff" },
      wrong:  { bg: "#334155", border: "#cbd5e1", fg: "#f8fafc" },
      honk:   { bg: "#0b67c7", border: "#bae6fd", fg: "#ffffff" }
    }[tone] || { bg: "#059669", border: "#a7f3d0", fg: "#ffffff" };

    const w = popCanvas.width;
    const h = popCanvas.height;
    popCtx.clearRect(0, 0, w, h);
    // Pill bubble + cute bottom speech pointer
    popCtx.fillStyle = pal.bg;
    popCtx.beginPath();
    popCtx.roundRect(12, 8, w - 24, h - 28, 30);
    popCtx.fill();
    popCtx.beginPath();
    popCtx.moveTo(w / 2 - 12, h - 22);
    popCtx.lineTo(w / 2, h - 6);
    popCtx.lineTo(w / 2 + 12, h - 22);
    popCtx.closePath();
    popCtx.fill();
    popCtx.strokeStyle = pal.border;
    popCtx.lineWidth = 4;
    popCtx.beginPath();
    popCtx.roundRect(12, 8, w - 24, h - 28, 30);
    popCtx.stroke();

    popCtx.fillStyle = pal.fg;
    popCtx.font = "900 32px 'Noto Sans TC', system-ui, -apple-system, sans-serif";
    popCtx.textAlign = "center";
    popCtx.textBaseline = "middle";
    popCtx.fillText(text, w / 2, (h - 14) / 2 + 2);
    popTex.needsUpdate = true;

    state.popTimer = 1.25;
    state.popDuration = 1.25;
    emotionPopSprite.visible = true;
  }

  // ==================== SHARED MATERIALS ====================
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x9aa5b4, roughness: 0.36, metalness: 0.65 });
  const hkRailMat = new THREE.MeshStandardMaterial({ color: 0xb0bac6, roughness: 0.38, metalness: 0.65 });
  const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x1f7a4f, roughness: 0.8 });
  const treeFoliageLightMat = new THREE.MeshStandardMaterial({ color: 0x34a86e, roughness: 0.76 });
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x70513b, roughness: 0.88 });

  // ==================== HOME SHOWCASE WORLD (HOME & SUMMARY ONLY) ====================
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
  const lampHeadMat = new THREE.MeshStandardMaterial({
    color: 0xfff3d1, emissive: 0xffd580, emissiveIntensity: 0.35, roughness: 0.25
  });
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

  function makeStylizedTree(scale = 1) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat); trunk.position.y = 0.36; trunk.castShadow = true;
    const cMain = new THREE.Mesh(treeCanopyA, treeFoliageMat); cMain.position.set(0, 1.06, 0); cMain.castShadow = true;
    const cSub1 = new THREE.Mesh(treeCanopyB, treeFoliageLightMat); cSub1.position.set(0.26, 1.3, 0.12);
    const cSub2 = new THREE.Mesh(treeCanopyB, treeFoliageMat); cSub2.position.set(-0.24, 0.96, -0.16);
    t.add(trunk, cMain, cSub1, cSub2);
    t.scale.setScalar(scale);
    return t;
  }

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

    const tree = makeStylizedTree(0.86 + (i % 3) * 0.15);
    const side = i % 2 === 0 ? -1 : 1;
    tree.position.set(side * (roadWidth / 2 + 2.15 + (i % 3) * 0.45), 0, -1.2);
    pair.add(tree);

    pair.position.z = zBase;
    homeWorldGroup.add(pair);
    roadsideProps.push(pair);
  }

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

  // ==================== AAA MINIATURE HONG KONG PROGRESS DIORAMA (QUIZ MODE!) ====================
  const TRACK_MIN_X = -6.0;
  const TRACK_MAX_X = 6.0;
  const TRACK_SPAN = TRACK_MAX_X - TRACK_MIN_X;

  const progressTrackGroup = new THREE.Group();
  progressTrackGroup.visible = false;
  scene.add(progressTrackGroup);

  // 1. Miniature Victoria Harbour Shimmering Water Plane (foreground/background coastal depth!)
  const harbourWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8, roughness: 0.16, metalness: 0.18, clearcoat: 0.9, clearcoatRoughness: 0.12
  });
  const harbourWater = new THREE.Mesh(new THREE.PlaneGeometry(46, 18), harbourWaterMat);
  harbourWater.rotation.x = -Math.PI / 2;
  harbourWater.position.set(0, -0.22, -1.5);
  harbourWater.receiveShadow = true;
  progressTrackGroup.add(harbourWater);

  // 2. Sculpted Chamfered Coastal Promenade Plinth (wood-warm stone embankment + emerald turf verge!)
  const promenadeBaseMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.72, metalness: 0.05 });
  const promenadeBase = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 3.4, 0.24, 2.85), promenadeBaseMat);
  promenadeBase.position.set(0, -0.14, -0.22);
  promenadeBase.receiveShadow = true;
  progressTrackGroup.add(promenadeBase);

  const turfStripMat = new THREE.MeshStandardMaterial({ color: 0x4ca773, roughness: 0.88 });
  const turfStrip = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 3.3, 0.06, 0.92), turfStripMat);
  turfStrip.position.set(0, -0.01, -1.12);
  turfStrip.receiveShadow = true;
  progressTrackGroup.add(turfStrip);

  // Sleek dark slate runway inlay for the P-plate car + metallic chrome edge trim
  const trackDeckMat = new THREE.MeshStandardMaterial({ color: 0x2a3444, roughness: 0.62, metalness: 0.12 });
  const trackDeck = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 2.4, 0.07, 1.38), trackDeckMat);
  trackDeck.position.set(0, -0.015, 0.04);
  trackDeck.receiveShadow = true;
  progressTrackGroup.add(trackDeck);

  const trackTrimMat = new THREE.MeshStandardMaterial({ color: 0xdbe4ee, roughness: 0.42, metalness: 0.35 });
  [-0.66, 0.74].forEach((rz) => {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(TRACK_SPAN + 2.44, 0.055, 0.06), trackTrimMat);
    trim.position.set(0, 0.025, rz);
    progressTrackGroup.add(trim);
  });

  // 3. Custom GLSL Shimmering Energy Progress Ribbon (shader-cookbook.md scrolling emissive recipe!)
  const ribbonUniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(0x059669) },
    uColorB: { value: new THREE.Color(0x34d399) },
    uPulseBoost: { value: 0.0 }
  };
  const progressFillMat = new THREE.ShaderMaterial({
    uniforms: ribbonUniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uPulseBoost;
      varying vec2 vUv;
      void main() {
        vec3 baseCol = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vUv.x));
        float chevron = fract(vUv.x * 9.0 - uTime * 2.2);
        float band = smoothstep(0.35, 0.5, chevron) * smoothstep(0.65, 0.5, chevron);
        float edgeGlow = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
        float tipShine = smoothstep(0.82, 1.0, vUv.x) * 0.45;
        vec3 col = baseCol * (0.85 + 0.3 * edgeGlow) + uColorB * (band * (0.35 + uPulseBoost * 0.5) + tipShine);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });
  const progressFillMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.62), progressFillMat);
  progressFillMesh.rotation.x = -Math.PI / 2;
  progressFillMesh.position.set(TRACK_MIN_X, 0.026, 0.04);
  progressTrackGroup.add(progressFillMesh);

  // Clean subtle guide groove ahead of the car
  const guideRailMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
  const guideRail = new THREE.Mesh(new THREE.PlaneGeometry(TRACK_SPAN, 0.2), guideRailMat);
  guideRail.rotation.x = -Math.PI / 2;
  guideRail.position.set(0, 0.022, 0.04);
  progressTrackGroup.add(guideRail);

  // 4. Layered Miniature Hong Kong Backdrop (Victoria Peak + BoC Tower + IFC Spire + Cozy Mini Trees + Clouds!)
  const miniSkylineGroup = new THREE.Group();
  const miniHillMat = new THREE.MeshStandardMaterial({ color: 0x4f8c6c, roughness: 0.92 });
  [
    { x: -6.8, r: 2.8, h: 1.7, z: -3.2 },
    { x: -3.6, r: 3.1, h: 2.0, z: -3.6 },
    { x: 0.4,  r: 3.3, h: 2.1, z: -3.7 },
    { x: 4.5,  r: 3.0, h: 1.8, z: -3.4 },
    { x: 7.5,  r: 2.5, h: 1.5, z: -3.1 }
  ].forEach((mh) => {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(mh.r, mh.h, 8), miniHillMat);
    cone.position.set(mh.x, mh.h * 0.32 - 0.22, mh.z);
    cone.scale.set(1.45, 1, 0.55);
    miniSkylineGroup.add(cone);
  });

  // Iconic HK Silhouette Landmarks behind the promenade (pure architectural charm — ZERO road clutter!)
  const miniTowerMat = new THREE.MeshStandardMaterial({
    color: 0xaab8c8, emissive: 0xfde68a, emissiveMap: skylineWinTex, emissiveIntensity: 0.15, roughness: 0.52, metalness: 0.22
  });
  const miniBocMat = new THREE.MeshStandardMaterial({
    map: bocFacadeTex, emissive: 0xbae6fd, emissiveMap: bocEmissiveTex, emissiveIntensity: 0.1, roughness: 0.32, metalness: 0.35
  });
  const miniTowers = [
    { x: -5.4, w: 0.65, h: 1.45, z: -2.45 },
    { x: -3.9, w: 0.58, h: 1.75, z: -2.55 },
    { x: -2.2, w: 0.72, h: 1.55, z: -2.45 },
    { x: -0.6, w: 0.62, h: 2.25, z: -2.6, boc: true }, // Stylized Bank of China Tower!
    { x: 1.05, w: 0.66, h: 2.45, z: -2.65, ifc: true }, // Stylized Two IFC Tower!
    { x: 2.45, w: 0.56, h: 1.5,  z: -2.48 },
    { x: 3.85, w: 0.64, h: 1.7,  z: -2.55 },
    { x: 5.55, w: 0.68, h: 1.4,  z: -2.45 }
  ];
  for (const mt of miniTowers) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(mt.w, mt.h, 0.55),
      mt.boc ? miniBocMat : miniTowerMat
    );
    mesh.position.set(mt.x, mt.h / 2 - 0.2, mt.z);
    miniSkylineGroup.add(mesh);
    if (mt.boc) {
      const spireA = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.52, 6), poleMat);
      spireA.position.set(mt.x - 0.12, mt.h + 0.05, mt.z);
      const spireB = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.42, 6), poleMat);
      spireB.position.set(mt.x + 0.12, mt.h, mt.z);
      miniSkylineGroup.add(spireA, spireB);
    } else if (mt.ifc) {
      const crown = new THREE.Mesh(new THREE.BoxGeometry(mt.w * 0.72, 0.24, 0.42), miniTowerMat);
      crown.position.set(mt.x, mt.h - 0.1, mt.z);
      miniSkylineGroup.add(crown);
    }
  }

  // Cozy miniature trees perched along the grassy back edge (soft scale cues!)
  [-6.9, -4.6, -1.6, 1.75, 4.45, 7.1].forEach((tx, idx) => {
    const mt = makeStylizedTree(0.42 + (idx % 2) * 0.09);
    mt.position.set(tx, -0.02, -1.25 - (idx % 2) * 0.16);
    miniSkylineGroup.add(mt);
  });

  // Soft stylized low-poly clouds floating gently in upper sky
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, transparent: true, opacity: 0.88 });
  const miniClouds = [];
  [
    { x: -4.4, y: 1.92, z: -3.2, s: 0.65 },
    { x: -0.2, y: 2.08, z: -3.5, s: 0.78 },
    { x: 4.1,  y: 1.88, z: -3.3, s: 0.62 }
  ].forEach((cl) => {
    const cg = new THREE.Group();
    const p1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), cloudMat);
    const p2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 1), cloudMat); p2.position.set(-0.34, -0.06, 0);
    const p3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 1), cloudMat); p3.position.set(0.34, -0.05, 0);
    cg.add(p1, p2, p3);
    cg.position.set(cl.x, cl.y, cl.z);
    cg.scale.set(cl.s * 1.35, cl.s * 0.7, cl.s * 0.7);
    miniSkylineGroup.add(cg);
    miniClouds.push(cg);
  });
  progressTrackGroup.add(miniSkylineGroup);

  // 5. Authored 3D Crystal Milestone Checkpoints (25% / 50% / 75% — pop & bounce when car passes!)
  const milestoneGems = [0.25, 0.5, 0.75].map((pct) => {
    const x = TRACK_MIN_X + TRACK_SPAN * pct;
    const g = new THREE.Group();
    g.position.set(x, 0.02, -0.68);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.08, 12), trackTrimMat);
    ped.position.y = 0.04;
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8, emissive: 0x10b981, emissiveIntensity: 0.0, roughness: 0.18, metalness: 0.25, clearcoat: 1.0
    });
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), gemMat);
    gem.position.y = 0.28;
    const halo = makeGlowHalo(0x34d399, 0.62, 0.0);
    halo.position.y = 0.28;
    g.add(ped, gem, halo);
    progressTrackGroup.add(g);
    return { pct, x, group: g, gem, mat: gemMat, halo, reached: false, popT: 0 };
  });

  // 6. Crisp Start Flag (起點), 16/20 Golden Pass Gate & Checkered 1✓ PASS Finish Arch!
  const startPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.048, 1.12, 8), poleMat);
  startPost.position.set(TRACK_MIN_X - 0.78, 0.56, -0.68);
  const startFlag = new THREE.Mesh(
    new THREE.BoxGeometry(0.84, 0.42, 0.06),
    new THREE.MeshStandardMaterial({ map: startFlagTex, roughness: 0.3 })
  );
  startFlag.position.set(TRACK_MIN_X - 0.78, 1.18, -0.66);
  progressTrackGroup.add(startPost, startFlag);

  const passArchGroup = new THREE.Group();
  const passArchMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.28, roughness: 0.26, metalness: 0.5
  });
  const passArchX = TRACK_MIN_X + TRACK_SPAN * 0.8;
  const passPost = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.24, 10), passArchMat);
  passPost.position.set(passArchX, 0.62, -0.68);
  const passBadge = new THREE.Mesh(
    new THREE.BoxGeometry(1.24, 0.42, 0.08),
    new THREE.MeshStandardMaterial({ map: passBadgeTex, emissive: 0xf59e0b, emissiveIntensity: 0.24, roughness: 0.28 })
  );
  passBadge.position.set(passArchX, 1.32, -0.66);
  const passLine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.036, 1.42), passArchMat);
  passLine.position.set(passArchX, 0.026, 0.04);
  const passHalo = makeGlowHalo(0xfacc15, 1.5, 0.0);
  passHalo.position.set(passArchX, 1.32, -0.5);
  passArchGroup.add(passPost, passBadge, passLine, passHalo);
  passArchGroup.visible = false;
  progressTrackGroup.add(passArchGroup);

  const finishArchGroup = new THREE.Group();
  const finishX = TRACK_MAX_X + 0.72;
  [-0.54, 0.54].forEach((dx) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.052, 1.26, 10), poleMat);
    p.position.set(finishX + dx, 0.63, -0.68);
    finishArchGroup.add(p);
  });
  const finishBanner = new THREE.Mesh(
    new THREE.BoxGeometry(1.56, 0.46, 0.09),
    new THREE.MeshStandardMaterial({ map: checkeredBannerTex, emissive: 0x059669, emissiveIntensity: 0.22, roughness: 0.3 })
  );
  finishBanner.position.set(finishX, 1.32, -0.66);
  const finishHalo = makeGlowHalo(0x10b981, 1.65, 0.16);
  finishHalo.position.set(finishX, 1.32, -0.5);
  finishArchGroup.add(finishBanner, finishHalo);
  progressTrackGroup.add(finishArchGroup);

  // ==================== HERO 3D HK 1A PRIVATE CAR (Sculpted + Fresnel Rim Shader!) ====================
  const carRoot = new THREE.Group();
  const carBodyGroup = new THREE.Group();
  carRoot.add(carBodyGroup);
  scene.add(carRoot);

  // Hero car paint with custom Fresnel Rim Glow injected via onBeforeCompile (shader-cookbook.md recipe a!)
  const paintRimUniforms = {
    uRimColor: { value: new THREE.Color(0x93c5fd) },
    uRimPower: { value: 2.8 },
    uRimStrength: { value: 0.42 }
  };
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b67c7, roughness: 0.18, metalness: 0.3, clearcoat: 1.0, clearcoatRoughness: 0.06
  });
  paintMat.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = paintRimUniforms.uRimColor;
    shader.uniforms.uRimPower = paintRimUniforms.uRimPower;
    shader.uniforms.uRimStrength = paintRimUniforms.uRimStrength;
    shader.fragmentShader =
      "uniform vec3 uRimColor;\nuniform float uRimPower;\nuniform float uRimStrength;\n" +
      shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         float hkFres = pow(1.0 - saturate(dot(normalize(vNormal), normalize(vViewPosition))), uRimPower);
         totalEmissiveRadiance += uRimColor * hkFres * uRimStrength;`
      );
  };
  paintMat.customProgramCacheKey = () => "hk-hero-fresnel-rim";

  const roofMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7fb, roughness: 0.2, metalness: 0.1, clearcoat: 0.95, clearcoatRoughness: 0.08
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

  const pPlateMat = new THREE.MeshStandardMaterial({ map: pPlateTex, roughness: 0.3 });
  const pPlateGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const pRear = new THREE.Mesh(pPlateGeo, pPlateMat); pRear.position.set(0.28, 0.72, 0.90); pRear.rotation.x = -0.64;
  const pFront = new THREE.Mesh(pPlateGeo, pPlateMat); pFront.position.set(-0.32, 0.72, -0.40); pFront.rotation.x = 0.64;
  const pSide = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.24, 0.24), pPlateMat);
  pSide.position.set(0.555, 0.44, -0.06);
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
    new THREE.PlaneGeometry(1.85, 3.05),
    new THREE.MeshBasicMaterial({ map: contactShadowTex, transparent: true, depthWrite: false })
  );
  shadowBlob.rotation.x = -Math.PI / 2;
  shadowBlob.position.set(0, 0.015, 0);
  carRoot.add(shadowBlob);

  const streakAura = makeGlowHalo(0xfacc15, 2.55, 0.0);
  streakAura.position.set(0, 0.62, 0);
  carRoot.add(streakAura);

  const carHitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.25, 2.7),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  carHitProxy.position.set(0, 0.58, 0);
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

  // ==================== POOLED MULTI-COLOR 3D CONFETTI & EXHAUST PUFFS (ZERO ALLOC!) ====================
  const SPARK_COUNT = 48;
  const sparkGeo = new THREE.BoxGeometry(0.11, 0.025, 0.16);
  const sparkMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.35
  });
  const sparkInst = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparkInst.frustumCulled = false;
  scene.add(sparkInst);
  const confettiPalette = [
    new THREE.Color(0x10b981), new THREE.Color(0xfacc15), new THREE.Color(0x38bdf8),
    new THREE.Color(0xf472b6), new THREE.Color(0xfb923c)
  ];
  const sparks = Array.from({ length: SPARK_COUNT }, () => ({
    active: false, life: 0, maxLife: 1,
    pos: new THREE.Vector3(0, -20, 0), vel: new THREE.Vector3(), rot: 0, spin: 4
  }));

  function hasActiveSparks() {
    for (let i = 0; i < SPARK_COUNT; i++) if (sparks[i].active) return true;
    return false;
  }

  function emitSparks(count, colorHex = null, originX = carRoot.position.x, originY = 0.72, originZ = carRoot.position.z) {
    if (prefersReducedMotion()) return;
    let spawned = 0;
    const singleColor = colorHex != null ? new THREE.Color(colorHex) : null;
    for (let i = 0; i < SPARK_COUNT && spawned < count; i++) {
      const s = sparks[i];
      if (s.active) continue;
      s.active = true;
      s.life = 0;
      s.maxLife = 0.65 + seededRand() * 0.45;
      s.pos.set(
        originX + (seededRand() - 0.5) * 0.9,
        originY + seededRand() * 0.35,
        originZ + (seededRand() - 0.5) * 0.6
      );
      s.vel.set((seededRand() - 0.5) * 2.9, 1.8 + seededRand() * 2.3, (seededRand() - 0.5) * 1.1);
      s.rot = seededRand() * Math.PI * 2;
      s.spin = (seededRand() > 0.5 ? 1 : -1) * (5 + seededRand() * 6);
      sparkInst.setColorAt(i, singleColor || confettiPalette[i % confettiPalette.length]);
      spawned++;
    }
    if (sparkInst.instanceColor) sparkInst.instanceColor.needsUpdate = true;
  }

  // Cute stylized miniature exhaust puffs kicking out behind car on acceleration launch!
  const PUFF_COUNT = 16;
  const puffGeo = new THREE.IcosahedronGeometry(0.11, 1);
  const puffMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xe2e8f0, emissiveIntensity: 0.25, roughness: 0.9, transparent: true, opacity: 0.78
  });
  const puffInst = new THREE.InstancedMesh(puffGeo, puffMat, PUFF_COUNT);
  puffInst.frustumCulled = false;
  scene.add(puffInst);
  const puffs = Array.from({ length: PUFF_COUNT }, () => ({
    active: false, life: 0, maxLife: 0.55,
    pos: new THREE.Vector3(0, -20, 0), vel: new THREE.Vector3()
  }));

  function hasActivePuffs() {
    for (let i = 0; i < PUFF_COUNT; i++) if (puffs[i].active) return true;
    return false;
  }

  function emitExhaustPuffs(count, golden = false) {
    if (prefersReducedMotion()) return;
    puffMat.color.setHex(golden ? 0xfef08a : 0xffffff);
    puffMat.emissive.setHex(golden ? 0xf59e0b : 0xcbd5e1);
    let spawned = 0;
    for (let i = 0; i < PUFF_COUNT && spawned < count; i++) {
      const pf = puffs[i];
      if (pf.active) continue;
      pf.active = true;
      pf.life = 0;
      pf.maxLife = 0.42 + seededRand() * 0.26;
      pf.pos.set(carRoot.position.x - 1.02 - seededRand() * 0.18, 0.24 + seededRand() * 0.12, (seededRand() - 0.5) * 0.24);
      pf.vel.set(-1.3 - seededRand() * 0.8, 0.45 + seededRand() * 0.45, (seededRand() - 0.5) * 0.25);
      spawned++;
    }
  }

  // ==================== STATE ====================
  const LEFT_LANE_X = -1.05;
  const RIGHT_LANE_X = 1.05;
  const finiteNum = (val, fallback) => {
    const n = Number(val);
    return Number.isFinite(n) ? n : fallback;
  };

  const state = {
    mode: null, // null | "home" | "quiz" | "summary"
    gear: "D",
    lane: "left",
    targetX: LEFT_LANE_X,
    carVelX: 0, // true damped spring velocity for quiz track!
    roadSpeed: 5.0,
    roadOffset: 0,
    boostTimer: 0,
    brakeTimer: 0,
    hazardTimer: 0,
    blinkerTimer: 0,
    blinkerDir: 0,
    hopPhase: 0,
    squashTimer: 0,
    squashDuration: 0.36,
    squashKind: "jump", // "jump" | "brake"
    wobbleTimer: 0,
    flashTimer: 0,
    rimFlashTimer: 0,
    rimFlashHex: 0x10b981,
    popTimer: 0,
    popDuration: 1.25,
    combo: 0,
    readiness: 0,
    summaryPassed: true,
    isVisible: true,
    isDark: isDarkTheme(),
    animRunning: false,
    hasExternalMount: false,
    progressRatio: 0,
    quizAnswered: 0,
    quizTotal: 20,
    quizRight: 0,
    quizIsExam: false,
    quizPassMin: 16,
    quizRevealAtEnd: false,
    quizMoodText: "出發！一步一步行向 1 Take Pass",
    quizMoodTone: "neutral",
    quizPassedNotified: false,
    quizWakeTimer: 0,
    ribbonTime: 0
  };

  carRoot.position.set(LEFT_LANE_X, 0, 0.25);

  const dummy = new THREE.Object3D();
  // Pre-allocate sparkInst.instanceColor & hide pooled particles off-screen before compileAsync()
  dummy.position.set(0, -20, 0);
  dummy.rotation.set(0, 0, 0);
  dummy.scale.setScalar(0.001);
  dummy.updateMatrix();
  for (let i = 0; i < SPARK_COUNT; i++) {
    sparkInst.setMatrixAt(i, dummy.matrix);
    sparkInst.setColorAt(i, confettiPalette[i % confettiPalette.length]);
  }
  sparkInst.instanceMatrix.needsUpdate = true;
  if (sparkInst.instanceColor) sparkInst.instanceColor.needsUpdate = true;
  for (let i = 0; i < PUFF_COUNT; i++) {
    puffInst.setMatrixAt(i, dummy.matrix);
  }
  puffInst.instanceMatrix.needsUpdate = true;
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

  function punchElement(el) {
    if (!el || prefersReducedMotion() || typeof el.animate !== "function") return;
    el.animate(
      [{ transform: "scale(1.16)" }, { transform: "scale(1)" }],
      { duration: 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }

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
    if (hudLaneBtn) hudLaneBtn.textContent = state.lane === "left" ? "切右線超車" : "返回左線";
    if (hudStatus) {
      if (state.mode === "summary") {
        hudStatus.textContent = state.summaryPassed ? "1TakePass 衝線及格" : "整裝再出發";
        hudStatus.dataset.tone = state.summaryPassed ? "right" : "neutral";
      } else if (state.mode === "quiz") {
        hudStatus.textContent = state.quizMoodText || pickDefaultMoodText();
        hudStatus.dataset.tone = state.quizMoodTone || "neutral";
      } else {
        const gearText = {
          P: "P 波泊定", R: "R 波倒車", N: "N 波空波",
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

  function wakeQuizAnim(seconds = 1.25) {
    if (state.mode !== "quiz") return;
    if (prefersReducedMotion()) {
      state.quizWakeTimer = 0;
      snapQuizProgressImmediate();
      renderSingleFrame();
      return;
    }
    state.quizWakeTimer = Math.max(state.quizWakeTimer, seconds);
    startLoopIfAllowed();
  }

  function hasPendingQuizMotion() {
    if (state.mode !== "quiz") return false;
    const anyMilestonePopping = milestoneGems.some((m) => m.popT > 0);
    return (
      Math.abs(carRoot.position.x - state.targetX) >= 0.004 ||
      Math.abs(state.carVelX) >= 0.02 ||
      state.hopPhase > 0 ||
      state.squashTimer > 0 ||
      state.brakeTimer > 0 ||
      state.hazardTimer > 0 ||
      state.flashTimer > 0 ||
      state.wobbleTimer > 0 ||
      state.rimFlashTimer > 0 ||
      state.popTimer > 0 ||
      anyMilestonePopping ||
      hasActiveSparks() ||
      hasActivePuffs() ||
      state.quizWakeTimer > 0
    );
  }

  function resetTransientEffects() {
    state.quizWakeTimer = 0;
    state.popTimer = 0;
    state.boostTimer = 0;
    state.brakeTimer = 0;
    state.hazardTimer = 0;
    state.blinkerTimer = 0;
    state.blinkerDir = 0;
    state.wobbleTimer = 0;
    state.flashTimer = 0;
    state.rimFlashTimer = 0;
    state.hopPhase = 0;
    state.squashTimer = 0;
    state.carVelX = 0;

    emotionPopSprite.visible = false;
    popMat.opacity = 0;

    dummy.position.set(0, -20, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(0.001);
    dummy.updateMatrix();
    for (let i = 0; i < SPARK_COUNT; i++) {
      sparks[i].active = false;
      sparks[i].life = 0;
      sparkInst.setMatrixAt(i, dummy.matrix);
    }
    sparkInst.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < PUFF_COUNT; i++) {
      puffs[i].active = false;
      puffs[i].life = 0;
      puffInst.setMatrixAt(i, dummy.matrix);
    }
    puffInst.instanceMatrix.needsUpdate = true;

    for (const m of milestoneGems) {
      m.popT = 0;
      m.gem.scale.setScalar(1);
    }

    carBodyGroup.position.set(0, 0, 0);
    carBodyGroup.scale.setScalar(1);
    carBodyGroup.rotation.set(0, 0, 0);
    shadowBlob.scale.setScalar(1);
    shadowBlob.material.opacity = 1;
    ribbonUniforms.uPulseBoost.value = 0.0;
  }

  function snapQuizProgressImmediate() {
    if (state.mode !== "quiz") return;
    const tx = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;
    carRoot.position.set(tx, 0, 0.04);
    state.carVelX = 0;
    for (const m of milestoneGems) {
      m.reached = state.progressRatio >= m.pct - 0.01;
      m.popT = 0;
      m.gem.scale.setScalar(1);
    }
    updateProgressTrackVisuals(0);
  }

  function updateProgressTrackVisuals(dt) {
    const filledSpan = Math.max(0.08, carRoot.position.x - TRACK_MIN_X);
    progressFillMesh.scale.x = filledSpan;
    progressFillMesh.position.x = TRACK_MIN_X + filledSpan * 0.5;

    const isStreak = !state.quizRevealAtEnd && state.combo >= 3;
    const isPassed = state.quizIsExam && !state.quizRevealAtEnd && state.quizRight >= state.quizPassMin;
    if (isPassed) {
      ribbonUniforms.uColorA.value.setHex(0xd97706);
      ribbonUniforms.uColorB.value.setHex(0xfde047);
    } else if (isStreak) {
      ribbonUniforms.uColorA.value.setHex(0xf59e0b);
      ribbonUniforms.uColorB.value.setHex(0xfef08a);
    } else if (state.quizRevealAtEnd) {
      ribbonUniforms.uColorA.value.setHex(0x0284c7);
      ribbonUniforms.uColorB.value.setHex(0x38bdf8);
    } else {
      ribbonUniforms.uColorA.value.setHex(0x059669);
      ribbonUniforms.uColorB.value.setHex(0x34d399);
    }
    ribbonUniforms.uPulseBoost.value = state.animRunning ? 0.85 : 0.0;

    const curPct = THREE.MathUtils.clamp((carRoot.position.x - TRACK_MIN_X) / TRACK_SPAN, 0, 1);
    for (const m of milestoneGems) {
      const nowReached = curPct >= m.pct - 0.015;
      if (nowReached && !m.reached) {
        m.reached = true;
        if (!prefersReducedMotion()) {
          m.popT = 0.55;
          emitSparks(10, 0x34d399, m.x, 0.42, -0.68);
        }
      }
      if (!nowReached) m.reached = false;
      if (m.popT > 0) {
        if (dt > 0) m.popT = Math.max(0, m.popT - dt);
        const k = 1 - m.popT / 0.55;
        const sc = 0.75 + 0.52 * easeOutBack(k);
        m.gem.scale.setScalar(sc);
        m.gem.rotation.y = k * Math.PI * 2;
      } else {
        m.gem.scale.setScalar(1);
        m.gem.rotation.y = m.reached ? Math.PI * 0.25 : 0;
      }
      m.mat.color.setHex(m.reached ? (isStreak || isPassed ? 0xfacc15 : 0x34d399) : 0x94a3b8);
      m.mat.emissive.setHex(isStreak || isPassed ? 0xf59e0b : 0x10b981);
      m.mat.emissiveIntensity = m.reached ? 1.15 : 0.0;
      m.halo.material.opacity = m.reached ? 0.68 : 0.0;
    }

    passArchGroup.visible = state.quizIsExam && state.quizTotal >= 10;
    passArchMat.emissiveIntensity = isPassed ? 1.25 : 0.25;
    passHalo.material.opacity = isPassed ? 0.82 : 0.0;
    finishHalo.material.opacity = curPct >= 0.96 ? 0.85 : 0.18;
    streakAura.material.opacity = state.mode === "quiz" && (isStreak || isPassed) ? 0.45 : 0.0;
  }

  function setGear(g) {
    if (!["P", "R", "N", "D"].includes(g)) return;
    state.gear = g;
    if (g === "P" && !prefersReducedMotion()) state.brakeTimer = 0.55;
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  function toggleLane() {
    if (state.gear === "P") setGear("D");
    const next = state.lane === "left" ? "right" : "left";
    state.lane = next;
    state.targetX = next === "left" ? LEFT_LANE_X : RIGHT_LANE_X;
    if (prefersReducedMotion()) {
      carRoot.position.x = state.targetX;
    } else {
      state.blinkerDir = next === "left" ? -1 : 1;
      state.blinkerTimer = 1.5;
    }
    updateHudUI();
    if (prefersReducedMotion()) renderSingleFrame();
  }

  function triggerHonkBoost() {
    const reduced = prefersReducedMotion();
    if (!reduced) {
      state.hopPhase = 1.0;
      state.squashKind = "jump";
      state.squashTimer = 0.38;
      state.squashDuration = 0.38;
      state.flashTimer = 0.45;
      state.rimFlashTimer = 0.5;
      state.rimFlashHex = 0x38bdf8;
      if (state.mode === "home" && state.gear === "D") state.boostTimer = 0.9;
      emitSparks(14, null);
    }
    if (typeof window.playOneTakeHorn === "function") window.playOneTakeHorn();
    if (state.mode === "quiz") {
      if (!reduced) {
        emitExhaustPuffs(4, false);
        showEmotionPop("📣 呠呠！加油！", "honk");
      }
      state.quizMoodText = "呠呠！深呼吸一下，你一定 1 Take Pass！";
      state.quizMoodTone = "streak";
      updateHudUI();
      if (reduced) {
        snapQuizProgressImmediate();
        renderSingleFrame();
      } else {
        wakeQuizAnim(1.3);
      }
    } else if (reduced) {
      renderSingleFrame();
    }
  }

  hudGearBtns.forEach((b) => b.addEventListener("click", () => setGear(b.dataset.gear)));
  if (hudLaneBtn) hudLaneBtn.addEventListener("click", toggleLane);
  if (hudHonkBtn) hudHonkBtn.addEventListener("click", triggerHonkBoost);

  let downX = 0;
  let downY = 0;
  let activePointerId = null;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) {
      activePointerId = null;
      return;
    }
    activePointerId = e.pointerId;
    downX = e.clientX;
    downY = e.clientY;
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (activePointerId === null || e.pointerId !== activePointerId) return;
    activePointerId = null;
    if (e.button !== 0) return;
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
  renderer.domElement.addEventListener("pointercancel", (e) => {
    if (e.pointerId === activePointerId) activePointerId = null;
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

  // ==================== MOUNTING & EDGE-TO-EDGE DIORAMA CAMERA ====================
  function fitQuizProgressCamera() {
    const halfW = 7.75; // frames Start -> HK Skyline -> 16/20 -> 1✓ PASS edge-to-edge on desktop & mobile!
    const halfH = 1.24; // comfortably clears floating 3D emotion sticker above car!
    isSnappingCamera = true;
    camera.fov = 26;
    const tanHalfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const tanHalfH = tanHalfV * Math.max(1.5, camera.aspect);
    const camZ = Math.max(halfW / tanHalfH, halfH / tanHalfV);
    camera.position.set(0, camZ * 0.14 + 0.54, camZ);
    controls.target.set(0, 0.66, -0.35);
    controls.enabled = false;
    renderer.domElement.style.touchAction = "pan-y";
    camera.updateProjectionMatrix();
    controls.update();
    isSnappingCamera = false;
  }

  function snapCameraForMode(mode) {
    controls.enableDamping = !prefersReducedMotion();
    if (mode === "quiz") {
      fitQuizProgressCamera();
      return;
    }
    isSnappingCamera = true;
    if (mode === "summary") {
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
    renderer.domElement.style.touchAction = "pan-y";
    controls.update();
    isSnappingCamera = false;
  }

  let lastW = 0;
  let lastH = 0;
  let lastDpr = 0;

  function resizeRenderer() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    if (w < 10 || h < 10) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobileScreen() ? 1.75 : 2);
    if (w === lastW && h === lastH && dpr === lastDpr) return false;
    lastW = w;
    lastH = h;
    lastDpr = dpr;
    renderer.setPixelRatio(dpr);
    camera.aspect = w / h;
    if (state.mode === "quiz") fitQuizProgressCamera();
    else camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (state.animRunning) renderer.render(scene, camera);
    else if (state.mode && !shell.hidden) renderSingleFrame();
    return true;
  }

  const resizeObserver = new ResizeObserver(() => resizeRenderer());
  resizeObserver.observe(viewport);
  window.addEventListener("resize", resizeRenderer);

  function mountToView(mode, opts = {}) {
    state.hasExternalMount = true;
    const slotId =
      mode === "quiz" ? "quiz-3d-slot" : mode === "summary" ? "summary-3d-slot" : mode === "home" ? "home-3d-slot" : null;

    if (!slotId) {
      resetTransientEffects();
      state.mode = null;
      shell.hidden = true;
      pauseLoop();
      return;
    }

    const slot = document.getElementById(slotId);
    if (!slot) return;

    const changedMode = state.mode !== mode;
    const sameSlot = shell.parentElement === slot;
    const wasHidden = shell.hidden;

    if (!changedMode && sameSlot && !wasHidden) {
      if (mode === "quiz") {
        if (opts && opts.combo !== undefined) state.combo = Math.max(0, finiteNum(opts.combo, 0));
        updateHudUI();
        resizeRenderer();
        if (hasPendingQuizMotion()) startLoopIfAllowed();
        return;
      }
      if (mode === "summary" && state.summaryPassed === (opts.passed !== false)) {
        updateHudUI();
        resizeRenderer();
        startLoopIfAllowed();
        return;
      }
      if (mode === "home") {
        updateHudUI();
        resizeRenderer();
        startLoopIfAllowed();
        return;
      }
    }

    if (changedMode) {
      resetTransientEffects();
    }

    state.mode = mode;
    shell.dataset.mode = mode;
    shell.hidden = false;
    if (!sameSlot) slot.appendChild(shell);
    if (wasHidden || !sameSlot) {
      const rect = shell.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        state.isVisible =
          rect.bottom > 0 &&
          rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right > 0 &&
          rect.left < (window.innerWidth || document.documentElement.clientWidth);
      }
    }

    if (mode === "home") {
      homeWorldGroup.visible = true;
      progressTrackGroup.visible = false;
      skyDome.visible = true;
      trophyGroup.visible = false;
      emotionPopSprite.visible = false;
      pSide.visible = false;
      carRoot.scale.setScalar(1);
      carBodyGroup.scale.setScalar(1);
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
      emotionPopSprite.visible = false;
      pSide.visible = false;
      carRoot.scale.setScalar(1);
      carBodyGroup.scale.setScalar(1);
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
      if (!prefersReducedMotion()) {
        if (state.summaryPassed) emitSparks(28, null);
        else state.hazardTimer = 2.0;
      }
    } else if (mode === "quiz") {
      homeWorldGroup.visible = false;
      progressTrackGroup.visible = true;
      skyDome.visible = true; // Evolving Morning -> Golden Sunset sky behind HK miniature skyline!
      trophyGroup.visible = false;
      pSide.visible = true;
      carRoot.scale.setScalar(0.9);
      carBodyGroup.scale.setScalar(1);
      carRoot.rotation.set(0, -Math.PI / 2, 0);
      carBodyGroup.rotation.set(0, 0, 0);
      carRoot.position.z = 0.04;
      state.combo = Math.max(0, finiteNum(opts.combo, 0));
      if (changedMode) {
        state.quizPassedNotified = false;
        state.quizMoodTone = "neutral";
        state.quizMoodText = pickDefaultMoodText();
        state.carVelX = 0;
        state.targetX = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;
        carRoot.position.x = state.targetX;
        for (const m of milestoneGems) {
          m.reached = state.progressRatio >= m.pct - 0.015;
          m.popT = 0;
          m.gem.scale.setScalar(1);
        }
      }
      updateProgressTrackVisuals(0);
    }

    if (changedMode || mode === "summary") snapCameraForMode(mode);
    updateHudUI();

    if (mode === "quiz") {
      if (hasPendingQuizMotion()) {
        resizeRenderer();
        startLoopIfAllowed();
      } else {
        pauseLoop();
        const didResize = resizeRenderer();
        if (!didResize) renderSingleFrame();
      }
    } else {
      const didResize = resizeRenderer();
      if (!didResize && prefersReducedMotion()) renderSingleFrame();
      else startLoopIfAllowed();
    }
  }

  // ==================== PUBLIC API FOR app.js ====================
  const api = {
    mount: mountToView,
    supportsQuestion() {
      return true;
    },
    setTheme(dark) {
      state.isDark = !!dark;
      applyThemeColors(1);
      if (!state.animRunning && state.mode && !shell.hidden) renderSingleFrame();
    },
    setReadiness(pct) {
      state.readiness = Math.max(0, Math.min(100, finiteNum(pct, 0)));
    },
    setProgress({ answered = 0, total = 20, right = 0, combo = 0, isExam = false, passMin = 16, revealAtEnd = false, snap = false } = {}) {
      const safeTotal = Math.max(1, finiteNum(total, 20));
      const safeAnswered = Math.max(0, finiteNum(answered, 0));
      const safeRight = Math.max(0, finiteNum(right, 0));
      const safeCombo = Math.max(0, finiteNum(combo, 0));
      const safePassMin = Math.max(1, finiteNum(passMin, 16));
      const nextRatio = THREE.MathUtils.clamp(safeAnswered / safeTotal, 0, 1);
      const moved = Math.abs(nextRatio - state.progressRatio) > 0.001;
      state.quizAnswered = safeAnswered;
      state.quizTotal = safeTotal;
      state.quizRight = safeRight;
      state.combo = safeCombo;
      state.quizIsExam = !!isExam;
      state.quizPassMin = safePassMin;
      state.quizRevealAtEnd = !!revealAtEnd;
      state.progressRatio = nextRatio;
      state.targetX = TRACK_MIN_X + TRACK_SPAN * nextRatio;

      if (safeAnswered === 0) {
        state.quizPassedNotified = false;
        state.quizMoodTone = "neutral";
        state.quizMoodText = pickDefaultMoodText();
        state.popTimer = 0;
        emotionPopSprite.visible = false;
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
        punchElement(hudSpeed);
        wakeQuizAnim(1.1);
      } else {
        updateHudUI();
        if (!state.animRunning) {
          updateProgressTrackVisuals(0);
          renderSingleFrame();
        }
      }
    },
    reactAnswer({ isRight, combo = 0, wasPreviouslyWrong = false, answered = 1, total = 20, right = 0, isExam = false, passMin = 16, emotion = null } = {}) {
      const safeTotal = Math.max(1, finiteNum(total, 20));
      const safeAnswered = Math.max(0, finiteNum(answered, 1));
      const safeRight = Math.max(0, finiteNum(right, 0));
      const safeCombo = Math.max(0, finiteNum(combo, 0));
      const safePassMin = Math.max(1, finiteNum(passMin, 16));
      const reduced = prefersReducedMotion();

      state.quizAnswered = safeAnswered;
      state.quizTotal = safeTotal;
      state.quizRight = safeRight;
      state.combo = isRight ? safeCombo : 0;
      state.quizIsExam = !!isExam;
      state.quizPassMin = safePassMin;
      state.progressRatio = THREE.MathUtils.clamp(safeAnswered / safeTotal, 0, 1);
      state.targetX = TRACK_MIN_X + TRACK_SPAN * state.progressRatio;

      const justPassedExam = !state.quizRevealAtEnd && isExam && isRight && safeRight >= safePassMin && !state.quizPassedNotified;
      if (justPassedExam) state.quizPassedNotified = true;

      if (isRight) {
        if (!reduced) {
          state.hopPhase = 1.0;
          state.squashKind = "jump";
          state.squashTimer = 0.42;
          state.squashDuration = 0.42;
          state.flashTimer = 0.5;
          state.brakeTimer = 0;
          state.hazardTimer = 0;
          state.rimFlashTimer = 0.72;
          emitExhaustPuffs(5, safeCombo >= 3 || justPassedExam);
        }

        if (justPassedExam) {
          state.quizMoodTone = "passed";
          state.quizMoodText = `衝過及格線（${safeRight}/${safePassMin}）！1 Take Pass 喺望！`;
          if (!reduced) {
            state.rimFlashHex = 0xfacc15;
            showEmotionPop("🏆 過咗及格線！", "passed");
            emitSparks(32, null, passArchX, 1.15, -0.35);
            emitSparks(16, null);
          }
        } else if (wasPreviouslyWrong) {
          state.quizMoodTone = "right";
          state.quizMoodText = emotion?.text || "錯題擊破！越嚟越穩陣！";
          if (!reduced) {
            state.rimFlashHex = 0x10b981;
            showEmotionPop("🎯 錯題擊破！", "right");
            emitSparks(24, null);
          }
        } else if (safeCombo >= 3) {
          state.quizMoodTone = "streak";
          const raw = emotion?.text || "手風超順，繼續衝！";
          state.quizMoodText = /連中/.test(raw) ? raw : `${safeCombo} 連中！${raw}`;
          if (!reduced) {
            state.rimFlashHex = 0xf59e0b;
            showEmotionPop(`🔥 ${safeCombo} 連中！`, "streak");
            emitSparks(22, null);
          }
        } else {
          state.quizMoodTone = "right";
          state.quizMoodText = emotion?.text || "穩陣！又向 1 Take Pass 行前一步！";
          if (!reduced) {
            state.rimFlashHex = 0x10b981;
            showEmotionPop("✨ 穩陣 +1", "right");
            emitSparks(16, null);
          }
        }
      } else {
        state.quizMoodTone = "wrong";
        state.quizMoodText = emotion?.text || "唔緊要，考前踩一踩停記低好過考場錯！";
        if (!reduced) {
          state.squashKind = "brake";
          state.squashTimer = 0.34;
          state.squashDuration = 0.34;
          state.brakeTimer = 0.85;
          state.hazardTimer = 1.05;
          state.wobbleTimer = 0.52;
          state.rimFlashTimer = 0.55;
          state.rimFlashHex = 0xf59e0b;
          showEmotionPop("💪 記低下次贏", "wrong");
        }
      }

      updateHudUI();
      punchElement(hudSpeed);
      if (state.mode === "quiz") {
        if (reduced) {
          snapQuizProgressImmediate();
          renderSingleFrame();
        } else {
          wakeQuizAnim(1.35);
        }
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
        popVisible: emotionPopSprite.visible,
        homeWorldVisible: homeWorldGroup.visible,
        progressTrackVisible: progressTrackGroup.visible,
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles
      };
    }
  };

  // ==================== THEME, EVOLVING JOURNEY SKY & ANIMATION LOOP ====================
  const timer = new THREE.Timer();
  timer.connect(document);

  const dayMorningTop = new THREE.Color(0x52a3e8);
  const dayMorningHor = new THREE.Color(0xdcf0ff);
  const daySunsetTop = new THREE.Color(0x3b6cb7);
  const daySunsetHor = new THREE.Color(0xfde2b8);
  const nightTop = new THREE.Color(0x070d1f);
  const nightHor = new THREE.Color(0x1b2d4d);
  const nightPassHor = new THREE.Color(0x2a2548);
  const tmpColorA = new THREE.Color();
  const tmpColorB = new THREE.Color();

  function applyThemeColors(lerpFactor) {
    const dark = state.isDark;
    if (state.mode === "quiz") {
      // Emotional Sky Journey: crisp HK morning (0%) -> warm Golden Hour Victoria Harbour sunset (80-100%)!
      const sunsetMix = THREE.MathUtils.clamp((state.progressRatio - 0.35) / 0.55, 0, 1);
      const isStreakOrPass = !state.quizRevealAtEnd && (state.combo >= 3 || (state.quizIsExam && state.quizRight >= state.quizPassMin));
      const warmAmt = Math.min(1, sunsetMix + (isStreakOrPass ? 0.35 : 0));

      if (dark) {
        tmpColorA.copy(nightTop);
        tmpColorB.copy(nightHor).lerp(nightPassHor, warmAmt);
      } else {
        tmpColorA.copy(dayMorningTop).lerp(daySunsetTop, warmAmt);
        tmpColorB.copy(dayMorningHor).lerp(daySunsetHor, warmAmt);
      }

      bgColor.lerp(tmpColorB, lerpFactor);
      fog.color.copy(bgColor);
      fog.near = 18;
      fog.far = 42;
      skyUniforms.uTopColor.value.lerp(tmpColorA, lerpFactor);
      skyUniforms.uHorizonColor.value.copy(bgColor);
      skyUniforms.uGroundColor.value.setHex(dark ? 0x0d1b2d : 0xb8dcf0);
      skyUniforms.uSunColor.value.setHex(warmAmt > 0.45 ? 0xffcf7d : 0xfff5d6);
      skyUniforms.uSunDir.value.set(-0.2 + state.progressRatio * 0.65, 0.24 - warmAmt * 0.08, -0.92).normalize();
      skyUniforms.uSunIntensity.value = dark ? 0.0 : 1.05;
      skyUniforms.uStarIntensity.value = dark ? 0.95 : 0.0;

      harbourWaterMat.color.setHex(dark ? 0x163354 : warmAmt > 0.55 ? 0x56a8d6 : 0x38bdf8);
      promenadeBaseMat.color.setHex(dark ? 0x243044 : 0xe8eef5);
      turfStripMat.color.setHex(dark ? 0x1d4d3a : 0x4ca773);
      trackDeckMat.color.setHex(dark ? 0x1a2232 : 0x2b3546);
      miniHillMat.color.setHex(dark ? 0x16323c : warmAmt > 0.6 ? 0x5c8568 : 0x4f8c6c);
      miniTowerMat.color.setHex(dark ? 0x263449 : 0xaab8c8);
      miniTowerMat.emissiveIntensity = dark ? 0.98 : warmAmt > 0.6 ? 0.42 : 0.12;
      miniBocMat.color.setHex(dark ? 0x243347 : 0xffffff);
      miniBocMat.emissiveIntensity = dark ? 1.15 : 0.08;
      cloudMat.color.setHex(dark ? 0x334155 : warmAmt > 0.55 ? 0xffedd5 : 0xffffff);
      cloudMat.opacity = dark ? 0.42 : 0.88;

      sunLight.intensity = dark ? 1.55 : 2.55;
      sunLight.color.setHex(dark ? 0xdbeafe : warmAmt > 0.55 ? 0xffdfb0 : 0xfff7e6);
      hemiLight.intensity = dark ? 0.78 : 1.05;
      scene.environmentIntensity = dark ? 0.58 : 0.86;

      // Hero Car Fresnel Rim dynamically reflects emotional mood!
      if (state.rimFlashTimer > 0) {
        paintRimUniforms.uRimColor.value.setHex(state.rimFlashHex);
        paintRimUniforms.uRimStrength.value = 0.42 + (state.rimFlashTimer / 0.72) * 1.45;
      } else {
        paintRimUniforms.uRimColor.value.setHex(isStreakOrPass ? 0xfde047 : dark ? 0x60a5fa : 0x93c5fd);
        paintRimUniforms.uRimStrength.value = isStreakOrPass ? 0.88 : 0.44;
      }

      beamMat.opacity = state.flashTimer > 0 ? 0.34 : dark ? 0.14 : 0.0;
      headGroundPoolMat.opacity = 0.0;
      headlightMat.emissiveIntensity = state.flashTimer > 0 ? 3.2 : dark ? 1.8 : 0.75;
      for (const hh of headHalos) hh.material.opacity = state.flashTimer > 0 ? 0.85 : dark ? 0.45 : 0.14;
      return;
    }

    // Home & Summary lighting
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
    skyUniforms.uSunColor.value.setHex(0xfff2cc);
    skyUniforms.uSunDir.value.set(0.32, 0.36, -0.88).normalize();
    skyUniforms.uSunIntensity.value = dark ? 0.0 : 1.0;
    skyUniforms.uStarIntensity.value = dark ? 0.9 : 0.0;

    sunLight.color.setHex(0xfff5e0);
    sunLight.intensity = dark ? 0.95 : 2.55;
    hemiLight.intensity = dark ? 0.56 : 0.95;
    scene.environmentIntensity = dark ? 0.48 : 0.8;
    paintRimUniforms.uRimColor.value.setHex(dark ? 0x60a5fa : 0x93c5fd);
    paintRimUniforms.uRimStrength.value = 0.38;

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

  function stepSparksAndPuffs(dt) {
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
      s.vel.y -= 5.0 * dt;
      s.rot += dt * s.spin;
      const sc = Math.sin((1 - s.life / s.maxLife) * Math.PI * 0.5) * 1.15;
      dummy.position.copy(s.pos);
      dummy.rotation.set(s.rot, s.rot * 0.7, s.rot * 0.4);
      dummy.scale.setScalar(Math.max(0.001, sc));
      dummy.updateMatrix();
      sparkInst.setMatrixAt(i, dummy.matrix);
    }
    sparkInst.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < PUFF_COUNT; i++) {
      const pf = puffs[i];
      if (!pf.active) {
        dummy.position.set(0, -20, 0);
        dummy.scale.setScalar(0.001);
        dummy.updateMatrix();
        puffInst.setMatrixAt(i, dummy.matrix);
        continue;
      }
      pf.life += dt;
      if (pf.life >= pf.maxLife) {
        pf.active = false;
        dummy.position.set(0, -20, 0);
        dummy.scale.setScalar(0.001);
        dummy.updateMatrix();
        puffInst.setMatrixAt(i, dummy.matrix);
        continue;
      }
      pf.pos.addScaledVector(pf.vel, dt);
      const t = pf.life / pf.maxLife;
      const sc = (0.45 + t * 1.15) * (1 - t);
      dummy.position.copy(pf.pos);
      dummy.rotation.set(t * 2, t * 1.5, 0);
      dummy.scale.setScalar(Math.max(0.001, sc));
      dummy.updateMatrix();
      puffInst.setMatrixAt(i, dummy.matrix);
    }
    puffInst.instanceMatrix.needsUpdate = true;
  }

  function stepScene(dt, elapsed) {
    const lerpFactor = dt > 0 ? Math.min(1, dt * 7) : 1;
    if (state.rimFlashTimer > 0) state.rimFlashTimer = Math.max(0, state.rimFlashTimer - dt);
    applyThemeColors(lerpFactor);

    if (state.boostTimer > 0) state.boostTimer = Math.max(0, state.boostTimer - dt);
    if (state.brakeTimer > 0) state.brakeTimer = Math.max(0, state.brakeTimer - dt);
    if (state.hazardTimer > 0) state.hazardTimer = Math.max(0, state.hazardTimer - dt);
    if (state.blinkerTimer > 0) state.blinkerTimer = Math.max(0, state.blinkerTimer - dt);
    if (state.flashTimer > 0) state.flashTimer = Math.max(0, state.flashTimer - dt);
    if (state.wobbleTimer > 0) state.wobbleTimer = Math.max(0, state.wobbleTimer - dt);
    if (state.hopPhase > 0) state.hopPhase = Math.max(0, state.hopPhase - dt * 2.5);

    if (state.mode === "quiz") {
      // ==================== AAA MINIATURE DIORAMA EMOTIONAL PROGRESS BAR STEP ====================
      if (dt > 0) {
        state.ribbonTime += dt;
        ribbonUniforms.uTime.value = state.ribbonTime;
      }

      // True damped harmonic spring physics (ui-animation/spring-animations.md + game-feel.md!)
      const prevX = carRoot.position.x;
      if (dt > 0) {
        const stiffness = 155;
        const damping = 18;
        const force = (state.targetX - carRoot.position.x) * stiffness - state.carVelX * damping;
        state.carVelX += force * dt;
        carRoot.position.x += state.carVelX * dt;
        if (Math.abs(carRoot.position.x - state.targetX) < 0.004 && Math.abs(state.carVelX) < 0.02) {
          carRoot.position.x = state.targetX;
          state.carVelX = 0;
        }
      }

      const dx = carRoot.position.x - prevX;
      if (Math.abs(dx) > 0.0001) {
        const rollDelta = dx / (wheelRadius * 0.9);
        for (const ws of wheelSpinners) ws.rotation.x -= rollDelta;
      }
      for (const fp of frontWheelPivots) fp.rotation.y = 0;

      // Volume-preserving Squash-and-Stretch (game-feel.md!)
      let scaleY = 1.0;
      if (state.squashTimer > 0 && dt > 0) {
        state.squashTimer = Math.max(0, state.squashTimer - dt);
        const k = 1 - state.squashTimer / state.squashDuration;
        if (state.squashKind === "jump") {
          // Anticipation dip -> airy stretch -> bouncy settle!
          scaleY = k < 0.18
            ? 1 - 0.11 * (k / 0.18)
            : k < 0.55
              ? 0.89 + 0.27 * easeOutCubic((k - 0.18) / 0.37)
              : 1.16 - 0.16 * easeOutBack((k - 0.55) / 0.45);
        } else {
          // Gentle caring brake crouch -> smooth recover
          scaleY = 0.91 + 0.09 * easeOutBack(k);
        }
      }
      const scaleXZ = 1 / Math.sqrt(Math.max(0.75, scaleY));
      carBodyGroup.scale.set(scaleXZ, scaleY, scaleXZ);

      const hopY = Math.sin(state.hopPhase * Math.PI) * 0.28;
      carBodyGroup.position.y = hopY;
      // Contact shadow softly scales & fades as car hops!
      shadowBlob.scale.setScalar(1 - hopY * 0.45);
      shadowBlob.material.opacity = Math.max(0.35, 1 - hopY * 1.4);

      const wobblePitch = state.wobbleTimer > 0 ? Math.sin(state.wobbleTimer * 22) * 0.075 : 0;
      const springPitch = THREE.MathUtils.clamp(-state.carVelX * 0.018, -0.07, 0.07);
      carBodyGroup.rotation.x = THREE.MathUtils.damp(carBodyGroup.rotation.x, wobblePitch + springPitch, 10, dt || 0.16);
      carBodyGroup.rotation.z = 0;

      // Floating 3D Emotion Pop-up Sticker rising cleanly right above the car!
      if (state.popTimer > 0) {
        if (dt > 0) state.popTimer = Math.max(0, state.popTimer - dt);
        const k = 1 - state.popTimer / state.popDuration;
        const popScale = k < 0.24 ? easeOutBack(k / 0.24) : 1.0;
        const popAlpha = k > 0.78 ? Math.max(0, 1 - (k - 0.78) / 0.22) : 1.0;
        const clampedX = THREE.MathUtils.clamp(carRoot.position.x, TRACK_MIN_X + 0.6, TRACK_MAX_X - 0.6);
        emotionPopSprite.visible = popAlpha > 0.02;
        emotionPopSprite.position.set(clampedX, 1.28 + easeOutCubic(Math.min(1, k * 1.6)) * 0.20, 0.35);
        emotionPopSprite.scale.set(2.3 * popScale, 0.68 * popScale, 1);
        popMat.opacity = popAlpha;
      } else {
        emotionPopSprite.visible = false;
      }

      const braking = state.brakeTimer > 0;
      brakeLightMat.emissiveIntensity = braking ? 3.0 : 0.35;
      for (const bh of brakeHalos) bh.material.opacity = braking ? 0.78 : 0.1;
      brakeGroundPoolMat.opacity = 0;
      reverseLightMat.emissiveIntensity = 0;

      const blinkOn = Math.floor(elapsed * 6) % 2 === 0;
      const hazOn = state.hazardTimer > 0 && blinkOn;
      blinkerLeftMat.emissiveIntensity = hazOn ? 2.8 : 0.08;
      blinkerRightMat.emissiveIntensity = hazOn ? 2.8 : 0.08;

      updateProgressTrackVisuals(dt);
      stepSparksAndPuffs(dt);

      // Auto-sleep render loop once glide + spring + pop-up + confetti settle completely!
      if (state.quizWakeTimer > 0) state.quizWakeTimer = Math.max(0, state.quizWakeTimer - dt);
      if (!hasPendingQuizMotion() && state.animRunning) {
        carBodyGroup.position.y = 0;
        carBodyGroup.scale.setScalar(1);
        carBodyGroup.rotation.set(0, 0, 0);
        shadowBlob.scale.setScalar(1);
        shadowBlob.material.opacity = 1;
        ribbonUniforms.uPulseBoost.value = 0.0;
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

    const reduced = prefersReducedMotion();
    state.roadSpeed = reduced ? desiredSpeed : THREE.MathUtils.damp(state.roadSpeed, desiredSpeed, 4.8, dt);
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
    carRoot.position.x = reduced ? state.targetX : THREE.MathUtils.damp(carRoot.position.x, state.targetX, 5.2, dt);
    const latVel = !reduced && dt > 0.0001 ? (carRoot.position.x - prevX) / dt : 0;
    const steerAngle = THREE.MathUtils.clamp(-latVel * 0.18, -0.34, 0.34);
    for (const fp of frontWheelPivots) {
      fp.rotation.y = reduced ? 0 : THREE.MathUtils.damp(fp.rotation.y, steerAngle, 10, dt);
    }

    const wheelDelta = (state.roadSpeed * dt) / wheelRadius;
    for (const ws of wheelSpinners) ws.rotation.x -= wheelDelta;

    const hopY = reduced ? 0 : Math.sin(state.hopPhase * Math.PI) * 0.15;
    const engineVib = reduced ? 0 : Math.sin(elapsed * (state.roadSpeed !== 0 ? 18 : 11)) * (state.gear === "P" ? 0.003 : 0.008);
    carBodyGroup.position.y = hopY + engineVib;
    carBodyGroup.scale.setScalar(1);
    carBodyGroup.rotation.z = reduced ? 0 : THREE.MathUtils.damp(carBodyGroup.rotation.z, -latVel * 0.072, 7.5, dt);
    const targetPitch = state.brakeTimer > 0 && Math.abs(state.roadSpeed) > 0.3 ? -0.065 : state.boostTimer > 0 ? 0.05 : 0;
    carBodyGroup.rotation.x = reduced ? 0 : THREE.MathUtils.damp(carBodyGroup.rotation.x, targetPitch, 8.5, dt);

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
      if (state.summaryPassed && seededRand() < dt * 4) emitSparks(1, null);
    }

    stepSparksAndPuffs(dt);

    controls.autoRotate = !reduced && state.mode === "summary";
    controls.autoRotateSpeed = 1.1;
    if (!reduced) controls.update(dt);
  }

  function renderSingleFrame() {
    if (!state.mode || shell.hidden) return;
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
    if (!state.mode || shell.hidden || !state.isVisible || document.hidden) return;
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
      if (state.isVisible && state.mode && !shell.hidden) {
        if (state.mode === "quiz") {
          if (hasPendingQuizMotion()) startLoopIfAllowed();
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
    if (document.hidden) {
      pauseLoop();
    } else if (state.mode && !shell.hidden && state.isVisible) {
      if (state.mode === "quiz") {
        if (hasPendingQuizMotion()) startLoopIfAllowed();
        else renderSingleFrame();
      } else {
        startLoopIfAllowed();
      }
    }
  });

  const darkMql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (darkMql && typeof darkMql.addEventListener === "function") {
    darkMql.addEventListener("change", () => {
      if (document.documentElement.hasAttribute("data-theme")) return;
      state.isDark = isDarkTheme();
      applyThemeColors(1);
      if (!state.animRunning && state.mode && !shell.hidden) renderSingleFrame();
    });
  }

  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    pauseLoop();
  });
  renderer.domElement.addEventListener("webglcontextrestored", () => {
    rebuildEnvironment();
    lastW = 0;
    lastH = 0;
    lastDpr = 0;
    if (!state.mode || shell.hidden) return;
    const didResize = resizeRenderer();
    if (state.mode === "quiz") {
      if (hasPendingQuizMotion()) startLoopIfAllowed();
      else if (!didResize) renderSingleFrame();
    } else {
      startLoopIfAllowed();
    }
  });

  Promise.resolve(renderer.compileAsync ? renderer.compileAsync(scene, camera) : null)
    .catch(() => {})
    .finally(() => {
      state.isDark = isDarkTheme();
      applyThemeColors(1);
      window.OneTake3D = api;
      window.dispatchEvent(new CustomEvent("onetake:3d-ready"));
      if (!state.hasExternalMount && !document.getElementById("view-home")?.hidden) {
        mountToView("home");
      }
    });
})();
