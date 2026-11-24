// 1TakePass — Core Engine, SVG Icon System, Leitner SRS & Supabase Cloud Sync
// Hardened with mblode/agent-skills (ui-design, ui-animation, typography-audit, tidy)
(() => {
  "use strict";

  const SUPABASE_URL = "https://zwrnjqzagbepowsiwzyf.supabase.co";
  const SUPABASE_KEY = "sb_publishable_H29ZE872GW5lh5jo41_m3w_9uiX-Ah1";

  const EXAM_LEN = 20;
  const PASS_MIN = 16;

  const BOX_INTERVAL_HOURS = { 0: 0, 1: 0.17, 2: 24, 3: 72, 4: 168, 5: 720 };
  const BOX_META = [
    { cls: "b0", title: "待擊破", sub: "即時重溫" },
    { cls: "b1", title: "新記憶", sub: "10 分鐘" },
    { cls: "b2", title: "鞏固中", sub: "1 天" },
    { cls: "b3", title: "熟手中", sub: "3–7 天" },
    { cls: "b4", title: "已牢記", sub: "永久掌握" }
  ];

  // Uniform 24x24 geometric outline SVG icons (Zero emojis)
  const svgIcon = (inner, cls = "ic") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    home: svgIcon(`<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/>`),
    bookX: svgIcon(`<path d="M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m10 8 4 4m0-4-4 4"/>`),
    columns: svgIcon(`<rect x="3" y="4" width="7.5" height="16" rx="1.5"/><rect x="13.5" y="4" width="7.5" height="16" rx="1.5"/>`),
    chart: svgIcon(`<path d="M4 20h16"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-8"/>`),
    play: svgIcon(`<polygon points="6 4 19 12 6 20 6 4"/>`),
    refresh: svgIcon(`<path d="M20 12a8 8 0 1 1-2.3-5.6L20 8"/><path d="M20 4v4h-4"/>`),
    alertTri: svgIcon(`<path d="M12 3 2.5 19.5h19L12 3Z"/><path d="M12 9.5v4"/><circle cx="12" cy="16.5" r="0.6" fill="currentColor"/>`),
    fileText: svgIcon(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>`),
    alertCircle: svgIcon(`<circle cx="12" cy="12" r="9.5"/><path d="M12 8v4.5"/><circle cx="12" cy="16" r="0.6" fill="currentColor"/>`),
    target: svgIcon(`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>`),
    chevLeft: svgIcon(`<path d="m15 18-6-6 6-6"/>`),
    flame: svgIcon(`<path d="M12 3c2 3 6 5.5 6 10a6 6 0 1 1-12 0c0-2.5 1.3-4.6 3-6 0 2 1.2 3 2.5 3 .4-2.4-.5-5 .5-7Z"/>`),
    x: svgIcon(`<path d="M18 6 6 18M6 6l12 12"/>`),
    sun: svgIcon(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`),
    moon: svgIcon(`<path d="M20 14.5A8 8 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>`),
    volOn: svgIcon(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a8.5 8.5 0 0 1 0 12"/>`),
    volOff: svgIcon(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="m22 9-6 6M16 9l6 6"/>`),
    shield: svgIcon(`<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z"/>`),
    gauge: svgIcon(`<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="m12 13 4-4"/>`),
    route: svgIcon(`<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h5a3.5 3.5 0 0 0 0-7h-3a3.5 3.5 0 0 1 0-7h5"/>`),
    parking: svgIcon(`<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9.5 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>`),
    traffic: svgIcon(`<rect x="7" y="2.5" width="10" height="19" rx="3"/><circle cx="12" cy="7" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="17" r="1.6"/>`),
    heart: svgIcon(`<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>`),
    checkCircle: svgIcon(`<circle cx="12" cy="12" r="9.5"/><path d="m8.5 12.2 2.3 2.3 4.8-5"/>`),
    sparkles: svgIcon(`<path d="m12 3 1.8 4.8L18.5 9.5l-4.7 1.7L12 16l-1.8-4.8L5.5 9.5l4.7-1.7L12 3Z"/><path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"/>`),
    book: svgIcon(`<path d="M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>`),
    award: svgIcon(`<circle cx="12" cy="9" r="5.5"/><path d="m9 14-1.5 7L12 18.5 16.5 21 15 14"/>`),
    zap: svgIcon(`<polygon points="13 2 4 14 11.5 14 10.5 22 20 10 12.5 10 13 2"/>`),
    trophy: svgIcon(`<path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/><path d="M12 14v5M8 20h8"/>`),
    crown: svgIcon(`<path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4L3 18Z"/>`),
    brain: svgIcon(`<path d="M9.5 4.5a3.5 3.5 0 0 0-3.5 3.5c0 .7.2 1.3.5 1.8A3.5 3.5 0 0 0 7 16.5a3 3 0 0 0 5 1.5V4.5a2.5 2.5 0 0 0-2.5 0Z"/><path d="M14.5 4.5A3.5 3.5 0 0 1 18 8c0 .7-.2 1.3-.5 1.8A3.5 3.5 0 0 1 17 16.5a3 3 0 0 1-5 1.5V4.5a2.5 2.5 0 0 1 2.5 0Z"/>`)
  };

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const key = el.dataset.icon;
      if (ICONS[key]) el.innerHTML = ICONS[key];
    });
  }

  // ==================== STATE ====================
  let db = null;
  let realtimeChannel = null;
  let lastSyncFetchAt = 0;
  let profileId = localStorage.getItem("onetake_profile") || "default";
  let soundOn = localStorage.getItem("onetake_sound") !== "off";
  let revealAtEndPref = localStorage.getItem("onetake_reveal_end") === "1";
  let progressMap = {};
  let stats = { total_answered: 0, total_correct: 0, best_combo: 0, current_combo: 0, exams_passed: 0, xp: 0 };
  let examHistory = [];
  let syncState = { ok: null, text: "同步中" };

  let session = null;
  let summaryFilter = "all";
  let mistakeFilter = "active";
  let lastEmotionText = "";
  let noticeTimer = null;
  let lastFocusedEl = null;

  const Q_BY_ID = Object.fromEntries(window.QUESTIONS.map((q) => [q.id, q]));
  const $ = (id) => document.getElementById(id);
  const esc = (str) =>
    String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // ==================== IN-PLACE NOTICE (NO BLOCKING ALERT) ====================
  function clearNotice() {
    if (noticeTimer) {
      clearTimeout(noticeTimer);
      noticeTimer = null;
    }
    const el = $("app-notice");
    if (!el) return;
    el.hidden = true;
    el.innerHTML = "";
  }

  function showNotice(message, { ctaText, onCta, duration = 6500 } = {}) {
    const el = $("app-notice");
    if (!el) return;
    clearNotice();
    el.innerHTML = `
      <span>${esc(message)}</span>
      <span class="notice-actions">
        ${ctaText ? `<button type="button" class="btn btn-primary btn-sm" id="btn-notice-cta">${esc(ctaText)}</button>` : ""}
        <button type="button" class="icon-btn" id="btn-notice-close" aria-label="關閉提示">${ICONS.x}</button>
      </span>`;
    el.hidden = false;
    const closeBtn = $("btn-notice-close");
    if (closeBtn) closeBtn.onclick = clearNotice;
    const ctaBtn = $("btn-notice-cta");
    if (ctaBtn && typeof onCta === "function") {
      ctaBtn.onclick = () => {
        clearNotice();
        onCta();
      };
    }
    if (duration > 0) {
      noticeTimer = setTimeout(clearNotice, duration);
    }
  }

  // ==================== AUDIO & CONFETTI ====================
  let audioCtx = null;
  function playTone(kind, combo = 1) {
    if (!soundOn) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      const beep = (freq, start, dur, vol = 0.07, type = "triangle") => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(vol, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };
      if (kind === "correct") {
        const base = 523.25 * Math.pow(2, Math.min(combo - 1, 7) / 12);
        beep(base, now, 0.14);
        beep(base * 1.25, now + 0.07, 0.2);
        if (combo >= 3) beep(base * 1.5, now + 0.13, 0.24, 0.065, "sine");
      } else if (kind === "redeemed") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => beep(f, now + i * 0.065, 0.2));
      } else if (kind === "wrong") {
        beep(300, now, 0.12, 0.045, "sine");
        beep(260, now + 0.1, 0.16, 0.04, "sine");
      } else if (kind === "pass") {
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => beep(f, now + i * 0.08, 0.3));
      }
    } catch (err) {
      console.warn("Audio feedback unavailable:", err);
    }
  }

  function burstConfetti(count = 22) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = $("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#007a4d", "#10b981", "#005eb8", "#b45309", "#c81e1e"];
    const pieces = Array.from({ length: count }, () => ({
      x: canvas.width * (0.28 + Math.random() * 0.44),
      y: canvas.height * 0.28,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 9 - 2.5,
      size: 5 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.22,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1
    }));
    let frame = 0;
    (function tick() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.32;
        p.rot += p.vrot;
        p.life -= 0.018;
        if (p.life > 0) {
          alive++;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      }
      if (alive > 0 && frame < 80) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    })();
  }

  // ==================== STORAGE & SUPABASE ====================
  const cacheKey = (k) => `onetake_${profileId}_${k}`;

  function loadLocalCache() {
    try {
      progressMap = JSON.parse(localStorage.getItem(cacheKey("progress")) || "{}");
      const s = JSON.parse(localStorage.getItem(cacheKey("stats")) || "null");
      if (s) stats = { ...stats, ...s };
      examHistory = JSON.parse(localStorage.getItem(cacheKey("exams")) || "[]");
    } catch (err) {
      console.warn("Local cache reset due to parse error:", err);
      progressMap = {};
      examHistory = [];
    }
  }

  function saveLocalCache() {
    try {
      localStorage.setItem(cacheKey("progress"), JSON.stringify(progressMap));
      localStorage.setItem(cacheKey("stats"), JSON.stringify(stats));
      localStorage.setItem(cacheKey("exams"), JSON.stringify(examHistory.slice(0, 40)));
    } catch (err) {
      console.warn("Local storage quota/write warning:", err);
    }
  }

  function setSyncUI(ok, text) {
    syncState = { ok, text };
    const dot = $("sync-dot");
    if (dot) {
      dot.classList.toggle("is-online", ok === true);
      dot.classList.toggle("is-error", ok === false);
    }
    if ($("sync-label")) $("sync-label").textContent = text;
    if ($("footer-sync-note")) $("footer-sync-note").textContent = ` · 代號 ${profileId}`;
    if ($("sync-status-detail")) {
      $("sync-status-detail").innerHTML =
        `狀態：<strong>${esc(text)}</strong> · 代號：<code>${esc(profileId)}</code> · 已追蹤：<strong class="tnum">${Object.keys(progressMap).length} / ${window.QUESTIONS.length}</strong>`;
    }
  }

  function subscribeRealtime() {
    if (!db) return;
    if (realtimeChannel) {
      db.removeChannel(realtimeChannel);
      realtimeChannel = null;
    }
    try {
      realtimeChannel = db
        .channel(`onetake-prog-${profileId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "onetake_progress",
            filter: `profile_id=eq.${profileId}`
          },
          (payload) => {
            const row = payload.new;
            if (!row || !row.question_id) return;
            const local = progressMap[row.question_id];
            if (!local || new Date(row.updated_at) >= new Date(local.updated_at || 0)) {
              progressMap[row.question_id] = row;
              saveLocalCache();
              if ($("view-quiz").hidden) renderAll();
              else setSyncUI(true, "已同步");
            }
          }
        )
        .subscribe();
    } catch (err) {
      console.warn("Realtime subscription unavailable:", err);
    }
  }

  async function initSupabaseAndLoad({ silent = false } = {}) {
    if (!silent) {
      loadLocalCache();
      renderAll();
    }
    if (!window.supabase) {
      setSyncUI(false, "離線本機");
      return;
    }
    try {
      if (!db) db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      if (!silent) setSyncUI(null, "同步中");
      lastSyncFetchAt = Date.now();
      const [progRes, statsRes, examRes] = await Promise.all([
        db.from("onetake_progress").select("*").eq("profile_id", profileId),
        db.from("onetake_stats").select("*").eq("profile_id", profileId).maybeSingle(),
        db.from("onetake_exams").select("*").eq("profile_id", profileId).order("created_at", { ascending: false }).limit(30)
      ]);
      if (progRes.error || statsRes.error || examRes.error) {
        throw progRes.error || statsRes.error || examRes.error;
      }

      const merged = { ...progressMap };
      for (const row of progRes.data || []) {
        const local = merged[row.question_id];
        if (!local || new Date(row.updated_at) >= new Date(local.updated_at || 0)) merged[row.question_id] = row;
      }
      progressMap = merged;

      if (statsRes.data) {
        stats = {
          total_answered: Math.max(stats.total_answered || 0, statsRes.data.total_answered || 0),
          total_correct: Math.max(stats.total_correct || 0, statsRes.data.total_correct || 0),
          best_combo: Math.max(stats.best_combo || 0, statsRes.data.best_combo || 0),
          current_combo: statsRes.data.current_combo || 0,
          exams_passed: Math.max(stats.exams_passed || 0, statsRes.data.exams_passed || 0),
          xp: Math.max(stats.xp || 0, statsRes.data.xp || 0)
        };
      }
      if (examRes.data) examHistory = examRes.data;
      saveLocalCache();
      setSyncUI(true, "已同步");
      if (!silent || $("view-quiz").hidden) renderAll();
      if (!silent) subscribeRealtime();
    } catch (err) {
      console.warn("Supabase fallback:", err);
      setSyncUI(false, "離線本機");
    }
  }

  async function syncQuestionProgress(rec) {
    saveLocalCache();
    if (!db) return false;
    try {
      const { error } = await db.from("onetake_progress").upsert({
        profile_id: profileId,
        question_id: rec.question_id,
        attempts: rec.attempts,
        correct_count: rec.correct_count,
        wrong_count: rec.wrong_count,
        box: rec.box,
        streak: rec.streak,
        last_result: rec.last_result,
        last_selected_option: rec.last_selected_option,
        mistake_reason: rec.mistake_reason || null,
        personal_note: rec.personal_note || null,
        next_review_at: rec.next_review_at,
        last_answered_at: rec.last_answered_at,
        updated_at: rec.updated_at
      }, { onConflict: "profile_id,question_id" });
      if (error) throw error;
      setSyncUI(true, "已同步");
      return true;
    } catch (err) {
      console.warn("Question progress sync failed:", err);
      setSyncUI(false, "待同步");
      return false;
    }
  }

  async function syncStats() {
    saveLocalCache();
    if (!db) return;
    try {
      const { error } = await db.from("onetake_stats").upsert({
        profile_id: profileId,
        ...stats,
        updated_at: new Date().toISOString()
      }, { onConflict: "profile_id" });
      if (error) throw error;
    } catch (err) {
      console.warn("Stats sync failed:", err);
      setSyncUI(false, "待同步");
    }
  }

  async function syncExamRecord(examRec) {
    examHistory.unshift(examRec);
    saveLocalCache();
    if (!db) return;
    try {
      const { data, error } = await db.from("onetake_exams").insert({
        profile_id: profileId,
        mode: examRec.mode,
        total_questions: examRec.total_questions,
        correct_count: examRec.correct_count,
        passed: examRec.passed,
        answers: examRec.answers
      }).select().single();
      if (error) throw error;
      if (data) {
        examHistory[0] = data;
        saveLocalCache();
        setSyncUI(true, "已同步");
      }
    } catch (err) {
      console.warn("Exam record sync failed:", err);
      setSyncUI(false, "待同步");
    }
  }

  // ==================== SRS LOGIC ====================
  const nextReviewIso = (box) => new Date(Date.now() + (BOX_INTERVAL_HOURS[box] ?? 24) * 3600000).toISOString();

  function recordAnswer(qId, chosenOption, isRight) {
    const nowIso = new Date().toISOString();
    const prev = progressMap[qId] || {
      profile_id: profileId, question_id: qId,
      attempts: 0, correct_count: 0, wrong_count: 0,
      box: 1, streak: 0, last_result: null, last_selected_option: null,
      mistake_reason: null, personal_note: null
    };
    const wasPreviouslyWrong = prev.wrong_count > 0 && (prev.last_result === "wrong" || prev.box <= 1);
    const nextBox = isRight ? Math.min(5, (prev.box === 0 ? 1 : prev.box) + 1) : 0;

    const updated = {
      ...prev,
      attempts: prev.attempts + 1,
      correct_count: prev.correct_count + (isRight ? 1 : 0),
      wrong_count: prev.wrong_count + (isRight ? 0 : 1),
      box: nextBox,
      streak: isRight ? prev.streak + 1 : 0,
      last_result: isRight ? "correct" : "wrong",
      last_selected_option: chosenOption,
      next_review_at: nextReviewIso(nextBox),
      last_answered_at: nowIso,
      updated_at: nowIso
    };
    progressMap[qId] = updated;

    stats.total_answered = (stats.total_answered || 0) + 1;
    if (isRight) {
      stats.total_correct = (stats.total_correct || 0) + 1;
      stats.current_combo = (stats.current_combo || 0) + 1;
      stats.best_combo = Math.max(stats.best_combo || 0, stats.current_combo);
      stats.xp = (stats.xp || 0) + (wasPreviouslyWrong ? 25 : 10);
    } else {
      stats.current_combo = 0;
      stats.xp = (stats.xp || 0) + 3;
    }

    syncQuestionProgress(updated);
    syncStats();
    return { updated, wasPreviouslyWrong };
  }

  const getDueQuestions = () => {
    const now = Date.now();
    return window.QUESTIONS.filter((q) => {
      const p = progressMap[q.id];
      return p && (p.box === 0 || new Date(p.next_review_at).getTime() <= now);
    }).sort((a, b) => (progressMap[a.id].box - progressMap[b.id].box) || (progressMap[b.id].wrong_count - progressMap[a.id].wrong_count));
  };

  const getActiveMistakes = () =>
    window.QUESTIONS.filter((q) => {
      const p = progressMap[q.id];
      return p && p.wrong_count > 0 && (p.box <= 1 || p.last_result === "wrong");
    });

  const getAllEverWrong = () => window.QUESTIONS.filter((q) => progressMap[q.id]?.wrong_count > 0);

  function computeReadiness() {
    let w = 0;
    for (const q of window.QUESTIONS) {
      const p = progressMap[q.id];
      if (!p) continue;
      if (p.box >= 4) w += 1;
      else if (p.box === 3) w += 0.78;
      else if (p.box === 2) w += 0.55;
      else if (p.box === 1 && p.last_result === "correct") w += 0.35;
    }
    const cov = (w / window.QUESTIONS.length) * 75;
    const recent = examHistory.filter((e) => e.mode === "exam").slice(0, 5);
    const acc = recent.length
      ? (recent.reduce((a, e) => a + e.correct_count / e.total_questions, 0) / recent.length) * 25
      : stats.total_answered > 0 ? (stats.total_correct / stats.total_answered) * 25 : 0;
    return Math.min(100, Math.round(cov + acc));
  }

  function pickEmotion({ isRight, combo, wasPreviouslyWrong }) {
    const bank = window.EMOTIONAL_BANK;
    let pool, style;
    if (!isRight) { pool = bank.comfort; style = "is-wrong"; }
    else if (wasPreviouslyWrong) { pool = bank.redeemed; style = "is-redeemed"; }
    else if (combo >= 6) { pool = bank.godlike; style = "is-streak"; }
    else if (combo >= 3) { pool = bank.streak; style = "is-streak"; }
    else { pool = bank.fresh; style = "is-right"; }

    let pick = pool[Math.floor(Math.random() * pool.length)];
    for (let i = 0; i < 6 && pick.text === lastEmotionText; i++) pick = pool[Math.floor(Math.random() * pool.length)];
    lastEmotionText = pick.text;
    return {
      icon: pick.icon,
      badge: pick.badge.replace(/\{combo\}/g, String(combo)),
      text: pick.text.replace(/\{combo\}/g, String(combo)),
      style
    };
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildMockExam() {
    const score = (q) => {
      const p = progressMap[q.id];
      if (!p) return 2 + Math.random();
      if (p.box === 0) return 3.2 + Math.random();
      if (new Date(p.next_review_at).getTime() <= Date.now()) return 2.5 + Math.random();
      return (5 - p.box) * 0.3 + Math.random();
    };
    const imgs = [...window.QUESTIONS.filter((q) => q.type === "image")].sort((a, b) => score(b) - score(a)).slice(0, 10);
    const txts = [...window.QUESTIONS.filter((q) => q.type === "text")].sort((a, b) => score(b) - score(a)).slice(0, 10);
    return shuffle([...imgs, ...txts]);
  }

  function showView(v) {
    clearNotice();
    ["home", "quiz", "summary", "mistakes", "study", "history"].forEach((id) => {
      const el = $(`view-${id}`);
      if (el) el.hidden = id !== v;
    });
    document.querySelectorAll(".nav-tab").forEach((b) => {
      const active = b.dataset.tab === v;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function launchExam() {
    startSession({
      mode: "exam",
      label: revealAtEndPref ? "模擬試 · 交卷揭曉" : "模擬試 · 即時拆解",
      questions: buildMockExam(),
      revealAtEnd: revealAtEndPref
    });
  }

  function startSession({ mode, label, questions, revealAtEnd = false }) {
    if (!questions.length) {
      showNotice("暫未有題目，先考一份模擬試建立紀錄。", { ctaText: "開始模擬試", onCta: launchExam });
      return;
    }
    session = { mode, label, questions, revealAtEnd, index: 0, answers: {}, combo: 0, submitted: false };
    $("quiz-mode-label").textContent = label;
    showView("quiz");
    renderCurrentQuestion();
  }

  // ==================== RENDER HOME ====================
  function renderHome() {
    const total = window.QUESTIONS.length;
    const mastered = window.QUESTIONS.filter((q) => (progressMap[q.id]?.box || 0) >= 3).length;
    const activeMistakes = getActiveMistakes();
    const due = getDueQuestions();
    const readiness = computeReadiness();

    const circ = 301.59;
    $("readiness-arc").style.strokeDashoffset = String(circ - (circ * readiness) / 100);
    $("readiness-pct").textContent = `${readiness}%`;

    let rank = "起步階段";
    let heading = "模擬甲部筆試";
    if (readiness >= 85) { rank = "1TakePass 必勝"; heading = "狀態滿分 · 隨時考得"; }
    else if (readiness >= 60) { rank = "準 P 牌水平"; heading = "進度穩健 · 清埋弱點"; }
    else if (readiness >= 25) { rank = "穩步上路"; heading = "繼續保持手感"; }
    $("rank-pill").textContent = rank;
    $("hero-greeting").textContent = heading;

    $("stat-mastered").textContent = `${mastered} / ${total}`;
    $("stat-best-combo").textContent = String(stats.best_combo || 0);
    $("stat-exams-passed").textContent = String(stats.exams_passed || 0);
    $("stat-active-mistakes").textContent = String(activeMistakes.length);

    $("home-due-count").textContent = String(Math.max(due.length, activeMistakes.length));
    $("count-image-qs").textContent = `${window.QUESTIONS.filter((q) => q.type === "image").length} 題`;
    $("count-text-qs").textContent = `${window.QUESTIONS.filter((q) => q.type === "text").length} 題`;
    $("count-trap-qs").textContent = `${window.QUESTIONS.filter((q) => q.trapTag).length} 題`;
    $("count-mistake-qs").textContent = `${activeMistakes.length} 題`;

    const badge = $("nav-mistake-badge");
    badge.textContent = String(activeMistakes.length);
    badge.hidden = activeMistakes.length === 0;

    $("seg-instant").classList.toggle("is-active", !revealAtEndPref);
    $("seg-instant").setAttribute("aria-pressed", String(!revealAtEndPref));
    $("seg-exam").classList.toggle("is-active", revealAtEndPref);
    $("seg-exam").setAttribute("aria-pressed", String(revealAtEndPref));

    const grid = $("chapter-grid");
    grid.innerHTML = window.CATEGORIES.map((cat) => {
      const qs = window.QUESTIONS.filter((q) => q.category === cat.id);
      const done = qs.filter((q) => (progressMap[q.id]?.box || 0) >= 2).length;
      const err = qs.filter((q) => progressMap[q.id]?.box === 0).length;
      const ratio = qs.length ? done / qs.length : 0;
      const pct = Math.round(ratio * 100);
      return `
        <button class="chapter-card" data-chapter="${cat.id}" type="button">
          <div class="chapter-top">
            <span class="chapter-title" style="color:${cat.color}">${ICONS[cat.icon] || ""}<span style="color:var(--ink)">${esc(cat.name)}</span></span>
            ${err > 0 ? `<span class="chip chip-red tnum">${err} 錯</span>` : `<span class="chip chip-neutral tnum">${qs.length} 題</span>`}
          </div>
          <div class="chapter-bar"><div class="chapter-fill" style="transform:scaleX(${ratio.toFixed(4)});background:${cat.color}"></div></div>
          <div class="chapter-foot tnum"><span>熟練 ${pct}%</span><span>${done}/${qs.length}</span></div>
        </button>`;
    }).join("");

    grid.querySelectorAll(".chapter-card").forEach((btn) => {
      btn.onclick = () => {
        const cat = window.CATEGORIES.find((c) => c.id === btn.dataset.chapter);
        if (!cat) return;
        startSession({
          mode: "chapter",
          label: cat.short,
          questions: shuffle(window.QUESTIONS.filter((q) => q.category === cat.id)),
          revealAtEnd: false
        });
      };
    });
  }

  // ==================== RENDER QUIZ ====================
  function renderCurrentQuestion() {
    if (!session) return;
    const idx = session.index;
    const total = session.questions.length;
    const q = session.questions[idx];
    const ans = session.answers[idx];
    const prevProg = progressMap[q.id];
    const cat = window.CATEGORIES.find((c) => c.id === q.category);

    $("quiz-progress-text").textContent = `${idx + 1} / ${total}`;
    const answered = Object.keys(session.answers).length;
    const right = Object.values(session.answers).filter((a) => a.isRight).length;
    $("quiz-score-live").textContent = session.revealAtEnd ? `已答 ${answered}/${total}` : `答對 ${right}/${answered}`;
    $("quiz-progress-fill").style.transform = `scaleX(${((idx + 1) / total).toFixed(4)})`;

    const comboPill = $("quiz-combo-pill");
    if (!session.revealAtEnd && session.combo >= 2) {
      comboPill.hidden = false;
      $("quiz-combo-num").textContent = String(session.combo);
    } else {
      comboPill.hidden = true;
    }

    const dots = $("quiz-dots");
    dots.innerHTML = session.questions.map((_, i) => {
      const a = session.answers[i];
      let cls = "q-dot";
      if (i === idx) cls += " is-current";
      if (a) cls += session.revealAtEnd ? " is-answered" : a.isRight ? " is-right" : " is-wrong";
      return `<button type="button" class="${cls}" data-qidx="${i}" aria-label="第 ${i + 1} 題"${i === idx ? ` aria-current="step"` : ""}>${i + 1}</button>`;
    }).join("");
    dots.querySelectorAll(".q-dot").forEach((d) => {
      d.onclick = () => { session.index = Number(d.dataset.qidx); renderCurrentQuestion(); };
    });

    const badges = [
      cat ? `<span class="chip chip-neutral">${esc(cat.short)}</span>` : "",
      q.type === "image" ? `<span class="chip chip-cobalt">圖片題</span>` : `<span class="chip chip-neutral">文字題</span>`
    ];
    if (q.trapTag) badges.push(`<span class="chip chip-amber">${esc(q.trapTag)}</span>`);
    if (prevProg?.wrong_count > 0) badges.push(`<span class="chip chip-red tnum">曾錯 ${prevProg.wrong_count} 次</span>`);
    $("q-badges").innerHTML = badges.join("");

    const visual = $("q-visual");
    if (q.sign && window.SIGN_ASSETS[q.sign]) {
      visual.hidden = false;
      visual.innerHTML = window.renderSignImg(q.sign, { eager: true });
    } else {
      visual.hidden = true;
      visual.innerHTML = "";
    }
    const nextQ = session.questions[idx + 1];
    if (nextQ?.sign && window.SIGN_ASSETS[nextQ.sign]) {
      const preload = new Image();
      preload.src = window.SIGN_ASSETS[nextQ.sign].src;
    }

    $("q-prompt").textContent = q.prompt;

    const showNow = !!ans && !session.revealAtEnd;
    const list = $("options-list");
    list.innerHTML = ["A", "B", "C"].map((letter) => {
      let cls = "option-btn";
      let status = "";
      if (ans) {
        if (session.revealAtEnd) {
          if (ans.chosen === letter) cls += " is-selected";
        } else {
          if (letter === q.answer) { cls += " is-correct"; status = ans.chosen === letter ? "正確" : "正解"; }
          else if (ans.chosen === letter) { cls += " is-wrong"; status = "誤選"; }
        }
      }
      return `
        <button type="button" role="radio" aria-checked="${ans?.chosen === letter ? "true" : "false"}" class="${cls}" data-opt="${letter}" ${showNow ? "disabled" : ""}>
          <span class="option-letter">${letter}</span>
          <span>${esc(q.options[letter])}</span>
          ${status ? `<span class="option-status">${status}</span>` : ""}
        </button>`;
    }).join("");
    list.querySelectorAll(".option-btn").forEach((b) => { b.onclick = () => handleOptionSelect(b.dataset.opt); });

    const emoEl = $("emotion-banner");
    const autoEl = $("autopsy-panel");
    const refEl = $("autopsy-reflect");

    if (showNow) {
      emoEl.hidden = false;
      emoEl.className = `emotion-strip ${ans.emotion.style}`;
      $("emotion-icon").innerHTML = ICONS[ans.emotion.icon] || ICONS.checkCircle;
      $("emotion-badge").textContent = ans.emotion.badge;
      $("emotion-text").textContent = ans.emotion.text;

      autoEl.hidden = false;
      $("autopsy-right-text").textContent = `${q.answer} · ${q.whyRight}`;
      $("autopsy-wrong-list").innerHTML = ["A", "B", "C"]
        .filter((l) => l !== q.answer)
        .map((l) => `<li><span class="wrong-tag">${l}</span><span>${l === ans.chosen ? "<strong>[你選]</strong> " : ""}${esc(q.whyWrong[l])}</span></li>`)
        .join("");

      $("autopsy-page-badge").textContent = `第 ${q.source.page} 頁`;
      $("autopsy-source-meta").textContent = `《道路使用者守則》2020版 · ${q.source.chapter} · ${q.source.section}`;
      $("autopsy-source-quote").textContent = `「${q.source.quote}」`;
      $("autopsy-hook-text").textContent = q.memoryHook;

      const prog = progressMap[q.id];
      if (!ans.isRight || prog?.personal_note || prog?.mistake_reason) {
        refEl.hidden = false;
        renderReflection(q.id, prog);
      } else {
        refEl.hidden = true;
      }
    } else {
      emoEl.hidden = true;
      autoEl.hidden = true;
    }

    $("btn-prev-q").hidden = idx === 0;
    const isLast = idx === total - 1;
    const allDone = Object.keys(session.answers).length === total;

    if (session.revealAtEnd) {
      $("btn-next-q").hidden = isLast;
      $("btn-submit-exam").hidden = !allDone && !isLast;
      $("btn-submit-exam").textContent = allDone ? "交卷睇詳解" : `交卷（餘 ${total - answered} 題）`;
    } else {
      $("btn-next-q").hidden = !ans || isLast;
      $("btn-submit-exam").hidden = !ans || !isLast;
      $("btn-submit-exam").textContent = "查看成績報告";
    }
  }

  function renderReflection(qId, prog) {
    const chips = $("reason-chips");
    chips.innerHTML = window.MISTAKE_REASONS.map(
      (r) => {
        const selected = prog?.mistake_reason === r.id;
        return `<button type="button" class="reason-chip ${selected ? "is-selected" : ""}" aria-pressed="${selected}" data-reason="${r.id}">${esc(r.label)}</button>`;
      }
    ).join("");
    chips.querySelectorAll(".reason-chip").forEach((c) => {
      c.onclick = async () => {
        if (!progressMap[qId]) return;
        progressMap[qId].mistake_reason = c.dataset.reason;
        progressMap[qId].updated_at = new Date().toISOString();
        const synced = await syncQuestionProgress(progressMap[qId]);
        renderReflection(qId, progressMap[qId]);
        $("note-saved-hint").textContent = synced ? "已同步至雲端" : "已存本機（待同步）";
        $("note-saved-hint").hidden = false;
      };
    });

    const input = $("input-personal-note");
    const saveBtn = $("btn-save-note");
    const hint = $("note-saved-hint");
    input.value = prog?.personal_note || "";
    hint.hidden = true;

    const saveNote = async () => {
      if (!progressMap[qId]) return;
      progressMap[qId].personal_note = input.value.trim();
      progressMap[qId].updated_at = new Date().toISOString();
      const synced = await syncQuestionProgress(progressMap[qId]);
      hint.textContent = synced ? "已同步至雲端" : "已存本機（待同步）";
      hint.hidden = false;
    };

    saveBtn.onclick = saveNote;
    input.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveNote();
      }
    };
  }

  function handleOptionSelect(chosen) {
    if (!session) return;
    const idx = session.index;
    const q = session.questions[idx];
    if (!session.revealAtEnd && session.answers[idx]) return;

    const isRight = chosen === q.answer;
    if (session.revealAtEnd) {
      session.answers[idx] = { chosen, isRight };
      renderCurrentQuestion();
      return;
    }

    session.combo = isRight ? session.combo + 1 : 0;
    const { wasPreviouslyWrong } = recordAnswer(q.id, chosen, isRight);
    const emotion = pickEmotion({ isRight, combo: session.combo, wasPreviouslyWrong });
    session.answers[idx] = { chosen, isRight, emotion, wasPreviouslyWrong };

    if (isRight) {
      playTone(wasPreviouslyWrong ? "redeemed" : "correct", session.combo);
      burstConfetti(wasPreviouslyWrong ? 36 : session.combo >= 3 ? 28 : 14);
    } else {
      playTone("wrong");
    }

    renderCurrentQuestion();
    renderHome();
  }

  function finishSession() {
    if (!session || session.submitted) return;
    session.submitted = true;
    const total = session.questions.length;
    if (session.revealAtEnd) {
      session.questions.forEach((q, i) => {
        const a = session.answers[i];
        const chosen = a ? a.chosen : null;
        const isRight = chosen === q.answer;
        if (chosen) recordAnswer(q.id, chosen, isRight);
        session.answers[i] = { chosen: chosen || "未答", isRight };
      });
    }

    const rows = session.questions.map((q, i) => {
      const a = session.answers[i] || { chosen: "未答", isRight: false };
      return { qId: q.id, chosen: a.chosen, correct: q.answer, isRight: !!a.isRight };
    });
    const correctCount = rows.filter((r) => r.isRight).length;
    const pct = Math.round((correctCount / total) * 100);
    const passed = total === EXAM_LEN ? correctCount >= PASS_MIN : pct >= 80;

    if (passed) {
      stats.exams_passed = (stats.exams_passed || 0) + 1;
      syncStats();
      playTone("pass");
      burstConfetti(60);
    }

    const examRec = {
      id: `local-${Date.now()}`,
      mode: session.mode,
      total_questions: total,
      correct_count: correctCount,
      passed,
      answers: rows,
      created_at: new Date().toISOString()
    };
    syncExamRecord(examRec);
    summaryFilter = "all";
    renderSummary(examRec);
    renderAll();
    showView("summary");
  }

  // ==================== SUMMARY & REVIEW CARDS ====================
  function renderSummary(rec) {
    const { total_questions: total, correct_count: correct, passed, answers } = rec;
    const pct = Math.round((correct / total) * 100);
    const wrongs = answers.filter((a) => !a.isRight);

    $("summary-hero").classList.toggle("is-fail", !passed);
    $("summary-status-pill").textContent = passed
      ? (total === EXAM_LEN ? "模擬試及格（≥16/20）" : "達標（≥80%）")
      : `未達標 · 錯 ${wrongs.length} 題`;
    $("summary-score-title").textContent = `${correct} / ${total}（${pct}%）`;
    $("summary-message").textContent =
      passed && wrongs.length === 0
        ? "滿分零失誤，隨時可應考！"
        : passed
        ? `已過及格線，即時重做 ${wrongs.length} 條錯題可鎖死記憶。`
        : "今次排走盲點賺咗！睇完拆解再重做錯題即刻升班。";

    const retryBtn = $("btn-retry-session-mistakes");
    if (wrongs.length > 0) {
      retryBtn.hidden = false;
      retryBtn.textContent = `重做今次 ${wrongs.length} 條錯題`;
      retryBtn.onclick = () => startSession({
        mode: "mistakes",
        label: "今次錯題重溫",
        questions: wrongs.map((r) => Q_BY_ID[r.qId]).filter(Boolean),
        revealAtEnd: false
      });
    } else {
      retryBtn.hidden = true;
    }

    document.querySelectorAll("#summary-filters .filter-btn").forEach((p) => {
      const active = p.dataset.sfilter === summaryFilter;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-pressed", String(active));
      p.onclick = () => { summaryFilter = p.dataset.sfilter; renderSummary(rec); };
    });

    const filtered = answers.filter((r) => {
      const q = Q_BY_ID[r.qId];
      if (!q) return false;
      if (summaryFilter === "wrong") return !r.isRight;
      if (summaryFilter === "image") return q.type === "image";
      return true;
    });

    const listEl = $("summary-review-list");
    if (filtered.length) {
      listEl.innerHTML = filtered.map((r, i) => buildReviewCard(Q_BY_ID[r.qId], r, !r.isRight, i + 1)).join("");
      bindReviewNotes(listEl);
    } else {
      listEl.innerHTML = `
        <div class="empty-state">
          <span>此篩選條件下未有符合題目。</span>
          <button type="button" class="btn btn-secondary btn-sm js-reset-sfilter">顯示全部題目</button>
        </div>`;
      const resetBtn = listEl.querySelector(".js-reset-sfilter");
      if (resetBtn) resetBtn.onclick = () => { summaryFilter = "all"; renderSummary(rec); };
    }
  }

  function buildReviewCard(q, info, openDefault = false, num = null) {
    const prog = progressMap[q.id];
    const isWrong = info ? !info.isRight : prog?.last_result === "wrong";
    const chosen = info ? info.chosen : prog?.last_selected_option;
    const reasonLabel = window.MISTAKE_REASONS.find((r) => r.id === prog?.mistake_reason)?.label;

    const wrongLis = ["A", "B", "C"]
      .filter((l) => l !== q.answer)
      .map((l) => `<li><span class="wrong-tag">${l}</span><span>${l === chosen ? "<strong>[誤選]</strong> " : ""}${esc(q.whyWrong[l])}</span></li>`)
      .join("");

    return `
      <details class="review-item ${isWrong ? "is-wrong" : "is-right"}" ${openDefault ? "open" : ""}>
        <summary class="review-summary">
          ${q.sign && window.SIGN_ASSETS[q.sign] ? `<div class="review-thumb">${window.renderSignImg(q.sign, { thumb: true })}</div>` : ""}
          <div class="review-head">
            <div class="review-tags">
              ${num !== null ? `<span class="chip chip-neutral tnum">#${num}</span>` : ""}
              <span class="chip ${isWrong ? "chip-red" : "chip-emerald"}">${isWrong ? "錯" : "對"}</span>
              <span class="chip chip-cobalt tnum">第 ${q.source.page} 頁</span>
              ${q.type === "image" ? `<span class="chip chip-neutral">圖片</span>` : ""}
              ${reasonLabel ? `<span class="chip chip-amber">${esc(reasonLabel)}</span>` : ""}
            </div>
            <div class="review-q">${esc(q.prompt)}</div>
            <div class="review-ans-line">
              ${chosen ? `<span>選：<strong>${esc(chosen)}</strong></span>` : ""}
              <span>正解：<strong style="color:var(--emerald)">${q.answer} · ${esc(q.options[q.answer])}</strong></span>
            </div>
          </div>
        </summary>
        <div class="review-body">
          ${q.sign && window.SIGN_ASSETS[q.sign] ? `<div class="q-visual">${window.renderSignImg(q.sign)}</div>` : ""}
          <div class="autopsy-row row-right"><div class="autopsy-label">正確解析</div><p>${q.answer} · ${esc(q.whyRight)}</p></div>
          <div class="autopsy-row row-wrong"><div class="autopsy-label">錯誤選項盲點</div><ul class="wrong-list">${wrongLis}</ul></div>
          <div class="autopsy-row row-source">
            <div class="source-top"><span class="autopsy-label">守則出處</span><span class="page-pill tnum">第 ${q.source.page} 頁</span></div>
            <div class="source-loc">${esc(q.source.chapter)} · ${esc(q.source.section)}</div>
            <blockquote class="source-quote">「${esc(q.source.quote)}」</blockquote>
          </div>
          <div class="autopsy-row row-hook"><div class="autopsy-label">記法口訣</div><p>${esc(q.memoryHook)}</p></div>
          ${prog ? `<div class="autopsy-row row-reflect">
            <div class="autopsy-label tnum">筆記（對 ${prog.correct_count} / 錯 ${prog.wrong_count} · Box ${prog.box}）</div>
            <div class="note-row">
              <input type="text" class="text-input js-review-note" data-qid="${q.id}" value="${esc(prog.personal_note || "")}" placeholder="寫低防錯提醒…" maxlength="120" autocomplete="off" aria-label="個人筆記">
              <button type="button" class="btn btn-secondary btn-sm js-save-review-note" data-qid="${q.id}">儲存</button>
            </div>
          </div>` : ""}
        </div>
      </details>`;
  }

  function bindReviewNotes(container) {
    container.querySelectorAll(".js-save-review-note").forEach((btn) => {
      const qId = btn.dataset.qid;
      const input = container.querySelector(`.js-review-note[data-qid="${qId}"]`);
      const save = async () => {
        if (!input || !progressMap[qId]) return;
        progressMap[qId].personal_note = input.value.trim();
        progressMap[qId].updated_at = new Date().toISOString();
        const synced = await syncQuestionProgress(progressMap[qId]);
        btn.textContent = synced ? "已存" : "已存本機";
        setTimeout(() => { btn.textContent = "儲存"; }, 1200);
      };
      btn.onclick = save;
      if (input) {
        input.onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
        };
      }
    });
  }

  // ==================== MISTAKE BOOK, CONTRAST & HISTORY ====================
  function renderMistakeBook() {
    const counts = [0, 0, 0, 0, 0];
    Object.values(progressMap).forEach((p) => {
      if (p.box === 0) counts[0]++;
      else if (p.box === 1) counts[1]++;
      else if (p.box === 2) counts[2]++;
      else if (p.box === 3 || p.box === 4) counts[3]++;
      else if (p.box >= 5) counts[4]++;
    });
    $("leitner-boxes").innerHTML = BOX_META.map(
      (b, i) => `<div class="lb-cell ${b.cls}"><strong>${counts[i]}</strong><span>${b.title}</span><small>${b.sub}</small></div>`
    ).join("");

    const rc = {};
    Object.values(progressMap).forEach((p) => { if (p.mistake_reason) rc[p.mistake_reason] = (rc[p.mistake_reason] || 0) + 1; });
    const entries = window.MISTAKE_REASONS.filter((r) => rc[r.id] > 0);
    $("reason-stats").innerHTML = entries.length
      ? entries.map((r) => `<span class="chip chip-cobalt tnum">${esc(r.label)} × ${rc[r.id]}</span>`).join("")
      : `<span class="sec-sub">答錯後標記錯因，自動統計弱點分佈</span>`;

    document.querySelectorAll("#mistake-filters .filter-btn").forEach((p) => {
      const active = p.dataset.mfilter === mistakeFilter;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-pressed", String(active));
      p.onclick = () => { mistakeFilter = p.dataset.mfilter; renderMistakeBook(); };
    });

    let list = mistakeFilter === "active" ? getActiveMistakes() : getAllEverWrong();
    if (mistakeFilter === "image") list = getAllEverWrong().filter((q) => q.type === "image");

    const box = $("mistake-list");
    if (list.length) {
      box.innerHTML = list.map((q) => buildReviewCard(q, null, false, null)).join("");
      bindReviewNotes(box);
    } else {
      const msg = mistakeFilter === "active" ? "目前零待擊破錯題，保持節奏。" : "暫無錯題紀錄，先考一卷檢測盲點。";
      box.innerHTML = `
        <div class="empty-state">
          <span>${msg}</span>
          <button type="button" class="btn btn-primary btn-sm js-empty-launch">開始模擬試</button>
        </div>`;
      const btn = box.querySelector(".js-empty-launch");
      if (btn) btn.onclick = launchExam;
    }
  }

  function renderStudyLab() {
    const grid = $("contrast-grid");
    if (grid.dataset.rendered) return;
    grid.dataset.rendered = "1";
    grid.innerHTML = window.CONTRAST_CARDS.map((c) => `
      <article class="contrast-card">
        <div class="contrast-head">
          <h3>${esc(c.title)}</h3>
          <span class="chip chip-cobalt tnum">${esc(c.page)}</span>
        </div>
        <div class="contrast-pair">
          <div class="contrast-side">
            <div class="contrast-svg">${window.renderSignImg(c.left.sign)}</div>
            <strong>${esc(c.left.label)}</strong>
            <p>${esc(c.left.rule)}</p>
          </div>
          <div class="contrast-side">
            <div class="contrast-svg">${window.renderSignImg(c.right.sign)}</div>
            <strong>${esc(c.right.label)}</strong>
            <p>${esc(c.right.rule)}</p>
          </div>
        </div>
        <div class="contrast-hook">口訣：${esc(c.hook)}</div>
      </article>`).join("");
  }

  function renderHistory() {
    const el = $("history-list");
    if (!examHistory.length) {
      el.innerHTML = `
        <div class="empty-state">
          <span>尚未有考試紀錄，完成首份模擬試即自動存檔。</span>
          <button type="button" class="btn btn-primary btn-sm js-empty-launch">開始模擬試</button>
        </div>`;
      const btn = el.querySelector(".js-empty-launch");
      if (btn) btn.onclick = launchExam;
      return;
    }
    const names = { exam: "模擬試", srs: "間隔複習", mistakes: "錯題特訓", signs: "圖片路牌", practice: "專項訓練", chapter: "章節練習" };
    el.innerHTML = examHistory.map((rec, i) => {
      const dt = new Date(rec.created_at);
      const dateStr = isNaN(dt) ? "" : dt.toLocaleString("zh-HK", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
      const pct = Math.round((rec.correct_count / rec.total_questions) * 100);
      return `
        <div class="history-row">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <strong>${names[rec.mode] || "練習"}</strong>
              <span class="chip ${rec.passed ? "chip-emerald" : "chip-amber"}">${rec.passed ? "及格" : "未達標"}</span>
            </div>
            <span class="sec-sub tnum">${esc(dateStr)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="history-score ${rec.passed ? "is-pass" : "is-fail"}">${rec.correct_count}/${rec.total_questions} <small>(${pct}%)</small></span>
            <button type="button" class="btn btn-secondary btn-sm js-open-hist" data-hidx="${i}">詳解</button>
          </div>
        </div>`;
    }).join("");
    el.querySelectorAll(".js-open-hist").forEach((b) => {
      b.onclick = () => {
        const rec = examHistory[Number(b.dataset.hidx)];
        if (!rec) return;
        summaryFilter = "all";
        renderSummary(rec);
        showView("summary");
      };
    });
  }

  function renderAll() {
    renderHome();
    renderMistakeBook();
    renderStudyLab();
    renderHistory();
  }

  // ==================== ACCESSIBLE MODAL (FOCUS TRAP & RESTORE) ====================
  function getModalFocusables() {
    const card = document.querySelector("#sync-modal .modal-card");
    if (!card) return [];
    return Array.from(
      card.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  }

  function openSyncModal() {
    lastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const input = $("input-profile-id");
    input.value = profileId;
    setSyncUI(syncState.ok, syncState.text);
    $("sync-modal").hidden = false;
    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  }

  function closeSyncModal({ restoreFocus = true } = {}) {
    const modal = $("sync-modal");
    if (modal.hidden) return;
    modal.hidden = true;
    const target = restoreFocus ? lastFocusedEl : null;
    lastFocusedEl = null;
    if (target && typeof target.focus === "function") {
      requestAnimationFrame(() => target.focus());
    }
  }

  // ==================== THEME, SOUND & EVENTS ====================
  function updateThemeColorMeta(isDark) {
    const color = isDark ? "#0D1117" : "#FAF9F6";
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      m.setAttribute("content", color);
    });
  }

  function applyTheme(theme, { suppressTransitions = false } = {}) {
    const root = document.documentElement;
    if (suppressTransitions) root.setAttribute("data-theme-switching", "");

    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("onetake_theme", theme);
    }
    const isDark =
      root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const themeBtn = $("btn-theme");
    themeBtn.innerHTML = isDark ? ICONS.sun : ICONS.moon;
    themeBtn.setAttribute("aria-label", isDark ? "切換至淺色主題" : "切換至深色主題");
    themeBtn.title = isDark ? "切換至淺色主題" : "切換至深色主題";
    updateThemeColorMeta(isDark);

    if (suppressTransitions) {
      void root.offsetHeight;
      requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
    }
  }

  function updateSoundBtn() {
    const btn = $("btn-sound");
    btn.innerHTML = soundOn ? ICONS.volOn : ICONS.volOff;
    btn.setAttribute("aria-label", soundOn ? "關閉音效" : "開啟音效");
    btn.title = soundOn ? "關閉音效" : "開啟音效";
  }

  function applyProfileFromModal() {
    const raw = $("input-profile-id").value.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    if (!raw) {
      $("sync-status-detail").innerHTML = `<strong style="color:var(--red)">請輸入英數字、底線或連字號作同步代號。</strong>`;
      $("input-profile-id").focus();
      return;
    }
    profileId = raw;
    localStorage.setItem("onetake_profile", profileId);
    progressMap = {};
    examHistory = [];
    stats = { total_answered: 0, total_correct: 0, best_combo: 0, current_combo: 0, exams_passed: 0, xp: 0 };
    closeSyncModal();
    initSupabaseAndLoad();
  }

  function bindEvents() {
    document.querySelectorAll(".nav-tab").forEach((b) => {
      b.onclick = () => { showView(b.dataset.tab); renderAll(); };
    });
    $("btn-home-brand").onclick = () => { showView("home"); renderHome(); };

    $("seg-instant").onclick = () => { revealAtEndPref = false; localStorage.setItem("onetake_reveal_end", "0"); renderHome(); };
    $("seg-exam").onclick = () => { revealAtEndPref = true; localStorage.setItem("onetake_reveal_end", "1"); renderHome(); };

    $("btn-start-exam").onclick = launchExam;
    $("btn-new-exam").onclick = launchExam;
    $("btn-history-new-exam").onclick = launchExam;

    $("btn-start-srs").onclick = () => {
      let pool = getDueQuestions();
      if (pool.length < 10) {
        const extras = shuffle(window.QUESTIONS.filter((q) => !pool.some((p) => p.id === q.id))).slice(0, 12 - pool.length);
        pool = [...pool, ...extras];
      }
      startSession({ mode: "srs", label: "間隔複習", questions: pool.slice(0, 15), revealAtEnd: false });
    };

    $("btn-mode-signs").onclick = () => startSession({ mode: "signs", label: "圖片路牌題", questions: shuffle(window.QUESTIONS.filter((q) => q.type === "image")).slice(0, 20), revealAtEnd: false });
    $("btn-mode-text").onclick = () => startSession({ mode: "practice", label: "文字數字題", questions: shuffle(window.QUESTIONS.filter((q) => q.type === "text")).slice(0, 20), revealAtEnd: false });
    $("btn-mode-traps").onclick = () => startSession({ mode: "practice", label: "高頻陷阱集", questions: shuffle(window.QUESTIONS.filter((q) => !!q.trapTag)).slice(0, 20), revealAtEnd: false });

    const launchMistakes = () => {
      const pool = getActiveMistakes().length ? getActiveMistakes() : getAllEverWrong();
      if (!pool.length) {
        showNotice("暫無錯題紀錄，先考一份模擬試自動收集弱點。", { ctaText: "開始模擬試", onCta: launchExam });
        return;
      }
      startSession({ mode: "mistakes", label: "錯題復仇戰", questions: shuffle(pool).slice(0, 20), revealAtEnd: false });
    };
    $("btn-mode-mistakes").onclick = launchMistakes;
    $("btn-drill-mistakes-page").onclick = launchMistakes;

    $("btn-quiz-exit").onclick = () => { showView("home"); renderHome(); };
    $("btn-prev-q").onclick = () => { if (session && session.index > 0) { session.index--; renderCurrentQuestion(); } };
    $("btn-next-q").onclick = () => { if (session && session.index < session.questions.length - 1) { session.index++; renderCurrentQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); } };
    $("btn-submit-exam").onclick = finishSession;
    $("btn-summary-home").onclick = () => { showView("home"); renderHome(); };

    document.addEventListener("keydown", (e) => {
      // Priority 1: Modal Escape + Focus Trap
      if (!$("sync-modal").hidden) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeSyncModal();
          return;
        }
        if (e.key === "Tab") {
          const focusables = getModalFocusables();
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first || !$("sync-modal").contains(document.activeElement)) {
              e.preventDefault();
              last.focus();
            }
          } else if (document.activeElement === last || !$("sync-modal").contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
        return;
      }

      // Priority 2: Quiz keyboard shortcuts
      if ($("view-quiz").hidden || !session) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      const k = e.key.toUpperCase();
      if (k === "A" || k === "1") handleOptionSelect("A");
      else if (k === "B" || k === "2") handleOptionSelect("B");
      else if (k === "C" || k === "3") handleOptionSelect("C");
      else if (k === "ENTER" || k === "ARROWRIGHT") {
        if (!$("btn-next-q").hidden) $("btn-next-q").click();
        else if (!$("btn-submit-exam").hidden) $("btn-submit-exam").click();
      }
    });

    $("btn-sound").onclick = () => {
      soundOn = !soundOn;
      localStorage.setItem("onetake_sound", soundOn ? "on" : "off");
      updateSoundBtn();
      if (soundOn) playTone("correct", 2);
    };

    $("btn-theme").onclick = () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(cur === "dark" || (!cur && sysDark) ? "light" : "dark", { suppressTransitions: true });
    };

    $("btn-sync").onclick = openSyncModal;
    $("btn-close-modal").onclick = () => closeSyncModal();
    $("sync-modal").onclick = (e) => { if (e.target === $("sync-modal")) closeSyncModal(); };
    $("btn-apply-profile").onclick = applyProfileFromModal;
    $("input-profile-id").onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyProfileFromModal();
      }
    };

    window.addEventListener("online", () => {
      initSupabaseAndLoad({ silent: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && Date.now() - lastSyncFetchAt > 15000) {
        initSupabaseAndLoad({ silent: true });
      }
    });
  }

  hydrateIcons();
  applyTheme(localStorage.getItem("onetake_theme"));
  updateSoundBtn();
  bindEvents();
  initSupabaseAndLoad();
})();
