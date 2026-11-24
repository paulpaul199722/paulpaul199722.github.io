// 1TakePass — Official HK Road Users' Code (June 2020 Edition) PDF Figure Manifest
// 100% cropped directly from the official Transport Department PDF (zero hand-drawn SVGs)
(() => {
  "use strict";

  const META = {
    ahead_only: { alt: "發出指令標誌 #3：只准向前駛（第 111 頁）", page: 111 },
    bus_lane_all: { alt: "發出指令標誌 #64：所有巴士線及生效時間（第 113 頁）", page: 113, wide: true },
    bus_lane_franchised: { alt: "發出指令標誌 #63：專營巴士線及生效時間（第 113 頁）", page: 113, wide: true },
    contraflow_bus: { alt: "反向行駛巴士線標誌（第 66 頁）", page: 66, wide: true },
    countdown_green_3: { alt: "分隔車路綠色三斜線倒數標誌（第 82 頁）", page: 82 },
    expressway_start: { alt: "發出指令標誌 #80：快速公路起點及連續部分（第 113 頁）", page: 113 },
    give_way: { alt: "發出指令標誌 #1：讓路給大路上的車輛（第 111 頁）", page: 111 },
    hand_signal_left: { alt: "駕駛人手號：右臂逆時針打圈（第 105 頁）", page: 105, wide: true },
    hand_signal_slow: { alt: "駕駛人手號：右臂上下擺動（第 105 頁）", page: 105, wide: true },
    lane_signal_cross: { alt: "架空行車線信號：紅色交叉（第 108 頁）", page: 108, wide: true },
    lane_signal_merge_left: { alt: "架空行車線信號：綠色左下斜箭嘴（第 108 頁）", page: 108, wide: true },
    long_vehicle_plate: { alt: "長車車尾標記 LONG VEHICLE（第 61 頁）", page: 61, wide: true },
    mileage_route9: { alt: "九號幹線里程標誌 23.0 / 9 / A（第 133 頁）", page: 133 },
    no_horn: { alt: "限制標誌：寂靜地帶起點／禁止響號（第 52 頁）", page: 52 },
    no_learners: { alt: "發出指令標誌 #39：禁止由學習駕駛人駕駛的汽車駛入（第 112 頁）", page: 112 },
    no_motor_all: { alt: "發出指令標誌 #33：禁止汽車駛入（第 112 頁）", page: 112 },
    no_motor_except_mc: { alt: "發出指令標誌 #34：禁止汽車駛入，電單車及機動三輪車除外（第 112 頁）", page: 112 },
    no_overtaking: { alt: "發出指令標誌 #46：不准超車（第 112 頁）", page: 112 },
    no_parking: { alt: "發出指令標誌 #8：不准泊車（第 111 頁）", page: 111 },
    no_stopping: { alt: "發出指令標誌 #7：不准停車（第 111 頁）", page: 111 },
    no_through_road: { alt: "提示標誌：此路不通（第 123 頁）", page: 123 },
    one_way: { alt: "單程行車標誌（第 66 頁）", page: 66 },
    p_plate: { alt: "暫准駕駛執照「P」字牌（第 48 頁）", page: 48 },
    parking_general: { alt: "發出指令標誌 #75：泊車標誌 P（第 113 頁）", page: 113 },
    pass_either_side: { alt: "安全島標誌：可取道任何一邊（第 66 頁）", page: 66 },
    pedestrian_priority: { alt: "發出指令標誌 #31：行人優先使用區（第 112 頁）", page: 112 },
    pole_colors: { alt: "顏色標誌杆及禁區時段（第 91 頁）", page: 91, wide: true },
    road_double_white_broken: { alt: "指令道路標記：雙白線靠近你一邊為虛線（第 125 頁）", page: 125, tall: true },
    road_double_white_solid: { alt: "指令道路標記：連續雙白線（第 125 頁）", page: 125, tall: true },
    road_white_lines: { alt: "警告及提示道路標記：三種白色單行虛線（第 124 頁）", page: 124, wide: true },
    road_yellow_box_rail: { alt: "電車和輕鐵的黃色方格路口（第 78 頁）", page: 78, tall: true },
    road_yellow_lines: { alt: "指令道路標記：雙黃實線、單黃實線與單黃虛線（第 126 頁）", page: 126, wide: true },
    roadworks_arrow_diag: { alt: "道路工程車閃爍箭嘴指示燈號：對角黃燈交替閃動（第 140 頁）", page: 140 },
    roundabout_right: { alt: "傳統式兩線迴旋處轉右圖解（第 81 頁）", page: 81, wide: true },
    school_patrol: { alt: "發出指令標誌 #12：學校交通安全隊停車標誌（第 111 頁）", page: 111 },
    signal_red_amber: { alt: "交通燈號：紅燈與黃燈同時亮着（第 107 頁）", page: 107, tall: true },
    signal_red_green_arrow: { alt: "交通燈號：紅燈連左轉綠色箭嘴（第 106 頁）", page: 106 },
    signal_wigwag: { alt: "紅色警告閃燈：兩盞並排紅燈交替閃動（第 106 頁）", page: 106 },
    slope_park_no_kerb: { alt: "在斜路泊車圖解：上坡／下坡斜路沒有路邊石（第 95 頁）", page: 95, tall: true },
    slope_park_up_kerb: { alt: "在斜路泊車圖解：上坡斜路有路邊石（第 95 頁）", page: 95, tall: true },
    stop_oct: { alt: "發出指令標誌 #2：停車及讓路 STOP（第 111 頁）", page: 111 },
    stopping_buses: { alt: "停車距離比例參考：雙層巴士長度圖示（第 54 頁）", page: 54, wide: true },
    stopping_distance_chart: { alt: "乾爽路面最短停車距離官方圖表（第 54 頁）", page: 54, wide: true },
    warn_blackspot: { alt: "發出警告標誌 #23：前面有交通意外黑點（第 116 頁）", page: 116 },
    warn_camera: { alt: "發出警告標誌 #59：前面有衝紅燈／偵速攝影機（第 118 頁）", page: 118, wide: true },
    warn_dual_end: { alt: "發出警告標誌 #7：前面分隔車路終止（第 116 頁）", page: 116 },
    warn_steep_down: { alt: "警告標誌：1:8 向下斜坡連低波行車字牌（第 67 頁）", page: 67, tall: true },
    warn_two_way_ahead: { alt: "發出警告標誌 #58：前面雙程行車（第 117 頁）", page: 117 },
    warn_two_way_cross: { alt: "發出警告標誌 #57：前面雙程行車路橫過單程路（第 117 頁）", page: 117 },
    wind_affected: { alt: "發出指令標誌 #69：受風車輛不准駛入（第 113 頁）", page: 113, wide: true }
  };

  const ASSETS = {};
  for (const [key, info] of Object.entries(META)) {
    ASSETS[key] = {
      src: `./assets/signs/${key}.png`,
      alt: info.alt,
      page: info.page,
      wide: !!info.wide,
      tall: !!info.tall
    };
  }

  const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  window.SIGN_ASSETS = ASSETS;
  window.renderSignImg = (key, { eager = false, thumb = false } = {}) => {
    const item = ASSETS[key];
    if (!item) return "";
    const cls = ["sign-img", item.wide ? "is-wide" : "", item.tall ? "is-tall" : "", thumb ? "is-thumb" : ""]
      .filter(Boolean)
      .join(" ");
    const loading = eager ? "eager" : "lazy";
    return `<img class="${cls}" src="${escAttr(item.src)}" alt="${escAttr(item.alt)}" loading="${loading}" decoding="async">`;
  };
})();
