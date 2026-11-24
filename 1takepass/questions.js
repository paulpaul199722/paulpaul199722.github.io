// 1TakePass Question Bank — HK Private Car Automatic (1A) Written Test
// Grounded in《道路使用者守則》2020年6月版 · Concise, high-signal edition

window.CATEGORIES = [
  { id: "driver_safety", name: "酒駕 · 安全帶 · P牌", short: "酒駕與P牌", icon: "shield", color: "#005EB8" },
  { id: "driving_skills", name: "車速 · 停車距離 · 超車", short: "車速與超車", icon: "gauge", color: "#B45309" },
  { id: "lanes_highways", name: "行車線 · 快速公路 · 迴旋處", short: "公路與路口", icon: "route", color: "#007A4D" },
  { id: "weather_parking", name: "夜間天氣 · 工程 · 自動波泊車", short: "天氣與泊車", icon: "parking", color: "#6D28D9" },
  { id: "signs_signals", name: "交通標誌 · 燈號 · 手號", short: "路牌與燈號", icon: "traffic", color: "#C81E1E" },
  { id: "pedestrians_emergency", name: "行人 · 意外處理 · 急救", short: "行人與急救", icon: "heart", color: "#0F766E" }
];

window.QUESTIONS = [
  // ==================== 1. 酒駕 · 安全帶 · P牌 ====================
  {
    id: "q01",
    category: "driver_safety",
    type: "text",
    trapTag: "數字",
    prompt: "駕駛考試的視力標準，須在充足光線下清楚讀出相距多遠的車牌號碼？",
    options: { A: "18 米", B: "23 米", C: "30 米" },
    answer: "B",
    whyRight: "法定視力標準為相距 23 米讀出車牌，須戴眼鏡才達標者駕車必戴。",
    whyWrong: { A: "18 米短於法定標準。", C: "30 米高於法定標準。" },
    source: { chapter: "第五章", section: "駕駛車輛", page: 41, quote: "在充足光線下，可清楚讀出與你相距23米的車牌號碼。" },
    memoryHook: "視力 23 米 ≈ 兩架雙層巴士（12m × 2 − 1m）。"
  },
  {
    id: "q02",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "體內酒精比例的法定上限（每 100 毫升）哪一組正確？",
    options: {
      A: "呼氣 22 微克／血液 50 毫克／尿液 67 毫克",
      B: "呼氣 50 微克／血液 22 毫克／尿液 67 毫克",
      C: "呼氣 22 微克／血液 67 毫克／尿液 50 毫克"
    },
    answer: "A",
    whyRight: "法定上限：呼氣 22 微克、血液 50 毫克、尿液 67 毫克（每 100 毫升）。",
    whyWrong: { B: "呼氣（22）與血液（50）調轉。", C: "血液（50）與尿液（67）調轉。" },
    source: { chapter: "第五章", section: "法定上限", page: 41, quote: "每100毫升呼氣中有22微克、血液中有50毫克、或尿液中有67毫克酒精。" },
    memoryHook: "呼血尿由細到大：22 → 50 → 67。"
  },
  {
    id: "q03",
    category: "driver_safety",
    type: "text",
    trapTag: "自動波",
    prompt: "自動波私家車司機如須下車協助乘客上落，離開前必須做甚麼？",
    options: {
      A: "入空波（N 波）並拉緊停泊制動器，無須熄匙",
      B: "關掉引擎、入泊車波（P 波），並拉緊停泊制動器",
      C: "亮起危險警告燈並入泊車波，引擎可繼續運轉"
    },
    answer: "B",
    whyRight: "離車前必須關掉引擎、自動波入 P 波、拉緊停泊制動器。",
    whyWrong: { A: "空波未鎖波箱且未熄匙，易溜車。", C: "未熄匙兼未拉緊手掣屬違規。" },
    source: { chapter: "第五章", section: "你的乘客", page: 41, quote: "必須先關掉引擎，入一波／後波或泊車波（自動波），並拉緊停泊制動器。（亦見第50頁）" },
    memoryHook: "自動波離車三寶：熄匙 ＋ 入 P 波 ＋ 拉手掣。"
  },
  {
    id: "q04",
    category: "driver_safety",
    type: "text",
    trapTag: "數字",
    prompt: "私家車輪胎胎紋最少須有多深，並蓋過胎面多少寬度？",
    options: {
      A: "深 1 毫米，蓋過四分三寬度",
      B: "深 2 毫米，蓋過二分一寬度",
      C: "深 1.5 毫米，蓋過整個胎面"
    },
    answer: "A",
    whyRight: "胎紋最少深 1 毫米，且起碼蓋過輪胎面四分三（3/4）寬度。",
    whyWrong: { B: "2 毫米是單車車鏈虛位，非汽車胎紋。", C: "官方下限是 1 毫米及四分三寬度。" },
    source: { chapter: "第五章", section: "安全檢查", page: 42, quote: "輪胎的胎紋至少要深1毫米，並且起碼要蓋過輪胎面四分三的寬度。" },
    memoryHook: "胎紋「1mm ＋ 3/4」；行車證貼擋風玻璃左方。"
  },
  {
    id: "q05",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "私家車駕駛人在以下哪種情況可獲免佩戴安全帶？",
    options: {
      A: "懷孕滿六個月的女司機",
      B: "進行涉及倒車的操作時（如三手軚掉頭或倒車泊位）",
      C: "在限速 50 公里的屋邨路短程行駛"
    },
    answer: "B",
    whyRight: "進行涉及倒車操作（如三手軚掉頭或倒後泊位）可免佩戴安全帶。",
    whyWrong: { A: "懷孕婦女須戴安全帶，沒有自動豁免。", C: "低速碰撞同樣致命，不可免戴。" },
    source: { chapter: "第五章", section: "汽車座位安全帶", page: 43, quote: "但如進行涉及倒車的操作時（例如用「三手軚」掉頭，或要向前及倒後駛入泊車位）則除外。" },
    memoryHook: "安全帶免戴例外＝倒車操作；孕婦冇自動豁免。"
  },
  {
    id: "q06",
    category: "driver_safety",
    type: "text",
    prompt: "懷孕婦女乘坐或駕駛私家車時，應如何正確佩戴安全帶？",
    options: {
      A: "橫帶調低至腹下緊貼盤骨，斜帶橫越兩乳中間及腹上",
      B: "橫帶輕放腹部中央，並用夾子固定",
      C: "只戴斜帶，橫帶置於身後"
    },
    answer: "A",
    whyRight: "橫帶落腹下大腿骨上緊貼盤骨，斜帶過兩乳中間及腹上，保護母嬰。",
    whyWrong: { B: "不可橫越腹部，用安全帶夾屬違法。", C: "只戴斜帶無法固定下半身，極危險。" },
    source: { chapter: "第五章", section: "孕婦如何佩戴安全帶", page: 44, quote: "橫帶應調低至兩臀骨位置（腹下及大腿骨上）……斜帶橫越兩乳中間及腹部之上。" },
    memoryHook: "孕婦戴法：橫帶肚底貼盤骨，斜帶腹上兩乳間，禁用夾。"
  },
  {
    id: "q07",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於安全氣袋與兒童安全，下列哪項正確？",
    options: {
      A: "裝有安全氣袋的座位可免戴安全帶",
      B: "背向後仰式嬰孩安全裝置不可置於前排有氣袋的座位",
      C: "前座乘客可抱未滿 3 歲幼童共用一條安全帶"
    },
    answer: "B",
    whyRight: "氣袋彈出力度猛烈，背向式嬰孩裝置絕不可放前排有氣袋座位，應放後座。",
    whyWrong: { A: "氣袋只作輔助，絕不能取代安全帶。", C: "切勿抱幼童或二人共用一條安全帶。" },
    source: { chapter: "第五章", section: "安全氣袋", page: 46, quote: "幼童如使用背向後仰式嬰孩安全裝置，不可置於前排設有氣袋的座位上。" },
    memoryHook: "氣袋只輔助唔取代；背向 BB 籃禁放前座氣袋位。"
  },
  {
    id: "q08",
    category: "driver_safety",
    type: "image",
    sign: "p_plate",
    trapTag: "自動波",
    prompt: "私家車暫准駕駛執照（展示上圖「P」牌）的限制，哪項正確？",
    options: {
      A: "暫准期至少 12 個月，即使道路限速逾 70 公里仍不可超 70 公里",
      B: "暫准期為 6 個月，在快速公路任何情況不可超車",
      C: "暫准期內不可載客，亦不可夜間駕駛"
    },
    answer: "A",
    whyRight: "P 牌至少 12 個月、前後掛 P、極速 70 km/h、三線以上快速公路禁行最右線（右出除外）。",
    whyWrong: { B: "是 12 個月，且快速公路可超車（非三線最右線）。", C: "禁載客僅限電單車 P 牌及學牌，私家車 P 牌可載客。" },
    source: { chapter: "第五章", section: "暫准駕駛執照計劃", page: 48, quote: "通過至少12個月暫准期……前後展示「P」牌……不得行駛超過每小時70公里。" },
    memoryHook: "私家車 P 牌：12 個月 · 前後 P · 極速 70 · 三線唔行最右。"
  },
  {
    id: "q09",
    category: "driver_safety",
    type: "image",
    sign: "no_learners",
    prompt: "上圖交通標誌代表甚麼意思？",
    options: {
      A: "前面有學校，減速留意學童",
      B: "禁止由學習駕駛人駕駛的汽車駛入",
      C: "前面為考場路段，只准學車駛入"
    },
    answer: "B",
    whyRight: "紅圈斜線屬禁制標誌，內有「L 學」，即禁止學習駕駛人駛入。",
    whyWrong: { A: "學校警告是紅邊三角形配兩名學童。", C: "紅圈斜線為禁止，非只准。" },
    source: { chapter: "第五章／第八章", section: "學習駕駛／標誌 #39", page: 47, quote: "學習駕駛人不可駛越此標誌，或在標誌生效的道路上駕駛。（亦見第112頁 #39）" },
    memoryHook: "紅線劈開「學」字＝學牌禁入。"
  },
  {
    id: "q10",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "兩年內違例駕駛記滿幾分須強制修習駕駛改進課程？記滿幾分可被取消資格？",
    options: {
      A: "8 分修習課程；12 分取消資格",
      B: "10 分修習課程；15 分取消資格",
      C: "12 分修習課程；18 分取消資格"
    },
    answer: "B",
    whyRight: "兩年內累積 10 分須修習駕駛改進課程（修畢扣減 3 分）；滿 15 分法庭可停牌。",
    whyWrong: { A: "8 分與 12 分皆非香港法定門檻。", C: "12 分與 18 分過高。" },
    source: { chapter: "第五章", section: "駕駛改進課程／記分制", page: 48, quote: "過去兩年內累積達10分須修習該課程……被記滿15分或以上，法庭可取消駕駛資格。" },
    memoryHook: "記分三數字：10 分讀班、修畢減 3 分、15 分停牌。"
  },
  {
    id: "q11",
    category: "driver_safety",
    type: "text",
    prompt: "使用車輛的「輔助駕駛系統」時，駕駛人應該怎樣做？",
    options: {
      A: "啟動後可放開雙手休息，只須望向前方",
      B: "時刻留意路面情況及手握軚盤，準備隨時恢復人手操控",
      C: "在快速公路使用時可閱讀手機短訊"
    },
    answer: "B",
    whyRight: "使用輔助系統時仍須時刻留意路面及手握軚盤，以便緊急時即刻接管。",
    whyWrong: { A: "絕不可放手，並非全自動駕駛。", C: "行車讀寫短訊分心兼違規。" },
    source: { chapter: "第五章", section: "輔助駕駛系統", page: 42, quote: "你仍要時刻留意路面的交通情況及手握軚盤，以準備於緊急時立刻恢復人手操控。" },
    memoryHook: "輔助唔係自動：雙手永遠握軚盤！"
  },
  {
    id: "q12",
    category: "driver_safety",
    type: "text",
    prompt: "私家車計算載客人數時，小童如何折算？",
    options: {
      A: "未滿 3 歲不計；3 名 3 歲以上不高於 1.3 米小童作 2 名乘客",
      B: "所有年齡小童均 1 對 1 計算",
      C: "未滿 5 歲不計；2 名小童作 1 名成人"
    },
    answer: "A",
    whyRight: "未滿 3 歲不計；3 名 3 歲或以上且不高於 1.3 米小童可作 2 名乘客。",
    whyWrong: { B: "忽略法例對幼童的計數規則。", C: "年齡是未滿 3 歲，折算是 3 名作 2 名。" },
    source: { chapter: "第五章", section: "你的乘客", page: 41, quote: "未滿3歲的小童不計算在內；三名3歲或以上而不高於1.3米的小童，可作兩名乘客計算。" },
    memoryHook: "全部 3 字頭：未滿 3 歲免計，3 個 1.3 米＝2 個位。"
  },

  // ==================== 2. 車速 · 停車距離 · 超車 ====================
  {
    id: "q13",
    category: "driving_skills",
    type: "text",
    prompt: "開車、轉彎、轉線或超車前，安全駕駛例行程序的正確順序是？",
    options: {
      A: "發信號 → 看一看 → 想一想 → 再看看",
      B: "想一想 → 看一看 → 發信號 → 再看看",
      C: "看一看 → 發信號 → 想一想 → 立即轉向"
    },
    answer: "B",
    whyRight: "正確四步：想一想 → 看一看（鏡及四周）→ 發信號 → 再看看（盲點）。",
    whyWrong: { A: "未看清環境先發信號易誤導他車。", C: "未經計劃亦無最後確認即轉向易撞車。" },
    source: { chapter: "第五章", section: "安全駕駛的例行程序", page: 49, quote: "時刻記得在行動前，遵守下列步驟：想一想 — 看一看 — 發信號 — 再看看。" },
    memoryHook: "四步口訣：想 → 看 → 燈 → 再看。"
  },
  {
    id: "q14",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "停車熄匙法例下，車輛停定時於任何連續 60 分鐘內引擎合計運作超過多久即違法？",
    options: { A: "超過 3 分鐘", B: "超過 5 分鐘", C: "超過 10 分鐘" },
    answer: "A",
    whyRight: "除獲豁免情況外，停定時於任何連續 60 分鐘內空轉逾 3 分鐘即違法。",
    whyWrong: { B: "5 分鐘已超法定寬限。", C: "10 分鐘遠超法定上限。" },
    source: { chapter: "第五章", section: "停車熄匙", page: 53, quote: "在車輛停定時讓引擎於任何連續的60分鐘時段內合計運作超過3分鐘，即屬違法。" },
    memoryHook: "60 分鐘最多空轉 3 分鐘（一個杯麵時間）。"
  },
  {
    id: "q15",
    category: "driving_skills",
    type: "image",
    sign: "stopping_buses",
    trapTag: "高頻陷阱",
    prompt: "參考守則第 54 頁比例圖（每輛雙層巴士長約 12 米），乾爽路面以時速 60 公里行駛的最短「停車距離」（思考＋剎車）是多少？",
    options: {
      A: "20 米（10 ＋ 10）",
      B: "35 米（15 ＋ 20）",
      C: "60 米（20 ＋ 40）"
    },
    answer: "B",
    whyRight: "60 km/h 乾地：思考 15 米 ＋ 剎車 20 米 ＝ 35 米。",
    whyWrong: { A: "20 米是 40 km/h 停車距離。", C: "60 米是 80 km/h 停車距離。" },
    source: { chapter: "第五章", section: "停車距離", page: 54, quote: "40km/h：10+10=20米；60km/h：15+20=35米；80km/h：20+40=60米。" },
    memoryHook: "思考＝車速÷4；剎車 10→20→40；總計 20 / 35 / 60 米。"
  },
  {
    id: "q16",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「濕滑路面」以時速 80 公里行駛，其「停車距離」應如何計算？",
    options: {
      A: "思考 20 米 ＋ 濕地剎車 80 米 ＝ 100 米",
      B: "思考與剎車不變，仍為 60 米",
      C: "思考變兩倍（40 米）＋ 剎車 40 米 ＝ 80 米"
    },
    answer: "A",
    whyRight: "濕滑路面只把「剎車距離 × 2」：20 + (40 × 2) = 100 米。",
    whyWrong: { B: "濕地抓地力大降，剎車距離必增倍。", C: "濕滑不影響大腦思考距離，只影響剎車距離。" },
    source: { chapter: "第五章", section: "停車距離", page: 54, quote: "每小時80公里：20米＋40米＝60米。如果路面濕滑，剎車距離要作兩倍計算。" },
    memoryHook: "濕地只係「剎車 × 2」，思考唔變！（80 濕＝20+80＝100m）"
  },
  {
    id: "q17",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "除非另有標誌說明，香港所有道路的預設最高車速限制是多少？",
    options: { A: "時速 40 公里", B: "時速 50 公里", C: "時速 70 公里" },
    answer: "B",
    whyRight: "無特別車速標誌時，全港所有道路最高車速均為每小時 50 公里。",
    whyWrong: { A: "香港無 40 km/h 預設限速。", C: "70 km/h 須由限速牌另行標示。" },
    source: { chapter: "第五章", section: "駕駛速度", page: 55, quote: "除非有標誌另外說明，否則，所有道路的最高車速，都是時速50公里。" },
    memoryHook: "無牌睇，一律 50 km/h！"
  },
  {
    id: "q18",
    category: "driving_skills",
    type: "text",
    prompt: "良好情況下跟車守「兩秒距程」；若遇路面濕滑或天氣欠佳，距程應增至多少？",
    options: { A: "三秒", B: "倍增至四秒，或更長", C: "保持兩秒但開危險警告燈" },
    answer: "B",
    whyRight: "天氣或路況欠佳時，應把兩秒距程倍增至四秒或更長。",
    whyWrong: { A: "守則規定倍增至四秒或以上，非三秒。", C: "兩秒不足夠，亦不應無故長亮死火燈。" },
    source: { chapter: "第五章", section: "兩秒距程規則", page: 55, quote: "說「一千零一、一千零二」約兩秒……情況欠佳下，應把距程倍增至四秒，或更長。" },
    memoryHook: "好天兩秒，壞天倍增四秒以上。"
  },
  {
    id: "q19",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "以下哪種情況「可以」從前車的左方超車或通過？",
    options: {
      A: "在快速公路切入左線超越慢車",
      B: "前車發出右轉信號，從左超車不妨礙他人且無須駛入巴士線",
      C: "超越停在沒有安全島車站的電車"
    },
    answer: "B",
    whyRight: "前車發右轉信號、不妨礙他人且不入巴士線時，可從左方超越。",
    whyWrong: { A: "快速公路左方超車明確屬違法。", C: "不可超越停在無安全島車站的電車。" },
    source: { chapter: "第五章", section: "可從左方超車／通過", page: 57, quote: "當前車發出右轉信號，如果你從左方超車不會妨礙他人，又無需駛入巴士線，你可從左方超越前車。" },
    memoryHook: "前車打右燈可左過；快速公路左扒頭＝必違法。"
  },
  {
    id: "q20",
    category: "driving_skills",
    type: "image",
    sign: "no_overtaking",
    prompt: "道路上見到上圖交通標誌，代表甚麼指令？",
    options: {
      A: "前面容許並排行車",
      B: "不准超車起點，至禁制終止路段均不得超車",
      C: "只准私家車駛入"
    },
    answer: "B",
    whyRight: "紅圈內兩輛並排車表示「不准超車」起點，直至終止標誌為止。",
    whyWrong: { A: "紅圈代表禁止，非容許並排。", C: "並非車種限制牌。" },
    source: { chapter: "第五章／第八章", section: "切勿超車／標誌 #46", page: 57, quote: "圖中標誌表示「禁止超車」的起點。（亦見第112頁 #46）" },
    memoryHook: "紅圈兩車拍齊＝禁止扒頭（不准超車）。"
  },
  {
    id: "q21",
    category: "driving_skills",
    type: "image",
    sign: "no_horn",
    prompt: "在醫院附近見到上圖「寂靜地帶」起點標誌，應該怎樣做？",
    options: {
      A: "在附設時間牌註明的管制時間內不可響號",
      B: "車速減至 20 公里以下並關冷氣",
      C: "任何時間不可亮車頭燈"
    },
    answer: "A",
    whyRight: "寂靜地帶（多設於醫院附近）於時間牌管制時段內禁止響號。",
    whyWrong: { B: "只限響號，無 20 km/h 或關冷氣規定。", C: "與車頭燈無關。" },
    source: { chapter: "第五章", section: "使用響號", page: 52, quote: "不可在「寂靜地帶」內使用響號……通常設於醫院附近，時間牌註明管制時間。" },
    memoryHook: "平時只作危險警告先響號；寂靜地帶更要收聲。"
  },
  {
    id: "q22",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「閃動大燈」與「倒車」，下列哪項正確？",
    options: {
      A: "閃大燈可用作催促前車或示意行人過路",
      B: "閃大燈唯一目的是讓他人留意你；絕不可從支路倒車進入大路",
      C: "亮起白色倒車燈及響號即可放心從支路倒車出大路"
    },
    answer: "B",
    whyRight: "閃大燈與響號一樣只為讓他人留意你；且嚴禁從支路倒車入大路。",
    whyWrong: { A: "不可為催促或示意過路閃大燈。", C: "嚴禁支路倒出大路，亦不可依賴倒車燈代察看。" },
    source: { chapter: "第五章", section: "閃動大燈／倒車", page: 52, quote: "閃動大燈只有一個意思，就是讓其他道路使用者留意你……絕不可從支路倒車進入大路。" },
    memoryHook: "閃大燈＝響號＝只提醒留意；大忌支路倒出大路。"
  },
  {
    id: "q23",
    category: "driving_skills",
    type: "image",
    sign: "long_vehicle_plate",
    prompt: "貨車尾部附有上圖「LONG VEHICLE 長車」標記，表示總長度超過多少？",
    options: {
      A: "超過 13 米；須預留轉彎空間，切勿左超或久留盲點",
      B: "超過 8 米；應緊貼車尾行駛",
      C: "超過 20 米；只准夜間行駛"
    },
    answer: "A",
    whyRight: "總長逾 13 米貨車／拖車須掛此牌（≤13m 用紅黃斜紋）；長車盲點大、切勿左超。",
    whyWrong: { B: "分界是 13 米，緊貼尾部極危險。", C: "非 20 米，亦無日間禁行。" },
    source: { chapter: "第五章", section: "車尾標記", page: 61, quote: "附設在車身總長度超過13米的貨車或其拖車架尾部的標記。" },
    memoryHook: "長車分界線＝13 米（≤13m 紅黃斜紋，>13m 寫長車）。"
  },
  {
    id: "q24",
    category: "driving_skills",
    type: "text",
    prompt: "行車時見前面或路旁有動物，應如何處理？",
    options: {
      A: "持續響號及踏空油趕走動物",
      B: "慢駛讓出空間、隨時停車；帶領動物者要求停車時必須停車",
      C: "加速迅速駛過"
    },
    answer: "B",
    whyRight: "見動物應慢駛讓位、切勿響號或踏空油；牽動物者要求停車必須停。",
    whyWrong: { A: "響號及踏空油會嚇驚動物亂衝。", C: "高速駛過易驚動動物且難煞停。" },
    source: { chapter: "第五章", section: "動物", page: 61, quote: "緩慢行車，讓出充足空間……切勿響號或「踏空油」來唬嚇牠們。當帶領動物的人要求停車時，必須停車。" },
    memoryHook: "見動物：慢車、讓位、咪呠咪踏空油，叫停即停。"
  },

  // ==================== 3. 行車線 · 快速公路 · 迴旋處 ====================
  {
    id: "q25",
    category: "lanes_highways",
    type: "image",
    sign: "road_white_lines",
    trapTag: "易撈亂",
    prompt: "上圖由左至右三種白色單行虛線，哪一條是「警告線」？",
    options: {
      A: "最左一條（短線大距）",
      B: "中間一條（雙程路中央線）",
      C: "最右一條（長線短距）"
    },
    answer: "C",
    whyRight: "「線段愈長，危險性愈大」：最右一條線長距短是警告線，警告前面有危險。",
    whyWrong: { A: "最左一條是行車線界線（劃分同向線）。", B: "中間一條是車路分界線（雙程路中央）。" },
    source: { chapter: "第五章", section: "道路上的線條", page: 62, quote: "線段愈長，危險性愈大……警告線線條長而線距短，用以警告前面有危險。（亦見第124頁）" },
    memoryHook: "白線鐵律：線愈長愈危險！（界線 → 分界線 → 警告線）"
  },
  {
    id: "q26",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "行車道上「琥珀色」與「綠色」反光路釘分別標明甚麼位置？",
    options: {
      A: "琥珀色＝車道右面近中央分隔帶邊緣；綠色＝路口交匯處／停車處／讓車處邊緣",
      B: "琥珀色＝車道左面邊緣；綠色＝行車線中央",
      C: "琥珀色＝巴士線；綠色＝單車徑"
    },
    answer: "A",
    whyRight: "四色路釘：白＝行車線/中央、紅＝左邊緣、琥珀＝右面中央分隔帶、綠＝交匯/停車/讓車處。",
    whyWrong: { B: "左邊緣係紅色，行車線中央係白色。", C: "反光路釘不標示巴士線或單車徑。" },
    source: { chapter: "第五章", section: "反光路釘", page: 62, quote: "琥珀色路釘標明車道右面近中央分隔帶的邊緣。綠色路釘設於路口交滙處、路旁停車處或讓車處的車道邊緣。" },
    memoryHook: "左紅 · 中白 · 右琥珀 · 綠路口！"
  },
  {
    id: "q27",
    category: "lanes_highways",
    type: "image",
    sign: "road_double_white_broken",
    prompt: "上圖雙白線「靠近你一邊是虛線」，正確理解是？",
    options: {
      A: "任何情況均不可越過",
      B: "安全情況下可越過該線或跨線行駛（如超車）",
      C: "可於此處隨意停泊車輛"
    },
    answer: "B",
    whyRight: "雙白線睇靠近己方一條：虛線可在安全下越過超車；實線則禁越。",
    whyWrong: { A: "靠近己方為實線才禁止越過。", C: "縱近己方為虛線亦不應停車泊車。" },
    source: { chapter: "第五章", section: "雙白線", page: 63, quote: "如果雙白線靠近你的一邊是虛線，你可在安全情況下，越過該線或跨線行駛。" },
    memoryHook: "雙白線睇身邊嗰條：虛線安全過得，實線當牆唔准踩。"
  },
  {
    id: "q28",
    category: "lanes_highways",
    type: "image",
    sign: "road_double_white_solid",
    trapTag: "高頻陷阱",
    prompt: "上圖連續雙白線分隔「同一方向」兩條行車線。若想右轉入毗連停車場，可否跨越？",
    options: {
      A: "安全並打右燈即可跨越",
      B: "不可以，分隔同方向行車線的雙白實線，連出入毗連處所亦不得跨越",
      C: "非繁忙時段可以跨越"
    },
    answer: "B",
    whyRight: "「相反方向」雙白線准右轉出入處所；「同一方向」雙白實線則連出入處所一律禁跨！",
    whyWrong: { A: "誤將相反方向例外套用到同方向雙白線。", C: "雙白線全日生效，無時段豁免。" },
    source: { chapter: "第五章", section: "雙白線", page: 63, quote: "如果雙白線分隔同一方向行駛的兩條行車線……即使你想向右轉入／轉出毗連處所，也不得跨越該線。" },
    memoryHook: "反方向雙白可右轉出入處所；同方向實線一律唔准過！"
  },
  {
    id: "q29",
    category: "lanes_highways",
    type: "image",
    sign: "bus_lane_franchised",
    trapTag: "易撈亂",
    prompt: "上圖巴士線標誌繪有「巴士圖案」（無寫文字），生效時間內供甚麼車使用？",
    options: {
      A: "只准「專營巴士」使用",
      B: "所有巴士（專營及非專營）均可使用",
      C: "專營巴士及私家車共用"
    },
    answer: "A",
    whyRight: "畫「巴士圖案」＝只准專營巴士；寫「Bus 巴士」字樣＝所有巴士。",
    whyWrong: { B: "所有巴士是用「Bus 巴士」文字牌標示。", C: "私家車於生效時間內禁入。" },
    source: { chapter: "第五章", section: "巴士線", page: 65, quote: "標誌牌示有巴士圖案者，則只准專營巴士使用，而有「巴士」二字者，則所有巴士均可使用。" },
    memoryHook: "畫公仔＝專營專用；寫中英文＝所有巴士。"
  },
  {
    id: "q30",
    category: "lanes_highways",
    type: "image",
    sign: "contraflow_bus",
    prompt: "在單程路見到上圖「反向行駛巴士線」標誌，私家車在凌晨可否駛入？",
    options: {
      A: "凌晨無巴士時可借用",
      B: "任何時間均不得駛入道路對面的反向巴士線",
      C: "亮危險警告燈超車時可用"
    },
    answer: "B",
    whyRight: "反向巴士線供專營巴士逆向行駛，其他車輛任何時間一律禁止駛入。",
    whyWrong: { A: "無非繁忙時間開放規定。", C: "任何情況不可逆線駛入。" },
    source: { chapter: "第五章", section: "反向行駛的巴士線", page: 66, quote: "反向行駛巴士線（專營巴士）標誌 — 任何時間均不得駛入道路對面的巴士線。" },
    memoryHook: "反向巴士線＝迎頭巴士，24 小時禁入。"
  },
  {
    id: "q31",
    category: "lanes_highways",
    type: "image",
    sign: "warn_steep_down",
    trapTag: "自動波",
    prompt: "見到上圖「1:8 向下斜坡＋低波行車」，駕駛自動波私家車應怎樣做？",
    options: {
      A: "前面上斜，加大油門上坡",
      B: "前面陡斜下坡，切勿只靠腳掣，應選用低波（L／2 等）並輕踏腳掣控速",
      C: "1:8 比 1:5 更陡，應入空波滑行"
    },
    answer: "B",
    whyRight: "左高右低為下斜；長落斜應選用低波利用引擎制動，切勿只依賴腳掣防過熱。",
    whyWrong: { A: "圖示是下斜（上斜為左低右高）。", C: "1:5 (20%) 比 1:8 (12.5%) 更陡，且空波滑行極危險。" },
    source: { chapter: "第五章", section: "斜坡", page: 67, quote: "1：5（20%）較1：10（10%）陡峭。向下行駛時切勿只依賴腳掣……應選擇和維持以低波行車。" },
    memoryHook: "分母愈細愈斜（1:5 > 1:10）；自動波落長斜照入低波！"
  },
  {
    id: "q32",
    category: "lanes_highways",
    type: "image",
    sign: "expressway_start",
    trapTag: "高頻陷阱",
    prompt: "見到上圖「快速公路起點」，未獲批准下哪組不准駛入？",
    options: {
      A: "學習駕駛人、公共小巴、行人、單車，及額定功率低於 7 千瓦電動私家車",
      B: "所有持有暫准駕駛執照（P 牌）的私家車",
      C: "紅色的士及旅遊巴士"
    },
    answer: "A",
    whyRight: "學牌、公共小巴、特別用途車、低於 125cc 或電動私家車低於 7kW、單車及行人均禁入。",
    whyWrong: { B: "P 牌私家車可入快速公路（限速 70、三線禁最右）。", C: "的士及旅遊巴均可用快速公路。" },
    source: { chapter: "第五章", section: "快速公路及主幹路", page: 72, quote: "學習駕駛人、公共小型巴士、低於125cc或額定功率低於7千瓦的電動私家車，均不准使用快速公路。" },
    memoryHook: "快速公路：學牌唔入得、P 牌入得；電動私家車要夠 7kW。"
  },
  {
    id: "q33",
    category: "lanes_highways",
    type: "text",
    trapTag: "數字",
    prompt: "在行車隧道管道內行駛，哪項規則正確？",
    options: {
      A: "正常交通不可低於時速 25 公里，且禁高燈、禁響號、禁換線",
      B: "本線較慢時可安全越雙白線轉線",
      C: "可開高燈照明及下車換爆胎"
    },
    answer: "A",
    whyRight: "隧道內嚴禁低於 25 km/h（正常交通）、高燈、響號、換線／越雙白線、下車換胎。",
    whyWrong: { B: "隧道內即使本線受阻亦不可換線或越雙白線。", C: "嚴禁開高燈及於隧道內換輪胎。" },
    source: { chapter: "第五章", section: "在隧道內", page: 73, quote: "切勿使用高燈；切勿響號；正常交通下切勿以不足每小時25公里行駛；切勿跨越雙白線。" },
    memoryHook: "隧道四不：唔高燈 · 唔響號 · 唔換線 · 唔低過 25 km/h。"
  },
  {
    id: "q34",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "綠燈時駛入交通燈路口的「右轉袋口位」等候，若此時燈號轉變，應怎樣做？",
    options: {
      A: "立即倒車退回停車線後",
      B: "無須理會交通燈號，自行衡量安全空檔即可完成右轉",
      C: "留在袋口位等下一次綠燈"
    },
    answer: "B",
    whyRight: "進入右轉袋口位後無須理會燈號，見迎面車有安全空間即可右轉離場。",
    whyWrong: { A: "路口倒車極危險兼違法。", C: "滯留路口會阻塞橫向綠燈車流。" },
    source: { chapter: "第五章", section: "轉右（右轉袋口位）", page: 75, quote: "在右轉袋口位等候時，你無需理會交通燈號，但應自己衡量是否有足夠安全空間，如安全便可轉彎。" },
    memoryHook: "入咗袋口唔睇燈，安全空檔即轉走！"
  },
  {
    id: "q35",
    category: "lanes_highways",
    type: "image",
    sign: "road_yellow_box_rail",
    trapTag: "高頻陷阱",
    prompt: "上圖路口設有「電車或輕鐵路軌」並劃黃格，若右轉受迎面車阻擋，可否駛入等候？",
    options: {
      A: "在右轉箭嘴線便可駛入等候",
      B: "絕不可以，除非出口暢通無阻，任何行車線（含右轉線）均不可駛入",
      C: "綠燈亮着時可駛入等候"
    },
    answer: "B",
    whyRight: "路軌車輛無法轉向閃避，故有電車／輕鐵路軌的黃格連右轉線都絕不可駛入等候。",
    whyWrong: { A: "那是「普通黃格」的做法，有路軌不適用。", C: "即使綠燈，出口受阻仍不可駛入。" },
    source: { chapter: "第五章", section: "電車和輕鐵的黃色方格路口", page: 78, quote: "如路口有電車或輕鐵路軌並劃上黃色方格，切勿從任何行車線（包括右轉線）駛入，除非出口暢通無阻。" },
    memoryHook: "普通黃格右轉等得；路軌黃格連右轉都唔等得！"
  },
  {
    id: "q36",
    category: "lanes_highways",
    type: "image",
    sign: "roundabout_right",
    trapTag: "高頻陷阱",
    prompt: "在兩線迴旋處準備「轉右／掉頭」（如上圖），正確入線及打燈方法是？",
    options: {
      A: "最右線入並打右燈沿內線行；過選定出口前一個出口後，改打左燈離開",
      B: "左線入全程打左燈沿外線繞行",
      C: "最右線入不打燈，出迴旋處才打右燈"
    },
    answer: "A",
    whyRight: "轉右／掉頭：最右線打右燈入內線，過選定出口前一個出口後轉打左燈出。",
    whyWrong: { B: "左線打左燈是「轉左」做法。", C: "離開迴旋處永遠打左燈，不可不打燈或打右燈出。" },
    source: { chapter: "第五章", section: "迴旋處 — 轉右／掉頭", page: 81, quote: "從最右線駛入並發右轉信號，沿內線行駛，直至經過選定出口前一個出口，才發左轉信號離開。" },
    memoryHook: "入迴旋處讓右車；轉右入右線打右燈，出前過一出口打左燈。"
  },
  {
    id: "q37",
    category: "lanes_highways",
    type: "image",
    sign: "countdown_green_3",
    prompt: "見到上圖「綠底三條白斜線」倒數標誌，代表甚麼？",
    options: {
      A: "在快速公路上，離前面出口減速行車線起點尚有 300 米",
      B: "在一般主幹路上，離收費站尚有 3 公里",
      C: "前面有三條行車線封閉"
    },
    answer: "A",
    whyRight: "綠底＝快速公路（藍底＝主幹路）；每條斜線＝100 米，三條＝300 米。",
    whyWrong: { B: "主幹路為藍底，且單位為百米非公里。", C: "封線用紅三角／紅橫條標誌。" },
    source: { chapter: "第五章／第八章", section: "分隔車路的路口", page: 82, quote: "倒數標誌表示離減速行車線起點還有多遠（以百米為單位）。（亦見第123頁）" },
    memoryHook: "一條線＝100m（300→200→100）；綠快藍主白區黃臨。"
  },
  {
    id: "q38",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駛近「斑馬線」時，以下哪項做法完全正確？",
    options: {
      A: "揮手示意路邊等候的行人快步過馬路",
      B: "有人踏足即停在讓路線前，切勿示意行人過路，亦不可在之字線區超車",
      C: "中央有安全島時，對面半邊有人踏足你這邊亦必急停"
    },
    answer: "B",
    whyRight: "有人踏足斑馬線必須停車讓路；切勿揮手示意過路，之字線區禁超車。",
    whyWrong: { A: "揮手示意易令行人忽略鄰線來車。", C: "中間有安全島時，兩邊視為獨立過路處。" },
    source: { chapter: "第五章", section: "「斑馬線」", page: 84, quote: "有人踏足「斑馬線」便須停車……不要示意行人過路……中央設有安全島，每邊視為獨立過路處。" },
    memoryHook: "斑馬線三禁：咪揮手叫人過 · 之字線咪扒頭 · 黑白紋咪停車。"
  },

  // ==================== 4. 夜間天氣 · 工程 · 自動波泊車 ====================
  {
    id: "q39",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "夜間駕駛遇迎面車輛開高燈令你目眩，應該怎樣做？",
    options: {
      A: "立即閃高燈或開高燈警告對方",
      B: "切勿瞪着強光，轉移視線望向道路左邊，必要時慢駛或停車",
      C: "合眼兩秒再原速行駛"
    },
    answer: "B",
    whyRight: "望向道路左邊避開眩光，必要時減速或停車；絕不以高燈回敬。",
    whyWrong: { A: "開高燈／閃高燈回擊令雙方同時目眩，更易撞車。", C: "行車合眼極危險。" },
    source: { chapter: "第五章", section: "夜間駕駛", page: 86, quote: "應轉移視線，切勿瞪着光線，應轉眼望向道路左邊。不要閃動高燈警告，也千萬不要同樣亮高燈。" },
    memoryHook: "被高燈照親：唔對望、唔閃番佢、望左邊、減速！"
  },
  {
    id: "q40",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駛過水浸（不太深）街道時及駛過之後，正確做法是？",
    options: {
      A: "高速衝過，之後加速甩乾輪胎",
      B: "慢駛但引擎轉速不可過慢防死火；駛過後留意後車並盡快試用制動系統",
      C: "入空波滑行，之後開高燈警告後車"
    },
    answer: "B",
    whyRight: "過水慢駛保轉速防死火；駛離後煞車皮濕水減效，應盡快輕試腳掣。",
    whyWrong: { A: "高速過水易水漂失控及引擎入水。", C: "空波無引擎制動，開高燈亦無法測試煞車。" },
    source: { chapter: "第五章", section: "下雨和濕滑的路面", page: 87, quote: "應盡量慢駛，但引擎轉速不可過慢防死火。駛過水浸街道後，應盡快試用制動系統。" },
    memoryHook: "過水浸三步：睇水深 → 慢駛保轉速 → 過完即試 Brake。"
  },
  {
    id: "q41",
    category: "weather_parking",
    type: "text",
    prompt: "哪種天氣下的路面通常最滑溜，最易失去抓地力？",
    options: {
      A: "久乾天氣下剛落雨微濕的路面",
      B: "連續大雨沖刷數小時後的路面",
      C: "烈日下全乾的瀝青路"
    },
    answer: "A",
    whyRight: "久乾積聚的塵埃油漬遇微雨混合，路面比大雨沖洗後更滑溜。",
    whyWrong: { B: "大雨反而沖走部分油漬（仍須防積水）。", C: "乾爽路面附着力最佳。" },
    source: { chapter: "第五章", section: "下雨和濕滑的路面", page: 87, quote: "雨水會使路面滑溜，特別是久乾天氣下微濕的路面更滑。" },
    memoryHook: "久乾微濕最跣胎（油漬＋微雨＝溜冰場）。"
  },
  {
    id: "q42",
    category: "weather_parking",
    type: "image",
    sign: "no_stopping",
    trapTag: "易撈亂",
    prompt: "上圖藍底紅邊「紅交叉（X）」標誌代表甚麼？",
    options: {
      A: "不准泊車（可短暫上落客）",
      B: "不准停車（連上落客貨亦不可）",
      C: "前面雙線封閉"
    },
    answer: "B",
    whyRight: "紅交叉（X）＝不准停車，生效時段內連上落客貨都嚴禁。",
    whyWrong: { A: "單紅斜線（/）才是不准泊車。", C: "非封線標誌。" },
    source: { chapter: "第五章／第八章", section: "不准停車的地點／標誌 #7", page: 90, quote: "限制標誌 — 不准停車……下列地點，不准停車，更切勿上落客貨。（亦見第111頁 #7）" },
    memoryHook: "單斜（1 劃）唔准泊；交叉（2 劃）連停都唔准！"
  },
  {
    id: "q43",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "不准停車限制區的「紅杆」與「綠杆」分別代表哪個標準時段？",
    options: {
      A: "紅杆＝上午 7 時至午夜 12 時；綠杆＝上午 8–10 時及下午 5–7 時",
      B: "紅杆＝全日 24 小時；綠杆＝上午 7 時至下午 7 時",
      C: "紅杆＝上午 7 時至下午 7 時；綠杆＝其他時段"
    },
    answer: "A",
    whyRight: "紅 7am–12mn｜黃 7am–7pm｜綠 8–10am & 5–7pm｜灰 其他（以字牌為準）。",
    whyWrong: { B: "全日多配雙黃線及 24hrs 牌；7am–7pm 是黃杆。", C: "紅黃及綠灰時段混淆。" },
    source: { chapter: "第五章", section: "顏色標誌杆", page: 91, quote: "紅：上午七時至午夜十二時；黃：上午七時至下午七時；綠：上午八至十時及下午五至七時；灰：其他時段。" },
    memoryHook: "紅最長(7–12)、黃日頭(7–7)、綠返放工(8–10/5–7)、灰其他。"
  },
  {
    id: "q44",
    category: "weather_parking",
    type: "image",
    sign: "road_yellow_lines",
    trapTag: "易撈亂",
    prompt: "無街燈道路或私家路上，上圖最右方「單行黃色虛線」代表甚麼？",
    options: {
      A: "全日 24 小時不准停車",
      B: "全日或在時間字牌所示時段內不准泊車",
      C: "只准的士及小巴上落客"
    },
    answer: "B",
    whyRight: "單黃虛線＝全日或所示時段不准泊車（雙實＝全日唔准停、單實＝按時唔准停）。",
    whyWrong: { A: "全日不准停車為雙黃實線。", C: "的士／小巴站為黃色虛線方框。" },
    source: { chapter: "第五章／第八章", section: "禁止泊車的地點", page: 92, quote: "如路旁劃上單行黃色虛線，不得在該邊道路、行人路或路旁泊車。（亦見第126頁）" },
    memoryHook: "雙實全日唔准停 · 單實按時唔准停 · 單虛唔准泊。"
  },
  {
    id: "q45",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "私家車接載持「殘疾乘客限制區上落證明書」乘客時，哪兩類地點仍然「除外」（不可上落）？",
    options: {
      A: "快速公路，及全日（24 小時）不准停車限制區",
      B: "單黃線區域，及所有私家路",
      C: "醫院門外，及收費停車場入口"
    },
    answer: "A",
    whyRight: "酌情權適用於一般限制區，但「快速公路」及「全日不准停車限制區」一律除外。",
    whyWrong: { B: "單黃線（非全日）正正適用此證明書。", C: "非守則列明的法定除外項目。" },
    source: { chapter: "第五章", section: "殘疾乘客在限制區上落車證明書", page: 91, quote: "讓殘疾乘客在限制區上落車（快速公路及全日「不准停車」限制區除外）。" },
    memoryHook: "殘疾證明書兩大禁區：快速公路 ＋ 全日禁區（雙黃線）。"
  },
  {
    id: "q46",
    category: "weather_parking",
    type: "text",
    trapTag: "數字",
    prompt: "設有街燈而燈距不超過多少米之路段只可在指定泊車處泊車？同一泊車處最長不可超過多久？",
    options: {
      A: "100 米；12 小時",
      B: "200 米；24 小時",
      C: "300 米；48 小時"
    },
    answer: "B",
    whyRight: "街燈相隔不逾 200 米須泊指定泊車處；同一泊車處不可連泊逾 24 小時。",
    whyWrong: { A: "100 米與 12 小時過短。", C: "300 米與 48 小時過長。" },
    source: { chapter: "第五章", section: "禁止／准許泊車的地點", page: 92, quote: "街燈之間相隔不超過200米的道路……不可在同一泊車處停泊車輛超過24小時。（亦見第94頁）" },
    memoryHook: "泊車雙數字：街燈 200 米內唔亂泊，泊位最長 24 小時。"
  },
  {
    id: "q47",
    category: "weather_parking",
    type: "image",
    sign: "parking_general",
    trapTag: "高頻陷阱",
    prompt: "上圖藍底純「P」泊車標誌（無車輛圖案），私家車泊得嗎？排除了哪些車？",
    options: {
      A: "可以；除中型及重型貨車、巴士、旅遊車、電單車及單車外均可用",
      B: "可以；全港所有類別車輛（含重型貨車及電單車）均可用",
      C: "不可以；只供商用車使用"
    },
    answer: "A",
    whyRight: "純 P 牌供私家車等停泊，明確排除中／重型貨車、巴士、旅遊車、電單車及單車。",
    whyWrong: { B: "大車（中重貨／巴／旅）及兩輪車一律不可泊純 P 位。", C: "私家車正正可以停泊。" },
    source: { chapter: "第五章／第八章", section: "泊車標誌／標誌 #75", page: 94, quote: "供任何車輛停泊，除中型及重型貨車、巴士、旅遊車、電單車及單車外。（亦見第113頁 #75）" },
    memoryHook: "純 P 牌：私家車泊得；大車（中重貨/巴/旅）同兩輪唔泊得。"
  },
  {
    id: "q48",
    category: "weather_parking",
    type: "image",
    sign: "slope_park_up_kerb",
    trapTag: "自動波",
    prompt: "自動波私家車在「有路邊石的上坡斜路」靠左泊車（上圖），前輪扭向哪邊及入甚麼波？",
    options: {
      A: "前輪扭向右邊，入泊車波（P 波）並拉緊停泊制動器",
      B: "前輪扭向左邊，入空波（N 波）並拉緊停泊制動器",
      C: "前輪擺直，入後波（R 波）並拉緊停泊制動器"
    },
    answer: "A",
    whyRight: "上坡有路邊石須扭向右（溜後前輪頂實路邊石）；自動波一律入 P 波拉手掣。",
    whyWrong: { B: "扭左溜後車頭會滑出馬路，且不可入 N 波。", C: "擺直無法擋溜車；自動波泊車入 P 波非 R 波。" },
    source: { chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在上坡斜路泊車……把軚盤扭向右邊……入一波或泊車波（自動波），並啟動好停泊制動器。" },
    memoryHook: "斜路扭軚神口訣：只有「上斜＋有石壆」扭右，其餘全扭左！自動波入 P 波。"
  },
  {
    id: "q49",
    category: "weather_parking",
    type: "image",
    sign: "slope_park_no_kerb",
    trapTag: "自動波",
    prompt: "在「沒有路邊石」的上坡或下坡斜路泊自動波私家車（上圖），前輪應扭向哪邊？",
    options: {
      A: "上坡扭右、下坡扭左",
      B: "無論上坡或下坡一律扭向左邊，入泊車波（P 波）並拉緊手掣",
      C: "必須完全擺直"
    },
    answer: "B",
    whyRight: "無路邊石時無論上斜下斜都扭向左邊（溜車不會衝出路中心），自動波入 P 波拉手掣。",
    whyWrong: { A: "無石壆頂胎，上斜扭右溜後會滑出車道。", C: "擺直會直衝滑落斜路。" },
    source: { chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在沒有路邊石的上坡斜路或下坡斜路泊車 — 軚盤應扭向左邊……泊車波（自動波）並啟動停泊制動器。" },
    memoryHook: "無石壆上／下斜，一律扭向左 ＋ 入 P 波 ＋ 拉手掣。"
  },
  {
    id: "q50",
    category: "weather_parking",
    type: "image",
    sign: "roadworks_arrow_diag",
    trapTag: "高頻陷阱",
    prompt: "限速 70 公里以上道路見工程車尾燈如上圖「對角黃燈交替閃動」，代表甚麼？",
    options: {
      A: "工程完結，可加速超前",
      B: "危險 — 工程車輛示意將會轉線",
      C: "指示所有車輛靠左駛過"
    },
    answer: "B",
    whyRight: "對角黃燈交替閃動＝危險，工程車示意即將轉線，須減速提高警覺。",
    whyWrong: { A: "屬危險警示，絕非完結。", C: "靠左會顯示明確向左閃爍箭嘴。" },
    source: { chapter: "更多參考資料（路政署）", section: "閃爍箭嘴指示燈號", page: 140, quote: "危險（對角黃燈交替閃動）— 工程車輛示意將會轉線。" },
    memoryHook: "對角黃燈交替閃＝工程車要轉線！"
  },

  // ==================== 5. 交通標誌 · 燈號 · 手號 ====================
  {
    id: "q51",
    category: "signs_signals",
    type: "image",
    sign: "stop_oct",
    trapTag: "易撈亂",
    prompt: "見上圖八角形「STOP 停」標誌，即使大路完全無車，應怎樣做？",
    options: {
      A: "減速望清無車即可慢駛駛出",
      B: "必須在「停車」線前完全停定，待安全方可前進",
      C: "響號示意後直接駛出"
    },
    answer: "B",
    whyRight: "八角形 STOP 標誌強制無論有車無車都必在停車線前「完全停定」。",
    whyWrong: { A: "無車慢駛是倒三角 GIVE WAY 的做法。", C: "響號不可替代停車。" },
    source: { chapter: "第五章／第八章", section: "必須停車或讓路的路口", page: 79, quote: "即使大路上並無其他車輛，你也必須在「停車」線前停車。" },
    memoryHook: "八角 STOP 無車都要停定；倒三角 GIVE WAY 讓大路。"
  },
  {
    id: "q52",
    category: "signs_signals",
    type: "image",
    sign: "one_way",
    trapTag: "易撈亂",
    prompt: "上圖「藍底長方形白色向上箭嘴」代表甚麼？",
    options: {
      A: "單程行車（只准依指示方向行駛）",
      B: "前面路口只准向前駛（不可左右轉）",
      C: "快速公路入口"
    },
    answer: "A",
    whyRight: "藍底「長方形」白箭嘴＝單程行車（#10）；藍底「圓形」才是只准向前駛（#3）。",
    whyWrong: { B: "「只准向前駛」是藍色圓形標誌。", C: "快速公路是紅框紅橋圖案。" },
    source: { chapter: "第五章／第八章", section: "單程路／標誌 #10", page: 66, quote: "「單程行車」標誌 — 只准依指示的方向行駛。（亦見第111頁 #10）" },
    memoryHook: "長方＝單程路；圓形＝只准向前駛。"
  },
  {
    id: "q53",
    category: "signs_signals",
    type: "image",
    sign: "pass_either_side",
    prompt: "安全島上見到上圖藍圓「雙向下斜箭嘴」，代表甚麼？",
    options: {
      A: "前面雙程行車，須靠左",
      B: "車輛可取道安全島左邊或右邊到達同一目的地",
      C: "禁止在安全島兩旁行駛"
    },
    answer: "B",
    whyRight: "雙向下斜箭嘴＝可取道左或右任何一邊駛過，各線會在島另一端匯合。",
    whyWrong: { A: "單左下箭嘴才是必須靠左行駛。", C: "藍圓為指引，非禁止。" },
    source: { chapter: "第五章／第八章", section: "單程路／臨時標誌 #8", page: 66, quote: "安全島上設有「可取道任何一邊」標誌，無須轉線，各線會在島另一端匯合。（亦見第119頁 #8）" },
    memoryHook: "單斜箭＝只靠該邊；雙斜箭＝左右都過得。"
  },
  {
    id: "q54",
    category: "signs_signals",
    type: "image",
    sign: "no_motor_except_mc",
    trapTag: "易撈亂",
    prompt: "上圖紅圈內只畫「私家車」加紅斜線（無電單車），代表甚麼？",
    options: {
      A: "禁止所有車輛（含單車）駛入",
      B: "禁止汽車駛入，但電單車及機動三輪車除外",
      C: "只准私家車駛入"
    },
    answer: "B",
    whyRight: "紅圈僅畫私家車＝禁止汽車駛入，電單車及機動三輪車除外（私家車仍禁入）。",
    whyWrong: { A: "禁所有車輛是紅底白橫條（#9）。", C: "紅圈為禁令，非只准。" },
    source: { chapter: "第八章", section: "發出指令的交通標誌 #34", page: 112, quote: "34. 禁止汽車駛入，電單車及機動三輪車除外。" },
    memoryHook: "紅圈「有畫就禁」：無畫電單車＝電單車豁免！"
  },
  {
    id: "q55",
    category: "signs_signals",
    type: "image",
    sign: "wind_affected",
    trapTag: "高頻陷阱",
    prompt: "大橋強風時見上圖「黃底黑車」標誌，哪些車輛不准駛入？",
    options: {
      A: "所有黃色私家車",
      B: "受風車輛（整體高度逾 1.6 米車輛、電單車及機動三輪車）",
      C: "只限雙層巴士"
    },
    answer: "B",
    whyRight: "凡整體高度超過 1.6 米的車輛（含高身七人車／貨車／巴士）、電單車及三輪車均禁入。",
    whyWrong: { A: "與車色無關，矮於 1.6 米私家車可入。", C: "不只巴士，高逾 1.6m 私家車及電單車均禁入。" },
    source: { chapter: "第八章", section: "發出指令的交通標誌 #69", page: 113, quote: "69. 受風車輛（整體高度超過1.6米的車輛、電單車及機動三輪車）不准駛入。（亦見第115頁 #22）" },
    memoryHook: "黃底黑車受風牌：高過 1.6 米 ＋ 兩／三輪電單車禁入。"
  },
  {
    id: "q56",
    category: "signs_signals",
    type: "image",
    sign: "warn_blackspot",
    prompt: "上圖紅邊三角形內有一個「大黑點」，警告前面有甚麼？",
    options: { A: "行車隧道入口", B: "交通意外黑點", C: "迴旋處" },
    answer: "B",
    whyRight: "紅三角內黑圓點＝前面有交通意外黑點（#23），須格外留神。",
    whyWrong: { A: "隧道起點是藍底白字長方牌。", C: "迴旋處是三角形內三箭嘴圓環。" },
    source: { chapter: "第八章", section: "發出警告的交通標誌 #23", page: 116, quote: "23. 前面有交通意外黑點。" },
    memoryHook: "一點黑 ＝ 交通意外黑點。"
  },
  {
    id: "q57",
    category: "signs_signals",
    type: "image",
    sign: "warn_two_way_cross",
    trapTag: "易撈亂",
    prompt: "上圖紅三角內有「左右橫向雙箭嘴」，表示前面甚麼情況？",
    options: {
      A: "前面道路轉為雙程行車",
      B: "前面雙程行車路橫過單程路",
      C: "只准左轉或右轉"
    },
    answer: "B",
    whyRight: "橫向 ←→ 表示前面有雙程路橫過你所在的單程路（左右均會來車）。",
    whyWrong: { A: "前面雙程行車是上下直向 ↑↓（#58）。", C: "強制轉向是藍圓形標誌。" },
    source: { chapter: "第八章", section: "發出警告的交通標誌 #57", page: 117, quote: "57. 前面雙程行車路橫過單程路。（對比 #58 上下箭嘴＝前面雙程行車）" },
    memoryHook: "直箭 ↑↓ 管前路；橫箭 ←→ 管橫街（雙程橫過）。"
  },
  {
    id: "q58",
    category: "signs_signals",
    type: "image",
    sign: "warn_dual_end",
    trapTag: "易撈亂",
    prompt: "上圖紅三角內兩線收合、下方有黑色分道島凸起，代表甚麼？",
    options: {
      A: "前面道路兩邊收窄",
      B: "前面分隔車路終止",
      C: "前面進入分隔車路"
    },
    answer: "B",
    whyRight: "下方有中央分隔島尖端、上方合二為一＝前面分隔車路終止（#7）。",
    whyWrong: { A: "兩邊收窄（#10）中間無黑色分道島。", C: "分隔車路在前是藍底長方文字牌。" },
    source: { chapter: "第八章", section: "發出警告的交通標誌 #7", page: 116, quote: "7. 前面分隔車路終止。" },
    memoryHook: "下底有黑島變冇島＝分隔車路終止；冇島先係兩邊收窄。"
  },
  {
    id: "q59",
    category: "signs_signals",
    type: "image",
    sign: "no_through_road",
    prompt: "上圖藍底「T 字形頂部紅色橫條」代表甚麼？",
    options: { A: "前面有 T 型路口", B: "此路不通（掘頭路）", C: "電車專線" },
    answer: "B",
    whyRight: "白豎頂部紅橫封口＝此路不通（掘頭路）。",
    whyWrong: { A: "T 型路口是紅三角內黑 T 字。", C: "電車專線是藍底電車圖案。" },
    source: { chapter: "第八章", section: "提示標誌", page: 123, quote: "此路不通。" },
    memoryHook: "紅條封頂＝前面撞牆「此路不通」。"
  },
  {
    id: "q60",
    category: "signs_signals",
    type: "image",
    sign: "signal_red_amber",
    trapTag: "高頻陷阱",
    prompt: "見上圖交通燈「紅燈與黃燈同時亮着」，你應該怎樣做？",
    options: {
      A: "安全情況下可立即開車",
      B: "保持停止不動於停車線前，但可準備綠燈亮起時開車",
      C: "燈號失靈，當非交通燈路口駛過"
    },
    answer: "B",
    whyRight: "紅黃齊亮代表即將轉綠，但仍「必須保持不動」，待純綠燈亮起且安全才開車。",
    whyWrong: { A: "紅黃齊亮起步等同衝紅燈，違法危險。", C: "此為香港正常轉燈順序，非失靈。" },
    source: { chapter: "第八章", section: "指示駕駛人的交通燈", page: 107, quote: "當紅燈仍然亮着而黃燈亮起，必須保持停止不動，但可準備在綠燈亮起時開車。" },
    memoryHook: "紅黃齊亮＝預備但唔郁得，見純綠先起步！"
  },
  {
    id: "q61",
    category: "signs_signals",
    type: "image",
    sign: "signal_red_green_arrow",
    prompt: "紅燈亮着同時「左轉綠色箭嘴」亮起（上圖），打算左轉可以行嗎？",
    options: {
      A: "不可以，必等紅燈熄滅",
      B: "可以，在安全情況下依箭嘴方向左轉，無須理會其他燈號",
      C: "直行、左轉及右轉皆可前進"
    },
    answer: "B",
    whyRight: "紅燈＋綠箭嘴同亮，安全下可跟箭嘴方向行駛，無須理會其他燈號。",
    whyWrong: { A: "綠箭嘴正是放行左轉的獨立信號。", C: "只准箭嘴方向通行，其他方向照停。" },
    source: { chapter: "第八章", section: "交通燈／信號 #4", page: 106, quote: "紅色燈號亮着時，如果綠色箭嘴燈號亮起，在安全情況下可依照箭嘴方向行駛。（亦見第115頁 #4）" },
    memoryHook: "紅燈＋綠箭嘴：跟箭嘴行就過得！"
  },
  {
    id: "q62",
    category: "signs_signals",
    type: "image",
    sign: "signal_wigwag",
    prompt: "消防局門外見上圖「兩盞並排紅燈交替閃動」，應該怎樣做？",
    options: {
      A: "望清無消防車即可慢駛通過",
      B: "必須立即停下，直至兩盞紅燈均停止閃動",
      C: "加速盡快駛離門口"
    },
    answer: "B",
    whyRight: "紅色警告閃燈交替閃動時所有車輛必須停下，直至兩盞紅燈完全熄滅。",
    whyWrong: { A: "閃動期間絕不可慢駛偷過。", C: "加速衝過極易與緊急消防車相撞。" },
    source: { chapter: "第八章", section: "紅色警告閃燈", page: 106, quote: "當紅色燈號交替閃動，所有駛近的車輛必須停下，直至兩盞紅燈均停止閃動。" },
    memoryHook: "雙紅閃燈：閃就停，熄晒先好行。"
  },
  {
    id: "q63",
    category: "signs_signals",
    type: "image",
    sign: "lane_signal_merge_left",
    prompt: "隧道或快速公路架空信號顯示「綠色左下斜箭嘴」（上圖），應怎樣做？",
    options: {
      A: "立即急切向左線",
      B: "須駛離本線轉往左邊行車線，但切勿突然轉線，安全才換線",
      C: "繼續留在原線直行"
    },
    answer: "B",
    whyRight: "綠斜箭嘴指令駛離本線改向箭嘴方，但須安全換線；未能換線則於障礙前停車等候。",
    whyWrong: { A: "突然切線易與左線高速車碰撞。", C: "前方該線將封閉或有險，不可續行。" },
    source: { chapter: "第八章", section: "行車線信號", page: 108, quote: "表示你須駛離本身行車線改向箭嘴方向行駛，但切勿突然轉換行車線，要在安全情況下才可換線。" },
    memoryHook: "架空信號：綠↓行得 · 紅✕禁行 · 綠斜箭安全過隔籬線。"
  },
  {
    id: "q64",
    category: "signs_signals",
    type: "image",
    sign: "hand_signal_left",
    trapTag: "高頻陷阱",
    prompt: "前車司機伸出右臂並「逆時針打圈」（上圖），表示甚麼？",
    options: { A: "即將轉右", B: "即將轉左", C: "即將慢駛或停車" },
    answer: "B",
    whyRight: "香港右軚車三手號皆用右手：平伸＝轉右、逆時針打圈＝轉左、上下擺＝慢駛／停車。",
    whyWrong: { A: "轉右是右臂平伸不動。", C: "慢駛／停車是掌心向下上下擺動。" },
    source: { chapter: "第八章", section: "手號", page: 105, quote: "右臂伸出逆時針打圈：表示即將向左駛出或轉左。" },
    memoryHook: "右手三號：平伸轉右 · 打圈轉左 · 上下撳慢停。"
  },

  // ==================== 6. 行人 · 意外 · 急救 ====================
  {
    id: "q65",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "數字",
    prompt: "在綠色人像過路處、行人天橋或行人隧道兩旁多少米以內，行人不得橫過馬路？",
    options: { A: "10 米以內", B: "15 米以內", C: "25 米以內" },
    answer: "B",
    whyRight: "天橋、隧道及綠色人像過路處兩旁 15 米內不得橫過馬路，必用該設施。",
    whyWrong: { A: "10 米短於法定距離。", C: "25 米長於法定距離。" },
    source: { chapter: "第二章", section: "禁止過馬路的地方", page: 20, quote: "不得在「綠色人像」過路處、行人天橋或行人隧道兩旁15米內過馬路。（亦見第14、16頁）" },
    memoryHook: "天橋 · 隧道 · 綠公仔：兩旁 15 米內必用設施！"
  },
  {
    id: "q66",
    category: "pedestrians_emergency",
    type: "text",
    prompt: "沒有行人路的一般雙程馬路上，行人如須在車路步行，應靠哪邊？",
    options: {
      A: "靠左邊，與車輛同向",
      B: "靠右邊，面向駛近來車",
      C: "沿路中央分界線步行"
    },
    answer: "B",
    whyRight: "無行人路的雙程路，行人應靠右邊步行面向來車，方便互見避讓。",
    whyWrong: { A: "靠左會背對來車（手推車、單車、馬匹才靠左）。", C: "路中央被兩邊車夾擊極險。" },
    source: { chapter: "第二章", section: "在沒有行人路的馬路", page: 7, quote: "如果馬路兩旁都沒有行人路，行人應靠馬路右邊步行，面向來車。" },
    memoryHook: "行人無路＝靠右迎車；單車／手推車／遊行＝靠左同向。"
  },
  {
    id: "q67",
    category: "pedestrians_emergency",
    type: "image",
    sign: "school_patrol",
    prompt: "學校交通安全隊舉上圖牌截停後再發出放行信號，但仍有行人過馬路，應怎樣做？",
    options: {
      A: "響號催促行人加快",
      B: "仍須讓路給仍在橫過馬路的行人，待完全通過才開行",
      C: "只要無學童即可開行"
    },
    answer: "B",
    whyRight: "即使交通安全隊放行，只要仍有任何行人正在過路，駕駛人仍須讓路。",
    whyWrong: { A: "切勿響號嚇驚行人或學童。", C: "所有過路行人（不限學童）均須禮讓。" },
    source: { chapter: "第五章", section: "學校交通安全隊", page: 59, quote: "在交通安全隊發出讓車輛通過的信號時，如仍有行人正在橫過馬路，你仍須讓路。" },
    memoryHook: "校隊放行都要睇人：行人未過晒一律讓路。"
  },
  {
    id: "q68",
    category: "pedestrians_emergency",
    type: "image",
    sign: "mileage_route9",
    prompt: "九號幹線里程標誌「23.0 / 9 / A」（上圖），字母「A」代表甚麼？",
    options: {
      A: "逆時針方向（B 為順時針）",
      B: "往機場方向（Airport）",
      C: "自動繳費行車線"
    },
    answer: "A",
    whyRight: "里程牌每 100 米設一個；九號環迴幹線專用 A＝逆時針、B＝順時針。",
    whyWrong: { B: "機場方向用飛機圖案標示。", C: "自動繳費是黃底黑框 Autotoll 牌。" },
    source: { chapter: "第十章", section: "里程標誌", page: 133, quote: "只適用於九號幹線：'A' – 逆時針，'B' – 順時針。" },
    memoryHook: "九號幹線：A ＝ Anti-clockwise（逆時針），B ＝ 順時針。"
  },
  {
    id: "q69",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「隧道內」中途壞車應怎樣做？若車輛冒煙或起火呢？",
    options: {
      A: "立即推車出隧道；冒煙則關窗留車內",
      B: "關引擎、亮死火燈、勿移車、扣安全帶留車內求助；若冒煙起火則向冒煙相反方向離開",
      C: "落車打開車頭蓋在行車線維修"
    },
    answer: "B",
    whyRight: "隧道壞車勿移車、熄匙開死火燈扣帶留車等救；冒煙起火即向冒煙相反方向逃生。",
    whyWrong: { A: "隧道禁推車；冒煙留車內會窒息致命。", C: "絕不可在行車道檢查修車。" },
    source: { chapter: "第十章", section: "在隧道內壞車", page: 133, quote: "關掉引擎、亮危險警告燈、扣安全帶留車內……如冒煙或火警，應向冒煙相反方向離開現場。" },
    memoryHook: "隧道壞車：無煙扣帶留車勿移；有煙反煙方向逃生。"
  },
  {
    id: "q70",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "中途壞車時擺放「紅色三角形警告牌」，下列哪項正確？",
    options: {
      A: "在快速公路上放於壞車後方 50 米",
      B: "只在限速 50 公里或以下道路放於後方約 50 米；快速公路或限速逾 50 公里道路切勿擺放，只亮危險警告燈",
      C: "任何道路放於車尾 5 米內"
    },
    answer: "B",
    whyRight: "雙 50 原則：限速 ≤50 km/h 才放後方約 50 米；快速公路或逾 50 km/h 嚴禁擺牌，只開死火燈！",
    whyWrong: { A: "快速公路落車擺牌極易被撞，明文禁止。", C: "5 米太近，後車來不及煞停。" },
    source: { chapter: "第十章", section: "三角形警告牌", page: 134, quote: "車速限制超過每小時50公里的道路上，切勿擺放三角形警告牌……50公里或以下道路放在壞車約50米前。" },
    memoryHook: "雙 50：限速 ≤50 先放 50 米；逾 50（快速公路）禁放牌！"
  },
  {
    id: "q71",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "數字",
    prompt: "交通意外如涉及「有人傷亡」，須於多久內親自報警？未獲警方許可可否移車？",
    options: {
      A: "盡快且不遲於 24 小時內親自報告；未獲許可不得移車（救人救火除外）",
      B: "72 小時內致電報告；應即把車駛離免塞車",
      C: "輕微擦傷交換電話即可，無須報警"
    },
    answer: "A",
    whyRight: "涉傷亡須盡快且不遲於 24 小時「親自」報警；未獲警方許可不可移車（救人／救火除外）。",
    whyWrong: { B: "是 24 小時親自報告，且不可擅自移車。", C: "只要有人傷亡均必須報警。" },
    source: { chapter: "第十章", section: "發生交通意外後應做的事", page: 135, quote: "盡快而不遲於意外後24小時親自向警務人員或警署報告……未獲許可不得移動車輛（救人救火除外）。" },
    memoryHook: "有人傷亡：24 小時親身報警 ＋ 勿移車（救人救火除外）。"
  },
  {
    id: "q72",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "交通意外現場照顧清醒傷者或受驚者，哪項做法正確？",
    options: {
      A: "給傷者飲溫水或服止痛藥鎮定",
      B: "保持溫暖並安慰，切勿給止痛藥、飲品、進食或吸煙；無內臟受損的受驚者可臥下提高雙腳",
      C: "無即時危險亦應先抬傷者出車外"
    },
    answer: "B",
    whyRight: "傷者內臟可能受損需做手術，禁給水／食物／止痛藥／煙；保暖安慰，純受驚可墊高雙腳。",
    whyWrong: { A: "飲水、進食及止痛藥會危及內臟治療。", C: "無即時危險勿亂動傷者，免傷脊椎頸部。" },
    source: { chapter: "第十章", section: "照顧清醒和有呼吸的傷者", page: 138, quote: "保持溫暖。不要讓他們服用止痛藥、飲酒或其他飲品、進食或吸煙……受驚無受傷可臥下把雙腳提高。" },
    memoryHook: "急救四不：唔亂搬 · 唔俾飲 · 唔俾食 · 唔俾藥（急救箱放前座貯物箱！）。"
  },

  // ==================== BONUS VISUAL SIGNS ====================
  {
    id: "q73",
    category: "signs_signals",
    type: "image",
    sign: "ahead_only",
    trapTag: "易撈亂",
    prompt: "上圖「藍底圓形白色向上箭嘴」代表甚麼？",
    options: {
      A: "只准向前駛（強制不可左右轉）",
      B: "前面是單程路",
      C: "直行擁有優先權"
    },
    answer: "A",
    whyRight: "藍色「圓形」是強制指令：只准依箭嘴向前駛，不可左右轉。",
    whyWrong: { B: "單程行車是藍底「長方形」。", C: "優先權用紅三角粗線標誌。" },
    source: { chapter: "第八章", section: "發出指令的交通標誌 #3", page: 111, quote: "3. 只准向前駛（藍色圓形強制標誌，亦見第77頁）。" },
    memoryHook: "圓形死命令＝只准向前；長方形＝單程路。"
  },
  {
    id: "q74",
    category: "signs_signals",
    type: "image",
    sign: "no_motor_all",
    trapTag: "易撈亂",
    prompt: "上圖紅圈同時畫有「電單車＋私家車」加紅斜線，代表甚麼？",
    options: {
      A: "禁止汽車駛入（涵蓋所有汽車及電單車）",
      B: "禁止私家車與電單車並排",
      C: "只限電單車駛入"
    },
    answer: "A",
    whyRight: "同時畫電單車與私家車＝禁止所有機動車輛駛入（#33）。",
    whyWrong: { B: "不准超車是兩架左右並排私家車（無斜線）。", C: "電單車同在紅圈內，同樣禁入。" },
    source: { chapter: "第八章", section: "發出指令的交通標誌 #33", page: 112, quote: "33. 禁止汽車駛入。" },
    memoryHook: "兩架都有畫＝全部汽車（連電單車）禁入。"
  },
  {
    id: "q75",
    category: "signs_signals",
    type: "image",
    sign: "lane_signal_cross",
    prompt: "架空行車線信號顯示上圖「紅色交叉」，代表甚麼？",
    options: {
      A: "減速小心繼續使用該線",
      B: "切勿使用在該燈號以後的行車線",
      C: "只准私家車使用該線"
    },
    answer: "B",
    whyRight: "紅色交叉或紅燈＝切勿使用該燈號以後的行車線。",
    whyWrong: { A: "嚴禁繼續行駛於該線。", C: "一般車輛一律禁行。" },
    source: { chapter: "第八章", section: "行車線信號／信號 #12", page: 108, quote: "當紅色交叉或紅燈亮着時，表示切勿使用在該燈號以後的行車線。（亦見第115頁 #12）" },
    memoryHook: "架空大紅 ✕ ＝ 該線封閉／禁行。"
  },
  {
    id: "q76",
    category: "signs_signals",
    type: "image",
    sign: "hand_signal_slow",
    prompt: "前車司機伸右臂掌心向下「上下擺動」（上圖），表示甚麼？",
    options: { A: "示意後車可右超", B: "即將慢駛或停車", C: "即將右轉" },
    answer: "B",
    whyRight: "右臂平伸掌心向下上下擺動＝即將慢駛或停車。",
    whyWrong: { A: "手號只表自身意向，非指揮超車。", C: "右轉是右臂平伸不動。" },
    source: { chapter: "第八章", section: "手號", page: 105, quote: "右臂掌心向下上下擺動：表示即將慢駛或停車。" },
    memoryHook: "掌心向下撳「慢啲、慢啲」＝慢駛／停車。"
  },
  {
    id: "q77",
    category: "signs_signals",
    type: "image",
    sign: "warn_camera",
    prompt: "路旁見上圖紅框黑色相機標誌，代表甚麼？",
    options: {
      A: "前面有景點可停車拍照",
      B: "前面有衝紅燈攝影機／偵速攝影機",
      C: "禁止使用車Cam"
    },
    answer: "B",
    whyRight: "紅框相機＝警告前面設有衝紅燈攝影機或偵速攝影機。",
    whyWrong: { A: "非景點泊車提示。", C: "並無禁止車 Cam 標誌。" },
    source: { chapter: "第八章", section: "發出警告的交通標誌 #59", page: 118, quote: "59. 前面有衝紅燈攝影機／偵速攝影機。" },
    memoryHook: "紅框相機＝衝紅燈／快相機，即收油睇燈。"
  },
  {
    id: "q78",
    category: "signs_signals",
    type: "image",
    sign: "pedestrian_priority",
    trapTag: "易撈亂",
    prompt: "上圖「紅圈行人（無斜線）」標誌代表甚麼？",
    options: {
      A: "禁止行人進入（行人止步）",
      B: "行人優先使用區，須慢駛並讓路給行車道上行人",
      C: "前面有斑馬線"
    },
    answer: "B",
    whyRight: "紅圈行人「無斜線」＝行人優先使用區（#31），車輛須減速讓行人。",
    whyWrong: { A: "行人止步（#42）必須有紅斜線劈過行人。", C: "前面斑馬線是紅三角警告牌。" },
    source: { chapter: "第五章／第八章", section: "行人優先使用區／標誌 #31", page: 58, quote: "在行人優先使用區內，你須讓路給行車道上的行人。（亦見第112頁 #31）" },
    memoryHook: "有斜線＝行人止步；無斜線＝行人優先區。"
  },
  {
    id: "q79",
    category: "lanes_highways",
    type: "image",
    sign: "bus_lane_all",
    trapTag: "易撈亂",
    prompt: "上圖巴士線生效時間為上午 7–10 及下午 4–7，下午 2 時私家車可用嗎？",
    options: {
      A: "可以，生效時間以外所有車輛均可使用",
      B: "不可以，巴士線全日禁私家車",
      C: "下午 2 時只准的士及專營巴士"
    },
    answer: "A",
    whyRight: "順向巴士線在標誌牌列明時間以外，開放給所有車輛正常使用。",
    whyWrong: { B: "非 24 小時亦非反向巴士線，時間外可行。", C: "非生效時間開放予所有車輛。" },
    source: { chapter: "第五章", section: "巴士線", page: 65, quote: "在巴士線生效時間以外，所有車輛都可使用巴士線。" },
    memoryHook: "順向巴士線睇鐘：時間外＝人人行得。"
  },
  {
    id: "q80",
    category: "signs_signals",
    type: "image",
    sign: "no_parking",
    trapTag: "易撈亂",
    prompt: "上圖藍底紅邊「單一紅斜線（/）」代表甚麼？可否短暫落客？",
    options: {
      A: "不准停車，不可上落客",
      B: "不准泊車；不妨礙安全下可短暫停車上落客（不可超所需時間）",
      C: "只准泊車 15 分鐘"
    },
    answer: "B",
    whyRight: "單斜線＝不准泊車（#8）；無阻礙危險下可短暫上落客即走。",
    whyWrong: { A: "紅交叉（X）才是不准停車。", C: "完全禁泊，無 15 分鐘寬限。" },
    source: { chapter: "第五章／第八章", section: "禁止泊車的地點／標誌 #8", page: 92, quote: "一般停車不會造成阻礙或危險的地方，可供停車上落客貨，不可超過所需時間。（亦見第111頁 #8）" },
    memoryHook: "單斜唔准泊（落客即走 OK）；交叉連停都唔准。"
  }
];

// 8 Visual Contrastive Cards (Ultra-Concise Side-by-Side)
window.CONTRAST_CARDS = [
  {
    id: "c1",
    title: "停車 STOP vs 讓路 GIVE WAY",
    page: "P.79, 109",
    left: { sign: "stop_oct", label: "八角形 STOP", rule: "無車都必完全停定" },
    right: { sign: "give_way", label: "倒三角 GIVE WAY", rule: "讓大路，安全可慢過" },
    hook: "八角必停定，倒三角讓大路"
  },
  {
    id: "c2",
    title: "不准停車 vs 不准泊車",
    page: "P.90–92, 111",
    left: { sign: "no_stopping", label: "紅交叉 ＝ 不准停車", rule: "連落客都唔得 · 實黃線" },
    right: { sign: "no_parking", label: "單紅斜 ＝ 不准泊車", rule: "落客即走 OK · 虛黃線" },
    hook: "一劃禁泊，兩劃交叉連停都禁"
  },
  {
    id: "c3",
    title: "單程行車 vs 只准向前駛",
    page: "P.66, 111",
    left: { sign: "one_way", label: "藍長方 ＝ 單程路", rule: "整條路單向，路口可依標記轉" },
    right: { sign: "ahead_only", label: "藍圓形 ＝ 只准向前", rule: "強制直行，禁左右轉" },
    hook: "長方單程路，圓形死命令直去"
  },
  {
    id: "c4",
    title: "專營巴士線 vs 所有巴士線",
    page: "P.65, 113",
    left: { sign: "bus_lane_franchised", label: "巴士圖案 ＝ 專營專用", rule: "只准專營巴士" },
    right: { sign: "bus_lane_all", label: "Bus 巴士字 ＝ 所有巴士", rule: "專營及非專營均可" },
    hook: "畫公仔＝專營；寫中英文＝所有巴士"
  },
  {
    id: "c5",
    title: "禁止所有汽車 vs 電單車除外",
    page: "P.112 #33–34",
    left: { sign: "no_motor_all", label: "電單車＋汽車", rule: "所有汽車一律禁入" },
    right: { sign: "no_motor_except_mc", label: "只畫私家車", rule: "禁汽車，電單車除外" },
    hook: "紅圈有畫就禁，無畫電單車＝豁免"
  },
  {
    id: "c6",
    title: "前面雙程 vs 雙程橫過單程",
    page: "P.117 #57–58",
    left: { sign: "warn_two_way_ahead", label: "直向 ↑↓", rule: "前面轉雙程行車" },
    right: { sign: "warn_two_way_cross", label: "橫向 ←→", rule: "橫街為雙程路橫過" },
    hook: "直箭管前路，橫箭管橫街"
  },
  {
    id: "c7",
    title: "自動波斜路泊車扭軚",
    page: "P.95",
    left: { sign: "slope_park_up_kerb", label: "上斜＋有石壆 → 扭右", rule: "全港唯一扭右＋入 P 波" },
    right: { sign: "slope_park_no_kerb", label: "下斜 / 無石壆 → 扭左", rule: "其餘全部扭左＋入 P 波" },
    hook: "唯有「上斜有石」扭右，其餘全扭左"
  },
  {
    id: "c8",
    title: "四色標誌杆 & 停車距離",
    page: "P.54, 91",
    left: { sign: "pole_colors", label: "禁區杆四色時段", rule: "紅7–12｜黃7–7｜綠8–10,5–7｜灰其他" },
    right: { sign: "stopping_distance_chart", label: "乾地停車距離", rule: "40→20m｜60→35m｜80→60m（濕剎×2）" },
    hook: "思考＝車速÷4；濕地只把剎車×2"
  }
];

// Concise, High-Impact Emotional Value Lines (Zero emoji icons — paired with crisp SVG badges)
window.EMOTIONAL_BANK = {
  fresh: [
    { icon: "checkCircle", badge: "一擊即中", text: "答得乾脆！考官喺隔離都點頭。" },
    { icon: "sparkles", badge: "一眼看穿", text: "呢條伏完全呃唔到你！" },
    { icon: "shield", badge: "穩陣過關", text: "穩到好似入咗 P 波拉實手掣。" },
    { icon: "book", badge: "守則入腦", text: "呢頁守則已經印咗入你個腦！" },
    { icon: "target", badge: "精準判斷", text: "冷靜準確，好司機格局。" },
    { icon: "award", badge: "實力認證", text: "唔係撞彩，係真係識！" },
    { icon: "zap", badge: "爽快俐落", text: "照呢個節奏，1TakePass 無難度。" },
    { icon: "checkCircle", badge: "綠燈通行", text: "一路綠燈，手感越嚟越順！" },
    { icon: "sparkles", badge: "醒目出手", text: "細節位全部捕捉晒，抵讚！" },
    { icon: "target", badge: "正中紅心", text: "零猶豫過關，師傅都想請你飲奶茶。" }
  ],
  streak: [
    { icon: "flame", badge: "{combo} 連中", text: "手感火熱！進入 Turbo 狀態。" },
    { icon: "zap", badge: "{combo} 連擊", text: "連過 {combo} 關，呢啲難度當熱身！" },
    { icon: "trophy", badge: "{combo} 連勝", text: "零失誤穩定度，就係一剔過關鍵！" },
    { icon: "sparkles", badge: "{combo} 題全中", text: "合格紙已經寫緊你個名啦。" },
    { icon: "flame", badge: "{combo} 連殺", text: "連高頻陷阱都俾你秒殺，好勁！" },
    { icon: "award", badge: "{combo} 連中", text: "狀態大勇，繼續保持呢股氣勢！" }
  ],
  godlike: [
    { icon: "crown", badge: "{combo} 連中 · 滿分氣場", text: "癲呀！可以幫運輸署出卷啦！" },
    { icon: "trophy", badge: "{combo} 連擊 · 無敵級", text: "全港路牌見到你都要立正敬禮。" },
    { icon: "flame", badge: "{combo} 連勝 · 天選之人", text: "準備 20/20 滿分走出長沙灣試場！" },
    { icon: "crown", badge: "{combo} 連殺 · 活字典", text: "記憶力同專注力直頭滿星！" }
  ],
  redeemed: [
    { icon: "brain", badge: "錯題雪恥！", text: "上次跣腳位今次秒殺，記憶正式升級！" },
    { icon: "sparkles", badge: "超校正發功", text: "曾經錯一次，從此唔再錯！" },
    { icon: "award", badge: "盲點清零", text: "親手將弱點變強項，最值錢嘅進步！" },
    { icon: "checkCircle", badge: "破冰成功", text: "上次中過伏，今日一眼睇穿！" }
  ],
  comfort: [
    { icon: "shield", badge: "考前排雷", text: "今日錯賺咗！總好過去到考場先錯。" },
    { icon: "brain", badge: "黃金記憶點", text: "答錯即睇正解，記憶會比死背深兩倍。" },
    { icon: "target", badge: "免疫一世", text: "中過一次伏，正式考試必認得佢。" },
    { icon: "book", badge: "已入錯題本", text: "已排入間隔複習，我哋幫你溫到熟。" }
  ]
};

window.MISTAKE_REASONS = [
  { id: "trap_wording", label: "睇錯字眼" },
  { id: "confused_sign", label: "撈亂路牌" },
  { id: "forgot_number", label: "忘記數字" },
  { id: "concept_unclear", label: "概念未清" }
];
