// 1TakePass — Core Engine, Leitner SRS & Supabase Cloud Sync
// Streamlined with product-design, ui-design (Deslop), ui-ux-pro-max, and typography-audit
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
    { cls: "b4", title: "已牢記", sub: "已掌握" }
  ];

  // Minimal 24x24 geometric outline SVG icons
  const svgIcon = (inner, cls = "ic") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    play: svgIcon(`<polygon points="6 4 19 12 6 20 6 4"/>`),
    chevLeft: svgIcon(`<path d="m15 18-6-6 6-6"/>`),
    chevDown: svgIcon(`<path d="m6 9 6 6 6-6"/>`),
    x: svgIcon(`<path d="M18 6 6 18M6 6l12 12"/>`),
    sun: svgIcon(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`),
    moon: svgIcon(`<path d="M20 14.5A8 8 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>`),
    volOn: svgIcon(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a8.5 8.5 0 0 1 0 12"/>`),
    volOff: svgIcon(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="m22 9-6 6M16 9l6 6"/>`)
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
  let mistakeReasonFilter = null;
  let studyFilter = "all";
  let summarySourceTab = "home";
  let lastEmotionText = "";
  let quiz3dOn = localStorage.getItem("onetake_quiz_3d") !== "off";
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

  const ORIGIN_SHORT = {
    "歷屆甲部筆試真題": "歷屆真題",
    "網上考生高頻回報（LIHKG／模擬試）": "網上高頻",
    "2025–2026 最新生效法例（運輸署）": "2025–2026 新例",
    "運輸署現行守則新修訂重點": "現行新例",
    "運輸署現行《道路使用者守則》": "現行守則"
  };

  function shortOrigin(q) {
    return ORIGIN_SHORT[q.source?.origin] || "現行守則";
  }

  function fullSourceMeta(q, { includePage = true } = {}) {
    const origin = q.source?.origin || "運輸署現行《道路使用者守則》";
    const loc = `${q.source.chapter} · ${q.source.section}`;
    const pagePart = includePage ? `（P.${q.source.page}）` : "";
    return `${origin} · ${loc}${pagePart}`;
  }

  // ==================== IN-PLACE NOTICE ====================
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
    if (duration > 0) noticeTimer = setTimeout(clearNotice, duration);
  }

  // ==================== AUDIO & PASS CONFETTI ====================
  let audioCtx = null;
  function playTone(kind, combo = 1) {
    if (!soundOn) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      const beep = (freq, start, dur, vol = 0.06, type = "triangle") => {
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
        const base = 523.25 * Math.pow(2, Math.min(combo - 1, 5) / 12);
        beep(base, now, 0.12);
        beep(base * 1.25, now + 0.06, 0.16);
      } else if (kind === "redeemed") {
        [523.25, 659.25, 783.99].forEach((f, i) => beep(f, now + i * 0.06, 0.16));
      } else if (kind === "wrong") {
        beep(290, now, 0.11, 0.04, "sine");
        beep(250, now + 0.09, 0.14, 0.035, "sine");
      } else if (kind === "pass") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => beep(f, now + i * 0.08, 0.25));
      } else if (kind === "horn") {
        beep(440, now, 0.09, 0.055, "sawtooth");
        beep(554.37, now, 0.09, 0.045, "triangle");
        beep(440, now + 0.12, 0.13, 0.055, "sawtooth");
        beep(554.37, now + 0.12, 0.13, 0.045, "triangle");
      }
    } catch (err) {
      console.warn("Audio feedback unavailable:", err);
    }
  }
  window.playOneTakeHorn = () => playTone("horn");

  function burstConfetti(count = 44) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = $("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#007a4d", "#10b981", "#005eb8", "#b45309"];
    const pieces = Array.from({ length: count }, () => ({
      x: canvas.width * (0.28 + Math.random() * 0.44),
      y: canvas.height * 0.26,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 8 - 2.5,
      size: 5 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.2,
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
        p.vy += 0.3;
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
      if (alive > 0 && frame < 75) requestAnimationFrame(tick);
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
    if ($("sync-label")) {
      $("sync-label").textContent = profileId !== "default" && ok === true ? `${text} · ${profileId}` : text;
    }
    if ($("btn-sync")) {
      $("btn-sync").title = `同步狀態：${text}（代號：${profileId}）`;
    }
    if ($("sync-status-detail")) {
      $("sync-status-detail").innerHTML =
        `狀態：<strong>${esc(text)}</strong> · 代號：<code>${esc(profileId)}</code> · 已記錄：<strong class="tnum">${Object.keys(progressMap).length} / ${window.QUESTIONS.length}</strong>`;
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
            if (payload.eventType === "DELETE") {
              const oldId = payload.old?.question_id;
              if (oldId && progressMap[oldId]) {
                delete progressMap[oldId];
                saveLocalCache();
                if ($("view-quiz").hidden) renderAll();
              }
              return;
            }
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
      setSyncUI(false, "離線");
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
      setSyncUI(false, "離線");
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

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickEmotion({ isRight, combo, wasPreviouslyWrong }) {
    const bank = window.EMOTIONAL_BANK;
    if (!bank) return null;
    let pool, style;
    if (!isRight) { pool = bank.comfort; style = "is-wrong"; }
    else if (wasPreviouslyWrong) { pool = bank.redeemed; style = "is-redeemed"; }
    else if (combo >= 6) { pool = bank.godlike; style = "is-streak"; }
    else if (combo >= 3) { pool = bank.streak; style = "is-streak"; }
    else { pool = bank.fresh; style = "is-right"; }
    if (!pool?.length) return null;

    let pick = pool[Math.floor(Math.random() * pool.length)];
    for (let i = 0; i < 6 && pick.text === lastEmotionText; i++) {
      pick = pool[Math.floor(Math.random() * pool.length)];
    }
    lastEmotionText = pick.text;
    return {
      badge: pick.badge.replace(/\{combo\}/g, String(combo)),
      text: pick.text.replace(/\{combo\}/g, String(combo)),
      style
    };
  }

  function prioritizePool(qs, limit = 20) {
    const now = Date.now();
    const score = (q) => {
      const p = progressMap[q.id];
      if (!p) return 2.2 + Math.random(); // prioritize unseen
      if (p.box === 0) return 3.6 + Math.random(); // highest: active mistakes
      if (new Date(p.next_review_at).getTime() <= now) return 2.8 + Math.random(); // due for SRS
      return (5 - p.box) * 0.35 + Math.random(); // low mastery before fully mastered
    };
    return shuffle([...qs].sort((a, b) => score(b) - score(a)).slice(0, limit));
  }

  function buildMockExam() {
    const imgs = prioritizePool(window.QUESTIONS.filter((q) => q.type === "image"), 10);
    const txts = prioritizePool(window.QUESTIONS.filter((q) => q.type === "text"), 10);
    return shuffle([...imgs, ...txts]);
  }

  function buildQuizProgressPayload({ snap = false } = {}) {
    if (!session) return null;
    const total = session.questions.length;
    const answered = Object.keys(session.answers).length;
    const right = Object.values(session.answers).filter((a) => a.isRight).length;
    return {
      answered,
      total,
      right,
      combo: session.combo || 0,
      isExam: session.mode === "exam",
      passMin: PASS_MIN,
      revealAtEnd: !!session.revealAtEnd,
      snap
    };
  }

  function syncQuiz3DVisibility() {
    const btn = $("btn-toggle-quiz-3d");
    if (btn) {
      btn.hidden = false;
      btn.setAttribute("aria-pressed", String(quiz3dOn));
      btn.textContent = quiz3dOn ? "進度車" : "進度車 關";
      btn.title = "顯示或收起 3D 情緒進度條";
    }
    const flatTrack = document.querySelector("#view-quiz .progress-track");
    if (flatTrack) flatTrack.hidden = quiz3dOn;

    if (!$("view-quiz").hidden) {
      if (quiz3dOn) {
        window.OneTake3D?.mount("quiz", { combo: session?.combo || 0 });
        const payload = buildQuizProgressPayload({ snap: true });
        if (payload) window.OneTake3D?.setProgress(payload);
      } else {
        window.OneTake3D?.mount(null);
      }
    }
  }

  function showView(v) {
    clearNotice();
    ["home", "quiz", "summary", "mistakes", "study", "history"].forEach((id) => {
      const el = $(`view-${id}`);
      if (el) el.hidden = id !== v;
    });
    const highlightTab = v === "summary" ? summarySourceTab : v;
    document.querySelectorAll(".nav-tab").forEach((b) => {
      const active = b.dataset.tab === highlightTab;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    if (v === "home") {
      window.OneTake3D?.mount("home");
    } else if (v === "quiz") {
      syncQuiz3DVisibility();
    } else if (v !== "summary") {
      window.OneTake3D?.mount(null);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function launchExam() {
    startSession({
      mode: "exam",
      label: revealAtEndPref ? "模擬試 · 交卷揭曉" : "模擬試",
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
    $("quiz-dots-panel").hidden = true;
    $("btn-toggle-dots").setAttribute("aria-expanded", "false");
    showView("quiz");
    renderCurrentQuestion();
  }

  // ==================== RENDER HOME ====================
  function renderResumeBar() {
    const bar = $("resume-session-bar");
    if (!bar) return;
    const answeredCount = session ? Object.keys(session.answers).length : 0;
    const resumable = !!session && !session.submitted && answeredCount > 0 && answeredCount < session.questions.length;
    bar.hidden = !resumable;
    if (!resumable) return;
    $("resume-session-title").textContent = `未完成的${session.label}`;
    $("resume-session-meta").textContent = `進度：已答 ${answeredCount} / ${session.questions.length} 題（停留於第 ${session.index + 1} 題）`;
  }

  function renderHome() {
    renderResumeBar();
    const total = window.QUESTIONS.length;
    const mastered = window.QUESTIONS.filter((q) => (progressMap[q.id]?.box || 0) >= 3).length;
    const activeMistakes = getActiveMistakes();
    const dueCount = Math.max(getDueQuestions().length, activeMistakes.length);
    const readiness = computeReadiness();

    $("readiness-pct").textContent = `${readiness}%`;
    $("readiness-bar-fill").style.transform = `scaleX(${(readiness / 100).toFixed(4)})`;
    window.OneTake3D?.setReadiness(readiness);

    $("stat-mastered").textContent = `${mastered} / ${total}`;
    $("stat-exams-passed").textContent = `${stats.exams_passed || 0} 次`;
    $("stat-active-mistakes").textContent = String(activeMistakes.length);
    $("btn-stat-mistakes").classList.toggle("has-mistakes", activeMistakes.length > 0);

    const duePill = $("home-due-count");
    duePill.textContent = String(dueCount);
    duePill.hidden = dueCount === 0;

    $("count-image-qs").textContent = `${window.QUESTIONS.filter((q) => q.type === "image").length} 題`;
    $("count-text-qs").textContent = `${window.QUESTIONS.filter((q) => q.type === "text").length} 題`;
    $("count-trap-qs").textContent = `${window.QUESTIONS.filter((q) => q.trapTag).length} 題`;

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
      return `
        <button class="chapter-row" data-chapter="${cat.id}" type="button">
          <div class="chapter-info">
            <span class="chapter-name">
              <span class="chapter-dot" style="background:${cat.color}" aria-hidden="true"></span>
              <span>${esc(cat.name)}</span>
            </span>
            <div class="chapter-bar"><div class="chapter-fill" style="transform:scaleX(${ratio.toFixed(4)});background:${cat.color}"></div></div>
          </div>
          <div class="chapter-right tnum">
            <span>${done}/${qs.length}</span>
            ${err > 0 ? `<span class="chapter-err">${err} 錯</span>` : ""}
          </div>
        </button>`;
    }).join("");

    grid.querySelectorAll(".chapter-row").forEach((btn) => {
      btn.onclick = () => {
        const cat = window.CATEGORIES.find((c) => c.id === btn.dataset.chapter);
        if (!cat) return;
        const allCatQs = window.QUESTIONS.filter((q) => q.category === cat.id);
        startSession({
          mode: "chapter",
          label: `${cat.short} · 智能練習`,
          questions: prioritizePool(allCatQs, 20),
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
    $("quiz-score-live").textContent = session.revealAtEnd
      ? `已答 ${answered}/${total}`
      : answered > 0 ? `答對 ${right}/${answered}` : "";
    $("quiz-progress-fill").style.transform = `scaleX(${((idx + 1) / total).toFixed(4)})`;

    const comboPill = $("quiz-combo-pill");
    if (!session.revealAtEnd && session.combo >= 3) {
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
      d.onclick = () => {
        session.index = Number(d.dataset.qidx);
        $("quiz-dots-panel").hidden = true;
        $("btn-toggle-dots").setAttribute("aria-expanded", "false");
        renderCurrentQuestion();
      };
    });

    // Single quiet metadata line — no redundant type chips or rainbow pills
    const metaParts = [];
    if (cat) metaParts.push(`<span>${esc(cat.short)}</span>`);
    if (q.trapTag) metaParts.push(`<span class="meta-warn">${esc(q.trapTag)}</span>`);
    if (prevProg?.wrong_count > 0) metaParts.push(`<span class="meta-err tnum">曾錯 ${prevProg.wrong_count} 次</span>`);
    $("q-meta").innerHTML = metaParts.join(`<span class="meta-sep" aria-hidden="true">·</span>`);

    const showNow = !!ans && !session.revealAtEnd;

    const quiz3dBtn = $("btn-toggle-quiz-3d");
    if (quiz3dBtn) quiz3dBtn.hidden = false;
    const flatTrack = document.querySelector("#view-quiz .progress-track");
    if (flatTrack) flatTrack.hidden = quiz3dOn;
    if (quiz3dOn) {
      window.OneTake3D?.mount("quiz", { combo: session?.combo || 0 });
      const payload = buildQuizProgressPayload({ snap: false });
      if (payload) window.OneTake3D?.setProgress(payload);
    } else {
      window.OneTake3D?.mount(null);
    }

    const visual = $("q-visual");
    if (q.sign && window.SIGN_ASSETS[q.sign]) {
      visual.hidden = false;
      visual.innerHTML = window.renderSignImg(q.sign, { eager: true, hideAlt: !showNow });
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
          else { cls += " is-dimmed"; }
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

    const explainEl = $("explain-panel");
    const chosenWrongEl = $("explain-chosen-wrong");
    const hookWrap = $("explain-hook");
    const detailsFold = $("explain-details");
    const reflectFold = $("reflect-details");

    if (showNow) {
      explainEl.hidden = false;

      const statusEl = $("explain-status");
      if (ans.isRight && ans.wasPreviouslyWrong) {
        statusEl.textContent = "答對 · 錯題已掌握";
        statusEl.className = "explain-status is-redeemed";
      } else if (ans.isRight) {
        statusEl.textContent = "答對";
        statusEl.className = "explain-status is-right";
      } else {
        statusEl.textContent = `答錯 · 正解 ${q.answer}`;
        statusEl.className = "explain-status is-wrong";
      }

      $("explain-page").textContent = `${shortOrigin(q)} · P.${q.source.page}`;

      const emoEl = $("explain-emotion");
      if (emoEl) {
        if (ans.emotion) {
          emoEl.hidden = false;
          emoEl.className = `explain-emotion ${ans.emotion.style}`;
          emoEl.innerHTML = `<strong>${esc(ans.emotion.badge)}</strong>${esc(ans.emotion.text)}`;
        } else {
          emoEl.hidden = true;
          emoEl.innerHTML = "";
        }
      }

      // Show only the reason why the user's chosen option is wrong (avoid repeating option letter already highlighted above)
      if (!ans.isRight && q.whyWrong[ans.chosen]) {
        chosenWrongEl.hidden = false;
        chosenWrongEl.innerHTML = `<strong>錯因：</strong>${esc(q.whyWrong[ans.chosen])}`;
      } else {
        chosenWrongEl.hidden = true;
        chosenWrongEl.innerHTML = "";
      }

      $("explain-right-text").textContent = q.whyRight;

      if (q.memoryHook) {
        hookWrap.hidden = false;
        $("explain-hook-text").textContent = q.memoryHook;
      } else {
        hookWrap.hidden = true;
      }

      // Collapsed details: remaining wrong options + explicit provenance & official quote (no duplicate page number)
      detailsFold.open = false;
      const otherLetters = ["A", "B", "C"].filter((l) => l !== q.answer && (ans.isRight || l !== ans.chosen));
      const otherList = $("explain-other-wrong");
      if (otherLetters.length) {
        otherList.hidden = false;
        otherList.innerHTML = otherLetters
          .map((l) => `<li><span class="wrong-tag">${l}</span><span>${esc(q.whyWrong[l])}</span></li>`)
          .join("");
      } else {
        otherList.hidden = true;
        otherList.innerHTML = "";
      }
      $("explain-source-meta").textContent = fullSourceMeta(q, { includePage: false });
      $("explain-source-quote").textContent = `「${q.source.quote}」`;

      // Reflection fold: open automatically on wrong answers so 1-tap mistake tagging is effortless
      const prog = progressMap[q.id];
      if (!ans.isRight || prog?.personal_note || prog?.mistake_reason) {
        reflectFold.hidden = false;
        reflectFold.open = !ans.isRight;
        renderReflection(q.id, prog);
      } else {
        reflectFold.hidden = true;
      }
    } else {
      explainEl.hidden = true;
    }

    $("btn-prev-q").hidden = idx === 0;
    const isLast = idx === total - 1;
    const allDone = Object.keys(session.answers).length === total;

    if (session.revealAtEnd) {
      $("btn-next-q").hidden = isLast;
      $("btn-submit-exam").hidden = !allDone && !isLast;
      $("btn-submit-exam").textContent = allDone ? "交卷睇成績" : `交卷（餘 ${total - answered} 題）`;
    } else {
      $("btn-next-q").hidden = !ans || isLast;
      $("btn-submit-exam").hidden = !ans || !isLast;
      $("btn-submit-exam").textContent = "查看成績";
    }
  }

  function updateReflectPreview(prog) {
    const preview = $("reflect-summary-badge");
    if (!preview) return;
    const reasonLabel = window.MISTAKE_REASONS.find((r) => r.id === prog?.mistake_reason)?.label;
    const parts = [];
    if (reasonLabel) parts.push(reasonLabel);
    if (prog?.personal_note) parts.push(prog.personal_note);
    if (parts.length) {
      preview.textContent = parts.join(" · ");
      preview.hidden = false;
    } else {
      preview.textContent = "";
      preview.hidden = true;
    }
  }

  function renderReflection(qId, prog) {
    updateReflectPreview(prog);
    const chips = $("reason-chips");
    chips.innerHTML = window.MISTAKE_REASONS.map((r) => {
      const selected = prog?.mistake_reason === r.id;
      return `<button type="button" class="reason-chip ${selected ? "is-selected" : ""}" aria-pressed="${selected}" data-reason="${r.id}">${esc(r.label)}</button>`;
    }).join("");
    chips.querySelectorAll(".reason-chip").forEach((c) => {
      c.onclick = async () => {
        if (!progressMap[qId]) return;
        const nextVal = progressMap[qId].mistake_reason === c.dataset.reason ? null : c.dataset.reason;
        progressMap[qId].mistake_reason = nextVal;
        progressMap[qId].updated_at = new Date().toISOString();
        const synced = await syncQuestionProgress(progressMap[qId]);
        renderReflection(qId, progressMap[qId]);
        $("note-saved-hint").textContent = synced ? "已同步" : "已存本機";
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
      updateReflectPreview(progressMap[qId]);
      hint.textContent = synced ? "已同步" : "已存本機";
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
    } else {
      playTone("wrong");
    }
    const answered = Object.keys(session.answers).length;
    const right = Object.values(session.answers).filter((a) => a.isRight).length;
    if (quiz3dOn) {
      window.OneTake3D?.reactAnswer({
        isRight,
        combo: session.combo,
        wasPreviouslyWrong,
        answered,
        total: session.questions.length,
        right,
        isExam: session.mode === "exam",
        passMin: PASS_MIN,
        emotion
      });
    }

    renderCurrentQuestion();
    renderHome();
    requestAnimationFrame(() => {
      const panel = $("explain-panel");
      if (panel && !panel.hidden) {
        const rect = panel.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 16) {
          panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  }

  function finishSession({ force = false } = {}) {
    if (!session || session.submitted) return;
    const total = session.questions.length;
    if (session.revealAtEnd && !force) {
      const firstUnanswered = session.questions.findIndex((_, i) => !session.answers[i]);
      if (firstUnanswered !== -1) {
        const remaining = total - Object.keys(session.answers).length;
        session.index = firstUnanswered;
        renderCurrentQuestion();
        showNotice(`尚有 ${remaining} 題未作答，已跳至第 ${firstUnanswered + 1} 題。`, {
          ctaText: "仍要交卷",
          onCta: () => finishSession({ force: true }),
          duration: 9000
        });
        return;
      }
    }
    session.submitted = true;
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
      burstConfetti(44);
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
    summarySourceTab = "home";
    renderSummary(examRec);
    renderAll();
    showView("summary");
  }

  // ==================== SUMMARY & UNIFIED REVIEW CARDS ====================
  function renderSummary(rec) {
    const { total_questions: total, correct_count: correct, passed, answers } = rec;
    const pct = Math.round((correct / total) * 100);
    const wrongs = answers.filter((a) => !a.isRight);

    $("summary-hero").classList.toggle("is-fail", !passed);
    window.OneTake3D?.mount("summary", { passed });
    $("summary-status-pill").textContent = passed
      ? (total === EXAM_LEN ? "模擬試及格" : "已達標")
      : "未達標";
    $("summary-score-title").textContent = `${correct} / ${total}（${pct}%）`;
    $("summary-message").textContent =
      passed && wrongs.length === 0
        ? "全部答對，可隨時應考。"
        : passed
        ? "已達及格線，可即時重做錯題鞏固記憶。"
        : "未達及格線，先睇解析再重練。";

    const retryBtn = $("btn-retry-session-mistakes");
    if (wrongs.length > 0) {
      const hasUnanswered = wrongs.some((r) => r.chosen === "未答");
      retryBtn.hidden = false;
      retryBtn.textContent = hasUnanswered ? `重做 ${wrongs.length} 條錯／漏題` : `重做 ${wrongs.length} 條錯題`;
      retryBtn.onclick = () => startSession({
        mode: "mistakes",
        label: hasUnanswered ? "今次錯／漏題" : "今次錯題",
        questions: wrongs.map((r) => Q_BY_ID[r.qId]).filter(Boolean),
        revealAtEnd: false
      });
    } else {
      retryBtn.hidden = true;
    }

    document.querySelectorAll("#summary-filters .filter-btn[data-sfilter]").forEach((p) => {
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
    const expandBtn = $("btn-toggle-expand-summary");
    if (filtered.length) {
      let openedWrongs = 0;
      listEl.innerHTML = filtered.map((r) => {
        const shouldOpen = !r.isRight && openedWrongs < 3;
        if (shouldOpen) openedWrongs++;
        return buildReviewCard(Q_BY_ID[r.qId], r, shouldOpen);
      }).join("");
      bindReviewNotes(listEl);
      if (expandBtn) {
        expandBtn.hidden = false;
        const syncExpandText = () => {
          const items = Array.from(listEl.querySelectorAll("details.review-item"));
          const allOpen = items.length > 0 && items.every((d) => d.open);
          expandBtn.textContent = allOpen ? "全部收起" : "展開全部";
        };
        syncExpandText();
        expandBtn.onclick = () => {
          const items = Array.from(listEl.querySelectorAll("details.review-item"));
          const allOpen = items.every((d) => d.open);
          items.forEach((d) => { d.open = !allOpen; });
          syncExpandText();
        };
      }
    } else {
      if (expandBtn) expandBtn.hidden = true;
      listEl.innerHTML = `
        <div class="empty-state">
          <span>此篩選條件下未有符合題目。</span>
          <button type="button" class="btn btn-secondary btn-sm js-reset-sfilter">顯示全部</button>
        </div>`;
      const resetBtn = listEl.querySelector(".js-reset-sfilter");
      if (resetBtn) resetBtn.onclick = () => { summaryFilter = "all"; renderSummary(rec); };
    }
  }

  function buildReviewCard(q, info, openDefault = false) {
    const prog = progressMap[q.id];
    const isWrong = info ? !info.isRight : prog?.last_result === "wrong";
    const chosen = info ? info.chosen : prog?.last_selected_option;
    const reasonLabel = window.MISTAKE_REASONS.find((r) => r.id === prog?.mistake_reason)?.label;

    let statusHtml = "";
    if (isWrong) {
      const wrongTag = chosen && chosen !== "未答" ? `誤選 ${esc(chosen)}` : "未作答";
      statusHtml = `<span class="ans-wrong">${wrongTag}</span><span class="ans-sep" aria-hidden="true">→</span><span class="ans-right">正解 ${q.answer}</span>`;
    } else {
      statusHtml = `<span class="ans-right">答對 ${q.answer}</span>`;
    }

    const wrongItems = ["A", "B", "C"]
      .filter((l) => l !== q.answer)
      .map((l) => {
        const chosenTag = l === chosen ? `<strong>[你選]</strong> ` : "";
        const optText = q.options[l] ? `（${esc(q.options[l])}）` : "";
        return `<li><span class="wrong-tag">${l}</span><span>${chosenTag}${esc(q.whyWrong[l] || "")}${optText}</span></li>`;
      })
      .join("");

    const reasonChipsHtml = prog
      ? `<div class="reason-chips">${window.MISTAKE_REASONS.map((r) => {
          const selected = prog.mistake_reason === r.id;
          return `<button type="button" class="reason-chip js-review-reason ${selected ? "is-selected" : ""}" aria-pressed="${selected}" data-qid="${q.id}" data-reason="${r.id}">${esc(r.label)}</button>`;
        }).join("")}</div>`
      : "";

    return `
      <details class="review-item ${isWrong ? "is-wrong" : "is-right"}" ${openDefault ? "open" : ""}>
        <summary class="review-summary">
          <span class="review-dot" aria-hidden="true"></span>
          ${q.sign && window.SIGN_ASSETS[q.sign] ? `<div class="review-thumb">${window.renderSignImg(q.sign, { thumb: true })}</div>` : ""}
          <div class="review-head">
            <div class="review-q">${esc(q.prompt)}</div>
            <div class="review-ans-line">
              ${statusHtml}
              <span class="ans-opt">${esc(q.options[q.answer])}</span>
              ${reasonLabel ? `<span>· ${esc(reasonLabel)}</span>` : ""}
            </div>
          </div>
        </summary>
        <div class="review-body">
          ${q.sign && window.SIGN_ASSETS[q.sign] ? `<div class="q-visual">${window.renderSignImg(q.sign)}</div>` : ""}
          <p class="explain-main"><strong>正解 ${q.answer}：</strong>${esc(q.whyRight)}</p>
          ${wrongItems ? `<ul class="other-wrong-list">${wrongItems}</ul>` : ""}
          ${q.memoryHook ? `<p class="explain-hook"><span class="hook-k">口訣</span><span>${esc(q.memoryHook)}</span></p>` : ""}
          <div class="source-block">
            <div class="source-loc">${esc(fullSourceMeta(q, { includePage: true }))}</div>
            <blockquote class="source-quote">「${esc(q.source.quote)}」</blockquote>
          </div>
          ${prog ? `<div class="review-note-wrap">
            <span class="review-note-meta tnum">錯因與筆記 · 對 ${prog.correct_count} / 錯 ${prog.wrong_count}</span>
            ${reasonChipsHtml}
            <div class="note-row">
              <input type="text" class="text-input js-review-note" data-qid="${q.id}" value="${esc(prog.personal_note || "")}" placeholder="寫低防錯提醒…" maxlength="120" autocomplete="off" aria-label="個人筆記">
              <button type="button" class="btn btn-secondary btn-sm js-save-review-note" data-qid="${q.id}">儲存</button>
            </div>
          </div>` : ""}
        </div>
      </details>`;
  }

  function bindReviewNotes(container) {
    container.querySelectorAll(".js-review-reason").forEach((chip) => {
      chip.onclick = async () => {
        const qId = chip.dataset.qid;
        const reasonId = chip.dataset.reason;
        if (!progressMap[qId]) return;
        const nextVal = progressMap[qId].mistake_reason === reasonId ? null : reasonId;
        progressMap[qId].mistake_reason = nextVal;
        progressMap[qId].updated_at = new Date().toISOString();
        container.querySelectorAll(`.js-review-reason[data-qid="${qId}"]`).forEach((b) => {
          const sel = b.dataset.reason === nextVal;
          b.classList.toggle("is-selected", sel);
          b.setAttribute("aria-pressed", String(sel));
        });
        await syncQuestionProgress(progressMap[qId]);
      };
    });
    container.querySelectorAll(".js-save-review-note").forEach((btn) => {
      const qId = btn.dataset.qid;
      const input = container.querySelector(`.js-review-note[data-qid="${qId}"]`);
      const save = async () => {
        if (!input || !progressMap[qId]) return;
        progressMap[qId].personal_note = input.value.trim();
        progressMap[qId].updated_at = new Date().toISOString();
        const synced = await syncQuestionProgress(progressMap[qId]);
        btn.textContent = synced ? "已存" : "本機已存";
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
    if (mistakeReasonFilter && !rc[mistakeReasonFilter]) mistakeReasonFilter = null;
    const reasonEl = $("reason-stats");
    if (entries.length) {
      reasonEl.hidden = false;
      reasonEl.innerHTML = entries
        .map((r) => {
          const active = mistakeReasonFilter === r.id;
          return `<button type="button" class="reason-stat-pill tnum ${active ? "is-active" : ""}" aria-pressed="${active}" data-rfilter="${r.id}">${esc(r.label)} × ${rc[r.id]}</button>`;
        })
        .join("");
      reasonEl.querySelectorAll(".reason-stat-pill").forEach((b) => {
        b.onclick = () => {
          mistakeReasonFilter = mistakeReasonFilter === b.dataset.rfilter ? null : b.dataset.rfilter;
          renderMistakeBook();
        };
      });
    } else {
      reasonEl.hidden = true;
      reasonEl.innerHTML = "";
    }

    const activePool = getActiveMistakes();
    const everPool = getAllEverWrong();
    const filterCounts = {
      active: activePool.length,
      all: everPool.length,
      image: everPool.filter((q) => q.type === "image").length,
      text: everPool.filter((q) => q.type === "text").length
    };
    const filterLabels = { active: "待擊破", all: "全部曾錯", image: "圖片題", text: "文字題" };

    document.querySelectorAll("#mistake-filters .filter-btn").forEach((p) => {
      const f = p.dataset.mfilter;
      const active = f === mistakeFilter;
      p.textContent = filterCounts[f] > 0 ? `${filterLabels[f]} (${filterCounts[f]})` : filterLabels[f];
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-pressed", String(active));
      p.onclick = () => { mistakeFilter = f; renderMistakeBook(); };
    });

    let list = mistakeFilter === "active" ? activePool : everPool;
    if (mistakeFilter === "image") list = everPool.filter((q) => q.type === "image");
    else if (mistakeFilter === "text") list = everPool.filter((q) => q.type === "text");
    if (mistakeReasonFilter) {
      list = list.filter((q) => progressMap[q.id]?.mistake_reason === mistakeReasonFilter);
    }

    const box = $("mistake-list");
    if (list.length) {
      box.innerHTML = list.map((q) => buildReviewCard(q, null, false)).join("");
      bindReviewNotes(box);
    } else {
      const msg = mistakeReasonFilter
        ? "此錯因分類下未有符合錯題。"
        : mistakeFilter === "active"
        ? "目前零待擊破錯題。"
        : "暫無錯題紀錄，先考一卷檢測盲點。";
      box.innerHTML = `
        <div class="empty-state">
          <span>${msg}</span>
          ${mistakeReasonFilter
            ? `<button type="button" class="btn btn-secondary btn-sm js-clear-rfilter">清除錯因篩選</button>`
            : `<button type="button" class="btn btn-primary btn-sm js-empty-launch">開始模擬試</button>`}
        </div>`;
      const clearBtn = box.querySelector(".js-clear-rfilter");
      if (clearBtn) clearBtn.onclick = () => { mistakeReasonFilter = null; renderMistakeBook(); };
      const btn = box.querySelector(".js-empty-launch");
      if (btn) btn.onclick = launchExam;
    }
  }

  function renderStudyLab() {
    const cards = window.CONTRAST_CARDS || [];
    const heading = $("study-heading");
    if (heading) heading.textContent = `${cards.length} 組高頻易混淆對比卡`;

    const groupLabels = {
      all: "全部",
      command: "禁令指令",
      warning: "警告路牌",
      signals: "燈號手號",
      markings: "地面標記",
      numbers: "數字新例"
    };
    const counts = { all: cards.length };
    for (const c of cards) counts[c.group] = (counts[c.group] || 0) + 1;

    document.querySelectorAll("#study-filters .filter-btn").forEach((b) => {
      const f = b.dataset.sfilter;
      const active = f === studyFilter;
      const n = counts[f] || 0;
      b.textContent = `${groupLabels[f] || f} (${n})`;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
      b.onclick = () => {
        if (studyFilter === f) return;
        studyFilter = f;
        renderStudyLab();
      };
    });

    const filtered = studyFilter === "all" ? cards : cards.filter((c) => c.group === studyFilter);
    const renderSide = (item) => `
      <div class="contrast-side">
        ${item.sign
          ? `<div class="contrast-svg">${window.renderSignImg(item.sign)}</div>`
          : `<div class="contrast-stat"><strong class="tnum">${esc(item.stat)}</strong><span>${esc(item.statSub || "")}</span></div>`}
        <strong>${esc(item.label)}</strong>
        <p>${esc(item.rule)}</p>
      </div>`;

    $("contrast-grid").innerHTML = filtered.map((c) => {
      const list = Array.isArray(c.items) ? c.items : [c.left, c.right];
      const trioCls = list.length >= 3 ? " is-trio" : "";
      return `
        <article class="contrast-card">
          <div class="contrast-head">
            <h3>${esc(c.title)}</h3>
            <span class="contrast-page tnum">${esc(c.page)}</span>
          </div>
          <div class="contrast-pair${trioCls}">
            ${list.map(renderSide).join("")}
          </div>
          <div class="contrast-hook"><span class="hook-k">口訣</span><span>${esc(c.hook)}</span></div>
        </article>`;
    }).join("");
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
    const names = { exam: "模擬試", srs: "到期複習", mistakes: "錯題特訓", signs: "圖片路牌", practice: "專項練習", chapter: "章節溫習" };
    el.innerHTML = examHistory.map((rec, i) => {
      const dt = new Date(rec.created_at);
      const dateStr = isNaN(dt) ? "" : dt.toLocaleString("zh-HK", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
      const pct = Math.round((rec.correct_count / rec.total_questions) * 100);
      return `
        <div class="history-row">
          <div class="history-meta">
            <strong>${names[rec.mode] || "練習"}</strong>
            <span class="sec-sub tnum">${esc(dateStr)}</span>
          </div>
          <div class="history-right">
            <span class="history-score ${rec.passed ? "is-pass" : "is-fail"}">${rec.correct_count}/${rec.total_questions} <small>(${pct}%)</small></span>
            <button type="button" class="btn btn-secondary btn-sm js-open-hist" data-hidx="${i}">回顧</button>
          </div>
        </div>`;
    }).join("");
    el.querySelectorAll(".js-open-hist").forEach((b) => {
      b.onclick = () => {
        const rec = examHistory[Number(b.dataset.hidx)];
        if (!rec) return;
        summaryFilter = "all";
        summarySourceTab = "history";
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

  // ==================== ACCESSIBLE MODAL & DATABASE RESET ====================
  let isResettingDb = false;

  function getModalFocusables() {
    const card = document.querySelector("#sync-modal .modal-card");
    if (!card) return [];
    return Array.from(
      card.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.closest("[hidden]"));
  }

  function resetConfirmUI() {
    $("reset-trigger-row").hidden = false;
    $("reset-confirm-box").hidden = true;
    $("reset-error-msg").hidden = true;
    $("reset-error-msg").textContent = "";
    const confirmBtn = $("btn-confirm-reset");
    const cancelBtn = $("btn-cancel-reset");
    confirmBtn.disabled = false;
    cancelBtn.disabled = false;
    confirmBtn.removeAttribute("aria-busy");
    confirmBtn.textContent = "確認清除全部資料";
  }

  function openResetConfirm() {
    const qCount = Object.keys(progressMap).length;
    const examCount = examHistory.length;
    $("reset-confirm-copy").textContent =
      `將永久清除代號「${profileId}」在雲端及本機的所有資料（${qCount} 題進度、${examCount} 份考試紀錄及個人筆記），並還原至初始狀態，無法復原。`;
    $("reset-error-msg").hidden = true;
    $("reset-trigger-row").hidden = true;
    $("reset-confirm-box").hidden = false;
    requestAnimationFrame(() => $("btn-cancel-reset").focus());
  }

  async function clearAllDatabase() {
    if (isResettingDb) return;
    isResettingDb = true;
    const confirmBtn = $("btn-confirm-reset");
    const cancelBtn = $("btn-cancel-reset");
    const errEl = $("reset-error-msg");
    errEl.hidden = true;
    confirmBtn.disabled = true;
    cancelBtn.disabled = true;
    confirmBtn.setAttribute("aria-busy", "true");
    confirmBtn.textContent = "清除中…";

    let cloudCleared = false;
    try {
      if (!db && window.supabase) {
        db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      }
      if (db) {
        const [pDel, eDel, sDel] = await Promise.all([
          db.from("onetake_progress").delete().eq("profile_id", profileId),
          db.from("onetake_exams").delete().eq("profile_id", profileId),
          db.from("onetake_stats").delete().eq("profile_id", profileId)
        ]);
        const err = pDel.error || eDel.error || sDel.error;
        if (err) throw err;
        cloudCleared = true;
      }

      localStorage.removeItem(cacheKey("progress"));
      localStorage.removeItem(cacheKey("stats"));
      localStorage.removeItem(cacheKey("exams"));
      localStorage.removeItem("onetake_reveal_end");

      progressMap = {};
      examHistory = [];
      stats = { total_answered: 0, total_correct: 0, best_combo: 0, current_combo: 0, exams_passed: 0, xp: 0 };
      session = null;
      summaryFilter = "all";
      mistakeFilter = "active";
      revealAtEndPref = false;

      setSyncUI(cloudCleared ? true : false, cloudCleared ? "已同步" : "離線");
      isResettingDb = false;
      closeSyncModal({ restoreFocus: false, force: true });
      showView("home");
      renderAll();
      showNotice(
        cloudCleared
          ? `已清除代號「${profileId}」的雲端及本機資料，並還原至初始狀態。`
          : `已清除代號「${profileId}」的本機資料（目前離線，雲端資料尚未清除）。`
      );
    } catch (err) {
      console.warn("Clear database failed:", err);
      errEl.textContent = "雲端清除失敗，請檢查網絡連線後重試。";
      errEl.hidden = false;
      confirmBtn.disabled = false;
      cancelBtn.disabled = false;
      confirmBtn.removeAttribute("aria-busy");
      confirmBtn.textContent = "確認清除全部資料";
    } finally {
      isResettingDb = false;
    }
  }

  function openSyncModal() {
    lastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const input = $("input-profile-id");
    input.value = profileId;
    resetConfirmUI();
    setSyncUI(syncState.ok, syncState.text);
    $("sync-modal").hidden = false;
    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  }

  function closeSyncModal({ restoreFocus = true, force = false } = {}) {
    if (isResettingDb && !force) return;
    const modal = $("sync-modal");
    if (modal.hidden) return;
    modal.hidden = true;
    resetConfirmUI();
    const target = restoreFocus ? lastFocusedEl : null;
    lastFocusedEl = null;
    if (target && typeof target.focus === "function") {
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    }
  }

  // ==================== IMAGE ZOOM LIGHTBOX (product-design + ui-animation) ====================
  let lightboxTriggerEl = null;
  let lightboxCloseTimer = null;

  function setLightboxZoom(zoomed) {
    const pad = $("lightbox-pad");
    const btn = $("btn-zoom-toggle");
    if (!pad || !btn) return;
    pad.classList.toggle("is-zoomed", zoomed);
    btn.textContent = zoomed ? "還原" : "放大";
    btn.setAttribute("aria-pressed", String(zoomed));
  }

  function openLightbox(imgEl) {
    const backdrop = $("image-lightbox");
    const targetImg = $("lightbox-img");
    const captionEl = $("lightbox-caption");
    if (!backdrop || !targetImg || !imgEl) return;

    if (lightboxCloseTimer) {
      clearTimeout(lightboxCloseTimer);
      lightboxCloseTimer = null;
    }
    backdrop.classList.remove("is-closing");
    lightboxTriggerEl = imgEl;

    targetImg.src = imgEl.currentSrc || imgEl.src;
    targetImg.alt = imgEl.alt || "圖片放大檢視";

    // Anti-spoiler: do not reveal sign meaning during an unanswered quiz question
    const inUnrevealedQuiz =
      !!imgEl.closest("#view-quiz") &&
      !!session &&
      (!session.answers[session.index] || session.revealAtEnd);
    const fullAssetAlt = imgEl.dataset?.signKey && window.SIGN_ASSETS?.[imgEl.dataset.signKey]?.alt;
    captionEl.textContent = inUnrevealedQuiz
      ? "點擊圖片切換放大倍率 · 按 Esc 關閉"
      : (fullAssetAlt || imgEl.alt || "圖片放大檢視");

    setLightboxZoom(false);
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      $("btn-close-lightbox")?.focus();
    });
  }

  function closeLightbox({ restoreFocus = true } = {}) {
    const backdrop = $("image-lightbox");
    if (!backdrop || backdrop.hidden) return;
    const finish = () => {
      backdrop.hidden = true;
      backdrop.classList.remove("is-closing");
      setLightboxZoom(false);
      const target = restoreFocus ? lightboxTriggerEl : null;
      lightboxTriggerEl = null;
      if (target && typeof target.focus === "function" && target.isConnected) {
        requestAnimationFrame(() => target.focus());
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    backdrop.classList.add("is-closing");
    lightboxCloseTimer = setTimeout(() => {
      lightboxCloseTimer = null;
      finish();
    }, 150);
  }

  // ==================== THEME, SOUND & EVENTS ====================
  function updateThemeColorMeta(isDark) {
    const color = isDark ? "#0B0E13" : "#FAF9F6";
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
    window.OneTake3D?.setTheme(isDark);

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
    clearNotice();
    closeSyncModal();
    initSupabaseAndLoad();
  }

  function bindEvents() {
    document.querySelectorAll(".nav-tab").forEach((b) => {
      b.onclick = () => { showView(b.dataset.tab); renderAll(); };
    });
    $("btn-home-brand").onclick = () => { showView("home"); renderHome(); };
    $("btn-stat-mistakes").onclick = () => { showView("mistakes"); renderMistakeBook(); };

    $("seg-instant").onclick = () => { revealAtEndPref = false; localStorage.setItem("onetake_reveal_end", "0"); renderHome(); };
    $("seg-exam").onclick = () => { revealAtEndPref = true; localStorage.setItem("onetake_reveal_end", "1"); renderHome(); };

    $("btn-start-exam").onclick = launchExam;
    $("btn-new-exam").onclick = launchExam;
    $("btn-history-new-exam").onclick = launchExam;

    $("btn-resume-session").onclick = () => {
      if (!session || session.submitted) return;
      $("quiz-mode-label").textContent = session.label;
      showView("quiz");
      renderCurrentQuestion();
    };
    $("btn-discard-session").onclick = () => {
      session = null;
      renderHome();
    };

    $("btn-start-srs").onclick = () => {
      const due = getDueQuestions();
      if (due.length > 0) {
        startSession({ mode: "srs", label: "到期複習", questions: due.slice(0, 20), revealAtEnd: false });
        return;
      }
      startSession({
        mode: "srs",
        label: "智能精選複習",
        questions: prioritizePool(window.QUESTIONS, 15),
        revealAtEnd: false
      });
      showNotice("目前零到期複習題，已自動精選 15 題未熟題目溫習。", { duration: 4500 });
    };

    const launchSigns = () => startSession({
      mode: "signs",
      label: "圖片路牌",
      questions: prioritizePool(window.QUESTIONS.filter((q) => q.type === "image"), 20),
      revealAtEnd: false
    });
    $("btn-mode-signs").onclick = launchSigns;
    if ($("btn-study-drill-signs")) $("btn-study-drill-signs").onclick = launchSigns;
    $("btn-mode-text").onclick = () => startSession({ mode: "practice", label: "文字數字", questions: prioritizePool(window.QUESTIONS.filter((q) => q.type === "text"), 20), revealAtEnd: false });
    $("btn-mode-traps").onclick = () => startSession({ mode: "practice", label: "高頻陷阱", questions: prioritizePool(window.QUESTIONS.filter((q) => !!q.trapTag), 20), revealAtEnd: false });

    $("btn-toggle-quiz-3d").onclick = () => {
      quiz3dOn = !quiz3dOn;
      localStorage.setItem("onetake_quiz_3d", quiz3dOn ? "on" : "off");
      syncQuiz3DVisibility();
    };

    $("btn-drill-mistakes-page").onclick = () => {
      const pool = getActiveMistakes().length ? getActiveMistakes() : getAllEverWrong();
      if (!pool.length) {
        showNotice("暫無錯題紀錄，先考一份模擬試自動收集盲點。", { ctaText: "開始模擬試", onCta: launchExam });
        return;
      }
      startSession({ mode: "mistakes", label: "錯題特訓", questions: shuffle(pool).slice(0, 20), revealAtEnd: false });
    };

    $("btn-toggle-dots").onclick = () => {
      const panel = $("quiz-dots-panel");
      const open = panel.hidden;
      panel.hidden = !open;
      $("btn-toggle-dots").setAttribute("aria-expanded", String(open));
    };

    $("btn-quiz-exit").onclick = () => { showView("home"); renderHome(); };
    $("btn-prev-q").onclick = () => { if (session && session.index > 0) { session.index--; renderCurrentQuestion(); } };
    $("btn-next-q").onclick = () => { if (session && session.index < session.questions.length - 1) { session.index++; renderCurrentQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); } };
    $("btn-submit-exam").onclick = () => finishSession();
    $("btn-summary-home").onclick = () => { showView("home"); renderHome(); };

    document.addEventListener("keydown", (e) => {
      if (!$("image-lightbox").hidden) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
          return;
        }
        if (e.key === "Tab") {
          const focusables = Array.from(
            document.querySelectorAll('#image-lightbox button:not([disabled])')
          );
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first || !$("image-lightbox").contains(document.activeElement)) {
              e.preventDefault();
              last.focus();
            }
          } else if (document.activeElement === last || !$("image-lightbox").contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
        return;
      }

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

      if ($("view-quiz").hidden || !session) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (document.activeElement?.matches?.("img.sign-img")) return;
      const k = e.key.toUpperCase();
      if (k === "A" || k === "1") handleOptionSelect("A");
      else if (k === "B" || k === "2") handleOptionSelect("B");
      else if (k === "C" || k === "3") handleOptionSelect("C");
      else if (k === "ARROWLEFT") {
        if (!$("btn-prev-q").hidden) $("btn-prev-q").click();
      } else if (k === "ENTER" || k === "ARROWRIGHT") {
        if (!$("btn-next-q").hidden) $("btn-next-q").click();
        else if (!$("btn-submit-exam").hidden) $("btn-submit-exam").click();
      }
    });

    // Delegated click & keyboard zoom for all sign images across every view
    document.addEventListener("click", (e) => {
      const img =
        e.target.closest("img.sign-img") ||
        e.target.closest(".q-visual, .contrast-svg")?.querySelector("img.sign-img");
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      openLightbox(img);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const img = document.activeElement?.matches?.("img.sign-img") ? document.activeElement : null;
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      openLightbox(img);
    });

    $("btn-close-lightbox").onclick = () => closeLightbox();
    $("btn-zoom-toggle").onclick = () => {
      const isZoomed = $("lightbox-pad").classList.contains("is-zoomed");
      setLightboxZoom(!isZoomed);
    };
    $("lightbox-img").onclick = () => {
      const isZoomed = $("lightbox-pad").classList.contains("is-zoomed");
      setLightboxZoom(!isZoomed);
    };
    $("image-lightbox").onclick = (e) => {
      if (e.target === $("image-lightbox") || e.target === $("lightbox-stage")) closeLightbox();
    };

    $("btn-sound").onclick = () => {
      soundOn = !soundOn;
      localStorage.setItem("onetake_sound", soundOn ? "on" : "off");
      updateSoundBtn();
      if (soundOn) playTone("correct", 1);
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
    $("btn-open-reset").onclick = openResetConfirm;
    $("btn-cancel-reset").onclick = () => {
      resetConfirmUI();
      $("btn-open-reset").focus();
    };
    $("btn-confirm-reset").onclick = clearAllDatabase;
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
