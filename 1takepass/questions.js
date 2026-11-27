// 1TakePass Question Bank — HK Private Car Automatic (1A) Written Test
// Grounded in《道路使用者守則》現行版（2020年6月版＋2025–2026最新生效法例）· 300-question past-paper & high-yield edition

window.CATEGORIES = [
  { id: "driver_safety", name: "酒駕 · 安全帶 · P牌", short: "酒駕與P牌", icon: "shield", color: "#005EB8" },
  { id: "driving_skills", name: "車速 · 停車距離 · 超車", short: "車速與超車", icon: "gauge", color: "#B45309" },
  { id: "lanes_highways", name: "行車線 · 快速公路 · 迴旋處", short: "公路與路口", icon: "route", color: "#007A4D" },
  { id: "weather_parking", name: "夜間天氣 · 工程 · 自動波泊車", short: "天氣與泊車", icon: "parking", color: "#6D28D9" },
  { id: "signs_signals", name: "交通標誌 · 燈號 · 手號", short: "路牌與燈號", icon: "traffic", color: "#C81E1E" },
  { id: "pedestrians_emergency", name: "行人 · 意外處理 · 急救", short: "行人與急救", icon: "heart", color: "#0F766E" }
];

window.QUESTIONS = [
  {
    id: "q01",
    category: "driver_safety",
    type: "text",
    trapTag: "數字",
    prompt: "駕駛考試的視力標準，須在充足光線下清楚讀出相距多遠的車牌號碼？",
    options: {
      A: "18 米",
      B: "23 米",
      C: "30 米"
    },
    answer: "B",
    whyRight: "法定視力標準為相距 23 米讀出車牌，須戴眼鏡才達標者駕車必戴。",
    whyWrong: { A: "18 米短於法定標準。", C: "30 米高於法定標準。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駕駛車輛", page: 41, quote: "在充足光線下，可清楚讀出與你相距23米的車牌號碼。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "法定上限", page: 41, quote: "每100毫升呼氣中有22微克、血液中有50毫克、或尿液中有67毫克酒精。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "你的乘客", page: 41, quote: "必須先關掉引擎，入一波／後波或泊車波（自動波），並拉緊停泊制動器。（亦見第50頁）" },
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
    whyWrong: { B: "單車車鏈虛位上限是 2 厘米，汽車輪胎胎紋法定下限是 1 毫米。", C: "官方下限是 1 毫米及四分三寬度。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "安全檢查", page: 42, quote: "輪胎的胎紋至少要深1毫米，並且起碼要蓋過輪胎面四分三的寬度。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "汽車座位安全帶", page: 43, quote: "但如進行涉及倒車的操作時（例如用「三手軚」掉頭，或要向前及倒後駛入泊車位）則除外。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "孕婦如何佩戴安全帶", page: 44, quote: "橫帶應調低至兩臀骨位置（腹下及大腿骨上）……斜帶橫越兩乳中間及腹部之上。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "安全氣袋", page: 46, quote: "幼童如使用背向後仰式嬰孩安全裝置，不可置於前排設有氣袋的座位上。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "暫准駕駛執照計劃", page: 48, quote: "通過至少12個月暫准期……前後展示「P」牌……不得行駛超過每小時70公里。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "學習駕駛／標誌 #39", page: 47, quote: "學習駕駛人不可駛越此標誌，或在標誌生效的道路上駕駛。（亦見第112頁 #39）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駕駛改進課程／記分制", page: 48, quote: "過去兩年內累積達10分須修習該課程……被記滿15分或以上，法庭可取消駕駛資格。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "輔助駕駛系統", page: 42, quote: "你仍要時刻留意路面的交通情況及手握軚盤，以準備於緊急時立刻恢復人手操控。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "你的乘客", page: 41, quote: "未滿3歲的小童不計算在內；三名3歲或以上而不高於1.3米的小童，可作兩名乘客計算。" },
    memoryHook: "全部 3 字頭：未滿 3 歲免計，3 個 1.3 米＝2 個位。"
  },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "安全駕駛的例行程序", page: 49, quote: "時刻記得在行動前，遵守下列步驟：想一想 — 看一看 — 發信號 — 再看看。" },
    memoryHook: "四步口訣：想 → 看 → 燈 → 再看。"
  },
  {
    id: "q14",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "停車熄匙法例下，車輛停定時於任何連續 60 分鐘內引擎合計運作超過多久即違法？",
    options: {
      A: "超過 3 分鐘",
      B: "超過 5 分鐘",
      C: "超過 10 分鐘"
    },
    answer: "A",
    whyRight: "除獲豁免情況外，停定時於任何連續 60 分鐘內空轉逾 3 分鐘即違法。",
    whyWrong: { B: "5 分鐘已超法定寬限。", C: "10 分鐘遠超法定上限。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "停車熄匙", page: 53, quote: "在車輛停定時讓引擎於任何連續的60分鐘時段內合計運作超過3分鐘，即屬違法。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "停車距離", page: 54, quote: "40km/h：10+10=20米；60km/h：15+20=35米；80km/h：20+40=60米。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "停車距離", page: 54, quote: "每小時80公里：20米＋40米＝60米。如果路面濕滑，剎車距離要作兩倍計算。" },
    memoryHook: "濕地只係「剎車 × 2」，思考唔變！（80 濕＝20+80＝100m）"
  },
  {
    id: "q17",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "除非另有標誌說明，香港所有道路的預設最高車速限制是多少？",
    options: {
      A: "時速 40 公里",
      B: "時速 50 公里",
      C: "時速 70 公里"
    },
    answer: "B",
    whyRight: "無特別車速標誌時，全港所有道路最高車速均為每小時 50 公里。",
    whyWrong: { A: "香港無 40 km/h 預設限速。", C: "70 km/h 須由限速牌另行標示。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駕駛速度", page: 55, quote: "除非有標誌另外說明，否則，所有道路的最高車速，都是時速50公里。" },
    memoryHook: "無牌睇，一律 50 km/h！"
  },
  {
    id: "q18",
    category: "driving_skills",
    type: "text",
    prompt: "良好情況下跟車守「兩秒距程」；若遇路面濕滑或天氣欠佳，距程應增至多少？",
    options: {
      A: "三秒",
      B: "倍增至四秒，或更長",
      C: "保持兩秒但開危險警告燈"
    },
    answer: "B",
    whyRight: "天氣或路況欠佳時，應把兩秒距程倍增至四秒或更長。",
    whyWrong: { A: "守則規定倍增至四秒或以上，非三秒。", C: "兩秒不足夠，亦不應無故長亮死火燈。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "兩秒距程規則", page: 55, quote: "說「一千零一、一千零二」約兩秒……情況欠佳下，應把距程倍增至四秒，或更長。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "可從左方超車／通過", page: 57, quote: "當前車發出右轉信號，如果你從左方超車不會妨礙他人，又無需駛入巴士線，你可從左方超越前車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "切勿超車／標誌 #46", page: 57, quote: "圖中標誌表示「禁止超車」的起點。（亦見第112頁 #46）" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "使用響號", page: 52, quote: "不可在「寂靜地帶」內使用響號……通常設於醫院附近，時間牌註明管制時間。" },
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
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "閃動大燈／倒車", page: 52, quote: "閃動大燈只有一個意思，就是讓其他道路使用者留意你……絕不可從支路倒車進入大路。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "車尾標記", page: 61, quote: "附設在車身總長度超過13米的貨車或其拖車架尾部的標記。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "動物", page: 61, quote: "緩慢行車，讓出充足空間……切勿響號或「踏空油」來唬嚇牠們。當帶領動物的人要求停車時，必須停車。" },
    memoryHook: "見動物：慢車、讓位、咪呠咪踏空油，叫停即停。"
  },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "道路上的線條", page: 62, quote: "線段愈長，危險性愈大……警告線線條長而線距短，用以警告前面有危險。（亦見第124頁）" },
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
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "反光路釘", page: 62, quote: "琥珀色路釘標明車道右面近中央分隔帶的邊緣。綠色路釘設於路口交滙處、路旁停車處或讓車處的車道邊緣。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "雙白線", page: 63, quote: "如果雙白線靠近你的一邊是虛線，你可在安全情況下，越過該線或跨線行駛。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "雙白線", page: 63, quote: "如果雙白線分隔同一方向行駛的兩條行車線……即使你想向右轉入／轉出毗連處所，也不得跨越該線。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "巴士線", page: 65, quote: "標誌牌示有巴士圖案者，則只准專營巴士使用，而有「巴士」二字者，則所有巴士均可使用。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "反向行駛的巴士線", page: 66, quote: "反向行駛巴士線（專營巴士）標誌 — 任何時間均不得駛入道路對面的巴士線。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "斜坡", page: 67, quote: "1：5（20%）較1：10（10%）陡峭。向下行駛時切勿只依賴腳掣……應選擇和維持以低波行車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "快速公路及主幹路", page: 72, quote: "學習駕駛人、公共小型巴士、低於125cc或額定功率低於7千瓦的電動私家車，均不准使用快速公路。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "在隧道內", page: 73, quote: "切勿使用高燈；切勿響號；正常交通下切勿以不足每小時25公里行駛；切勿跨越雙白線。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "轉右（右轉袋口位）", page: 75, quote: "在右轉袋口位等候時，你無需理會交通燈號，但應自己衡量是否有足夠安全空間，如安全便可轉彎。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "電車和輕鐵的黃色方格路口", page: 78, quote: "如路口有電車或輕鐵路軌並劃上黃色方格，切勿從任何行車線（包括右轉線）駛入，除非出口暢通無阻。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "迴旋處 — 轉右／掉頭", page: 81, quote: "從最右線駛入並發右轉信號，沿內線行駛，直至經過選定出口前一個出口，才發左轉信號離開。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章／第八章", section: "分隔車路的路口", page: 82, quote: "倒數標誌表示離減速行車線起點還有多遠（以百米為單位）。（亦見第123頁）" },
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
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "「斑馬線」", page: 84, quote: "有人踏足「斑馬線」便須停車……不要示意行人過路……中央設有安全島，每邊視為獨立過路處。" },
    memoryHook: "斑馬線三禁：咪揮手叫人過 · 之字線咪扒頭 · 黑白紋咪停車。"
  },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "夜間駕駛", page: 86, quote: "應轉移視線，切勿瞪着光線，應轉眼望向道路左邊。不要閃動高燈警告，也千萬不要同樣亮高燈。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "下雨和濕滑的路面", page: 87, quote: "應盡量慢駛，但引擎轉速不可過慢防死火。駛過水浸街道後，應盡快試用制動系統。" },
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
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "下雨和濕滑的路面", page: 87, quote: "雨水會使路面滑溜，特別是久乾天氣下微濕的路面更滑。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "不准停車的地點／標誌 #7", page: 90, quote: "限制標誌 — 不准停車……下列地點，不准停車，更切勿上落客貨。（亦見第111頁 #7）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "顏色標誌杆", page: 91, quote: "紅：上午七時至午夜十二時；黃：上午七時至下午七時；綠：上午八至十時及下午五至七時；灰：其他時段。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "禁止泊車的地點", page: 92, quote: "如路旁劃上單行黃色虛線，不得在該邊道路、行人路或路旁泊車。（亦見第126頁）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "殘疾乘客在限制區上落車證明書", page: 91, quote: "讓殘疾乘客在限制區上落車（快速公路及全日「不准停車」限制區除外）。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "禁止／准許泊車的地點", page: 92, quote: "街燈之間相隔不超過200米的道路……不可在同一泊車處停泊車輛超過24小時。（亦見第94頁）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "泊車標誌／標誌 #75", page: 94, quote: "供任何車輛停泊，除中型及重型貨車、巴士、旅遊車、電單車及單車外。（亦見第113頁 #75）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在上坡斜路泊車……把軚盤扭向右邊……入一波或泊車波（自動波），並啟動好停泊制動器。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在沒有路邊石的上坡斜路或下坡斜路泊車 — 軚盤應扭向左邊……泊車波（自動波）並啟動停泊制動器。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "更多參考資料（路政署）", section: "閃爍箭嘴指示燈號", page: 140, quote: "危險（對角黃燈交替閃動）— 工程車輛示意將會轉線。" },
    memoryHook: "對角黃燈交替閃＝工程車要轉線！"
  },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "必須停車或讓路的路口", page: 79, quote: "即使大路上並無其他車輛，你也必須在「停車」線前停車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "單程路／標誌 #10", page: 66, quote: "「單程行車」標誌 — 只准依指示的方向行駛。（亦見第111頁 #10）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "單程路／臨時標誌 #8", page: 66, quote: "安全島上設有「可取道任何一邊」標誌，無須轉線，各線會在島另一端匯合。（亦見第119頁 #8）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出指令的交通標誌 #34", page: 112, quote: "34. 禁止汽車駛入，電單車及機動三輪車除外。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出指令的交通標誌 #69", page: 113, quote: "69. 受風車輛（整體高度超過1.6米的車輛、電單車及機動三輪車）不准駛入。（亦見第115頁 #22）" },
    memoryHook: "黃底黑車受風牌：高過 1.6 米 ＋ 兩／三輪電單車禁入。"
  },
  {
    id: "q56",
    category: "signs_signals",
    type: "image",
    sign: "warn_blackspot",
    prompt: "上圖紅邊三角形內有一個「大黑點」，警告前面有甚麼？",
    options: {
      A: "行車隧道入口",
      B: "交通意外黑點",
      C: "迴旋處"
    },
    answer: "B",
    whyRight: "紅三角內黑圓點＝前面有交通意外黑點（#23），須格外留神。",
    whyWrong: { A: "隧道起點是藍底白字長方牌。", C: "迴旋處是三角形內三箭嘴圓環。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出警告的交通標誌 #23", page: 116, quote: "23. 前面有交通意外黑點。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出警告的交通標誌 #57", page: 117, quote: "57. 前面雙程行車路橫過單程路。（對比 #58 上下箭嘴＝前面雙程行車）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出警告的交通標誌 #7", page: 116, quote: "7. 前面分隔車路終止。" },
    memoryHook: "下底有黑島變冇島＝分隔車路終止；冇島先係兩邊收窄。"
  },
  {
    id: "q59",
    category: "signs_signals",
    type: "image",
    sign: "no_through_road",
    prompt: "上圖藍底「T 字形頂部紅色橫條」代表甚麼？",
    options: {
      A: "前面有 T 型路口",
      B: "此路不通（掘頭路）",
      C: "電車專線"
    },
    answer: "B",
    whyRight: "白豎頂部紅橫封口＝此路不通（掘頭路）。",
    whyWrong: { A: "T 型路口是紅三角內黑 T 字。", C: "電車專線是藍底電車圖案。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "提示標誌", page: 123, quote: "此路不通。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "指示駕駛人的交通燈", page: 107, quote: "當紅燈仍然亮着而黃燈亮起，必須保持停止不動，但可準備在綠燈亮起時開車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "交通燈／信號 #4", page: 106, quote: "紅色燈號亮着時，如果綠色箭嘴燈號亮起，在安全情況下可依照箭嘴方向行駛。（亦見第115頁 #4）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "紅色警告閃燈", page: 106, quote: "當紅色燈號交替閃動，所有駛近的車輛必須停下，直至兩盞紅燈均停止閃動。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "行車線信號", page: 108, quote: "表示你須駛離本身行車線改向箭嘴方向行駛，但切勿突然轉換行車線，要在安全情況下才可換線。" },
    memoryHook: "架空信號：綠↓行得 · 紅✕禁行 · 綠斜箭安全過隔籬線。"
  },
  {
    id: "q64",
    category: "signs_signals",
    type: "image",
    sign: "hand_signal_left",
    trapTag: "高頻陷阱",
    prompt: "前車司機伸出右臂並「逆時針打圈」（上圖），表示甚麼？",
    options: {
      A: "即將轉右",
      B: "即將轉左",
      C: "即將慢駛或停車"
    },
    answer: "B",
    whyRight: "香港右軚車三手號皆用右手：平伸＝轉右、逆時針打圈＝轉左、上下擺＝慢駛／停車。",
    whyWrong: { A: "轉右是右臂平伸不動。", C: "慢駛／停車是掌心向下上下擺動。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "手號", page: 105, quote: "右臂伸出逆時針打圈：表示即將向左駛出或轉左。" },
    memoryHook: "右手三號：平伸轉右 · 打圈轉左 · 上下撳慢停。"
  },
  {
    id: "q65",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "數字",
    prompt: "在綠色人像過路處、行人天橋或行人隧道兩旁多少米以內，行人不得橫過馬路？",
    options: {
      A: "10 米以內",
      B: "15 米以內",
      C: "25 米以內"
    },
    answer: "B",
    whyRight: "天橋、隧道及綠色人像過路處兩旁 15 米內不得橫過馬路，必用該設施。",
    whyWrong: { A: "10 米短於法定距離。", C: "25 米長於法定距離。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "禁止過馬路的地方", page: 20, quote: "不得在「綠色人像」過路處、行人天橋或行人隧道兩旁15米內過馬路。（亦見第14、16頁）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "在沒有行人路的馬路", page: 7, quote: "如果馬路兩旁都沒有行人路，行人應靠馬路右邊步行，面向來車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "學校交通安全隊", page: 59, quote: "在交通安全隊發出讓車輛通過的信號時，如仍有行人正在橫過馬路，你仍須讓路。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "里程標誌", page: 133, quote: "只適用於九號幹線：'A' – 逆時針，'B' – 順時針。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "在隧道內壞車", page: 133, quote: "關掉引擎、亮危險警告燈、扣安全帶留車內……如冒煙或火警，應向冒煙相反方向離開現場。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "三角形警告牌", page: 134, quote: "車速限制超過每小時50公里的道路上，切勿擺放三角形警告牌……50公里或以下道路放在壞車約50米前。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "發生交通意外後應做的事", page: 135, quote: "盡快而不遲於意外後24小時親自向警務人員或警署報告……未獲許可不得移動車輛（救人救火除外）。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "照顧清醒和有呼吸的傷者", page: 138, quote: "保持溫暖。不要讓他們服用止痛藥、飲酒或其他飲品、進食或吸煙……受驚無受傷可臥下把雙腳提高。" },
    memoryHook: "急救四不：唔亂搬 · 唔俾飲 · 唔俾食 · 唔俾藥（急救箱放前座貯物箱！）。"
  },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出指令的交通標誌 #3", page: 111, quote: "3. 只准向前駛（藍色圓形強制標誌，亦見第77頁）。" },
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
    whyWrong: { B: "不准超車（#46）是紅圈紅斜線配兩架左右並排汽車。", C: "電單車同在紅圈內，同樣禁入。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出指令的交通標誌 #33", page: 112, quote: "33. 禁止汽車駛入。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "行車線信號／信號 #12", page: 108, quote: "當紅色交叉或紅燈亮着時，表示切勿使用在該燈號以後的行車線。（亦見第115頁 #12）" },
    memoryHook: "架空大紅 ✕ ＝ 該線封閉／禁行。"
  },
  {
    id: "q76",
    category: "signs_signals",
    type: "image",
    sign: "hand_signal_slow",
    prompt: "前車司機伸右臂掌心向下「上下擺動」（上圖），表示甚麼？",
    options: {
      A: "示意後車可右超",
      B: "即將慢駛或停車",
      C: "即將右轉"
    },
    answer: "B",
    whyRight: "右臂平伸掌心向下上下擺動＝即將慢駛或停車。",
    whyWrong: { A: "手號只表自身意向，非指揮超車。", C: "右轉是右臂平伸不動。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "手號", page: 105, quote: "右臂掌心向下上下擺動：表示即將慢駛或停車。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出警告的交通標誌 #59", page: 118, quote: "59. 前面有衝紅燈攝影機／偵速攝影機。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "行人優先使用區／標誌 #31", page: 58, quote: "在行人優先使用區內，你須讓路給行車道上的行人。（亦見第112頁 #31）" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "巴士線", page: 65, quote: "在巴士線生效時間以外，所有車輛都可使用巴士線。" },
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
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "禁止泊車的地點／標誌 #8", page: 92, quote: "一般停車不會造成阻礙或危險的地方，可供停車上落客貨，不可超過所需時間。（亦見第111頁 #8）" },
    memoryHook: "單斜唔准泊（落客即走 OK）；交叉連停都唔准。"
  },
  {
    id: "q81",
    category: "signs_signals",
    type: "image",
    sign: "give_way",
    trapTag: "歷屆必考",
    prompt: "駛近設有上圖倒置三角形「讓路 GIVE WAY」標誌的路口時，駕駛人應該怎樣做？",
    options: {
      A: "只需閃動大燈示意便可直接駛出大路",
      B: "即使大路完全沒有車輛，亦必須於線前完全停定",
      C: "必須在「讓路」線前讓路給大路上的車輛，如有需要則停車等候，並讓路給橫過小路的行人"
    },
    answer: "C",
    whyRight: "「讓路」標誌要求讓路給大路車輛及小路行人，安全時可慢駛通過，有需要才停下。",
    whyWrong: { A: "小路出大路絕無優先權，亦不可用閃大燈要求別人讓路。", B: "無車仍強制完全停定是八角形「STOP 停」標誌的要求。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "必須停車或讓路的路口／標誌 #1", page: 79, quote: "必須在「讓路」線前讓路給大路上的車輛。如有需要，停車等候。讓路給正在橫過或等候橫過小路的行人。" },
    memoryHook: "倒三角 GIVE WAY＝讓大路，安全可慢過；八角 STOP 先要必停定。"
  },
  {
    id: "q82",
    category: "signs_signals",
    type: "image",
    sign: "no_entry",
    trapTag: "歷屆必考",
    prompt: "在路口見到上圖「紅底白色橫條」圓形標誌，代表甚麼意思？",
    options: {
      A: "前面是私家路，只准住戶車輛駛入",
      B: "所有車輛不准駛入，車輛不得駛越這標誌",
      C: "前面有收費廣場，須準備停車繳費"
    },
    answer: "B",
    whyRight: "紅底白橫條為禁制標誌 #9「所有車輛不准駛入」，常見於單程路出口。",
    whyWrong: { A: "私家路是以藍底白字長方形提示標誌顯示。", C: "與收費廣場無關，屬於全面禁止進入的指令標誌。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "單程路／標誌 #9", page: 66, quote: "「不准駛入」標誌 — 禁止所有車輛駛入，車輛不得駛越這標誌。" },
    memoryHook: "紅圈一字白橫槓＝所有車一律唔准入（常見於單程路尾）。"
  },
  {
    id: "q83",
    category: "signs_signals",
    type: "image",
    sign: "no_u_turn",
    trapTag: "歷屆必考",
    prompt: "道路上豎立上圖交通標誌，表示甚麼限制？",
    options: {
      A: "不准掉頭",
      B: "前面有急彎，須減速靠左行駛",
      C: "只准在路口左轉，不准直駛"
    },
    answer: "A",
    whyRight: "紅圈斜線配 U 形箭嘴為指令標誌 #41「不准掉頭」。",
    whyWrong: { B: "急彎警告屬紅邊三角形警告標誌。", C: "強制左轉屬藍色圓形標誌。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "掉頭／標誌 #41", page: 52, quote: "某些路口或某一段路可能禁止掉頭，在這些地方，會有「禁止掉頭」的標誌示明。" },
    memoryHook: "紅圈劈 U 字＝不准掉頭（#41）。"
  },
  {
    id: "q84",
    category: "signs_signals",
    type: "image",
    sign: "no_left_turn",
    trapTag: "歷屆必考",
    prompt: "駛近路口時見到上圖紅圈斜線標誌，表示甚麼？",
    options: {
      A: "必須在前面路口左轉",
      B: "前面左方有支路匯入",
      C: "不准左轉"
    },
    answer: "C",
    whyRight: "紅圈紅斜線配左轉箭嘴為禁制標誌 #40「不准左轉」（箭嘴相反則不准右轉）。",
    whyWrong: { A: "必須左轉是藍色圓形白箭嘴強制標誌。", B: "支路匯入屬紅邊三角形警告標誌。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "路口／標誌 #40", page: 77, quote: "有些路口禁止車輛轉入或駛進其中某條道路……禁制標誌（圓形紅邊），說明有關禁制。" },
    memoryHook: "紅圈斜線＝禁止；箭嘴向左＝不准左轉。"
  },
  {
    id: "q85",
    category: "signs_signals",
    type: "image",
    sign: "keep_left",
    trapTag: "歷屆必考",
    prompt: "在安全島或道路中央見到上圖藍色圓形標誌，駕駛人必須怎樣做？",
    options: {
      A: "靠左行駛，從安全島左面駛過",
      B: "可從安全島的左面或右面駛過",
      C: "必須在前面路口轉左"
    },
    answer: "A",
    whyRight: "藍圓白左下斜箭嘴為強制標誌 #4「靠左行駛」，必須從標誌左面駛過。",
    whyWrong: { B: "可取道任何一邊會顯示雙向下斜箭嘴（臨時標誌 #8）。", C: "前面路口左轉為直角向左箭嘴（#6）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "白線及行車線／標誌 #4", page: 62, quote: "如果道路中央有安全島，並有「靠左行駛」的標誌，你應從安全島的左面駛過，切勿從右面駛過。" },
    memoryHook: "藍圓左下斜箭＝靠左駛（45°斜＝靠邊，90°直角＝轉彎）。"
  },
  {
    id: "q86",
    category: "signs_signals",
    type: "image",
    sign: "turn_left_ahead",
    trapTag: "易撈亂",
    prompt: "見到上圖藍色圓形白色曲箭嘴標誌，代表甚麼指令？",
    options: {
      A: "靠左行駛，繞過安全島",
      B: "前面路口必須左轉",
      C: "前面左彎，減速慢駛"
    },
    answer: "B",
    whyRight: "藍色圓形白色曲箭嘴為強制標誌 #6「前面路口左轉」（符號相反則右轉）。",
    whyWrong: { A: "靠左行駛是左下 45 度直斜箭嘴（#4）。", C: "前面左彎警告屬紅邊三角形黑曲箭標誌。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第八章", section: "路口／標誌 #6", page: 77, quote: "你必須在前面路口轉左。" },
    memoryHook: "藍圓係死命令：曲箭＝前面路口必轉，斜箭＝靠邊駛。"
  },
  {
    id: "q87",
    category: "signs_signals",
    type: "image",
    sign: "police_stop",
    trapTag: "歷屆必考",
    prompt: "在路障或臨時管制點見到上圖標誌，駕駛人必須怎樣做？",
    options: {
      A: "減慢車速，安全情況下可繼續駛過",
      B: "必須在此標誌前停車，遵從警務人員指示",
      C: "只適用於中型及重型貨車停車受檢"
    },
    answer: "B",
    whyRight: "此為警方使用的臨時限制標誌 #11，所有車輛均必須在標誌前停車。",
    whyWrong: { A: "減速慢駛是藍底「SLOW 慢駛 POLICE 警崗」臨時提示標誌。", C: "此標誌適用於所有駛近車輛，不限車種。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "警方用的交通標誌／標誌 #11", page: 53, quote: "臨時限制標誌 — 必須在此標誌前停車。" },
    memoryHook: "紅圈白底 STOP POLICE＝見牌必停定，聽阿 Sir 指示。"
  },
  {
    id: "q88",
    category: "signs_signals",
    type: "image",
    sign: "no_lane_change",
    trapTag: "高頻陷阱",
    prompt: "在行車線旁或隧道前見到上圖藍底白字標誌「KEEP IN LANE 不准換線」，代表甚麼？",
    options: {
      A: "強制標誌，必須留在原線行駛，不准轉換行車線",
      B: "只禁止重型貨車切線，私家車可自由換線",
      C: "僅屬溫馨提示，有空位時仍可切線超車"
    },
    answer: "A",
    whyRight: "「不准換線」屬第 111 頁「發出指令的交通標誌」#13，所有車輛須保持在原線。",
    whyWrong: { B: "並無豁免私家車，全線車輛均須遵守。", C: "此為發出指令的交通標誌而非一般提示，不可隨意切線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "發出指令的交通標誌 #13", page: 111, quote: "13. 不准換線。" },
    memoryHook: "KEEP IN LANE 屬指令標誌（#13），見牌就鎖線唔准切。"
  },
  {
    id: "q89",
    category: "signs_signals",
    type: "image",
    sign: "cycle_track",
    trapTag: "歷屆必考",
    prompt: "見到上圖藍色圓形內畫單車的標誌，對私家車駕駛人有何意思？",
    options: {
      A: "前面有單車橫過馬路，汽車小心慢駛",
      B: "禁止單車及三輪車進入該路段",
      C: "單車或三輪車徑，禁止汽車駛入"
    },
    answer: "C",
    whyRight: "藍圓白單車為指令標誌 #15「單車或三輪車徑，禁止汽車駛入」。",
    whyWrong: { A: "警告前面有單車徑是紅邊三角形警告標誌（#53）。", B: "禁止單車進入是紅圈紅斜線標誌（#44）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "發出指令的交通標誌 #15", page: 111, quote: "15. 單車或三輪車徑，禁止汽車駛入。" },
    memoryHook: "藍圓白單車＝單車專用徑，汽車禁入。"
  },
  {
    id: "q90",
    category: "signs_signals",
    type: "image",
    sign: "cycle_dismount",
    trapTag: "高頻陷阱",
    prompt: "見到上圖藍色圓形內畫有「人推單車」的標誌（#18），正確意思是？",
    options: {
      A: "限制騎單車 — 騎單車或三輪車者必須下車，用手推車前進",
      B: "禁止騎單車，亦不可用手推單車進入",
      C: "單車徑起點，准許單車與行人共用"
    },
    answer: "A",
    whyRight: "藍圓「人推單車」為限制騎單車標誌（#18），須下車推車直至終止標誌。",
    whyWrong: { B: "連推車都禁入的是紅圈紅斜線禁止單車標誌（#43／#44）。", C: "分隔行人路及單車徑中間會有白色直線分隔人與單車（#14）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章／第八章", section: "在路上應注意的事項／標誌 #18", page: 33, quote: "騎單車或三輪車不准越過以上標誌。如欲前行，必須下車，用手推車，直至限制終止。" },
    memoryHook: "藍圓企喺單車隔離＝落車推（#18）；紅圈斜線＝連推都唔准（#44）。"
  },
  {
    id: "q91",
    category: "signs_signals",
    type: "image",
    sign: "lrt_tram_only",
    trapTag: "歷屆必考",
    prompt: "見到上圖藍底長方形畫有「輕鐵／電車」圖案的標誌，代表甚麼？",
    options: {
      A: "輕鐵專線終止，開放予所有車輛使用",
      B: "前面有輕鐵站，私家車可短暫駛入落客",
      C: "只限輕鐵車輛或電車駛入，其他車輛及行人均不可進入"
    },
    answer: "C",
    whyRight: "藍底長方形輕鐵／電車標誌（#20）表示專線起點，只限輕鐵或電車駛入，行人亦切勿超越。",
    whyWrong: { A: "專線終止為白底黑字「輕鐵專線終止」／「電車專線終止」標誌。", B: "輕鐵專線全日生效，私家車絕不可駛入或落客。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "輕鐵專線／標誌 #20", page: 64, quote: "只准輕鐵車輛駛入標誌，表示輕鐵專線的起點。其他車輛及行人均不可進入「輕鐵專線」範圍。" },
    memoryHook: "藍牌畫電車／輕鐵＝專線起點，人車一律禁入。"
  },
  {
    id: "q92",
    category: "signs_signals",
    type: "image",
    sign: "no_pedestrians",
    trapTag: "易撈亂",
    prompt: "見到上圖「紅圈紅斜線」劃過行人的標誌，與「紅圈無斜線行人」有何分別？",
    options: {
      A: "上圖代表「行人止步」，不得越過或在此道路步行",
      B: "上圖代表前面有行人過路處，車輛須減速",
      C: "上圖代表行人優先使用區，車輛須讓行人"
    },
    answer: "A",
    whyRight: "紅圈有紅斜線（#42）為「行人止步」，多見於高架路、天橋及隧道；無斜線（#31）才是行人優先區。",
    whyWrong: { B: "前面有行人過路處是紅邊三角形警告標誌（#38）。", C: "行人優先使用區（#31）為紅圈內行人配汽車，並無紅斜線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章／第八章", section: "使用道路和行人路／標誌 #42", page: 6, quote: "不得越過禁止行人進入的交通標誌，或在此禁令實施的道路上步行。這些標誌多見於高架道路、行車天橋和隧道。" },
    memoryHook: "有斜線劈落人＝行人止步（#42）；無斜線＝行人優先區（#31）。"
  },
  {
    id: "q93",
    category: "signs_signals",
    type: "image",
    sign: "no_bicycles",
    trapTag: "易撈亂",
    prompt: "在天橋或隧道入口見到上圖紅圈紅斜線單車標誌，代表甚麼？",
    options: {
      A: "只准單車靠最左線行駛",
      B: "騎單車者只要下車推車便可通過",
      C: "禁止單車及三輪車進入（騎或推着均不可進入）"
    },
    answer: "C",
    whyRight: "紅圈斜線單車標誌（#44）指示騎或推着單車／三輪車都不可進入。",
    whyWrong: { A: "此為全面禁止單車進入的標誌。", B: "下車推車可行的是藍圓「限制騎單車」標誌（#18），非紅圈斜線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章／第八章", section: "在路上應注意的事項／標誌 #44", page: 33, quote: "上列標誌指示騎或推着單車或三輪車都不可進入。這些標誌通常設於高架道路、行車天橋及隧道附近。" },
    memoryHook: "紅圈斜線單車＝騎同推都禁入；藍圓人推單車＝落車推得。"
  },
  {
    id: "q94",
    category: "signs_signals",
    type: "image",
    sign: "height_limit_45",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅圈標誌「4.5 m」（上下有黑色三角形），表示甚麼？",
    options: {
      A: "禁止超過 4.5 米高度（包括貨物）的車輛駛入",
      B: "禁止車身長度超過 4.5 米的車輛駛入",
      C: "前面橋面闊度限制為 4.5 米"
    },
    answer: "A",
    whyRight: "上下雙三角指向中央代表「高度限制」（#49），禁止總高度（連貨物）超限車輛駛入。",
    whyWrong: { B: "長度限制會畫上貨車及左右箭嘴（#48）。", C: "闊度限制的兩個黑色三角形位於左右兩側（#47）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第六章／第八章", section: "各種限制／標誌 #49", page: 99, quote: "高度限制 — 禁止超過所示高度（包括貨物）的車輛駛入。" },
    memoryHook: "三角上下夾＝限高（#49）；三角左右夾＝限闊（#47）。"
  },
  {
    id: "q95",
    category: "signs_signals",
    type: "image",
    sign: "weight_limit_10t",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅圈「10 tonnes 公噸」標誌，代表甚麼限制？",
    options: {
      A: "禁止單一車軸重量超過 10 公噸的車輛駛入",
      B: "禁止總重量超過 10 公噸（包括貨物）的車輛駛入",
      C: "只准總重量達 10 公噸以上的重型貨車駛入"
    },
    answer: "B",
    whyRight: "純寫重量數字為車輛總重限制（#50），包括車身、乘客與貨物。",
    whyWrong: { A: "車軸重量限制（#51）會在下方畫上車輪與車軸圖案。", C: "紅圈代表禁止，並非只准。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第六章／第八章", section: "各種限制／標誌 #50", page: 99, quote: "重量限制 — 禁止總重超過所示重量（包括貨物）的車輛駛入。" },
    memoryHook: "紅圈純寫公噸＝限總重（#50）；加畫車軸＝限軸重（#51）。"
  },
  {
    id: "q96",
    category: "signs_signals",
    type: "image",
    sign: "speed_limit_50",
    trapTag: "歷屆必考",
    prompt: "駛離車速較高的道路見到上圖「50」紅圈標誌，下列哪項理解正確？",
    options: {
      A: "車速上限為每小時 50 公里，仍須因應路面與天氣調整安全車速",
      B: "僅適用於輕型及重型貨車，私家車可高至 70 公里",
      C: "須保持時速 50 公里行駛，不可慢於 50 公里"
    },
    answer: "A",
    whyRight: "車速限制是容許的最高車速（單位：公里／小時），絕不代表以該速行駛必定安全。",
    whyWrong: { B: "適用於所有車輛（若車輛本身限速更低則以較低者為準）。", C: "是最高限速，並非最低車速。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "駕駛速度／標誌 #52", page: 55, quote: "車速限制是在路上駕駛時可以容許的最高速度，但不表示以該速度行駛即屬安全。" },
    memoryHook: "限速係上限唔係建議速；離開高限速路段必望咪錶防超速。"
  },
  {
    id: "q97",
    category: "signs_signals",
    type: "image",
    sign: "except_for_access",
    trapTag: "高頻陷阱",
    prompt: "限制標誌下方附設上圖「前往此區者不在此限」輔助字牌（#54），正確意思是？",
    options: {
      A: "只豁免緊急服務車輛及專營巴士",
      B: "所有私家車均可無視上方禁令自由穿過該道路作捷徑",
      C: "在沒有其他通道可用時，准許車輛駛入受管制道路以前往毗連處所或土地"
    },
    answer: "C",
    whyRight: "字牌 #54 容許在沒有其他通道時，進入該路前往毗連處所或土地，但不可純粹借道穿過。",
    whyWrong: { A: "不限緊急車輛或巴士，凡前往毗連處所者均適用。", B: "不可純粹借道捷徑，只限前往該路毗連處所且無其他通道時。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第六章／第八章", section: "各種限制／標誌 #54", page: 99, quote: "「前往此區者不在此限」字牌，表示在沒有其他通道可用時，准許車輛駛入受禁令管制的道路，以前往毗連的處所或土地。" },
    memoryHook: "Except for access＝無其他路去毗連建築物先准入，唔准當捷徑穿過。"
  },
  {
    id: "q98",
    category: "signs_signals",
    type: "image",
    sign: "tunnel_start",
    trapTag: "歷屆必考",
    prompt: "駛越上圖「隧道管制區域」標誌後，哪項行為在隧道內屬於違規？",
    options: {
      A: "亮着低燈靠線行駛",
      B: "在正常交通情況下，以時速低於 25 公里行駛",
      C: "壞車時關掉引擎、亮危險警告燈並留在車內等候救援"
    },
    answer: "B",
    whyRight: "隧道內正常交通下切勿以不足每小時 25 公里的車速行駛，亦不得響號、開高燈或切線。",
    whyWrong: { A: "隧道內應亮着低燈並保持原線，屬正確做法。", C: "隧道內壞車正應關引擎、亮死火燈、扣安全帶留車內求助。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "隧道區及管制區／標誌 #70", page: 73, quote: "在隧道內：在正常交通情況下，切勿以不足每小時25公里的車速行駛。" },
    memoryHook: "隧道正常行車不可慢過 25 km/h；禁高燈、禁響號、禁切線、禁推車。"
  },
  {
    id: "q99",
    category: "signs_signals",
    type: "image",
    sign: "no_dangerous_goods",
    trapTag: "歷屆必考",
    prompt: "在隧道前常見上圖標誌（紅圈內畫起火貨車），表示甚麼？",
    options: {
      A: "前面有油站及危險品上落區",
      B: "禁止載有指定類別危險品的車輛駛入",
      C: "禁止所有貨車駛入"
    },
    answer: "B",
    whyRight: "標誌 #72 禁止載有指定危險品（如第 1、2 或 5 類）的車輛駛入，常連同類別字牌 #73 使用。",
    whyWrong: { A: "紅圈斜線為禁制標誌，並非提示油站。", C: "禁止貨車駛入（#38）車斗並無火焰圖案。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "隧道區／標誌 #72", page: 73, quote: "在沒有許可下，切勿駕駛載有《危險品（適用及豁免）規例》列明為第1、2或5類危險品的車輛駛入。" },
    memoryHook: "紅圈火車斗＝禁危險品車（隧道禁 1、2、5 類危險品）。"
  },
  {
    id: "q100",
    category: "signs_signals",
    type: "image",
    sign: "expressway_end",
    trapTag: "歷屆必考",
    prompt: "見到上圖藍底高架路圖案加紅色斜線標誌（#81），代表甚麼？",
    options: {
      A: "快速公路終止，須留意前面道路的新車速限制與交通情況",
      B: "快速公路起點，必須加速匯入",
      C: "前面行車天橋封閉，所有車輛須改道"
    },
    answer: "A",
    whyRight: "紅斜線劃過快速公路圖案為標誌 #81「快速公路終止」；白底紅圖案無斜線才是起點（#80）。",
    whyWrong: { B: "快速公路起點是白底紅邊配紅色公路圖案（#80）。", C: "道路封閉是以紅色長方形「道路封閉」臨時標誌顯示。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "快速公路及主幹路／標誌 #81", page: 71, quote: "快速公路終止。" },
    memoryHook: "白底紅圖＝快速公路起點；藍底紅斜劈＝快速公路終止。"
  },
  {
    id: "q101",
    category: "signs_signals",
    type: "image",
    sign: "warn_roundabout",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅邊三角形內有三段環形箭嘴標誌，表示甚麼？",
    options: {
      A: "前面有迴旋處，應減速並盡早選定出口行車線",
      B: "只准在此處掉頭，不准直行",
      C: "前面有環保回收站"
    },
    answer: "A",
    whyRight: "警告標誌 #8「前面有迴旋處」，須預早減速、決定出口並讓右方迴旋處內車輛先行。",
    whyWrong: { B: "紅邊三角形為警告標誌，並非強制掉頭。", C: "順時針環形箭嘴代表香港的左行迴旋處。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "迴旋處／警告標誌 #8", page: 80, quote: "警告標誌 — 迴旋處在前。駛近迴旋處時，應減慢車速，盡早決定你會在哪一個出口駛出，並駛入正確的行車線。" },
    memoryHook: "紅三角順時針圈＝前面迴旋處，入處前必讓右車。"
  },
  {
    id: "q102",
    category: "signs_signals",
    type: "image",
    sign: "warn_narrow_both",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅邊三角形警告標誌（兩邊線同時向內收窄），代表甚麼？",
    options: {
      A: "前面道路只有右邊收窄",
      B: "前面道路兩邊收窄",
      C: "前面分隔車路終止"
    },
    answer: "B",
    whyRight: "警告標誌 #10 表示前面道路兩邊同時收窄，須減速留意對頭或旁邊車輛。",
    whyWrong: { A: "右邊收窄（#9）左線保持筆直，只有右線向內彎。", C: "分隔車路終止（#7）底部中央有黑色分道島凸起。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "窄路、斜坡／警告標誌 #10", page: 67, quote: "警告標誌 — 前面道路兩邊收窄。" },
    memoryHook: "無中島＋雙邊縮＝兩邊收窄（#10）；有中島＝分隔車路終止（#7）。"
  },
  {
    id: "q103",
    category: "signs_signals",
    type: "image",
    sign: "warn_traffic_lights",
    trapTag: "歷屆必考",
    prompt: "行車時見到上圖警告標誌，表示前面有甚麼設施？",
    options: {
      A: "前面有衝紅燈攝影機",
      B: "前面有交通燈號（路口或「綠色人像」過路處）",
      C: "前面有「斑馬線」過路處"
    },
    answer: "B",
    whyRight: "紅邊三角配紅黃綠三燈為警告標誌 #14「前面有交通燈號」，亦用於預告綠色人像過路處或臨時交通燈。",
    whyWrong: { A: "衝紅燈攝影機標誌是紅框長方形畫黑色相機（#59）。", C: "斑馬線／行人過路處警告標誌為三角形內畫行人與虛線（#38）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "綠色人像過路處／警告標誌 #14", page: 85, quote: "警告標誌 — 交通燈或「綠色人像」過路處在前。" },
    memoryHook: "紅三角紅黃綠燈＝前面交通燈（亦適用於臨時燈及綠人過路處）。"
  },
  {
    id: "q104",
    category: "signs_signals",
    type: "image",
    sign: "warn_ped_blackspot",
    trapTag: "高頻陷阱",
    prompt: "上圖紅邊三角形警告標誌（#24）與「大黑點」標誌（#23）有何分別？",
    options: {
      A: "上圖表示前面有「行人交通意外黑點」",
      B: "上圖表示前面有學校交通安全隊駐守",
      C: "上圖表示前面只准行人行走，汽車禁入"
    },
    answer: "A",
    whyRight: "標誌 #24 專門警告前面為「行人交通意外黑點」，須格外慢駛留意行人。",
    whyWrong: { B: "前面有學童為三角形內兩名手牽手兒童（#39）。", C: "紅邊三角屬警告標誌，非禁止汽車駛入。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "發出警告的交通標誌 #24", page: 116, quote: "24. 前面有行人交通意外黑點。" },
    memoryHook: "大黑點＝一般意外黑點（#23）；人車碰撞圖＝行人意外黑點（#24）。"
  },
  {
    id: "q105",
    category: "signs_signals",
    type: "image",
    sign: "warn_crossroads",
    trapTag: "歷屆必考",
    prompt: "見到上圖十字路口警告標誌（#25），當中較粗的直向線條代表甚麼？",
    options: {
      A: "較粗的線條表示該路段為單程路",
      B: "較粗的線條表示該方向路面封閉",
      C: "較粗的線條表示該方向有過路優先權（主路）"
    },
    answer: "C",
    whyRight: "路口警告標誌與預告方向標誌上，線條越粗代表該道路越重要、享有過路優先權。",
    whyWrong: { A: "單程路以藍長方形白箭嘴標誌示明。", B: "行車線封閉會以紅色橫條標示。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "路口／警告標誌 #25", page: 76, quote: "警告標誌 — 較粗的線條表示有過路優先權。" },
    memoryHook: "路口圖線越粗＝越大路、有優先權。"
  },
  {
    id: "q106",
    category: "signs_signals",
    type: "image",
    sign: "warn_zebra_ahead",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅邊三角形內畫有行人踏過兩條虛線的標誌（#38），代表甚麼？",
    options: {
      A: "前面有行人過路處（如斑馬線），須減速準備讓行人",
      B: "前面有行人優先使用區",
      C: "前面行人在沒有行人路的馬路上步行"
    },
    answer: "A",
    whyRight: "三角形內行人跨過雙虛線為警告標誌 #38「前面有行人過路處」。",
    whyWrong: { B: "行人優先使用區是紅圈標誌（#31）。", C: "行人在道路上步行（#52）圖案為大人牽小童，腳下無虛線。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "斑馬線／警告標誌 #38", page: 84, quote: "警告標誌 — 行人過路處在前。" },
    memoryHook: "腳下有雙虛線＝前面行人過路處（#38）；無虛線＝馬路有行人（#52）。"
  },
  {
    id: "q107",
    category: "signs_signals",
    type: "image",
    sign: "warn_children",
    trapTag: "歷屆必考",
    prompt: "在學校附近見到上圖「前面有兒童」標誌，而其下方的「雙黃燈」正在閃動時，表示甚麼？",
    options: {
      A: "表示前面有學校交通安全隊正在指揮交通，須減速並準備停車",
      B: "表示學校已放假，無須減速",
      C: "表示該路段即時轉為單程行車"
    },
    answer: "A",
    whyRight: "「前面有兒童」標誌下的雙黃燈閃動時，代表前面正有學校交通安全隊指揮交通。",
    whyWrong: { B: "相反，雙黃燈閃動正是提醒學童上下課繁忙時段。", C: "與單程行車無關。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "學校交通安全隊", page: 59, quote: "在學校交通安全隊的過路處前，可能設有「前面有兒童」的警告標誌，標誌下面的雙黃燈閃動時，表示前面有學校交通安全隊正在指揮交通。" },
    memoryHook: "兒童牌＋下閃雙黃燈＝前面有學校交通安全隊截車！"
  },
  {
    id: "q108",
    category: "signs_signals",
    type: "image",
    sign: "warn_disabled",
    trapTag: "歷屆必考",
    prompt: "行車時見到上圖警告標誌（#34），駕駛人應該怎樣做？",
    options: {
      A: "只准領有傷殘人士泊車許可證的車輛駛入",
      B: "鳴響車號提醒前面人士盡快讓開",
      C: "小心慢駛，留意可能有行動不便、視障或聽障人士過路，讓出充裕時間"
    },
    answer: "C",
    whyRight: "標誌 #34 警告「前面有殘疾人士」，他們可能行動不便或視聽受損，須給予充裕過路時間。",
    whyWrong: { A: "紅邊三角是警告標誌，傷殘泊車位是以藍底白「P」配輪椅標誌顯示。", B: "不可隨便響號催促或驚嚇殘疾行人。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "殘疾行人／警告標誌 #34", page: 59, quote: "警告標誌 — 前面有殘疾人士。注意殘疾行人，他們可能行動不便或有視覺或聽覺障礙，應讓他們有充裕時間橫過馬路。" },
    memoryHook: "三角拐杖＋輪椅＝前面有殘疾人士，必慢駛俾足時間過路。"
  },
  {
    id: "q109",
    category: "signs_signals",
    type: "image",
    sign: "warn_lrt_tram",
    trapTag: "歷屆必考",
    prompt: "見到上圖紅邊三角形警告標誌（#49），代表前面有甚麼情況？",
    options: {
      A: "前面道路上有輕鐵車輛或電車行駛或橫過",
      B: "前面設有平交道口閘門",
      C: "只准輕鐵或電車駛入的專線起點"
    },
    answer: "A",
    whyRight: "警告標誌 #49 提示前面有輕鐵或電車行駛或橫過，須特別小心因列車不能轉向閃避。",
    whyWrong: { B: "平交道口閘門標誌（#35）畫有柵欄圍欄圖案。", C: "專線起點是藍底長方形指令標誌（#20）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "輕鐵專線／警告標誌 #49", page: 64, quote: "警告標誌，表示前面道路上有輕鐵車輛行駛或橫過。" },
    memoryHook: "紅三角輕鐵／電車＝小心列車行駛或橫過；藍長方＝專線禁入。"
  },
  {
    id: "q110",
    category: "signs_signals",
    type: "image",
    sign: "warn_cyclists",
    trapTag: "易撈亂",
    prompt: "見到上圖紅邊三角形內畫有騎單車人士的標誌（#54），應如何駕駛？",
    options: {
      A: "禁止騎單車者使用前面道路",
      B: "前面有騎單車者，須保持耐性、減速並預留充足空間才可超車",
      C: "汽車禁止進入，前面屬單車專用徑"
    },
    answer: "B",
    whyRight: "紅邊三角騎單車者標誌（#54）警告前面有騎單車者，須減速並保留足夠空間。",
    whyWrong: { A: "禁止單車進入為紅圈紅斜線標誌（#44）。", C: "單車徑禁汽車駛入為藍色圓形標誌（#15）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第八章", section: "騎單車者／警告標誌 #54", page: 60, quote: "駕車時如遇有騎單車者在前，便應保持耐性。除非你有充足空間超前，而不會將騎單車者迫往路旁，否則切勿嘗試超車。" },
    memoryHook: "紅三角＝警告小心單車；藍圓＝單車徑；紅圈斜線＝禁單車。"
  },
  {
    id: "q111",
    category: "signs_signals",
    type: "image",
    sign: "warn_roadworks",
    trapTag: "歷屆必考",
    prompt: "見到上圖「前面有道路工程」臨時標誌時，駕駛人應怎樣反應？",
    options: {
      A: "保持正常車速盡快通過工地免阻塞交通",
      B: "立即在標誌前完全停車等候指示",
      C: "立即減速，提防工程人員、工程車突然闖入及行人被迫踏出車道"
    },
    answer: "C",
    whyRight: "一旦看到道路工程警告標誌即應減速，並防範工人、工程車及受阻行人踏出馬路。",
    whyWrong: { A: "工地附近多數不能以正常車速行駛，須立即減速。", B: "警告標誌不要求直接煞停，除非遇上紅燈或「停」字牌。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "道路工程／臨時標誌 #5", page: 88, quote: "一旦看到道路工程的警告指示時，你就應立即減速。提防在有關行車道或其附近進行工程的人員及車輛會突然走近或闖入開放的行車線。" },
    memoryHook: "見工程牌即收慢，防工人闖線、防行人出車路、勿撞雪糕筒。"
  },
  {
    id: "q112",
    category: "signs_signals",
    type: "image",
    sign: "warn_slippery",
    trapTag: "歷屆必考",
    prompt: "見到上圖臨時警告標誌（#33，車輛後方有彎曲輪胎痕），表示前面有甚麼危險？",
    options: {
      A: "前面路滑，應減速、避免急剎及急轉向",
      B: "前面不准超車",
      C: "前面有連續彎路"
    },
    answer: "A",
    whyRight: "臨時警告標誌 #33 代表「前面路滑」，須減低車速並加大跟車距離。",
    whyWrong: { B: "不准超車（#46）是紅圈紅斜線配兩架並排汽車。", C: "連續彎路（#6）畫的是「Z／N」形彎箭嘴，無汽車圖案。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "臨時標誌 #33", page: 120, quote: "33. 前面路滑。" },
    memoryHook: "紅三角車尾畫 S 輪胎痕＝前面路滑（#33）。"
  },
  {
    id: "q113",
    category: "signs_signals",
    type: "image",
    sign: "warn_loose_chippings",
    trapTag: "歷屆必考",
    prompt: "見到上圖臨時警告標誌（#34，車輪旁濺起碎點），代表甚麼？",
    options: {
      A: "前面有鬆脫碎石，應減速並與前車保持更遠距離",
      B: "前面街道水浸，須試剎車",
      C: "前面山坡有石塊下墜危險"
    },
    answer: "A",
    whyRight: "臨時警告標誌 #34 代表「前面有鬆脫碎石」，高速行駛會令輪胎打滑及彈石傷及他車。",
    whyWrong: { B: "並非水浸標誌。", C: "山坡落石（警告標誌 #40）畫的是斜坡與滾下石塊，無車輪圖案。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "臨時標誌 #34", page: 120, quote: "34. 前面有鬆脫碎石。" },
    memoryHook: "車胎彈花＝鬆脫碎石（臨時標誌 #34）；斜坡滾石＝石塊下墜（警告標誌 #40）。"
  },
  {
    id: "q114",
    category: "lanes_highways",
    type: "image",
    sign: "passing_place",
    trapTag: "歷屆必考",
    prompt: "在狹窄單行路上見到上圖藍底「讓車處 Passing place」標誌，下列哪項做法正確？",
    options: {
      A: "可在此處暫時停泊車輛購物",
      B: "如迎面有車而讓車處在你的右方，應直接駛入右方讓車處",
      C: "如讓車處在你的左方可駛入暫停；若在右方則應在讓車處對面暫停等候，且切勿泊車"
    },
    answer: "C",
    whyRight: "讓車處在左方可駛入；在右方時不可橫越入去，應在對面暫停讓對頭車駛入，並切勿泊車。",
    whyWrong: { A: "切勿在讓車處停泊車輛，以免癱瘓窄路避車功能。", B: "讓車處在右方時，應停在讓車處對面讓對頭車使用，不可硬切入右方。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "窄路、斜坡／提示標誌", page: 67, quote: "而就近的讓車處又在你那邊（左方），你可駛入讓車處；如果讓車處在另一邊（右方），你可在讓車處對面暫停等候……切勿在讓車處停泊車輛。" },
    memoryHook: "讓車處在左入左、在右停對面；盡量讓上斜車，絕不可泊車。"
  },
  {
    id: "q115",
    category: "signs_signals",
    type: "image",
    sign: "hand_signal_right",
    trapTag: "歷屆必考",
    prompt: "前車司機或電單車騎士伸出右臂平舉指向右方（如上圖），代表甚麼意向？",
    options: {
      A: "即將向右駛出或轉右",
      B: "示意後車可以從右方超車",
      C: "即將慢駛或停車"
    },
    answer: "A",
    whyRight: "右臂向外平伸不動代表即將向右駛出或轉右；信號只表明自己意向，非指揮他車。",
    whyWrong: { B: "守則明言信號只可用來表明本身意向，切勿用來指示其他道路使用者。", C: "慢駛或停車是右臂掌心向下上下擺動。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "手號", page: 105, quote: "表示即將向右駛出或轉右。" },
    memoryHook: "右手平伸＝轉右；右手逆時針打圈＝轉左；右手上下擺＝減速停車。"
  },
  {
    id: "q116",
    category: "signs_signals",
    type: "image",
    sign: "warn_two_way_ahead",
    trapTag: "易撈亂",
    prompt: "見到上圖紅邊三角形內有「上下直向雙箭嘴」（#58），代表甚麼？",
    options: {
      A: "前面轉為雙程行車，須提防迎面車輛",
      B: "前面雙程行車路橫過單程路",
      C: "前面有兩條同一方向的行車線"
    },
    answer: "A",
    whyRight: "直向雙箭嘴（#58）代表「前面雙程行車」，常見於單程路或分隔車路即將完結處。",
    whyWrong: { B: "橫過單程路的雙程路是用橫向左右雙箭嘴（#57）標示。", C: "箭嘴一上一下代表相反行車方向。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "發出警告的交通標誌 #58", page: 117, quote: "58. 前面雙程行車。" },
    memoryHook: "直向 ↑↓ 管前路轉雙程（#58）；橫向 ←→ 管前面橫街雙程（#57）。"
  },
  {
    id: "q117",
    category: "weather_parking",
    type: "image",
    sign: "pole_colors",
    trapTag: "歷屆必考",
    prompt: "參考上圖「不准停車」限制區顏色標誌杆，黃色杆與灰色杆分別代表哪個標準時段？",
    options: {
      A: "黃杆：上午 7 時至午夜 12 時；灰杆：全日 24 小時",
      B: "黃杆：上午 7 時至下午 7 時；灰杆：其他時段（以限制標誌所示為準）",
      C: "黃杆：上午 8 時至 10 時及下午 5 時至 7 時；灰杆：僅限公眾假期"
    },
    answer: "B",
    whyRight: "標準色杆：紅 7–12（午夜）、黃 7–7、綠 8–10 及 5–7、灰其他時段；顏色僅供參考，以牌面為準。",
    whyWrong: { A: "上午 7 時至午夜 12 時為紅杆，全日 24 小時以雙黃實線／全日牌示明。", C: "8–10 及 5–7 為綠杆時段。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "不准停車的地點 — 顏色標誌杆", page: 91, quote: "紅：上午七時至午夜十二時；黃：上午七時至下午七時；綠：上午八時至十時及下午五時至七時；灰：其他時段。" },
    memoryHook: "紅 7–12、黃 7–7、綠 8–10/5–7、灰其他；一切以牌面為準。"
  },
  {
    id: "q118",
    category: "driving_skills",
    type: "image",
    sign: "stopping_distance_chart",
    trapTag: "數字",
    prompt: "參考上圖官方停車距離圖表，在「乾爽路面」以時速 40 公里及 80 公里行駛的最短停車距離分別是多少？",
    options: {
      A: "40 km/h：10 米；80 km/h：40 米",
      B: "40 km/h：30 米；80 km/h：80 米",
      C: "40 km/h：20 米；80 km/h：60 米"
    },
    answer: "C",
    whyRight: "乾爽路面最短停車距離：40 km/h＝10+10＝20 米；60 km/h＝15+20＝35 米；80 km/h＝20+40＝60 米。",
    whyWrong: { A: "10 米與 40 米只是「剎車距離」，漏計了「思考距離」。", B: "數值高於官方乾爽路面圖表數字。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "停車距離", page: 54, quote: "車速每小時40公里：思考距離10米＋剎車距離10米＝停車距離20米；每小時80公里：20米＋40米＝60米。" },
    memoryHook: "乾地停車距離記三組：40→20m、60→35m、80→60m。"
  },
  {
    id: "q119",
    category: "lanes_highways",
    type: "image",
    sign: "zebra_crossing_mark",
    trapTag: "歷屆必考",
    prompt: "觀察上圖「斑馬線」及其兩旁白色「之」字線控制區，下列哪項規則正確？",
    options: {
      A: "不可在「之」字線區內泊車、上落客貨或超越最靠近斑馬線的車輛，但讓行人過路或等候轉彎時可停下",
      B: "只要無人踏足斑馬線，可在「之」字線區內超越慢車",
      C: "「之」字線控制區內一律不可停車，包括讓路給行人"
    },
    answer: "A",
    whyRight: "之字線區內禁泊車、禁上落客貨、禁超車，但讓行人過路或等候左／右轉時可停車。",
    whyWrong: { B: "守則明文禁止在斑馬線「之」字線區域內超車。", C: "讓行人過路或等候轉左／轉右是容許在之字線區停下的兩大例外。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "斑馬線／道路標記", page: 84, quote: "你也不可在髹有「之」字線的控制區內停車，除非你要讓行人過馬路，或正等候轉左或轉右……不可超越最靠近「斑馬線」正在行駛的車輛。" },
    memoryHook: "斑馬之字區：禁泊、禁上落、禁爬頭；只准為讓行人或等轉彎停。"
  },
  {
    id: "q120",
    category: "lanes_highways",
    type: "image",
    sign: "yellow_box_normal",
    trapTag: "歷屆必考",
    prompt: "在沒有電車或輕鐵路軌的一般黃色方格路口（上圖），甚麼情況下「可以」駛入黃格內等候？",
    options: {
      A: "任何情況下即使出口受阻都可先駛入半個車身排隊",
      B: "綠燈剛轉黃燈時為免阻礙後車可停在黃格內",
      C: "只在有意右轉、行車線劃有右轉箭嘴，而僅受迎面車或前面右轉車阻擋時"
    },
    answer: "C",
    whyRight: "一般黃格（無電車／輕鐵軌）唯一可入內等候的例外：在右轉箭嘴線等右轉而僅受迎面車／前右轉車阻擋。",
    whyWrong: { A: "出口道路或行車線受阻時，切勿駛入黃色方格。", B: "任何直行或左轉出口受阻均不可入黃格停留。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "黃色方格路口", page: 78, quote: "如你有意轉右，但因有車輛迎面駛近或有其他車輛等候右轉，使你受阻，你便可在劃有右轉箭嘴的行車線上駛入黃色方格等候右轉。" },
    memoryHook: "普通黃格：唯一准入去等＝右轉線受迎面車阻擋；有軌黃格就連右轉都禁入！"
  },
  {
    id: "q121",
    category: "lanes_highways",
    type: "image",
    sign: "tram_stop_mark",
    trapTag: "歷屆必考",
    prompt: "駛近上圖沒有安全島的電車站「黃色停車線」時，若電車正停站上落客，駕駛人必須怎樣做？",
    options: {
      A: "響號提醒乘客讓路後繼續直行",
      B: "慢駛從電車左方緩緩穿過乘客群",
      C: "必須在黃色「停車」線前停下，待所有乘客上落電車後才可開車"
    },
    answer: "C",
    whyRight: "遇無安全島電車站有電車停站，必須在黃色停車線前停定，待所有乘客完成上落方可開車，且防有人趕車衝出。",
    whyWrong: { A: "絕對不可響號催促上落電車的乘客。", B: "不可超越停在沒有安全島車站的電車（見第 57 頁）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章／第八章", section: "行人 — 電車站／道路標記", page: 58, quote: "如電車站沒有安全島，你必須在黃色「停車」線前停下，讓電車乘客橫過馬路上落電車，待所有乘客上落電車後，才可開車。" },
    memoryHook: "無安全島電車站＝黃停車線前停定，等全部乘客上落完先開。"
  },
  {
    id: "q122",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "香港「違例駕駛記分制度」中，完成運輸署指定的「駕駛改進課程」可扣減多少分？甚麼情況下「不會」獲扣減？",
    options: {
      A: "扣減 5 分；每次修畢均無條件扣減",
      B: "扣減 3 分；即使已記滿 15 分亦可透過課程立即減至 12 分免停牌",
      C: "扣減 3 分；若零分、過去 2 年已滿 15 分或以上、或過去 2 年曾獲扣減，則不獲扣減"
    },
    answer: "C",
    whyRight: "修畢駕駛改進課程可扣 3 分，但有三大例外不扣分：現時 0 分、兩年內已達 15 分或以上、兩年內曾獲扣分。",
    whyWrong: { A: "只扣 3 分，且有上述三項限制。", B: "累積達 15 分或以上已完成停牌門檻，修讀課程不會扣分。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駕駛改進課程", page: 48, quote: "其累積的違例駕駛分數便會獲扣減3分。然而……駕駛人沒有被記任何違例駕駛分數；累積達15分或以上；或在過去兩年內曾獲扣減，則不會扣減。" },
    memoryHook: "改進課程扣 3 分；「0 分、≥15 分、2 年內扣過」三情況唔扣！"
  },
  {
    id: "q123",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "電單車後座（側車固定座位除外）不可以接載少於多少歲的乘客？",
    options: {
      A: "12 歲",
      B: "8 歲",
      C: "6 歲"
    },
    answer: "B",
    whyRight: "法例規定電單車後座不可運載 8 歲以下乘客（側車固定座位除外），且除非附側車否則限載一名乘客。",
    whyWrong: { A: "12 歲（或體重 36 公斤）是 2020 年版守則對私家車兒童安全帶的年齡／體重參考界線（2025 年 11 月生效新例則以 8 歲以下且身高未達 1.35 米作法定門檻），並非電單車後座年齡。", C: "法定最低年齡為 8 歲而非 6 歲。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第七章", section: "乘客", page: 103, quote: "電單車後座不能運載八歲以下的乘客，除非該乘客是在側車固定座位上運載，則作別論。" },
    memoryHook: "電單車後座禁載 8 歲以下（側車除外）；P 牌電單車完全禁載客。"
  },
  {
    id: "q124",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在香港申領私家車或輕型貨車駕駛執照，最低法定年齡是多少歲？駕駛時須攜帶甚麼？",
    options: {
      A: "年滿 21 歲；只需把執照影印本放於車廂",
      B: "年滿 16 歲；只需攜帶身份證副本",
      C: "年滿 18 歲；駕駛時必須隨身攜帶有效駕駛執照"
    },
    answer: "C",
    whyRight: "一般駕駛人須年滿 18 歲並持有效執照，駕駛時必須隨身攜帶有效駕駛執照。",
    whyWrong: { A: "21 歲是申領「商用車輛」駕駛執照的最低年齡。", B: "最低法定年齡為 18 歲，且必須帶有效駕駛執照正本。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駕駛車輛", page: 41, quote: "作為駕駛人，你必須年滿18歲，並且持有有效的駕駛執照。你在駕駛時，必須隨身攜帶有效駕駛執照。" },
    memoryHook: "私家車 18 歲、商用車 21 歲；揸車必隨身帶有效車牌。"
  },
  {
    id: "q125",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "完成私家車暫准駕駛期（P 牌 12 個月）後，必須在多久內申請正式駕駛執照？",
    options: {
      A: "1 年內",
      B: "3 年內",
      C: "5 年內"
    },
    answer: "B",
    whyRight: "完成至少 12 個月暫准駕駛期後，必須在完成期後的 3 年內申請正式駕駛執照。",
    whyWrong: { A: "12 個月是暫准駕駛期的最短長度，並非申請期限。", C: "超過 3 年未申請便會喪失直接換領資格。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "暫准駕駛執照計劃", page: 48, quote: "如要申領正式駕駛執照，必須在完成暫准駕駛期後的3年內提出申請。" },
    memoryHook: "P 牌掛夠 12 個月，完期後 3 年內換正式牌。"
  },
  {
    id: "q126",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "根據《道路使用者守則》，前座乘客的身體應與儀錶板最少保持多少距離？為何？",
    options: {
      A: "最少半米，以便伸展雙腳",
      B: "無特別要求，只要扣上安全帶即可",
      C: "最少四分一米（約 25 厘米），讓安全帶有足夠時間回索固定乘客免撞向儀錶板"
    },
    answer: "C",
    whyRight: "前座乘客身體須與儀錶板保持至少四分一米距離，確保急剎或碰撞時安全帶有空間回索鎖緊。",
    whyWrong: { A: "守則訂明的最少距離為四分一米。", B: "即使扣上安全帶，身體過近儀錶板在碰撞時仍可能先撞傷。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "你的乘客", page: 41, quote: "前座乘客的身體，應與儀錶板最少保持四分一米的距離。一旦發生意外或緊急剎車，此距離可讓安全帶有足夠時間回索並將乘客固定於座位。" },
    memoryHook: "前座乘客離錶板最少 1/4 米，俾安全帶有空間拉實。"
  },
  {
    id: "q127",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "以下哪類車輛的「所有乘客」（如座位已裝有安全帶）在法例上均必須佩戴安全帶？",
    options: {
      A: "私家車、的士及公共小巴的前後座乘客（如裝有安全帶）",
      B: "私家車及的士乘客，但公共小巴乘客獲豁免",
      C: "只限私家車前座乘客，後座乘客屬自願"
    },
    answer: "A",
    whyRight: "根據第 43 頁法定要求表，私家車、的士、公共小巴的駕駛人、前座及後座乘客（如裝有安全帶）均須佩戴。",
    whyWrong: { B: "公共小巴如已裝安全帶，乘客必須佩戴。", C: "私家車後座乘客同樣受法定要求約束，司機須確保所有乘客佩戴。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "汽車座位安全帶", page: 43, quote: "私家車、的士、公共小巴 — 駕駛人、前座乘客、後座乘客：如已裝有安全帶，必須佩戴。" },
    memoryHook: "私家車、的士、公共小巴：前後座有帶就全部要扣！"
  },
  {
    id: "q128",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駕駛私家車時，誰有法律責任確保車上所有乘客佩戴安全帶？若是私家小巴或貨車呢？",
    options: {
      A: "私家車司機只需確保 12 歲以下兒童佩戴",
      B: "所有車種的司機一律只負責自己佩戴，乘客違例完全與司機無關",
      C: "私家車司機須確保所有乘客佩戴；私家小巴／貨車司機則須確保前座未滿 15 歲乘客佩戴"
    },
    answer: "C",
    whyRight: "按 2020 年版守則第 43 頁，私家車司機須確保所有乘客佩戴安全帶；私家小巴及貨車司機則有責任確保前座未滿 15 歲乘客佩戴。【2026 年 1 月 25 日新例提示】修例生效後，貨車司機亦須負法律責任確保後座未滿 15 歲乘客在已裝有安全帶的座位上佩戴安全帶。",
    whyWrong: { A: "私家車司機須確保「所有」乘客（不限年齡）佩戴。", B: "私家車司機對全車乘客佩戴安全帶負有法律責任；私家小巴／貨車司機亦須負責未滿 15 歲乘客（2026 年 1 月 25 日起貨車已擴展至後座已裝安全帶座位）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "汽車座位安全帶", page: 43, quote: "如你是私家車駕駛人，你須確保所有乘客佩戴安全帶（如裝有）。如你是私家小巴或貨車駕駛人，則有責任確保前座未滿15歲的乘客佩戴安全帶。" },
    memoryHook: "2020 守則考點：私家車司機包全車；貨車／私家小巴司機負責前座 <15 歲。（註：2026.1.25 起貨車司機亦須負責後座已裝安全帶之 <15 歲乘客）"
  },
  {
    id: "q129",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「藥駕和毒駕」與「隨機呼氣測試」，下列哪項說法正確？",
    options: {
      A: "只要感覺清醒，血液含微量指定毒品（如大麻或氯胺酮）不屬違法",
      B: "警員只可在發生嚴重傷亡交通意外後才可要求司機吹波仔",
      C: "血液或尿液含任何濃度的 6 種指明毒品均屬違法；警員亦可在路障要求隨機呼氣測試，無合理辯解拒絕即屬違法"
    },
    answer: "C",
    whyRight: "6 種指明毒品（海洛英、可卡因、K仔、冰、大麻、搖頭丸）屬零容忍；警方有權隨機呼氣測試，拒絕即違法。",
    whyWrong: { A: "指明毒品是「任何濃度」均屬刑事罪行，無寬限上限。", B: "警方有權於路障截查中隨機指令任何駕駛人接受呼氣測試。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "酒後駕駛／藥駕和毒駕", page: 41, quote: "駕駛汽車時，如你的血液或尿液含有任何濃度的指明毒品……均屬違法……如無合理辯解而拒絕或未能提供呼氣、血液或尿液樣本以供檢驗／分析，亦屬違法。" },
    memoryHook: "6 種指明毒品零容忍；隨機吹波仔拒絕即犯法。"
  },
  {
    id: "q130",
    category: "driver_safety",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "車輛進行安全檢查及加油時，下列哪項規則正確？",
    options: {
      A: "前輪用交叉紋、後輪用徑向紋輪胎可提升雨天抓地力",
      B: "行車證須貼在擋風玻璃左方；絕不可混合使用交叉紋及徑向紋輪胎；油箱蓋打開時絕不可開動引擎",
      C: "行車證可貼於擋風玻璃任何位置；油箱蓋打開時只要入 P 波可繼續着車開冷氣"
    },
    answer: "B",
    whyRight: "行車證貼擋風玻璃左方、絕不可混用交叉紋與徑向紋輪胎、油箱蓋打開時絕不可開動或讓引擎運轉。",
    whyWrong: { A: "守則明文禁止同時混合使用交叉紋及徑向紋輪胎。", C: "行車證須貼左方，且油箱蓋打開時嚴禁開動或運轉引擎。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "安全檢查", page: 42, quote: "在擋風玻璃左方，貼上有效的行車證……絕不可同時混合使用交叉紋及徑向紋輪胎……油箱蓋打開時，絕對不可開動引擎，或讓引擎運轉。" },
    memoryHook: "行車證貼左邊；禁混交叉／徑向胎；開油箱蓋必熄匙。"
  },
  {
    id: "q131",
    category: "driver_safety",
    type: "text",
    trapTag: "2025新例",
    prompt: "根據 2025 年 11 月 1 日起生效的私家車兒童束縛設備新法例，哪類兒童不論坐前排或後排均必須使用認可兒童束縛設備？由誰負法律責任？",
    options: {
      A: "8 歲以下且身高未達 1.35 米的兒童（前後座皆須使用）；法律責任在於司機",
      B: "只限未滿 3 歲且坐前座的幼童，後座獲豁免；法律責任在於家長",
      C: "12 歲以下一律須使用，並同樣強制適用於的士及專營巴士"
    },
    answer: "A",
    whyRight: "2025 年 11 月 1 日生效新例：8 歲以下兒童（除非身高已達 1.35 米）乘私家車前或後座一律須用認可兒童束縛設備，違例由司機負責（不適用於的士及巴士）。",
    whyWrong: { B: "「未滿 3 歲坐前座」為 2025 年 11 月修例前舊門檻；新例收緊至 8 歲以下且身高未達 1.35 米前後座皆強制，且由司機負責。", C: "法例強制門檻為 8 歲以下且身高未達 1.35 米（兩者兼備），且此規定不適用於的士、小巴及巴士等公共交通工具。" },
    source: { origin: "2025–2026 最新生效法例（運輸署）", chapter: "第五章（2025年11月修訂）", section: "確保兒童乘車安全", page: 45, quote: "自2025年11月1日起，8歲以下兒童除非身高已達1.35米，否則不論坐在私家車前排或後排座位均須使用認可兒童束縛設備（《2024年道路交通（安全裝備）（修訂）規例》；補充現行守則第45頁）。" },
    memoryHook: "2025 新例：8 歲以下＋未夠 1.35 米，私家車前後座必用兒童椅，罰司機！"
  },
  {
    id: "q132",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於安全帶的保養與佩戴，下列哪項做法屬於「違法」？",
    options: {
      A: "將安全帶橫帶橫過上大腿而非腹部",
      B: "身材較細小的人使用高墊以防安全帶箍着頸部",
      C: "使用夾子夾住安全帶放鬆鬆緊度，或繼續使用殘舊損壞的安全帶"
    },
    answer: "C",
    whyRight: "在安全帶使用夾子會大幅減低保護效能並屬違法；使用殘舊、損壞或有毛病的安全帶亦屬違法。",
    whyWrong: { A: "橫帶跨過上大腿固定臀部、斜帶經肩膊中間至鎖骨正是正確戴法。", B: "使用高墊解決箍頸問題是守則建議的正確做法。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "佩戴安全帶的正確方法／保養", page: 44, quote: "切勿使用夾子於安全帶上，因為這會令安全帶的功能大大降低，而且也屬違法……殘舊、損壞或有毛病的安全帶……也屬違法。" },
    memoryHook: "安全帶禁用夾、壞帶必即換；帶扣垂於身旁、橫帶貼上大腿。"
  },
  {
    id: "q133",
    category: "driving_skills",
    type: "text",
    trapTag: "2026新例",
    prompt: "根據 2026 年 1 月 25 日起生效的新法例，私家車行駛時司機前方最多可放置多少部流動電訊裝置（手機／平板）？屏幕對角長度上限為多少？",
    options: {
      A: "不可多於 3 部，每部屏幕對角長度不可大於 25 厘米",
      B: "不可多於 2 部，每部屏幕對角長度不可大於 19 厘米，且不得阻礙視線或後視鏡",
      C: "不限數量與尺寸，只要行車時沒有手持或夾於頭肩之間即可"
    },
    answer: "B",
    whyRight: "2026 年 1 月 25 日生效新例規管「電話陣」：司機前方最多放 2 部流動電訊裝置，每部對角長度 ≤19 厘米且不阻視線；行車時同樣嚴禁手持或夾於頭肩之間。",
    whyWrong: { A: "法定上限為「最多 2 部」及對角長度「不超過 19 厘米」，非 3 部或 25 厘米。", C: "除嚴禁手持或夾於頭肩之間外，2026 新例明確限制司機前方裝置數量（≤2 部）與屏幕對角尺寸（≤19 厘米）。" },
    source: { origin: "2025–2026 最新生效法例（運輸署）", chapter: "第五章（2026年1月修訂）", section: "駕駛時使用流動電訊裝置", page: 50, quote: "自2026年1月25日起，駕駛時司機前方不可放置多於兩部流動電訊裝置，每部屏幕對角長度不可大於19厘米，亦不得阻礙司機視線及後視鏡（補充現行守則第50頁）。" },
    memoryHook: "2026 新例打擊電話陣：最多 2 部＋對角 ≤19 厘米＋唔阻視線＋嚴禁手持。"
  },
  {
    id: "q134",
    category: "driving_skills",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "判斷「兩秒距程」規則時，應該怎樣測試自己是否跟車太貼？",
    options: {
      A: "與前車保持剛好一輛私家車的車身距離即可",
      B: "只須看見前車兩個車尾燈即代表距離足夠",
      C: "見前車經過路旁標記時，正常語速說「一千零一、一千零二」，若未說完已到達該標記即屬太近"
    },
    answer: "C",
    whyRight: "選定固定標記，前車經過後默數「一千零一、一千零二」（約 2 秒），未數完已到達即代表跟車太貼。",
    whyWrong: { A: "一輛車長僅約 4–5 米，即使時速 40 公里亦遠少於所需停車距離。", B: "看見尾燈與實際停車距離無關，高速時遠遠不足。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "兩秒距程規則", page: 55, quote: "以正常的語速說：「一千零一、一千零二」，這應該大約需時兩秒。如果……在說完這句話之前，本身的車輛已抵達該交通標誌……車距便太近。" },
    memoryHook: "「一千零一、一千零二」未講完就過位＝跟太貼；天雨濕地變 4 秒！"
  },
  {
    id: "q135",
    category: "driving_skills",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "正在超越前車時，如果前車突然加速令你難以完成超車，正確做法是？",
    options: {
      A: "立即煞停在對面行車線中央",
      B: "進一步大幅加速並長鳴車號迫前車讓路",
      C: "必要時減速並看清後視鏡確保原線無車趕上後，折返原來行車線跟回前車"
    },
    answer: "C",
    whyRight: "遇前車加速切勿鬥快，應視情況減速並查看後視鏡確定原線安全，折返原線跟回前車。",
    whyWrong: { A: "在對面線煞停會造成極大迎頭相撞危險。", B: "與前車鬥快極易釀成迎頭或側撞意外。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "超車（俗稱「扒頭」）", page: 56, quote: "在超越前車時，如前車加速，必要時應把車輛減速、並折返原來的行車線，跟回前車而行；但仍先要從後視鏡看清楚。" },
    memoryHook: "扒頭見前車加速＝唔鬥快，減速望鏡返原線；被人扒頭就切勿加速。"
  },
  {
    id: "q136",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "駛入迴旋處時，除非道路標記另有指示，必須遵守哪兩項基本原則？",
    options: {
      A: "只要打了方向燈便可直接匯入，迴旋處內車輛須讓你",
      B: "轉右駛入，並由先到達路口的車輛先行",
      C: "轉左駛入，並讓路給已在迴旋處內從右方駛來的車輛"
    },
    answer: "C",
    whyRight: "香港迴旋處一律靠左駛入（順時針行駛），且未進入的車輛必須讓路給迴旋處內從右方駛來的車輛。",
    whyWrong: { A: "打燈只表意向，絕無優先權，必須讓右車。", B: "香港靠左行駛，駛入迴旋處必轉左，並無「先到先行」。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "迴旋處", page: 80, quote: "駛入迴旋處時，必須轉左……除非有道路標記另作指示，否則應讓路給迴旋處內從右方駛來的車輛。" },
    memoryHook: "入迴旋處必轉左、必讓右；見出口塞住唔好入。"
  },
  {
    id: "q137",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在傳統式或螺旋形迴旋處準備「直駛」（第二個出口），入線與打燈的正確做法是？",
    options: {
      A: "全程打着右轉燈駛入，駛到出口前才關燈",
      B: "必須由最左線駛入並全程打着左轉燈",
      C: "兩線迴旋處可由左線或右線駛入（三線由左線或中線），入處時不發信號，經過選定出口前一個出口後打左燈離開"
    },
    answer: "C",
    whyRight: "直駛進入迴旋處不要發信號；經過目標出口的前一個出口後，打左轉燈離開。",
    whyWrong: { A: "打右燈代表轉右或掉頭，會誤導其他司機。", B: "全程打左燈是「轉左」（第一個出口）的做法。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "迴旋處 — 直駛", page: 81, quote: "可從左線或右線駛入（若在三線迴旋處，可從左線或中線駛入）。不要發出信號……經過你選定的出口之前一個出口後，應發出左轉信號，然後離開。" },
    memoryHook: "迴旋處直駛：入處唔打燈，過咗前一個出口先打左燈走！"
  },
  {
    id: "q138",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在迴旋處內若不小心錯過了預定駛出的出口，正確做法是？",
    options: {
      A: "繼續圍繞迴旋處行駛，直至再次駛近該出口才安全離開",
      B: "立即亮危險警告燈倒車退回該出口",
      C: "立即煞停並強行切過外線轉出"
    },
    answer: "A",
    whyRight: "錯過出口切勿切線或倒車，應沿迴旋處多繞一圈再安全駛離。",
    whyWrong: { B: "在迴旋處倒車極度危險且違法。", C: "臨時煞停硬切極易被外線車輛撞上。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "迴旋處", page: 80, quote: "若錯過了出口，應繼續圍繞迴旋處行駛，直至再次駛近該出口，然後離開。" },
    memoryHook: "錯過迴旋處出口＝兜多一圈，絕不急切或倒車。"
  },
  {
    id: "q139",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「螺旋形迴旋處」（新式迴旋處）駛出時，仍須特別防範甚麼危險？",
    options: {
      A: "因為有螺旋引導標記，保證不會有任何車輛與你交匯，無須望鏡",
      B: "可能有車輛從左後方越過你的行車路線（即未依標記轉出而繼續兜圈的車輛）",
      C: "螺旋形迴旋處禁止車輛於內線行駛"
    },
    answer: "B",
    whyRight: "即使螺旋形迴旋處有路面標記引導駛出，仍須警覺有外線車輛從左後方越過你的路線。",
    whyWrong: { A: "任何時候出迴旋處都必須望鏡及盲點防外線車。", C: "內線照常供轉右／掉頭及指定出口車輛使用。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "迴旋處", page: 80, quote: "駛出迴旋處時，要注意可能有車輛從左後方越過你的路線，即使在螺旋形迴旋處內的道路標記有助你駛出，也要留神。" },
    memoryHook: "螺旋處出彎都要望左鏡盲點，防左後方外線車衝過。"
  },
  {
    id: "q140",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在路口準備「轉右」時，如果迎面而來的車輛亦同時轉右，雙方應如何通過？",
    options: {
      A: "一律繞過迎面車輛的車尾（右邊對右邊）轉彎",
      B: "響號決定哪一方先完成右轉",
      C: "從迎面車輛的左前方駛過（本身車輛左邊對着迎面車輛左邊），除非標誌標記另有指示或實際上不可能"
    },
    answer: "C",
    whyRight: "對頭雙雙右轉時，原則上應「左邊對左邊」（從對方左前方駛過），除非標記另有指示或路面不可能。",
    whyWrong: { A: "「右邊對右邊」容易令兩條車龍互相鎖死，非守則預設方法。", B: "不可用響號爭路，須依規則並小心後方被遮擋的迎面直行車。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "路口 — 轉右", page: 75, quote: "如果迎面而來的車輛也同時轉右，應從該輛車的左前方駛過（本身車輛的左邊對着迎面車輛的左邊）。" },
    memoryHook: "雙雙右轉＝左對左過；留意對面右轉車後面可能衝出直行車。"
  },
  {
    id: "q141",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有交通燈的路口，如果交通燈「全部失靈」，駕駛人應該怎樣處理？",
    options: {
      A: "沿用上次記憶中的燈號順序繼續以正常車速駛過",
      B: "立即掉頭改行其他街道",
      C: "減低車速甚或在有需要時停車，當作非交通燈控制路口格外小心慢慢駛過"
    },
    answer: "C",
    whyRight: "交通燈失靈時，應減速或停車，把該路口當作無燈號控制路口格外小心慢駛通過。",
    whyWrong: { A: "正常車速直過極易與橫向車輛相撞。", B: "毋須掉頭，依無燈路口小心禮讓通過即可。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "有交通燈的路口", page: 78, quote: "如果交通燈失靈，你應該減低車速甚或在有需要時停車，把該路口當作非交通燈控制路口處理，格外小心，慢慢駛過路口。" },
    memoryHook: "交通燈失靈＝減速或停，當無燈路口格外小心慢過。"
  },
  {
    id: "q142",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在交通燈路口，當主要交通燈（停車線前）的綠燈失靈，但對面的「輔助交通燈」正常運作時，應怎樣做？",
    options: {
      A: "須遵守輔助交通燈的指示，猶如遵守主要交通燈一樣",
      B: "可不理會輔助交通燈，直接當作無燈路口通行",
      C: "必須停車直至警方到場指揮"
    },
    answer: "A",
    whyRight: "輔助交通燈與主要交通燈燈號相同，主燈失靈時須完全遵守輔助交通燈的指示。",
    whyWrong: { B: "輔助交通燈具有同等法律約束力。", C: "只要輔助燈正常運作，依其燈號行駛即可。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "交通燈", page: 106, quote: "如主要交通燈失靈，例如綠色燈號失效，便須遵守輔助交通燈的指示，猶如遵守主要交通燈的指示一樣。" },
    memoryHook: "主燈壞咗睇輔助燈，效力完全一樣。"
  },
  {
    id: "q143",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當路口交通燈由「綠燈」剛轉為「單一黃燈」時，正確做法是？",
    options: {
      A: "黃燈代表可以安全繼續直行無須減速",
      B: "立即加速衝過停車線以免滯留路口",
      C: "必須在停車線前停車，除非車輛十分接近路口致突然停車可能引致意外"
    },
    answer: "C",
    whyRight: "單一黃燈代表必須停車，唯一例外是距離太近以致急剎會造成意外才可小心駛過。",
    whyWrong: { A: "黃燈的意思是停車而非繼續行駛。", B: "見黃燈加速衝燈既危險又容易變成衝紅燈。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "指示駕駛人和騎單車者的交通燈", page: 107, quote: "黃色燈號亮着時，必須停車，除非車輛十分接近路口或行人過路處，以致突然停車可能會引致意外，否則應該停車。" },
    memoryHook: "單黃燈＝必須停（除非太近急停會撞車）；切勿加速衝燈。"
  },
  {
    id: "q144",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有「三條行車線」的分隔車路（如快速公路）上，私家車正常行駛應使用哪條行車線？",
    options: {
      A: "長期留在中線行駛最安全，避免左線入車",
      B: "靠最左線行駛；左線有慢車才用中線，超越後駛回左線；最右線只供超車或往右出口",
      C: "時速達 70 公里便可長期行駛最右線"
    },
    answer: "B",
    whyRight: "三線分隔車路仍須遵守「靠左行駛」：超越左線慢車才用中線，最右線只供超車或右出，超車後應盡快回左線。",
    whyWrong: { A: "守則明言「如非必要，不要留在中線行駛」。", C: "無論車速多高，都不應不必要地逗留在最右快線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "分隔車路", page: 68, quote: "在三線行車道上，仍須遵守「靠左行駛」的規則。當左線有行駛較緩慢的車輛時，你方可使用中線，但超越這些車輛後，必須駛回左線……右線只供超車時使用。" },
    memoryHook: "三線都係「靠最左」：中線過慢車、右線只超車，過完返左線。"
  },
  {
    id: "q145",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在「分隔車路」或「快速公路」上，如果不慎錯過了預定出口，應該怎樣做？",
    options: {
      A: "繼續前行直至下一個路口，絕不可倒車、掉頭或橫越中央分隔帶",
      B: "停車等候無車時越過中央分隔帶掉頭",
      C: "立即亮起死火燈沿路肩緩慢倒車返出口"
    },
    answer: "A",
    whyRight: "分隔車路及快速公路嚴禁倒車、掉頭或橫越中央分隔帶，錯過出口必須前行至下一個路口。",
    whyWrong: { B: "橫越中央分隔帶或掉頭屬嚴重違法且極度致命。", C: "路肩只供緊急事故使用，嚴禁在快速公路倒車。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "分隔車路", page: 68, quote: "你不得在分隔車路上倒車或轉向，或橫越道路中央分隔帶，或以相反方向行車。你即使錯過要駛出的路口或駛入錯誤的路線，仍須繼續前行直至往下一個路口。" },
    memoryHook: "分隔車路／快速公路：錯過出口只可直去下一個路口，禁倒車禁掉頭。"
  },
  {
    id: "q146",
    category: "lanes_highways",
    type: "text",
    trapTag: "數字",
    prompt: "在快速公路或車速較高的分隔車路，駕駛人通常在距離出口「至少多少米」前會見到前面路口的預告方向資訊？",
    options: {
      A: "至少 1,000 米前",
      B: "至少 100 米前",
      C: "至少 500 米前"
    },
    answer: "C",
    whyRight: "通常在路口至少 500 米前已顯示出口方向資訊，隨後配合 300／200／100 米倒數標誌讓司機早入最左線。",
    whyWrong: { A: "守則訂明一般為至少 500 米前。", B: "100 米是最後一個單斜線倒數標誌的距離。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章／第八章", section: "分隔車路的路口", page: 82, quote: "你通常在路口至少500米前，便可見到前面路口的資訊，讓你有時間駛入最左行車線。" },
    memoryHook: "高速出口預告牌≥500 米前現身，跟住 300→200→100 米倒數。"
  },
  {
    id: "q147",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "從連接路經「加速行車線」駛入快速公路或主幹路時，正確做法是？",
    options: {
      A: "留意大路車輛並調節車速，有空檔時匯入最接近的行車線，適應周圍車速後有需要才換線",
      B: "在加速線盡頭先完全停定，再慢速切入中線",
      C: "保持比大路車輛慢一半的車速直接切出最右線"
    },
    answer: "A",
    whyRight: "應在加速線調節車速配合大路車流，安全匯入最近的行車線，待適應速度後有需要才再換線。",
    whyWrong: { B: "突然停定會令隨後匯入車輛追尾，亦更難配合高速車流。", C: "車速過慢並直切右線極容易引發高速追撞。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "駛入主幹路／快速公路", page: 83, quote: "從連接路通往加速行車線時，你應留意大路上的車輛，調節車速，以便有適當空檔時，匯入最接近的行車線。匯入後，繼續沿線行駛，直至適應四周車輛的速度後，方可在有需要時換線。" },
    memoryHook: "加速線＝睇大路、夾車速、入最近線、適應先轉線。"
  },
  {
    id: "q148",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有「三條或以上開放行車線」的快速公路上，除前往右邊出口外，下列哪些車輛禁止使用最右線？",
    options: {
      A: "所有輕型貨車（不論是否 P 牌）一律禁用最右線",
      B: "只禁止重型貨車，巴士與 P 牌私家車均可使用最右線超車",
      C: "中型／重型貨車、巴士、救援車輛、拖車組合，以及 P 牌私家車／輕型貨車／電單車"
    },
    answer: "C",
    whyRight: "三線或以上快速公路禁行最右線（右出除外）：中／重型貨車、巴士、救援車、拖車、及各類 P 牌車。",
    whyWrong: { A: "持正式牌照的輕型貨車可使用最右線超車，受限的是持 P 牌者。", B: "巴士及 P 牌私家車均明確受此最右線禁令約束。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第六章", section: "快速公路／各種限制", page: 71, quote: "快速公路的行車道如有三條或以上開放的行車線，中型貨車、重型貨車及巴士除駛往右面出口外，不可使用快速公路最右線。此外，如你持有相對應的暫准駕駛執照……上述限制也適用於你。" },
    memoryHook: "三線快路最右線（右出除外）：中重貨、巴士、拖車、救援車、全 P 牌禁入！"
  },
  {
    id: "q149",
    category: "lanes_highways",
    type: "text",
    trapTag: "現行新例",
    prompt: "根據現行《道路使用者守則》，除了引擎低於 125cc 的電油車外，哪類「純電動車」亦不准使用快速公路（除非獲運輸署署長書面批准）？",
    options: {
      A: "所有純電動私家車一律不准上快速公路",
      B: "額定功率低於 7 千瓦（7 kW）的電動私家車，或低於 3 千瓦（3 kW）的電動電單車／機動三輪車",
      C: "額定功率低於 50 千瓦的電動私家車"
    },
    answer: "B",
    whyRight: "現行守則明訂：純電動私家車額定功率 <7 kW、電動電單車／三輪車 <3 kW 不准駛入快速公路。",
    whyWrong: { A: "一般市面電動私家車功率遠高於 7 kW，完全可以使用快速公路。", C: "法定門檻是 7 kW（私家車）及 3 kW（電單車／三輪車）。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第五章", section: "快速公路及主幹路", page: 72, quote: "額定功率低於7千瓦的電動私家車，以及額定功率低於3千瓦的電單車或機動三輪車，均不准使用快速公路。" },
    memoryHook: "快速公路門檻：油車 ≥125cc；電動私家車 ≥7kW、電動電單車 ≥3kW。"
  },
  {
    id: "q150",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「雙白線」路段（即使靠近你一邊是虛線），關於停車與跨越的規定，哪項正確？",
    options: {
      A: "為避開突然衝出的障礙物以防意外，亦絕對不可跨越雙白線",
      B: "只要靠近你一邊是虛線，即可隨時在該處泊車過夜",
      C: "雙白線旁不應停車，但若附近無方便停車處，可暫停片刻上落客貨；另外為避免意外或遵從警員指示亦可越過雙白線"
    },
    answer: "C",
    whyRight: "雙白線旁不應停車（無方便停車處時僅可暫停片刻上落客貨）；避意外或依警員／交通督導員指示可越過。",
    whyWrong: { A: "為避免發生意外或遵從警員指示，屬於法例容許跨越雙白線的例外。", B: "雙白線路段不應泊車或停留。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "雙白線", page: 63, quote: "不應停車 — 縱然靠近你車旁的一行白線是虛線，也不應停車。不過，如果附近沒有方便的路旁停車處，你可暫停片刻，以進行上落貨物或乘客。為避免發生意外，或在遵循警務人員……指示下，你亦可越過雙白線。" },
    memoryHook: "雙白線唔好停（無位只可極短暫上落）；救命避意外／阿 Sir 叫行可越過。"
  },
  {
    id: "q151",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當兩條「雙白線」用以分隔相反方向的車流，而你打算「右轉入毗連的建築物或停車場」時，可否越過雙白線？",
    options: {
      A: "可以越過雙白線向右轉入或轉出毗連道路、處所或地方（唯獨分隔同一方向行車線的雙白線除外）",
      B: "只有當靠近自己一邊為虛線時才可右轉進入",
      C: "絕對不可以，任何雙白線都禁止右轉跨越"
    },
    answer: "A",
    whyRight: "分隔「相反方向」車流的雙白線，容許越過右轉出入毗連道路或處所；分隔「同一方向」的雙白線則絕對不可。",
    whyWrong: { B: "此例外同樣適用於分隔相反方向的雙白實線。", C: "相反方向雙白線明文容許右轉出入毗連處所。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "雙白線", page: 63, quote: "你可越過雙白線向右轉入／轉出任何與該條車路毗連的道路、處所或地方，但用來分隔同一方向車輛的雙白線除外。" },
    memoryHook: "雙白線右轉入停車場：相反方向＝得；同一方向＝絕對唔得！"
  },
  {
    id: "q152",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "當「斑馬線」中央設有安全島時，駕駛人應如何看待這條斑馬線？",
    options: {
      A: "只要行人剛踏上對面馬路的斑馬線，你這邊便必須即時急停",
      B: "設有安全島的斑馬線不須讓路給行人",
      C: "每邊的行人過路處應視為獨立的過路處，但仍須留意安全島上等候的行人"
    },
    answer: "C",
    whyRight: "中央設有安全島的斑馬線（及綠色人像過路處），兩邊視為獨立過路處，但仍要提防安全島行人踏出。",
    whyWrong: { A: "對面車道屬另一獨立過路處，但見安全島有人準備踏出這邊即要減速讓路。", B: "只要有人踏足你這邊的斑馬線，就必須停車讓路。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "斑馬線", page: 84, quote: "如「斑馬線」中央設有安全島，每邊的行人過路處，應視為獨立的過路處。" },
    memoryHook: "有安全島嘅斑馬線／綠人過路處＝左右兩邊當兩條獨立過路處。"
  },
  {
    id: "q153",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駛近「斑馬線」準備停下讓路給行人時，應否揮手或閃燈示意行人盡快橫過馬路？",
    options: {
      A: "應該不斷揮手示意，以示禮貌",
      B: "應該響號一聲催促行人快行",
      C: "不要示意行人橫過馬路，因為可能有其他車輛從旁駛至構成危險"
    },
    answer: "C",
    whyRight: "切勿揮手或閃燈示意行人過路，因為鄰線可能有其他車輛未停定，易令行人放鬆警覺而遭撞倒。",
    whyWrong: { A: "司機無法保證其他行車線車輛同時停下，示意過路反而危險。", B: "響號只用於危險警告，絕不可催促行人。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "斑馬線", page: 84, quote: "不要示意行人橫過馬路，因為可能有其他車輛駛至。" },
    memoryHook: "停低讓行人但「唔好揮手叫人過」，防隔籬線有車衝過！"
  },
  {
    id: "q154",
    category: "lanes_highways",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在「綠色人像」過路處等候時，綠燈剛亮起但仍有長者正在過路處上緩慢橫過，駕駛人應怎樣做？",
    options: {
      A: "把車慢慢向前推近，提醒行人加快腳步",
      B: "只要前車開動便可跟着駛入過路處",
      C: "讓路給過路處上的行人，且不要「踏空油」或讓車輛慢慢向前滑動令行人不安"
    },
    answer: "C",
    whyRight: "即使亮綠燈，必須待過路處上所有行人安全橫過方可前駛，切勿踏空油或溜前嚇唬行人。",
    whyWrong: { A: "慢慢溜前或踏空油會令長者／兒童驚慌跌倒。", B: "綠燈只代表「過路處無人且前路無阻」時方可駛前。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "綠色人像過路處", page: 85, quote: "讓路給過路處上的行人……不要作出使行人不安的行動，例如「踏空油」，或使車輛慢慢向前移動。" },
    memoryHook: "綠燈都要讓晒過緊路嘅行人；切忌踏空油或慢慢溜前施壓。"
  },
  {
    id: "q155",
    category: "weather_parking",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在夜間「有街燈」的道路上駕駛，以及「緊隨前車」駕駛時，應使用甚麼車燈？",
    options: {
      A: "緊隨前車時應開高燈幫助前車照亮前路",
      B: "有街燈的道路可關掉所有車頭燈，只開細燈",
      C: "夜間即使有街燈仍須亮着大燈，且有街燈、有迎面車或緊隨前車時均必須使用低燈"
    },
    answer: "C",
    whyRight: "夜間（包括黃昏黎明）必須開大燈；在有街燈道路、迎面有車或跟隨前車時，必須轉用低燈以免令他人目眩。",
    whyWrong: { A: "開高燈跟車會經前車後視鏡令前車司機目眩，極危險。", B: "夜間即使有街燈仍須亮大燈（低燈），讓其他道路使用者容易看見你。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "夜間駕駛", page: 86, quote: "在夜間駕駛時，即使有街燈，仍須亮着大燈……在有街燈的道路上駕駛，或迎面有車輛駛來時，必須使用低燈……緊隨前車駕駛時，也應使用低燈。" },
    memoryHook: "夜晚必開燈；有街燈、對頭車、跟前車＝一律用低燈！"
  },
  {
    id: "q156",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "日間遇上「大雨、大霧、薄霧或煙霧」令視野模糊不清時，應該怎樣使用車燈？",
    options: {
      A: "亮着車頭大燈（大霧時如裝有霧燈亦應亮着）及車尾燈，但在能見度良好時應避免使用霧燈",
      B: "全程亮着危險警告燈行駛代替大燈",
      C: "開高燈穿透濃霧看得更遠"
    },
    answer: "A",
    whyRight: "日間能見度低須開大燈與尾燈，大霧可用霧燈，但天氣清晰時須關霧燈以免刺眼。",
    whyWrong: { B: "危險警告燈非大霧行車燈，且會令他人看不到你打轉向燈。", C: "大霧開高燈會被霧氣反射，反而令視野更白茫茫。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "雨、霧、風", page: 87, quote: "在日間，遇上大雨、煙、大霧及薄霧或任何類似的情況，以致視野模糊不清時，應亮着車頭大燈……如果車輛裝有霧燈，大霧時便應亮着……但在其他情況下避免使用霧燈。" },
    memoryHook: "霧雨視野差開大燈＋尾燈；霧燈只限大霧開，清天必關。"
  },
  {
    id: "q157",
    category: "weather_parking",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "夜間駕駛時，車速與車頭大燈照明範圍之間應該保持甚麼關係？",
    options: {
      A: "減低車速，使「剎車距離」保持在大燈的照明範圍內",
      B: "盡量貼近前車跟住前車尾燈行駛便可不用減速",
      C: "車速可照日間最高限速行駛，因大燈照明會隨車速擴大"
    },
    answer: "A",
    whyRight: "大燈照明範圍不會隨車速擴大，但剎車距離會增加，故夜間須減速確保能在照明範圍內煞停。",
    whyWrong: { B: "過近前車會令前車司機目眩，且尾燈並不可靠。", C: "大燈照明距離是固定的，絕不會隨車速自動擴大。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "夜間駕駛", page: 86, quote: "剎車距離會隨車速增加，但大燈的照明範圍則不會擴大。因此，在夜間駕駛時，應減低車速，使剎車距離保持在大燈的照明範圍內。" },
    memoryHook: "夜晚剎車距離不可長過大燈照射範圍，見幾遠先開幾快。"
  },
  {
    id: "q158",
    category: "weather_parking",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "自動波私家車在「有路邊石的下坡斜路」靠左泊車時，前輪扭向、波檔及手掣應該怎樣設定？",
    options: {
      A: "前輪保持筆直、入 N 波、拉緊停泊制動器",
      B: "前輪扭向左邊（靠向路邊石）、入 P 波、拉緊停泊制動器",
      C: "前輪扭向右邊、入 P 波、拉緊停泊制動器"
    },
    answer: "B",
    whyRight: "有路邊石的下坡斜路靠左泊車，前輪扭向左邊，即使溜前也會被路邊石頂住，自動波入 P 波並拉手掣。",
    whyWrong: { A: "自動波泊車必入 P 波，不可入 N 波亦不可令車輪直溜下斜。", C: "扭向右邊只適用於「有路邊石的上坡斜路」。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在下坡斜路泊車 — 應盡可能靠近左邊路旁路邊石泊車，並把軚盤扭向左邊……停車後入後波或泊車波（自動波），並啟動好停泊制動器。" },
    memoryHook: "斜路泊車四情況：唯獨「上斜有石」扭右，其餘三種全扭左＋P 波！"
  },
  {
    id: "q159",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有街燈的道路上泊車及使用公眾泊車處時，下列哪項屬於違法或違規？",
    options: {
      A: "把私家車停泊在泊車位之間髹有「黃色斜線」的位置，或在同一泊車處停泊超過 24 小時",
      B: "停泊在指定泊車位內且車身不超出白線界線",
      C: "使用停車收費錶泊車後，在收費時段內盡快繳費"
    },
    answer: "A",
    whyRight: "禁止在泊車位之間的黃色斜線範圍泊車，且不得在同一泊車處連續停泊超過 24 小時。",
    whyWrong: { B: "正確做法。", C: "收費時段內泊車必須盡快繳付收費錶費用。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "准許泊車的地點", page: 94, quote: "在泊車處內，切勿在泊車位之間髹上黃色斜線標記的地方泊車……不可在同一泊車處停泊車輛超過24小時。" },
    memoryHook: "街燈距≤200m 只可泊指定位；黃斜線禁泊；同一泊車處上限 24 小時。"
  },
  {
    id: "q160",
    category: "weather_parking",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "以下哪個地點在正常情況下「不准停車」，更切勿上落客貨？",
    options: {
      A: "沒有黃線、沒有標誌且寬闊不阻礙交通的街邊",
      B: "設有「不准泊車」（單紅斜線）標誌的私家路旁，而停車不構成阻礙",
      C: "快速公路、隧道區／管制區、巴士站／小巴站／的士站、斑馬線及黃色方格內"
    },
    answer: "C",
    whyRight: "快速公路、隧道區／管制區、公共車輛站、斑馬線／綠人過路處、單車徑及黃格內一律禁止停車上落客貨。",
    whyWrong: { A: "不阻礙亦無危險的一般路邊容許短暫上落客貨。", B: "「不准泊車」容許不妨礙安全下短暫上落客貨（不可超過所需時間）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "不准停車的地點", page: 90, quote: "下列地點，不准停車，更切勿上落客貨：在快速公路上；在「不准停車」限制區的生效時間內……巴士站、公共小型巴士站或的士站……隧道區或管制區內；黃色方格內。" },
    memoryHook: "禁停車地點連落客都唔得：快路、隧道、車站、過路處、黃格、單車徑。"
  },
  {
    id: "q161",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「單管雙程行車」的隧道內（常見於凌晨維修時段），車速限制一般會降低至多少？有何行車限制？",
    options: {
      A: "一般降至每小時 50 公里，且嚴禁在已變作反方向行車的最右線超車或行駛",
      B: "維持原本每小時 70 或 80 公里，並可借對面線超車",
      C: "降至每小時 25 公里，所有車輛須亮起危險警告燈"
    },
    answer: "A",
    whyRight: "隧道實施單管雙程行車時，管道限速一般降至 50 km/h，且最右線已屬對頭車道，嚴禁駛入或超車。",
    whyWrong: { B: "限速會下調至 50 km/h 且管道內嚴禁越雙白線超車。", C: "25 km/h 是隧道正常行車的最低速度下限，且行車不應長開死火燈。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "隧道實施單管雙程行車", page: 89, quote: "當隧道實施單管雙程行車時，管道內的車速限制一般會降低至每小時50公里。" },
    memoryHook: "隧道單管雙程：限速一般降到 50 km/h，最右變對頭線絕不超車。"
  },
  {
    id: "q162",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "行人在漆黑或光線不足時外出，穿着「反光物料」與「熒光布料」的效果有何分別？",
    options: {
      A: "反光物料在車頭燈照射下可於遠至普通衣服 3 倍的距離被看見；熒光布料在白天及黃昏顯眼，但在漆黑環境作用不大",
      B: "熒光布料在完全漆黑的環境下比反光物料更顯眼",
      C: "兩者在白天及漆黑環境效果完全相同"
    },
    answer: "A",
    whyRight: "反光物料在車頭燈下可見距離達普通衣服 3 倍；熒光布料只在白天和黃昏有效，漆黑中作用不大。",
    whyWrong: { B: "恰恰相反，熒光靠紫外／自然光，漆黑中作用不大。", C: "兩者適用時段不同：日間黃昏用熒光，夜間用反光。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "使用道路和行人路 — 外出之前", page: 6, quote: "反光物料在車頭燈照射下和普通衣服比較，在遠至三倍的距離，駕駛人仍能看見；至於熒光布料，在白天及黃昏時雖然顯而易見，但在漆黑環境下卻作用不大。" },
    memoryHook: "日頭黃昏靠「熒光」，夜晚車燈靠「反光」（遠足 3 倍距離）！"
  },
  {
    id: "q163",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "當行人來到「綠色人像」過路處，看見「綠色人像」燈號正在閃動時，應該怎樣做？",
    options: {
      A: "立即快跑衝過馬路",
      B: "如已在過路處中央，應立即折返原來行人路",
      C: "如尚未開始過路，切勿開步橫過；如已在過馬路途中，則應繼續穩步前行"
    },
    answer: "C",
    whyRight: "綠人閃動＝不可開始橫過（站在路邊等下一輪）；已在過路途中者會有足夠時間穩步到達對面或安全島。",
    whyWrong: { A: "綠人閃動時切勿開步，且過馬路不可奔跑免跌倒。", B: "已在途中繼續穩步前行即可，不必慌張折返。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "行人過路交通燈", page: 17, quote: "「綠色人像」燈號閃動時，不可開始橫過馬路……（橫過馬路時）你會有足夠的時間，安全到達對面的行人路或路中央的安全島，應繼續穩步前行。" },
    memoryHook: "綠人閃動：未行唔好行，行緊就穩步過完唔好跑。"
  },
  {
    id: "q164",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "發生涉及「人命傷亡」以外、僅涉及「第三方車輛、財物或動物損毀」的交通意外時，司機應該怎樣做？",
    options: {
      A: "只要自己座駕沒有損毀便可直接開車離去",
      B: "必須停車，把姓名、地址、車主姓名地址及車牌告知警員或合理要求的第三方；若未能做到，須於 24 小時內親自報警",
      C: "留下電話號碼紙條即可於 72 小時後致電備案"
    },
    answer: "B",
    whyRight: "涉及傷亡或第三方車輛／財物／動物損毀均須停車提供個人、車主資料及車牌；若未能提供則須 24 小時內親自報警。",
    whyWrong: { A: "即使本身車輛毫無損毀，涉及交通意外仍必須停車。", C: "法定時限是盡快而不遲於意外後 24 小時親自報警。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "交通意外", page: 135, quote: "必須把自己的姓名和地址、車主的姓名和地址、以及車輛登記號碼，一併通知警務人員，或任何有合理理由提出要求的人……如未能做到……必須……不遲於意外發生後24小時，親自向任何警務人員或前往最近的警署報告。" },
    memoryHook: "撞車／撞財物／撞動物必停低交資料（自己＋車主姓名地址＋車牌）；交唔到／有人傷亡＝24 小時內親身報警。"
  },
  {
    id: "q165",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在車速限制「超過每小時 50 公里」的道路或快速公路上中途壞車，應否在車後擺放紅色三角形警告牌？",
    options: {
      A: "應站在壞車後方揮手示意其他車輛切線",
      B: "必須落車行去車後 100 米處擺放三角形警告牌",
      C: "切勿嘗試擺放三角形警告牌或任何警告物品，只須亮着危險警告燈便可"
    },
    answer: "C",
    whyRight: "快速公路或限速逾 50 km/h 道路車速極高，切勿擺放三角牌或物件，只須亮危險警告燈。",
    whyWrong: { A: "切勿留在行車道上或站在壞車前後，極易被尾隨車撞及。", B: "約 50 米放置三角牌僅適用於限速 ≤50 km/h 的一般道路。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "警告其他駕駛人", page: 134, quote: "在快速公路或車速較高的道路上（車速限制超過每小時50公里），切勿嘗試擺放三角形警告牌或任何警告物品……你只須亮着危險警告燈便可。" },
    memoryHook: "限速 ≤50 km/h＝車後約 50m 放三角牌；>50 km/h 或快速公路＝禁放牌，只開死火燈！"
  },
  {
    id: "q166",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在快速公路上中途壞車並安全把車駛入路肩後，駕駛人與乘客下車等候救援的正確做法是？",
    options: {
      A: "確認安全後經「左面車門」離開，留在壞車後方路旁防撞欄後（遠離行車道及路肩），動物留車內開鮮風口",
      B: "經右面車門下車並站在壞車前方等候拖車",
      C: "留在行車道旁打開車頭蓋自行修理引擎"
    },
    answer: "A",
    whyRight: "確定安全後經左面車門下車，於壞車後方防撞欄後等候，動物留車內留鮮風口；有懷疑則扣安全帶留車內。",
    whyWrong: { B: "右面車門面對高速車流極危險，亦切勿站在壞車前後。", C: "切勿留在行車道上或試圖在行車道檢查修理壞車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "中途壞車", page: 133, quote: "才可（利用左面車門）離開壞車。如有動物，應把它們留在車內（及預留鮮風口給它們）……應在壞車後方路旁附近而又可看見其他駛經車輛的地方等待救援（如有防撞欄，應在其後面等候）。" },
    memoryHook: "快路壞車：左門落、欄後等（壞車後方望來車）、寵物留車開鮮風。"
  },
  {
    id: "q167",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在交通意外現場，未曾受過急救訓練的人士見到「昏迷但仍有呼吸、且無即時火警危險」的傷者時，正確做法是？",
    options: {
      A: "切勿移動傷者；如傷者口鼻出血可輕輕推至側臥，並清除口腔食物、渣滓或假牙防窒息",
      B: "立即把傷者拉出車外平放路邊",
      C: "給傷者餵飲清水或止痛藥紓緩痛楚"
    },
    answer: "A",
    whyRight: "無即時危險（如火警）切勿移動傷者以免加重頸背內臟傷勢；可清口腔異物、口鼻出血時輕推側臥。",
    whyWrong: { B: "亂移傷者會加深頸椎、背部或內臟創傷。", C: "不可給任何傷者飲食、飲酒、食止痛藥或吸煙（可能須動手術）。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "在路上急救", page: 138, quote: "除非有即時危險，例如發生火警，否則不要移動傷者……把傷者口腔內任何食物、渣滓、流質東西或假牙除去。如傷者口鼻出血，把傷者輕輕推至側臥。" },
    memoryHook: "無火警唔好搬傷者；清口腔防窒息；絕不給飲食、止痛藥或煙酒。"
  },
  {
    id: "q168",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "車上常備的「急救箱」應該放在甚麼位置最妥善？",
    options: {
      A: "放在容易拿得到的地方，例如汽車前座的貯物箱",
      B: "放在車尾行李箱最底層以節省空間",
      C: "放在車頭引擎室內"
    },
    answer: "A",
    whyRight: "急救箱應標誌清楚並放於容易取得的位置（如前座貯物箱），因意外後車尾箱未必能打開。",
    whyWrong: { B: "車禍撞擊後行李箱可能變形卡死無法開啟。", C: "引擎室高溫且無法即時取用。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "交通意外 — 急救", page: 135, quote: "急救箱應放在容易拿得到的地方，例如汽車前座的貯物箱。急救箱放在汽車行李箱內，未必妥善，因為發生意外後行李箱不一定可以打開。" },
    memoryHook: "急救箱放前座貯物箱，唔放車尾箱（撞車後尾箱可能打唔開）。"
  },
  {
    id: "q169",
    category: "driving_skills",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "以下哪項關於「長車／重型車輛」的駕駛特性及應對方法正確？",
    options: {
      A: "長車車身高大，司機可清楚看見車身左後方所有車輛",
      B: "重型車輛上坡快、下坡慢，應緊貼其車尾節省風阻",
      C: "重型車輛的停車距離比一般汽車差不多長一半（甚至多出一倍），左轉前可能會先向右擺出，切勿從其左邊超車"
    },
    answer: "C",
    whyRight: "重型車停車距離長、轉彎需借位（左轉或先向右擺）、左後方盲點大，切勿從左邊超車或久留盲點。",
    whyWrong: { A: "長車司機視線受限，難以看見車後及左後方（特別是側門後盲點）。", B: "重型車相反是「下坡較快、上坡較慢」，且切勿跟車太貼。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "小心長車／重型車輛", page: 51, quote: "重型車輛停車的距離，比一般汽車所需差不多長一半……長車側門後面，是另一個「盲點」，不宜久留……大型車輛在路口準備左轉時，可能會先向右駛。" },
    memoryHook: "遠離長車三大要訣：勿緊貼、勿左超、勿留側門盲點。"
  },
  {
    id: "q170",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「緊急服務車輛」（警車、消防車、救護車或海關車輛）亮起閃燈或響起警號駛近時，下列哪項正確？",
    options: {
      A: "必須立即讓路並設法開路，否則屬違法；緊急服務車輛執行職務時或不會遵守所有交通標誌或燈號",
      B: "只須在紅燈前讓路，綠燈時一般車輛享有優先權",
      C: "只有救護車和消防車須讓路，海關車輛不必讓路"
    },
    answer: "A",
    whyRight: "警車、消防車、救護車及海關等獲授權緊急車輛亮閃燈或響警號時，所有道路使用者必須讓路開路。",
    whyWrong: { B: "無論任何燈號，遇響號閃燈的緊急車輛均必須設法讓路。", C: "守則明列包括警車、消防車、救護車及海關車輛。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第八章", section: "緊急服務車輛", page: 61, quote: "必須讓路並設法開路給響起警號或發出閃燈的緊急服務車輛，包括警車、消防車、救護車或海關車輛。" },
    memoryHook: "緊急車輛（警、消、救、海關）響號閃燈＝即時設法開路讓行。"
  },
  {
    id: "q171",
    category: "driver_safety",
    type: "text",
    trapTag: "現行新例",
    prompt: "根據 2020 年 10 月 1 日起生效的新規定，申領商用車輛駕駛執照須年滿多少歲？持有有效私家車或輕型貨車正式執照年期要求為何？",
    options: {
      A: "年滿 18 歲，考獲 P 牌後即可即時報考",
      B: "年滿 25 歲，且必須持有正式執照滿 5 年",
      C: "年滿 21 歲，且持有有效私家車／輕型貨車正式執照最少 1 年（或已完成暫准駕駛期並獲發正式執照）"
    },
    answer: "C",
    whyRight: "申領商用車牌須年滿 21 歲、緊接 5 年無指定嚴重交通定罪；2020 年 10 月 1 日起正式牌年期要求改為最少 1 年（或完成 P 牌獲發正式牌）。",
    whyWrong: { A: "申領商用車牌必須年滿 21 歲且已獲正式牌照。", B: "年齡要求是 21 歲，5 年是「無嚴重交通定罪」的審核期。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第六章", section: "商用車輛", page: 96, quote: "在申請當日，你必須年滿21歲……自2020年10月1日起，持有有效私家車或輕型貨車正式駕駛執照的年期要求會改為最少一年（或已完成暫准駕駛期，並獲發正式駕駛執照）。" },
    memoryHook: "考商用車：21 歲＋5 年無重罪＋正式牌滿 1 年（或完 P 牌拎正式牌）。"
  },
  {
    id: "q172",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "香港中型／重型貨車、巴士及公共小型巴士的「車輛本身最高車速限制」分別是多少？",
    options: {
      A: "全部劃一為每小時 80 公里",
      B: "中／重型貨車 80 km/h、巴士 90 km/h、公共小型巴士 100 km/h",
      C: "中／重型貨車 70 km/h、巴士 70 km/h、公共小型巴士 80 km/h（並受道路限速較低者約束）"
    },
    answer: "C",
    whyRight: "中／重型貨車及巴士法定上限均為 70 km/h，公共小型巴士為 80 km/h，均不得超道路限速。",
    whyWrong: { A: "中／重型貨車與巴士上限為 70 km/h，並非 80 km/h。", B: "全部高於法定車輛速度上限。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第六章", section: "貨車／巴士和公共小型巴士", page: 97, quote: "中型及重型貨車的最高車速限制為每小時70公里……巴士和公共小型巴士的最高車速限制分別是每小時70公里和每小時80公里。" },
    memoryHook: "大車限速：中重貨 70、巴士 70、小巴 80（永遠取道路與車種較低者）。"
  },
  {
    id: "q173",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "以拖車繩或拖車鍊拖曳另一輛車時，兩車之間的距離上限及「拖車」標誌字體高度要求分別是？",
    options: {
      A: "兩車相距不可超過 2 米；被拖車輛車廂內不可有人駕駛",
      B: "兩車相距不可超過 10 米；只需亮起死火燈無須展示標誌",
      C: "兩車相距不可超過 4.5 米；被拖車尾須展示深色底白字、至少高 150 毫米的「拖車」標誌"
    },
    answer: "C",
    whyRight: "拖車繩／鍊兩車間距不可超 4.5 米，須清晰可見；被拖車須由持合適有效執照者駕駛，車尾掛深底白字高 ≥150mm「拖車」牌。",
    whyWrong: { A: "被拖車輛必須有人持有效執照駕駛操控及剎停。", B: "上限為 4.5 米，且必須掛合規格「拖車」標誌。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第六章", section: "運載貨物、長車和拖車 — 拖車", page: 98, quote: "「拖車」標誌 ── 須為深色底，而其英文字母及中文字則必須用白色，及至少高150毫米。用拖車繩或拖車鍊拖車時，兩輛車之間的距離不可超過4.5米。" },
    memoryHook: "繩拖車：距離≤4.5m、尾牌白字高≥150mm、後車必有持牌司機操控。"
  },
  {
    id: "q174",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "車輛運載伸懸於車外的貨物時，前伸、後伸及連車總闊度的法定上限分別是多少？",
    options: {
      A: "車前不可超 2 米、車後不可超 2 米、總闊度不可超 3 米",
      B: "車前不可超 1.5 米、車後不可超 1.4 米、總闊度不可超 2.5 米",
      C: "車前不可超 1 米、車後不可超 1.5 米、總闊度不可超 2 米"
    },
    answer: "B",
    whyRight: "載貨法定上限：伸出車前 ≤1.5 米、車後 ≤1.4 米、連車總闊度 ≤2.5 米，且不可觸地或遮視線。",
    whyWrong: { A: "三項數字均超出法定容許上限。", C: "前伸上限是 1.5 米（比後伸 1.4 米略長），總闊度是 2.5 米。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第六章", section: "伸懸於車外的貨物", page: 98, quote: "不可有以下載貨情形：貨物伸出車前超過1.5米；貨物伸出車後超過1.4米；貨物伸出車外，以致總闊度（包括貨物和車輛）超過2.5米。" },
    memoryHook: "伸出貨物三組數：前 1.5、後 1.4、總闊 2.5（輕貨限高 3.5、中重貨 4.6）。"
  },
  {
    id: "q175",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "車輛運載伸懸於車外的貨物時，日間及黑夜須各自加上甚麼警示裝置？",
    options: {
      A: "日間掛黃色反光牌；黑夜全車開着危險警告燈行駛",
      B: "日間和黑夜均只需綁上紅色膠帶即可",
      C: "日間於貨物後端附至少 1 平方米紅旗；黑夜或能見度低時前端兩旁亮白燈、後端亮紅燈"
    },
    answer: "C",
    whyRight: "日間能見度高須於貨物後端掛 ≥1 平方米紅旗；夜間或能見度低則前端兩旁白燈、後端紅燈。",
    whyWrong: { A: "法例指明為 ≥1 平方米紅旗，夜間須設前白後紅燈。", B: "一般膠帶不符合法例面積及夜間照明要求。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第六章", section: "伸懸於車外的貨物", page: 98, quote: "在日間能見度高的情況下，你必須在貨物後端附有一塊至少1平方米大小的紅旗。如在黑夜時間或能見度低的情况下，則須在貨物前端兩旁亮着白燈，並在貨物後端亮着紅燈。" },
    memoryHook: "凸貨警告：日掛 1 平方米紅旗，夜亮前白後紅燈。"
  },
  {
    id: "q176",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "關於電單車「安全頭盔」與「車燈」的規定，下列哪項完全正確？",
    options: {
      A: "頭盔無須更換；日間光線充足時電單車無須開燈",
      B: "只有司機須戴頭盔，夜間才需要開大燈",
      C: "司機及乘客均須佩戴扣緊認可頭盔（建議用 4 年或曾受撞擊即更換）；電單車行駛時須時刻（包括日間）亮着所有前燈、大燈及後燈"
    },
    answer: "C",
    whyRight: "電單車司機與乘客均須戴認可頭盔（建議 4 年換或受撞即換）；行駛時不論晝夜均須亮着前燈、大燈及後燈。",
    whyWrong: { A: "頭盔老化建議 4 年更換，且電單車日間行車亦必須亮大燈與後燈。", B: "乘客同樣必須佩戴並扣緊認可頭盔。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第七章", section: "安全頭盔／讓別人看見你", page: 100, quote: "頭盔用上四年後，最好更換……（第101頁）電單車或機動三輪車駕駛時，必須時刻（包括日間）亮着車上所有前燈、大燈和後燈。" },
    memoryHook: "電單車頭盔 4 年換（撞過即換）；車燈「全天候包括日間」必長亮！"
  },
  {
    id: "q177",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駕駛電單車在道路上正常行駛（及接近路口停候）時，最合適的行車位置是？",
    options: {
      A: "正常行車靠行車線右邊（近分界線左方）；接近路口、過路處或慢車停候時則駛入行車線正中位置",
      B: "任何情況下均可隨意在行人路上借道行駛",
      C: "應時刻緊貼最左路邊行駛，讓汽車從同線右邊擦過"
    },
    answer: "A",
    whyRight: "電單車正常行車應靠行車線右方（近分界線左邊）擴闊視野；接近路口或慢車等候時應佔行車線正中讓他人容易看見。",
    whyWrong: { B: "行人路及行人徑嚴禁駕駛電單車。", C: "過貼路邊易被開門或切線車輛逼離行車線，亦較難被司機察覺。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第七章", section: "行車位置", page: 102, quote: "在正常交通情況下，應在行車線的右邊行駛，並靠近「行車線界線」或「車路分界線」左邊……遇上交通緩慢或等候前進時，應沿行車線內正中位置駕駛或停車。" },
    memoryHook: "電單車走位：正常靠線右（近中線）、路口／慢車企正中，夠顯眼！"
  },
  {
    id: "q178",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "電單車及機動三輪車加裝貨物或貯物箱時，法定最高車輛總重及闊度限制分別是？",
    options: {
      A: "電單車總重不超 500 公斤、機動三輪車不超 600 公斤；貨物／貯物箱不應超過原廠手柄闊度",
      B: "電單車不可攜帶任何貨物或加裝尾箱",
      C: "兩者均不超 1,000 公斤；闊度不超過 2 米即可"
    },
    answer: "A",
    whyRight: "總重上限為電單車 500 kg、機動三輪車 600 kg；貨物須對稱放置穩固，闊度不應超過原廠手柄。",
    whyWrong: { B: "只要符合總重、對稱穩固及不超原廠手柄闊度即可載貨。", C: "超出守則第 103 頁的重量及手柄闊度限制。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第七章", section: "載貨", page: 103, quote: "確保車輛不會超過最高車輛總重500公斤（電單車）或600公斤（機動三輪車）……所載的貨物或貯物箱不應超過該車原廠手柄的闊度。" },
    memoryHook: "電單車 500kg、三輪車 600kg；尾箱貨物唔好闊過原廠手柄。"
  },
  {
    id: "q179",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "幾多歲以下的兒童如無成年人陪同，不可在道路上騎單車（或在指定場地騎多輪車）？",
    options: {
      A: "未滿 8 歲",
      B: "未滿 14 歲",
      C: "未滿 11 歲"
    },
    answer: "C",
    whyRight: "未滿 11 歲兒童必須在成年人陪同／看管下，方可在道路上騎單車或在指定場地騎踏多輪車。",
    whyWrong: { A: "8 歲是電單車後座乘客的最低法定年齡。", B: "守則訂明為 11 歲以下。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第四章／第九章", section: "學習騎單車／兒童騎單車", page: 29, quote: "未滿11歲的兒童，更必須在成年人陪同下，才可在道路上騎單車……11歲以下兒童必須有成人陪同，才可在這些指定地點騎乘或操控多輪車。" },
    memoryHook: "年齡數字防撈亂：8 歲電單車後座、11 歲獨自踩單車、18 歲考私家車、21 歲考商用車。"
  },
  {
    id: "q180",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在夜間或能見度低時騎單車，單車必須配備及亮起甚麼燈光與反光體？",
    options: {
      A: "車頭亮白燈、車尾亮紅燈，車尾必須裝紅色反光體（前方／側面宜裝白色、腳踏裝黃色反光體）",
      B: "車頭亮黃燈、車尾亮白燈即可",
      C: "只需裝上車尾紅色反光體，毋須開燈"
    },
    answer: "A",
    whyRight: "夜間或能見度低騎單車必須亮「前白後紅」單車燈，車尾亦必須裝紅色反光體及配備警告車鈴。",
    whyWrong: { B: "前燈必須為白燈、尾燈必須為紅燈，不可調轉。", C: "反光體不能取代車燈，夜間必須同時亮起前白後紅燈。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第四章", section: "騎單車者及其單車 — 安全檢查", page: 30, quote: "如在夜間或能見度低時騎單車，必須亮起單車燈：車頭亮白燈，車尾亮紅燈……單車車尾必須裝上紅色反光體。" },
    memoryHook: "單車必備：警告車鈴＋車尾紅反光體＋夜晚前白後紅燈（鏈虛位≤2cm）。"
  },
  {
    id: "q181",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "騎單車者如須橫過「輕鐵路軌」或「行人過路處」，正確做法是？",
    options: {
      A: "只需留意無輕鐵駛近便可騎單車沿行人路衝過",
      B: "必須下車，在指定地點利用「綠色人像」過路處，待綠燈亮定後用手把單車推過",
      C: "加快踩踏速度直接騎過輕鐵路軌"
    },
    answer: "B",
    whyRight: "騎單車橫過輕鐵路軌或使用行人過路處時，必須下車推車，並遵守行人交通燈號及過馬路守則。",
    whyWrong: { A: "不可在行人路騎單車，亦不可在未有綠人燈號時橫過。", C: "車輪易卡進路軌縫隙跌倒，且輕鐵高速寧靜不能轉向。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章", section: "單車徑 — 橫過輕鐵路軌", page: 39, quote: "騎單車時，或須橫過輕鐵路軌，這時候你必須下車，並且在指定地點，利用「綠色人像」過路處，把單車推過輕鐵路軌。" },
    memoryHook: "單車過輕鐵軌或行人過路處＝必落車推、守綠人燈。"
  },
  {
    id: "q182",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "騎單車使用「迴旋處」時（無論直駛、轉左或轉右），守則建議哪條最安全路線？",
    options: {
      A: "騎單車進入迴旋處享有優先權，無須讓右方車輛",
      B: "應一律靠左駛入及沿迴旋處外邊（左方）行駛，並留意右方駛出車輛橫越路線；如感不安全應下車推車沿行人路線過",
      C: "轉右時應直接切入最內線與快速汽車並排"
    },
    answer: "B",
    whyRight: "騎單車不論直行或轉右，靠左沿外線行駛通常較安全，接近出口前發左轉手號；若不安全應下車推車。",
    whyWrong: { A: "單車屬車輛，同樣必須讓路給迴旋處內車輛。", C: "切入內線容易被大型或高速車輛遮蔽及夾擊。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章", section: "迴旋處", page: 37, quote: "轉右或向前直駛時，應靠左駛入迴旋處。在迴旋處行駛時和離開迴旋處後，仍要繼續靠左行駛……如不能確知前面交通情況……應該下車，並用手推車。" },
    memoryHook: "單車入迴旋處：一律靠左外圍行，唔放心就落車推行人路。"
  },
  {
    id: "q183",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "騎單車在正常情況下減速停車，以及遇到緊急情況需要急停時，應如何操作前後剎車掣？",
    options: {
      A: "轉彎傾斜車身時大力剎前掣可縮短距離",
      B: "無論任何情況均應先大力急拉前剎車掣最有效",
      C: "正常應先用後剎車掣再加用前剎車掣；緊急停車則不發手號、雙手緊握把手、同時用前後剎車掣並重心後移"
    },
    answer: "C",
    whyRight: "正常先後掣後加前掣（只在前輪直向時剎車）；緊急時不發手號、雙手緊握、同用前後掣並移低移後重心。",
    whyWrong: { A: "只有在前輪直向時才可剎車，轉彎中急剎易滑胎跌倒。", B: "過度猛拉前掣會令後輪離地「打觔斗」衝前墮地。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第四章", section: "剎車／緊急停車", page: 31, quote: "在正常情況下，應先用後剎車掣，然後再加用前剎車掣……只有在前輪直向時，才可剎車。（第33頁）緊急停車：不要發出手號。雙手應緊握把手……並同時使用前後剎車掣。" },
    memoryHook: "單車剎車：正常先後再前（前輪直向先剎）；急剎唔發手號、前後齊剎、重心後移。"
  },
  {
    id: "q184",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "騎單車在馬路上可否使用巴士線？當巴士停站時應怎樣做？",
    options: {
      A: "任何巴士線一律禁止單車駛入",
      B: "巴士停站時應迅速從巴士左邊與行人路之間空隙穿過",
      C: "除非有標誌禁止，否則可用巴士線；但當巴士停站時，絕對不可在巴士與路邊之間通過"
    },
    answer: "C",
    whyRight: "無禁制標誌下單車可用巴士線（情況許可下讓巴士超前）；遇巴士停站切勿從巴士與路邊之間穿過。",
    whyWrong: { A: "守則明言除非設有禁止標誌，否則單車可沿巴士線行駛。", B: "巴士與路邊之間有上落乘客且屬司機盲點，絕對不可穿過。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章", section: "超車／巴士線", page: 35, quote: "當有巴士停站，絕對不可在該巴士與路邊之間通過……除非巴士線上豎立了標誌，禁止單車駛入，否則你可沿巴士線行駛。" },
    memoryHook: "單車可用一般巴士線（無禁牌），但絕不可鑽入停站巴士與路邊之間！"
  },
  {
    id: "q185",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在沒有行人路或行人路因工程封閉的道路上，行人若被迫踏出馬路步行，下列哪項規則正確？",
    options: {
      A: "任何情況下即使只有兩米工程阻擋，都必須兩次橫過繁忙馬路",
      B: "可與同行親友並排在行車道上聊天前進",
      C: "若整段頗長行人路封閉，應依過馬路守則過對面行人路；若只阻塞一小段，踏出馬路繞過可能較過馬路安全（須提防後車）"
    },
    answer: "C",
    whyRight: "長段封閉須依過馬路守則轉用對面行人路；只阻塞一小段時看清交通踏出繞過可能較橫過馬路安全，並盡快返回行人路。",
    whyWrong: { A: "只阻塞一小段時無須冒險來回過馬路。", B: "在馬路上步行應盡可能靠近路邊排成單行。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章", section: "封閉的行人路", page: 7, quote: "如果一段頗長的行人路被阻塞或封閉，你便須遵照《過馬路守則》橫過馬路，然後使用在對面的行人路。如果阻塞只有一小段行人路，不要橫過馬路，踏出馬路步行可能也較橫過馬路安全。" },
    memoryHook: "行人路封路：封長段過對面；封短段望清車繞過快啲返上行人路。"
  },
  {
    id: "q186",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在設有「停車熄匙」法例規管下，以下哪類情況一般可獲豁免而毋須關掉引擎？",
    options: {
      A: "在室內停車場泊好車後留車內小睡",
      B: "在街邊等人購物停候 15 分鐘開冷氣",
      C: "因交通情況（如塞車、等燈）或正在上落乘客而停定車輛"
    },
    answer: "C",
    whyRight: "停車熄匙法例（連續 60 分鐘內空轉逾 3 分鐘違法）一般豁免因交通情況或上落客而停定車輛。",
    whyWrong: { A: "泊車小睡並不屬法定豁免理由，且室內空轉易致廢氣中毒。", B: "純粹等人開冷氣空轉逾 3 分鐘屬違法。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "停車熄匙", page: 53, quote: "一般而言，駕駛人如因交通情況或上落客而停定車輛，以及某些車輛類別的駕駛人如為達到合理的服務要求，引擎有需要保持運作等，都可獲豁免。" },
    memoryHook: "停車熄匙：60 分鐘累計 >3 分鐘違法；塞車等燈、上落客獲豁免。"
  },
  {
    id: "q187",
    category: "driving_skills",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "如果行駛途中感覺疲倦，下列哪項處理方式正確？",
    options: {
      A: "在快速公路路肩停下來小睡半小時",
      B: "開大音響並加速盡快駛抵目的地",
      C: "打開車窗呼吸新鮮空氣或調低冷氣保持清醒，並找合適泊車位停車休息（切勿在快速公路停車）"
    },
    answer: "C",
    whyRight: "途中疲倦可開車窗通風、調低冷氣，盡快找合適泊車位休息或輪流駕駛，切勿在快速公路停車。",
    whyWrong: { A: "快速公路路肩只限壞車或緊急事故，絕不可停車休息。", B: "開大音響會聽不到警號，加速只會大幅增加致命意外風險。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "避免疲勞駕駛", page: 50, quote: "如在駕駛中感覺疲倦，可打開車窗呼吸一下新鮮空氣，或調低冷氣的溫度，以保持清醒。如情況許可，應找尋合適的泊車位把車停下休息，但切勿在快速公路或有快速車輛行駛的道路上停車。" },
    memoryHook: "途中眼瞓：開窗降溫搵正式泊位唞，嚴禁快路停車。"
  },
  {
    id: "q188",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "開車時穿着鞋履有何安全要求？",
    options: {
      A: "只要慣熟腳感，穿人字拖或赤腳最容易感受油門",
      B: "只禁止高踭鞋，穿涼鞋或鬆身拖鞋並無問題",
      C: "應穿着穩固而包着腳掌的鞋，切勿穿着寬鬆的鞋、露踭鞋、涼鞋或高踭鞋"
    },
    answer: "C",
    whyRight: "駕駛應穿穩固包腳掌的鞋，寬鬆鞋、露踭鞋、涼鞋及高踭鞋易滑脫卡住腳掣。",
    whyWrong: { A: "拖鞋極易卡在腳踏下令剎車失控。", B: "涼鞋、露踭鞋及寬鬆鞋均屬守則明文勸阻。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "開車前應注意的事項", page: 49, quote: "駕駛時，應穿着穩固而包着腳掌的鞋。不要穿着寬鬆的鞋、露踭鞋、涼鞋、高踭鞋等。" },
    memoryHook: "揸車鞋要「穩固包腳掌」；禁鬆鞋、露踭、涼鞋、高踭鞋。"
  },
  {
    id: "q189",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "使用「倒車視像裝置」（後泊鏡頭）倒車時，下列哪項理解正確？",
    options: {
      A: "鏡頭可輔助觀察，但昏暗時須開輔助照明燈，污垢雨點會影響畫質，且絕不可只依賴倒車燈或響號",
      B: "有倒車鏡頭便可完全取代回頭察看及後視鏡",
      C: "只要有倒車鏡頭便可從支路倒車進入大路"
    },
    answer: "A",
    whyRight: "倒車視像裝置只屬輔助，須注意昏暗照明與鏡頭污垢雨點，並仍須環顧四周、先讓路給行人與他車。",
    whyWrong: { B: "鏡頭有視角死角及畸變，不能取代察看四周。", C: "無論裝有任何鏡頭，絕不可從支路倒車進入大路。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "倒車", page: 52, quote: "在光線昏暗的情況下使用倒車視像裝置時，應開着輔助照明燈。請注意，鏡頭上如有污垢或雨點，可能會影響倒車視像裝置的影像質素。" },
    memoryHook: "倒車鏡頭只輔助：暗要開燈、抹乾淨鏡、仍須四周望清兼讓路。"
  },
  {
    id: "q190",
    category: "signs_signals",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "當現場有警務人員、交通督導員或獲授權人士指揮交通，而其手號與現場交通燈號相反時，你必須怎樣做？",
    options: {
      A: "自行決定遵從燈號或警員手號",
      B: "必須遵從警務人員、交通督導員或其他獲授權人士的信號，即使與交通標誌或交通燈號不同",
      C: "一律以交通燈號為最高準則"
    },
    answer: "B",
    whyRight: "警務人員、交通督導員及獲授權人士（如隧道人員、學校交通安全隊）的現場指令優先於交通燈及標誌。",
    whyWrong: { A: "不服從獲授權人士指揮屬違法。", C: "現場執法人員指揮高於固定交通燈及標誌。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "警務人員及其他獲授權人士所發出的信號", page: 105, quote: "如有警務人員、交通督導員或其他獲授權人士……在場指揮交通，就必須遵從他們發出的信號，即使有其他交通標誌、道路標記或交通燈號。" },
    memoryHook: "道路最高權威次序：現場阿 Sir／授權人員 ＞ 臨時標誌 ＞ 交通燈／固定標誌。"
  },
  {
    id: "q191",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "根據第二章《過馬路守則》，只有在以下哪種過路設施下，行人才可不用依照《過馬路守則》？",
    options: {
      A: "使用行人天橋或行人隧道時",
      B: "使用「綠色人像」過路處時",
      C: "使用「斑馬線」時"
    },
    answer: "A",
    whyRight: "行人天橋及行人隧道完全與路面交通隔離，是唯一可不用依照《過馬路守則》的設施；其餘過路處均須遵守。",
    whyWrong: { B: "使用綠色人像過路處仍須遵守守則第 2 至第 6 點防車輛衝燈。", C: "使用斑馬線仍必須完全遵守《過馬路守則》並確保車輛停定才過。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "過路處", page: 14, quote: "只有在使用行人天橋或行人隧道時，才可不用依照《過馬路守則》。" },
    memoryHook: "全港最安全、唯一免用《過馬路守則》＝行人天橋／行人隧道。"
  },
  {
    id: "q192",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "行人使用「斑馬線」前，在甚麼時候車輛才「必須」為你停下讓路？",
    options: {
      A: "只要行人舉手揮動即可強制截停高速駛近的車輛",
      B: "只要行人站在行人路遠處望向馬路，車輛就必須立即急停",
      C: "在行人踏上「斑馬線」前，車輛仍不須停下；行人應在安全時先踏出一小步表明意向，待車輛停定才橫過"
    },
    answer: "C",
    whyRight: "行人未踏上斑馬線前車輛仍不須停下；應讓司機看見，先踏出一小步並確定車輛已停定才直線步過。",
    whyWrong: { A: "揮手截停駛近車輛十分危險，亦無法律效力。", B: "車輛僅對已踏足斑馬線上的行人負法定停車讓路責任。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "使用「斑馬線」", page: 15, quote: "如有需要，行人應首先在「斑馬線」上踏出一小步，向駛近車輛的駕駛人表示想過路。在你踏上「斑馬線」前，車輛仍不須為你停下。你須確保車輛已停定，才開始沿「斑馬線」橫過馬路。" },
    memoryHook: "斑馬線規則：行人踏上先必讓，但行人仍須等車停定先好過。"
  },
  {
    id: "q193",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "行人如不得已要在路邊停放了車輛的地方橫過馬路，下列哪項做法正確？",
    options: {
      A: "選在沒有駕駛人的私家車之間較大空位過路，先趨前到停定車輛的外側停步再察看四周",
      B: "躲在車尾直接衝出馬路縮短時間",
      C: "選在貨車之間橫過以避開風雨"
    },
    answer: "A",
    whyRight: "應選無司機的私家車（非貨車／客貨車）間較大空位，行到車身外側停定，讓自己與司機互相看見再依守則過路。",
    whyWrong: { B: "切勿直接衝出，並須留意剛起步及十分寧靜的電動車。", C: "貨車或客貨車車身高大，會完全阻擋行人與來車視線。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第二章", section: "在停放好的車輛附近橫過馬路", page: 12, quote: "寧可在停定的私家車之間橫過，也不要在大型車輛例如貨車之間橫過……選擇在沒有駕駛人的私家車之間過馬路……趨前到停定車輛的外側，然後停步。" },
    memoryHook: "停泊車旁過路：揀無司機私家車空位，企出車外側停一停望清先過。"
  },
  {
    id: "q194",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "行人在不設交通燈的路口橫過馬路，以及遇上路口髹有「白色交叉方格」與「黃色交叉方格」時，哪項正確？",
    options: {
      A: "不可對角越過路口（亦不可用迴旋處中央島）；可於綠燈時經「白色交叉方格」過路，但絕不可經「黃色方格」過路",
      B: "可以對角越過路口或經黃色方格抄捷徑",
      C: "白色與黃色交叉方格皆可供行人隨時橫過"
    },
    answer: "A",
    whyRight: "除設有對角過路處外，不可對角越過路口；白色交叉方格為行人過路提示標記，黃色方格專為車輛而設禁行人橫過。",
    whyWrong: { B: "不可對角越過無過路處的路口，更不可在黃色方格內過馬路。", C: "黃色方格路口嚴禁行人橫過。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章", section: "在不設交通燈的路口／白色方格", page: 19, quote: "當行人過路交通燈的綠色燈號亮着時，你可經此白色方格橫過馬路……不可經此黃色方格橫過馬路。" },
    memoryHook: "白交叉＝行人過路方格；黃交叉＝車輛黃格禁行人。"
  },
  {
    id: "q195",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "數字",
    prompt: "為協助視障人士而鋪設的凹凸紋地磚，「危險警示地磚」與「位置地磚」的圓點直徑分別是多少？",
    options: {
      A: "兩者圓點直徑完全相同，只靠顏色區分",
      B: "危險警示地磚為 15 毫米；位置地磚為 50 毫米",
      C: "危險警示地磚為大圓點（直徑 35 毫米）；位置地磚為小圓點（直徑 23 毫米）"
    },
    answer: "C",
    whyRight: "危險警示地磚（過路處／梯級起止）為直徑 35mm 大圓點；位置地磚（方向改變處）為直徑 23mm 小圓點；平行凸紋為方向指示地磚。",
    whyWrong: { A: "視障人士靠腳感觸摸大小圓點及平行條紋分辨。", B: "數字不符守則第 23 頁標準。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第二章", section: "視障人士", page: 23, quote: "危險警示地磚具有凸出的大圓點（直徑35毫米）……位置地磚具有凸出的小圓點（直徑23毫米），用以顯示行走方向或會改變。" },
    memoryHook: "視障地磚：危險大點 35mm、轉向位置小點 23mm、直行平行紋。"
  },
  {
    id: "q196",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "現行新例",
    prompt: "「綠色人像」過路處的電子行人過路發聲裝置，不同聲響模式各自代表甚麼燈號狀態？",
    options: {
      A: "間斷「必必」聲代表交通燈已失靈",
      B: "連續「必必」聲＝紅人亮着；很慢槌擊聲＝綠人亮定",
      C: "很慢槌擊聲＝紅人亮着；連續「必必」聲＝綠人亮定；間斷「必必」聲＝綠人閃動"
    },
    answer: "C",
    whyRight: "慢槌擊聲＝紅燈等候；連續必必聲＝綠燈亮定可過；間斷必必聲＝綠燈閃動不可開步。",
    whyWrong: { A: "間斷必必聲代表綠人正在閃動而非失靈。", B: "把紅燈與綠燈聲響完全調轉。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第二章", section: "電子行人過路發聲裝置", page: 23, quote: "連續「必必」聲響，告訴使用者「綠色人像」燈號已經亮定；間斷的「必必」聲響，則表示「綠色人像」燈號在閃動；而很慢槌擊聲則表示「紅色人像」燈號正在亮着。" },
    memoryHook: "慢「嗒、嗒」＝紅燈等；連續「必必」＝綠燈行；間斷「必必」＝綠燈閃！"
  },
  {
    id: "q197",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於香港三種的士（市區紅的、新界綠的、大嶼山藍的）的營運範圍，下列哪項正確？",
    options: {
      A: "市區的士可在全港（包括大嶼山所有封閉道路及東涌路）自由營運",
      B: "市區的士不得在大嶼山封閉道路（包括東涌路）營運；新界的士不得在荃灣、沙田、將軍澳及大嶼山一般營運",
      C: "大嶼山的士除服務大嶼山外，亦可載客前往九龍市區"
    },
    answer: "B",
    whyRight: "市區的士禁入大嶼山封閉道路（含東涌路）；新界的士除荃灣、沙田、將軍澳及大嶼山外營運（可往返機場客運大樓及指定基建）；藍的只服務大嶼山及赤鱲角。",
    whyWrong: { A: "市區的士不得在大嶼山封閉道路（包括東涌路）營運。", C: "大嶼山的士只服務整個大嶼山和赤鱲角（包括機場）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第三章", section: "公共交通工具車輛", page: 24, quote: "市區的士可在全港提供服務，但不得在大嶼山封閉道路（包括東涌路）營運。新界的士 — 除荃灣、沙田、將軍澳及大嶼山外……大嶼山的士只服務整個大嶼山和赤鱲角。" },
    memoryHook: "紅的唔入大嶼山封閉路；綠的唔包荃灣沙田將軍澳；藍的只留大嶼山機場。"
  },
  {
    id: "q198",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "私家車乘客如迫不得已要在「馬路的一邊」下車，下車後應如何步行返行人路最安全？",
    options: {
      A: "保持車門打開作屏障再直接跑往路邊",
      B: "把車門大幅推開後直接從車頭前橫過",
      C: "先稍開車門環顧後面防單車／電單車，無車才下車站在車旁迅速關門，再望清四周繞過私家車「後面」行至行人路"
    },
    answer: "C",
    whyRight: "馬路邊下車須先微開門望後方（防單車／電單車），無車才落車迅即關門，再繞過車「後面」回行人路。",
    whyWrong: { A: "切勿讓車門一直打開危及他車。", B: "大幅開門易撞翻單車／電單車，且應繞車後而非車前。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第三章", section: "私家車乘客", page: 27, quote: "應把車門稍為打開，環顧四周（尤其是後面）……當沒有車輛駛近時，方可下車，然後站在車旁，並迅速關上車門。這時再次環顧四周……便可繞過私家車後面，行至行人路。" },
    memoryHook: "馬路邊落車：微開望後防兩輪→落車即關門→繞「車尾」返行人路。"
  },
  {
    id: "q199",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "乘搭雙層巴士及下車後準備橫過馬路時，下列哪項規則正確？",
    options: {
      A: "車廂擠迫時可暫時站在樓梯上",
      B: "切勿站在上層、樓梯或出入口黃線以外；下車後應待巴士離去並看清兩邊路面才橫過馬路，切勿貼近巴士前後過路",
      C: "下車後應立即從巴士車頭前面橫過馬路以免被後車撞到"
    },
    answer: "B",
    whyRight: "巴士嚴禁站在上層、樓梯及出入口黃線外；下車後切勿靠近巴士前後過馬路，應待巴士開走或遠離車站再過。",
    whyWrong: { A: "站立於上層、樓梯或黃線外均屬危險違規。", C: "靠近巴士車頭或車尾過路會被龐大車身完全遮蔽視線。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第三章", section: "乘搭巴士", page: 25, quote: "切勿站在上層、樓梯或出入口附近的黃線以外……下車後如想橫過馬路，應須待巴士離去後……切勿靠近巴士前或後橫過馬路。" },
    memoryHook: "搭巴士：上層樓梯黃線外唔企得；落車等巴士走先過馬路。"
  },
  {
    id: "q200",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於殘疾人士使用輪椅及乘搭公共交通工具，下列哪項符合《道路使用者守則》？",
    options: {
      A: "導盲犬不可隨視障人士登上公共巴士",
      B: "電力輪椅在行人路上可行駛至時速 20 公里",
      C: "輪椅在行人路上行駛不應超過四周行人步行速度；乘搭的士時，拐杖及輪椅可獲免收附加費"
    },
    answer: "C",
    whyRight: "輪椅於行人路不應快過行人步速，且受酒精藥物影響勿用輪椅；視障人士可帶導盲犬上車，搭的士帶拐杖輪椅免附加費。",
    whyWrong: { A: "守則明列視障人士可攜同導盲犬登上公共交通工具。", B: "輪椅在行人路須以合理速度行駛，不應超過四周行人步速。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章／第三章", section: "殘疾人士", page: 28, quote: "視障人士可攜同導盲犬上車……乘搭的士（包括可供輪椅上落的的士）時，你的拐杖及輪椅可獲免收附加費。" },
    memoryHook: "輪椅唔快過行人步速；導盲犬上得車；的士載輪椅拐杖免附加費。"
  },
  {
    id: "q201",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "數字",
    prompt: "檢查單車安全及合適尺碼時，關於「鞍座高度」與「車鏈虛位」的正確標準是？",
    options: {
      A: "坐上鞍座時腳尖能着地（把手與鞍座同高或略高）；車鏈虛位不得超過 2 厘米",
      B: "坐上鞍座時雙腳須完全平放地上；車鏈虛位不得超過 10 厘米",
      C: "雙腳應完全懸空離地才夠安全；車鏈越鬆越好"
    },
    answer: "A",
    whyRight: "坐鞍座時應腳尖着地（平放代表過低、着不到地代表過高），把手同高或略高，且車鏈虛位不超 2 厘米。",
    whyWrong: { B: "雙腳平放地上表示單車過小或鞍座過低，要屈膝遷就。", C: "腳尖無法着地表示單車過大或鞍座過高，停車易失平衡。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第四章", section: "騎單車者及其單車", page: 30, quote: "坐在鞍座上時，應試一試腳尖能否着地……單車把手應與鞍座一樣高或略高於鞍座……車鏈鬆緊得宜（虛位不得超過2厘米）。" },
    memoryHook: "單車合身標準：坐上去腳尖點地、把手≥鞍座、車鏈虛位≤2cm。"
  },
  {
    id: "q202",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "騎單車者發出「減速或停車」手號時，正確手勢是怎樣？",
    options: {
      A: "把右臂伸直逆時針大幅打圈",
      B: "伸出手臂與肩同高，掌心向下，上下擺動至少三次，但不可太快",
      C: "雙手同時離開把手向上舉起"
    },
    answer: "B",
    whyRight: "單車減速手號：伸手與肩同高、掌心向下，上下擺動至少三次（不可太快）；左轉為左手平伸掌心向前。",
    whyWrong: { A: "右臂逆時針打圈是「汽車駕駛人」的左轉手號，非單車減速手號。", C: "騎單車在任何時候至少須單手緊握把手，雙腳不可離開腳踏。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第四章", section: "怎樣發出信號", page: 32, quote: "減速信號 — 伸出的手要和肩膊一樣高，掌心向下。伸出的手應至少上下擺動三次，但不可太快。" },
    memoryHook: "單車減速手號：齊肩掌心向下「上下擺至少 3 次」；記住發完手號握實把手先轉向！"
  },
  {
    id: "q203",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在馬路上騎單車時，關於「排列方式」、「載客」及「停泊車輛旁距離」的規定，哪項正確？",
    options: {
      A: "在馬路上可兩人並排騎單車互相照應，且可在單車後座載一名小童",
      B: "可攀附慢駛貨車車尾借力上斜",
      C: "除超車或於單車徑外必須單排行車、不准載客或牽領動物、超越停定車輛時宜保持至少一道車門距離"
    },
    answer: "C",
    whyRight: "馬路騎單車須單排行車、禁載客、禁牽狗、禁拖曳或攀附他車、禁戴耳機用手機；過停泊車留至少一道車門距離防開門。",
    whyWrong: { A: "馬路不可雙排行車（除超車或單車徑），且單車一律不准載客。", B: "不准攀附其他車輛前進或由他車拖動單車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章", section: "在路上應注意的事項／超車", page: 34, quote: "除超車或於單車徑上騎單車外，必須單排行車……不准載客……不可牽領動物……（第35頁）你的單車應盡可能與這些車輛保持至少一道車門的距離。" },
    memoryHook: "馬路單車：單排行、禁載客牽狗攀車、過泊車留「一道車門」位。"
  },
  {
    id: "q204",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "騎單車者於馬路上「用手推動單車前進」，以及於公眾單車泊車處停泊單車時，哪項正確？",
    options: {
      A: "在馬路推單車應靠路邊，並把單車放在自己與其他車輛之間；單車不得在同一泊車處停泊超過 24 小時",
      B: "單車不受 24 小時泊車上限規限，可長期停放街邊泊車架",
      C: "推單車時應把自己置於單車與駛經車輛之間以保護單車"
    },
    answer: "A",
    whyRight: "馬路推車須把單車置於人與來車之間（保障人身安全）；任何單車亦不得於同一泊車處連續停泊逾 24 小時。",
    whyWrong: { B: "單車與汽車一樣，同一泊車處停泊上限為 24 小時。", C: "應把單車放在你與其他車輛之間，不可用肉身擋車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第四章", section: "用手推動單車前進／停泊單車", page: 40, quote: "在馬路上推着單車前進，應盡量靠近路邊，並把單車放在你與其他車輛之間……任何單車均不得於同一泊車處停泊超過24小時。" },
    memoryHook: "推單車＝車在人與來車之間；推幼童／寵物＝大人置身佢哋與車輛之間；單車泊位一樣限 24 小時！"
  },
  {
    id: "q205",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "帶領幼童（11 歲或以下）外出步行及安排兒童上落車時，下列哪項做法正確？",
    options: {
      A: "把車輛停在學校對面馬路並響號招呼學童跑過來上車",
      B: "讓幼童走在靠近馬路的一邊方便欣賞汽車",
      C: "時刻牽手並置身於幼童與車輛之間；絕不在馬路對面等候兒童；上落車讓兒童「最先上車、最後下車」"
    },
    answer: "C",
    whyRight: "大人應置身兒童與車輛之間、絕不在對面馬路等兒童（防興奮衝出），上落車應讓兒童最先上車和最後下車。",
    whyWrong: { A: "在對面馬路等候會令兒童興奮忘記過馬路守則而衝出馬路。", B: "大人必須置身幼童與車輛之間保護他們。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第九章", section: "兒童在路上應注意的事項", page: 130, quote: "應時刻牽着幼童的手，並置身在他們與車輛之間……絕不可在馬路對面的地方等候兒童……上落車時，應讓兒童最先上車和最後下車。" },
    memoryHook: "帶細路三鐵律：大人企近車嗰邊、唔好對面等、最先上車最後落車。"
  },
  {
    id: "q206",
    category: "driver_safety",
    type: "text",
    trapTag: "現行新例",
    prompt: "根據《道路交通條例》，不遵守《道路使用者守則》的規則或指示，在法律上有何後果？",
    options: {
      A: "純屬建議性質，法庭在任何民事或刑事訴訟中均不可引用守則",
      B: "本身不算直接違法，但在民事或刑事訴訟中法庭可將其納入考慮以確立或否定法律責任；且守則大多規則直接反映法律，不遵守可能觸犯法律",
      C: "只適用於商用車司機，私家車司機可自行決定是否遵守"
    },
    answer: "B",
    whyRight: "守則封面內頁明訂：不遵守守則本身不算違法，但法庭在民事／刑事訴訟中可用以確立或否定責任，且多數規則直接反映法例。",
    whyWrong: { A: "法庭處理《道路交通條例》及民事訴訟時可將不遵守守則納入考量。", C: "守則適用於香港所有道路使用者（行人、乘客、單車及各類駕駛人）。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "封面內頁", section: "法律效力說明", page: 2, quote: "不遵守《道路使用者守則》所載的規則或指示，不算違法。不過，在處理訴訟時（不論屬民事或刑事……）法庭……可能會把當事人不遵守《道路使用者守則》這一點考慮在內。" },
    memoryHook: "守則本身唔係法例，但上庭可用作定責證據，而且大部分內容本身就係法例。"
  },
  {
    id: "q207",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果兩輛汽車各以「時速 25 公里」迎頭相撞，其產生的衝力大約相等於甚麼程度？佩戴安全帶能如何減低風險？",
    options: {
      A: "衝力相等於時速 50 公里（約從三樓窗口墮下頭部先着地）；佩戴安全帶可將死亡或重傷機會減半",
      B: "衝力只相等於時速 25 公里，且安全氣袋已可完全取代安全帶",
      C: "因車速僅 25 公里，衝力極輕微，毋須佩戴安全帶"
    },
    answer: "A",
    whyRight: "兩車各 25 km/h 迎頭撞＝50 km/h 衝力（等同三樓墮下），證明低速仍致命；安全帶可將死亡或重傷機會減半。",
    whyWrong: { B: "迎頭相撞衝力相加達 50 km/h，且氣袋絕不能取代安全帶。", C: "低速碰撞同樣致命，必須時刻扣上安全帶。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "汽車座位安全帶", page: 43, quote: "佩戴安全帶可將死亡或重傷的機會減半……如果兩輛時速25公里的汽車迎頭相撞，產生的衝力會高達時速50公里，相等於一個人從三樓窗口墮下而頭部首先著地的衝力。" },
    memoryHook: "25＋25 迎頭撞＝50 km/h（三樓跌落嚟）；扣安全帶＝死傷風險減半。"
  },
  {
    id: "q208",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駕駛前若因身體不適需服食藥物，或在駕駛時感到傷風、情緒欠佳，應該怎樣做？",
    options: {
      A: "服用任何非處方成藥均不會觸犯藥後駕駛罪行",
      B: "傷風屬小毛病，只要沒喝酒便可照常高速駕駛",
      C: "即使只是傷風、疲倦或情緒欠佳亦足以令技術失準而不應駕駛；服藥前應先諮詢醫生、藥劑師或牙醫意見"
    },
    answer: "C",
    whyRight: "即使普通傷風、疲倦或情緒欠佳均可令駕駛失準；除指明毒品外，受任何藥物影響致無力妥當控車即屬違法。",
    whyWrong: { A: "無論處方或非處方藥，只要影響至不能妥善控制車輛即屬違法。", B: "守則明言即使只是傷風也足以使駕駛技術失準。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "駕駛車輛／藥駕和毒駕", page: 41, quote: "即使只是傷風，也足以使你駕駛技術失準……你也不得在受任何藥物影響、而其程度達到使你沒有能力妥當地控制汽車的情況下，駕駛汽車……應諮詢醫護專業人員（包括醫生、藥劑師或牙醫）的意見。" },
    memoryHook: "傷風、眼瞓、心情差都唔好揸；食藥先問醫生／藥劑師，影響控車照樣犯法。"
  },
  {
    id: "q209",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「安全氣袋」的防護原理與注意事項，下列哪項正確？",
    options: {
      A: "氣袋在任何翻車或輕微碰撞中都會必定彈出，足以保護未扣安全帶的乘客",
      B: "可在儀錶板氣袋出口上方擺放手機架及裝飾公仔",
      C: "氣袋只在若干碰撞下才發揮作用，彈出力度極猛，切勿靠近氣袋出口或在氣袋與座位之間放置任何物品"
    },
    answer: "C",
    whyRight: "氣袋僅作輔助且只在特定碰撞發揮作用；切勿在氣袋出口上或與座位之間放任何物件，免彈出時變凶器擊傷。",
    whyWrong: { A: "翻車等情況下氣袋未必發揮作用，只有安全帶能給予全天候最佳保護。", B: "嚴禁在氣袋彈出位置上放任何物品。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "安全氣袋", page: 46, quote: "氣袋只會在若干碰撞情況下才會發揮作用……不應在氣袋彈出位置上或氣袋與你座位之間放置任何物品，以免在氣袋彈出時被物品擊傷。" },
    memoryHook: "氣袋只係拍檔、唔係替身；出口位絕唔擺雜物、BB 背籃必放後座。"
  },
  {
    id: "q210",
    category: "driver_safety",
    type: "text",
    trapTag: "數字",
    prompt: "接載 12 個月以下嬰兒，如該便提式嬰兒床「不屬」專用於汽車的款式且無法縛緊在後座時，守則建議應如何安置？",
    options: {
      A: "放在車廂底板上夾於前後座之間，用摺好的毛氈墊平底板或固定，並加上蓋子防嬰兒拋出（若放後座橫放則嬰兒頭部應在車中心位置）",
      B: "把嬰兒床直接放在車尾行李箱內",
      C: "放在前座乘客位上並用普通安全帶壓過嬰兒床面"
    },
    answer: "A",
    whyRight: "按 2020 年版守則第 45 頁，非車用嬰兒床放後座應橫放使嬰兒頭部朝向車中心；如無法縛緊後座，可置底板夾於前後座間以毛氈固定並加蓋。【2025 年 11 月 1 日新例提示】私家車接載 8 歲以下且身高未達 1.35 米兒童（包括嬰兒）在法例上均須使用認可兒童束縛設備，缺乏足夠兒童座椅並非免責辯護。",
    whyWrong: { B: "車尾箱絕不可載人。", C: "切勿放在前座（尤其設有氣袋的座位）。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "確保兒童乘車安全", page: 45, quote: "如不屬專用於汽車的嬰兒床，應把嬰兒床橫放於車內，嬰兒頭部應在車中心位置……如無法縛緊於後排座位，該嬰兒床應放在車廂底板上，夾於前後座之間，用摺好的毛氈墊平底板或固定嬰兒床。" },
    memoryHook: "2020 守則考點：非車用嬰兒床橫放後座頭向中心，縛唔實夾前後座底板＋毛氈＋加蓋。（註：2025.11.1 起私家車 <8 歲且 <1.35m 法定必用認可兒童束縛設備）"
  },
  {
    id: "q211",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果接載多名兒童乘搭別人的私家車，而車上沒有足夠的兒童束縛設備時，該怎樣處理？",
    options: {
      A: "讓兒童完全不扣安全帶坐在後座",
      B: "讓兩名兒童共用同一條安全帶",
      C: "寧可讓兒童使用一般的安全帶，也勝於完全不使用安全帶"
    },
    answer: "C",
    whyRight: "按 2020 年版守則第 45 頁，缺乏足夠兒童束縛設備時寧可用一般安全帶也勝於完全不用，且絕不可二人共用一條安全帶。【2025 年 11 月 1 日新例提示】私家車接載 8 歲以下且身高未達 1.35 米兒童在法例上均必須使用認可兒童束縛設備，車上缺乏足夠兒童座椅並非免責辯護。",
    whyWrong: { A: "完全不扣安全帶在碰撞時會被拋出或重創。", B: "任何情況下均不可兩人或多人共用一條安全帶。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第九章", section: "確保兒童乘車安全", page: 45, quote: "在這種情形下，寧可讓兒童使用一般的安全帶，也勝於完全不使用安全帶。" },
    memoryHook: "2020 守則考點：無足夠兒童座椅寧用普通安全帶好過無帶，嚴禁兩人共用一條！（註：2025.11.1 起私家車 <8 歲且 <1.35m 法定必用認可兒童束縛設備，唔夠位非免責辯護）"
  },
  {
    id: "q212",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「暫准駕駛期」（P 牌）內，如觸犯會被記違例駕駛分數的交通違例事項，或違反 P 牌任何限制（如超逾 70 km/h 或無掛 P 牌），一經定罪有何後果？",
    options: {
      A: "只需繳付定額罰款，完全不影響暫准駕駛期",
      B: "只會收到口頭警告",
      C: "暫准駕駛期將予延長，甚至暫准駕駛執照會被取消"
    },
    answer: "C",
    whyRight: "P 牌期內犯記分罪行或違反 P 牌限制（掛牌、70 km/h、三線快路最右線、電單車載客），定罪後會延長暫准期甚至取消執照。",
    whyWrong: { A: "除罰款外還會延長暫准期或取消執照。", B: "一經定罪即有法定延長或取消牌照後果。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "暫准駕駛執照計劃", page: 48, quote: "在暫准駕駛期內，如觸犯任何會被記違例駕駛分數的道路交通違例事項，或違反上述任何限制，一經定罪，暫准駕駛期將予延長，甚至暫准駕駛執照會被取消。" },
    memoryHook: "P 牌期間犯規（記分或違 P 牌限）＝延長 P 牌期，重則直接 Cancel 牌！"
  },
  {
    id: "q213",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於學習駕駛私家車或輕型貨車（學牌），下列哪項規定正確？",
    options: {
      A: "未考獲暫准駕駛執照前，不可在沒有「持牌駕駛教師」指導下駕駛，一般不可載客，且不得駛入快速公路或禁學車時段／路段",
      B: "學習駕駛人可在深夜無車時駛上快速公路練習高速行車",
      C: "領取學習駕駛執照後，只要掛上「學」字牌便可由持有正式牌照的朋友陪同練車"
    },
    answer: "A",
    whyRight: "私家車／輕貨學牌必須由持牌駕駛教師指導、掛學牌、一般禁載客、只可於規定時段駕駛且禁入快速公路。",
    whyWrong: { B: "任何時段學習駕駛人均不可駛入快速公路（無運輸署書面批准）。", C: "私家車學牌必須由「持牌駕駛教師」指導（不可由普通親友陪同）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "駕駛教育 — 學習駕駛", page: 47, quote: "除非你在筆試和路試及格後取得暫准駕駛執照，否則不可在沒有持牌駕駛教師指導下駕駛……學習駕駛人不可駛入快速公路……一般不可載客。" },
    memoryHook: "私家車學牌必跟持牌師傅（電單車學牌經強制課後先可自練）；一律禁快路禁載客。"
  },
  {
    id: "q214",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在甚麼情況下，違例駕駛分數會在「違例當日」被記分？",
    options: {
      A: "只於接獲運輸署通知書半年後才開始計算",
      B: "只限被法庭監禁的個案",
      C: "觸犯表列違例事項並被法庭定罪，或就該事項負上繳付定額罰款的法律責任時"
    },
    answer: "C",
    whyRight: "觸犯表列違例事項經法庭定罪，或須繳付定額罰款，即於「違例該日」被記相應分數（以 2 年期滾動計算）。",
    whyWrong: { A: "記分日期以「違例該日」計，而非交罰款或收信日期。", B: "定額罰款違例（如衝紅燈、超速）毋須監禁亦會記分。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "違例駕駛記分制度", page: 48, quote: "駕駛人如觸犯任何表列違例事項，而就該事項 — 被法庭定罪；或 — 而負上繳付定額罰款的法律責任，即須在違例該日被記分。" },
    memoryHook: "記分以「違例當日」起計兩年：定罪或負定額罰款責任都會記分。"
  },
  {
    id: "q215",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "上車前及開車前應先做哪些基本安全準備？",
    options: {
      A: "只要坐上駕駛座看車內後視鏡便可完全看清車後地面，不必上車前察看",
      B: "寵物可自由坐在司機大腿上或把頭伸出車窗",
      C: "上車前先察看車周特別是車後盲點有否兒童或障礙物；上車後關妥車門（兒童坐後座鎖上兒童保險鎖），妥善安置寵物免騷擾駕駛"
    },
    answer: "C",
    whyRight: "上車前應環視車周防兒童在車後盲點；上車後鎖妥兒童保險鎖、安置好寵物、並先熟悉陌生車輛操控器。",
    whyWrong: { A: "上車後車尾下方屬盲點，極難看到矮小幼童或障礙物。", B: "寵物必須安置妥當免騷擾駕駛，除非有人牽引勿讓牠走出車外。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "開車前應注意的事項", page: 49, quote: "上車前，應先察看四周……尤須看清楚有沒有兒童在附近，亦應特別注意車後的「盲點」……車門如裝有兒童保險鎖，在兒童上車後，便須鎖上……把寵物安置妥當。" },
    memoryHook: "開車前望車底車尾防細路、鎖兒童鎖、安頓好寵物。"
  },
  {
    id: "q216",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在法例上，怎樣的駕駛行為會被視為「危險駕駛」？",
    options: {
      A: "駕駛方式遠遜於及格而謹慎駕駛人所期望的水平，且對及格而謹慎駕駛人而言該方式屬危險是顯然易見的",
      B: "偶爾忘記關掉方向指示燈即必定構成危險駕駛",
      C: "只有在已經造成嚴重人命傷亡後才可構成危險駕駛"
    },
    answer: "A",
    whyRight: "危險駕駛以客觀標準界定：遠遜於及格謹慎司機水平，且顯然易見屬危險（不須等到造成傷亡才構成）。",
    whyWrong: { B: "未謹慎專注顧及他人屬「不小心駕駛」，危險駕駛門檻是「遠遜於水平且顯然危險」。", C: "即使未發生碰撞，只要駕駛方式客觀顯然危險已屬危險駕駛。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "危險駕駛和不小心駕駛", page: 52, quote: "你駕駛汽車的方式，遠遜於一個及格而謹慎的駕駛人會被期望達到的水平；以及對一個及格而謹慎的駕駛人而言，你以該方式駕駛汽車屬危險是顯然易見的。" },
    memoryHook: "危險駕駛兩關鍵字：「遠遜於及格謹慎水平」＋「顯然易見屬危險」。"
  },
  {
    id: "q217",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在窄路、迂迴道路或尾隨車龍繁多的道路上駕駛較慢車輛時，正確禮讓態度是？",
    options: {
      A: "準備隨時找機會駛離車道或駛往路旁減速停車，以便讓尾隨較快車輛安全超前",
      B: "堅持按自己慢速行駛，完全不必理會後方車龍",
      C: "故意靠向道路中央防止後車超車"
    },
    answer: "A",
    whyRight: "車速太慢造成車龍同樣惹人煩躁及增生危險，應找機會駛往路旁讓尾隨較快車輛超前。",
    whyWrong: { B: "長期阻礙後車易誘發他人危險超車。", C: "阻擋超車屬惡劣態度，極易導致碰撞。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "駕駛時應注意的事項", page: 50, quote: "如察覺尾隨有很多車輛，應找機會駛離車道或駛往路旁，以便讓尾隨的車輛超過。" },
    memoryHook: "唔好開太慢頂死後面：見尾隨車多，有機會就靠邊讓快車過。"
  },
  {
    id: "q218",
    category: "driving_skills",
    type: "text",
    trapTag: "現行新例",
    prompt: "駕駛「電動車或混合動力車輛」在街道行駛時，為何對行人須加倍留意？",
    options: {
      A: "因為車輛行駛聲量較低十分寧靜，行人可能未察覺你正在駛近而踏出馬路",
      B: "因為電動車毋須讓路給過馬路的行人",
      C: "因為電動車制動系統不能在市區使用"
    },
    answer: "A",
    whyRight: "現行守則多處強調：電動／混合動力車行駛極寧靜，行人（特別是視障人士及長者）難以憑聲響察覺，須格外小心。",
    whyWrong: { B: "任何車輛任何時候均須讓路給馬路上的行人。", C: "電動車制動系統正常運作，核心風險是行車聲量過低。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第五章", section: "行人 — 注意行人", page: 58, quote: "駕駛較寧靜的車輛，例如電動或混合動力車輛時，由於車輛聲量較低，行人可能不察覺你正在駛近，因此尤須小心。" },
    memoryHook: "電動／混能車太靜，行人聽唔到聲，行市區／停車場必加倍留神！"
  },
  {
    id: "q219",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當你準備在路口「轉左」，而左前方有騎單車者正在行駛時，正確做法是？",
    options: {
      A: "響號迫使單車停上行人路讓你先轉",
      B: "加速超越單車後立即在其前面切入左轉",
      C: "不要在轉左前超越單車，而應跟隨其後轉彎；並留意轉左時會否有單車或電單車從左後方駛至"
    },
    answer: "C",
    whyRight: "切勿在轉左前爬單車頭再截斷其去路，應跟在單車後面轉左，並在轉左前檢查左後方防單車／電單車切入。",
    whyWrong: { A: "不可響號趕單車上行人路（行人路禁騎單車）。", B: "爬頭即切左極易將單車撞倒或逼撞路邊石。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "騎單車者", page: 60, quote: "不要在轉左前超越單車，而應跟隨其後轉彎……應留意騎單車者可能會從後駛至，出現在你與路邊之間。" },
    memoryHook: "轉左遇單車＝跟喺後面轉，絕不爬頭閘單車！"
  },
  {
    id: "q220",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「一般雙線雙程道路」上，若要超越停泊在你左邊路旁的車輛或障礙物，誰享有優先權？",
    options: {
      A: "應先讓路給迎面駛來的車輛",
      B: "因為障礙物在你那邊，迎面車輛必須停下讓你先越過",
      C: "車速較高的一方優先通過"
    },
    answer: "A",
    whyRight: "障礙物在你的行車線一方，須借用對面線繞過，因此必須先讓路給正常行駛的迎面來車。",
    whyWrong: { B: "恰恰相反，障礙物在你一邊時是你須讓路給對頭車。", C: "道路優先權絕非取決於車速高低。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "超車（俗稱「扒頭」）", page: 56, quote: "在一般雙線行車的道路上，如要超越道路左邊停泊的車輛或其他障礙物，應先讓路給迎面駛來的車輛。" },
    memoryHook: "障礙物喺你嗰邊＝你先讓對頭車過，清晒先借線繞過。"
  },
  {
    id: "q221",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "以下哪種地點或情況屬於守則列明「不應超車」的高危位置？",
    options: {
      A: "有明確右轉前車打右燈、而左邊空闊無阻且不入巴士線時",
      B: "視野完全清晰無來車的雙線分隔車路右線",
      C: "在轉角、彎路、坡頂、路口、路面收窄處、駛近行人過路處或電車站時"
    },
    answer: "C",
    whyRight: "看不清前路（轉角、彎路、坡頂）或易爭路處（路口、收窄、過路處、電車站、白斜線區）均不應超車。",
    whyWrong: { A: "前車打右燈且左邊空闊不入巴士線時，屬容許從左方通過的例外。", B: "視野清晰且安全時可在分隔車路右線超車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "超車 — 切勿超車", page: 57, quote: "在下列情況下，不應超車：看不清前面較遠的路面情況……例如在轉角、彎路或坡頂……在路口、路面收窄的地方、或在駛近行人過路處的時候……駛近電車站的時候。" },
    memoryHook: "「盲」（彎角坡頂）同「爭」（路口過路處收窄電車站）一律唔扒頭！"
  },
  {
    id: "q222",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "跟隨大型貨車或巴士並準備超車時，與大型車保持較遠跟車距離有甚麼重要好處？",
    options: {
      A: "沒有好處，貼近大型車車尾反而更容易看清迎面來車",
      B: "可避免大型車行駛時產生的湍流完全消失",
      C: "可縮小自己的視野盲點範圍，更清楚看見前面較遠路面，並減低被濺起水花阻礙視線的機會"
    },
    answer: "C",
    whyRight: "拉遠與大型車距離能大大縮小盲點、看清前方遠處路況、提早觀察迎面來車，並避開雨天濺水。",
    whyWrong: { A: "太貼近大型車會令視野完全被遮擋（盲點範圍極大）。", B: "越過重型車時仍須小心強氣旋湍流（特別是小車、電單車及單車）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "超越大型車輛", page: 56, quote: "如太接近前面的大型車輛，便不能看清楚前面較遠的路面……與前車距離較遠，便可以更清楚看到前面的道路情況。" },
    memoryHook: "跟大車留遠啲＝盲點細啲、視野闊啲、唔怕濺水花。"
  },
  {
    id: "q223",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當「的士或公共小型巴士」在你前方行駛時，駕駛人為何應預留較大安全空間？",
    options: {
      A: "這些車輛在市區不時要上落客，可能會突然停車或切入其他行車線",
      B: "這些車輛一律不能以超過時速 30 公里行駛",
      C: "這些車輛不會配備剎車燈"
    },
    answer: "A",
    whyRight: "的士及小巴頻繁上落客，極常突然停車或切線，預留充足空間可避免突然急剎或追尾。",
    whyWrong: { B: "公共小巴限速可達 80 km/h，並非限 30 km/h。", C: "所有汽車均須配備正常運作的停車燈。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "其他道路使用者 — 的士及公共小型巴士", page: 61, quote: "這些車輛不時要上落客，可能會突然停車，或者切入其他行車線。你應預留足夠空間……也可避免突然剎車。" },
    memoryHook: "見紅綠小巴、的士留多位：隨時急停接客或突然切線！"
  },
  {
    id: "q224",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在快速公路上行駛，若遇上四周噪音很大或下大雨，需要讓前方或旁邊駕駛人察覺你的存在時，守則建議採用哪種方式較好？",
    options: {
      A: "閃動車頭燈通常會較響號有效，同時你亦要留意他人的閃燈警告",
      B: "長時間不斷響號直至前車切線",
      C: "把車輛緊貼前車車尾示意"
    },
    answer: "A",
    whyRight: "在高速嘈雜或大雨環境中，其他司機未必聽到響號，閃動車頭燈通常較易讓對方察覺你的存在。",
    whyWrong: { B: "高速雨天噪音大，響號不易被聽到，且不可濫用響號催促。", C: "高速跟車太貼是快速公路首尾相撞主因。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "快速公路及主幹路", page: 72, quote: "如四周噪音大，特別是在雨天，其他駕駛人可能無法聽見你發出的響號。如需要讓他們知道你的存在，閃動車頭燈通常會較好。" },
    memoryHook: "快路大雨太嘈聽唔到咇咇＝閃大燈提佢留意你更有效。"
  },
  {
    id: "q225",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果行車時有「其他車輛超前並切入你車前的空位」，正確反應是？",
    options: {
      A: "立即猛打軚盤切入另一行車線反超車",
      B: "減慢車速，重新與該車建立安全跟車距離",
      C: "立即加速緊貼該車車尾以示不滿"
    },
    answer: "B",
    whyRight: "前車切入會令車距驟減，應冷靜減速回復至少兩秒（惡劣天氣四秒）安全距程。",
    whyWrong: { A: "未經察看及發信號突然轉線會引發側面碰撞。", C: "緊貼車尾極易釀成追尾意外，亦屬惡劣駕駛態度。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "應與前車保持多少距離", page: 55, quote: "如果有車輛超前，切入你車前的空位，便應減慢車速，再與前車回復安全距離。" },
    memoryHook: "被人 cut 入車頭＝唔鬥氣，輕收油拉返開兩秒安全距離。"
  },
  {
    id: "q226",
    category: "weather_parking",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在「大霧或薄霧」天氣下駕駛時，下列哪項做法屬於錯誤？",
    options: {
      A: "減慢車速，確保能隨時在前方視線範圍內停車",
      B: "只緊盯並跟隨前車的車尾燈，或加速企圖擺脫尾隨緊貼的車輛",
      C: "亮着車頭大燈／霧燈及尾燈，並視需要開動擋風玻璃水撥"
    },
    answer: "B",
    whyRight: "大霧時不可只依賴前車尾燈（對方可能停車或開得太快），更切勿加速擺脫尾隨車。",
    whyWrong: { A: "視線範圍內能停定是大霧安全行車核心原則。", C: "大霧開大燈、霧燈、尾燈及清潔玻璃均屬正確做法。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "大霧及薄霧", page: 87, quote: "切勿只留意其他車輛的車尾燈，這樣做並不完全可靠……切勿加速，企圖擺脫緊隨的車輛。" },
    memoryHook: "大霧三忌：勿只跟尾燈、勿加速甩尾隨車、清天勿開霧燈。"
  },
  {
    id: "q227",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在猛烈陽光下佩戴太陽眼鏡駕駛時，進出隧道或夜間行車應注意甚麼？",
    options: {
      A: "戴着太陽眼鏡駛入隧道初時可能看不見東西，且夜間或能見度低時不應使用太陽眼鏡",
      B: "陽光猛烈令標誌內容看不清時，完全無法辨認標誌類別",
      C: "夜間佩戴深色太陽眼鏡可完全防止迎面高燈目眩"
    },
    answer: "A",
    whyRight: "戴太陽眼鏡入隧道會因明暗劇變短暫看不清，夜間／低能見度不應用太陽眼鏡；標誌背光時可憑其形狀辨認。",
    whyWrong: { B: "香港標誌按形狀分類（八角停車、倒三角讓路、三角警告、圓形指令），背光仍可辨認。", C: "守則明訂夜間或能見度低時不應佩戴太陽眼鏡（電單車亦勿戴有色面罩）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "駕駛車輛／猛烈的陽光", page: 86, quote: "如戴着太陽眼鏡，駛入隧道時，初時可能會看不見東西。（第41頁）但在夜間或能見度低時，便不應使用。" },
    memoryHook: "太陽眼鏡：猛太陽戴得、入隧道要留神、夜晚低能見度切勿戴。"
  },
  {
    id: "q228",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "「滂沱大雨」導致路面積水時，高速駛經積水會帶來哪些嚴重危險？",
    options: {
      A: "只會弄濕車身，對性能良好的新輪胎完全沒有影響",
      B: "應加速衝過積水以減少車輪浸水時間",
      C: "即使良好輪胎亦可能無法緊附路面令轉向或剎車失控，水花亦會阻擋視野、影響制動、令引擎停頓及濺濕行人"
    },
    answer: "C",
    whyRight: "積水易造成水滑失控（即使新胎亦然），並會阻視野、令剎車濕水、引擎死火及濺濕行人他車，必須慢駛。",
    whyWrong: { A: "守則明言即使性能良好的輪胎在積水路面亦可能完全失控。", B: "高速衝水會令水滑更嚴重且易令引擎入水熄火。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "下雨和濕滑的路面", page: 87, quote: "滂沱大雨會使路面積水。即使性能良好的輪胎，也不能緊附着這樣濕滑的路面，車輛轉向或剎車，可能完全失控。駛經積水的地方時，應該慢駛。" },
    memoryHook: "見積水必收慢（過淺水慢車保持足夠轉速防死火），過完即試剎車！"
  },
  {
    id: "q229",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「大霧瀰漫」或燈光昏暗時，如無可避免必須在路上泊車，應怎樣處理車燈？",
    options: {
      A: "大霧時在路上泊車應把所有車燈完全熄滅以免耗電",
      B: "正常泊車應關掉所有車燈，但如果大霧瀰漫則應經常亮着車燈讓其他司機看見",
      C: "在路上泊車任何天氣都必須開着高燈"
    },
    answer: "B",
    whyRight: "平常離開泊妥的車輛應關掉所有車燈；但大霧瀰漫下在路上泊車特別危險，應經常亮着車燈示警。",
    whyWrong: { A: "大霧在路邊熄燈泊車極容易被尾隨車輛撞上。", C: "開高燈會令其他駕駛人目眩，平時泊車亦應關燈。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "泊車", page: 95, quote: "燈光昏暗或大霧時，在路上泊車特別危險。如果大霧瀰漫，應經常亮着車燈。" },
    memoryHook: "平時離車關晒燈；大霧迫於路上泊車要長着燈保安全。"
  },
  {
    id: "q230",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "以下哪個地點屬於守則列明「禁止泊車」的地點？",
    options: {
      A: "收費錶非收費時段的私家車指定泊車位內",
      B: "劃有白線且並無其他車種限制的指定泊車位",
      C: "妨礙建築物／停車場車輛通道、妨礙通往消防龍頭的地方，或車輛部分停在行人路、路肩或安全島上"
    },
    answer: "C",
    whyRight: "阻礙通道、擋住消防龍頭、車身全部或部分停上行人路／路肩／中央分隔帶／安全島，以及街燈距 ≤200m 非指定位，均屬禁止泊車。",
    whyWrong: { A: "非收費時段於合法指定私家車位（不逾 24 小時）准許泊車。", B: "合法泊車位內不越白線即屬准許。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "禁止泊車的地點", page: 92, quote: "下列地點，不可泊車：本身車輛全部或部分在行人路、行人徑、道路中央分隔帶、路旁、路肩或安全島；妨礙建築物或停車場的車輛通道；妨礙由行車道通往消防龍頭的地方。" },
    memoryHook: "禁泊死位：擋消防喉、擋出入口、半架騎上行人路／安全島、街燈≤200m 路邊。"
  },
  {
    id: "q231",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「在道路上停留、停候或上落貨」，下列哪組地點屬於守則勸阻「不應停留」的地方？",
    options: {
      A: "寬闊且無黃線、無路口、無阻礙視線的一般路旁",
      B: "學校出入口、醫院／消防局／警局出入口、坡頂、彎位、交通安全島對面、另一靜止車輛旁邊（雙排泊車）及遮蔽交通標誌處",
      C: "指定上落客貨區內且未超時"
    },
    answer: "B",
    whyRight: "學校／醫院／緊急部門出入口、坡頂、轉彎、安全島對面、雙排停車、遮蔽路牌及使雙程路不足兩車同時通過處，一律不應停留。",
    whyWrong: { A: "不阻礙安全及交通、非禁區的一般路邊可作短暫上落。", C: "合法上落客貨區正是供上落客貨之用。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "不應停留的地點", page: 93, quote: "不要把車輛停留在：學校出入口或附近（即使只是上落學童）……會遮蔽交通標誌……坡頂或附近；交通安全島對面；另一靜止不動車輛的旁邊；醫院出入口；警局、消防局及救護車站出入口。" },
    memoryHook: "勿停留位記四字：校醫警消、彎坡窄島、雙排擋牌。"
  },
  {
    id: "q232",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "車輛若在道路上「中途壞車」，關於就地修理及離開壞車的規定，哪項正確？",
    options: {
      A: "切勿在道路上進行維修（除非為避免移走受不必要延誤而必需）；除前往求助外，不可把壞車停在路上不顧而去",
      B: "可把壞車長期留在路邊數天待有空再找拖車",
      C: "可直接在行車道中央拆換輪胎及大修引擎"
    },
    answer: "A",
    whyRight: "除為避免移走受不必要延誤而必需外，勿在路上維修；除前往求助外，絕不可棄壞車於路上不顧而去。",
    whyWrong: { B: "切勿把壞車長時間留在路邊而不予處理。", C: "在行車道（特別是隧道及快速公路）修車換胎極度危險且違法。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "不應停留的地點", page: 93, quote: "如中途壞車，切勿在道路上進行車輛維修、修理或其他工作，除非這是為了避免該車輛的移走受不必要的延誤而必需進行的。此外，除非前往求助，否則不可把壞車停在路上，不顧而去。" },
    memoryHook: "壞車勿就地大修（除非為方便拖走），除求助外不可棄車唔理。"
  },
  {
    id: "q233",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "「不准停車」限制區有時會出現「黃底」與「白底」兩種牌面，兩者分別有何用途？",
    options: {
      A: "黃底適用於私家車，白底只適用於貨車",
      B: "黃底代表全日 24 小時，白底代表只限夜間",
      C: "黃底標誌用於標示限制區的「開始」與「終止」；白底標誌（重複標誌）則每隔一段路程設於限制區內作提醒"
    },
    answer: "C",
    whyRight: "「不准停車」限制區的起點與終止設黃底標誌，沿途區內每隔一段路程設白底重複標誌提醒駕駛人。",
    whyWrong: { A: "顏色與適用車種無關，特定車種禁令會另加車輛圖案。", B: "兩者分別在於「起終點」與「中途重複提醒」，非時段長短。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "不准停車限制區", page: 90, quote: "「不准停車」限制區的開始和終止，都設有這種黃底標誌；沿途每隔一段路程，會有白底標誌（重複標誌），以提醒駕駛人該限制。" },
    memoryHook: "禁區牌：黃底＝頭尾（起止）；白底＝中間重複提醒。"
  },
  {
    id: "q234",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "為何「快速公路」沿途並不會設置「不准停車」的交通標誌或黃線標記？",
    options: {
      A: "因為快速公路只禁止貨車停車，私家車獲豁免",
      B: "因為快速公路容許私家車在路肩自由短暫停車看風景",
      C: "因為一經駛入快速公路，在正常交通情況下便法定一律不准停車或泊車，毋須再另設禁停標誌或黃線"
    },
    answer: "C",
    whyRight: "快速公路起點本身已涵蓋法例禁停規定，除中途壞車或緊急事故外一律不准停車或泊車，故不設黃線或禁停牌。",
    whyWrong: { A: "所有車輛在快速公路均不得隨意停車。", B: "路肩只供緊急事故或壞車使用，不可隨意停車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "不准停車限制區", page: 90, quote: "快速公路不設「不准停車」的交通標誌或黃線標記，因為你一經駛入快速公路，在正常交通情況下便不准停車。" },
    memoryHook: "入咗快速公路就自動全日禁停，所以唔會畫黃線或豎禁停牌！"
  },
  {
    id: "q235",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當你停在支路路口等待駛入大路，看見大路上從右方駛近的車輛亮起了「左轉方向燈」，應該怎樣做？",
    options: {
      A: "立即駛出大路，因對方必定會提早左轉入支路",
      B: "不要以為對方必定會轉左，應稍候片刻確定該車真正減速轉彎去向後才安全駛入",
      C: "響號確認後搶先切入大路"
    },
    answer: "B",
    whyRight: "他車司機可能忘記關燈或打算在下一個路口才轉左，必須稍候確定其真正去向才可駛出。",
    whyWrong: { A: "對方可能只是忘關指揮燈或於下個路口左轉，冒然駛出必釀攔腰碰撞。", C: "支路出大路絕無優先權。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "路口", page: 74, quote: "當等待進入路口時，不要以為從右邊駛來，並且發出左轉信號的車輛，就一定會轉左。應稍候片刻，以確定該輛車的去向才可駛入。" },
    memoryHook: "大路車打左燈唔代表一定轉入嚟（可能忘記關燈），睇定佢真轉先出！"
  },
  {
    id: "q236",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在路口準備「轉左」及「轉右」時，正確的靠線位置與轉彎軌跡是？",
    options: {
      A: "轉左應盡量靠左且不讓車身向右擺出；轉右應靠車路分界線左邊（或右轉線），盡量讓出左邊空位，轉彎時不可切過彎角",
      B: "無論轉左或轉右都應留在行車線正中位置",
      C: "轉左前先向右擺出車身借位；轉右時直接切過彎角縮短距離"
    },
    answer: "A",
    whyRight: "私家車轉左靠左勿向右擺；轉右靠分界線左方讓出左邊空位給直行車，且轉彎不可切角。",
    whyWrong: { B: "靠分界線左邊可讓左邊騰出空間給後方直行車通過。", C: "向右擺出易撞及鄰線車輛，轉右切彎角易與該路駛出的車輛迎頭相撞。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "路口 — 轉左／轉右", page: 74, quote: "轉左……盡量靠左行駛。轉彎時，不要讓車身向右方擺出……轉右……駛近車路分界線的左邊……盡可能讓出左邊空位……轉彎時，不可切過道路的彎角。" },
    memoryHook: "轉左靠左唔擺右；轉右貼中線讓左空位，絕不「偷雞切彎角」。"
  },
  {
    id: "q237",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駛近路口並已經「駛過停車線或讓路線」之後，如果突然發現自己選錯了行車線箭嘴方向，應該怎樣做？",
    options: {
      A: "立即在路口中央停定打燈強行橫越幾條線",
      B: "立即倒車退回停車線後面重新排隊",
      C: "必須依照該行車線上箭嘴的方向行駛，切勿突然或在最後一刻才轉換行車線"
    },
    answer: "C",
    whyRight: "駛過停車線或讓路線後，必須跟隨該行車線箭嘴方向行駛，不要臨時硬切線，行錯路待安全處再繞行。",
    whyWrong: { A: "路口內突然停車切線極易造成連環碰撞。", B: "路口倒車極危險。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "路口在前", page: 76, quote: "在駛過「停車」線或「讓路」線後，你必須依照行車線上箭嘴的方向行駛。不要突然或在最後一刻才轉換行車線。" },
    memoryHook: "過咗停車線／讓路線就「將錯就錯」跟箭嘴行，絕不臨尾硬 cut！"
  },
  {
    id: "q238",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當交通燈路口附有「單一方向的綠色箭嘴燈號」亮起，但你並不打算駛往該箭嘴所示方向時，應怎樣做？",
    options: {
      A: "可駛入該線停車等待旁邊直行綠燈亮起",
      B: "可以無視箭嘴方向直接直行通過",
      C: "切勿駛入該箭嘴所示的行車線以免阻礙後方依箭嘴行駛的車輛"
    },
    answer: "C",
    whyRight: "除非有意駛往該綠色箭嘴所示方向，否則切勿駛入該線，免阻礙專線轉向車輛。",
    whyWrong: { A: "停在專線等候會令整條綠色箭嘴線癱瘓。", B: "箭嘴燈號只准許駛往箭嘴所示方向，直行等同衝紅燈。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "有交通燈的路口", page: 78, quote: "交通燈的綠色箭嘴燈號亮着時，除非你有意駛向箭嘴所示的方向，否則切勿駛入該線。" },
    memoryHook: "唔轉嗰個方向就唔好排綠色箭嘴線，咪頂住後面過燈。"
  },
  {
    id: "q239",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有「右轉袋口位」且同時設有右轉綠色箭嘴燈的路口，當「全綠燈亮起、但右轉箭嘴熄滅」時，右轉車輛可以怎樣做？",
    options: {
      A: "只要全綠燈亮着即代表迎面車輛必定停下，可直接加速右轉",
      B: "可前進至右轉袋口位等候，待迎面車輛之間有安全空隙時才右轉；當右轉箭嘴同時亮起則代表迎面車已亮紅燈停止，安全時可右轉",
      C: "右轉箭嘴熄滅時，即使全綠燈亮着亦不可駛出停車線"
    },
    answer: "B",
    whyRight: "全綠燈亮而右轉箭嘴未亮時，可出袋口位讓迎面車並等空隙右轉；右轉箭嘴亮起則表示對面已轉紅燈。",
    whyWrong: { A: "全綠燈（無右轉箭嘴）時迎面車輛亦屬綠燈，必須讓迎面車。", C: "全綠燈亮起已容許駛出至右轉袋口位等候。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "交通燈", page: 106, quote: "當全綠色燈號亮起，而右轉箭嘴燈號熄滅，右轉車輛可前進至右轉袋口位等候，直至迎面駛來車輛之間有安全空隙……當右轉箭嘴燈號也同時亮起，表示迎面車輛已按其紅色燈號指示停止前進。" },
    memoryHook: "全綠燈無箭＝出袋口讓對頭車；全綠＋右轉綠箭＝對頭已紅燈，安全可轉！"
  },
  {
    id: "q240",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果在沒有豎立「讓路」標誌的一般路口（如小路出大路、或主路右轉），按照基本道路規則誰須讓路？",
    options: {
      A: "從小路或通道駛出的車輛須讓路給大路上的車輛；右轉的車輛須讓路給迎面而來的車輛",
      B: "從小路駛出的車輛享有優先權",
      C: "右轉的車輛優先於迎面直行車輛"
    },
    answer: "A",
    whyRight: "無標誌時依一般道路規則：小路／通道讓大路；右轉車讓迎面直行或左轉車輛。",
    whyWrong: { B: "大路直行車享有優先權，小路出大路必讓。", C: "右轉須橫越對頭車道，必讓迎面來車。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "安全駕駛，禮讓他人 — 沒有讓路", page: 51, quote: "如果路旁沒有竪立「讓路」標誌，按照一般道路規則，從小路或通道駛出的車輛，須讓路給在大路上的車輛；右轉的車輛，則須讓路給迎面而來的車輛。" },
    memoryHook: "無牌路口鐵則：小路讓大路、右轉讓直行（迎面車）。"
  },
  {
    id: "q241",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果單程路口的「單程行車」標誌不幸被停泊車輛遮蔽，駕駛人可從甚麼線索察覺自己正身處單程路？",
    options: {
      A: "街上所有停泊車輛通常會全部面向同一方向，且路面行車線箭嘴亦可提供提示",
      B: "單程路兩旁必定髹上雙黃實線",
      C: "單程路路中央必定設有雙白實線"
    },
    answer: "A",
    whyRight: "單程路上停泊車輛一般依行車方向停泊，全部面向同一方向，配合路面行車線箭嘴可助辨認。",
    whyWrong: { B: "雙黃實線代表全日禁停車，與單程路無必然關係。", C: "單程路不會用反方向車流分界雙白線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "單程路", page: 66, quote: "因此看看街上停泊的車輛，在單程路上它們全部都會面向同一方向，車輛通常依行車方向停泊。有時路上的行車線箭嘴，也可給你提示。" },
    memoryHook: "睇單程路隱藏線索：街邊所有泊車全部車頭向同一邊＋路面箭嘴。"
  },
  {
    id: "q242",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當你在「單程路」上打算向前直駛，而道路闊度只容納兩條行車線且無特別標記指示時，應使用哪條行車線？",
    options: {
      A: "直駛嚴禁使用右線",
      B: "直駛須騎在兩線中間行駛",
      C: "可選擇在左邊或右邊行車線行駛（左轉靠最左線、右轉靠最右線），但須提防其他車輛從左右兩邊超車或突然換線"
    },
    answer: "C",
    whyRight: "兩線單程路直行可選左線或右線，左轉靠最左、右轉靠最右；單程路（非分隔車路）車輛可能從左右任何一邊通過。",
    whyWrong: { A: "守則明言兩線單程路直駛可選左邊或右邊行駛。", B: "切勿跨線騎線行駛。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "單程路", page: 66, quote: "如欲左轉，靠最左線行駛；右轉則靠最右線行駛。如欲向前直駛……如果道路的闊度只容納兩條行車線，你可選擇在左邊或右邊行駛……在單程路上，車輛可能從左右任何一邊超車。" },
    memoryHook: "兩線單程路：左轉最左、右轉最右、直行左右皆可（防兩邊爬頭）。"
  },
  {
    id: "q243",
    category: "lanes_highways",
    type: "text",
    trapTag: "數字",
    prompt: "路旁設有「1:5」斜坡警告標誌與「1:10」斜坡警告標誌相比，哪一條斜路更陡峭？長程下坡應怎樣控制車速？",
    options: {
      A: "「1:5」（20%）比「1:10」（10%）更陡峭；下坡除短程外切勿只依賴腳掣，應維持低波行車並輕踏腳掣調節",
      B: "兩者斜度完全相同，代表斜坡長度為 5 公里與 10 公里",
      C: "「1:10」比「1:5」更陡峭；下坡應全程入空波（N 波）滑行省油"
    },
    answer: "A",
    whyRight: "斜度比率越大越陡峭（1:5＝20% 比 1:10＝10% 陡一倍）；長下坡只踩腳掣易令制動過熱失效，必須用低波輔助。",
    whyWrong: { B: "比率代表高度與水平距離之比，並非斜坡公里數。", C: "分母越小斜度越陡，且入空波滑行會失去引擎制動極危險。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第五章", section: "斜坡", page: 67, quote: "標誌上的比率表示傾斜坡度，比率越大，傾斜度越大。例如1：5（或20%）斜坡的傾斜度，較1：10（或10%）斜坡陡峭。在斜坡向下行駛時，除短程外，切勿只依賴腳掣減慢車速……應選擇和維持以低波行車。" },
    memoryHook: "1:5 (20%) 陡過 1:10 (10%)；長落斜掛低波（L/S/2）＋輕踩腳掣。"
  },
  {
    id: "q244",
    category: "lanes_highways",
    type: "text",
    trapTag: "現行新例",
    prompt: "根據現行《道路使用者守則》第 71 頁的快速公路名單，哪一條快速公路的部分路段實施「靠右駛道路」規則？",
    options: {
      A: "吐露港公路",
      B: "港珠澳大橋香港連接路部分路段（不包括觀景山隧道）",
      C: "屯門公路"
    },
    answer: "B",
    whyRight: "港珠澳大橋香港連接路部分路段（不包括觀景山隧道）為配合內地行車方向實施「靠右駛道路」規則。",
    whyWrong: { A: "吐露港公路屬一般香港靠左駛快速公路。", C: "屯門公路屬一般香港靠左駛快速公路。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第五章", section: "快速公路及主幹路", page: 71, quote: "港珠澳大橋香港連接路部分路段（不包括觀景山隧道）（此段快速公路是「靠右駛道路」，你必須充份了解及遵守有關「靠右駛道路」的法例、規則和指示）。" },
    memoryHook: "全港唯一「靠右駛」快速公路段＝港珠澳大橋香港連接路（不包觀景山隧道）。"
  },
  {
    id: "q245",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「行車隧道」內行駛，除了禁開高燈、禁響號、禁切線及不可慢於 25 km/h 外，以下哪項亦屬明文禁止？",
    options: {
      A: "備有有效標籤的車輛使用自動繳費行車線",
      B: "打開車頭低燈及冷氣",
      C: "駕駛燃油不足以駛過隧道的車輛、在隧道內更換輪胎／加油／修理、以手推車，或讓動物離開車輛"
    },
    answer: "C",
    whyRight: "隧道內嚴禁缺油駛入、換胎、加油、修車、手推車、無車載動物進入或讓動物離車，亦禁乘客身體伸出車外。",
    whyWrong: { A: "備有有效標籤可使用自動繳費行車線。", B: "隧道內開低燈行駛屬正常安全做法。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "隧道區及管制區", page: 73, quote: "切勿以手或其他方法推車；切勿使用燃油不足夠以供駛過隧道的車輛……切勿更換輪胎或車輪，或添加燃油或修理車輛……切勿讓動物離開你的車輛。" },
    memoryHook: "隧道內嚴禁：冇油入、換胎加油修車、推車、放寵物落車、掉頭倒車。"
  },
  {
    id: "q246",
    category: "signs_signals",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "香港交通標誌的「形狀與顏色系統」中，下列哪組配對完全正確？",
    options: {
      A: "圓形＝發出指令（紅邊禁制／藍底強制）；尖端向上三角形＝發出警告；長方形＝提供指示或提示",
      B: "三角形＝發出指令；圓形＝提示路線；長方形＝警告危險",
      C: "所有藍色標誌一律代表禁止，所有紅色標誌一律代表強制"
    },
    answer: "A",
    whyRight: "圓形＝限制／指令（紅邊禁制、藍底強制）；尖端向上三角＝警告；長方形＝提示／指示（八角停車、倒三角讓路為突出例外）。",
    whyWrong: { B: "把三角形（警告）與圓形（指令）的意思完全調轉。", C: "紅邊圓形是禁制，藍色圓形是強制，剛好相反。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "交通標誌系統", page: 109, quote: "圓形表示指令……禁制標誌通常髹上紅邊，表示禁止某種行動。強制標誌通常是藍色……三角形表示警告……長方形標誌主要是提供指示或提示。" },
    memoryHook: "形狀口訣：圓指令（紅禁藍強）、三角警告、長方提示。"
  },
  {
    id: "q247",
    category: "signs_signals",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "香港「預告方向標誌及方向標誌」的四種底色（藍、綠、白、黃）各自代表甚麼？",
    options: {
      A: "藍＝一般重要路線／主幹路；綠＝快速公路；白＝區內目的地；黃＝臨時路線／改道",
      B: "綠＝一般市區路；藍＝快速公路；紅＝區內目的地；白＝臨時改道",
      C: "四種底色只作美化，並無功能分別"
    },
    answer: "A",
    whyRight: "方向標誌底色：藍色一般重要路線、綠色快速公路、白色區內目的地、黃色臨時改道／短期活動路線。",
    whyWrong: { B: "綠色才是快速公路（藍是一般／主幹路），臨時改道為黃底。", C: "每種底色都有明確道路級別與用途含義。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第八章", section: "提示標誌 — 預告方向標誌", page: 110, quote: "底色通常採用藍色，但在快速公路上，有關標誌底色則採用綠色。如屬區內目的地或臨時路線，標誌底色則分別採用白色或黃色。" },
    memoryHook: "方向牌四底色：綠快路、藍主路、白區內、黃臨時改道！"
  },
  {
    id: "q248",
    category: "signs_signals",
    type: "text",
    trapTag: "現行新例",
    prompt: "路旁的「行車時間顯示系統」數值以紅、黃、綠三種顏色顯示不同交通狀況，各自代表甚麼？",
    options: {
      A: "紅色＝隧道封閉；黃色＝交通暢順；綠色＝維修中",
      B: "顏色只代表不同收費隧道，與交通快慢無關",
      C: "紅色＝交通擠塞；黃色＝行車緩慢；綠色＝交通暢順"
    },
    answer: "C",
    whyRight: "行車時間顯示器以三色提示實時路況：紅＝擠塞、黃＝緩慢、綠＝暢順。",
    whyWrong: { A: "三色直接對應擠塞、緩慢、暢順三級交通狀況。", B: "三條過海隧道是以「東、中、西」符號區分，非紅黃綠顏色。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第八章", section: "行車時間顯示系統", page: 110, quote: "展示於行車時間顯示器的數值以三種顏色顯示不同的交通狀況：紅色代表交通擠塞，黃色代表行車緩慢，綠色代表交通暢順。" },
    memoryHook: "行車時間三色一眼明：紅塞、黃慢、綠順。"
  },
  {
    id: "q249",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "路邊物件或專用杆子上的「危險標記」（#65–#67），左方、雙程不分隔車道右方、分隔車道中央帶右方分別用甚麼顏色？",
    options: {
      A: "全部劃一使用黃色",
      B: "左方＝綠色；右方＝藍色；中央帶＝紅色",
      C: "左方＝紅色；不分隔車道右方＝白色；分隔車道中央分隔帶右方＝琥珀色"
    },
    answer: "C",
    whyRight: "危險標記顏色：車道左方紅色、雙程不分隔車道右方白色、分隔車道右方中央分隔帶琥珀色。",
    whyWrong: { A: "三種位置各有明確顏色區分，助夜間辨別邊緣與中島。", B: "綠色是路口／讓車處反光路釘顏色，並非路邊左方危險標記。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第八章", section: "道路邊緣 — 危險標記", page: 62, quote: "車道的左方用紅色標記，雙程不分隔車道的右方用白色標記，而分隔車道右方中央分隔帶的標記，則是琥珀色。" },
    memoryHook: "危險標記／路釘共通記法：左邊永遠「紅」，中央分隔帶永遠「琥珀」！"
  },
  {
    id: "q250",
    category: "signs_signals",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "行車道上的「反光路釘」中，「白色」與「紅色」路釘分別標明甚麼位置？",
    options: {
      A: "白色標明車道左面邊緣；紅色標明行車線中央",
      B: "白色標明行車線或路中央；紅色標明車道左面邊緣",
      C: "紅色標明前面有衝紅燈攝影機；白色標明斑馬線"
    },
    answer: "B",
    whyRight: "反光路釘四色：白＝行車線／路中央；紅＝車道左邊緣；琥珀＝右面近中央分隔帶邊緣；綠＝路口交匯處／路旁停車處／讓車處。",
    whyWrong: { A: "把白與紅的位置調轉。", C: "反光路釘只標示行車線與車道邊緣，與攝影機無關。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第五章", section: "反光路釘", page: 62, quote: "白色路釘標明道路的行車線或路中央；紅色路釘標明車道左面邊緣；琥珀色路釘則標明車道右面近中央分隔帶的邊緣。綠色路釘則設於路口交滙處、路旁停車處或讓車處的車道邊緣。" },
    memoryHook: "路釘四色口訣：白中線、紅左邊、琥珀右中帶、綠路口避車處。"
  },
  {
    id: "q251",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在快速公路或主幹路出口前、迴旋處或收費廣場前的路面上，髹有一組間距漸密的「黃色橫條道路標記」，作用是甚麼？",
    options: {
      A: "警告前面有支路出口、迴旋處或收費廣場，提醒駕駛人減慢車速",
      B: "代表可供私家車臨停上落客",
      C: "表示行人過路處，行人可在此橫過快速公路"
    },
    answer: "A",
    whyRight: "黃色橫條道路標記（第 124 頁）用以提示支路出口、迴旋處或收費廣場在前，視覺及震動提醒減速。",
    whyWrong: { B: "快速公路及收費廣場前一律嚴禁停車上落客。", C: "快速公路嚴禁行人進入；黃色橫條非行人過路處。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "警告及提示道路標記", page: 124, quote: "黃色橫條道路標記 — 支路出口／迴旋處／收費廣場在前，減慢車速。" },
    memoryHook: "路面連續黃橫條＝快到出口／迴旋處／收費站，即刻收慢！"
  },
  {
    id: "q252",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "路面上繪有「白色斜線危險警告地帶」或「匯合／分流人字形標記」時，駕駛人應該怎樣做？",
    options: {
      A: "塞車時可駛入白色斜線區域爬頭",
      B: "切勿駛越或駛入斜線及人字形標記範圍內",
      C: "可在人字形標記內短暫停車查地圖"
    },
    answer: "B",
    whyRight: "白色斜線區及匯合／分流人字形標記用以分隔易碰撞車流或保護右轉車，切勿駛越、進入或停留。",
    whyWrong: { A: "守則明列不可為超車而駛入白色斜線區域（第 57 及 62 頁）。", C: "絕不可在人字形標記內停車或停留。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章／第八章", section: "危險警告地帶／指令道路標記", page: 125, quote: "匯合人字形標記、分流人字形標記、雙程道路的斜條交通安全島形標記 — 切勿橫越或駛進斜線範圍。" },
    memoryHook: "路面白色斜線／人字形＝禁區緩衝帶，唔好踩、唔好入、唔好停！"
  },
  {
    id: "q253",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在架空行車線信號中，當信號顯示「空白屏」或「綠色向下箭嘴」，與顯示「黃燈閃動」分別代表甚麼？",
    options: {
      A: "黃燈閃動代表車速限制提高至 110 公里",
      B: "空白屏代表信號壞了，該行車線即時封閉",
      C: "空白屏／綠向下箭＝安全情況下可繼續沿線前進；黃燈閃動＝前面有危險（如意外、受阻或惡劣天氣），須小心並準備隨時停車"
    },
    answer: "C",
    whyRight: "正常情況下架空信號可能不亮（空白屏）或亮綠向下箭代表安全沿線前進；閃黃燈表示前面有危險須準備停車。",
    whyWrong: { A: "閃黃燈是危險警告信號，必須減速警覺。", B: "空白屏屬正常開放行駛狀態（紅交叉或紅燈才表示封閉）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "行車線信號", page: 108, quote: "當綠色向下箭嘴信號燈或綠燈亮着，又或顯示空白屏時，表示在安全情況下，你可繼續沿行車線向前行駛。當黃燈閃動時，表示前面有危險……應小心駕駛，並應準備隨時停車。" },
    memoryHook: "架空燈：空白／綠向下＝可行；閃黃＝有危險準備停；綠斜箭＝換線；紅叉＝封線。"
  },
  {
    id: "q254",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當架空行車線信號亮起「綠色左下斜箭嘴」指示切往左線，但在你尚未能安全換線前，已駛抵障礙物或紅燈處時，應怎樣做？",
    options: {
      A: "在原來行車線停車等候，待情況安全才可轉換行車線",
      B: "無視紅燈直接駛越障礙物旁邊",
      C: "強行把車切入左線迫使左線車輛急剎"
    },
    answer: "A",
    whyRight: "切勿突然硬切線；若未及安全換線已到達危險、障礙物或紅燈處，須先在原線停下等候安全空檔再換線。",
    whyWrong: { B: "紅燈或紅交叉後的行車線嚴禁繼續使用。", C: "強行切線易在高速道路引發嚴重側面碰撞。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "行車線信號", page: 108, quote: "在未能安全駛離本身行車線前，如已到達有危險、障礙物或紅燈亮着之處，應在原來行車線停車等候，待情況安全才可換線。" },
    memoryHook: "見綠斜箭切唔切＝原線停低等安全先轉，絕不硬切或衝紅叉！"
  },
  {
    id: "q255",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在快速公路架空方向指示標誌上，「目的地下方的向下箭嘴」與「向上斜箭嘴」各有何行車線含義？",
    options: {
      A: "兩種箭嘴意思完全相同，純粹視安裝位置決定",
      B: "向下箭嘴代表前面有向下斜坡，向上斜箭嘴代表前面有上坡",
      C: "向下箭嘴表示須及早選定該線，通常有一條線會通往出口（大路行車線減少）；向上斜箭嘴則表示大路行車線數目不減，靠左駛離出口"
    },
    answer: "C",
    whyRight: "架空牌向下箭嘴＝行車線減線（該線直接引往出口）；向上斜箭嘴＝大路行車線不減，另闢減速線通往出口。",
    whyWrong: { A: "兩者區分了大路會否「減線」，對提早選線十分關鍵。", B: "斜坡警告是以紅邊三角形配傾斜比率（如 1:8）標示。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "駛入主幹路／快速公路", page: 83, quote: "在目的地下面的箭嘴……通常表示有一條行車線會通往出口，大路的行車線將會由四條減為三條……向上斜的箭嘴標誌指示出口目的地……表示大路行車線不減。" },
    memoryHook: "架空牌：向下直箭＝嗰條線會直接出走（大路減線）；向上斜箭＝大路唔減線。"
  },
  {
    id: "q256",
    category: "signs_signals",
    type: "text",
    trapTag: "數字",
    prompt: "香港「主要幹線編號系統」共有多少條主要幹線？當中一、二、三號幹線及九號幹線分別代表甚麼走向？",
    options: {
      A: "共 12 條；9 號為港島南區幹線",
      B: "共 8 條；全部均為東西走向",
      C: "共 10 條；1、2、3 號為三條過海南北幹線（按紅隧、東隧、西隧開通次序）；9 號為新界環迴幹線"
    },
    answer: "C",
    whyRight: "全港共 10 條主要幹線：1–3 號南北過海（按紅、東、西隧次序）、4–8 及 10 號東西走向（南至北）、9 號新界環迴。",
    whyWrong: { A: "共 10 條，9 號幹線是圍繞新界的環迴幹線。", B: "共有 10 條，包含南北、東西及環迴路線。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第八章", section: "主要幹線編號", page: 129, quote: "共有十條路線獲指定為主要幹線。三條為南北走向幹線（一號、二號和三號幹線），分別行經三條過海隧道……六條東西走向幹線（四號、五號、六號、七號、八號和十號幹線）……九號幹線則為圍繞新界的環迴路線。" },
    memoryHook: "主要幹線共 10 條：1紅2東3西（南北過海）、9號新界兜大圈！"
  },
  {
    id: "q257",
    category: "signs_signals",
    type: "text",
    trapTag: "數字",
    prompt: "設於主要幹線的「里程標誌」每隔多少米設置一個？標誌上顯示的資料有甚麼緊急用途？",
    options: {
      A: "每隔 1 公里設置一個；只供道路工程師量度瀝青用量",
      B: "每隔 100 米設置一個；一旦壞車或意外，可向警方／救援／拖車人員準確報出幹線編號、行駛方向及里程距離",
      C: "每隔 500 米設置一個；代表前方收費廣場的收費金額"
    },
    answer: "B",
    whyRight: "里程標誌每隔 100 米設於主要幹線，列明里程距離、幹線編號與行駛方向（N/S/E/W，九號幹線用 A 逆時針／B 順時針），方便精準報警求助。",
    whyWrong: { A: "間距為每 100 米，專為協助司機於緊急事故準確定位求助。", C: "與收費無關，數字是里程距離。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第十章", section: "中途壞車 — 里程標誌", page: 133, quote: "里程標誌（每隔100米）設於主要幹線和部分主幹路上，為駕駛人提供其所處位置的資料，包括沿線的幹線編號、行駛方向和里程距離。" },
    memoryHook: "幹線里程牌每 100 米一個，壞車報警讀晒三項：里程＋幹線＋方向！"
  },
  {
    id: "q258",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在沒有標準圖案適合發出特殊危險警告時，臨時「文字警告標誌」通常採用甚麼形狀與底色？「改道標誌」又採用甚麼底色？",
    options: {
      A: "文字警告標誌通常為長方形紅底；改道標誌及臨時方向標誌則採用黃色底色",
      B: "兩者均採用綠色底色",
      C: "文字警告標誌為藍色圓形，改道標誌為白色三角形"
    },
    answer: "A",
    whyRight: "特殊危險文字警告標誌（如「道路封閉」、「前面道路起伏」）多用長方形紅底；改道及臨時方向標誌則採用黃底。",
    whyWrong: { B: "綠色是快速公路方向標誌底色。", C: "藍色圓形是強制指令標誌。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "臨時標誌", page: 120, quote: "改道標誌和臨時方向標誌都是採用黃色底色。如有特殊危險情況而沒有標準標誌適合用作發出警告，有時或會使用文字警告標誌，這些標誌通常是長方形，採用紅色底色。" },
    memoryHook: "臨時牌顏色：黃底＝改道／臨時路線；紅底長方＝特殊文字警告（如封路）。"
  },
  {
    id: "q259",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "方向標誌上三個圓形標誌「東」、「中」、「西」分別代表香港哪三條過海隧道？",
    options: {
      A: "代表車輛應分別靠左、中、右線行駛",
      B: "「東」＝將軍澳隧道、「中」＝獅子山隧道、「西」＝大欖隧道",
      C: "「東」＝東區海底隧道、「中」＝海底隧道（紅隧）、「西」＝西區海底隧道"
    },
    answer: "C",
    whyRight: "三條過海隧道簡寫符號：「東」指東區海底隧道、「中」指海底隧道（紅隧）、「西」指西區海底隧道。",
    whyWrong: { A: "這是目的地過海隧道符號，並非行車線編號。", B: "這三條為非過海隧道，並非「東、中、西」過海標記。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "發出提示的交通標誌", page: 122, quote: "三條過海隧道的符號以「東」、「中」及「西」字標示，分別指示往東區海底隧道、海底隧道（紅隧）及西區海底隧道的方向。" },
    memoryHook: "過海隧道簡符：東＝東隧、中＝紅隧、西＝西隧。"
  },
  {
    id: "q260",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在交通燈路口，一旦你的車輛已經在綠燈時「駛離停車線」進入路口，隨後交通燈轉變，你應該怎樣做？",
    options: {
      A: "繼續小心前進駛離路口，無須再理會剛才的交通燈號（但須留意行人及安全）",
      B: "立即倒車退回停車線後等候下一次綠燈",
      C: "停在路口正中央不動直至再轉綠燈"
    },
    answer: "A",
    whyRight: "一旦合法駛離停車線，應繼續小心完成通過路口，無須再理會身後或剛才的燈號，以免滯留堵塞路口。",
    whyWrong: { B: "在路口內倒車會撞向後車或行人，極危險。", C: "停在路口中央會堵塞橫向車流。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "交通燈", page: 106, quote: "一旦駛離「停車」線，便應繼續小心前進，無須再理會剛才的交通燈號。" },
    memoryHook: "合法過咗停車線就小心行埋去，唔好停喺路中或倒車。"
  },
  {
    id: "q261",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "警務人員或交通督導員在路口「截停車輛」時，若你準備轉左或轉右，可否見無對頭車便自行轉彎？",
    options: {
      A: "除非得到警務人員或交通督導員的明確指示，否則不得轉左或轉右",
      B: "只要無人過馬路便可先轉左",
      C: "只禁止轉右，但容許轉左"
    },
    answer: "A",
    whyRight: "警員或交通督導員截停車輛時，未獲其明確放行指示前，一律不得轉左或轉右。",
    whyWrong: { B: "未得執法人員指示擅自開動屬違抗指揮。", C: "不論左轉或右轉均須等待人員明確指示。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "警務人員及其他獲授權人士所發出的信號", page: 105, quote: "警務人員或交通督導員在路口截停車輛時，除非得到他們的指示，否則不得轉左或轉右。" },
    memoryHook: "阿 Sir 截停＝左右轉一律唔准郁，等佢親手揮動放行先郁！"
  },
  {
    id: "q262",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "道路工程工地採用人手操作的「停／去」字標誌或「臨時交通燈」管制單線雙程行車時，下列哪項正確？",
    options: {
      A: "見「去」字牌即可不理對面未清完的車輛立即衝入單線",
      B: "道路工程的臨時交通標誌只供參考，不如固定標誌重要",
      C: "見「停」字牌切勿駛越，見「去」字牌須確定前路暢通無阻方可前駛；臨時燈亮紅燈或紅黃燈時須在臨時標誌前等候"
    },
    answer: "C",
    whyRight: "臨時標誌與固定標誌同等重要：見「停」禁越、見「去」亦須確認前路暢通；臨時燈無停車線時須在臨時「紅燈亮時在此等候」牌前停定。",
    whyWrong: { A: "必須確定前路暢通無阻方可前駛。", B: "守則明言臨時標誌與固定標誌同樣重要。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "道路工程 — 臨時交通管制安排", page: 88, quote: "看到「停」字標誌時，切勿駛越這標誌；看到「去」字標誌時，如前路暢通無阻，方可前駛……（第119頁）臨時標誌與固定標誌同樣重要。" },
    memoryHook: "臨時牌同固定牌一樣要守；見「去」牌都要望清對面清晒車先入。"
  },
  {
    id: "q263",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在分隔車路的大型道路工程改道返回正常行車道時，何時才可轉換行車線？",
    options: {
      A: "剛穿過水馬即應立即切線超越前車",
      B: "任何時候皆可自由於水馬陣之間穿插切線",
      C: "除非標誌或標記另有指示，否則在完全駛離道路工程範圍之前，不應轉換行車線"
    },
    answer: "C",
    whyRight: "工程改道線位狹窄且路況多變，除非另有指示，在完全駛離道路工程範圍（見「終止」字牌）前不應換線。",
    whyWrong: { A: "改道收口處線窄危險，急切線極易擦撞。", B: "穿插水馬或撞倒交通圓筒均屬違法危險行為。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "在分隔車路／隧道的道路工程", page: 89, quote: "返回正常行車道時，除非有標誌或標記另作指示，否則在完全駛離道路工程範圍之前，不應轉換行車線。" },
    memoryHook: "行過工程改道段：跟原線慢慢行，未出晒「工程終止」範圍唔好轉線。"
  },
  {
    id: "q264",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在強風天氣或熱帶氣旋接近本港時駕駛，下列哪項最需要格外警覺？",
    options: {
      A: "特別留意高車身車輛，提防吹倒的樹木障礙物，並與易被強風吹至搖擺的行人及騎單車者保持較大距離",
      B: "強風只會吹歪單車，對私家車經過高身貨車旁完全沒有影響",
      C: "為抵禦橫風應盡量貼近高身貨車旁借勢擋風"
    },
    answer: "A",
    whyRight: "強風中駛近高車身車易受突變側風影響，須防倒樹及與易搖擺的行人、單車保持更大距離，並留意熱帶氣旋消息。",
    whyWrong: { B: "駛近或超越高車身車離開擋風區的一刻，突然橫風會令車身大幅偏擺。", C: "貼近高身車輛既進盲點又易在駛離時受突發側風失控。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "強風", page: 87, quote: "在強風中駕駛，特別是駛近高車身的車輛時，需要有快速和果斷的反應……提防路上有吹倒的樹木及其他障礙物。強風會把行人及騎單車者吹至搖擺不定，你應和他們保持較大的距離。" },
    memoryHook: "強風防三樣：高身車側風、吹倒樹枝、單車行人被吹歪。"
  },
  {
    id: "q265",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「斜路泊車」時，為何除了扭對前輪方向及拉實手掣外，還應比平地預留更寬闊的空位？",
    options: {
      A: "因為斜路只准重型貨車停泊",
      B: "因為斜路泊車時車輛必須斜泊 45 度",
      C: "因為斜路上駛入或駛離泊車位較平地困難，通常需要更多空位，預留較闊空位可利己利人"
    },
    answer: "C",
    whyRight: "斜路控制離合器／油門起步及倒車出入位較困難，預留較寬空位可減少溜車擦撞風險。",
    whyWrong: { A: "一般合法斜路泊位可供私家車停泊。", B: "斜路仍須盡量靠近左邊路邊平行停泊（除指定斜位）。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "在斜路泊車", page: 95, quote: "在斜路上駛入或駛離泊車位，較在平地上困難，而且通常需要更多空位。因此，泊車時，應預留較寬闊的空位，這樣做可以利己利人。" },
    memoryHook: "斜路泊車前後預鬆啲位，起步進出更安全唔怕溜車輕吻！"
  },
  {
    id: "q266",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "部分路旁公眾泊車處標誌下的「時間指示牌」，有時會顯示不同時段給不同車輛類別使用，以下哪項說法正確？",
    options: {
      A: "必須核對該泊車位適用的車輛類別及許可時段（例如日間私家車、晚間商用車），絕不可停泊在指定給其他車種的泊位",
      B: "傷殘人士泊車位在凌晨無人使用時私家車可暫泊",
      C: "只要見到「P」字牌便可 24 小時停泊任何私家車"
    },
    answer: "A",
    whyRight: "必須核對標誌列明的車種與時段，切勿佔用指定給貨車、巴士、電單車、垃圾車或傷殘人士許可證車輛的泊位。",
    whyWrong: { B: "傷殘人士專用泊位任何時段均只限持有效許可證車輛使用。", C: "不同時段可能轉為商用車專用或禁區，必須看清牌面。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "泊車處", page: 94, quote: "部分泊車處可能會指定在不同時段給不同類別／類型車輛使用（例如日間供私家車使用，晚間則供商業車輛使用）。切勿在指定為其他類別車輛而設的泊車位內泊車。" },
    memoryHook: "見 P 牌必睇兩樣：限邊種車＋限邊段時間（收費與專用時段）。"
  },
  {
    id: "q267",
    category: "weather_parking",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「有街燈但燈距不超過 200 米」的道路，與「沒有街燈的道路或私家路」上泊車，規則有何主要分別？",
    options: {
      A: "私家路不受《道路交通規例》任何泊車限制",
      B: "無街燈道路一律完全禁止泊車，有街燈道路則隨處可泊",
      C: "有街燈（燈距≤200 米）道路「只可在指定泊車處泊車」；無街燈道路或私家路則在無「不准泊車」標誌或單黃虛線、且不構成危險阻礙處才可泊車"
    },
    answer: "C",
    whyRight: "街燈相距 ≤200 米路段默認全面禁泊（指定泊車處除外）；無街燈道路或私家路則視乎有否不准泊車牌／單黃虛線及是否阻礙安全。",
    whyWrong: { A: "私家路同樣受《道路交通（私家路上泊車）規例》規管。", B: "完全調轉了有街燈與無街燈道路的預設規則。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "禁止泊車的地點／准許泊車的地點", page: 92, quote: "有街燈的道路 — 指設有街燈而之間相隔不超過200米的道路，但在劃定界線的泊車處除外……在沒有街燈的道路或私家路上：如路旁設有「不准泊車」標誌……或單行黃色虛線，則不得泊車。" },
    memoryHook: "街燈距≤200m＝默認禁泊（除指定泊位）；無街燈／私家路＝睇牌＋單黃虛線。"
  },
  {
    id: "q268",
    category: "weather_parking",
    type: "text",
    trapTag: "現行新例",
    prompt: "以下哪兩類殘疾人士合資格向香港社會服務聯會轄下機構申請「殘疾乘客在限制區上落車證明書」？",
    options: {
      A: "只限輪椅使用者，視障人士不合資格",
      B: "行動不便人士（如輪椅或助行器使用者）或視障人士",
      C: "任何 60 歲以上長者皆可自動使用"
    },
    answer: "B",
    whyRight: "行動不便人士及視障人士合資格申請該證明書，填上車程與車牌交司機，可在一般限制區上落（快速公路及全日禁區除外）。",
    whyWrong: { A: "視障人士同樣明確列入合資格類別。", C: "須符合行動不便或視障資格並向社聯轄下機構申請證明書。" },
    source: { origin: "運輸署現行守則新修訂重點", chapter: "第三章／第五章", section: "殘疾乘客在限制區上落車證明書", page: 91, quote: "下列殘疾人士均合資格使用有關證明書：行動不便人士，例如輪椅使用者或使用輔助步行器的人士；或視障人士。" },
    memoryHook: "殘疾限制區上落證：行動不便／視障申請；快路及全日雙黃禁區除外！"
  },
  {
    id: "q269",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果在主幹路、快速公路、隧道區或管制區行駛時，車上有貨物或物體意外跌下或漏出，司機應該怎樣做？",
    options: {
      A: "直接駛走不通知任何人",
      B: "切勿試圖自己撿回貨物，應以流動電話通知警方或控制中心處理",
      C: "立即把車停在行車線中央並下車徒手撿回貨物"
    },
    answer: "B",
    whyRight: "一般道路可在安全可行下停安全處清理；但在主幹路、快速公路、隧道區或管制區絕不可自行落車撿拾，須致電警方或控制中心。",
    whyWrong: { A: "遺留障礙物危及他車屬嚴重失責，無法自行安全清除時必須報警示警。", C: "高速道路落車撿物極易被疾馳車輛撞斃。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第六章", section: "從車上跌下或漏出的貨物", page: 98, quote: "在主幹路、快速公路、隧道區及管制區，應以流動電話通知警方或控制中心，切勿試圖自己撿回貨物。" },
    memoryHook: "快路／隧道跌貨＝切勿自己落車執，打電話通知警方或控制中心！"
  },
  {
    id: "q270",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於貨車載貨、車廂後擋板及吊臂的安全規定，下列哪項正確？",
    options: {
      A: "只要貨物綁上繩索，工作人員可坐在車斗貨物上面押運",
      B: "車輛總重只計算貨物重量，不包括車身及乘客重量",
      C: "不可用車廂後擋板載貨或承托貨物，不可讓貨物接觸路面；車上吊臂或起重機用後須放下並依廠商建議擺放"
    },
    answer: "C",
    whyRight: "禁以後擋板載貨／承托、禁貨物觸地、吊臂用後須放下妥善收好；工作人員須坐正式座位，且總重計及車身、乘客與貨物。",
    whyWrong: { A: "乘客（包括工作人員）必須坐正式座位，不得坐於貨物上或載貨間。", B: "車輛總重包括車輛本身、乘客及貨物的總重量。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第六章", section: "載貨", page: 98, quote: "車輛總重或車軸重量，均包括車輛的重量、以及乘客和貨物等的重量。不可用車廂後擋板載貨或承托貨物。不可讓任何貨物接觸路面……吊臂、起重機或類似的附屬物，用後須放下。" },
    memoryHook: "貨車載貨：禁尾板托貨、禁人坐貨斗、吊臂用完即收、總重包車＋人＋貨。"
  },
  {
    id: "q271",
    category: "driving_skills",
    type: "text",
    trapTag: "數字",
    prompt: "根據《道路交通（車輛構造及保養）規例》，輕型貨車及中型／重型貨車連貨物整體高度上限分別為多少？",
    options: {
      A: "所有貨車劃一為 5.0 米",
      B: "輕型貨車：3.5 米；中型／重型貨車：4.6 米",
      C: "輕型貨車：2.5 米；中型／重型貨車：3.5 米"
    },
    answer: "B",
    whyRight: "貨物連車身整體高度不得超過規例指明上限：輕型貨車 3.5 米、中型／重型貨車 4.6 米，且不得撞毀架空物件或電線。",
    whyWrong: { A: "超過法定 3.5 米（輕貨）及 4.6 米（中／重貨）上限。", C: "2.5 米是車輛連貨物的「總闊度」上限，非高度上限。" },
    source: { origin: "運輸署現行《道路使用者守則》", chapter: "第六章", section: "伸懸於車外的貨物", page: 98, quote: "貨物連車身高於《道路交通（車輛構造及保養）規例》指明該車輛的整體高度（例如，輕型貨車：3.5米，中型／重型貨車：4.6米）。" },
    memoryHook: "貨車限高：輕貨 3.5m、中重貨 4.6m（總闊一律 2.5m）。"
  },
  {
    id: "q272",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「電單車」駕駛及學習規則中，下列哪項與私家車有明顯不同？",
    options: {
      A: "電單車學牌容許接載一名持有正式牌照的後座乘客指導",
      B: "炎熱天氣下駕駛電單車最適宜穿短袖衫褲及拖鞋散熱",
      C: "電單車初學者經強制訓練、筆試及能力試合格領取學牌後，無論有否師傅陪同均可在路練習（但禁載客、須前後掛學牌）；且駕駛電單車不得戴任何音響耳機"
    },
    answer: "C",
    whyRight: "電單車學牌通過強制課程及能力試後可單人上路練習但嚴禁載客；法例禁止駕駛電單車戴任何音響耳機，炎熱亦不宜短衫短褲。",
    whyWrong: { A: "電單車學牌（及 P 牌）一律不准運載任何乘客。", B: "短衫短褲一旦滑倒毫無皮膚保護，應穿堅固鞋靴、手套及保護衣物。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第七章", section: "學習駕駛人／駕駛時", page: 100, quote: "領取了學習駕駛執照後，不論是否有持牌駕駛教師陪同，便可在道路上練習駕駛，但不准運載乘客……（第101頁）在道路上駕駛電單車時，不得戴上任何音響裝置耳機。" },
    memoryHook: "電單車學牌可自己練但禁載客；揸電單車嚴禁戴耳機、勿穿短衫短褲。"
  },
  {
    id: "q273",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「電單車後座乘客」的乘坐規則，下列哪項正確？",
    options: {
      A: "應跨坐背後固定座位、雙腳時刻踏穩腳踏板、雙手抓穩司機腰／臀部或座位把手，轉彎時身體姿勢與司機保持一致",
      B: "紅燈停車時可把雙腳離開腳踏板伸出車旁伸展",
      C: "為看清前路，轉彎時應刻意將身體向相反方向側傾"
    },
    answer: "A",
    whyRight: "電單車靠傾側轉彎，後座乘客必須跨坐、雙腳時刻踏穩腳踏（停車時尤然）、身體隨司機一致傾斜，避免突然動作或閒談。",
    whyWrong: { B: "即使電單車正在停下或停定，後座乘客雙腳仍應時刻踏穩腳踏板。", C: "側身察看前方或反向傾側會破壞電單車平衡穩定。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第七章", section: "後座乘客須知", page: 103, quote: "應和駕駛人的身體姿勢保持一致，在轉彎或轉角時尤須如此。不要側身察看前方……雙腳應時刻踏穩在腳踏板上，電單車或機動三輪車正停下來或已停定時尤須如此。" },
    memoryHook: "電單車後座：跨坐、雙腳長踏腳踏、傾側跟司機一致、拍膊頭示意停車。"
  },
  {
    id: "q274",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "電單車在交通擠塞或劃有「雙白線」的雙程道路行駛時，哪項安全規則正確？",
    options: {
      A: "電單車可在紅燈塞車時駛上行人路繞過車龍",
      B: "電單車體積細小，任何車速下均可於同一行車線內自由超車",
      C: "只在交通緩慢擠塞且安全下才可緩慢穿過車隙；於雙白線利用前車與雙白線間空位前進時，須確定安全且前車司機知悉不會迫你越過雙白線"
    },
    answer: "C",
    whyRight: "只可在慢車擠塞且安全下緩慢穿行（不肯定便留正常位置）；正常車速不應同線超車，並嚴禁駛上行人路。",
    whyWrong: { A: "行人路、行人專用區或公眾空地一律禁止駕駛電單車。", B: "非緩慢擠塞時，應以正常方法從右邊行車線超車，不應同線爬頭。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第七章", section: "電單車的通過／超車", page: 101, quote: "在行車緩慢或交通擠塞時，只有在安全情況下，才可在車輛之間的空位緩慢穿過……在其他情況下，則不應在同一行車線上超車，而應以正常方法從右邊行車線超車。" },
    memoryHook: "電單車攝車隙只限慢車塞車且安全；正常車速須正統右線超車。"
  },
  {
    id: "q275",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "駕駛「汽車」在路面上見到「行人優先使用區」或路邊有手推車、遊行隊伍時，若路面沒有足夠空間讓他們通過，應該怎樣做？",
    options: {
      A: "輕響車號示意遊行隊伍即時靠牆停步讓汽車先過",
      B: "減速並讓出足夠空間；如沒有足夠空間通過，便應該慢駛或停車，直至行人離開及情況安全才繼續前進",
      C: "開上對面行人路繞過人群"
    },
    answer: "B",
    whyRight: "對馬路上的行人、手推車或遊行隊伍均須減速讓出充足空間，空間不足時應停候至安全才前行。",
    whyWrong: { A: "切勿以響號驅趕行人或遊行隊伍。", C: "切勿把汽車駛上行人路或行人徑。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "行人優先使用區", page: 58, quote: "讓路給馬路上的行人、使用手推車或手拉車的行人，或遊行隊伍。你應讓出足夠空間給他們經過，並且減低車速。如果沒有足夠空間讓他們通過，便應該慢駛或停車。" },
    memoryHook: "遇行人、手推車、遊行隊伍＝減速讓位；唔夠位就停低等安全先過。"
  },
  {
    id: "q276",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當「公共巴士或公共小型巴士」在車站或停車處打燈準備駛出匯入行車線時，在安全情況下你應該怎樣做？",
    options: {
      A: "加速搶先超越巴士車頭",
      B: "只須讓路給雙層專營巴士，不須理會公共小巴",
      C: "在安全情況下，盡量讓路給正在車站或停車處等候駛出的巴士及公共小型巴士"
    },
    answer: "C",
    whyRight: "安全情況下應盡量禮讓準備離站的巴士及公共小型巴士，保持公共交通順暢安全。",
    whyWrong: { A: "搶先加速會造成盲點擦撞或迫使巴士急剎傷及車內站立乘客。", B: "守則明列同時應盡量讓路給巴士及公共小型巴士。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "其他道路使用者 — 公共交通", page: 61, quote: "在安全情況下，應盡量讓路給正在車站或停車處等候駛出的巴士及公共小型巴士。" },
    memoryHook: "見巴士／小巴打右燈出站＝安全下盡量收慢讓佢出。"
  },
  {
    id: "q277",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「電車線」及駛經電車時的駕駛規則，下列哪項正確？",
    options: {
      A: "切勿駛入電車線；盡量讓路給電車並給予更多空間，因電車不能改變方向閃避",
      B: "只在路面劃有行車線界線時，亦一律禁止從電車左方通過",
      C: "電車在路口必須永遠讓路給私家車"
    },
    answer: "A",
    whyRight: "切勿駛入電車專線，且因電車受軌道限制無法轉向閃避，應盡量讓路並留空間；一般劃有行車線界線處可從左方通過（停在無安全島車站時除外）。",
    whyWrong: { B: "劃有行車線界線時可從電車左方通過，但不可超越停在沒有安全島車站的電車（第 57 頁）。", C: "應盡量讓路給電車，特別是在路口。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "其他道路使用者 — 公共交通", page: 61, quote: "切勿駛入電車線。盡量讓路給電車，特別是在路口。應給電車多些空間，因為電車不能改變方向來避開你。" },
    memoryHook: "電車唔識扭軚閃避：勿入電車線、路口盡量讓、無安全島站停必停黃線前。"
  },
  {
    id: "q278",
    category: "driving_skills",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在馬路上推動大型手推車、騎馬／牽馬，或組織遊行隊伍在馬路前進時，應該靠哪一邊行進？",
    options: {
      A: "與一般無行人路的行人一樣靠馬路右邊逆向迎車而行",
      B: "可隨意在馬路中央行駛",
      C: "全部靠馬路左邊行進（與車輛同向）；牽馬同行時馬匹應靠在人的左邊，遊行隊伍夜間前白／黃燈、後紅／黃燈"
    },
    answer: "C",
    whyRight: "手推車、騎馬／牽馬、趕動物及遊行隊伍上馬路均須靠左與車同向（勿與無行人路單人步行靠右面向來車混淆！）。",
    whyWrong: { A: "靠右面向來車只適用於「沒有行人路時的一般行人步行」；推車、騎馬、遊行一律靠左。", B: "靠左行進並須遵守交通標誌及燈號。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章", section: "手推車、動物、遊行隊伍", page: 21, quote: "在馬路上推車，要靠左行……應靠近馬路左邊騎馬。如牽着馬匹步行……牽着的馬同時要靠在你左邊……在馬路上遊行的群眾，應靠左行。" },
    memoryHook: "超級易撈亂對比：單人無行人路步行＝靠右迎車；推車／騎馬／遊行隊伍＝靠左同向！"
  },
  {
    id: "q279",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在道路上見到白色粗實線界定的「巴士線」，於巴士線生效時間內，私家車在甚麼情況下可以駛越巴士線？",
    options: {
      A: "塞車時私家車可借巴士線直行 100 米",
      B: "任何時候即使有開放標記亦絕不可駛入巴士線轉左",
      C: "只要路口前路面髹有白色虛線及箭嘴標記（說明巴士線開放給轉彎車輛），可駛越巴士線在前面路口轉左"
    },
    answer: "C",
    whyRight: "路口前若髹有開放虛線及轉向標記，可駛越巴士線於前面路口轉左；巴士線生效時間外則所有車輛皆可使用。",
    whyWrong: { A: "生效時間內直行私家車絕不可駛入巴士線。", B: "守則第 65 頁明示路口開放標記容許轉左車輛駛越。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "巴士線", page: 65, quote: "道路標記，說明巴士線開放給要在路口轉彎的車輛使用。你可駛越巴士線，在前面路口轉左。" },
    memoryHook: "順向巴士線：生效外人人行得；生效內見路口虛線開放標記可越線轉左。"
  },
  {
    id: "q280",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在沒有「輕鐵專線」圍欄的道路上遇到輕鐵站及輕鐵車輛時，下列哪項規則正確？",
    options: {
      A: "輕鐵專線全日生效，白色粗線標明範圍，其他車輛及行人均不可進入",
      B: "輕鐵專線只在上午 7 時至晚上 7 時生效，深宵私家車可使用",
      C: "輕鐵專線容許的士駛入落客"
    },
    answer: "A",
    whyRight: "輕鐵專線由白色粗線及標誌示明，全日 24 小時生效，其他任何車輛及行人一律禁止進入。",
    whyWrong: { B: "輕鐵專線全日生效，並無非生效開放時段。", C: "任何非輕鐵車輛（包括的士）均嚴禁駛入輕鐵專線。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "輕鐵專線", page: 64, quote: "輕鐵專線，有標誌及道路標記顯示，全日生效……其他車輛及行人均不可進入「輕鐵專線」範圍。" },
    memoryHook: "輕鐵專線＝全日 24 小時禁入（唔同順向巴士線有時間限制）。"
  },
  {
    id: "q281",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在設有「路肩」（起點有標誌、邊緣髹粗白線）的快速公路因壞車停在路肩，修理妥當準備駛回正常行車線時，應怎樣做？",
    options: {
      A: "從靜止狀態直接以直角 90 度急轉切入左線",
      B: "打開死火燈以時速 20 公里慢慢滑出中線",
      C: "先在路肩上逐漸加速，待車流中有安全空位時才匯入行車線"
    },
    answer: "C",
    whyRight: "由路肩駛回快速公路正常行車線前，應先沿路肩逐漸加速配合車流速度，打右燈並待安全空檔再匯入。",
    whyWrong: { A: "靜止直接切出高速車流極易引發致命追尾撞擊。", B: "應先關閉死火燈、打右轉燈並先在路肩提速才匯入。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "中途壞車 — 路肩", page: 133, quote: "駛回正常行車線前，應先在路肩上逐漸加速，然後待車流中有安全的空位時，才可匯入行車線。" },
    memoryHook: "由路肩出返快路＝先喺路肩加速夾車流，有位先匯入！"
  },
  {
    id: "q282",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「隧道管道」內，中型／重型貨車、巴士、旅遊車或拖曳另一車輛的汽車必須使用哪條行車線？",
    options: {
      A: "可使用任何行車線自由超車",
      B: "除中環及灣仔繞道隧道外，一律只可使用最左線",
      C: "必須使用最右線以便私家車在左方通過"
    },
    answer: "B",
    whyRight: "隧道內巴士、旅遊車、中／重型貨車及拖曳車輛一律只可使用最左線（守則第 73 頁註明中環及灣仔繞道隧道除外）。",
    whyWrong: { A: "隧道內全面禁止換線超車，重型車更受限最左線。", C: "重型車輛與巴士靠最左線行駛。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "隧道區及管制區", page: 73, quote: "除最左線外，不得使用巴士、旅遊車、或中型／重型貨車，或拖曳另一車輛（中環及灣仔繞道隧道除外）。" },
    memoryHook: "隧道內大車／巴士／拖車必行最左線（中環灣仔繞道除外）。"
  },
  {
    id: "q283",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「窄路」迎面遇上車輛時，除善用讓車處外，守則還建議盡可能讓路給哪一方的車輛？",
    options: {
      A: "體積較細的車輛優先",
      B: "盡可能讓路給正在上斜的車輛",
      C: "盡可能讓路給正在下斜的車輛"
    },
    answer: "B",
    whyRight: "上斜車輛停定後再起步較困難（特別是棍波車或重車易溜後），故應盡可能讓路給上斜車輛。",
    whyWrong: { A: "窄路禮讓看坡度及讓車處位置，非單看體積。", C: "下斜車輛較易控制停定等候，應讓上斜車先行。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "窄路", page: 67, quote: "盡可能讓路給上斜的車輛。切勿在讓車處停泊車輛。" },
    memoryHook: "窄路斜坡狹路相逢＝盡量「讓上斜車」先行。"
  },
  {
    id: "q284",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在車速較高的道路駛離並進入限速較低的路段（如由 70 km/h 進入 50 km/h）時，為何守則特別提醒應查看速度計？",
    options: {
      A: "在開放寬闊的道路高速行駛久了，實際車速往往較想像中高（例如開着 70 km/h 會錯覺只有 50 km/h），易不自覺超速",
      B: "因為車速限制標誌在市區不具法律效力",
      C: "因為進入 50 km/h 路段後速度計會自動歸零"
    },
    answer: "A",
    whyRight: "高速適應後會低估實際車速及所需停車距離，減速駛入低限速路段應看咪錶核實車速。",
    whyWrong: { B: "所有車速限制標誌均具法定效力。", C: "速度計如常顯示實時車速。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "速度限制", page: 69, quote: "你的實際車速會較想像中高（如以時速70公里在開放而寬闊的道路上行車，可能會覺得時速只是50公里），因此，應查看速度計以作確定。" },
    memoryHook: "落高速返市區易產生慢速錯覺（開緊 70 當 50），記住望咪錶！"
  },
  {
    id: "q285",
    category: "lanes_highways",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在「綠色人像」過路處，若整組交通燈完全失靈時，駕駛人與行人應各自怎樣做？",
    options: {
      A: "行人擁有絕對優先權，可不望來車直接步出",
      B: "駕駛人毋須減速直接駛過，行人則絕對不准過路",
      C: "駕駛人應慢駛甚或停車讓路給行人並小心駛過；行人應將該處視作一般行人輔助線，格外小心依《過馬路守則》過路"
    },
    answer: "C",
    whyRight: "綠人過路處交通燈失靈時，司機須慢駛或停車讓行人，行人則當一般過路處格外謹慎遵守過馬路守則。",
    whyWrong: { A: "即使正常綠燈亦須提防來車，失靈時行人更要份外小心。", B: "司機遇失靈交通燈必慢駛或停車讓路給行人。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第二章／第五章", section: "綠色人像過路處", page: 85, quote: "如遇上交通燈號故障，應慢駛或甚至停車讓路給行人，並小心駛過路口。（第16頁）如交通燈失靈，應將該過路處視作一般行人輔助線看待。" },
    memoryHook: "綠人燈壞咗：車要慢／停讓行人；行人當普通馬路加倍小心望清過。"
  },
  {
    id: "q286",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "發生僅涉及「車輛或財物輕微損毀、且無人傷亡」的小型交通意外時，正確處理方式是？",
    options: {
      A: "把車留在行車線中央不動，等待數小時直至警員拍照",
      B: "毋須交換任何資料直接各自駛走",
      C: "與有關司機及第三方商量，交換資料並將車輛駛至附近路旁安全地方免造成阻塞；除非需警方協助，否則並沒必要報警"
    },
    answer: "C",
    whyRight: "只涉輕微損毀且無人傷亡（且非嚴重損毀），可與第三方商量移車至路旁安全處免塞車，交換資料後毋須必定報警（需要協助除外）。",
    whyWrong: { A: "禁止未經警方許可移車只適用於涉及「有人傷亡」或「嚴重損毀」的意外。", B: "涉及第三方財物或車輛損毀仍必須停車及向合理要求人士提供個人、車主資料與車牌。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "交通意外", page: 135, quote: "如意外只涉及車輛或財物輕微損毀而沒有人傷亡，你可與其他有關司機及第三方商量，將車輛駛至附近路旁的安全地方，以免造成阻塞。此類事故並沒有必要向警方報告，除非有需要尋求他們的協助。" },
    memoryHook: "傷亡／嚴重損毀＝唔准移車（救人救火除外）＋24 小時內報警；純輕微損毀＝交換資料移埋路邊免塞車。"
  },
  {
    id: "q287",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在交通意外現場致電「999」求助時，應向接線人員提供哪四項關鍵資料？",
    options: {
      A: "只需說明汽車型號及車身顏色即可掛線",
      B: "只需告知車主身份證號碼及汽車保單編號",
      C: "意外確實地點、受傷人數及大致傷勢、牽涉車輛數目和種類、以及是否有危險品或火警危險"
    },
    answer: "C",
    whyRight: "致電 999 報案四要點：確實地點、傷者人數與傷勢、涉事車輛數目與種類、有否危險品或火警風險。",
    whyWrong: { A: "欠缺地點、傷情及火警危險資訊會延誤消防救護調派。", B: "保單資料並非緊急救援調派所需。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "交通意外 — 求助 999", page: 135, quote: "求助時應提供以下資料：發生意外的確實地點；受傷人數和傷勢的大致情況；牽涉的車輛數目和種類；及危險品或火警危險（如有）。" },
    memoryHook: "打 999 報四樣：邊度（地點）、幾傷（傷亡）、幾多車（車種數目）、有冇火／危險品。"
  },
  {
    id: "q288",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如在交通意外中遇上肇事車輛載有「危險品」，一般市民或司機應該怎樣處理？",
    options: {
      A: "用普通清水直接沖洗所有不明化學粉末",
      B: "立即走近打開貨斗點煙照明檢查洩漏情況",
      C: "除非要救人，否則應遠離該車；小心洩漏液體／粉末／氣體，並盡量從標貼標誌找出資料立即通知警方或消防員"
    },
    answer: "C",
    whyRight: "遇危險品事故應遠離（救人除外），嚴禁吸煙，記錄標貼／標誌資料通知消防及警員專業處理。",
    whyWrong: { A: "部分化學品遇水會產生劇烈放熱或毒氣，須交消防員處理。", B: "任何車禍現場均嚴禁吸煙，危險品洩漏更可能引發爆炸中毒。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "交通意外 — 危險品", page: 135, quote: "假如在車禍中，肇事車輛載有危險品，除非你要救人，否則應遠離該輛車。小心有危險液體、粉末或濃縮氣體洩漏出來。從危險品的標貼或其他標誌中，盡量找出資料，並立即通知警務人員或消防人員。" },
    memoryHook: "危險品車禍：遠離現場（救人除外）、睇清標貼報消防、嚴禁煙火！"
  },
  {
    id: "q289",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "當你駕車目睹前方發生交通意外並打算停車伸出援手，應把自己的車輛停在甚麼位置最安全？",
    options: {
      A: "停在路旁、位於「意外現場與從後而至車輛之間」且易被看見的位置，亮死火燈並預留空位給緊急車輛（晚上可用大燈照亮現場）",
      B: "停在意外現場前方 200 米外並關掉所有車燈",
      C: "橫泊在多條行車線正中央完全封死整條馬路"
    },
    answer: "A",
    whyRight: "停於路旁、在意外現場與後車之間易見處，亮危險警告燈（夜間開大燈照明），同時留足通道予救援車輛駛入。",
    whyWrong: { B: "停在前方無法警示後方來車，且熄燈在夜間極危險。", C: "完全封死車道會阻礙救護車及消防車駛入救援。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "幫助他人", page: 136, quote: "停車的地點，應是路旁，而且是意外現場和從後而至的車輛之間及容易被看得見的地方。應預留空位給緊急服務車輛駛入，並亮起危險警告燈。在晚上，可用大燈照亮意外現場。" },
    memoryHook: "停車幫手位：路旁＋「現場同後車之間」＋開死火燈（夜開大燈）＋留位畀白車。"
  },
  {
    id: "q290",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "歷屆必考",
    prompt: "在意外現場急救時，如傷者出現「大量出血」或「停止呼吸」，應如何緊急處理？",
    options: {
      A: "停止呼吸時應把傷者頭部用力向前低壓下巴",
      B: "大量出血應把傷口敞開風乾，不可按壓",
      C: "大量出血：戴上膠手套（如有）用手緊壓流血處止血，再用紗布／消毒敷料包紮；停止呼吸：仰臥、扶頸頭後仰通氣道、捏鼻進行口對口人工呼吸"
    },
    answer: "C",
    whyRight: "大量出血須直接緊壓傷口止血並敷料包紮；停止呼吸須推至仰臥、頭後仰開氣道、捏鼻吹氣口對口人工呼吸直至自行呼吸。",
    whyWrong: { A: "頭部向前壓會阻塞氣道，必須扶頸使頭向後仰令氣道暢通。", B: "失血過多可迅速致命，必須緊壓止血。" },
    source: { origin: "歷屆甲部筆試真題", chapter: "第十章", section: "在路上急救", page: 138, quote: "制止大量出血 — 如有膠手套，先戴上，再用手緊壓着傷者流血的地方……口對口人工呼吸 — 把傷者推至仰臥位置，扶起其頸部，使其頭部向後仰，令其呼吸道暢通，然後捏住其鼻孔……用力吹氣。" },
    memoryHook: "急救兩必做：大出血＝戴手套緊壓包紮；停呼吸＝仰臥後仰通氣道、捏鼻吹氣。"
  },
  {
    id: "q291",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在交通意外中，若傷者清醒但出現「受驚（面色蒼白和流汗）」，在確定沒有受傷或內臟受損危險下，應如何照料？",
    options: {
      A: "讓其坐起並飲熱茶或烈酒定驚",
      B: "盡量讓傷者平臥、把雙腳提高、保持溫暖並安慰他們，但絕不給飲食、止痛藥或吸煙",
      C: "讓傷者立即起來原地急行恢復血液循環"
    },
    answer: "B",
    whyRight: "對受驚（面色蒼白流汗）且無明顯受傷／內傷者，應讓其臥下抬高雙腳、保暖及安慰，切勿給予飲食、酒類、止痛藥或香煙。",
    whyWrong: { A: "任何傷者及受驚者皆不可飲酒、飲品、進食或服止痛藥（防內臟受傷需手術）。", C: "受驚休克時走動會加重暈眩及循環負擔。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "照顧清醒和有呼吸的傷者", page: 138, quote: "如果傷者受驚（面色蒼白和流汗），而沒有受傷，或內臟沒有受損的危險，你應該盡量讓傷者臥下，把其雙腳提高。讓所有傷者（包括受驚者）保持溫暖。不要讓他們服用止痛藥、飲酒或其他飲品、進食或吸煙。" },
    memoryHook: "受驚休克（面青出汗無內傷）＝平臥、抬高雙腳、保暖安慰、禁飲食煙酒止痛藥。"
  },
  {
    id: "q292",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "假如在交通意外中頭部遭受猛烈撞擊，但外觀完全沒有表面傷痕或流血，應該怎樣處理？",
    options: {
      A: "先服食強效止痛藥再繼續駕車",
      B: "無表面傷痕即代表無大礙，可直接回家休息",
      C: "即使沒有表面傷痕，仍應請醫生檢驗以防隱性腦部或內臟損傷"
    },
    answer: "C",
    whyRight: "頭部或身體受猛烈撞擊即使無外傷，仍可能有腦震盪或內出血，必須請醫生檢驗。",
    whyWrong: { A: "止痛藥會掩蓋傷勢且影響駕駛安全。", B: "腦部內出血症狀常延後出現，不可掉以輕心。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "交通意外", page: 135, quote: "如你或任何人在意外中遭受猛烈撞擊，尤其是頭部，即使沒有表面傷痕，也應請醫生檢驗。" },
    memoryHook: "撞親頭就算無爆缸流血，都一定要搵醫生檢查！"
  },
  {
    id: "q293",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "使用「危險警告燈」（死火燈）的規定中，下列哪種情況屬於「必須」亮起，哪些情況屬於「可以」亮起？",
    options: {
      A: "危險警告燈只可在完全停定時使用，行駛中遇前面突塞急減速絕對不可亮起",
      B: "在所有雙黃線禁區亮起死火燈即可合法泊車等人",
      C: "快速公路或限速 >50 km/h 道路因故障或緊急事故停定時「必須」亮起；泊車、倒車、臨時上落或遇前面塞車突然減速時為安全亦可亮起"
    },
    answer: "C",
    whyRight: "快速公路或限速 >50 km/h 道路故障停定必須亮死火燈；遇前塞急減速（行駛中）、倒車或泊車為安全亦可亮起。",
    whyWrong: { A: "守則明言前面交通擠塞須突然減速時，即使行駛中亦可亮起危險警告燈示警。", B: "死火燈絕不是違例泊車「豁免牌」，雙黃線禁停區開死火燈照樣犯法。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "危險警告燈", page: 134, quote: "如車輛因故障或緊急事故而在快速公路或車速限制超過每小時50公里的道路上停留不動，你必須亮起危險警告燈……因前面交通擠塞而要突然減速時，無論車輛是停留不動或正在行駛中，你也可亮起危險警告燈。" },
    memoryHook: "快路／>50km/h 壞車必開死火燈；前面突塞急收、倒車泊車亦可開，但唔係違泊免死金牌！"
  },
  {
    id: "q294",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "於限速每小時 50 公里或以下的彎路或路拱路段中途壞車，擺放「紅色三角形警告牌」時應放在哪個位置？",
    options: {
      A: "放在對面反方向行車線中央",
      B: "直接緊貼壞車車尾 1 米處擺放",
      C: "一般放車後約 50 米並與壞車同邊；若道路不平直，應放在讓後車於「彎位或路拱之前」便能看見的位置（移走壞車後勿忘收走）"
    },
    answer: "C",
    whyRight: "限速 ≤50 km/h 道路放車後約 50 米同邊同線；遇彎位或路拱應提前放在彎前／坡前讓後車及早看見，並走於防撞欄後。",
    whyWrong: { A: "應放在與壞車同一邊（最好同一行車線）的路上。", B: "放太近車尾令後車毫無反應及停車距離。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第十章", section: "三角形警告牌", page: 134, quote: "應在距離壞車約50米前並與壞車同一邊的路上……如果道路面不平直，三角形警告牌應該是放置在能讓從後而至的駕駛人可以在彎位或路拱之前看得見的地方。" },
    memoryHook: "三角牌（只限≤50km/h 路）：車後約 50m 同線；遇彎／坡擺喺彎前坡前！"
  },
  {
    id: "q295",
    category: "pedestrians_emergency",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "任何道路使用者如不小心在行人路或馬路上遺下或拋出物件，以致妨礙或危及他人時，應怎樣處理？",
    options: {
      A: "屬於清潔工人職責，不必理會直接離開",
      B: "只在物件重逾 10 公斤時才需要處理",
      C: "切勿拋棄物件；若無法避免造成障礙，應盡快採取行動清除，如無法立即清除則應向其他道路使用者發出警告"
    },
    answer: "C",
    whyRight: "第一章基本規則：不可在馬路或行人路拋置障礙物；若無法避免造成障礙須盡快清除，不能立即清除則須向他人示警。",
    whyWrong: { A: "所有道路使用者均有責任盡快清除自己造成的障礙或示警。", B: "任何足以妨礙或危及他人的物品（即使細小碎塊）都須處理。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第一章", section: "所有道路使用者都應遵守的規則和指示", page: 4, quote: "切勿在行人路或馬路上拋擲、棄置或遺下任何東西，以致妨礙或危及其他道路使用者。如無法避免如此造成的障礙，應採取所需行動盡快清除障礙。如無法立即清除障礙，你應向其他道路使用者發出警告。" },
    memoryHook: "整跌障礙物：安全即清，清唔到即刻警告其他人（快路就報警）。"
  },
  {
    id: "q296",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "關於「汽車停車燈（剎車燈）」與「紅色車尾後燈」，駕駛人應該留意甚麼？",
    options: {
      A: "日間駕駛時車尾停車燈不會運作",
      B: "踏下剎車掣時車尾紅色停車燈會亮起，示意正在慢駛或停下，切勿與紅色後燈混淆；出車前須檢查所有車燈均能正常亮着並保持清潔",
      C: "停車燈只在拉起手掣時才會亮着"
    },
    answer: "B",
    whyRight: "踩腳掣（剎車掣）時較光亮的紅色停車燈會亮起向後車示意慢駛或停車，勿與夜間常亮的紅色後燈混淆。",
    whyWrong: { A: "不論晝夜，每次踩剎車掣停車燈都會亮着。", C: "停車燈由踏下腳掣（行車制動器）觸發，並非只靠手掣。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "信號", page: 104, quote: "駕駛人踏下剎車掣時，設於車尾的紅色停車燈便會亮着，向尾隨的道路使用者示意車輛正在慢駛或停下來。切勿把停車燈與紅色後燈混淆。" },
    memoryHook: "踩腳掣着「紅停車燈」（光啲）＝慢駛／停定；勿同普通紅尾燈撈亂。"
  },
  {
    id: "q297",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "如果「健康理由」想申請豁免佩戴汽車安全帶，應該如何辦理？是否列出自動豁免疾病清單？",
    options: {
      A: "提交有效醫生證明書向運輸署署長申請考慮；當局並無列出可自動獲得豁免的健康情況（包括懷孕）",
      B: "只需口頭向警員解釋身體不適即可即時豁免",
      C: "孕婦及長者一律自動獲得法定豁免"
    },
    answer: "A",
    whyRight: "須提交有效醫生證明書經運輸署署長考慮批准；並無任何自動豁免健康清單，孕婦亦同樣受安全帶規定約束。",
    whyWrong: { B: "口頭解釋無效，須經運輸署署長書面考慮批准。", C: "懷孕及年長均沒有自動豁免。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "因健康理由而豁免佩戴安全帶", page: 43, quote: "你如能提交有效的醫生證明書，可獲運輸署署長考慮豁免佩戴安全帶……當局並沒有列出在什麼健康情況下（包括懷孕），你可自動得到豁免。" },
    memoryHook: "安全帶健康豁免：無自動豁免（孕婦都無），須交醫生紙俾運輸署署長批！"
  },
  {
    id: "q298",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在汽車上檢查「慣性捲軸式」及「手調式」安全帶保養狀況時，下列哪項正確？",
    options: {
      A: "確保安全帶無被車門夾着或座椅壓着，慣性捲軸式未用部分能輕易滑回捲筒；手調式不應隨意垂於車廂地板，應懸置於特定夾子上",
      B: "帶扣配上彈性套柄不用時，可把套柄扭置於椅背後方便上下車",
      C: "不常使用的後座安全帶永遠不會老化，毋須檢查"
    },
    answer: "A",
    whyRight: "安全帶即使不常用也會老化，須檢查順滑回捲、不被車門夾壓、彈性套柄不可扭往椅背，手調帶須掛夾上勿垂地板。",
    whyWrong: { B: "守則明言不可把彈性套柄扭置於椅背或別處，亦不應把扣子拉離套柄。", C: "安全帶即使不是常用也會變殘舊，須定期檢查。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第五章", section: "安全帶的保養", page: 44, quote: "安全帶即使不是常用，也會變殘舊……確保安全帶不會給車門夾着或給座椅壓着……不可把套柄扭置於椅背……手調式安全帶應經常懸置於特定的夾子上，不可隨意垂在車廂地板上。" },
    memoryHook: "安全帶保養：唔常用都會舊、防門夾椅壓、手調掛夾勿拖地。"
  },
  {
    id: "q299",
    category: "driver_safety",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "使用「方向指示燈」及「手號」與其他道路使用者溝通時，下列哪項原則正確？",
    options: {
      A: "只要已亮起方向指示燈，便代表其他車輛必須立即停下讓你轉線",
      B: "信號只可用來表明自己的意向，切勿用來指示其他道路使用者應怎樣做；完成轉向後必須立即關掉方向指示燈",
      C: "轉完彎後可留着方向燈多閃一會以作提醒"
    },
    answer: "B",
    whyRight: "信號只用來適時、清楚地表明本身意向，絕不可指揮他人（亦不賦予優先權），轉向完成後須立即關燈免誤導他人。",
    whyWrong: { A: "打燈只表意向，仍須待安全且不迫使他車急剎或轉向才可行動。", C: "忘關方向燈極易令路口支路車輛誤以為你要轉彎而駛出相撞。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "第八章", section: "信號", page: 104, quote: "在完成轉向後，切記關掉方向指示燈……信號只可用來向其他道路使用者表明本身的意向，切勿用來指示其他道路使用者應怎樣做。" },
    memoryHook: "打燈＝講自己想點（唔係指揮人、唔係優先權），轉完即刻關燈！"
  },
  {
    id: "q300",
    category: "signs_signals",
    type: "text",
    trapTag: "高頻陷阱",
    prompt: "在車速限制每小時 70 公里或以上道路上，見到工程車尾部「閃爍箭嘴指示燈號」亮起「向左箭嘴」或「雙向箭嘴」時，應怎樣做？",
    options: {
      A: "立即在工程車正後方停下等候工程車收工",
      B: "及早提高警覺、適當減速，並遵循箭嘴指示的方向（靠工程車左面、右面，或左右任何一面）小心轉線駛過",
      C: "與普通私家車無關，只指示其他工程車"
    },
    answer: "B",
    whyRight: "工程車閃爍箭嘴燈號預告高速道路上有停下／慢駛工程車及封閉行車線：左箭靠左過、右箭靠右過、雙箭左右皆可、對角黃燈交替閃則示工程車將轉線。",
    whyWrong: { A: "應適當減速並依箭嘴方向安全轉線駛過，非停在後方。", C: "此燈號專為警告所有駛近的道路使用者而設。" },
    source: { origin: "網上考生高頻回報（LIHKG／模擬試）", chapter: "更多參考資料（路政署）", section: "閃爍箭嘴指示燈號", page: 140, quote: "警告駕駛人士倍加留意在車速限制每小時70公里或以上的道路上有停下或慢駛工程車輛及封閉行車線……適當減速，並遵循箭嘴指示的方向小心轉線駛經有關工程車輛。" },
    memoryHook: "工程車閃燈（≥70km/h 路）：左箭靠左過、右箭靠右過、雙箭兩邊得、對角閃＝工程車將轉線！"
  }
];

// 36 High-Yield Visual & Number/Law Contrastive Cards (Grounded 100% in HK Road Users' Code + 2025–2026 Laws)
window.CONTRAST_CARDS = [
  // ==================== 禁令與指令 (14 組) ====================
  {
    id: "c1",
    group: "command",
    title: "停車 STOP vs 讓路 GIVE WAY",
    page: "P.79, 111",
    left: { sign: "stop_oct", label: "八角形 STOP", rule: "無車都必完全停定" },
    right: { sign: "give_way", label: "倒三角 GIVE WAY", rule: "讓大路，安全可慢過" },
    hook: "八角必停定，倒三角讓大路"
  },
  {
    id: "c2",
    group: "command",
    title: "不准停車 vs 不准泊車",
    page: "P.90–92, 111",
    left: { sign: "no_stopping", label: "紅交叉 ＝ 不准停車", rule: "連落客都唔得 · 實黃線" },
    right: { sign: "no_parking", label: "單紅斜 ＝ 不准泊車", rule: "落客即走 OK · 虛黃線" },
    hook: "一劃禁泊，兩劃交叉連停都禁"
  },
  {
    id: "c3",
    group: "command",
    title: "單程行車 vs 只准向前駛",
    page: "P.66, 111",
    left: { sign: "one_way", label: "藍長方 ＝ 單程路", rule: "整條路單向，路口可依標記轉" },
    right: { sign: "ahead_only", label: "藍圓形 ＝ 只准向前", rule: "強制直行，禁左右轉" },
    hook: "長方單程路，圓形死命令直去"
  },
  {
    id: "c4",
    group: "command",
    title: "專營巴士線 vs 所有巴士線",
    page: "P.65, 113",
    left: { sign: "bus_lane_franchised", label: "巴士圖案 ＝ 專營專用", rule: "只准專營巴士行駛" },
    right: { sign: "bus_lane_all", label: "Bus 巴士字 ＝ 所有巴士", rule: "專營及非專營巴士均可" },
    hook: "畫公仔＝專營；寫中英文＝所有巴士"
  },
  {
    id: "c5",
    group: "command",
    title: "禁止所有汽車 vs 電單車除外",
    page: "P.112 #33–34",
    left: { sign: "no_motor_all", label: "電單車＋汽車", rule: "所有汽車一律禁入" },
    right: { sign: "no_motor_except_mc", label: "只畫私家車", rule: "禁汽車，電單車及三輪車除外" },
    hook: "紅圈有畫就禁，無畫電單車＝豁免"
  },
  {
    id: "c9",
    group: "command",
    title: "靠左行駛 vs 可取道任何一邊",
    page: "P.66, 111",
    left: { sign: "keep_left", label: "單一左下斜箭", rule: "必須靠安全島左邊駛過" },
    right: { sign: "pass_either_side", label: "分叉雙下斜箭", rule: "安全島左右兩邊皆可通過" },
    hook: "單箭只靠左，雙箭左右都通往同方向"
  },
  {
    id: "c10",
    group: "command",
    title: "前面路口左轉 vs 不准左轉",
    page: "P.111–112",
    left: { sign: "turn_left_ahead", label: "藍圓白左箭", rule: "強制於前面路口必須左轉" },
    right: { sign: "no_left_turn", label: "紅圈斜劃左箭", rule: "嚴禁左轉，須直行或右轉" },
    hook: "藍圓一定要做，紅圈斜劃絕對唔准"
  },
  {
    id: "c11",
    group: "command",
    title: "所有車輛不准駛入 vs 此路不通",
    page: "P.111, 123",
    left: { sign: "no_entry", label: "紅圓白橫棒", rule: "單程出口，所有車輛嚴禁駛入" },
    right: { sign: "no_through_road", label: "藍方紅頂 T 字", rule: "掘頭路，可駛入但前面無出口" },
    hook: "紅白橫棒禁入；藍底紅帽＝掘頭路"
  },
  {
    id: "c12",
    group: "command",
    title: "不准超車 vs 不准換線",
    page: "P.111–112",
    left: { sign: "no_overtaking", label: "紅圈紅斜線配兩架黑色私家車", rule: "禁止超越前面行駛中汽車" },
    right: { sign: "no_lane_change", label: "藍底長方形「KEEP IN LANE 不准換綫」", rule: "強制留在原線行駛，禁止轉換行車線" },
    hook: "紅圈紅斜線兩黑車＝禁超車；藍底長方形 KEEP IN LANE＝強制禁換線"
  },
  {
    id: "c13",
    group: "command",
    title: "限高 4.5 米 vs 限重 10 公噸",
    page: "P.112 #49–50",
    left: { sign: "height_limit_45", label: "上下黑三角夾數字", rule: "連貨物高度不得超過所示米數" },
    right: { sign: "weight_limit_10t", label: "純數字＋tonnes", rule: "車輛連乘客貨物總重上限" },
    hook: "上下兩尖夾住＝度高；寫 tonnes＝計總重"
  },
  {
    id: "c14",
    group: "command",
    title: "單車徑（禁汽車）vs 禁止單車進入",
    page: "P.111–112",
    left: { sign: "cycle_track", label: "藍圓白單車", rule: "單車專用徑，禁止汽車駛入" },
    right: { sign: "no_bicycles", label: "紅圈黑單車", rule: "禁止單車及三輪車進入" },
    hook: "藍圓單車專用；紅圈單車止步"
  },
  {
    id: "c15",
    group: "command",
    title: "騎單車必須下車 vs 行人優先區",
    page: "P.111–112",
    left: { sign: "cycle_dismount", label: "藍圓形推單車", rule: "必須落車推單車，不可騎行" },
    right: { sign: "pedestrian_priority", label: "紅圈人車同行（無斜線）", rule: "行人優先使用，車輛須慢駛讓路" },
    hook: "藍圓人企車側＝落車推；紅圈無斜線人車＝行人優先"
  },
  {
    id: "c16",
    group: "command",
    title: "快速公路起點 vs 快速公路終止",
    page: "P.113 #80–81",
    left: { sign: "expressway_start", label: "白底紅邊紅橋", rule: "進入快速公路（禁學牌／單車／行人）" },
    right: { sign: "expressway_end", label: "藍底白橋加紅斜線", rule: "快速公路終止，須留意新限速" },
    hook: "白底紅邊紅橋＝起點入高速；藍底白橋加紅斜線＝終止"
  },
  {
    id: "c17",
    group: "command",
    title: "警方停車檢查 vs 學校交通安全隊",
    page: "P.111 #11–12",
    left: { sign: "police_stop", label: "紅圈白底「STOP 停 / POLICE 警崗」", rule: "必須於標誌前停定候警員指示" },
    right: { sign: "school_patrol", label: "停 STOP 兒童棒", rule: "見隊員舉棒必停車讓學童過路" },
    hook: "兩塊都具法定效力，見到必完全停定"
  },

  // ==================== 警告路牌 (8 組) ====================
  {
    id: "c6",
    group: "warning",
    title: "前面雙程 vs 雙程橫過單程",
    page: "P.117 #57–58",
    left: { sign: "warn_two_way_ahead", label: "直向 ↑↓", rule: "前面由單程轉為雙程行車" },
    right: { sign: "warn_two_way_cross", label: "橫向 ←→", rule: "前面橫街為雙程路橫過" },
    hook: "直箭管前路，橫箭管橫街"
  },
  {
    id: "c18",
    group: "warning",
    title: "分隔車路終止 vs 兩邊道路收窄",
    page: "P.116 #7, #10",
    left: { sign: "warn_dual_end", label: "下方有黑色分道島", rule: "中央分道島完結，前面轉雙程" },
    right: { sign: "warn_narrow_both", label: "純兩線向內收", rule: "前面道路兩旁同時收窄" },
    hook: "下面多粒黑島＝分隔車路終止；冇島＝收窄"
  },
  {
    id: "c19",
    group: "warning",
    title: "交通意外黑點 vs 行人意外黑點",
    page: "P.116 #23–24",
    left: { sign: "warn_blackspot", label: "紅三角一點大黑點", rule: "前面為車輛交通意外黑點" },
    right: { sign: "warn_ped_blackspot", label: "紅三角車頭撞行人碰撞圖", rule: "前面為行人交通意外黑點" },
    hook: "淨大黑點＝車禍黑點；車頭撞行人碰撞圖＝行人黑點"
  },
  {
    id: "c20",
    group: "warning",
    title: "前面路滑 vs 前面鬆脫碎石",
    page: "P.120 #33–34",
    left: { sign: "warn_slippery", label: "車尾交叉胎痕", rule: "前面路面濕滑，避免急剎猛扭軚" },
    right: { sign: "warn_loose_chippings", label: "車胎彈起碎石", rule: "鬆脫碎石易彈花玻璃，須減速拉距" },
    hook: "兩條蛇胎痕＝路滑；點點飛起＝碎石"
  },
  {
    id: "c21",
    group: "warning",
    title: "前面有行人過路處 vs 前面有兒童",
    page: "P.117 #38–39",
    left: { sign: "warn_zebra_ahead", label: "大人行過虛線", rule: "前面有斑馬線／行人過路處" },
    right: { sign: "warn_children", label: "兩童拖手跑", rule: "學校區或遊樂場附近，提防衝出" },
    hook: "單人踏線＝過路處；兩細路跑＝前面有兒童"
  },
  {
    id: "c22",
    group: "warning",
    title: "前面有輕鐵／電車 vs 只限輕鐵／電車",
    page: "P.111, 117",
    left: { sign: "warn_lrt_tram", label: "紅三角警告牌", rule: "警告前面有輕鐵或電車橫過／共行" },
    right: { sign: "lrt_tram_only", label: "藍底長方形指令牌", rule: "專線只限輕鐵或電車，其他車輛及行人禁入" },
    hook: "紅三角＝提你小心；藍底長方形＝專線起點，私家車及行人唔准入"
  },
  {
    id: "c23",
    group: "warning",
    title: "前面有迴旋處 vs 前面有十字路口",
    page: "P.116 #8, #25",
    left: { sign: "warn_roundabout", label: "三箭順時針循環", rule: "香港迴旋處順時針行，必讓右方來車" },
    right: { sign: "warn_crossroads", label: "黑色十字交叉", rule: "前面有十字路口，減速留意左右來車" },
    hook: "圓圈箭嘴＝迴旋處讓右；大交叉＝十字路口"
  },
  {
    id: "c24",
    group: "warning",
    title: "前面有騎單車者 vs 前面有殘疾人士",
    page: "P.117 #34, #54",
    left: { sign: "warn_cyclists", label: "紅三角單車圖", rule: "提防單車切線，超越須留足闊度" },
    right: { sign: "warn_disabled", label: "紅三角輪椅圖", rule: "前面常有殘疾人士過路，須耐心禮讓" },
    hook: "同屬弱勢道路使用者，見牌即減速拉遠距離"
  },

  // ==================== 燈號與手號 (4 組) ====================
  {
    id: "c25",
    group: "signals",
    title: "紅黃燈齊亮 vs 紅燈連左轉綠箭",
    page: "P.106–107",
    left: { sign: "signal_red_amber", label: "紅＋黃同時亮", rule: "預備開車，但仍嚴禁越過停車線" },
    right: { sign: "signal_red_green_arrow", label: "紅燈＋綠左箭", rule: "只准往箭嘴方向安全轉左，直行必停" },
    hook: "紅黃齊亮唔郁得；紅配綠箭淨准跟箭轉"
  },
  {
    id: "c26",
    group: "signals",
    title: "消防局雙紅閃燈 vs 工程車對角黃閃燈",
    page: "P.106, 140",
    left: { sign: "signal_wigwag", label: "並排雙紅交替閃", rule: "緊急車輛出口／橋閘，必須停定" },
    right: { sign: "roadworks_arrow_diag", label: "對角雙黃交替閃", rule: "工程車正準備轉線，減速留意讓路" },
    hook: "並排紅閃必停車；對角黃閃＝工程車要切線"
  },
  {
    id: "c27",
    group: "signals",
    title: "架空紅交叉 vs 架空綠左下斜箭",
    page: "P.108",
    left: { sign: "lane_signal_cross", label: "紅色交叉 ×", rule: "該行車線已封閉，嚴禁駛入或停留" },
    right: { sign: "lane_signal_merge_left", label: "綠色左下斜箭 ↙", rule: "前面封線，須及早向箭嘴方向切線" },
    hook: "紅叉即刻唔行得；綠斜箭提你早啲切過去"
  },
  {
    id: "c28",
    group: "signals",
    title: "駕駛人三款必考手號（全用右臂）",
    page: "P.105",
    items: [
      { sign: "hand_signal_left", label: "逆時針打圈", rule: "我要向左轉" },
      { sign: "hand_signal_slow", label: "掌心向下上下擺", rule: "我要減速或停車" },
      { sign: "hand_signal_right", label: "右臂平舉指右", rule: "我要向右轉／駛出" }
    ],
    hook: "打圈轉左、上下擺慢停、平舉指右轉右"
  },

  // ==================== 地面標記與泊車 (5 組) ====================
  {
    id: "c29",
    group: "markings",
    title: "連續雙白實線 vs 靠你一邊虛雙白線",
    page: "P.125",
    left: { sign: "road_double_white_solid", label: "兩條連續實線", rule: "嚴禁橫越、騎跨或於旁泊車" },
    right: { sign: "road_double_white_broken", label: "靠你一邊虛線", rule: "確認安全時可越線超車或右轉" },
    hook: "睇靠自己嗰條：實線唔准過，虛線安全過得"
  },
  {
    id: "c30",
    group: "markings",
    title: "路旁黃線禁區 vs 三種白色單行虛線",
    page: "P.124, 126",
    left: { sign: "road_yellow_lines", label: "單／雙黃線", rule: "實黃禁停車（雙24h）；虛黃禁泊車" },
    right: { sign: "road_white_lines", label: "三種白虛線", rule: "線長空短（最右）＝警告線，前面危險" },
    hook: "黃線管停泊；白虛線越密越長＝警告危險"
  },
  {
    id: "c31",
    group: "markings",
    title: "一般黃色方格 vs 電車／輕鐵黃色方格",
    page: "P.78, 127",
    left: { sign: "yellow_box_normal", label: "一般路口黃格", rule: "想右轉而出口暢通、只受對頭車阻可暫停" },
    right: { sign: "road_yellow_box_rail", label: "電車／輕鐵黃格", rule: "出口受阻絕不可入，轉右亦不可停在格內" },
    hook: "普通黃格右轉有豁免；電車輕鐵黃格零豁免"
  },
  {
    id: "c32",
    group: "markings",
    title: "斑馬線之字線區 vs 電車站黃色停車線",
    page: "P.127",
    left: { sign: "zebra_crossing_mark", label: "斑馬線＋之字線", rule: "之字線區禁超車禁泊車；見人踏線必讓" },
    right: { sign: "tram_stop_mark", label: "電車站黃色停車線", rule: "無安全島電車站上落客時，必停喺黃線後" },
    hook: "之字區禁超車泊車；電車上落客停黃線後"
  },
  {
    id: "c7",
    group: "markings",
    title: "自動波斜路泊車扭軚",
    page: "P.95",
    left: { sign: "slope_park_up_kerb", label: "上斜＋有石壆 → 扭右", rule: "全港唯一扭右＋入 P 波拉手掣" },
    right: { sign: "slope_park_no_kerb", label: "下斜 / 無石壆 → 扭左", rule: "其餘 3 種情況全部扭左＋入 P 波" },
    hook: "唯有「上斜有石」扭右，其餘全扭左"
  },

  // ==================== 數字與 2025–2026 新例 (5 組) ====================
  {
    id: "c8",
    group: "numbers",
    title: "四色禁區標誌杆 & 乾／濕停車距離",
    page: "P.54, 91",
    left: { sign: "pole_colors", label: "禁區杆四色時段", rule: "紅7–12｜黃7–7｜綠8–10,5–7｜灰其他" },
    right: { sign: "stopping_distance_chart", label: "乾地最短停車距離", rule: "40→20m｜60→35m｜80→60m（濕剎×2）" },
    hook: "紅最長黃日頭綠返放工；思考＝車速÷4，濕地只將剎車×2"
  },
  {
    id: "c33",
    group: "numbers",
    title: "P 牌（暫准牌）vs 學牌（學習牌）",
    page: "P.47–48, 112",
    left: { sign: "p_plate", label: "P 牌（12 個月）", rule: "最高 70 km/h · 三線公路禁最右線 · 前後掛 P" },
    right: { sign: "no_learners", label: "學牌（禁快速公路）", rule: "禁快速公路／繁忙禁學時段／指定禁學路段 · 須持牌師傅陪同" },
    hook: "P 牌上得高速但限 70 禁最右；學牌禁快路、禁學時段及指定禁學路段"
  },
  {
    id: "c34",
    group: "numbers",
    title: "酒駕法定上限：呼氣 vs 血液 vs 尿液",
    page: "P.41",
    items: [
      { stat: "22 μg", statSub: "每 100 毫升呼氣", label: "呼氣測試上限", rule: "超過即屬酒駕（扣 10 分＋停牌）" },
      { stat: "50 mg", statSub: "每 100 毫升血液", label: "血液酒精上限", rule: "與 22 微克呼氣同等法定標準" },
      { stat: "67 mg", statSub: "每 100 毫升尿液", label: "尿液酒精上限", rule: "由細到大：22 → 50 → 67" }
    ],
    hook: "呼血尿由細到大：22 微克 → 50 毫克 → 67 毫克"
  },
  {
    id: "c35",
    group: "numbers",
    title: "2025–2026 最新生效法例必考兩大新制",
    page: "2025–2026 新例",
    left: {
      stat: "≤ 2 部",
      statSub: "對角 ≤ 19 cm",
      label: "2026.1.25 流動電訊裝置",
      rule: "行車時司機前方最多放 2 部、對角不逾 19 厘米、不阻視線、禁手持"
    },
    right: {
      stat: "< 8 歲",
      statSub: "兼未滿 1.35 米",
      label: "2025.11.1 兒童束縛設備",
      rule: "8 歲以下且身高未達 1.35 米兒童（兩者兼備），坐私家車前後座均須用認可兒童束縛設備，違例罰司機"
    },
    hook: "車頭最多 2 部 19cm 內；8 歲以下兼未夠 1.35m 必坐兒童椅"
  },
  {
    id: "c36",
    group: "numbers",
    title: "全卷必背三大距離數字總整理",
    page: "P.20, 41, 54, 134",
    items: [
      { stat: "23 米", statSub: "充足光線讀車牌", label: "考牌視力標準", rule: "約等於兩架雙層巴士長度" },
      { stat: "15 米", statSub: "天橋／隧道／綠公仔", label: "行人過路處範圍", rule: "兩旁 15 米內不得橫過馬路" },
      { stat: "約 50 米", statSub: "限速 ≤50 km/h 路", label: "壞車三角警告牌", rule: "放車後約 50 米（如情況不安全可放近些）；快速公路或逾 50 km/h 路嚴禁放牌" }
    ],
    hook: "23 視力、15 過路、雙 50 三角牌（另記 2 秒乾／4 秒濕跟車時間！）"
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
