// --- 数据准备 ---
// 城市数据库 (包含经纬度)
const cityDatabase = [
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
    { id: "toronto", name: "多伦多 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "duolunduo toronto ca canada jianada", lat: 43.65, lng: -79.38 },
    { id: "ottawa", name: "渥太华 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "wotaihua ottawa ca canada jianada", lat: 45.42, lng: -75.70 },
    { id: "montreal", name: "蒙特利尔 (加东)", flag: "🇨🇦", zone: "America/Toronto", phone: "+1", tags: "mengtelier montreal ca canada jianada", lat: 45.50, lng: -73.57 },
    { id: "vancouver", name: "温哥华 (加西)", flag: "🇨🇦", zone: "America/Vancouver", phone: "+1", tags: "wengehua vancouver ca canada jianada", lat: 49.28, lng: -123.12 },
    { id: "mexico_city", name: "墨西哥城 (墨西哥)", flag: "🇲🇽", zone: "America/Mexico_City", phone: "+52", tags: "moxigecheng mexico city mx moxige", lat: 19.43, lng: -99.13 },
    { id: "havana", name: "哈瓦那 (古巴)", flag: "🇨🇺", zone: "America/Havana", phone: "+53", tags: "hawana havana cuba guba", lat: 23.11, lng: -82.37 },
    { id: "panama_city", name: "巴拿马城 (巴拿马)", flag: "🇵🇦", zone: "America/Panama", phone: "+507", tags: "banamacheng panama", lat: 8.98, lng: -79.52 },
    { id: "san_jose_cr", name: "圣何塞 (哥斯达黎加)", flag: "🇨🇷", zone: "America/Costa_Rica", phone: "+506", tags: "shenghesai san jose costa rica gesidalijia", lat: 9.93, lng: -84.09 },
    { id: "tokyo", name: "东京 (日本)", flag: "🇯🇵", zone: "Asia/Tokyo", phone: "+81", tags: "dongjing tokyo jp japan riben", lat: 35.69, lng: 139.69 },
    { id: "seoul", name: "首尔 (韩国)", flag: "🇰🇷", zone: "Asia/Seoul", phone: "+82", tags: "shouer seoul kr korea hanguo", lat: 37.57, lng: 126.98 },
    { id: "pyongyang", name: "平壤 (朝鲜)", flag: "🇰🇵", zone: "Asia/Pyongyang", phone: "+850", tags: "pingrang pyongyang kp north korea chaoxian", lat: 39.03, lng: 125.76 },
    { id: "beijing", name: "北京 (中国)", flag: "🇨🇳", zone: "Asia/Shanghai", phone: "+86", tags: "beijing china cn zhongguo", lat: 39.90, lng: 116.41 },
    { id: "taipei", name: "台北 (中国台湾)", flag: "🇨🇳", zone: "Asia/Taipei", phone: "+886", tags: "taibei taipei tw taiwan", lat: 25.03, lng: 121.57 },
    { id: "hongkong", name: "香港 (中国)", flag: "🇭🇰", zone: "Asia/Hong_Kong", phone: "+852", tags: "xianggang hong kong hk", lat: 22.32, lng: 114.17 },
    { id: "bangkok", name: "曼谷 (泰国)", flag: "🇹🇭", zone: "Asia/Bangkok", phone: "+66", tags: "mangu bangkok th thailand taiguo", lat: 13.75, lng: 100.50 },
    { id: "hanoi", name: "河内 (越南)", flag: "🇻🇳", zone: "Asia/Ho_Chi_Minh", phone: "+84", tags: "henei hanoi vn vietnam yuenan", lat: 21.02, lng: 105.83 },
    { id: "jakarta", name: "雅加达 (印尼)", flag: "🇮🇩", zone: "Asia/Jakarta", phone: "+62", tags: "yajiada jakarta id indonesia yinni", lat: -6.20, lng: 106.85 },
    { id: "kuala_lumpur", name: "吉隆坡 (大马)", flag: "🇲🇾", zone: "Asia/Kuala_Lumpur", phone: "+60", tags: "jilongpo kuala lumpur my malaysia malaixiya", lat: 3.14, lng: 101.69 },
    { id: "singapore", name: "新加坡", flag: "🇸🇬", zone: "Asia/Singapore", phone: "+65", tags: "xinjiapo singapore sg", lat: 1.35, lng: 103.82 },
    { id: "manila", name: "马尼拉 (菲律宾)", flag: "🇵🇭", zone: "Asia/Manila", phone: "+63", tags: "manila manila ph philippines feilubin", lat: 14.60, lng: 120.98 },
    { id: "new_delhi", name: "新德里 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "xindeli new delhi in india yindu", lat: 28.61, lng: 77.21 },
    { id: "mumbai", name: "孟买 (印度)", flag: "🇮🇳", zone: "Asia/Kolkata", phone: "+91", tags: "mengmai mumbai in india yindu", lat: 19.08, lng: 72.88 },
    { id: "dhaka", name: "达卡 (孟加拉)", flag: "🇧🇩", zone: "Asia/Dhaka", phone: "+880", tags: "daka dhaka bd bangladesh mengjiala", lat: 23.81, lng: 90.41 },
    { id: "kathmandu", name: "加德满都 (尼泊尔)", flag: "🇳🇵", zone: "Asia/Kathmandu", phone: "+977", tags: "jiademandou kathmandu np nepal niboer", lat: 27.72, lng: 85.32 },
    { id: "islamabad", name: "伊斯兰堡 (巴基斯坦)", flag: "🇵🇰", zone: "Asia/Karachi", phone: "+92", tags: "yisilanbao islamabad pk pakistan bajisitan", lat: 33.68, lng: 73.04 },
    { id: "kabul", name: "喀布尔 (阿富汗)", flag: "🇦🇫", zone: "Asia/Kabul", phone: "+93", tags: "kabuer kabul af afghanistan afuhan", lat: 34.56, lng: 69.20 },
    { id: "tehran", name: "德黑兰 (伊朗)", flag: "🇮🇷", zone: "Asia/Tehran", phone: "+98", tags: "deheilan tehran ir iran yilang", lat: 35.69, lng: 51.39 },
    { id: "dubai", name: "迪拜 (阿联酋)", flag: "🇦🇪", zone: "Asia/Dubai", phone: "+971", tags: "dibai dubai ae uae alianqiu", lat: 25.20, lng: 55.27 },
    { id: "abudhabi", name: "阿布扎比 (阿联酋)", flag: "🇦🇪", zone: "Asia/Dubai", phone: "+971", tags: "abuzhabi abu dhabi ae uae alianqiu", lat: 24.45, lng: 54.37 },
    { id: "manama", name: "麦纳麦 (巴林)", flag: "🇧🇭", zone: "Asia/Bahrain", phone: "+973", tags: "mainamai manama bh bahrain balin", lat: 26.23, lng: 50.59 },
    { id: "riyadh", name: "利雅得 (沙特)", flag: "🇸🇦", zone: "Asia/Riyadh", phone: "+966", tags: "liyade riyadh sa saudi arabia shate", lat: 24.71, lng: 46.68 },
    { id: "doha", name: "多哈 (卡塔尔)", flag: "🇶🇦", zone: "Asia/Qatar", phone: "+974", tags: "duoha doha qa qatar kataer", lat: 25.29, lng: 51.53 },
    { id: "kuwait_city", name: "科威特城 (科威特)", flag: "🇰🇼", zone: "Asia/Kuwait", phone: "+965", tags: "keweitecheng kuwait kw keweite", lat: 29.37, lng: 47.98 },
    { id: "jerusalem", name: "耶路撒冷 (以色列)", flag: "🇮🇱", zone: "Asia/Jerusalem", phone: "+972", tags: "yelusaleng jerusalem il israel yiselie", lat: 31.77, lng: 35.21 },
    { id: "ankara", name: "安卡拉 (土耳其)", flag: "🇹🇷", zone: "Europe/Istanbul", phone: "+90", tags: "ankala ankara tr turkey tuerqi", lat: 39.93, lng: 32.85 },
    { id: "istanbul", name: "伊斯坦布尔 (土耳其)", flag: "🇹🇷", zone: "Europe/Istanbul", phone: "+90", tags: "yisitanbuer istanbul tr turkey tuerqi", lat: 41.01, lng: 28.98 },
    { id: "baku", name: "巴库 (阿塞拜疆)", flag: "🇦🇿", zone: "Asia/Baku", phone: "+994", tags: "baku baku az azerbaijan asaibaijiang", lat: 40.41, lng: 49.87 },
    { id: "tashkent", name: "塔什干 (乌兹别克)", flag: "🇺🇿", zone: "Asia/Tashkent", phone: "+998", tags: "tashigan tashkent uz uzbekistan wuzibieke", lat: 41.30, lng: 69.24 },
    { id: "astana", name: "阿斯塔纳 (哈萨克)", flag: "🇰🇿", zone: "Asia/Almaty", phone: "+7", tags: "asitana astana kz kazakhstan hasake", lat: 51.16, lng: 71.47 },
    { id: "ulaanbaatar", name: "乌兰巴托 (蒙古)", flag: "🇲🇳", zone: "Asia/Ulaanbaatar", phone: "+976", tags: "wulanbatuo ulaanbaatar mn mongolia menggu", lat: 47.92, lng: 106.92 },
    { id: "london", name: "伦敦 (英国)", flag: "🇬🇧", zone: "Europe/London", phone: "+44", tags: "lundun london uk gb united kingdom yingguo", lat: 51.51, lng: -0.13 },
    { id: "paris", name: "巴黎 (法国)", flag: "🇫🇷", zone: "Europe/Paris", phone: "+33", tags: "bali paris fr france faguo", lat: 48.86, lng: 2.35 },
    { id: "berlin", name: "柏林 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "bolin berlin de germany deguo", lat: 52.52, lng: 13.41 },
    { id: "frankfurt", name: "法兰克福 (德国)", flag: "🇩🇪", zone: "Europe/Berlin", phone: "+49", tags: "falankefu frankfurt de germany deguo", lat: 50.11, lng: 8.68 },
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
    { id: "moscow", name: "莫斯科 (俄罗斯)", flag: "🇷🇺", zone: "Europe/Moscow", phone: "+7", tags: "mosike moscow ru russia eluosi", lat: 55.75, lng: 37.62 },
    { id: "kyiv", name: "基辅 (乌克兰)", flag: "🇺🇦", zone: "Europe/Kyiv", phone: "+380", tags: "jifu kyiv ua ukraine wukelan", lat: 50.45, lng: 30.52 },
    { id: "bucharest", name: "布加勒斯特 (罗马尼亚)", flag: "🇷🇴", zone: "Europe/Bucharest", phone: "+40", tags: "bujialesite bucharest ro romania luomaniya", lat: 44.43, lng: 26.10 },
    { id: "brasilia", name: "巴西利亚 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "baxiliya brasilia br brazil baxi", lat: -15.78, lng: -47.93 },
    { id: "sao_paulo", name: "圣保罗 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "shengbaoluo sao paulo br brazil baxi", lat: -23.55, lng: -46.63 },
    { id: "rio", name: "里约 (巴西)", flag: "🇧🇷", zone: "America/Sao_Paulo", phone: "+55", tags: "liyue rio de janeiro br brazil baxi", lat: -22.91, lng: -43.17 },
    { id: "buenos_aires", name: "布宜诺斯 (阿根廷)", flag: "🇦🇷", zone: "America/Argentina/Buenos_Aires", phone: "+54", tags: "buyinuosi buenos aires ar argentina agenting", lat: -34.61, lng: -58.38 },
    { id: "santiago", name: "圣地亚哥 (智利)", flag: "🇨🇱", zone: "America/Santiago", phone: "+56", tags: "shengdiyage santiago cl chile zhili", lat: -33.45, lng: -70.67 },
    { id: "bogota", name: "波哥大 (哥伦比亚)", flag: "🇨🇴", zone: "America/Bogota", phone: "+57", tags: "bogeda bogota co colombia gelunbiya", lat: 4.61, lng: -74.08 },
    { id: "lima", name: "利马 (秘鲁)", flag: "🇵🇪", zone: "America/Lima", phone: "+51", tags: "lima lima pe peru bilu", lat: -12.04, lng: -77.04 },
    { id: "quito", name: "基多 (厄瓜多尔)", flag: "🇪🇨", zone: "America/Guayaquil", phone: "+593", tags: "jiduo quito ec ecuador eguaduoer", lat: -0.18, lng: -78.47 },
    { id: "canberra", name: "堪培拉 (澳洲)", flag: "🇦🇺", zone: "Australia/Sydney", phone: "+61", tags: "kanpeila canberra au australia aozhou", lat: -35.28, lng: 149.13 },
    { id: "sydney", name: "悉尼 (澳洲)", flag: "🇦🇺", zone: "Australia/Sydney", phone: "+61", tags: "xini sydney au australia aozhou", lat: -33.87, lng: 151.21 },
    { id: "melbourne", name: "墨尔本 (澳洲)", flag: "🇦🇺", zone: "Australia/Melbourne", phone: "+61", tags: "moerben melbourne au australia aozhou", lat: -37.81, lng: 144.96 },
    { id: "brisbane", name: "布里斯班 (澳洲)", flag: "🇦🇺", zone: "Australia/Brisbane", phone: "+61", tags: "bulisiban brisbane au australia aozhou", lat: -27.47, lng: 153.03 },
    { id: "adelaide", name: "阿德莱德 (澳洲)", flag: "🇦🇺", zone: "Australia/Adelaide", phone: "+61", tags: "adelaide adelaide au australia aozhou", lat: -34.93, lng: 138.60 },
    { id: "perth", name: "珀斯 (澳洲)", flag: "🇦🇺", zone: "Australia/Perth", phone: "+61", tags: "posi perth au australia aozhou", lat: -31.95, lng: 115.86 },
    { id: "wellington", name: "惠灵顿 (新西兰)", flag: "🇳🇿", zone: "Pacific/Auckland", phone: "+64", tags: "huilingdun wellington nz new zealand xinxilan", lat: -41.29, lng: 174.78 },
    { id: "auckland", name: "奥克兰 (新西兰)", flag: "🇳🇿", zone: "Pacific/Auckland", phone: "+64", tags: "aokelan auckland nz new zealand xinxilan", lat: -36.85, lng: 174.76 },
    { id: "cairo", name: "开罗 (埃及)", flag: "🇪🇬", zone: "Africa/Cairo", phone: "+20", tags: "kailuo cairo eg egypt aiji", lat: 30.04, lng: 31.24 },
    { id: "johannesburg", name: "约堡 (南非)", flag: "🇿🇦", zone: "Africa/Johannesburg", phone: "+27", tags: "yuebao johannesburg za south africa nanfei", lat: -26.20, lng: 28.04 },
    { id: "cape_town", name: "开普敦 (南非)", flag: "🇿🇦", zone: "Africa/Johannesburg", phone: "+27", tags: "kaipudun cape town za south africa nanfei", lat: -33.92, lng: 18.42 },
    { id: "lagos", name: "拉各斯 (尼日利亚)", flag: "🇳🇬", zone: "Africa/Lagos", phone: "+234", tags: "lagesi lagos ng nigeria niriliya", lat: 6.52, lng: 3.38 },
    { id: "nairobi", name: "内罗毕 (肯尼亚)", flag: "🇰🇪", zone: "Africa/Nairobi", phone: "+254", tags: "neiluobi nairobi ke kenya kenniya", lat: -1.29, lng: 36.82 },
    { id: "addis_ababa", name: "亚的斯亚贝巴", flag: "🇪🇹", zone: "Africa/Addis_Ababa", phone: "+251", tags: "yadesiyabeiba addis ababa et ethiopia aisaiebiya", lat: 9.03, lng: 38.74 },
    { id: "casablanca", name: "卡萨布兰卡 (摩洛哥)", flag: "🇲🇦", zone: "Africa/Casablanca", phone: "+212", tags: "kasabulanka casablanca ma morocco moluoge", lat: 33.57, lng: -7.59 },
    { id: "tunis", name: "突尼斯市 (突尼斯)", flag: "🇹🇳", zone: "Africa/Tunis", phone: "+216", tags: "tunisi tunis tn tunisia", lat: 36.80, lng: 10.18 }
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
    new Sortable(grid, {
        animation: 200,
        ghostClass: "sortable-ghost",
        delay: 1000, // <--- 已修改：长按 1 秒后才能拖拽
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
