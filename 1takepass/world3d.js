// 1TakePass — Modular Hong Kong Real-World 3D Road & Environment Builder
// Provides 20+ physically grounded 3D road transformations, junctions, bridges,
// markings, buildings, and authentic HK road users so ALL 300 questions have
// genuine real-world road geometry matching their sign or rule.

import * as THREE from "three";

export function createHongKongWorldProps({
  THREE: _unused,
  scenarioRoot,
  roadWidth,
  roadLen,
  mats,
  geos,
  makeCanvasTexture,
  addNpcWheels
}) {
  const {
    roadMat,
    vergeMat,
    curbMat,
    edgeLineMat,
    darkMetalMat,
    poleMat,
    coneOrangeMat,
    coneStripeMat,
    npcTailMat
  } = mats;
  const { coneBaseGeo, coneBodyGeo, coneBandGeo } = geos;

  const whiteLineMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x334155,
    emissiveIntensity: 0.2,
    roughness: 0.45
  });
  const yellowPaintMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xb45309,
    emissiveIntensity: 0.18,
    roughness: 0.45
  });
  const redPaintMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
  const whitePaintMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
  const amberGlowMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 1.5,
    roughness: 0.25
  });
  const headlightWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xfffbeb,
    emissiveIntensity: 2.6,
    roughness: 0.15
  });

  // ==================== DYNAMIC CANVAS TEXTURES ====================
  const makeRoadArrowTex = (kind) =>
    makeCanvasTexture(128, 256, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f8fafc";
      if (kind === "ahead") {
        ctx.beginPath();
        ctx.moveTo(w / 2, 18);
        ctx.lineTo(w * 0.82, 92);
        ctx.lineTo(w * 0.62, 92);
        ctx.lineTo(w * 0.62, 238);
        ctx.lineTo(w * 0.38, 238);
        ctx.lineTo(w * 0.38, 92);
        ctx.lineTo(w * 0.18, 92);
        ctx.closePath();
        ctx.fill();
      } else if (kind === "left") {
        ctx.fillRect(w * 0.42, 118, w * 0.22, 120);
        ctx.beginPath();
        ctx.moveTo(14, 118);
        ctx.lineTo(74, 62);
        ctx.lineTo(74, 96);
        ctx.lineTo(w * 0.64, 96);
        ctx.lineTo(w * 0.64, 140);
        ctx.lineTo(74, 140);
        ctx.lineTo(74, 174);
        ctx.closePath();
        ctx.fill();
      } else if (kind === "speed50") {
        ctx.font = "900 102px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("50", w / 2, h / 2);
      }
    });

  const arrowAheadTex = makeRoadArrowTex("ahead");
  const arrowLeftTex = makeRoadArrowTex("left");
  const speed50Tex = makeRoadArrowTex("speed50");

  const hazardStripeTex = makeCanvasTexture(256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#facc15";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111827";
    for (let x = -h; x < w + h; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 18, 0);
      ctx.lineTo(x + 18 - h, h);
      ctx.lineTo(x - h, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(w / 2 - 44, 8, 88, h - 16);
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 4;
    ctx.strokeRect(w / 2 - 42, 10, 84, h - 20);
    ctx.fillStyle = "#111827";
    ctx.font = "900 28px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("4.5 m", w / 2, h / 2 + 1);
  });

  const redWhiteBarTex = makeCanvasTexture(256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#dc2626";
    for (let x = -h; x < w + h; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 24, 0);
      ctx.lineTo(x + 24 - h * 0.5, h);
      ctx.lineTo(x - h * 0.5, h);
      ctx.closePath();
      ctx.fill();
    }
  });

  const chevronCurveTex = makeCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#facc15";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.moveTo(22, 10);
    ctx.lineTo(66, 10);
    ctx.lineTo(106, h / 2);
    ctx.lineTo(66, h - 10);
    ctx.lineTo(22, h - 10);
    ctx.lineTo(62, h / 2);
    ctx.closePath();
    ctx.fill();
  });

  const chevronHatchTex = makeCanvasTexture(128, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 0, w - 16, h);
    ctx.lineWidth = 14;
    for (let y = 24; y < h; y += 52) {
      ctx.beginPath();
      ctx.moveTo(14, y + 26);
      ctx.lineTo(w / 2, y);
      ctx.lineTo(w - 14, y + 26);
      ctx.stroke();
    }
  });

  const jtiBoardTex = makeCanvasTexture(512, 160, (ctx, w, h) => {
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, w - 8, h - 8);
    const rows = [
      { label: "紅隧 CHT", mins: "28 分鐘", color: "#ef4444", y: 40 },
      { label: "東隧 EHC", mins: "15 分鐘", color: "#facc15", y: 84 },
      { label: "西隧 WHC", mins: " 8 分鐘", color: "#10b981", y: 128 }
    ];
    ctx.font = "800 28px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textBaseline = "middle";
    for (const r of rows) {
      ctx.fillStyle = "#e2e8f0";
      ctx.textAlign = "left";
      ctx.fillText(r.label, 30, r.y);
      ctx.fillStyle = r.color;
      ctx.textAlign = "right";
      ctx.fillText(r.mins, w - 30, r.y);
    }
  });

  const gantryColorsTex = makeCanvasTexture(512, 144, (ctx, w, h) => {
    const cols = [
      { bg: "#0284c7", fg: "#fff", t: "九龍 ↗" },
      { bg: "#007a4d", fg: "#fff", t: "吐露港 ↑" },
      { bg: "#f8fafc", fg: "#111827", t: "沙田 ←" },
      { bg: "#facc15", fg: "#111827", t: "改道 →" }
    ];
    const cw = w / 4;
    ctx.font = "800 24px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    cols.forEach((c, i) => {
      ctx.fillStyle = c.bg;
      ctx.fillRect(i * cw, 0, cw, h);
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 4;
      ctx.strokeRect(i * cw + 2, 2, cw - 4, h - 4);
      ctx.fillStyle = c.fg;
      ctx.fillText(c.t, i * cw + cw / 2, h / 2);
    });
  });

  const gantryTempTex = makeCanvasTexture(512, 144, (ctx, w, h) => {
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(0, 0, w / 2, h);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(w / 2, 0, w / 2, h);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, w / 2 - 12, h - 12);
    ctx.strokeStyle = "#111827";
    ctx.strokeRect(w / 2 + 6, 6, w / 2 - 12, h - 12);
    ctx.font = "800 28px 'Noto Sans TC', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("前面道路維修", w * 0.25, h / 2);
    ctx.fillStyle = "#111827";
    ctx.fillText("臨時改道 ↗", w * 0.75, h / 2);
  });

  const gantryHarbourTex = makeCanvasTexture(512, 144, (ctx, w, h) => {
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    const circles = [
      { ch: "西", x: 116 },
      { ch: "中", x: 256 },
      { ch: "東", x: 396 }
    ];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const c of circles) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(c.x, h / 2, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 44px 'Noto Sans TC', system-ui, sans-serif";
      ctx.fillText(c.ch, c.x, h / 2 + 2);
    }
  });

  const countdownTex = (bars) =>
    makeCanvasTexture(64, 128, (ctx, w, h) => {
      ctx.fillStyle = "#007a4d";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, w - 4, h - 4);
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < bars; i++) {
        ctx.save();
        ctx.translate(w / 2, 34 + i * 28);
        ctx.rotate(-0.35);
        ctx.fillRect(-26, -6, 52, 12);
        ctx.restore();
      }
    });

  // Helper: quick compact sedan mesh (used for oncoming, cross-traffic, parked, towed!)
  function makeCompactCar(colorHex, { headlightsOn = false, highBeam = false } = {}) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.35, 2.0),
      new THREE.MeshPhysicalMaterial({ color: colorHex, roughness: 0.28, metalness: 0.18, clearcoat: 0.75 })
    );
    body.position.y = 0.37;
    body.castShadow = true;
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(0.86, 0.31, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.16 })
    );
    cabin.position.set(0, 0.68, 0.05);
    g.add(body, cabin);
    addNpcWheels(g, 0.49, [-0.62, 0.62]);
    [-0.32, 0.32].forEach((tx) => {
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), npcTailMat);
      tl.position.set(tx, 0.41, 1.01);
      g.add(tl);
    });
    if (headlightsOn) {
      [-0.32, 0.32].forEach((hx) => {
        const hl = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.05), headlightWhiteMat);
        hl.position.set(hx, 0.41, -1.01);
        g.add(hl);
      });
    }
    let glareCones = null;
    if (highBeam) {
      glareCones = new THREE.Group();
      glareCones.visible = false;
      const coneGeo = new THREE.ConeGeometry(0.68, 3.6, 14, 1, true);
      coneGeo.rotateX(Math.PI / 2);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.36,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      [-0.32, 0.32].forEach((hx) => {
        const c = new THREE.Mesh(coneGeo, coneMat);
        c.position.set(hx, 0.38, -2.8);
        glareCones.add(c);
      });
      g.add(glareCones);
    }
    return { group: g, glareCones };
  }

  // ==================== 1. DUAL CARRIAGEWAY ENDS (q58!) ====================
  const dualEndGroup = new THREE.Group();
  dualEndGroup.visible = false;
  const medianWall = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.24, 10.5), curbMat);
  medianWall.position.set(0, 0.12, -0.2);
  medianWall.castShadow = true;
  const medianStrip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 10.52), yellowPaintMat);
  medianStrip.position.set(0, 0.23, -0.2);
  // Tapered concrete island nose ending at z = -5.6
  const medianNose = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.24, 14), curbMat);
  medianNose.position.set(0, 0.12, -5.55);
  const noseBollard = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.72, 10), darkMetalMat);
  noseBollard.position.set(0, 0.48, -5.55);
  const noseGlow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), amberGlowMat);
  noseGlow.position.set(0, 0.88, -5.55);
  // Two-way center dashes ahead of where the dual carriageway ends!
  for (let i = 0; i < 7; i++) {
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 1.05), whiteLineMat);
    seg.rotation.x = -Math.PI / 2;
    seg.position.set(0, 0.015, -7.2 - i * 2.2);
    dualEndGroup.add(seg);
  }
  dualEndGroup.add(medianWall, medianStrip, medianNose, noseBollard, noseGlow);
  scenarioRoot.add(dualEndGroup);

  // ==================== 2. ROAD NARROWS BOTH SIDES (q102, q217, q283) ====================
  const narrowRoadGroup = new THREE.Group();
  narrowRoadGroup.visible = false;
  const narrowBankMat = vergeMat;
  [-1, 1].forEach((side) => {
    // Angled transition shoulder pinching road inward from +-2.3 to +-1.15
    const wedge = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.18, 5.2), narrowBankMat);
    wedge.position.set(side * 2.38, 0.09, -5.2);
    wedge.rotation.y = side * 0.24;
    const wedgeCurb = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 5.3), curbMat);
    wedgeCurb.position.set(side * 1.72, 0.11, -5.2);
    wedgeCurb.rotation.y = side * 0.24;
    // Narrow straight single-lane throat further ahead
    const throatBank = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 18), narrowBankMat);
    throatBank.position.set(side * 2.42, 0.09, -16.5);
    const throatCurb = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 18), curbMat);
    throatCurb.position.set(side * 1.18, 0.11, -16.5);
    // Red/white narrowing verge posts
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.14), new THREE.MeshStandardMaterial({ map: redWhiteBarTex }));
    post.position.set(side * 1.32, 0.42, -7.6);
    narrowRoadGroup.add(wedge, wedgeCurb, throatBank, throatCurb, post);
  });
  scenarioRoot.add(narrowRoadGroup);

  // ==================== 3. PASSING PLACE PULL-IN BAY (q114) ====================
  const passingPlaceGroup = new THREE.Group();
  passingPlaceGroup.visible = false;
  const ppBay = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 4.8), roadMat);
  ppBay.rotation.x = -Math.PI / 2;
  ppBay.position.set(-2.05, 0.2, -5.6);
  const ppCurbBack = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 4.9), curbMat);
  ppCurbBack.position.set(-2.95, 0.22, -5.6);
  const ppEdge = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 4.4), whiteLineMat);
  ppEdge.rotation.x = -Math.PI / 2;
  ppEdge.position.set(-1.18, 0.21, -5.6);
  passingPlaceGroup.add(ppBay, ppCurbBack, ppEdge);
  scenarioRoot.add(passingPlaceGroup);

  // ==================== 4. DEAD END / NO THROUGH ROAD (q59) ====================
  const deadEndGroup = new THREE.Group();
  deadEndGroup.visible = false;
  const deBar = new THREE.Mesh(
    new THREE.BoxGeometry(roadWidth + 0.4, 0.56, 0.18),
    new THREE.MeshStandardMaterial({ map: redWhiteBarTex, roughness: 0.4 })
  );
  deBar.position.set(0, 0.82, -7.4);
  deBar.castShadow = true;
  [-1.9, 0, 1.9].forEach((px) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.05, 8), darkMetalMat);
    leg.position.set(px, 0.52, -7.4);
    deadEndGroup.add(leg);
  });
  const deCurb = new THREE.Mesh(new THREE.BoxGeometry(roadWidth + 0.6, 0.22, 0.35), curbMat);
  deCurb.position.set(0, 0.11, -7.65);
  const deWall = new THREE.Mesh(
    new THREE.BoxGeometry(roadWidth + 8, 2.2, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 })
  );
  deWall.position.set(0, 1.1, -8.8);
  deadEndGroup.add(deBar, deCurb, deWall);
  scenarioRoot.add(deadEndGroup);

  // ==================== 5. PEDESTRIAN REFUGE ISLAND (q53, q85) ====================
  const refugeIslandGroup = new THREE.Group();
  refugeIslandGroup.visible = false;
  const riBase = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.2, 3.2), curbMat);
  riBase.position.set(0, 0.1, -5.8);
  riBase.castShadow = true;
  const riNose = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.46, 0.2, 16), curbMat);
  riNose.position.set(0, 0.1, -4.2);
  const riBollard = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.78, 0.24), darkMetalMat);
  riBollard.position.set(0, 0.52, -4.35);
  const riBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), amberGlowMat);
  riBeacon.position.set(0, 1.0, -4.35);
  const riBollardFar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.72, 0.22), darkMetalMat);
  riBollardFar.position.set(0, 0.5, -7.2);
  refugeIslandGroup.add(riBase, riNose, riBollard, riBeacon, riBollardFar);
  scenarioRoot.add(refugeIslandGroup);

  // ==================== 6. 3D CROSSROADS & CROSS-TRAFFIC (q105, q57, q81, q51, q235, q240) ====================
  const crossroadGroup = new THREE.Group();
  crossroadGroup.visible = false;
  const crossAsphalt = new THREE.Mesh(new THREE.PlaneGeometry(28, 4.6), roadMat);
  crossAsphalt.rotation.x = -Math.PI / 2;
  crossAsphalt.position.set(0, 0.011, -5.8);
  crossAsphalt.receiveShadow = true;
  for (let i = -5; i <= 5; i++) {
    const cd = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.12), whiteLineMat);
    cd.rotation.x = -Math.PI / 2;
    cd.position.set(i * 2.3, 0.016, -5.8);
    crossroadGroup.add(cd);
  }
  const giveWayLine = new THREE.Group();
  giveWayLine.visible = false;
  for (let i = 0; i < 6; i++) {
    const d1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.12), whiteLineMat);
    d1.rotation.x = -Math.PI / 2;
    d1.position.set(-1.95 + i * 0.78, 0.016, -3.25);
    const d2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.12), whiteLineMat);
    d2.rotation.x = -Math.PI / 2;
    d2.position.set(-1.95 + i * 0.78, 0.016, -3.5);
    giveWayLine.add(d1, d2);
  }
  const crossCarAObj = makeCompactCar(0xd97706, { headlightsOn: true });
  crossCarAObj.group.rotation.y = -Math.PI / 2; // driving left -> right (+X)
  crossCarAObj.group.position.set(-3.5, 0, -4.8);
  const crossCarBObj = makeCompactCar(0x14b8a6, { headlightsOn: true });
  crossCarBObj.group.rotation.y = Math.PI / 2; // driving right -> left (-X)
  crossCarBObj.group.position.set(4.5, 0, -6.8);
  crossroadGroup.add(crossAsphalt, giveWayLine, crossCarAObj.group, crossCarBObj.group);
  scenarioRoot.add(crossroadGroup);

  // ==================== 7. LEFT SIDE-ROAD JUNCTION & PAINTED ROAD ARROWS ====================
  const sideRoadGroup = new THREE.Group();
  sideRoadGroup.visible = false;
  const srAsphalt = new THREE.Mesh(new THREE.PlaneGeometry(14, 3.8), roadMat);
  srAsphalt.rotation.x = -Math.PI / 2;
  srAsphalt.position.set(-9.2, 0.01, -5.6);
  const srCurbNear = new THREE.Mesh(new THREE.BoxGeometry(14, 0.16, 0.26), curbMat);
  srCurbNear.position.set(-9.4, 0.08, -3.65);
  const srCurbFar = new THREE.Mesh(new THREE.BoxGeometry(14, 0.16, 0.26), curbMat);
  srCurbFar.position.set(-9.4, 0.08, -7.55);
  sideRoadGroup.add(srAsphalt, srCurbNear, srCurbFar);
  scenarioRoot.add(sideRoadGroup);

  const roadArrowGroup = new THREE.Group();
  roadArrowGroup.visible = false;
  const arrowLeftMat = new THREE.MeshBasicMaterial({ map: arrowAheadTex, transparent: true, opacity: 0.92 });
  const arrowRightMat = new THREE.MeshBasicMaterial({ map: arrowAheadTex, transparent: true, opacity: 0.92 });
  const arrowL = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 2.0), arrowLeftMat);
  arrowL.rotation.x = -Math.PI / 2;
  arrowL.position.set(-1.05, 0.017, -4.2);
  const arrowR = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 2.0), arrowRightMat);
  arrowR.rotation.x = -Math.PI / 2;
  arrowR.position.set(1.05, 0.017, -4.2);
  roadArrowGroup.add(arrowL, arrowR);
  scenarioRoot.add(roadArrowGroup);

  // ==================== 8. ONCOMING CAR (with optional HIGH-BEAM GLARE for q39!) ====================
  const oncomingObj = makeCompactCar(0xcbd5e1, { headlightsOn: true, highBeam: true });
  const oncomingCarGroup = oncomingObj.group;
  oncomingCarGroup.visible = false;
  oncomingCarGroup.rotation.y = Math.PI; // faces +Z (toward our car!)
  oncomingCarGroup.position.set(1.05, 0, -10.5);
  scenarioRoot.add(oncomingCarGroup);

  // ==================== 9. 3D OVERPASS BRIDGE / 4.5m HEIGHT LIMIT (q94, q95, q271) ====================
  const bridgeGroup = new THREE.Group();
  bridgeGroup.visible = false;
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
  const bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(14, 0.65, 2.8), concreteMat);
  bridgeDeck.position.set(0, 2.82, -7.2);
  bridgeDeck.castShadow = true;
  const bridgeFascia = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth + 0.8, 0.54),
    new THREE.MeshStandardMaterial({ map: hazardStripeTex, roughness: 0.35 })
  );
  bridgeFascia.position.set(0, 2.78, -5.78);
  [-3.2, 3.2].forEach((bx) => {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.65, 2.6), concreteMat);
    pier.position.set(bx, 1.32, -7.2);
    pier.castShadow = true;
    bridgeGroup.add(pier);
  });
  bridgeGroup.add(bridgeDeck, bridgeFascia);
  scenarioRoot.add(bridgeGroup);

  // ==================== 10. 3D CYCLIST + HK PAINTED CYCLE TRACK ====================
  const cycleTrackMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, roadLen),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 })
  );
  cycleTrackMesh.rotation.x = -Math.PI / 2;
  cycleTrackMesh.position.set(-3.35, 0.008, -8);
  cycleTrackMesh.visible = false;
  scenarioRoot.add(cycleTrackMesh);

  const cyclistGroup = new THREE.Group();
  cyclistGroup.visible = false;
  const bikeWheelGeo = new THREE.TorusGeometry(0.24, 0.032, 8, 18);
  bikeWheelGeo.rotateY(Math.PI / 2);
  const bwF = new THREE.Mesh(bikeWheelGeo, darkMetalMat); bwF.position.set(0, 0.25, -0.42);
  const bwR = new THREE.Mesh(bikeWheelGeo, darkMetalMat); bwR.position.set(0, 0.25, 0.42);
  const bikeFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.24, 0.82),
    new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.35 })
  );
  bikeFrame.position.set(0, 0.44, 0);
  const bikeBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.05), darkMetalMat);
  bikeBar.position.set(0, 0.72, -0.34);
  const riderTorso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.13, 0.32, 6, 8),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 })
  );
  riderTorso.position.set(0, 0.86, 0.06);
  riderTorso.rotation.x = -0.25;
  const riderHelmet = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.35 })
  );
  riderHelmet.position.set(0, 1.2, -0.05);
  cyclistGroup.add(bwF, bwR, bikeFrame, bikeBar, riderTorso, riderHelmet);
  cyclistGroup.position.set(-1.68, 0, -4.6);
  scenarioRoot.add(cyclistGroup);

  // ==================== 11. HK ORANGE SPEED / RED-LIGHT CAMERA (q77) ====================
  const speedCameraGroup = new THREE.Group();
  speedCameraGroup.visible = false;
  const scPole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 2.2, 10), poleMat);
  scPole.position.set(0, 1.1, 0);
  const scBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.62, 0.34),
    new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35 })
  );
  scBox.position.set(0, 2.28, 0);
  scBox.castShadow = true;
  const scLensMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0xffffff, emissiveIntensity: 0.05 });
  const scLens1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 12), scLensMat);
  scLens1.rotation.x = Math.PI / 2;
  scLens1.position.set(0, 2.4, 0.17);
  const scLens2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 12), darkMetalMat);
  scLens2.rotation.x = Math.PI / 2;
  scLens2.position.set(0, 2.16, 0.17);
  speedCameraGroup.add(scPole, scBox, scLens1, scLens2);
  speedCameraGroup.position.set(2.85, 0, -5.6);
  speedCameraGroup.rotation.y = -0.22;
  scenarioRoot.add(speedCameraGroup);

  // ==================== 12. HK POLICE ROADBLOCK / BREATHALYSER CHECKPOINT ====================
  const policeBlockGroup = new THREE.Group();
  policeBlockGroup.visible = false;
  const polCar = new THREE.Group();
  const polBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.42, 2.2),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.25, clearcoat: 0.85 })
  );
  polBody.position.y = 0.42;
  polBody.castShadow = true;
  const polBlueStripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.12, 2.22),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35 })
  );
  polBlueStripe.position.y = 0.44;
  const polRedStripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.11, 0.06, 2.23),
    redPaintMat
  );
  polRedStripe.position.y = 0.35;
  const polCabin = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 1.15), darkMetalMat);
  polCabin.position.set(0, 0.78, 0.05);
  const polBlueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x3b82f6, emissiveIntensity: 2.8 });
  const polRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xef4444, emissiveIntensity: 2.8 });
  const polBL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.16), polRedMat); polBL.position.set(-0.2, 1.0, 0);
  const polBR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.16), polBlueMat); polBR.position.set(0.2, 1.0, 0);
  polCar.add(polBody, polBlueStripe, polRedStripe, polCabin, polBL, polBR);
  addNpcWheels(polCar, 0.52, [-0.68, 0.68]);
  polCar.position.set(0.85, 0, -5.8);
  polCar.rotation.y = 0.42;
  policeBlockGroup.add(polCar);
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Group();
    const cb = new THREE.Mesh(coneBaseGeo, coneOrangeMat); cb.position.y = 0.02;
    const co = new THREE.Mesh(coneBodyGeo, coneOrangeMat); co.position.y = 0.2;
    const cs = new THREE.Mesh(coneBandGeo, coneStripeMat); cs.position.y = 0.22;
    c.add(cb, co, cs);
    c.position.set(-1.65 + i * 0.78, 0, -3.8);
    policeBlockGroup.add(c);
  }
  scenarioRoot.add(policeBlockGroup);

  // ==================== 13. SLIPPERY / GRAVEL / FLOODWATER / FALLEN CARGO ====================
  const slipperyPatchGroup = new THREE.Group();
  slipperyPatchGroup.visible = false;
  const slickMesh = new THREE.Mesh(
    new THREE.CircleGeometry(1.75, 24),
    new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.06,
      metalness: 0.35,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.72
    })
  );
  slickMesh.rotation.x = -Math.PI / 2;
  slickMesh.scale.set(1.15, 2.2, 1);
  slickMesh.position.set(-0.3, 0.015, -5.2);
  slipperyPatchGroup.add(slickMesh);
  scenarioRoot.add(slipperyPatchGroup);

  const gravelPatchGroup = new THREE.Group();
  gravelPatchGroup.visible = false;
  const gravelBase = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth - 0.5, 5.2),
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.98 })
  );
  gravelBase.rotation.x = -Math.PI / 2;
  gravelBase.position.set(0, 0.014, -5.2);
  gravelPatchGroup.add(gravelBase);
  const stoneGeo = new THREE.DodecahedronGeometry(0.065, 0);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.95 });
  for (let i = 0; i < 28; i++) {
    const st = new THREE.Mesh(stoneGeo, stoneMat);
    const rx = ((i * 73) % 100) / 100 * 3.6 - 1.8;
    const rz = -2.8 - ((i * 41) % 100) / 100 * 4.8;
    st.position.set(rx, 0.04, rz);
    st.rotation.set(i, i * 0.7, 0);
    gravelPatchGroup.add(st);
  }
  scenarioRoot.add(gravelPatchGroup);

  const floodWaterMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth - 0.1, roadLen),
    new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      roughness: 0.1,
      metalness: 0.25,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.44
    })
  );
  floodWaterMesh.rotation.x = -Math.PI / 2;
  floodWaterMesh.position.set(0, 0.02, -8);
  floodWaterMesh.visible = false;
  scenarioRoot.add(floodWaterMesh);

  const obstacleBoxGroup = new THREE.Group();
  obstacleBoxGroup.visible = false;
  const crateMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 });
  const crate1 = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.54, 0.68), crateMat);
  crate1.position.set(-0.95, 0.27, -5.6);
  crate1.rotation.y = 0.35;
  crate1.castShadow = true;
  const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.34, 0.45), crateMat);
  crate2.position.set(-0.32, 0.17, -6.1);
  crate2.rotation.y = -0.4;
  obstacleBoxGroup.add(crate1, crate2);
  scenarioRoot.add(obstacleBoxGroup);

  // ==================== 14. EXPRESSWAY SLIP-ROAD EXIT + 300m/200m/100m COUNTDOWN ====================
  const slipRoadGroup = new THREE.Group();
  slipRoadGroup.visible = false;
  const slipDeck = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 15), roadMat);
  slipDeck.rotation.x = -Math.PI / 2;
  slipDeck.rotation.z = 0.26;
  slipDeck.position.set(-4.0, 0.01, -9.8);
  const goreMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 4.6),
    new THREE.MeshBasicMaterial({ map: chevronHatchTex, transparent: true, opacity: 0.9 })
  );
  goreMesh.rotation.x = -Math.PI / 2;
  goreMesh.position.set(-2.35, 0.016, -6.8);
  slipRoadGroup.add(slipDeck, goreMesh);
  [3, 2, 1].forEach((bars, idx) => {
    const postG = new THREE.Group();
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 1.3, 8), poleMat);
    p.position.y = 0.65;
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.72, 0.04),
      new THREE.MeshStandardMaterial({ map: countdownTex(bars), roughness: 0.4 })
    );
    b.position.y = 1.12;
    postG.add(p, b);
    postG.position.set(-2.75 - idx * 0.4, 0, -4.6 - idx * 3.4);
    slipRoadGroup.add(postG);
  });
  scenarioRoot.add(slipRoadGroup);

  // ==================== 15. HOSPITAL + RESTRICTED BOLLARD GATE + HK CITY SKYLINE ====================
  const hospitalGroup = new THREE.Group();
  hospitalGroup.visible = false;
  const hospBldg = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 3.8, 4.4),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55 })
  );
  hospBldg.position.set(0, 1.9, 0);
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.25, 0.1), redPaintMat);
  crossV.position.set(0, 2.25, 2.24);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.34, 0.1), redPaintMat);
  crossH.position.set(0, 2.25, 2.24);
  hospitalGroup.add(hospBldg, crossV, crossH);
  hospitalGroup.position.set(-5.2, 0, -7.8);
  hospitalGroup.rotation.y = 0.24;
  scenarioRoot.add(hospitalGroup);

  const bollardGateGroup = new THREE.Group();
  bollardGateGroup.visible = false;
  const bollardStripeMat = new THREE.MeshStandardMaterial({ map: redWhiteBarTex, roughness: 0.4 });
  for (let i = 0; i < 5; i++) {
    const bol = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.82, 10), bollardStripeMat);
    bol.position.set(-1.7 + i * 0.85, 0.41, -6.2);
    bol.castShadow = true;
    bollardGateGroup.add(bol);
  }
  scenarioRoot.add(bollardGateGroup);

  const cityBuildingsGroup = new THREE.Group();
  cityBuildingsGroup.visible = false;
  const bldgColors = [0xdbeafe, 0xe2e8f0, 0xfef3c7, 0xcbd5e1, 0xd1fae5];
  const winMat = new THREE.MeshStandardMaterial({ color: 0x334155, emissive: 0xfde68a, emissiveIntensity: 0.25, roughness: 0.3 });
  for (let i = 0; i < 8; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const h = 3.2 + (i % 3) * 1.45;
    const z = -4.5 - Math.floor(i / 2) * 5.6;
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, h, 3.6),
      new THREE.MeshStandardMaterial({ color: bldgColors[i % bldgColors.length], roughness: 0.82 })
    );
    b.position.set(side * 6.8, h / 2, z);
    const wBand = new THREE.Mesh(new THREE.BoxGeometry(2.84, h * 0.65, 2.8), winMat);
    wBand.position.set(side * 6.8, h * 0.56, z);
    cityBuildingsGroup.add(b, wBand);
  }
  scenarioRoot.add(cityBuildingsGroup);

  // ==================== 16. AUTHENTIC HK ROAD USERS: MOTORCYCLE, TAXI, LORRY, PARKED ROW, ANIMAL ====================
  const motorcycleGroup = new THREE.Group();
  motorcycleGroup.visible = false;
  const mcTireGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 14);
  mcTireGeo.rotateZ(Math.PI / 2);
  const mcWF = new THREE.Mesh(mcTireGeo, darkMetalMat); mcWF.position.set(0, 0.22, -0.52);
  const mcWR = new THREE.Mesh(mcTireGeo, darkMetalMat); mcWR.position.set(0, 0.22, 0.52);
  const mcBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.34, 1.15),
    new THREE.MeshPhysicalMaterial({ color: 0xe11d48, roughness: 0.25, clearcoat: 0.8 })
  );
  mcBody.position.set(0, 0.45, 0);
  const mcTail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.05), npcTailMat);
  mcTail.position.set(0, 0.52, 0.6);
  const mcRider = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.34, 6, 8), darkMetalMat);
  mcRider.position.set(0, 0.85, 0.06);
  const mcHelm = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), whitePaintMat);
  mcHelm.position.set(0, 1.2, 0.02);
  motorcycleGroup.add(mcWF, mcWR, mcBody, mcTail, mcRider, mcHelm);
  motorcycleGroup.position.set(-0.62, 0, -4.6); // authentic HK right-of-left-lane motorcycle position!
  scenarioRoot.add(motorcycleGroup);

  const taxiGroup = new THREE.Group();
  taxiGroup.visible = false;
  const txLower = new THREE.Mesh(
    new THREE.BoxGeometry(1.04, 0.36, 2.15),
    new THREE.MeshPhysicalMaterial({ color: 0xdc2626, roughness: 0.25, clearcoat: 0.85 })
  );
  txLower.position.y = 0.38;
  txLower.castShadow = true;
  const txRoof = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.32, 1.1),
    new THREE.MeshPhysicalMaterial({ color: 0xe2e8f0, roughness: 0.28, metalness: 0.35 })
  );
  txRoof.position.set(0, 0.7, 0.05);
  const txSign = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.11, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfffbeb, emissiveIntensity: 2.0 })
  );
  txSign.position.set(0, 0.92, 0.02);
  [-0.34, 0.34].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), npcTailMat);
    tl.position.set(tx, 0.42, 1.09);
    taxiGroup.add(tl);
  });
  taxiGroup.add(txLower, txRoof, txSign);
  addNpcWheels(taxiGroup, 0.51, [-0.66, 0.66]);
  taxiGroup.position.set(-1.05, 0, -4.8);
  scenarioRoot.add(taxiGroup);

  const lorryGroup = new THREE.Group();
  lorryGroup.visible = false;
  const lorBox = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 1.48, 3.1),
    new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 })
  );
  lorBox.position.set(0, 1.08, 0.25);
  lorBox.castShadow = true;
  const lorCab = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.05, 1.15),
    new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.35 })
  );
  lorCab.position.set(0, 0.86, -1.9);
  lorryGroup.add(lorBox, lorCab);
  addNpcWheels(lorryGroup, 0.64, [-1.9, 0.1, 1.25]);
  [-0.44, 0.44].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.11, 0.05), npcTailMat);
    tl.position.set(tx, 0.48, 1.82);
    lorryGroup.add(tl);
  });
  // Optional overhanging cargo pole + 1m^2 bright red warning flag (q174/q175!)
  const lorryFlagGroup = new THREE.Group();
  lorryFlagGroup.visible = false;
  const overhangBeam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 1.35), new THREE.MeshStandardMaterial({ color: 0x92400e }));
  overhangBeam.position.set(0, 0.92, 2.35);
  const redFlag = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.4, side: THREE.DoubleSide }));
  redFlag.position.set(0, 0.64, 2.98);
  lorryFlagGroup.add(overhangBeam, redFlag);
  lorryGroup.add(lorryFlagGroup);
  // Optional towed car + taut white tow rope (q173!)
  const towGroup = new THREE.Group();
  towGroup.visible = false;
  const towRope = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.4, 8), whitePaintMat);
  towRope.rotation.x = Math.PI / 2;
  towRope.position.set(0, 0.34, 2.95);
  const towedSedan = makeCompactCar(0x94a3b8);
  towedSedan.group.position.set(0, 0, 4.95);
  towGroup.add(towRope, towedSedan.group);
  lorryGroup.add(towGroup);
  lorryGroup.position.set(-1.05, 0, -7.2);
  scenarioRoot.add(lorryGroup);

  const parkedCarsGroup = new THREE.Group();
  parkedCarsGroup.visible = false;
  const pcColors = [0x64748b, 0x0f766e, 0xd97706];
  for (let i = 0; i < 3; i++) {
    const pc = makeCompactCar(pcColors[i]);
    pc.group.position.set(-1.62, 0, -3.8 - i * 3.4);
    parkedCarsGroup.add(pc.group);
  }
  scenarioRoot.add(parkedCarsGroup);

  const animalGroup = new THREE.Group();
  animalGroup.visible = false;
  const horseMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
  const hBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.95), horseMat); hBody.position.set(0, 0.72, 0);
  const hNeck = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.46, 0.24), horseMat); hNeck.position.set(0, 1.02, -0.36); hNeck.rotation.x = 0.35;
  const hHead = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.36), horseMat); hHead.position.set(0, 1.2, -0.5);
  [[-0.14, -0.32], [0.14, -0.32], [-0.14, 0.32], [0.14, 0.32]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.55, 0.1), horseMat);
    leg.position.set(lx, 0.27, lz);
    animalGroup.add(leg);
  });
  animalGroup.add(hBody, hNeck, hHead);
  animalGroup.position.set(-1.95, 0, -5.6);
  animalGroup.rotation.y = 0.4;
  scenarioRoot.add(animalGroup);

  // ==================== 17. HIGHWAY MARKINGS, 3-LANE, JTI LED, HAZARD POSTS, SPEED 50, BAY ====================
  const threeLaneGroup = new THREE.Group();
  threeLaneGroup.visible = false;
  const extraLane = new THREE.Mesh(new THREE.PlaneGeometry(2.4, roadLen), roadMat);
  extraLane.rotation.x = -Math.PI / 2;
  extraLane.position.set(3.45, 0.002, -8);
  const thirdBarrier = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.55, roadLen), curbMat);
  thirdBarrier.position.set(4.7, 0.27, -8);
  for (let i = 0; i < 16; i++) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 1.05), whiteLineMat);
    d.rotation.x = -Math.PI / 2;
    d.position.set(2.25, 0.012, 4 - i * 2.4);
    threeLaneGroup.add(d);
  }
  threeLaneGroup.add(extraLane, thirdBarrier);
  scenarioRoot.add(threeLaneGroup);

  const chevronHatchMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 14),
    new THREE.MeshBasicMaterial({ map: chevronHatchTex, transparent: true, opacity: 0.92 })
  );
  chevronHatchMesh.rotation.x = -Math.PI / 2;
  chevronHatchMesh.position.set(0, 0.015, -6.5);
  chevronHatchMesh.visible = false;
  scenarioRoot.add(chevronHatchMesh);

  const yellowBarsGroup = new THREE.Group();
  yellowBarsGroup.visible = false;
  const barZs = [-1.25, -2.25, -3.1, -3.8, -4.35, -4.8]; // progressively tighter right ahead of roundabout!
  for (const bz of barZs) {
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth - 0.55, 0.24), yellowPaintMat);
    bar.rotation.x = -Math.PI / 2;
    bar.position.set(0, 0.025, bz);
    yellowBarsGroup.add(bar);
  }
  scenarioRoot.add(yellowBarsGroup);

  const jtiBoardGroup = new THREE.Group();
  jtiBoardGroup.visible = false;
  const jtiL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.0, 8), poleMat); jtiL.position.set(-2.9, 1.5, -6.8);
  const jtiR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.0, 8), poleMat); jtiR.position.set(2.9, 1.5, -6.8);
  const jtiFace = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 1.18, 0.16),
    new THREE.MeshStandardMaterial({ map: jtiBoardTex, emissive: 0xffffff, emissiveMap: jtiBoardTex, emissiveIntensity: 0.85, roughness: 0.25 })
  );
  jtiFace.position.set(0, 2.55, -6.8);
  jtiBoardGroup.add(jtiL, jtiR, jtiFace);
  scenarioRoot.add(jtiBoardGroup);

  const hazardPostsGroup = new THREE.Group();
  hazardPostsGroup.visible = false;
  const hpRedMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.6 });
  const hpWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.4 });
  const hpAmberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.6 });
  for (let i = 0; i < 4; i++) {
    const z = -2.8 - i * 2.8;
    const pL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.1), darkMetalMat); pL.position.set(-2.58, 0.36, z);
    const rL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.12), hpRedMat); rL.position.set(-2.58, 0.56, z);
    const pR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.1), darkMetalMat); pR.position.set(2.58, 0.36, z);
    const rR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.12), i % 2 === 0 ? hpWhiteMat : hpAmberMat); rR.position.set(2.58, 0.56, z);
    hazardPostsGroup.add(pL, rL, pR, rR);
  }
  scenarioRoot.add(hazardPostsGroup);

  const chevronCurveGroup = new THREE.Group();
  chevronCurveGroup.visible = false;
  const chevMat = new THREE.MeshStandardMaterial({ map: chevronCurveTex, roughness: 0.35 });
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.08), chevMat);
    b.position.set(-2.72, 1.05, -4.4 - i * 2.1);
    b.rotation.y = 0.22 + i * 0.08;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.9, 8), poleMat);
    leg.position.set(-2.72, 0.45, -4.4 - i * 2.1);
    chevronCurveGroup.add(b, leg);
  }
  scenarioRoot.add(chevronCurveGroup);

  const roadSpeed50Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 2.2),
    new THREE.MeshBasicMaterial({ map: speed50Tex, transparent: true, opacity: 0.92 })
  );
  roadSpeed50Mesh.rotation.x = -Math.PI / 2;
  roadSpeed50Mesh.position.set(-1.05, 0.017, -4.4);
  roadSpeed50Mesh.visible = false;
  scenarioRoot.add(roadSpeed50Mesh);

  const parkingBayGroup = new THREE.Group();
  parkingBayGroup.visible = false;
  const bayFront = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.1), whiteLineMat); bayFront.rotation.x = -Math.PI / 2; bayFront.position.set(-1.42, 0.015, -1.35);
  const bayRear = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.1), whiteLineMat); bayRear.rotation.x = -Math.PI / 2; bayRear.position.set(-1.42, 0.015, 1.85);
  const baySide = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 3.2), whiteLineMat); baySide.rotation.x = -Math.PI / 2; baySide.position.set(-0.62, 0.015, 0.25);
  parkingBayGroup.add(bayFront, bayRear, baySide);
  scenarioRoot.add(parkingBayGroup);

  // ==================== RESET ALL ====================
  function resetAll() {
    dualEndGroup.visible = false;
    narrowRoadGroup.visible = false;
    passingPlaceGroup.visible = false;
    deadEndGroup.visible = false;
    refugeIslandGroup.visible = false;
    crossroadGroup.visible = false;
    giveWayLine.visible = false;
    crossCarAObj.group.visible = true;
    crossCarBObj.group.visible = false;
    sideRoadGroup.visible = false;
    roadArrowGroup.visible = false;
    arrowL.visible = true;
    arrowR.visible = false;
    oncomingCarGroup.visible = false;
    oncomingCarGroup.position.set(1.05, 0, -10.5);
    if (oncomingObj.glareCones) oncomingObj.glareCones.visible = false;
    bridgeGroup.visible = false;
    bridgeGroup.position.set(0, 0, 0);
    bridgeFascia.visible = true;
    cycleTrackMesh.visible = false;
    cyclistGroup.visible = false;
    cyclistGroup.position.set(-1.68, 0, -4.6);
    speedCameraGroup.visible = false;
    speedCameraGroup.position.set(2.85, 0, -5.6);
    policeBlockGroup.visible = false;
    slipperyPatchGroup.visible = false;
    gravelPatchGroup.visible = false;
    floodWaterMesh.visible = false;
    obstacleBoxGroup.visible = false;
    slipRoadGroup.visible = false;
    hospitalGroup.visible = false;
    bollardGateGroup.visible = false;
    cityBuildingsGroup.visible = false;
    motorcycleGroup.visible = false;
    taxiGroup.visible = false;
    lorryGroup.visible = false;
    lorryFlagGroup.visible = false;
    towGroup.visible = false;
    parkedCarsGroup.visible = false;
    animalGroup.visible = false;
    threeLaneGroup.visible = false;
    chevronHatchMesh.visible = false;
    yellowBarsGroup.visible = false;
    jtiBoardGroup.visible = false;
    hazardPostsGroup.visible = false;
    chevronCurveGroup.visible = false;
    roadSpeed50Mesh.visible = false;
    parkingBayGroup.visible = false;
  }

  // ==================== PER-FRAME ANIMATION (ZERO ALLOCATIONS) ====================
  function animate(dt, elapsed, { roadSpeed }) {
    if (oncomingCarGroup.visible) {
      // Oncoming vehicle approaches toward +Z (relative speed = our roadSpeed + oncoming speed)
      const rel = Math.max(3.5, Math.abs(roadSpeed) + 3.8);
      oncomingCarGroup.position.z += rel * dt;
      if (oncomingCarGroup.position.z > 4.2) oncomingCarGroup.position.z = -16.5;
    }
    if (crossroadGroup.visible) {
      if (crossCarAObj.group.visible) {
        crossCarAObj.group.position.x += 4.2 * dt;
        if (crossCarAObj.group.position.x > 8.5) crossCarAObj.group.position.x = -8.5;
      }
      if (crossCarBObj.group.visible) {
        crossCarBObj.group.position.x -= 4.2 * dt;
        if (crossCarBObj.group.position.x < -8.5) crossCarBObj.group.position.x = 8.5;
      }
    }
    if (policeBlockGroup.visible) {
      const alt = Math.floor(elapsed * 6.5) % 2 === 0;
      polRedMat.emissiveIntensity = alt ? 3.2 : 0.2;
      polBlueMat.emissiveIntensity = alt ? 0.2 : 3.2;
    }
    if (speedCameraGroup.visible) {
      const flash = (elapsed % 2.4) < 0.14;
      scLensMat.emissiveIntensity = flash ? 3.5 : 0.08;
    }
    if (cyclistGroup.visible) {
      cyclistGroup.position.y = Math.abs(Math.sin(elapsed * 7.5)) * 0.025;
      cyclistGroup.position.z = -4.6 + Math.sin(elapsed * 0.85) * 0.45;
    }
    if (motorcycleGroup.visible) {
      motorcycleGroup.position.z = -4.6 + Math.sin(elapsed * 1.1) * 0.35;
    }
    if (taxiGroup.visible) {
      taxiGroup.position.z = -4.8 + Math.sin(elapsed * 0.9) * 0.4;
    }
    if (lorryGroup.visible) {
      lorryGroup.position.z = -7.2 + Math.sin(elapsed * 0.6) * 0.45;
    }
    if (animalGroup.visible) {
      animalGroup.position.x = -1.95 + Math.sin(elapsed * 0.7) * 0.35;
    }
    if (Math.abs(roadSpeed) > 0.05) {
      if (bridgeGroup.visible) {
        let bz = bridgeGroup.position.z + roadSpeed * dt;
        if (bz > 7.5) bz = -14.0;
        bridgeGroup.position.z = bz;
      }
      if (roadSpeed50Mesh.visible) {
        let sz = roadSpeed50Mesh.position.z + roadSpeed * dt;
        if (sz > 3.5) sz = -13.5;
        roadSpeed50Mesh.position.z = sz;
      }
    }
  }

  return {
    resetAll,
    animate,
    textures: {
      arrowAheadTex,
      arrowLeftTex,
      gantryColorsTex,
      gantryTempTex,
      gantryHarbourTex
    },
    groups: {
      dualEndGroup,
      narrowRoadGroup,
      passingPlaceGroup,
      deadEndGroup,
      refugeIslandGroup,
      crossroadGroup,
      giveWayLine,
      crossCarA: crossCarAObj.group,
      crossCarB: crossCarBObj.group,
      sideRoadGroup,
      roadArrowGroup,
      arrowL,
      arrowR,
      arrowLeftMat,
      arrowRightMat,
      oncomingCarGroup,
      oncomingGlare: oncomingObj.glareCones,
      bridgeGroup,
      bridgeFascia,
      cycleTrackMesh,
      cyclistGroup,
      speedCameraGroup,
      policeBlockGroup,
      slipperyPatchGroup,
      gravelPatchGroup,
      floodWaterMesh,
      obstacleBoxGroup,
      slipRoadGroup,
      hospitalGroup,
      bollardGateGroup,
      cityBuildingsGroup,
      motorcycleGroup,
      taxiGroup,
      lorryGroup,
      lorryFlagGroup,
      towGroup,
      parkedCarsGroup,
      animalGroup,
      threeLaneGroup,
      chevronHatchMesh,
      yellowBarsGroup,
      jtiBoardGroup,
      hazardPostsGroup,
      chevronCurveGroup,
      roadSpeed50Mesh,
      parkingBayGroup
    }
  };
}
