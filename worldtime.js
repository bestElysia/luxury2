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
