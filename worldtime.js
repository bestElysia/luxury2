let currentCities = [];
const initialIds = ["new_york", "los_angeles", "paris", "london", "tokyo", "prague", "sydney", "mexico_city", "madrid", "riyadh", "dubai", "manama", "jerusalem", "amsterdam", "rome", "warsaw"];
let simulatedDate = null;
let selectedCityId = null;
const weatherCache = {};
const CACHE_DURATION = 1200000;

// --- 🌟 新增：防抖函数 (Debounce) ---
function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// --- 🌟 新增：统一的高级搜索匹配逻辑 ---
function matchCity(city, query) {
    const q = query.toLowerCase().trim();
    if (!q) return true;

    const name = (city.name || "").toLowerCase();        // 中文名，如 "纽约"
    const id = (city.id || "").toLowerCase();            // 英文ID，如 "new_york"
    const tags = (city.tags || "").toLowerCase();        // 标签，如 "美国 usa"
    
    // 1. 提取纯数字用于精确区号比对 (解决用户输入 1、+1、001 的差异)
    const phoneDigits = (city.phone || "").replace(/\D/g, "");
    const queryDigits = q.replace(/\D/g, "");

    // 2. 智能缩写匹配支持 (例如输入 "ny" 匹配 "new_york" 或 "la" 匹配 "los_angeles")
    const acronym = id.split('_').map(word => word[0]).join('');

    const isNameMatch = name.includes(q);
    // 允许用户输入带空格的英文，例如 "new york" 可以匹配 "new_york"
    const isIdMatch = id.includes(q) || id.replace(/_/g, " ").includes(q);
    const isTagMatch = tags.includes(q);
    const isAcronymMatch = acronym.includes(q);
    
    // 3. 区号匹配：如果是纯数字输入则按开头匹配，否则按原文包含匹配
    const isPhoneMatch = (queryDigits && phoneDigits.startsWith(queryDigits)) || (city.phone || "").includes(q);

    // 只要满足任意一种情况，即视为匹配成功
    return isNameMatch || isIdMatch || isTagMatch || isAcronymMatch || isPhoneMatch;
}

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
    initMainSearch(); 
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    setInterval(refreshAllWeather, 1800000);

    // 1. 搜索框输入事件 (🌟 应用 300ms 防抖)
    if (searchInput) {
        searchInput.addEventListener("input", debounce(filterCities, 300));
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

    // 主题切换按钮
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // 全局点击事件：控制动态背景暂停/播放
    document.body.addEventListener('click', (e) => {
        const isInteractive = e.target.closest('.city-card, .main-card, .time-machine, .float-btn, .modal-content, .add-card, .global-search-wrapper');
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

    // 监听重置按钮
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
        // 🌟 优化：接入统一的高级搜索逻辑
        filtered = filtered.filter(c => matchCity(c, query));
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
    if(typeof Sortable !== 'undefined') {
        new Sortable(grid, {
            animation: 200,
            ghostClass: "sortable-ghost",
            delay: 200,             
            delayOnTouchOnly: true, 
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

// --- 🌟 新增：主页全局搜索框交互逻辑 ---
function initMainSearch() {
    const mainSearchInput = document.getElementById('mainSearchInput');
    const mainSearchResults = document.getElementById('mainSearchResults');

    if (!mainSearchInput || !mainSearchResults) return;

    // 1. 监听输入事件，加入 300ms 防抖和高级匹配逻辑
    mainSearchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value;
        
        // 如果输入为空，隐藏下拉框
        if (!query.trim()) {
            mainSearchResults.style.display = 'none';
            mainSearchResults.innerHTML = '';
            return;
        }

        // 🌟 优化：使用统一的高级搜索逻辑
        const matchedCities = cityDatabase.filter(city => matchCity(city, query));

        renderMainSearchResults(matchedCities);
    }, 300));

    // 2. 渲染下拉菜单的卡片
    function renderMainSearchResults(cities) {
        if (cities.length === 0) {
            mainSearchResults.innerHTML = '<div style="padding: 20px; color: #999; text-align: center;">未能找到匹配的城市，请尝试其他拼音、英文或区号</div>';
            mainSearchResults.style.display = 'block';
            return;
        }

        // 提取当前已添加城市的 ID 数组，用于判断是否已添加
        const currentIds = currentCities.map(c => c.id);

        // 遍历匹配到的城市，生成下拉列表
        mainSearchResults.innerHTML = cities.map(city => {
            const isAdded = currentIds.includes(city.id);
            
            return `
                <div class="search-result-item ${isAdded ? 'already-added' : ''}" data-id="${city.id}">
                    <div class="city-info">
                        <span class="flag">${city.flag}</span>
                        <span class="name">${city.name}</span>
                    </div>
                    <span class="status">${isAdded ? '已在看板中' : '点击添加 +'}</span>
                </div>
            `;
        }).join('');

        mainSearchResults.style.display = 'block';

        // 3. 为“未添加”的城市绑定点击事件
        const items = mainSearchResults.querySelectorAll('.search-result-item:not(.already-added)');
        items.forEach(item => {
            item.addEventListener('click', function() {
                const cityId = this.getAttribute('data-id');
                const cityObj = cityDatabase.find(c => c.id === cityId);
                
                // 将新城市对象加入数组
                if (cityObj && !currentIds.includes(cityId)) {
                    currentCities.push(cityObj);
                    saveData();
                    renderGrid();
                    updateAllClocks(); // 立即更新新卡片的时间
                }

                // 添加完成后，清空搜索框并隐藏下拉菜单
                mainSearchInput.value = '';
                mainSearchResults.style.display = 'none';
            });
        });
    }

    // 4. 点击页面空白处，自动收起下拉菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.global-search-wrapper')) {
            mainSearchResults.style.display = 'none';
        }
    });
    
    // 5. 如果输入框有内容，点击输入框时再次显示下拉菜单
    mainSearchInput.addEventListener('focus', () => {
        if (mainSearchInput.value.trim() && mainSearchResults.innerHTML !== '') {
            mainSearchResults.style.display = 'block';
        }
    });
}

// 启动
document.addEventListener('DOMContentLoaded', init);
