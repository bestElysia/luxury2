// --- 数据准备 ---
// 城市数据库 (包含经纬度)
// --- 数据准备 ---
// 城市数据库 (包含经纬度) - 已扩充更多国家与城市
const cityDatabase = [
    // --- 北美洲 (美国) ---
    { id: "new_york", name: "纽约 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "niuyue new york us usa meiguo ny", lat: 40.71, lng: -74.01 },
    { id: "washington_dc", name: "华盛顿 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "huashengdun washington dc us usa meiguo", lat: 38.90, lng: -77.04 },
    { id: "boston", name: "波士顿 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "boshidun boston us usa meiguo", lat: 42.36, lng: -71.05 },
    { id: "miami", name: "迈阿密 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "maiami miami us usa meiguo", lat: 25.76, lng: -80.19 },
    { id: "atlanta", name: "亚特兰大 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "yatelanda atlanta us usa meiguo", lat: 33.75, lng: -84.39 },
    { id: "philadelphia", name: "费城 (美东)", flag: "🇺🇸", zone: "America/New_York", phone: "+1", tags: "feicheng philadelphia us usa meiguo", lat: 39.95, lng: -75.16 },
    { id: "chicago", name: "芝加哥 (美中)", flag: "🇺🇸", zone: "America/Chicago", phone: "+1", tags: "zhijiage chicago us usa meiguo", lat: 41.88, lng: -87.63 },
    { id: "houston", name: "休斯顿 (美中)", flag: "🇺🇸", zone: "America/Chicago", phone: "+1", tags: "xiusidun houston us usa meiguo", lat: 29.76, lng: -95.37 },
    { id: "dallas", name: "达拉斯 (美中)", flag: "🇺🇸", zone: "America/Chicago", phone: "+1", tags: "dalasi dallas us usa meiguo", lat: 32.78, lng: -96.80 },
    { id: "new_orleans", name: "新奥尔良 (美中)", flag: "🇺🇸", zone: "America/Chicago", phone: "+1", tags: "xinaoerliang new orleans us usa meiguo", lat: 29.95, lng: -90.07 },
    { id: "denver", name: "丹佛 (山地)", flag: "🇺🇸", zone: "America/Denver", phone: "+1", tags: "danfo denver us usa meiguo", lat: 39.74, lng: -104.99 },
    { id: "salt_lake_city", name: "盐湖城 (山地)", flag: "🇺🇸", zone: "America/Denver", phone: "+1", tags: "yanhucheng salt lake city us usa meiguo", lat: 40.76, lng: -111.89 },
    { id: "phoenix", name: "凤凰城 (山地)", flag: "🇺🇸", zone: "America/Phoenix", phone: "+1", tags: "fenghuangcheng phoenix arizona us usa meiguo", lat: 33.45, lng: -112.07 },
    { id: "los_angeles", name: "洛杉矶 (美西)", flag: "🇺🇸", zone: "America/Los_Angeles", phone: "+1", tags: "luoshanji los angeles la us usa meiguo", lat: 34.05, lng: -118.24 },
    { id: "san_francisco", name: "旧金山 (美西)", flag: "🇺🇸", zone: "America/Los_Angeles", phone: "+1", tags: "jiujinshan san francisco sf us usa meiguo", lat: 37.77, lng: -122.42 },
    { id: "seattle", name: "西雅图 (美西)", flag: "🇺🇸", zone: "America/Los_Angeles", phone: "+1", tags: "xiyatu seattle us usa meiguo", lat: 47.61, lng: -122.33 },
    { id: "las_vegas", name: "拉斯维加斯 (美西)", flag: "🇺🇸", zone: "America/Los_Angeles", phone: "+1", tags: "lasiweijiasi las vegas us usa meiguo", lat: 36.17, lng: -115.14 },
    { id: "san_diego", name: "圣地亚哥 (美西)", flag: "🇺🇸", zone: "America/Los_Angeles", phone: "+1", tags: "shengdiyage san diego us usa meiguo", lat: 32.72, lng: -117.16 },
    { id: "anchorage", name: "安克雷奇 (阿拉斯加)", flag: "🇺🇸", zone: "America/Anchorage", phone: "+1", tags: "ankeleiqi anchorage alaska us usa meiguo", lat: 61.22, lng: -149.90 },
    { id: "honolulu", name: "檀香山 (夏威夷)", flag: "🇺🇸", zone: "Pacific/Honolulu", phone: "+1", tags: "tanxiangshan honolulu hawaii us usa meiguo", lat: 21.31, lng: -157.86 },
    
    // --- 北美洲 (加拿大、墨西哥、中美洲及加勒比海) ---
    { id: "toronto", name: "多伦多 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "duolunduo toronto ca canada jianada", lat: 43.65, lng: -79.38 },
    { id: "ottawa", name: "渥太华 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "wotaihua ottawa ca canada jianada", lat: 45.42, lng: -75.70 },
    { id: "montreal", name: "蒙特利尔 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "mengtelier montreal ca canada jianada", lat: 45.50, lng: -73.57 },
    { id: "vancouver", name: "温哥华 (加西)", flag: "🇨🇦", zone: "America/Vancouver", phone: "+1", tags: "wengehua vancouver ca canada jianada", lat: 49.28, lng: -123.12 },
    { id: "calgary", name: "卡尔加里 (加西)", flag: "🇨🇦", zone: "America/Edmonton", phone: "+1", tags: "kaerjiali calgary ca canada jianada", lat: 51.04, lng: -114.07 },
    { id: "mexico_city", name: "墨西哥城 (墨西哥)", flag: "🇲🇽", zone: "America/Mexico_City", phone: "+52", tags: "moxigecheng mexico city mx moxige", lat: 19.43, lng: -99.13 },
    { id: "havana", name: "哈瓦那 (古巴)", flag: "🇨🇺", zone: "America/Havana", phone: "+53", tags: "hawana havana cuba guba", lat: 23.11, lng: -82.37 },
    { id: "panama_city", name: "巴拿马城 (巴拿马)", flag: "🇵🇦", zone: "America/Panama", phone: "+507", tags: "banamacheng panama", lat: 8.98, lng: -79.52 },
    { id: "san_jose_cr", name: "圣何塞 (哥斯达黎加)", flag: "🇨🇷", zone: "America/Costa_Rica", phone: "+506", tags: "shenghesai san jose costa rica gesidalijia", lat: 9.93, lng: -84.09 },
    
    // --- 亚洲 (东亚) ---
    { id: "beijing", name: "北京 (中国)", flag: "🇨🇳", zone: "Asia/Shanghai", phone: "+86", tags: "beijing china cn zhongguo", lat: 39.90, lng: 116.41 },
    { id: "shanghai", name: "上海 (中国)", flag: "🇨🇳", zone: "Asia/Shanghai", phone: "+86", tags: "shanghai china cn zhongguo", lat: 31.23, lng: 121.47 },
    { id: "guangzhou", name: "广州 (中国)", flag: "🇨🇳", zone: "Asia/Shanghai", phone: "+86", tags: "guangzhou china cn zhongguo", lat: 23.12, lng: 113.26 },
    { id: "shenzhen", name: "深圳 (中国)", flag: "🇨🇳", zone: "Asia/Shanghai", phone: "+86", tags: "shenzhen china cn zhongguo", lat: 22.54, lng: 114.05 },
    { id: "hongkong", name: "香港 (中国)", flag: "🇭🇰", zone: "Asia/Hong_Kong", phone: "+852", tags: "xianggang hong kong hk", lat: 22.32, lng: 114.17 },
    { id: "macau", name: "澳门 (中国)", flag: "🇲🇴", zone: "Asia/Macau", phone: "+853", tags: "aomen macau mo macao", lat: 22.19, lng: 113.54 },
    { id: "taipei", name: "台北 (中国台湾)", flag: "🇨🇳", zone: "Asia/Taipei", phone: "+886", tags: "taibei taipei tw taiwan", lat: 25.03, lng: 121.57 },
    { id: "tokyo", name: "东京 (日本)", flag: "🇯🇵", zone: "Asia/Tokyo", phone: "+81", tags: "dongjing tokyo jp japan riben", lat: 35.69, lng: 139.69 },
    { id: "osaka", name: "大阪 (日本)", flag: "🇯🇵", zone: "Asia/Tokyo", phone: "+81", tags: "daban osaka jp japan riben", lat: 34.69, lng: 135.50 },
    { id: "seoul", name: "首尔 (韩国)", flag: "🇰🇷", zone: "Asia/Seoul", phone: "+82", tags: "shouer seoul kr korea hanguo", lat: 37.57, lng: 126.98 },
    { id: "pyongyang", name: "平壤 (朝鲜)", flag: "🇰🇵", zone: "Asia/Pyongyang", phone: "+850", tags: "pingrang pyongyang kp north korea chaoxian", lat: 39.03, lng: 125.76 },
    { id: "ulaanbaatar", name: "乌兰巴托 (蒙古)", flag: "🇲🇳", zone: "Asia/Ulaanbaatar", phone: "+976", tags: "wulanbatuo ulaanbaatar mn mongolia menggu", lat: 47.92, lng: 106.92 },
    
    // --- 亚洲 (东南亚) ---
    { id: "singapore", name: "新加坡", flag: "🇸🇬", zone: "Asia/Singapore", phone: "+65", tags: "xinjiapo singapore sg", lat: 1.35, lng: 103.82 },
    { id: "bangkok", name: "曼谷 (泰国)", flag: "🇹🇭", zone: "Asia/Bangkok", phone: "+66", tags: "mangu bangkok th thailand taiguo", lat: 13.75, lng: 100.50 },
    { id: "hanoi", name: "河内 (越南)", flag: "🇻🇳", zone: "Asia/Ho_Chi_Minh", phone: "+84", tags: "henei hanoi vn vietnam yuenan", lat: 21.02, lng: 105.83 },
    { id: "ho_chi_minh", name: "胡志明市 (越南)", flag: "🇻🇳", zone: "Asia/Ho_Chi_Minh", phone: "+84", tags: "huzhimingshi ho chi minh vn vietnam yuenan", lat: 10.82, lng: 106.63 },
    { id: "kuala_lumpur", name: "吉隆坡 (大马)", flag: "🇲🇾", zone: "Asia/Kuala_Lumpur", phone: "+60", tags: "jilongpo kuala lumpur my malaysia malaixiya", lat: 3.14, lng: 101.69 },
    { id: "jakarta", name: "雅加达 (印尼)", flag: "🇮🇩", zone: "Asia/Jakarta", phone: "+62", tags: "yajiada jakarta id indonesia yinni", lat: -6.20, lng: 106.85 },
    { id: "manila", name: "马尼拉 (菲律宾)", flag: "🇵🇭", zone: "Asia/Manila", phone: "+63", tags: "manila manila ph philippines feilubin", lat: 14.60, lng: 120.98 },
    { id: "phnom_penh", name: "金边 (柬埔寨)", flag: "🇰🇭", zone: "Asia/Phnom_Penh", phone: "+855", tags: "jinbian phnom penh kh cambodia jianpuzhai", lat: 11.55, lng: 104.92 },
    { id: "yangon", name: "仰光 (缅甸)", flag: "🇲🇲", zone: "Asia/Yangon", phone: "+95", tags: "yangguang yangon mm myanmar miandian", lat: 16.84, lng: 96.14 },
    
    // --- 亚洲 (南亚与中亚) ---
    { id: "new_delhi", name: "新德里 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "xindeli new delhi in india yindu", lat: 28.61, lng: 77.21 },
    { id: "mumbai", name: "孟买 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "mengmai mumbai in india yindu", lat: 19.08, lng: 72.88 },
    { id: "bangalore", name: "班加罗尔 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "banjialuoer bangalore in india yindu", lat: 12.97, lng: 77.59 },
    { id: "dhaka", name: "达卡 (孟加拉)", flag: "🇧🇩", zone: "Asia/Dhaka", phone: "+880", tags: "daka dhaka bd bangladesh mengjiala", lat: 23.81, lng: 90.41 },
    { id: "kathmandu", name: "加德满都 (尼泊尔)", flag: "🇳🇵", zone: "Asia/Kathmandu", phone: "+977", tags: "jiademandou kathmandu np nepal niboer", lat: 27.72, lng: 85.32 },
    { id: "colombo", name: "科伦坡 (斯里兰卡)", flag: "🇱🇰", zone: "Asia/Colombo", phone: "+94", tags: "kelunpo colombo lk sri lanka sililanka", lat: 6.92, lng: 79.86 },
    { id: "islamabad", name: "伊斯兰堡 (巴基斯坦)", flag: "🇵🇰", zone: "Asia/Karachi", phone: "+92", tags: "yisilanbao islamabad pk pakistan bajisitan", lat: 33.68, lng: 73.04 },
    { id: "kabul", name: "喀布尔 (阿富汗)", flag: "🇦🇫", zone: "Asia/Kabul", phone: "+93", tags: "kabuer kabul af afghanistan afuhan", lat: 34.56, lng: 69.20 },
    { id: "tashkent", name: "塔什干 (乌兹别克)", flag: "🇺🇿", zone: "Asia/Tashkent", phone: "+998", tags: "tashigan tashkent uz uzbekistan wuzibieke", lat: 41.30, lng: 69.24 },
    { id: "astana", name: "阿斯塔纳 (哈萨克)", flag: "🇰🇿", zone: "Asia/Almaty", phone: "+7", tags: "asitana astana kz kazakhstan hasake", lat: 51.16, lng: 71.47 },
    
    // --- 中东 ---
    { id: "dubai", name: "迪拜 (阿联酋)", flag: "🇦🇪", zone: "Asia/Dubai", phone: "+971", tags: "dibai dubai ae uae alianqiu", lat: 25.20, lng: 55.27 },
    { id: "abudhabi", name: "阿布扎比 (阿联酋)", flag: "🇦🇪", zone: "Asia/Dubai", phone: "+971", tags: "abuzhabi abu dhabi ae uae alianqiu", lat: 24.45, lng: 54.37 },
    { id: "riyadh", name: "利雅得 (沙特)", flag: "🇸🇦", zone: "Asia/Riyadh", phone: "+966", tags: "liyade riyadh sa saudi arabia shate", lat: 24.71, lng: 46.68 },
    { id: "doha", name: "多哈 (卡塔尔)", flag: "🇶🇦", zone: "Asia/Qatar", phone: "+974", tags: "duoha doha qa qatar kataer", lat: 25.29, lng: 51.53 },
    { id: "kuwait_city", name: "科威特城 (科威特)", flag: "🇰🇼", zone: "Asia/Kuwait", phone: "+965", tags: "keweitecheng kuwait kw keweite", lat: 29.37, lng: 47.98 },
    { id: "manama", name: "麦纳麦 (巴林)", flag: "🇧🇭", zone: "Asia/Bahrain", phone: "+973", tags: "mainamai manama bh bahrain balin", lat: 26.23, lng: 50.59 },
    { id: "muscat", name: "马斯喀特 (阿曼)", flag: "🇴🇲", zone: "Asia/Muscat", phone: "+968", tags: "masikate muscat om oman aman", lat: 23.58, lng: 58.40 },
    { id: "tehran", name: "德黑兰 (伊朗)", flag: "🇮🇷", zone: "Asia/Tehran", phone: "+98", tags: "deheilan tehran ir iran yilang", lat: 35.69, lng: 51.39 },
    { id: "jerusalem", name: "耶路撒冷 (以色列)", flag: "🇮🇱", zone: "Asia/Jerusalem", phone: "+972", tags: "yelusaleng jerusalem il israel yiselie", lat: 31.77, lng: 35.21 },
    { id: "amman", name: "安曼 (约旦)", flag: "🇯🇴", zone: "Asia/Amman", phone: "+962", tags: "anman amman jo jordan yuedan", lat: 31.95, lng: 35.92 },
    { id: "beirut", name: "贝鲁特 (黎巴嫩)", flag: "🇱🇧", zone: "Asia/Beirut", phone: "+961", tags: "beilute beirut lb lebanon libanen", lat: 33.89, lng: 35.50 },
    { id: "ankara", name: "安卡拉 (土耳其)", flag: "🇹🇷", zone: "Europe/Istanbul", phone: "+90", tags: "ankala ankara tr turkey tuerqi", lat: 39.93, lng: 32.85 },
    { id: "istanbul", name: "伊斯坦布尔 (土耳其)", flag: "🇹🇷", zone: "Europe/Istanbul", phone: "+90", tags: "yisitanbuer istanbul tr turkey tuerqi", lat: 41.01, lng: 28.98 },
    { id: "baku", name: "巴库 (阿塞拜疆)", flag: "🇦🇿", zone: "Asia/Baku", phone: "+994", tags: "baku baku az azerbaijan asaibaijiang", lat: 40.41, lng: 49.87 },
    
    // --- 欧洲 ---
    { id: "london", name: "伦敦 (英国)", flag: "🇬🇧", zone: "Europe/London", phone: "+44", tags: "lundun london uk gb united kingdom yingguo", lat: 51.51, lng: -0.13 },
    { id: "manchester", name: "曼彻斯特 (英国)", flag: "🇬🇧", zone: "Europe/London", phone: "+44", tags: "manchesite manchester uk gb united kingdom yingguo", lat: 53.48, lng: -2.24 },
    { id: "paris", name: "巴黎 (法国)", flag: "🇫🇷", zone: "Europe/Paris", phone: "+33", tags: "bali paris fr france faguo", lat: 48.86, lng: 2.35 },
    { id: "berlin", name: "柏林 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "bolin berlin de germany deguo", lat: 52.52, lng: 13.41 },
    { id: "frankfurt", name: "法兰克福 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "falankefu frankfurt de germany deguo", lat: 50.11, lng: 8.68 },
    { id: "munich", name: "慕尼黑 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "munihei munich de germany deguo", lat: 48.13, lng: 11.58 },
    { id: "rome", name: "罗马 (意大利)", flag: "🇮🇹", zone: "Europe/Rome", phone: "+39", tags: "luoma rome it italy yidali", lat: 41.90, lng: 12.50 },
    { id: "milan", name: "米兰 (意大利)", flag: "🇮🇹", zone: "Europe/Rome", phone: "+39", tags: "milan milan it italy yidali", lat: 45.46, lng: 9.19 },
    { id: "madrid", name: "马德里 (西班牙)", flag: "🇪🇸", zone: "Europe/Madrid", phone: "+34", tags: "madeli madrid es spain xibanya", lat: 40.42, lng: -3.70 },
    { id: "barcelona", name: "巴塞罗那 (西班牙)", flag: "🇪🇸", zone: "Europe/Madrid", phone: "+34", tags: "basailuona barcelona es spain xibanya", lat: 41.39, lng: 2.17 },
    { id: "lisbon", name: "里斯本 (葡萄牙)", flag: "🇵🇹", zone: "Europe/Lisbon", phone: "+351", tags: "lisiben lisbon pt portugal putaoya", lat: 38.72, lng: -9.14 },
    { id: "amsterdam", name: "阿姆斯特丹 (荷兰)", flag: "🇳🇱", zone: "Europe/Amsterdam", phone: "+31", tags: "amusitedan amsterdam nl netherlands helan", lat: 52.37, lng: 4.89 },
    { id: "brussels", name: "布鲁塞尔 (比利时)", flag: "🇧🇪", zone: "Europe/Brussels", phone: "+32", tags: "bulusaier brussels be belgium bilishi", lat: 50.85, lng: 4.35 },
    { id: "vienna", name: "维也纳 (奥地利)", flag: "🇦🇹", zone: "Europe/Vienna", phone: "+43", tags: "weiyena vienna at austria aodili", lat: 48.21, lng: 16.37 },
    { id: "zurich", name: "苏黎世 (瑞士)", flag: "🇨🇭", zone: "Europe/Zurich", phone: "+41", tags: "sulishi zurich ch switzerland ruishi", lat: 47.38, lng: 8.54 },
    { id: "geneva", name: "日内瓦 (瑞士)", flag: "🇨🇭", zone: "Europe/Zurich", phone: "+41", tags: "rineiwa geneva ch switzerland ruishi", lat: 46.20, lng: 6.14 },
    { id: "prague", name: "布拉格 (捷克)", flag: "🇨🇿", zone: "Europe/Prague", phone: "+420", tags: "bulage prague cz czech jieke", lat: 50.08, lng: 14.44 },
    { id: "budapest", name: "布达佩斯 (匈牙利)", flag: "🇭🇺", zone: "Europe/Budapest", phone: "+36", tags: "budapeisi budapest hu hungary xiongyali", lat: 47.50, lng: 19.04 },
    { id: "warsaw", name: "华沙 (波兰)", flag: "🇵🇱", zone: "Europe/Warsaw", phone: "+48", tags: "huasha warsaw pl poland bolan", lat: 52.23, lng: 21.01 },
    { id: "copenhagen", name: "哥本哈根 (丹麦)", flag: "🇩🇰", zone: "Europe/Copenhagen", phone: "+45", tags: "gebenhagen copenhagen dk denmark danmai", lat: 55.68, lng: 12.57 },
    { id: "oslo", name: "奥斯陆 (挪威)", flag: "🇳🇴", zone: "Europe/Oslo", phone: "+47", tags: "aosilu oslo no norway nuowei", lat: 59.91, lng: 10.75 },
    { id: "stockholm", name: "斯德哥尔摩 (瑞典)", flag: "🇸🇪", zone: "Europe/Stockholm", phone: "+46", tags: "sidegeermo stockholm se sweden ruidian", lat: 59.33, lng: 18.06 },
    { id: "helsinki", name: "赫尔辛基 (芬兰)", flag: "🇫🇮", zone: "Europe/Helsinki", phone: "+358", tags: "heerxinji helsinki fi finland fenlan", lat: 60.17, lng: 24.94 },
    { id: "reykjavik", name: "雷克雅未克 (冰岛)", flag: "🇮🇸", zone: "Atlantic/Reykjavik", phone: "+354", tags: "leikeyaweike reykjavik is iceland bingdao", lat: 64.14, lng: -21.94 },
    { id: "dublin", name: "都柏林 (爱尔兰)", flag: "🇮🇪", zone: "Europe/Dublin", phone: "+353", tags: "doubolin dublin ie ireland aierlan", lat: 53.35, lng: -6.26 },
    { id: "athens", name: "雅典 (希腊)", flag: "🇬🇷", zone: "Europe/Athens", phone: "+30", tags: "yadian athens gr greece xila", lat: 37.98, lng: 23.73 },
    { id: "belgrade", name: "贝尔格莱德 (塞尔维亚)", flag: "🇷🇸", zone: "Europe/Belgrade", phone: "+381", tags: "beiergelaide belgrade rs serbia saierweiya", lat: 44.81, lng: 20.45 },
    { id: "sofia", name: "索菲亚 (保加利亚)", flag: "🇧🇬", zone: "Europe/Sofia", phone: "+359", tags: "suofiya sofia bg bulgaria baojialiya", lat: 42.69, lng: 23.32 },
    { id: "bucharest", name: "布加勒斯特 (罗马尼亚)", flag: "🇷🇴", zone: "Europe/Bucharest", phone: "+40", tags: "bujialesite bucharest ro romania luomaniya", lat: 44.43, lng: 26.10 },
    { id: "moscow", name: "莫斯科 (俄罗斯)", flag: "🇷🇺", zone: "Europe/Moscow", phone: "+7", tags: "mosike moscow ru russia eluosi", lat: 55.75, lng: 37.62 },
    { id: "kyiv", name: "基辅 (乌克兰)", flag: "🇺🇦", zone: "Europe/Kyiv", phone: "+380", tags: "jifu kyiv ua ukraine wukelan", lat: 50.45, lng: 30.52 },
    
    // --- 南美洲 ---
    { id: "brasilia", name: "巴西利亚 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "baxiliya brasilia br brazil baxi", lat: -15.78, lng: -47.93 },
    { id: "sao_paulo", name: "圣保罗 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "shengbaoluo sao paulo br brazil baxi", lat: -23.55, lng: -46.63 },
    { id: "rio", name: "里约 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "liyue rio de janeiro br brazil baxi", lat: -22.91, lng: -43.17 },
    { id: "buenos_aires", name: "布宜诺斯 (阿根廷)", flag: "🇦🇷", zone: "America/Argentina/Buenos_Aires", phone: "+54", tags: "buyinuosi buenos aires ar argentina agenting", lat: -34.61, lng: -58.38 },
    { id: "santiago", name: "圣地亚哥 (智利)", flag: "🇨🇱", zone: "America/Santiago", phone: "+56", tags: "shengdiyage santiago cl chile zhili", lat: -33.45, lng: -70.67 },
    { id: "bogota", name: "波哥大 (哥伦比亚)", flag: "🇨🇴", zone: "America/Bogota", phone: "+57", tags: "bogeda bogota co colombia gelunbiya", lat: 4.61, lng: -74.08 },
    { id: "lima", name: "利马 (秘鲁)", flag: "🇵🇪", zone: "America/Lima", phone: "+51", tags: "lima lima pe peru bilu", lat: -12.04, lng: -77.04 },
    { id: "quito", name: "基多 (厄瓜多尔)", flag: "🇪🇨", zone: "America/Guayaquil", phone: "+593", tags: "jiduo quito ec ecuador eguaduoer", lat: -0.18, lng: -78.47 },
    { id: "caracas", name: "加拉加斯 (委内瑞拉)", flag: "🇻🇪", zone: "America/Caracas", phone: "+58", tags: "jialajiasi caracas ve venezuela weineiruila", lat: 10.48, lng: -66.90 },
    { id: "montevideo", name: "蒙得维的亚 (乌拉圭)", flag: "🇺🇾", zone: "America/Montevideo", phone: "+598", tags: "mengdeweideya montevideo uy uruguay wulagui", lat: -34.90, lng: -56.16 },
    
    // --- 大洋洲 ---
    { id: "canberra", name: "堪培拉 (澳洲)", flag: "🇦🇺", zone: "Australia/Sydney", phone: "+61", tags: "kanpeila canberra au australia aozhou", lat: -35.28, lng: 149.13 },
    { id: "sydney", name: "悉尼 (澳洲)", flag: "🇦🇺", zone: "Australia/Sydney", phone: "+61", tags: "xini sydney au australia aozhou", lat: -33.87, lng: 151.21 },
    { id: "melbourne", name: "墨尔本 (澳洲)", flag: "🇦🇺", zone: "Australia/Melbourne", phone: "+61", tags: "moerben melbourne au australia aozhou", lat: -37.81, lng: 144.96 },
    { id: "brisbane", name: "布里斯班 (澳洲)", flag: "🇦🇺", zone: "Australia/Brisbane", phone: "+61", tags: "bulisiban brisbane au australia aozhou", lat: -27.47, lng: 153.03 },
    { id: "adelaide", name: "阿德莱德 (澳洲)", flag: "🇦🇺", zone: "Australia/Adelaide", phone: "+61", tags: "adelaide adelaide au australia aozhou", lat: -34.93, lng: 138.60 },
    { id: "perth", name: "珀斯 (澳洲)", flag: "🇦🇺", zone: "Australia/Perth", phone: "+61", tags: "posi perth au australia aozhou", lat: -31.95, lng: 115.86 },
    { id: "wellington", name: "惠灵顿 (新西兰)", flag: "🇳🇿", zone: "Pacific/Auckland", phone: "+64", tags: "huilingdun wellington nz new zealand xinxilan", lat: -41.29, lng: 174.78 },
    { id: "auckland", name: "奥克兰 (新西兰)", flag: "🇳🇿", zone: "Pacific/Auckland", phone: "+64", tags: "aokelan auckland nz new zealand xinxilan", lat: -36.85, lng: 174.76 },
    
    // --- 非洲 ---
    { id: "cairo", name: "开罗 (埃及)", flag: "🇪🇬", zone: "Africa/Cairo", phone: "+20", tags: "kailuo cairo eg egypt aiji", lat: 30.04, lng: 31.24 },
    { id: "johannesburg", name: "约堡 (南非)", flag: "🇿🇦", zone: "Africa/Johannesburg", phone: "+27", tags: "yuebao johannesburg za south africa nanfei", lat: -26.20, lng: 28.04 },
    { id: "cape_town", name: "开普敦 (南非)", flag: "🇿🇦", zone: "Africa/Johannesburg", phone: "+27", tags: "kaipudun cape town za south africa nanfei", lat: -33.92, lng: 18.42 },
    { id: "lagos", name: "拉各斯 (尼日利亚)", flag: "🇳🇬", zone: "Africa/Lagos", phone: "+234", tags: "lagesi lagos ng nigeria niriliya", lat: 6.52, lng: 3.38 },
    { id: "nairobi", name: "内罗毕 (肯尼亚)", flag: "🇰🇪", zone: "Africa/Nairobi", phone: "+254", tags: "neiluobi nairobi ke kenya kenniya", lat: -1.29, lng: 36.82 },
    { id: "addis_ababa", name: "亚的斯亚贝巴", flag: "🇪🇹", zone: "Africa/Addis_Ababa", phone: "+251", tags: "yadesiyabeiba addis ababa et ethiopia aisaiebiya", lat: 9.03, lng: 38.74 },
    { id: "casablanca", name: "卡萨布兰卡 (摩洛哥)", flag: "🇲🇦", zone: "Africa/Casablanca", phone: "+212", tags: "kasabulanka casablanca ma morocco moluoge", lat: 33.57, lng: -7.59 },
    { id: "tunis", name: "突尼斯市 (突尼斯)", flag: "🇹🇳", zone: "Africa/Tunis", phone: "+216", tags: "tunisi tunis tn tunisia", lat: 36.80, lng: 10.18 },
    { id: "accra", name: "阿克拉 (加纳)", flag: "🇬🇭", zone: "Africa/Accra", phone: "+233", tags: "akela accra gh ghana jiana", lat: 5.60, lng: -0.18 },
    { id: "dakar", name: "达喀尔 (塞内加尔)", flag: "🇸🇳", zone: "Africa/Dakar", phone: "+221", tags: "dakaer dakar sn senegal saineijiaer", lat: 14.71, lng: -17.46 },
    { id: "dar_es_salaam", name: "达累斯萨拉姆 (坦桑尼亚)", flag: "🇹🇿", zone: "Africa/Dar_es_Salaam", phone: "+255", tags: "daleisisalamu dar es salaam tz tanzania tansangniya", lat: -6.79, lng: 39.20 },
    
        // --- ⬇️ 全新补充的城市（直接追加到原数组末尾） ---
    // 欧洲补充
    { id: "luxembourg", name: "卢森堡", flag: "🇱🇺", zone: "Europe/Luxembourg", phone: "+352", tags: "lusenbao luxembourg financial center", lat: 49.61, lng: 6.13 },
    { id: "belfast", name: "贝尔法斯特 (北爱尔兰)", flag: "🇬🇧", zone: "Europe/London", phone: "+44", tags: "beierfaisite belfast uk gb united kingdom", lat: 54.59, lng: -5.93 },
    { id: "edinburgh", name: "爱丁堡 (苏格兰)", flag: "🇬🇧", zone: "Europe/London", phone: "+44", tags: "aidingbao edinburgh uk gb united kingdom", lat: 55.95, lng: -3.18 },
    
    // 中东与中亚补充
    { id: "tel_aviv", name: "特拉维夫 (以色列)", flag: "🇮🇱", zone: "Asia/Jerusalem", phone: "+972", tags: "telaweifu tel aviv il israel tech center", lat: 32.08, lng: 34.78 },
    { id: "jeddah", name: "吉达 (沙特)", flag: "🇸🇦", zone: "Asia/Riyadh", phone: "+966", tags: "jida jeddah sa saudi arabia port", lat: 21.54, lng: 39.17 },
    { id: "almaty", name: "阿拉木图 (哈萨克)", flag: "🇰🇿", zone: "Asia/Almaty", phone: "+7", tags: "alamutu almaty kz kazakhstan", lat: 43.23, lng: 76.88 },
    
    // 亚太补充
    { id: "hanoi_time", name: "海防 (越南)", flag: "🇻🇳", zone: "Asia/Ho_Chi_Minh", phone: "+84", tags: "haifang haiphong vn vietnam port", lat: 20.84, lng: 106.68 },
    { id: "penang", name: "槟城 (大马)", flag: "🇲🇾", zone: "Asia/Kuala_Lumpur", phone: "+60", tags: "bincheng penang my malaysia tech", lat: 5.41, lng: 100.32 },
    { id: "cebu", name: "宿务 (菲律宾)", flag: "🇵🇭", zone: "Asia/Manila", phone: "+63", tags: "suwu cebu ph philippines", lat: 10.31, lng: 123.89 },
    { id: "dhaka_port", name: "吉大港 (孟加拉)", flag: "🇧🇩", zone: "Asia/Dhaka", phone: "+880", tags: "jidagang chittagong bd bangladesh port", lat: 22.35, lng: 91.78 },
    
    // 美洲与加勒比海补充
    { id: "panama_colon", name: "科隆 (巴拿马自由贸易区)", flag: "🇵🇦", zone: "America/Panama", phone: "+507", tags: "kelong colon panama free zone", lat: 9.35, lng: -79.90 },
    { id: "georgetown", name: "开曼群岛", flag: "🇰🇾", zone: "America/Cayman", phone: "+1", tags: "kaiman kaimanqundao cayman islands georgetown offshore", lat: 19.28, lng: -81.38 },
    { id: "tortola", name: "英属维尔京群岛 (BVI)", flag: "🇻🇬", zone: "America/Tortola", phone: "+1", tags: "yingshuweierjing bvi virgin islands offshore tortola", lat: 18.42, lng: -64.61 },
    { id: "nassau", name: "拿骚 (巴哈马)", flag: "🇧🇸", zone: "America/Nassau", phone: "+1", tags: "nasao nassau bahamas offshore", lat: 25.04, lng: -77.35 },
    
    // 非洲补充
    { id: "port_louis", name: "路易港 (毛里求斯)", flag: "🇲🇺", zone: "Indian/Mauritius", phone: "+230", tags: "luyigang port louis mu mauritius offshore", lat: -20.16, lng: 57.50 },
    { id: "algiers", name: "阿尔及尔 (阿尔及利亚)", flag: "🇩🇿", zone: "Africa/Algiers", phone: "+213", tags: "aerjier algiers dz algeria", lat: 36.75, lng: 3.05 },
    { id: "luanda", name: "罗安达 (安哥拉)", flag: "🇦🇴", zone: "Africa/Luanda", phone: "+244", tags: "luanda luanda ao angola", lat: -8.83, lng: 13.23 },
    { id: "abidjan", name: "阿比让 (科特迪瓦)", flag: "🇨🇮", zone: "Africa/Abidjan", phone: "+225", tags: "abirang abidjan ci cote d'ivoire", lat: 5.35, lng: -4.00 },
    
        // --- ⬇️ 第三批补充城市（直接追加到原数组末尾） ---
    
    // --- 欧洲 (波罗的海、巴尔干及东欧新兴科技中心) ---
    { id: "tallinn", name: "塔林 (爱沙尼亚)", flag: "🇪🇪", zone: "Europe/Tallinn", phone: "+372", tags: "talin tallinn ee estonia aishaniya e-residency", lat: 59.43, lng: 24.75 },
    { id: "riga", name: "里加 (拉脱维亚)", flag: "🇱🇻", zone: "Europe/Riga", phone: "+371", tags: "lijia riga lv latvia latuoweiya", lat: 56.94, lng: 24.10 },
    { id: "vilnius", name: "维尔纽斯 (立陶宛)", flag: "🇱🇹", zone: "Europe/Vilnius", phone: "+370", tags: "weierniusi vilnius lt lithuania litaowan", lat: 54.68, lng: 25.27 },
    { id: "zagreb", name: "萨格勒布 (克罗地亚)", flag: "🇭🇷", zone: "Europe/Zagreb", phone: "+385", tags: "sagelebu zagreb hr croatia keluodiya", lat: 45.81, lng: 15.98 },
    { id: "bratislava", name: "布拉迪斯拉发 (斯洛伐克)", flag: "🇸🇰", zone: "Europe/Bratislava", phone: "+421", tags: "buladisilafa bratislava sk slovakia siluofake", lat: 48.14, lng: 17.10 },
    { id: "valletta", name: "瓦莱塔 (马耳他)", flag: "🇲🇹", zone: "Europe/Malta", phone: "+356", tags: "walaita valletta mt malta maerta blockchain", lat: 35.89, lng: 14.51 },
    { id: "nicosia", name: "尼科西亚 (塞浦路斯)", flag: "🇨🇾", zone: "Asia/Nicosia", phone: "+357", tags: "nikexiya nicosia cy cyprus saipulusi", lat: 35.18, lng: 33.38 },
    { id: "minsk", name: "明斯克 (白俄罗斯)", flag: "🇧🇾", zone: "Europe/Minsk", phone: "+375", tags: "mingsike minsk by belarus baieluosi", lat: 53.90, lng: 27.56 },

    // --- 亚洲 (高加索、中亚及南亚小国) ---
    { id: "tbilisi", name: "第比利斯 (格鲁吉亚)", flag: "🇬🇪", zone: "Asia/Tbilisi", phone: "+995", tags: "dibilisi tbilisi ge georgia gelujiya", lat: 41.71, lng: 44.82 },
    { id: "yerevan", name: "埃里温 (亚美尼亚)", flag: "🇦🇲", zone: "Asia/Yerevan", phone: "+374", tags: "ailiwen yerevan am armenia yameniya", lat: 40.18, lng: 44.51 },
    { id: "bishkek", name: "比什凯克 (吉尔吉斯)", flag: "🇰🇬", zone: "Asia/Bishkek", phone: "+996", tags: "bishenkaike bishkek kg kyrgyzstan jierjisisitan", lat: 42.87, lng: 74.59 },
    { id: "male", name: "马累 (马尔代夫)", flag: "🇲🇻", zone: "Indian/Maldives", phone: "+960", tags: "malei male mv maldives maerdaifu", lat: 4.17, lng: 73.50 },
    { id: "vientiane", name: "万象 (老挝)", flag: "🇱🇦", zone: "Asia/Vientiane", phone: "+856", tags: "wanxiang vientiane la laos laowo", lat: 17.97, lng: 102.60 },
    { id: "bandar_seri_begawan", name: "斯里巴加湾 (文莱)", flag: "🇧🇳", zone: "Asia/Brunei", phone: "+673", tags: "silibajiawan brunei bn wenlai", lat: 4.89, lng: 114.94 },

    // --- 中东 ---
    { id: "baghdad", name: "巴格达 (伊拉克)", flag: "🇮🇶", zone: "Asia/Baghdad", phone: "+964", tags: "bageda baghdad iq iraq yilake", lat: 33.31, lng: 44.36 },
    { id: "damascus", name: "大马士革 (叙利亚)", flag: "🇸🇾", zone: "Asia/Damascus", phone: "+963", tags: "damashige damascus sy syria xuliya", lat: 33.51, lng: 36.29 },

    // --- 美洲 (中美洲、加勒比海及南美内陆) ---
    { id: "guatemala_city", name: "危地马拉城 (危地马拉)", flag: "🇬🇹", zone: "America/Guatemala", phone: "+502", tags: "weidimala guatemala city gt", lat: 14.63, lng: -90.52 },
    { id: "santo_domingo", name: "圣多明各 (多米尼加)", flag: "🇩🇴", zone: "America/Santo_Domingo", phone: "+1", tags: "shengduomingge santo domingo do dominican duominijia", lat: 18.48, lng: -69.93 },
    { id: "kingston", name: "金斯敦 (牙买加)", flag: "🇯🇲", zone: "America/Jamaica", phone: "+1", tags: "jinsidun kingston jm jamaica yamaijia", lat: 17.97, lng: -76.79 },
    { id: "san_juan", name: "圣胡安 (波多黎各)", flag: "🇵🇷", zone: "America/Puerto_Rico", phone: "+1", tags: "shenghuan san juan pr puerto rico", lat: 18.46, lng: -66.10 },
    { id: "hamilton", name: "汉密尔顿 (百慕大)", flag: "🇧🇲", zone: "Atlantic/Bermuda", phone: "+1", tags: "hanmierdun hamilton bm bermuda baimuda offshore", lat: 32.29, lng: -64.78 },
    { id: "la_paz", name: "拉巴斯 (玻利维亚)", flag: "🇧🇴", zone: "America/La_Paz", phone: "+591", tags: "labasi la paz bo bolivia boliweiya", lat: -16.48, lng: -68.11 },
    { id: "asuncion", name: "亚松森 (巴拉圭)", flag: "🇵🇾", zone: "America/Asuncion", phone: "+595", tags: "yasongsen asuncion py paraguay balagui", lat: -25.26, lng: -57.57 },

    // --- 大洋洲 (太平洋岛国) ---
    { id: "suva", name: "苏瓦 (斐济)", flag: "🇫🇯", zone: "Pacific/Fiji", phone: "+679", tags: "suwa suva fj fiji feiji", lat: -18.12, lng: 178.42 },
    { id: "port_moresby", name: "莫尔斯比港 (巴布亚新几内亚)", flag: "🇵🇬", zone: "Pacific/Port_Moresby", phone: "+675", tags: "moersibigang port moresby pg png", lat: -9.44, lng: 147.18 },

    // --- 非洲 (新兴增长市场) ---
    { id: "kigali", name: "基加利 (卢旺达)", flag: "🇷🇼", zone: "Africa/Kigali", phone: "+250", tags: "jijiali kigali rw rwanda luwangda tech", lat: -1.94, lng: 30.06 },
    { id: "kampala", name: "坎帕拉 (乌干达)", flag: "🇺🇬", zone: "Africa/Kampala", phone: "+256", tags: "kanpala kampala ug uganda wuganda", lat: 0.34, lng: 32.58 },
    { id: "lusaka", name: "卢萨卡 (赞比亚)", flag: "🇿🇲", zone: "Africa/Lusaka", phone: "+260", tags: "lusaka lusaka zm zambia zanbiya", lat: -15.38, lng: 28.32 },
    { id: "harare", name: "哈拉雷 (津巴布韦)", flag: "🇿🇼", zone: "Africa/Harare", phone: "+263", tags: "halalei harare zw zimbabwe jinbabuwei", lat: -17.82, lng: 31.04 },
    { id: "maputo", name: "马普托 (莫桑比克)", flag: "🇲🇿", zone: "Africa/Maputo", phone: "+258", tags: "maputuo maputo mz mozambique mosangbike", lat: -25.96, lng: 32.57 },
    { id: "antananarivo", name: "塔那那利佛 (马达加斯加)", flag: "🇲🇬", zone: "Indian/Antananarivo", phone: "+261", tags: "tananalifo antananarivo mg madagascar madajiasijia", lat: -18.87, lng: 47.50 },
    
        // --- ⬇️ 第四批补充城市（直接追加到原数组末尾） ---
    
    // --- 亚洲 (次级科技、工业与港口中心) ---
    { id: "chennai", name: "金奈 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "jinnai chennai in india it", lat: 13.08, lng: 80.27 },
    { id: "hyderabad", name: "海得拉巴 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "haidelaba hyderabad in india tech", lat: 17.38, lng: 78.48 },
    { id: "busan", name: "釜山 (韩国)", flag: "🇰🇷", zone: "Asia/Seoul", phone: "+82", tags: "fushan busan kr korea port", lat: 35.17, lng: 129.07 },
    { id: "fukuoka", name: "福冈 (日本)", flag: "🇯🇵", zone: "Asia/Tokyo", phone: "+81", tags: "fugang fukuoka jp japan", lat: 33.59, lng: 130.40 },
    { id: "sapporo", name: "札幌 (日本)", flag: "🇯🇵", zone: "Asia/Tokyo", phone: "+81", tags: "zhahuang sapporo jp japan", lat: 43.06, lng: 141.35 },
    { id: "kaohsiung", name: "高雄 (中国台湾)", flag: "🇨🇳", zone: "Asia/Taipei", phone: "+886", tags: "gaoxiong kaohsiung tw taiwan port", lat: 22.62, lng: 120.31 },

    // --- 欧洲 (次级经济、科技与文化中心) ---
    { id: "stuttgart", name: "斯图加特 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "situojiate stuttgart de germany auto", lat: 48.77, lng: 9.18 },
    { id: "lyon", name: "里昂 (法国)", flag: "🇫🇷", zone: "Europe/Paris", phone: "+33", tags: "liang lyon fr france", lat: 45.76, lng: 4.83 },
    { id: "porto", name: "波尔图 (葡萄牙)", flag: "🇵🇹", zone: "Europe/Lisbon", phone: "+351", tags: "boertu porto pt portugal", lat: 41.15, lng: -8.61 },
    { id: "gothenburg", name: "哥德堡 (瑞典)", flag: "🇸🇪", zone: "Europe/Stockholm", phone: "+46", tags: "gedebao gothenburg se sweden", lat: 57.70, lng: 11.97 },
    { id: "krakow", name: "克拉科夫 (波兰)", flag: "🇵🇱", zone: "Europe/Warsaw", phone: "+48", tags: "kelakefu krakow pl poland", lat: 50.06, lng: 19.94 },

    // --- 特殊时区、岛屿与海外领地 (极具参考价值) ---
    { id: "guam", name: "关岛 (美国)", flag: "🇬🇺", zone: "Pacific/Guam", phone: "+1", tags: "guandao guam gu us usa military", lat: 13.44, lng: 144.79 },
    { id: "papeete", name: "帕皮提 (大溪地)", flag: "🇵🇫", zone: "Pacific/Tahiti", phone: "+689", tags: "papiti papeete tahiti pf french polynesia daxidi", lat: -17.54, lng: -149.56 },
    { id: "apia", name: "阿皮亚 (萨摩亚)", flag: "🇼🇸", zone: "Pacific/Apia", phone: "+685", tags: "apiya apia ws samoa samoya", lat: -13.83, lng: -171.75 },
    { id: "easter_island", name: "复活节岛 (智利)", flag: "🇨🇱", zone: "Pacific/Easter", phone: "+56", tags: "fuhuojiedao easter island cl chile", lat: -27.11, lng: -109.34 },
    { id: "las_palmas", name: "拉斯帕尔马斯 (加那利群岛)", flag: "🇮🇨", zone: "Atlantic/Canary", phone: "+34", tags: "lasipaermasi las palmas canary islands ic spain jianaliqundao", lat: 28.12, lng: -15.43 },
    { id: "ponta_delgada", name: "蓬塔德尔加达 (亚速尔群岛)", flag: "🇵🇹", zone: "Atlantic/Azores", phone: "+351", tags: "pengtadeerjiada ponta delgada azores pt portugal yasuoer", lat: 37.74, lng: -25.66 },

    // --- 美洲 (加勒比与南美东北部) ---
    { id: "port_of_spain", name: "西班牙港 (特多)", flag: "🇹🇹", zone: "America/Port_of_Spain", phone: "+1", tags: "xibanyagang port of spain tt trinidad", lat: 10.65, lng: -61.51 },
    { id: "georgetown_gy", name: "乔治敦 (圭亚那)", flag: "🇬🇾", zone: "America/Guyana", phone: "+592", tags: "qiaozhidun georgetown gy guyana guiyana", lat: 6.80, lng: -58.15 },
    { id: "paramaribo", name: "帕拉马里博 (苏里南)", flag: "🇸🇷", zone: "America/Paramaribo", phone: "+597", tags: "palamalibo paramaribo sr suriname sulinan", lat: 5.85, lng: -55.20 },

    // --- 非洲 (更多国家中心) ---
    { id: "kinshasa", name: "金沙萨 (刚果金)", flag: "🇨🇩", zone: "Africa/Kinshasa", phone: "+243", tags: "jinshasa kinshasa cd drc gangguo", lat: -4.44, lng: 15.26 },
    { id: "gaborone", name: "哈博罗内 (博茨瓦纳)", flag: "🇧🇼", zone: "Africa/Gaborone", phone: "+267", tags: "haboluonei gaborone bw botswana bociwana", lat: -24.62, lng: 25.92 },
    { id: "windhoek", name: "温得和克 (纳米比亚)", flag: "🇳🇦", zone: "Africa/Windhoek", phone: "+264", tags: "wendeheke windhoek na namibia namibiya", lat: -22.56, lng: 17.08 },
    { id: "bamako", name: "巴马科 (马里)", flag: "🇲🇱", zone: "Africa/Bamako", phone: "+223", tags: "bamake bamako ml mali", lat: 12.63, lng: -8.00 }



];


let currentCities = [];
const initialIds = ["new_york", "los_angeles", "paris", "london", "tokyo", "prague", "sydney", "mexico_city", "madrid", "riyadh", "dubai", "manama", "jerusalem", "amsterdam", "rome", "warsaw"];
let simulatedDate = null;
let selectedCityId = null;
const weatherCache = {};
const CACHE_DURATION = 1200000;

// --- 主题配置 ---
const themes = [
    // 云端
    { name: "☁️ 云端", color: "#f5f7fa", image: "none", titleColor: "#2c3e50", isDynamic: false, cardBg: "#ffffff" },
    // 流光
    {
        name: "🌊 流光",
        color: "#23a6d5", 
        image: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        titleColor: "#fff",
        isDynamic: true,
        cardBg: "rgba(255, 255, 255, 0.65)"
    },
    // 极光
    {
        name: "🌌 极光",
        color: "#2c364",
        image: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #43e97b)",
        titleColor: "#fff",
        isDynamic: true,
        cardBg: "rgba(255, 255, 255, 0.65)"
    },
    // 梦幻
    {
        name: "🦄 梦幻",
        color: "#ffc2d1",
        image: "linear-gradient(-45deg, #ff9a9e, #fad0c4, #ffd1ff, #a18cd1)",
        titleColor: "#444",
        isDynamic: true,
        cardBg: "rgba(255, 255, 255, 0.65)"
    }
];

let currentThemeIndex = 0;

// --- DOM 元素引用 ---
const modal = document.getElementById("addModal");
const cityListContainer = document.getElementById("cityListContainer");
const searchInput = document.getElementById("citySearch");
const confirmBtn = document.getElementById("confirmBtn");
const themeBtn = document.getElementById("themeBtn");

// --- 初始化与主题逻辑 ---
function init() {
    loadData();
    renderGrid();
    initSortable();
    initTimeMachine();
    initTheme();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    setInterval(refreshAllWeather, 1800000);

    // --- 修复部分：绑定事件监听器 ---
    
    // 1. 搜索框输入事件
    if (searchInput) {
        searchInput.addEventListener("input", filterCities);
    }

    // 2. 确认添加按钮点击事件
    if (confirmBtn) {
        confirmBtn.addEventListener("click", confirmAdd);
    }

    // 3. 模态框背景点击关闭
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- 绑定其他事件 ---

    // 主题切换按钮
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // 全局点击事件：控制动态背景暂停/播放
    document.body.addEventListener('click', (e) => {
        const isInteractive = e.target.closest('.city-card, .main-card, .time-machine, .float-btn, .modal-content, .add-card');
        const isDynamicTheme = document.body.classList.contains('animate-bg');
        if (!isInteractive && isDynamicTheme) {
            document.body.classList.toggle('bg-paused');
        }
    });
}

function initTheme() {
    const saved = localStorage.getItem("myWorldClock_theme_idx");
    if (saved) {
        currentThemeIndex = parseInt(saved);
        if (currentThemeIndex >= themes.length) currentThemeIndex = 0;
    }
    applyTheme();
}

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme();
    localStorage.setItem("myWorldClock_theme_idx", currentThemeIndex);

    // 🌸 触发樱花视频特效
    const video = document.getElementById('sakura-video');
    if (video) {
        video.currentTime = 0; // 从头播放
        video.classList.add('playing'); // 显示
        video.play().catch(e => console.log("视频播放失败(可能需要交互):", e));

        // 播放结束后自动隐藏
        video.onended = () => {
            video.classList.remove('playing');
        };
    }
}

function applyTheme() {
    const t = themes[currentThemeIndex];
    document.documentElement.style.setProperty('--bg-color', t.color);
    document.documentElement.style.setProperty('--bg-image', t.image);
    document.documentElement.style.setProperty('--title-color', t.titleColor);
    document.documentElement.style.setProperty('--card-bg', t.cardBg);

    if (t.isDynamic) {
        document.body.classList.add('animate-bg');
        document.body.classList.remove('bg-paused');
    } else {
        document.body.classList.remove('animate-bg');
    }

    if (themeBtn) themeBtn.innerText = `🎨 换肤: ${t.name.split(' ')[1]}`;

    // 动态修改浏览器状态栏颜色
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.name = "theme-color";
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = t.color;
}

// --- 卡片交互与渲染 ---
function createRipple(event, element) {
    const ripple = document.createElement("span");
    const dot = element.querySelector(".status-dot");
    if (dot && dot.classList.contains("dot-green")) {
        ripple.classList.add("ripple", "ripple-green");
    } else {
        ripple.classList.add("ripple", "ripple-grey");
    }
    const oldRipple = element.getElementsByClassName("ripple")[0];
    if (oldRipple) oldRipple.remove();
    element.appendChild(ripple);
}

function handleCardClick(event, element) {
    createRipple(event, element);
    if (element.classList.contains("active-green") || element.classList.contains("active-grey")) {
        element.classList.remove("active-green", "active-grey");
    } else {
        const dot = element.querySelector(".status-dot");
        if (dot && dot.classList.contains("dot-green")) {
            element.classList.add("active-green");
        } else {
            element.classList.add("active-grey");
        }
    }
}

function initTimeMachine() {
    const input = document.getElementById("simTimeInput");
    const resetBtn = document.getElementById("resetTimeBtn");
    
    // 初始化输入框显示
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    
    input.value = `${year}-${month}-${day}T${hour}:${minute}`;
    
    // 监听输入变化
    input.addEventListener("input", (e) => {
        if (e.target.value) {
            simulatedDate = new Date(e.target.value);
            resetBtn.classList.remove("active");
            document.getElementById("mainCard").classList.add("simulating");
            updateAllClocks();
        }
    });

    // 监听重置按钮 (补充的修复)
    if (resetBtn) {
        resetBtn.addEventListener("click", resetRealTime);
    }
}

function resetRealTime() {
    simulatedDate = null;
    const input = document.getElementById("simTimeInput");
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    input.value = `${year}-${month}-${day}T${hour}:${minute}`;
    
    document.getElementById("resetTimeBtn").classList.add("active");
    document.getElementById("mainCard").classList.remove("simulating");
    updateAllClocks();
}

function getWorkStatus(date) {
    const hour = date.getHours();
    if (hour >= 8 && hour < 23) {
        return { text: "可联系", color: "dot-green" };
    } else {
        return { text: "休息", color: "dot-grey" };
    }
}

const STORAGE_KEY = "myWorldClock_v8_Weather";

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const ids = JSON.parse(saved);
        currentCities = ids.map(id => cityDatabase.find(c => c.id === id)).filter(Boolean);
    } else {
        currentCities = initialIds.map(id => cityDatabase.find(c => c.id === id)).filter(Boolean);
    }
}

function saveData() {
    const ids = currentCities.map(c => c.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function renderGrid() {
    const grid = document.getElementById("clocks-grid");
    grid.innerHTML = "";
    
    currentCities.forEach((city) => {
        const card = document.createElement("div");
        card.className = "city-card";
        card.setAttribute("data-id", city.id);
        card.setAttribute("data-zone", city.zone);
        card.onclick = function(e) { handleCardClick(e, this) };
        
        const cityId = city.id;
        let mainName = city.name;
        let subName = "";
        
        const parenIndex = city.name.indexOf(" (");
        if (parenIndex > -1) {
            subName = city.name.substring(0, parenIndex);
            mainName = city.name.substring(parenIndex + 2, city.name.length - 1);
        } else {
            mainName = city.name;
        }
        
        card.innerHTML = `
            <div class="delete-btn" onclick="removeCity('${city.id}', event)">×</div>
            <div class="city-header">
                <div class="header-left">
                    <span class="flag">${city.flag}</span>
                    <div class="city-text-col">
                        <div class="country-row-top">
                            <span class="country-row-text">${mainName}</span>
                            <span class="phone-text-plain">${city.phone}</span>
                        </div>
                        <div class="city-subtext">${subName}</div>
                    </div>
                </div>
                <div class="status-dot-wrapper">
                    <span class="status-dot" id="dot-${cityId}"></span>
                    <span class="status-text" id="status-${cityId}">...</span>
                </div>
            </div>
            <div class="city-time" id="time-${cityId}">00:00</div>
            <div class="city-info-row">
                <div class="city-date" id="date-${cityId}">...</div>
                <div class="weather-wrapper" id="weather-${cityId}"></div>
                <div class="diff-tag" id="diff-${cityId}">...</div>
            </div>
        `;
        
        grid.appendChild(card);
        fetchCityWeather(city);
    });
    
    const addCard = document.createElement("div");
    addCard.className = "add-card";
    addCard.setAttribute("data-no-drag", "true");
    addCard.onclick = openModal;
    addCard.innerHTML = '<span class="add-icon">+</span>';
    grid.appendChild(addCard);
}

// --- 弹窗逻辑 ---
function openModal() {
    modal.classList.add("active");
    searchInput.value = "";
    selectedCityId = null;
    confirmBtn.disabled = true;
    renderCityList();
    setTimeout(() => searchInput.focus(), 100);
}

function closeModal() {
    modal.classList.remove("active");
}

function renderCityList(query = "") {
    cityListContainer.innerHTML = "";
    const currentIds = currentCities.map(c => c.id);
    let filtered = cityDatabase.filter(c => !currentIds.includes(c.id));
    
    if (query) {
        const q = query.trim().toLowerCase();
        const phoneQ = q.replace(/^\+/, "");
        filtered = filtered.filter(c => {
            const nameMatch = c.name.toLowerCase().includes(q);
            const phoneMatch = c.phone.replace("+", "").startsWith(phoneQ);
            const tagsMatch = (c.tags || "").toLowerCase().includes(q);
            return nameMatch || phoneMatch || tagsMatch;
        });
    }
    
    filtered.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    
    if (filtered.length === 0) {
        cityListContainer.innerHTML = '<div style="padding:15px;text-align:center;color:#999;">无匹配结果</div>';
    } else {
        filtered.forEach(city => {
            const item = document.createElement("div");
            item.className = "city-item";
            if (selectedCityId === city.id) item.classList.add("selected");
            item.onclick = () => selectCity(city.id);
            item.innerHTML = `
                <span class="city-item-name">
                    <span class="city-item-flag">${city.flag}</span>${city.name}
                </span>`;
            cityListContainer.appendChild(item);
        });
    }
}

function filterCities() {
    renderCityList(searchInput.value);
}

function selectCity(id) {
    selectedCityId = id;
    confirmBtn.disabled = false;
    renderCityList(searchInput.value);
}

function confirmAdd() {
    if (!selectedCityId) return;
    const city = cityDatabase.find(c => c.id === selectedCityId);
    if (city) {
        currentCities.push(city);
        saveData();
        renderGrid();
        updateAllClocks();
        closeModal();
    }
}

function removeCity(id, event) {
    event.stopPropagation();
    if (confirm("确定要移除这个城市吗？")) {
        currentCities = currentCities.filter(c => c.id !== id);
        saveData();
        renderGrid();
        updateAllClocks();
    }
}

function initSortable() {
    const grid = document.getElementById("clocks-grid");
    // 确保你的 HTML 中已经加载了 SortableJS 库
    new Sortable(grid, {
        animation: 200,
        ghostClass: "sortable-ghost",
        // --- 优化部分开始 ---
        delay: 200,             // 触屏设备（手机）长按 200ms 才能拖动，防止滚动时误触
        delayOnTouchOnly: true, // 桌面设备（鼠标）无延迟，点击即拖动，体验更流畅
        // --- 优化部分结束 ---
        filter: "[data-no-drag]",
        preventOnFilter: false,
        onEnd: function (evt) {
            const newOrderIds = [];
            grid.querySelectorAll(".city-card").forEach(card => {
                newOrderIds.push(card.getAttribute("data-id"));
            });
            currentCities = newOrderIds.map(id => cityDatabase.find(c => c.id === id)).filter(Boolean);
            saveData();
        }
    });
}

// --- 时钟核心逻辑 ---
function updateAllClocks() {
    let now = simulatedDate || new Date();
    
    // 更新北京时间（基准）
    updateSingleClock(now, "Asia/Shanghai", "bj-time", "bj-date", null, true);
    
    // 更新各个城市
    currentCities.forEach(city => {
        updateSingleClock(now, city.zone, `time-${city.id}`, `date-${city.id}`, city, false);
        calculateDiff(now, city.zone, `diff-${city.id}`);
    });
}

function updateSingleClock(baseTime, timeZone, timeElId, dateElId, cityObj, showSeconds) {
    const timeEl = document.getElementById(timeElId);
    const dateEl = document.getElementById(dateElId);
    
    if (!timeEl) return;
    
    try {
        const localTimeStr = baseTime.toLocaleString("en-US", { timeZone: timeZone });
        const localDate = new Date(localTimeStr);
        
        const timeOpts = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: timeZone
        };
        if (showSeconds) timeOpts.second = "2-digit";
        
        const timeString = new Intl.DateTimeFormat("zh-CN", timeOpts).format(baseTime);
        const dateString = new Intl.DateTimeFormat("zh-CN", {
            month: "short",
            day: "numeric",
            weekday: "short",
            timeZone: timeZone
        }).format(baseTime);
        
        timeEl.textContent = timeString;
        dateEl.textContent = dateString;
        
        if (cityObj) {
            const dot = document.getElementById(`dot-${cityObj.id}`);
            const statusText = document.getElementById(`status-${cityObj.id}`);
            const status = getWorkStatus(localDate);
            
            if (statusText) statusText.textContent = status.text;
            if (dot) dot.className = `status-dot ${status.color}`;
        }
    } catch (e) {
        timeEl.textContent = "--:--";
    }
}

function calculateDiff(baseTime, targetZone, elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    
    const bjStr = baseTime.toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
    const targetStr = baseTime.toLocaleString("en-US", { timeZone: targetZone });
    
    const diffHours = (new Date(targetStr) - new Date(bjStr)) / 3600000;
    const absDiff = Math.abs(Math.round(diffHours * 10) / 10);
    
    let text = "";
    let color = "#666";
    let bg = "#f5f5f5";
    
    if (diffHours === 0) {
        text = "无时差";
        color = "#389e0d";
        bg = "#f6ffed";
    } else if (diffHours > 0) {
        text = `早 ${absDiff} 小时`;
        color = "#c41d7f";
        bg = "#fff0f6";
    } else {
        text = `晚 ${absDiff} 小时`;
        color = "#096dd9";
        bg = "#e6f7ff";
    }
    
    el.textContent = text;
    el.style.color = color;
    el.style.backgroundColor = bg;
}

// --- 天气功能 ---
function refreshAllWeather() {
    console.log("正在自动刷新天气...");
    currentCities.forEach(city => {
        fetchCityWeather(city);
    });
}

function fetchCityWeather(city) {
    if (!city.lat || !city.lng) return;
    const el = document.getElementById(`weather-${city.id}`);
    if (!el) return;
    
    const now = Date.now();
    if (weatherCache[city.id] && (now - weatherCache[city.id].timestamp < CACHE_DURATION)) {
        renderWeather(el, weatherCache[city.id].data);
        return;
    }
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            if (data.current_weather) {
                const wData = {
                    temp: Math.round(data.current_weather.temperature),
                    code: data.current_weather.weathercode
                };
                weatherCache[city.id] = { timestamp: now, data: wData };
                renderWeather(el, wData);
            }
        })
        .catch(err => {
            console.error("Weather error:", err);
            el.textContent = "";
        });
}

function renderWeather(el, data) {
    const emoji = getWeatherEmoji(data.code);
    el.innerHTML = `<span>${data.temp}°C</span> <span>${emoji}</span>`;
}

function getWeatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 85 && code <= 86) return "❄️";
    if (code >= 95) return "⛈️";
    return "🌡️";
}

// 启动
document.addEventListener('DOMContentLoaded', init);
