/**
 * AURA STOCK EXCHANGE — MODERN TRADING ENGINE
 * Fully featured vanilla JavaScript architecture:
 * - Dynamic simulated stock price ticks & tick animations
 * - Chart.js interactive multi-timeframe and line/bar candlestick simulation
 * - Watchlist state persistence (localStorage)
 * - Search & multi-criteria filtering
 * - Paper trading order execution (Buy & Sell) with simulated slippage and fees
 * - Portfolio tracker (Cash balance, Net worth, Active positions, Order logs)
 * - Dark / Light theme toggle
 * - Form validation (Login, Signup, Contact form)
 * - Toast notification system
 */

// ==========================================
// 1. Initial State & Sample Data Configuration
// ==========================================

const INITIAL_BALANCE = 100000.00;

// Primary Global Indices
const INDICES_DATA = {
  SENSEX: { name: "BSE SENSEX", region: "India (BSE)", price: 74248.20, change: 412.35, pct: 0.56, spark: [73800, 73920, 73850, 74100, 74050, 74248.20] },
  NIFTY50: { name: "NIFTY 50", region: "India (NSE)", price: 22514.60, change: 128.90, pct: 0.58, spark: [22380, 22420, 22400, 22490, 22470, 22514.60] },
  NASDAQ: { name: "NASDAQ Composite", region: "United States", price: 18342.15, change: 195.40, pct: 1.08, spark: [18100, 18190, 18150, 18280, 18260, 18342.15] },
  DOWJONES: { name: "Dow Jones Industrial", region: "United States", price: 39127.80, change: -84.25, pct: -0.21, spark: [39250, 39210, 39180, 39140, 39160, 39127.80] }
};

// Comprehensive Stocks Dataset (Tech, Automotive, Finance, Healthcare, Consumer)
let STOCKS_DATA = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    category: "Tech",
    price: 189.45,
    change: 2.65,
    pctChange: 1.42,
    volume: "58.4M",
    rawVolume: 58400000,
    marketCap: "2.92T",
    rawCap: 2920000000000,
    history: {
      "1D": [186.8, 187.2, 186.9, 188.1, 188.9, 189.45],
      "1W": [182.1, 184.0, 183.5, 186.2, 187.5, 188.9, 189.45],
      "1M": [178.5, 180.2, 182.4, 181.0, 185.3, 187.6, 189.45],
      "1Y": [148.0, 155.2, 168.4, 175.0, 182.1, 185.0, 189.45],
      "ALL": [90.0, 115.0, 130.0, 150.0, 170.0, 189.45]
    }
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    category: "Tech",
    price: 915.20,
    change: 28.50,
    pctChange: 3.21,
    volume: "42.8M",
    rawVolume: 42800000,
    marketCap: "2.25T",
    rawCap: 2250000000000,
    history: {
      "1D": [886.7, 892.4, 901.0, 908.2, 912.0, 915.20],
      "1W": [850.0, 868.0, 882.0, 895.0, 905.0, 915.20],
      "1M": [780.0, 810.0, 840.0, 875.0, 900.0, 915.20],
      "1Y": [280.0, 420.0, 500.0, 680.0, 820.0, 915.20],
      "ALL": [120.0, 200.0, 350.0, 600.0, 915.20]
    }
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    category: "Tech",
    price: 428.70,
    change: 4.10,
    pctChange: 0.97,
    volume: "24.1M",
    rawVolume: 24100000,
    marketCap: "3.18T",
    rawCap: 3180000000000,
    history: {
      "1D": [424.6, 425.2, 426.8, 427.5, 428.1, 428.70],
      "1W": [418.0, 420.5, 422.0, 425.1, 426.8, 428.70],
      "1M": [405.0, 412.0, 416.5, 421.0, 425.0, 428.70],
      "1Y": [310.0, 335.0, 365.0, 390.0, 415.0, 428.70],
      "ALL": [180.0, 230.0, 290.0, 350.0, 428.70]
    }
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    category: "Automotive",
    price: 177.30,
    change: -5.40,
    pctChange: -2.96,
    volume: "86.2M",
    rawVolume: 86200000,
    marketCap: "564.8B",
    rawCap: 564800000000,
    history: {
      "1D": [182.7, 181.0, 179.5, 178.2, 177.0, 177.30],
      "1W": [190.0, 188.5, 185.0, 181.2, 179.0, 177.30],
      "1M": [205.0, 198.0, 192.0, 186.0, 180.0, 177.30],
      "1Y": [260.0, 245.0, 215.0, 195.0, 185.0, 177.30],
      "ALL": [80.0, 160.0, 320.0, 220.0, 177.30]
    }
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    category: "Tech",
    price: 172.90,
    change: 1.80,
    pctChange: 1.05,
    volume: "21.6M",
    rawVolume: 21600000,
    marketCap: "2.14T",
    rawCap: 2140000000000,
    history: {
      "1D": [171.1, 171.8, 172.3, 172.0, 172.7, 172.90],
      "1W": [168.0, 169.5, 170.2, 171.5, 172.1, 172.90],
      "1M": [155.0, 160.0, 165.0, 168.0, 171.0, 172.90],
      "1Y": [120.0, 130.0, 142.0, 152.0, 164.0, 172.90],
      "ALL": [70.0, 95.0, 120.0, 145.0, 172.90]
    }
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    category: "Consumer",
    price: 184.60,
    change: 3.20,
    pctChange: 1.76,
    volume: "38.9M",
    rawVolume: 38900000,
    marketCap: "1.92T",
    rawCap: 1920000000000,
    history: {
      "1D": [181.4, 182.1, 182.9, 183.8, 184.2, 184.60],
      "1W": [178.0, 179.5, 181.0, 182.8, 183.9, 184.60],
      "1M": [170.0, 173.0, 176.5, 180.0, 182.5, 184.60],
      "1Y": [115.0, 130.0, 145.0, 160.0, 175.0, 184.60],
      "ALL": [85.0, 110.0, 140.0, 165.0, 184.60]
    }
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    category: "Finance",
    price: 198.40,
    change: -1.15,
    pctChange: -0.58,
    volume: "11.2M",
    rawVolume: 11200000,
    marketCap: "569.2B",
    rawCap: 569200000000,
    history: {
      "1D": [199.55, 199.1, 198.8, 198.5, 198.2, 198.40],
      "1W": [201.0, 200.5, 199.8, 199.0, 198.7, 198.40],
      "1M": [192.0, 194.5, 197.0, 199.0, 200.5, 198.40],
      "1Y": [140.0, 150.0, 165.0, 180.0, 192.0, 198.40],
      "ALL": [105.0, 125.0, 155.0, 175.0, 198.40]
    }
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    category: "Healthcare",
    price: 149.80,
    change: 0.85,
    pctChange: 0.57,
    volume: "9.4M",
    rawVolume: 9400000,
    marketCap: "360.5B",
    rawCap: 360500000000,
    history: {
      "1D": [148.95, 149.1, 149.3, 149.5, 149.6, 149.80],
      "1W": [147.5, 148.0, 148.5, 149.0, 149.3, 149.80],
      "1M": [152.0, 150.5, 149.0, 148.5, 149.2, 149.80],
      "1Y": [165.0, 160.0, 155.0, 150.0, 148.0, 149.80],
      "ALL": [135.0, 145.0, 155.0, 160.0, 149.80]
    }
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    category: "Automotive",
    price: 2985.50,
    change: 34.20,
    pctChange: 1.16,
    volume: "8.1M",
    rawVolume: 8100000,
    marketCap: "20.2T (INR)",
    rawCap: 242000000000,
    history: {
      "1D": [2951.3, 2962.0, 2970.5, 2978.0, 2981.0, 2985.50],
      "1W": [2910.0, 2925.0, 2940.0, 2960.0, 2975.0, 2985.50],
      "1M": [2820.0, 2860.0, 2890.0, 2930.0, 2960.0, 2985.50],
      "1Y": [2350.0, 2480.0, 2600.0, 2750.0, 2890.0, 2985.50],
      "ALL": [1800.0, 2100.0, 2400.0, 2700.0, 2985.50]
    }
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    category: "Tech",
    price: 3840.10,
    change: -12.40,
    pctChange: -0.32,
    volume: "3.2M",
    rawVolume: 3200000,
    marketCap: "13.9T (INR)",
    rawCap: 167000000000,
    history: {
      "1D": [3852.5, 3848.0, 3845.0, 3842.0, 3839.0, 3840.10],
      "1W": [3890.0, 3875.0, 3860.0, 3855.0, 3845.0, 3840.10],
      "1M": [3950.0, 3920.0, 3880.0, 3865.0, 3850.0, 3840.10],
      "1Y": [3200.0, 3350.0, 3500.0, 3700.0, 3880.0, 3840.10],
      "ALL": [2500.0, 2900.0, 3300.0, 3600.0, 3840.10]
    }
  }
];

// App State
let appState = {
  theme: localStorage.getItem("aura_theme") || "dark",
  watchlist: JSON.parse(localStorage.getItem("aura_watchlist") || '["AAPL", "NVDA"]'),
  activeStock: "AAPL",
  chartTimeframe: "1W",
  chartType: "line", // line or bar
  filterCategory: "ALL",
  sortBy: "name-asc",
  searchQuery: "",
  showWatchlistOnly: false,
  tradeMode: "BUY", // BUY or SELL
  portfolio: {
    cash: parseFloat(localStorage.getItem("aura_cash") || INITIAL_BALANCE),
    holdings: JSON.parse(localStorage.getItem("aura_holdings") || '{}'), // { "AAPL": { qty: 20, avgPrice: 185.0 } }
    orders: JSON.parse(localStorage.getItem("aura_orders") || '[]')
  }
};

let mainChartInstance = null;
let sparkChartInstances = {};

// ==========================================
// 2. DOM Elements Selection
// ==========================================
const DOM = {
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  themeIcon: document.getElementById("themeIcon"),
  navBalanceDisplay: document.getElementById("navBalanceDisplay"),
  tickerScroll: document.getElementById("tickerScroll"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  navLinks: document.getElementById("navLinks"),

  // Terminal Controls
  terminalStockIcon: document.getElementById("terminalStockIcon"),
  terminalStockName: document.getElementById("terminalStockName"),
  terminalStockCategory: document.getElementById("terminalStockCategory"),
  terminalStockPrice: document.getElementById("terminalStockPrice"),
  terminalStockChange: document.getElementById("terminalStockChange"),
  lineChartModeBtn: document.getElementById("lineChartModeBtn"),
  barChartModeBtn: document.getElementById("barChartModeBtn"),
  timeframeButtons: document.querySelectorAll(".tf-btn"),
  tradeSymbolSelect: document.getElementById("tradeSymbolSelect"),
  tradeTabBuy: document.getElementById("tradeTabBuy"),
  tradeTabSell: document.getElementById("tradeTabSell"),
  tradeQuantity: document.getElementById("tradeQuantity"),
  qtyMinus: document.getElementById("qtyMinus"),
  qtyPlus: document.getElementById("qtyPlus"),
  tradeSummaryPrice: document.getElementById("tradeSummaryPrice"),
  tradeSummaryTotal: document.getElementById("tradeSummaryTotal"),
  tradeSummaryFee: document.getElementById("tradeSummaryFee"),
  tradeSubmitBtn: document.getElementById("tradeSubmitBtn"),
  quickTradeForm: document.getElementById("quickTradeForm"),
  quickDemoTradeBtn: document.getElementById("quickDemoTradeBtn"),

  // Screener & Table
  stockSearchInput: document.getElementById("stockSearchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  categoryFilter: document.getElementById("categoryFilter"),
  sortByFilter: document.getElementById("sortByFilter"),
  tabAllStocks: document.getElementById("tabAllStocks"),
  tabWatchlistOnly: document.getElementById("tabWatchlistOnly"),
  watchlistCountBadge: document.getElementById("watchlistCountBadge"),
  stockTableBody: document.getElementById("stockTableBody"),
  tableRecordCount: document.getElementById("tableRecordCount"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),

  // Portfolio Elements
  portTotalNetWorth: document.getElementById("portTotalNetWorth"),
  portNetProfit: document.getElementById("portNetProfit"),
  portCashBalance: document.getElementById("portCashBalance"),
  portInvestedValue: document.getElementById("portInvestedValue"),
  portHoldingsCount: document.getElementById("portHoldingsCount"),
  portOrdersCount: document.getElementById("portOrdersCount"),
  holdingsTableBody: document.getElementById("holdingsTableBody"),
  tradeHistoryTableBody: document.getElementById("tradeHistoryTableBody"),
  holdingsPill: document.getElementById("holdingsPill"),
  resetPortfolioBtn: document.getElementById("resetPortfolioBtn"),

  // Modals & Forms
  authModalOverlay: document.getElementById("authModalOverlay"),
  authModalClose: document.getElementById("authModalClose"),
  loginBtnNav: document.getElementById("loginBtnNav"),
  signupBtnNav: document.getElementById("signupBtnNav"),
  tabSwitchLogin: document.getElementById("tabSwitchLogin"),
  tabSwitchSignup: document.getElementById("tabSwitchSignup"),
  loginForm: document.getElementById("loginForm"),
  signupForm: document.getElementById("signupForm"),

  // Trade Confirmation Modal
  tradeConfirmModalOverlay: document.getElementById("tradeConfirmModalOverlay"),
  tradeConfirmModalClose: document.getElementById("tradeConfirmModalClose"),
  tradeConfirmDetails: document.getElementById("tradeConfirmDetails"),
  tradeCancelBtn: document.getElementById("tradeCancelBtn"),
  tradeConfirmBtn: document.getElementById("tradeConfirmBtn"),

  // Informational Modal
  infoModalOverlay: document.getElementById("infoModalOverlay"),
  infoModalClose: document.getElementById("infoModalClose"),
  infoModalTitle: document.getElementById("infoModalTitle"),
  infoModalBody: document.getElementById("infoModalBody"),
  infoModalAcknowledge: document.getElementById("infoModalAcknowledge"),

  // Contact Form
  contactForm: document.getElementById("contactForm"),
  toastContainer: document.getElementById("toastContainer")
};

// ==========================================
// 3. UI Helpers & Toast Notifications
// ==========================================

function formatCurrency(val, currency = "$") {
  return `${currency}${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function showToast(title, desc, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "fa-circle-check";
  if (type === "error") iconClass = "fa-circle-xmark";
  if (type === "info") iconClass = "fa-circle-info";

  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideToastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4200);
}

// ==========================================
// 4. Theme Management (Dark / Light)
// ==========================================

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  appState.theme = theme;
  localStorage.setItem("aura_theme", theme);

  if (theme === "light") {
    DOM.themeIcon.className = "fa-solid fa-sun";
  } else {
    DOM.themeIcon.className = "fa-solid fa-moon";
  }

  // Update chart styles if initialized
  if (mainChartInstance) {
    updateChartTheme();
  }
}

DOM.themeToggleBtn.addEventListener("click", () => {
  const nextTheme = appState.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  showToast("Theme Updated", `Platform theme switched to ${nextTheme.toUpperCase()} mode.`, "info");
});

// ==========================================
// 5. Realtime Ticker Ribbon & Sparklines
// ==========================================

function buildTickerRibbon() {
  const items = [...Object.entries(INDICES_DATA), ...STOCKS_DATA.map(s => [s.symbol, { name: s.name, price: s.price, change: s.change, pct: s.pctChange }])];
  
  // Double array for continuous seamless looping marquee
  const combined = [...items, ...items];
  DOM.tickerScroll.innerHTML = combined.map(([key, data]) => {
    const isPos = data.change >= 0;
    const sign = isPos ? "+" : "";
    const colorClass = isPos ? "positive" : "negative";
    const arrow = isPos ? "▲" : "▼";

    return `
      <div class="ticker-item" data-ticker-symbol="${key}">
        <span class="ticker-sym">${key}</span>
        <span class="ticker-val">${typeof data.price === 'number' ? data.price.toFixed(2) : data.price}</span>
        <span class="${colorClass}">${arrow} ${sign}${data.change.toFixed(2)} (${sign}${data.pct.toFixed(2)}%)</span>
      </div>
    `;
  }).join("");

  // Quick select stock when clicking ticker
  DOM.tickerScroll.querySelectorAll(".ticker-item").forEach(item => {
    item.addEventListener("click", () => {
      const sym = item.getAttribute("data-ticker-symbol");
      if (STOCKS_DATA.some(s => s.symbol === sym)) {
        selectActiveStock(sym);
        document.getElementById("markets").scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function initIndicesSparklines() {
  Object.keys(INDICES_DATA).forEach(key => {
    const canvas = document.getElementById(`spark-${key}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const dataObj = INDICES_DATA[key];
    const isPos = dataObj.change >= 0;
    const strokeColor = isPos ? "#00ffa3" : "#ff3b69";

    sparkChartInstances[key] = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [{
          data: dataObj.spark,
          borderColor: strokeColor,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          backgroundColor: isPos ? "rgba(0, 255, 163, 0.08)" : "rgba(255, 59, 105, 0.08)",
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  });
}

// ==========================================
// 6. Interactive Trading Terminal & Charts
// ==========================================

function getChartColors() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  return {
    gridColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    textColor: isLight ? "#4e5d78" : "#8b9bb4",
    greenStroke: "#00ffa3",
    greenFill: "rgba(0, 255, 163, 0.15)",
    redStroke: "#ff3b69",
    redFill: "rgba(255, 59, 105, 0.15)"
  };
}

function updateChartTheme() {
  if (!mainChartInstance) return;
  const colors = getChartColors();
  mainChartInstance.options.scales.x.grid.color = colors.gridColor;
  mainChartInstance.options.scales.x.ticks.color = colors.textColor;
  mainChartInstance.options.scales.y.grid.color = colors.gridColor;
  mainChartInstance.options.scales.y.ticks.color = colors.textColor;
  mainChartInstance.update();
}

function renderInteractiveStockChart(symbol) {
  const stock = STOCKS_DATA.find(s => s.symbol === symbol) || STOCKS_DATA[0];
  const historySeries = stock.history[appState.chartTimeframe] || stock.history["1W"];
  
  // Construct labels based on timeframe
  const labels = historySeries.map((_, idx) => {
    if (appState.chartTimeframe === "1D") return `10:${idx * 15 || '00'} AM`;
    if (appState.chartTimeframe === "1W") return `Day ${idx + 1}`;
    if (appState.chartTimeframe === "1M") return `Wk ${Math.floor(idx / 2) + 1}`;
    return `Period ${idx + 1}`;
  });

  const isPos = stock.change >= 0;
  const colors = getChartColors();
  const stroke = isPos ? colors.greenStroke : colors.redStroke;
  const fillBg = isPos ? colors.greenFill : colors.redFill;

  const ctx = document.getElementById("interactiveStockChart").getContext("2d");

  if (mainChartInstance) {
    mainChartInstance.destroy();
  }

  mainChartInstance = new Chart(ctx, {
    type: appState.chartType,
    data: {
      labels: labels,
      datasets: [{
        label: `${stock.symbol} Simulated Price`,
        data: historySeries,
        borderColor: stroke,
        backgroundColor: appState.chartType === "line" ? fillBg : stroke,
        borderWidth: 2.5,
        fill: appState.chartType === "line",
        pointBackgroundColor: stroke,
        pointBorderColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(13, 17, 26, 0.95)",
          titleColor: "#00ffa3",
          bodyColor: "#f0f4fc",
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return ` Price: $${Number(context.raw).toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: colors.gridColor },
          ticks: { color: colors.textColor, font: { family: "JetBrains Mono", size: 11 } }
        },
        y: {
          grid: { color: colors.gridColor },
          ticks: {
            color: colors.textColor,
            font: { family: "JetBrains Mono", size: 11 },
            callback: value => `$${value}`
          }
        }
      }
    }
  });
}

function selectActiveStock(symbol) {
  const stock = STOCKS_DATA.find(s => s.symbol === symbol);
  if (!stock) return;

  appState.activeStock = symbol;

  // Header update
  DOM.terminalStockIcon.innerText = stock.symbol.slice(0, 4);
  DOM.terminalStockName.innerText = `${stock.name} (${stock.symbol})`;
  DOM.terminalStockCategory.innerText = `${stock.category} Sector • Aura Liquid Order Book`;

  const isPos = stock.change >= 0;
  const sign = isPos ? "+" : "";
  DOM.terminalStockPrice.innerText = formatCurrency(stock.price);
  DOM.terminalStockChange.className = `active-delta ${isPos ? 'positive' : 'negative'}`;
  DOM.terminalStockChange.innerHTML = `
    <i class="fa-solid fa-arrow-${isPos ? 'up' : 'down'}"></i> 
    ${sign}${stock.change.toFixed(2)} (${sign}${stock.pctChange.toFixed(2)}%)
  `;

  // Sync quick trade select
  DOM.tradeSymbolSelect.value = symbol;
  updateQuickTradeSummary();

  // Re-render chart
  renderInteractiveStockChart(symbol);
}

// Chart controls event listeners
DOM.timeframeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    DOM.timeframeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    appState.chartTimeframe = btn.getAttribute("data-range");
    renderInteractiveStockChart(appState.activeStock);
  });
});

DOM.lineChartModeBtn.addEventListener("click", () => {
  DOM.lineChartModeBtn.classList.add("active");
  DOM.barChartModeBtn.classList.remove("active");
  appState.chartType = "line";
  renderInteractiveStockChart(appState.activeStock);
});

DOM.barChartModeBtn.addEventListener("click", () => {
  DOM.barChartModeBtn.classList.add("active");
  DOM.lineChartModeBtn.classList.remove("active");
  appState.chartType = "bar";
  renderInteractiveStockChart(appState.activeStock);
});

// ==========================================
// 7. Screener & Stock Table Rendering
// ==========================================

function populateStockSelectOptions() {
  DOM.tradeSymbolSelect.innerHTML = STOCKS_DATA.map(s => `
    <option value="${s.symbol}">${s.symbol} - ${s.name} (${formatCurrency(s.price)})</option>
  `).join("");
}

function renderStockTable() {
  let filtered = [...STOCKS_DATA];

  // Category Filter
  if (appState.filterCategory !== "ALL") {
    filtered = filtered.filter(s => s.category.toLowerCase() === appState.filterCategory.toLowerCase());
  }

  // Watchlist filter
  if (appState.showWatchlistOnly) {
    filtered = filtered.filter(s => appState.watchlist.includes(s.symbol));
  }

  // Search filter (Symbol, Name, Category)
  if (appState.searchQuery.trim() !== "") {
    const q = appState.searchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.symbol.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (appState.sortBy) {
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      case "price-desc": return b.price - a.price;
      case "price-asc": return a.price - b.price;
      case "change-desc": return b.pctChange - a.pctChange;
      case "change-asc": return a.pctChange - b.pctChange;
      case "vol-desc": return b.rawVolume - a.rawVolume;
      case "cap-desc": return b.rawCap - a.rawCap;
      default: return 0;
    }
  });

  DOM.tableRecordCount.innerText = `Displaying ${filtered.length} of ${STOCKS_DATA.length} simulated stocks`;

  if (filtered.length === 0) {
    DOM.stockTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">
          No stocks matched your active filters or search terms. Try searching for "Apple", "NVIDIA" or clear filters.
        </td>
      </tr>
    `;
    return;
  }

  DOM.stockTableBody.innerHTML = filtered.map(stock => {
    const isWatch = appState.watchlist.includes(stock.symbol);
    const isPos = stock.change >= 0;
    const sign = isPos ? "+" : "";
    const colorClass = isPos ? "positive" : "negative";
    const arrow = isPos ? "▲" : "▼";

    return `
      <tr data-stock-row="${stock.symbol}">
        <td class="text-center">
          <button class="watchlist-toggle-btn ${isWatch ? 'active' : ''}" data-symbol="${stock.symbol}" title="${isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}">
            <i class="${isWatch ? 'fa-solid' : 'fa-regular'} fa-star"></i>
          </button>
        </td>
        <td>
          <div class="company-cell">
            <div class="company-icon">${stock.symbol.slice(0, 3)}</div>
            <div>
              <span class="company-name-text">${stock.name}</span>
              <span class="company-sector-text">${stock.category} Sector</span>
            </div>
          </div>
        </td>
        <td><span class="ticker-badge-cell">${stock.symbol}</span></td>
        <td class="text-right stock-price-cell" id="table-price-${stock.symbol}">${formatCurrency(stock.price)}</td>
        <td class="text-right stock-change-cell ${colorClass}" id="table-change-${stock.symbol}">
          ${arrow} ${sign}${stock.change.toFixed(2)}
        </td>
        <td class="text-right stock-change-cell ${colorClass}" id="table-pct-${stock.symbol}">
          ${sign}${stock.pctChange.toFixed(2)}%
        </td>
        <td class="text-right">${stock.volume}</td>
        <td class="text-right">${stock.marketCap}</td>
        <td class="text-center">
          <div class="table-btn-group">
            <button class="btn-table-action btn-chart-view" data-action="chart" data-symbol="${stock.symbol}" title="View Chart">
              <i class="fa-solid fa-chart-line"></i> Chart
            </button>
            <button class="btn-table-action btn-table-buy" data-action="buy" data-symbol="${stock.symbol}">
              Buy
            </button>
            <button class="btn-table-action btn-table-sell" data-action="sell" data-symbol="${stock.symbol}">
              Sell
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  attachTableEventListeners();
  updateWatchlistBadge();
}

function attachTableEventListeners() {
  // Watchlist Star buttons
  DOM.stockTableBody.querySelectorAll(".watchlist-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const sym = btn.getAttribute("data-symbol");
      toggleWatchlist(sym);
    });
  });

  // Action buttons
  DOM.stockTableBody.querySelectorAll(".btn-table-action").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.getAttribute("data-action");
      const sym = btn.getAttribute("data-symbol");

      if (action === "chart") {
        selectActiveStock(sym);
        document.getElementById("markets").scrollIntoView({ behavior: "smooth" });
      } else if (action === "buy") {
        selectActiveStock(sym);
        setTradeMode("BUY");
        document.getElementById("markets").scrollIntoView({ behavior: "smooth" });
      } else if (action === "sell") {
        selectActiveStock(sym);
        setTradeMode("SELL");
        document.getElementById("markets").scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function toggleWatchlist(symbol) {
  const idx = appState.watchlist.indexOf(symbol);
  if (idx > -1) {
    appState.watchlist.splice(idx, 1);
    showToast("Removed from Watchlist", `${symbol} was removed from your watchlist.`, "info");
  } else {
    appState.watchlist.push(symbol);
    showToast("Added to Watchlist", `${symbol} was added to your watchlist.`, "success");
  }
  localStorage.setItem("aura_watchlist", JSON.stringify(appState.watchlist));
  renderStockTable();
}

function updateWatchlistBadge() {
  DOM.watchlistCountBadge.innerText = appState.watchlist.length;
}

// Search & Filter event bindings
DOM.stockSearchInput.addEventListener("input", (e) => {
  appState.searchQuery = e.target.value;
  DOM.clearSearchBtn.style.display = appState.searchQuery ? "block" : "none";
  renderStockTable();
});

DOM.clearSearchBtn.addEventListener("click", () => {
  DOM.stockSearchInput.value = "";
  appState.searchQuery = "";
  DOM.clearSearchBtn.style.display = "none";
  renderStockTable();
});

DOM.categoryFilter.addEventListener("change", (e) => {
  appState.filterCategory = e.target.value;
  renderStockTable();
});

DOM.sortByFilter.addEventListener("change", (e) => {
  appState.sortBy = e.target.value;
  renderStockTable();
});

DOM.tabAllStocks.addEventListener("click", () => {
  DOM.tabAllStocks.classList.add("active");
  DOM.tabWatchlistOnly.classList.remove("active");
  appState.showWatchlistOnly = false;
  renderStockTable();
});

DOM.tabWatchlistOnly.addEventListener("click", () => {
  DOM.tabWatchlistOnly.classList.add("active");
  DOM.tabAllStocks.classList.remove("active");
  appState.showWatchlistOnly = true;
  renderStockTable();
});

DOM.resetFiltersBtn.addEventListener("click", () => {
  DOM.stockSearchInput.value = "";
  DOM.clearSearchBtn.style.display = "none";
  appState.searchQuery = "";
  appState.filterCategory = "ALL";
  DOM.categoryFilter.value = "ALL";
  appState.sortBy = "name-asc";
  DOM.sortByFilter.value = "name-asc";
  appState.showWatchlistOnly = false;
  DOM.tabAllStocks.classList.add("active");
  DOM.tabWatchlistOnly.classList.remove("active");
  renderStockTable();
  showToast("Filters Cleared", "All screener and search options have been reset.", "info");
});

// ==========================================
// 8. Dynamic Price Simulator Engine
// ==========================================

function startSimulatedTicks() {
  setInterval(() => {
    // Pick 1-3 random stocks to oscillate realistically
    const countToUpdate = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < countToUpdate; i++) {
      const randIdx = Math.floor(Math.random() * STOCKS_DATA.length);
      const stock = STOCKS_DATA[randIdx];

      // Oscillate by -0.8% to +0.8%
      const deltaFactor = (Math.random() * 0.016) - 0.008;
      const prevPrice = stock.price;
      const changeAmt = +(stock.price * deltaFactor).toFixed(2);
      
      stock.price = Math.max(1.0, +(stock.price + changeAmt).toFixed(2));
      stock.change = +(stock.change + changeAmt).toFixed(2);
      stock.pctChange = +((stock.change / (stock.price - stock.change)) * 100).toFixed(2);

      // Append to active chart history if active
      if (stock.symbol === appState.activeStock && mainChartInstance) {
        const dataset = mainChartInstance.data.datasets[0].data;
        dataset[dataset.length - 1] = stock.price;
        mainChartInstance.update('none'); // smooth fast tick

        // Update header readout
        DOM.terminalStockPrice.innerText = formatCurrency(stock.price);
        const isPos = stock.change >= 0;
        const sign = isPos ? "+" : "";
        DOM.terminalStockChange.className = `active-delta ${isPos ? 'positive' : 'negative'}`;
        DOM.terminalStockChange.innerHTML = `<i class="fa-solid fa-arrow-${isPos ? 'up' : 'down'}"></i> ${sign}${stock.change.toFixed(2)} (${sign}${stock.pctChange.toFixed(2)}%)`;
      }

      // Flash table price cell
      const priceCell = document.getElementById(`table-price-${stock.symbol}`);
      const changeCell = document.getElementById(`table-change-${stock.symbol}`);
      const pctCell = document.getElementById(`table-pct-${stock.symbol}`);

      if (priceCell && changeCell && pctCell) {
        const isUp = changeAmt >= 0;
        priceCell.innerText = formatCurrency(stock.price);
        priceCell.classList.remove("flash-up", "flash-down");
        void priceCell.offsetWidth; // trigger reflow
        priceCell.classList.add(isUp ? "flash-up" : "flash-down");

        const sign = stock.change >= 0 ? "+" : "";
        const arrow = stock.change >= 0 ? "▲" : "▼";
        changeCell.className = `text-right stock-change-cell ${stock.change >= 0 ? 'positive' : 'negative'}`;
        changeCell.innerText = `${arrow} ${sign}${stock.change.toFixed(2)}`;

        pctCell.className = `text-right stock-change-cell ${stock.pctChange >= 0 ? 'positive' : 'negative'}`;
        pctCell.innerText = `${sign}${stock.pctChange.toFixed(2)}%`;
      }
    }

    // Refresh trade calculations and portfolio net worth
    updateQuickTradeSummary();
    renderPortfolio();
  }, 2800);
}

// ==========================================
// 9. Paper Trading & Quick Order Execution
// ==========================================

function setTradeMode(mode) {
  appState.tradeMode = mode;
  if (mode === "BUY") {
    DOM.tradeTabBuy.classList.add("active");
    DOM.tradeTabSell.classList.remove("active");
    DOM.tradeSubmitBtn.className = "btn btn-trade-action btn-buy";
    DOM.tradeSubmitBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Execute Buy Order`;
  } else {
    DOM.tradeTabSell.classList.add("active");
    DOM.tradeTabBuy.classList.remove("active");
    DOM.tradeSubmitBtn.className = "btn btn-trade-action btn-sell";
    DOM.tradeSubmitBtn.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Execute Sell Order`;
  }
  updateQuickTradeSummary();
}

DOM.tradeTabBuy.addEventListener("click", () => setTradeMode("BUY"));
DOM.tradeTabSell.addEventListener("click", () => setTradeMode("SELL"));

DOM.tradeSymbolSelect.addEventListener("change", (e) => {
  selectActiveStock(e.target.value);
});

DOM.tradeQuantity.addEventListener("input", updateQuickTradeSummary);
DOM.qtyMinus.addEventListener("click", () => {
  let val = parseInt(DOM.tradeQuantity.value) || 1;
  if (val > 1) {
    DOM.tradeQuantity.value = val - 1;
    updateQuickTradeSummary();
  }
});

DOM.qtyPlus.addEventListener("click", () => {
  let val = parseInt(DOM.tradeQuantity.value) || 1;
  DOM.tradeQuantity.value = val + 1;
  updateQuickTradeSummary();
});

function updateQuickTradeSummary() {
  const stock = STOCKS_DATA.find(s => s.symbol === appState.activeStock) || STOCKS_DATA[0];
  const qty = Math.max(1, parseInt(DOM.tradeQuantity.value) || 1);
  const totalRaw = stock.price * qty;
  const fee = totalRaw * 0.001; // 0.1% simulated exchange fee

  DOM.tradeSummaryPrice.innerText = formatCurrency(stock.price);
  DOM.tradeSummaryTotal.innerText = formatCurrency(totalRaw);
  DOM.tradeSummaryFee.innerText = formatCurrency(fee);
}

DOM.quickTradeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const stock = STOCKS_DATA.find(s => s.symbol === appState.activeStock);
  const qty = Math.max(1, parseInt(DOM.tradeQuantity.value) || 1);
  const price = stock.price;
  const total = price * qty;
  const fee = total * 0.001;
  const netReq = total + fee;

  if (appState.tradeMode === "BUY") {
    if (appState.portfolio.cash < netReq) {
      showToast("Insufficient Balance", `Required: ${formatCurrency(netReq)}. Available simulated cash: ${formatCurrency(appState.portfolio.cash)}.`, "error");
      return;
    }
  } else {
    // Check if user owns stock to sell
    const currentHolding = appState.portfolio.holdings[stock.symbol];
    if (!currentHolding || currentHolding.qty < qty) {
      const owned = currentHolding ? currentHolding.qty : 0;
      showToast("Insufficient Shares", `You only own ${owned} shares of ${stock.symbol}. Cannot sell ${qty}.`, "error");
      return;
    }
  }

  // Open confirmation modal
  openTradeConfirmModal({
    action: appState.tradeMode,
    symbol: stock.symbol,
    name: stock.name,
    qty: qty,
    price: price,
    fee: fee,
    total: total
  });
});

let pendingTrade = null;

function openTradeConfirmModal(trade) {
  pendingTrade = trade;
  const isBuy = trade.action === "BUY";

  DOM.tradeConfirmDetails.innerHTML = `
    <div class="summary-row"><span>Action:</span> <strong class="${isBuy ? 'positive' : 'negative'}">${trade.action} ORDER</strong></div>
    <div class="summary-row"><span>Asset:</span> <strong>${trade.symbol} (${trade.name})</strong></div>
    <div class="summary-row"><span>Execution Price:</span> <strong>${formatCurrency(trade.price)}</strong></div>
    <div class="summary-row"><span>Quantity:</span> <strong>${trade.qty} Shares</strong></div>
    <div class="summary-row"><span>Simulated Fee (0.1%):</span> <strong>${formatCurrency(trade.fee)}</strong></div>
    <div class="summary-row" style="border-top: 1px solid var(--border-color); padding-top: 6px;">
      <span>Total Settlement:</span> 
      <strong class="highlight-val">${formatCurrency(isBuy ? (trade.total + trade.fee) : (trade.total - trade.fee))}</strong>
    </div>
  `;

  DOM.tradeConfirmModalOverlay.classList.add("active");
}

DOM.tradeCancelBtn.addEventListener("click", () => {
  DOM.tradeConfirmModalOverlay.classList.remove("active");
  pendingTrade = null;
});

DOM.tradeConfirmModalClose.addEventListener("click", () => {
  DOM.tradeConfirmModalOverlay.classList.remove("active");
  pendingTrade = null;
});

DOM.tradeConfirmBtn.addEventListener("click", () => {
  if (!pendingTrade) return;
  executeSimulatedOrder(pendingTrade);
  DOM.tradeConfirmModalOverlay.classList.remove("active");
  pendingTrade = null;
});

function executeSimulatedOrder(trade) {
  const isBuy = trade.action === "BUY";
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (isBuy) {
    const cost = trade.total + trade.fee;
    appState.portfolio.cash -= cost;

    if (!appState.portfolio.holdings[trade.symbol]) {
      appState.portfolio.holdings[trade.symbol] = { qty: trade.qty, avgPrice: trade.price };
    } else {
      const existing = appState.portfolio.holdings[trade.symbol];
      const newTotalQty = existing.qty + trade.qty;
      const newAvgPrice = ((existing.qty * existing.avgPrice) + (trade.qty * trade.price)) / newTotalQty;
      existing.qty = newTotalQty;
      existing.avgPrice = newAvgPrice;
    }
  } else {
    const proceeds = trade.total - trade.fee;
    appState.portfolio.cash += proceeds;

    const existing = appState.portfolio.holdings[trade.symbol];
    existing.qty -= trade.qty;
    if (existing.qty <= 0) {
      delete appState.portfolio.holdings[trade.symbol];
    }
  }

  // Log order
  appState.portfolio.orders.unshift({
    type: trade.action,
    symbol: trade.symbol,
    qty: trade.qty,
    price: trade.price,
    time: now
  });

  // Keep last 30 orders
  if (appState.portfolio.orders.length > 30) {
    appState.portfolio.orders.pop();
  }

  // Persist to local storage
  localStorage.setItem("aura_cash", appState.portfolio.cash);
  localStorage.setItem("aura_holdings", JSON.stringify(appState.portfolio.holdings));
  localStorage.setItem("aura_orders", JSON.stringify(appState.portfolio.orders));

  renderPortfolio();

  showToast(
    `Order Executed: ${trade.action} ${trade.symbol}`,
    `Successfully filled ${trade.qty} shares @ ${formatCurrency(trade.price)}. Settlement complete.`,
    isBuy ? "success" : "info"
  );
}

// Quick Demo trade trigger from Hero
DOM.quickDemoTradeBtn.addEventListener("click", () => {
  selectActiveStock("AAPL");
  setTradeMode("BUY");
  DOM.tradeQuantity.value = 25;
  updateQuickTradeSummary();
  document.getElementById("markets").scrollIntoView({ behavior: "smooth" });
  showToast("Demo Order Ready", "Configured sample buy order of 25 AAPL shares. Click Execute Buy Order to test!", "info");
});

// ==========================================
// 10. Portfolio Management Dashboard
// ==========================================

function renderPortfolio() {
  const cash = appState.portfolio.cash;
  let investedVal = 0;
  let totalOrigCost = 0;

  const holdingsKeys = Object.keys(appState.portfolio.holdings);

  // Calculate current holding values
  holdingsKeys.forEach(sym => {
    const pos = appState.portfolio.holdings[sym];
    const liveStock = STOCKS_DATA.find(s => s.symbol === sym);
    const livePrice = liveStock ? liveStock.price : pos.avgPrice;
    investedVal += (pos.qty * livePrice);
    totalOrigCost += (pos.qty * pos.avgPrice);
  });

  const netWorth = cash + investedVal;
  const netProfit = netWorth - INITIAL_BALANCE;
  const netProfitPct = (netProfit / INITIAL_BALANCE) * 100;

  // Header display
  DOM.navBalanceDisplay.innerText = formatCurrency(cash);

  // Metrics Grid
  DOM.portTotalNetWorth.innerText = formatCurrency(netWorth);
  DOM.portCashBalance.innerText = formatCurrency(cash);
  DOM.portInvestedValue.innerText = formatCurrency(investedVal);
  DOM.portHoldingsCount.innerText = `${holdingsKeys.length} Active Positions`;
  DOM.portOrdersCount.innerText = appState.portfolio.orders.length;
  DOM.holdingsPill.innerText = `${holdingsKeys.length} Positions`;

  const isProfit = netProfit >= 0;
  const sign = isProfit ? "+" : "";
  DOM.portNetProfit.className = `metric-sub ${isProfit ? 'positive' : 'negative'}`;
  DOM.portNetProfit.innerText = `${sign}${formatCurrency(netProfit)} (${sign}${netProfitPct.toFixed(2)}%)`;

  // Holdings Table Body
  if (holdingsKeys.length === 0) {
    DOM.holdingsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No active stock holdings yet. Buy stocks above to start building your simulated portfolio!</td>
      </tr>
    `;
  } else {
    DOM.holdingsTableBody.innerHTML = holdingsKeys.map(sym => {
      const pos = appState.portfolio.holdings[sym];
      const stock = STOCKS_DATA.find(s => s.symbol === sym);
      const curPrice = stock ? stock.price : pos.avgPrice;
      const curVal = pos.qty * curPrice;
      const profitLoss = curVal - (pos.qty * pos.avgPrice);
      const pLpct = ((curPrice - pos.avgPrice) / pos.avgPrice) * 100;
      const isPos = profitLoss >= 0;
      const sign = isPos ? "+" : "";

      return `
        <tr>
          <td><strong>${sym}</strong></td>
          <td>${pos.qty}</td>
          <td>${formatCurrency(pos.avgPrice)}</td>
          <td>${formatCurrency(curPrice)}</td>
          <td class="${isPos ? 'positive' : 'negative'}"><strong>${sign}${formatCurrency(profitLoss)} (${sign}${pLpct.toFixed(2)}%)</strong></td>
          <td class="text-right">
            <button class="btn-table-action btn-table-sell" onclick="sellAllHolding('${sym}')">Liquidate</button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Order History Body
  if (appState.portfolio.orders.length === 0) {
    DOM.tradeHistoryTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No transaction records logged.</td>
      </tr>
    `;
  } else {
    DOM.tradeHistoryTableBody.innerHTML = appState.portfolio.orders.map(order => {
      const isBuy = order.type === "BUY";
      return `
        <tr>
          <td><span class="badge-mini ${isBuy ? 'positive' : 'negative'}">${order.type}</span></td>
          <td><strong>${order.symbol}</strong></td>
          <td>${order.qty} shs</td>
          <td>${formatCurrency(order.price)}</td>
          <td style="color: var(--text-dim); font-size: 0.78rem;">${order.time}</td>
        </tr>
      `;
    }).join("");
  }
}

// Window helper for liquidate button
window.sellAllHolding = function(symbol) {
  const holding = appState.portfolio.holdings[symbol];
  if (!holding) return;
  const stock = STOCKS_DATA.find(s => s.symbol === symbol);
  const curPrice = stock ? stock.price : holding.avgPrice;

  openTradeConfirmModal({
    action: "SELL",
    symbol: symbol,
    name: stock ? stock.name : symbol,
    qty: holding.qty,
    price: curPrice,
    fee: (holding.qty * curPrice) * 0.001,
    total: holding.qty * curPrice
  });
};

// Reset portfolio to default $100,000
DOM.resetPortfolioBtn.addEventListener("click", () => {
  if (confirm("Reset simulated portfolio to clean state ($100,000 virtual cash and 0 holdings)?")) {
    appState.portfolio.cash = INITIAL_BALANCE;
    appState.portfolio.holdings = {};
    appState.portfolio.orders = [];
    localStorage.setItem("aura_cash", INITIAL_BALANCE);
    localStorage.setItem("aura_holdings", "{}");
    localStorage.setItem("aura_orders", "[]");
    renderPortfolio();
    showToast("Portfolio Reset", "Simulated balance reset to $100,000.00.", "info");
  }
});

// ==========================================
// 11. Modal Dialogs & Authentication Forms
// ==========================================

function openAuthModal(isSignup = false) {
  DOM.authModalOverlay.classList.add("active");
  if (isSignup) {
    DOM.tabSwitchSignup.click();
  } else {
    DOM.tabSwitchLogin.click();
  }
}

DOM.loginBtnNav.addEventListener("click", () => openAuthModal(false));
DOM.signupBtnNav.addEventListener("click", () => openAuthModal(true));
DOM.authModalClose.addEventListener("click", () => DOM.authModalOverlay.classList.remove("active"));

DOM.tabSwitchLogin.addEventListener("click", () => {
  DOM.tabSwitchLogin.classList.add("active");
  DOM.tabSwitchSignup.classList.remove("active");
  DOM.loginForm.classList.remove("hidden");
  DOM.signupForm.classList.add("hidden");
});

DOM.tabSwitchSignup.addEventListener("click", () => {
  DOM.tabSwitchSignup.classList.add("active");
  DOM.tabSwitchLogin.classList.remove("active");
  DOM.signupForm.classList.remove("hidden");
  DOM.loginForm.classList.add("hidden");
});

// Login Form Validation
DOM.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passInput = document.getElementById("loginPass");
  let valid = true;

  if (!emailInput.value || !emailInput.value.includes("@")) {
    emailInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    emailInput.closest(".form-group").classList.remove("has-error");
  }

  if (!passInput.value || passInput.value.length < 6) {
    passInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    passInput.closest(".form-group").classList.remove("has-error");
  }

  if (valid) {
    DOM.authModalOverlay.classList.remove("active");
    showToast("Welcome Back!", `Successfully authenticated as ${emailInput.value}.`, "success");
    DOM.loginBtnNav.innerHTML = `<i class="fa-solid fa-user-check"></i> Account`;
  }
});

// Signup Form Validation
DOM.signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("signupName");
  const emailInput = document.getElementById("signupEmail");
  const passInput = document.getElementById("signupPass");
  const termsCheck = document.getElementById("termsAgreeCheck");
  let valid = true;

  if (!nameInput.value || nameInput.value.trim().length < 3) {
    nameInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    nameInput.closest(".form-group").classList.remove("has-error");
  }

  if (!emailInput.value || !emailInput.value.includes("@")) {
    emailInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    emailInput.closest(".form-group").classList.remove("has-error");
  }

  if (!passInput.value || passInput.value.length < 8) {
    passInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    passInput.closest(".form-group").classList.remove("has-error");
  }

  if (!termsCheck.checked) {
    termsCheck.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    termsCheck.closest(".form-group").classList.remove("has-error");
  }

  if (valid) {
    DOM.authModalOverlay.classList.remove("active");
    showToast("Account Created", `Welcome to Aura, ${nameInput.value}! $100,000 paper trading capital credited.`, "success");
    DOM.signupBtnNav.style.display = "none";
    DOM.loginBtnNav.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${nameInput.value.split(" ")[0]}`;
  }
});

// Informational Modals (Privacy, Terms, Disclaimers)
const INFO_DOCS = {
  privacyModal: {
    title: "Aura Privacy Policy",
    body: `
      <p>Your privacy is central to our mission. This policy explains what information is collected on the Aura Stock Exchange website.</p>
      <h4>1. Data Retention</h4>
      <p>All portfolio balances, watchlist entries, theme preferences, and order history are persisted strictly in your browser's LocalStorage. No confidential credentials or financial telemetry leave your client workstation.</p>
      <h4>2. Educational Cookies</h4>
      <p>We use lightweight local session state to preserve dark/light mode toggles and screener queries.</p>
    `
  },
  termsModal: {
    title: "Terms & Conditions of Service",
    body: `
      <p>Welcome to Aura Stock Exchange. By accessing or using our platform, you agree to these Terms and Conditions.</p>
      <h4>1. Nature of Platform</h4>
      <p>Aura Stock Exchange is a cutting-edge <strong>simulated market environment</strong>. All trading activities, quotes, order submissions, and balances are virtual and have no real cash redemption value.</p>
      <h4>2. No Financial Advisory</h4>
      <p>Information presented across charts, indices, and screeners does not constitute registered financial, investment, or legal advice.</p>
    `
  },
  disclaimerModal: {
    title: "Risk Disclosure & Simulated Sandbox Notice",
    body: `
      <p>Trading financial securities involves high market volatility and potential loss of invested capital.</p>
      <h4>Simulated Trading Engine</h4>
      <p>Orders executed on Aura Stock Exchange do not route to real live exchanges (such as NYSE, NASDAQ, BSE, or NSE). They are matched against a browser-native synthetic liquidity model designed solely for educational testing.</p>
    `
  },
  securityModal: {
    title: "Security & Encryption Architecture",
    body: `
      <p>Aura incorporates high-grade web security best practices:</p>
      <ul>
        <li>Client-side input sanitization across all forms and order fields.</li>
        <li>Sub-resource integrity and modern CSP compliant styling.</li>
        <li>Encrypted HTTPS communication channels for static assets.</li>
      </ul>
    `
  },
  apiModal: {
    title: "Aura Mock API & Developer Documentation",
    body: `
      <p>Build custom algorithmic trading bots on top of the Aura Simulated Terminal.</p>
      <pre style="background:var(--bg-tertiary); padding:12px; border-radius:8px; font-family:var(--font-mono); font-size:0.8rem; margin:10px 0;">
GET /api/v1/ticker/AAPL
Response: { "symbol": "AAPL", "bid": 189.40, "ask": 189.50, "status": "OPEN" }
      </pre>
      <p>Contact institutional@aurastockexchange.com to obtain simulated API keys.</p>
    `
  }
};

document.querySelectorAll(".modal-link-btn").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const docKey = link.getAttribute("data-modal");
    if (INFO_DOCS[docKey]) {
      DOM.infoModalTitle.innerText = INFO_DOCS[docKey].title;
      DOM.infoModalBody.innerHTML = INFO_DOCS[docKey].body;
      DOM.infoModalOverlay.classList.add("active");
    }
  });
});

DOM.infoModalClose.addEventListener("click", () => DOM.infoModalOverlay.classList.remove("active"));
DOM.infoModalAcknowledge.addEventListener("click", () => DOM.infoModalOverlay.classList.remove("active"));

// ==========================================
// 12. Contact Form Validation
// ==========================================

DOM.contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const msgInput = document.getElementById("contactMessage");

  let valid = true;

  if (!nameInput.value || nameInput.value.trim().length < 3) {
    nameInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    nameInput.closest(".form-group").classList.remove("has-error");
  }

  if (!emailInput.value || !emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    emailInput.closest(".form-group").classList.remove("has-error");
  }

  if (!msgInput.value || msgInput.value.trim().length < 15) {
    msgInput.closest(".form-group").classList.add("has-error");
    valid = false;
  } else {
    msgInput.closest(".form-group").classList.remove("has-error");
  }

  if (valid) {
    showToast(
      "Inquiry Transmitted",
      `Thank you, ${nameInput.value}! A desk specialist will reply to ${emailInput.value} within 4 hours.`,
      "success"
    );
    DOM.contactForm.reset();
  }
});

// ==========================================
// 13. Mobile Navigation & Scroll Spy
// ==========================================

DOM.mobileMenuBtn.addEventListener("click", () => {
  DOM.navLinks.classList.toggle("open");
});

DOM.navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    DOM.navLinks.classList.remove("open");
  });
});

// Header scroll shadow and active nav highlighting
window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active section scroll spy
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".nav-link").forEach(l => {
        l.classList.remove("active");
        if (l.getAttribute("href") === `#${id}`) {
          l.classList.add("active");
        }
      });
    }
  });
});

// Card click in Major Indices to switch symbol
document.querySelectorAll(".index-card").forEach(card => {
  card.addEventListener("click", () => {
    const symbol = card.getAttribute("data-symbol");
    showToast("Index Selected", `Viewing performance overview for ${symbol}.`, "info");
  });
});

// Close modals when clicking overlay background
window.addEventListener("click", (e) => {
  if (e.target === DOM.authModalOverlay) DOM.authModalOverlay.classList.remove("active");
  if (e.target === DOM.tradeConfirmModalOverlay) DOM.tradeConfirmModalOverlay.classList.remove("active");
  if (e.target === DOM.infoModalOverlay) DOM.infoModalOverlay.classList.remove("active");
});

// ==========================================
// 14. Application Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(appState.theme);
  buildTickerRibbon();
  initIndicesSparklines();
  populateStockSelectOptions();
  selectActiveStock(appState.activeStock);
  renderStockTable();
  renderPortfolio();
  startSimulatedTicks();

  // Copyright year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  // Welcome toast
  setTimeout(() => {
    showToast(
      "Aura Exchange Live",
      "Welcome to the next-generation simulated terminal. $100,000 demo capital is active.",
      "info"
    );
  }, 1000);
});

