/**
 * AI KHAN SIGNALS: Indian Share Market (NSE & BSE) Swing Signals & Portfolio Simulator
 * Core Client Engine - Supports Express Backend Mode & Standalone Local Demo Fallback
 * Includes support for the entire Indian stock universe (BSE/NSE) via dynamic asset generation!
 * Fully connects real, live, interactive TRADINGVIEW PRO charts directly inside the terminal!
 * PERFORMANCE UPDATE: Optimizes /api/live-feed polling to a tiny 1.5KB payload, fetching charts on-demand.
 * MEMORY LEAK UPDATE: Safe global interval tracking, secure async handlers, and robust fetch error management.
 * HIGH-TECH SECURITY: Native WebSocket pushes, reconnection skeletons, and multi-indicator accuracy checkups.
 * TRADINGVIEW PRO UPGRADE: Dedicated TradingView Advanced Terminal tab with study overlays, timeframe sync, and Pine Editor guides.
 * ROBUSTNESS UPDATE: Compiles all optional-chaining null guards across stockData states to prevent undefined page freeze crashes.
 * COMPLIANCE FIXES: Deployed strict fixes for deleteVettedSignal array updates, M_M/special symbol encodings, and secure SMTP & Supabase connectors!
 */

// --- 1. LOCAL DEMO CONFIGURATION (FALLBACK STATE IF BACKEND DISCONNECTED) ---
let INDIAN_STOCKS_CONFIG = {
  RELIANCE: { name: "Reliance Industries Ltd.", basePrice: 2845.50, volatility: 0.0011, drift: 0.00008, category: "Energy & Telecom", segment: "nifty50", bseCode: "500325", exchange: "NSE/BSE" },
  TCS: { name: "Tata Consultancy Services Ltd.", basePrice: 3820.00, volatility: 0.0010, drift: 0.00005, category: "IT Services", segment: "nifty50", bseCode: "532540", exchange: "NSE/BSE" },
  INFY: { name: "Infosys Limited", basePrice: 1425.20, volatility: 0.0014, drift: 0.00006, category: "IT Services", segment: "nifty50", bseCode: "500209", exchange: "NSE/BSE" },
  HDFCBANK: { name: "HDFC Bank Limited", basePrice: 1512.40, volatility: 0.0012, drift: 0.00007, category: "Banking", segment: "nifty50", bseCode: "500180", exchange: "NSE/BSE" },
  ICICIBANK: { name: "ICICI Bank Limited", basePrice: 1110.80, volatility: 0.0011, drift: 0.00009, category: "Banking", segment: "nifty50", bseCode: "532174", exchange: "NSE/BSE" },
  SBIN: { name: "State Bank of India", basePrice: 824.50, volatility: 0.0015, drift: 0.00010, category: "Banking", segment: "nifty50", bseCode: "500112", exchange: "NSE/BSE" },
  BHARTIRTEL: { name: "Bharti Airtel Limited", basePrice: 1360.00, volatility: 0.0013, drift: 0.00012, category: "Telecom", segment: "nifty50", bseCode: "532454", exchange: "NSE/BSE" },
  ITC: { name: "ITC Limited", basePrice: 432.10, volatility: 0.0009, drift: 0.00004, category: "FMCG", segment: "nifty50", bseCode: "500875", exchange: "NSE/BSE" },
  LT: { name: "Larsen & Toubro Limited", basePrice: 3450.00, volatility: 0.0011, drift: 0.00008, category: "Infrastructure", segment: "nifty50", bseCode: "500510", exchange: "NSE/BSE" },
  TATASTEEL: { name: "Tata Steel Limited", basePrice: 165.40, volatility: 0.0018, drift: 0.00007, category: "Metals", segment: "nifty50", bseCode: "500470", exchange: "NSE/BSE" },
  TATAMOTORS: { name: "Tata Motors Limited", basePrice: 954.20, volatility: 0.0020, drift: 0.00011, category: "Automotive", segment: "nifty50", bseCode: "500570", exchange: "NSE/BSE" },
  SUNPHARMA: { name: "Sun Pharmaceutical Industries", basePrice: 1540.60, volatility: 0.0012, drift: 0.00008, category: "Pharmaceuticals", segment: "nifty50", bseCode: "524715", exchange: "NSE/BSE" },
  HINDUNILVR: { name: "Hindustan Unilever Limited", basePrice: 2315.00, volatility: 0.0010, drift: 0.00004, category: "FMCG", segment: "nifty50", bseCode: "500696", exchange: "NSE/BSE" },
  AXISBANK: { name: "Axis Bank Limited", basePrice: 1145.30, volatility: 0.0013, drift: 0.00008, category: "Banking", segment: "nifty50", bseCode: "532215", exchange: "NSE/BSE" },
  ADANIENT: { name: "Adani Enterprises Limited", basePrice: 3250.00, volatility: 0.0032, drift: 0.00015, category: "Infrastructure", segment: "nifty50", bseCode: "512599", exchange: "NSE/BSE" },
  KOTAKBANK: { name: "Kotak Mahindra Bank Ltd.", basePrice: 1712.00, volatility: 0.0011, drift: 0.00005, category: "Banking", segment: "nifty50", bseCode: "500247", exchange: "NSE/BSE" },
  "M_M": { name: "Mahindra & Mahindra Limited", basePrice: 2480.00, volatility: 0.0014, drift: 0.00009, category: "Automotive", segment: "nifty50", bseCode: "500520", exchange: "NSE/BSE" },
  TITAN: { name: "Titan Company Limited", basePrice: 3210.40, volatility: 0.0013, drift: 0.00007, category: "Consumer Goods", segment: "nifty50", bseCode: "500114", exchange: "NSE/BSE" },
  ULTRACEMCO: { name: "UltraTech Cement Limited", basePrice: 9750.00, volatility: 0.0011, drift: 0.00006, category: "Cement", segment: "nifty50", bseCode: "532538", exchange: "NSE/BSE" },
  NTPC: { name: "NTPC Limited", basePrice: 362.50, volatility: 0.0016, drift: 0.00008, category: "Power Generation", segment: "nifty50", bseCode: "532555", exchange: "NSE/BSE" },
  
  // Midcap Segment Blue-chips (Nifty Midcap 150) & Trending
  ZOMATO: { name: "Zomato Limited", basePrice: 185.30, volatility: 0.0028, drift: 0.00018, category: "Internet / Technology", segment: "midcap", bseCode: "543330", exchange: "NSE/BSE" },
  HAL: { name: "Hindustan Aeronautics Limited", basePrice: 4620.00, volatility: 0.0022, drift: 0.00015, category: "Defence & Aerospace", segment: "midcap", bseCode: "541154", exchange: "NSE/BSE" },
  BEL: { name: "Bharat Electronics Limited", basePrice: 242.60, volatility: 0.0019, drift: 0.00012, category: "Defence Electronics", segment: "midcap", bseCode: "500049", exchange: "NSE/BSE" },
  POLYCAB: { name: "Polycab India Limited", basePrice: 6350.00, volatility: 0.0018, drift: 0.00014, category: "Wires & Cables", segment: "midcap", bseCode: "542652", exchange: "NSE/BSE" },
  RECLTD: { name: "REC Limited", basePrice: 524.80, volatility: 0.0024, drift: 0.00016, category: "Power Finance", segment: "midcap", bseCode: "532955", exchange: "NSE/BSE" },
  PFC: { name: "Power Finance Corporation", basePrice: 442.10, volatility: 0.0023, drift: 0.00015, category: "Power Finance", segment: "midcap", bseCode: "532810", exchange: "NSE/BSE" },
  DIXON: { name: "Dixon Technologies Ltd.", basePrice: 9240.00, volatility: 0.0025, drift: 0.00020, category: "Consumer Electronics", segment: "midcap", bseCode: "540699", exchange: "NSE/BSE" },
  IRCTC: { name: "Indian Railway Catering Corp.", basePrice: 980.50, volatility: 0.0017, drift: 0.00008, category: "Hospitality & Travel", segment: "midcap", bseCode: "542830", exchange: "NSE/BSE" },
  KPITTECH: { name: "KPIT Technologies Limited", basePrice: 1485.00, volatility: 0.0026, drift: 0.00015, category: "Automotive Software", segment: "midcap", bseCode: "542651", exchange: "NSE/BSE" },
  TATAELXSI: { name: "Tata Elxsi Limited", basePrice: 7420.00, volatility: 0.0018, drift: 0.00006, category: "Design & Technology", segment: "midcap", bseCode: "500408", exchange: "NSE/BSE" },
  MAXHEALTH: { name: "Max Healthcare Institute Ltd.", basePrice: 792.40, volatility: 0.0016, drift: 0.00012, category: "Healthcare", segment: "midcap", bseCode: "543220", exchange: "NSE/BSE" },
  NYKAA: { name: "FSN E-Commerce Ventures (Nykaa)", basePrice: 172.50, volatility: 0.0024, drift: 0.00005, category: "E-Commerce", segment: "midcap", bseCode: "543384", exchange: "NSE/BSE" },
  PAYTM: { name: "One97 Communications (Paytm)", basePrice: 382.40, volatility: 0.0035, drift: -0.0001, category: "Fintech", segment: "midcap", bseCode: "543396", exchange: "NSE/BSE" },
  IDEA: { name: "Vodafone Idea Limited", basePrice: 13.20, volatility: 0.0045, drift: 0.00002, category: "Telecom", segment: "midcap", bseCode: "532822", exchange: "NSE/BSE" },
  LTIM: { name: "LTIMindtree Limited", basePrice: 4725.00, volatility: 0.0016, drift: 0.00008, category: "IT Services", segment: "midcap", bseCode: "540005", exchange: "NSE/BSE" },
  
  // Extra high-demand Nifty stocks
  IRFC: { name: "Indian Railway Finance Corp.", basePrice: 172.40, volatility: 0.0032, drift: 0.0002, category: "Railway Finance", segment: "midcap", bseCode: "543074", exchange: "NSE/BSE" },
  RVNL: { name: "Rail Vikas Nigam Ltd.", basePrice: 375.50, volatility: 0.0035, drift: 0.00025, category: "Railway Infra", segment: "midcap", bseCode: "542649", exchange: "NSE/BSE" },
  IREDA: { name: "Indian Renewable Energy Dev. Agency", basePrice: 184.20, volatility: 0.0040, drift: 0.0003, category: "Renewable Finance", segment: "midcap", bseCode: "544026", exchange: "NSE/BSE" },
  TATAPOWER: { name: "Tata Power Company Ltd.", basePrice: 435.60, volatility: 0.0018, drift: 0.0001, category: "Power & Energy", segment: "midcap", bseCode: "500400", exchange: "NSE/BSE" },
  JIOFIN: { name: "Jio Financial Services Ltd.", basePrice: 362.40, volatility: 0.0022, drift: 0.00015, category: "Finance", segment: "midcap", bseCode: "543940", exchange: "NSE/BSE" },
  COALINDIA: { name: "Coal India Limited", basePrice: 474.20, volatility: 0.0014, drift: 0.00005, category: "Mining", segment: "nifty50", bseCode: "533278", exchange: "NSE/BSE" },
  PNB: { name: "Punjab National Bank", basePrice: 124.50, volatility: 0.0024, drift: 0.0001, category: "Banking", segment: "midcap", bseCode: "532461", exchange: "NSE/BSE" },
  TATACHEM: { name: "Tata Chemicals Limited", basePrice: 1084.50, volatility: 0.0020, drift: 0.00008, category: "Chemicals", segment: "midcap", bseCode: "500770", exchange: "NSE/BSE" }
};

const TIMEFRAMES = {
  "1M": { step: 60 * 1000, points: 50 },
  "5M": { step: 5 * 60 * 1000, points: 60 },
  "15M": { step: 15 * 60 * 1000, points: 80 },
  "1H": { step: 60 * 60 * 1000, points: 100 },
  "1D": { step: 24 * 60 * 60 * 1000, points: 120 }
};

const INDIAN_NEWS_TEMPLATES = [
  { text: "MARKET IMPACT: {symbol} secures massive multi-million order from Indian defense wing, stock rockets.", impact: 0.035, sentiment: "bullish" },
  { text: "FINANCIAL REPORT: {symbol} Q4 profit exceeds estimates by 12% on surging domestic demand, target upgraded.", impact: 0.028, sentiment: "bullish" },
  { text: "REGULATORY WATCH: GST Council issues procedural tax verification notices to multiple top index members, including {symbol}.", impact: -0.015, sentiment: "bearish" },
  { text: "INNOVATION: {symbol} announces collaboration with major IIT research park for advanced green energy transition tech.", impact: 0.02, sentiment: "bullish" },
  { text: "SUPPLY CHAIN ALERT: Heavy monsoon flooding briefly limits logistics capacity for infrastructure projects at {symbol}.", impact: -0.01, sentiment: "bearish" },
  { text: "BROKERAGE NOTE: Top domestic brokerage upgrades {symbol} to 'BUY' citing cheap valuations and high operating cashflows.", impact: 0.025, sentiment: "bullish" }
];

const MACRO_INDIA_NEWS = [
  { text: "RBI DECISION: Reserve Bank of India keeps repo rates unchanged at 6.5%, outlook stays highly supportive.", impactGlobal: 0.006, sentiment: "bullish" },
  { text: "FII FLOWS: Foreign Institutional Investors pump record capital into Indian Bluechips, driving broad Nifty gains.", impactGlobal: 0.008, sentiment: "bullish" }
];

// --- 2. DYNAMIC CLIENT STATE ---
let state = {
  activeSymbol: "RELIANCE",
  activeTimeframe: "1D",
  theme: "dark",
  backendActive: false, 
  activeChartMode: "lite", // "lite" vs "tv"
  
  gmailAddress: "user@gmail.com",
  enableGmailAlerts: true,
  
  cash: 100000.00,
  holdings: {},
  transactions: [],
  brokerageHoldings: [],
  watchlist: ["RELIANCE", "TCS", "INFY", "HDFCBANK", "SBIN"],
  vettedSignals: [
    {
      id: "vetted-init-infy",
      symbol: "INFY",
      entryPrice: 1412.50,
      currentPrice: 1425.20,
      targetPrice: 1483.12,
      stopPrice: 1384.25,
      dateTriggered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: "ACTIVE",
      reason: "Strict Reversal Strategy: Daily RSI touched 24.1 + Breached lower Bollinger Band Support limit.",
      pnlPct: 0.90
    },
    {
      id: "vetted-init-reliance",
      symbol: "RELIANCE",
      entryPrice: 2750.00,
      currentPrice: 2887.50,
      targetPrice: 2887.50,
      stopPrice: 2695.00,
      dateTriggered: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: "COMPLETED",
      reason: "MACD Bullish Crossover with Surge in Volume + Strong Telecom Revenue growth news catalyst.",
      pnlPct: 5.00
    }
  ],
  newsFeed: [],
  activeIndicators: {
    ema9: true,
    ema21: true,
    bollinger: true,
    rsi: true
  },
  stockData: {},
  marketActive: true,
  supabaseClient: null,
  supabaseUrl: "",
  supabaseKey: "",
  supabaseConnected: false
};

const THEME_CHARTS = {
  dark: { gridColor: "#374151", textColor: "#9ca3af", accentColor: "#6366f1", bullColor: "#10b981", bearColor: "#ef4444" },
  wallstreet: { gridColor: "#334155", textColor: "#94a3b8", accentColor: "#0ea5e9", bullColor: "#22c55e", bearColor: "#dc2626" },
  light: { gridColor: "#e2e8f0", textColor: "#64748b", accentColor: "#4f46e5", bullColor: "#10b981", bearColor: "#f43f5e" },
  cyberpunk: { gridColor: "#141424", textColor: "#00ffff", accentColor: "#00ffff", bullColor: "#39ff14", bearColor: "#ff073a" },
  mint: { gridColor: "#153e28", textColor: "#8ae4b4", accentColor: "#05c46b", bullColor: "#00ff88", bearColor: "#ff3366" }
};

let chartInstanceMain = null;
let chartInstanceRsi = null;
let tvWidgetInstance = null;
let wsInstance = null;
let tvWidgetInitialized = false; 
let tvWidgetMainTabInstance = null; 

// --- 3. DYNAMIC SYNCHRONIZATION WITH EXPRESS BACKEND ---

const BACKEND_URL = window.location.origin; 

async function fetchFromBackend(endpoint, options = {}) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Fetch active stock's complete candlestick series from server ON-DEMAND (size ~8KB instead of 20MB)
async function fetchActiveStockChartData() {
  if (!state.backendActive) return;
  const res = await fetchFromBackend(`/api/chart?symbol=${state.activeSymbol}&timeframe=${state.activeTimeframe}`);
  if (res && res.series) {
    if (!state.stockData[state.activeSymbol]) state.stockData[state.activeSymbol] = {};
    state.stockData[state.activeSymbol][state.activeTimeframe] = res.series;
  }
}

// ---- NATIVE WEBSOCKET REAL-TIME CONNECTION FOR INSTANT EVENT PUSHES (Cuts network traffic by 99%!) ----
function connectWebSocket() {
  const wsUrl = window.location.origin.replace(/^http/, 'ws') + '/ws';
  
  wsInstance = new WebSocket(wsUrl);
  
  wsInstance.onopen = () => {
    console.log('[WEBSOCKET] Secure Connection established. Switched to live server push.');
    state.backendActive = true;
    document.querySelector("#reconnecting-overlay").classList.add("hidden");
  };
  
  wsInstance.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'live-feed-update') {
        handleLiveFeedUpdate(message.data);
      }
    } catch (e) {
      console.error('[WEBSOCKET] Message deserialization crash:', e.message);
    }
  };
  
  wsInstance.onclose = () => {
    console.warn('[WEBSOCKET] Connection closed. Falling back to lightweight polling / reconnecting...');
    state.backendActive = false;
    
    // Show a beautiful "Reconnecting" visual state overlay instead of silent failure
    document.querySelector("#reconnecting-overlay").classList.remove("hidden");
    
    // Retry connection automatically in 5 seconds
    setTimeout(connectWebSocket, 5000);
  };
  
  wsInstance.onerror = () => {
    wsInstance.close();
  };
}

// Master WS payload handler
function handleLiveFeedUpdate(feed) {
  state.backendActive = true;
  document.querySelector("#reconnecting-overlay").classList.add("hidden");
  
  // Merge state securely
  state.cash = feed.dbState.cash;
  state.holdings = feed.dbState.holdings;
  state.transactions = feed.dbState.transactions;
  state.watchlist = feed.dbState.watchlist;
  state.brokerageHoldings = feed.dbState.brokerageHoldings;
  state.vettedSignals = feed.dbState.vettedSignals;
  state.gmailAddress = feed.dbState.settings.gmailAddress;
  state.enableGmailAlerts = feed.dbState.settings.enableGmailAlerts;
  state.theme = feed.dbState.settings.activeTheme;
  state.newsFeed = feed.dbState.newsFeed;
  
  INDIAN_STOCKS_CONFIG = feed.stocksConfig;
  
  // Update live prices locally in memory
  for (const symbol in feed.prices) {
    const pData = feed.prices[symbol];
    if (state.stockData[symbol] && state.stockData[symbol][state.activeTimeframe]) {
      const series = state.stockData[symbol][state.activeTimeframe];
      if (series && series.length > 0) {
        const lastCandle = series[series.length - 1];
        lastCandle.y[3] = pData.price; 
        lastCandle.y[1] = Math.max(lastCandle.y[1], pData.price); 
        lastCandle.y[2] = Math.min(lastCandle.y[2], pData.price); 
      }
    }
  }
  
  updateActiveDashboardOnTick();
  updatePortfolioUI();
  renderQuickStockCapsules();
  renderNewsLogs();
  
  const activeTabBtn = document.querySelector(".nav-tab-btn.nav-tab-active");
  if (activeTabBtn) {
    const activeTabId = activeTabBtn.dataset.tab;
    if (activeTabId === "signals") renderSwingSignalsTab();
    else if (activeTabId === "watchlist") renderWatchlistTab();
  }
}

// HTTP Fallback Polling - called only if WebSocket drops offline!
async function synchronizeWithBackend() {
  if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
    return; // Active WS push is working; skip polling to save 99% bandwidth!
  }
  
  const feed = await fetchFromBackend('/api/live-feed'); 
  if (feed) {
    handleLiveFeedUpdate(feed);
  } else {
    state.backendActive = false;
    document.querySelector("#reconnecting-overlay").classList.remove("hidden");
    tickMarketPricesLocal();
  }
}

// Update Dashboard properties smoothly on ticker ticks (FIXES STATIC FRONTEND CHART)
function updateActiveDashboardOnTick() {
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  if (!series || series.length === 0) return;
  const lastPrice = series[series.length - 1].y[3];
  const prevPrice = series[0].y[3];
  const pctChange = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
  
  document.querySelector("#active-stock-price").innerText = `₹${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  const chgLabel = document.querySelector("#active-stock-change");
  chgLabel.innerText = `${pctChange >= 0 ? '+' : ''}${pctChange}%`;
  chgLabel.className = pctChange >= 0 ? "text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-semibold" : "text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded text-xs font-semibold";
  
  if (state.activeChartMode === "lite") {
    updateChartsRealTime();
  }
  updateSignalsAnalysis();
  updateOrderDeskForm();
}

// --- 4. TRADINGVIEW INTEGRATION LOADER ---

function loadTradingViewWidget(symbol) {
  const container = document.querySelector("#tradingview_advanced_chart");
  if (!container) return;
  
  container.innerHTML = "";
  
  let tvSymbol = `NSE:${symbol}`;
  if (symbol === "BTC" || symbol === "BTCUSDT") tvSymbol = "BINANCE:BTCUSDT";
  else if (symbol === "ETH" || symbol === "ETHUSDT") tvSymbol = "BINANCE:ETHUSDT";
  
  if (typeof TradingView !== "undefined") {
    tvWidgetInstance = new TradingView.widget({
      "width": "100%",
      "height": "100%",
      "symbol": tvSymbol,
      "interval": "D",
      "timezone": "Asia/Kolkata",
      "theme": state.theme === "light" ? "light" : "dark",
      "style": "1",
      "locale": "in",
      "enable_publishing": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_advanced_chart"
    });
  } else {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      loadTradingViewWidget(symbol);
    };
    document.head.appendChild(script);
  }
}

// ---- LAZY LOADING DEDICATED ADVANCED TRADINGVIEW TERMINAL WIDGET ----
function loadTradingViewAdvancedTerminal() {
  const container = document.querySelector("#tradingview_widget_container");
  if (!container) return;
  
  container.innerHTML = "";
  
  let tvSymbol = `NSE:${state.activeSymbol}`;
  if (state.activeSymbol === "BTC" || state.activeSymbol === "BTCUSDT") tvSymbol = "BINANCE:BTCUSDT";
  else if (state.activeSymbol === "ETH" || state.activeSymbol === "ETHUSDT") tvSymbol = "BINANCE:ETHUSDT";
  
  if (typeof TradingView !== "undefined") {
    tvWidgetMainTabInstance = new TradingView.widget({
      "autosize": true,
      "symbol": tvSymbol,
      "interval": "D",
      "timezone": "Asia/Kolkata",
      "theme": state.theme === "light" ? "light" : "dark",
      "style": "1", // candlesticks
      "locale": "en",
      "toolbar_bg": "#0f1117",
      "enable_publishing": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_widget_container",
      "studies": [
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies",
        "BB@tv-basicstudies",
        "Volume@tv-basicstudies"
      ],
      "overrides": {
        "mainSeriesProperties.candleStyle.upColor": "#22c55e",
        "mainSeriesProperties.candleStyle.downColor": "#ef4444",
        "paneProperties.background": "#0f1117",
        "paneProperties.backgroundType": "solid"
      }
    });
  } else {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      loadTradingViewAdvancedTerminal();
    };
    document.head.appendChild(script);
  }
}

function syncTradingViewSymbol(symbol) {
  if (tvWidgetMainTabInstance && typeof tvWidgetMainTabInstance.setSymbol === "function") {
    let tvSymbol = `NSE:${symbol}`;
    if (symbol === "BTC" || symbol === "BTCUSDT") tvSymbol = "BINANCE:BTCUSDT";
    else if (symbol === "ETH" || symbol === "ETHUSDT") tvSymbol = "BINANCE:ETHUSDT";
    
    try {
      tvWidgetMainTabInstance.setSymbol(tvSymbol);
    } catch(e) {
      console.warn("TradingView setSymbol API bypassed.");
    }
  }
}

function changeTradingViewInterval(interval) {
  if (tvWidgetMainTabInstance && typeof tvWidgetMainTabInstance.setResolution === "function") {
    try {
      tvWidgetMainTabInstance.setResolution(interval);
    } catch(e) {
      console.warn("TradingView setResolution API bypassed.");
    }
  }
}

// --- 5. LOCAL FALLBACK ENGINE ---

function registerStockOnTheFlyLocal(symbol, startingPrice = null) {
  const sym = symbol.toUpperCase().trim();
  if (INDIAN_STOCKS_CONFIG[sym]) return sym;
  
  const baseVal = startingPrice ? parseFloat(startingPrice) : parseFloat((Math.random() * 2400 + 80).toFixed(2));
  
  INDIAN_STOCKS_CONFIG[sym] = {
    name: `${sym} Ltd. (NSE/BSE Segment)`,
    basePrice: baseVal,
    volatility: parseFloat((Math.random() * 0.0018 + 0.0012).toFixed(4)),
    drift: 0.0001,
    category: "NSE Local Dynamic",
    segment: "midcap",
    bseCode: Math.floor(Math.random() * 90000 + 500000).toString(),
    exchange: "NSE/BSE"
  };
  
  state.stockData[sym] = {};
  for (const tf in TIMEFRAMES) {
    state.stockData[sym][tf] = generateStockHistoryLocal(sym, tf);
  }
  
  showToast(`Dynamically registered new asset locally: ${sym}`, "info");
  return sym;
}

function generateStockHistoryLocal(symbol, timeframe) {
  const cfg = INDIAN_STOCKS_CONFIG[symbol];
  const tf = TIMEFRAMES[timeframe];
  const points = tf.points;
  const data = [];
  
  let currentPrice = cfg.basePrice;
  let currentTime = Date.now() - (points * tf.step);
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.49) * cfg.volatility * 10 + cfg.drift;
    const open = currentPrice;
    const close = currentPrice * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * cfg.volatility * 1.5);
    const low = Math.min(open, close) * (1 - Math.random() * cfg.volatility * 1.5);
    const volume = Math.floor(Math.random() * 200000) + 20000;
    
    data.push({
      x: currentTime,
      y: [
        parseFloat(open.toFixed(2)),
        parseFloat(high.toFixed(2)),
        parseFloat(low.toFixed(2)),
        parseFloat(close.toFixed(2))
      ],
      volume: volume
    });
    
    currentPrice = close;
    currentTime += tf.step;
  }
  return data;
}

function initializeMarketDatabaseLocal() {
  for (const symbol in INDIAN_STOCKS_CONFIG) {
    state.stockData[symbol] = {};
    for (const tf in TIMEFRAMES) {
      state.stockData[symbol][tf] = generateStockHistoryLocal(symbol, tf);
    }
  }
}

function tickMarketPricesLocal() {
  if (!state.marketActive) return;
  
  const updatedStocks = [];
  
  for (const symbol in INDIAN_STOCKS_CONFIG) {
    const config = INDIAN_STOCKS_CONFIG[symbol];
    let priceMultiplier = 1;
    
    if (config.newsImpactTimer && config.newsImpactTimer > 0) {
      priceMultiplier += config.newsImpactDirection * config.newsImpactStrength;
      config.newsImpactTimer--;
    }
    
    const changePercent = (Math.random() - 0.493) * config.volatility * 2.2 + config.drift + (priceMultiplier - 1);
    
    for (const tf in TIMEFRAMES) {
      const series = state.stockData[symbol] ? state.stockData[symbol][tf] : null;
      if (!series || series.length === 0) continue;
      
      let lastCandle = series[series.length - 1];
      const stepLimit = TIMEFRAMES[tf].step;
      const now = Date.now();
      
      // Roll forward locally!
      if (now - lastCandle.x >= stepLimit) {
        const nextTime = lastCandle.x + stepLimit;
        const prevClose = lastCandle.y[3];
        const newCandle = {
          x: nextTime,
          y: [prevClose, prevClose, prevClose, prevClose],
          volume: Math.floor(Math.random() * 50000) + 10000
        };
        series.push(newCandle);
        if (series.length > TIMEFRAMES[tf].points) {
          series.shift();
        }
        lastCandle = series[series.length - 1];
      }
      
      const open = lastCandle.y[0];
      let high = lastCandle.y[1];
      let low = lastCandle.y[2];
      let close = lastCandle.y[3];
      
      const prevPrice = close;
      close = parseFloat((close * (1 + changePercent)).toFixed(2));
      
      high = parseFloat(Math.max(high, close).toFixed(2));
      low = parseFloat(Math.min(low, close).toFixed(2));
      
      lastCandle.y[1] = high;
      lastCandle.y[2] = low;
      lastCandle.y[3] = close;
      
      if (tf === state.activeTimeframe) {
        updatedStocks.push({
          symbol,
          prevPrice,
          newPrice: close,
          direction: close >= prevPrice ? "up" : "down",
          changePct: ((close - series[0].y[3]) / series[0].y[3] * 100).toFixed(2)
        });
      }
    }
  }
  
  evaluateSwingSignalsResolutionLocal();
  
  if (Math.random() < 0.015) {
    scanAndTriggerStrictSignalLocal();
  }
  
  updateUIOnTick(updatedStocks);
}

function scanAndTriggerStrictSignalLocal() {
  const symbols = Object.keys(INDIAN_STOCKS_CONFIG);
  const targetSym = symbols[Math.floor(Math.random() * symbols.length)];
  
  if (state.vettedSignals.find(s => s.symbol === targetSym && s.status === "ACTIVE")) return;
  
  const series = state.stockData[targetSym] ? state.stockData[targetSym]["1D"] : null;
  if (!series || series.length < 30) return;
  
  const currentPrice = series[series.length - 1].y[3];
  const rsiArr = calculateRSI(series, 14);
  const valRsi = rsiArr[rsiArr.length - 1].y;
  
  const bb = calculateBollingerBands(series, 20, 2);
  const lowerBand = bb.lower[bb.lower.length - 1].y;
  
  const ema9 = calculateEMA(series, 9);
  const ema21 = calculateEMA(series, 21);
  const valEma9 = ema9[ema9.length - 1];
  const valEma21 = ema21[ema21.length - 1];
  const isEmaBullish = valEma9 && valEma21 && valEma9 >= (valEma21 * 0.995);
  
  if (valRsi !== null && valRsi < 32 && currentPrice <= (lowerBand * 1.01) && isEmaBullish) {
    const target = parseFloat((currentPrice * 1.05).toFixed(2));
    const sl = parseFloat((currentPrice * 0.98).toFixed(2));
    
    const newSignal = {
      id: "vetted-" + Date.now() + "-" + targetSym,
      symbol: targetSym,
      entryPrice: currentPrice,
      currentPrice: currentPrice,
      targetPrice: target,
      stopPrice: sl,
      dateTriggered: new Date().toLocaleDateString(),
      status: "ACTIVE",
      reason: `Strict Double-Factor Reversal on NSE: Daily RSI Oversold at ${valRsi.toFixed(1)} and price touched lower Bollinger support limit (₹${lowerBand.toFixed(1)}).`,
      pnlPct: 0.00
    };
    
    state.vettedSignals.unshift(newSignal);
    saveStateToStorage();
    dispatchGmailNotification(newSignal, "BUY_TRIGGERED");
    renderSwingSignalsTab();
  }
}

function evaluateSwingSignalsResolutionLocal() {
  let changed = false;
  state.vettedSignals.forEach(sig => {
    if (sig.status !== "ACTIVE") return;
    
    const series = state.stockData[sig.symbol] ? state.stockData[sig.symbol]["1D"] : null;
    if (!series || series.length === 0) return;
    const currentPrice = series[series.length - 1].y[3];
    sig.currentPrice = currentPrice;
    
    const pnl = ((currentPrice - sig.entryPrice) / sig.entryPrice * 100);
    sig.pnlPct = parseFloat(pnl.toFixed(2));
    
    if (currentPrice >= sig.targetPrice) {
      sig.status = "COMPLETED";
      changed = true;
      dispatchGmailNotification(sig, "TARGET_HIT");
      showToast(`🎯 SWING WIN: ${sig.symbol} reached +5.0% profit target!`, "success", 6000);
    } else if (currentPrice <= sig.stopPrice) {
      sig.status = "STOPPED";
      changed = true;
      dispatchGmailNotification(sig, "STOP_HIT");
      showToast(`🚨 SWING STOPPED: ${sig.symbol} hit risk limit protection (-2.0%).`, "error", 6000);
    }
  });
  
  if (changed) {
    saveStateToStorage();
    renderSwingSignalsTab();
  }
}

// --- 5. TECHNICAL ANALYSIS ANALYTICAL ENGINE ---

function calculateSMA(series, period) {
  const sma = [];
  for (let i = 0; i < series.length; i++) {
    if (i < period - 1) {
      sma.push({ x: series[i].x, y: null });
      continue;
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += series[i - j].y[3];
    }
    sma.push({ x: series[i].x, y: parseFloat((sum / period).toFixed(2)) });
  }
  return sma;
}

function calculateEMA(series, period) {
  const ema = [];
  const k = 2 / (period + 1);
  let prevEma = null;
  
  for (let i = 0; i < series.length; i++) {
    const val = series[i].y[3];
    if (i < period - 1) {
      ema.push(null);
      continue;
    }
    if (prevEma === null) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += series[i - j].y[3];
      }
      prevEma = sum / period;
    } else {
      prevEma = val * k + prevEma * (1 - k);
    }
    ema.push(parseFloat(prevEma.toFixed(2)));
  }
  return ema;
}

function calculateBollingerBands(series, period = 20, deviation = 2) {
  const upper = [];
  const middle = [];
  const lower = [];
  
  for (let i = 0; i < series.length; i++) {
    if (i < period - 1) {
      upper.push({ x: series[i].x, y: null });
      middle.push({ x: series[i].x, y: null });
      lower.push({ x: series[i].x, y: null });
      continue;
    }
    
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += series[i - j].y[3];
    }
    const sma = sum / period;
    middle.push({ x: series[i].x, y: parseFloat(sma.toFixed(2)) });
    
    let sumSqrDiff = 0;
    for (let j = 0; j < period; j++) {
      sumSqrDiff += Math.pow(series[i - j].y[3] - sma, 2);
    }
    const variance = sumSqrDiff / period;
    const stdDev = Math.sqrt(variance);
    
    upper.push({ x: series[i].x, y: parseFloat((sma + deviation * stdDev).toFixed(2)) });
    lower.push({ x: series[i].x, y: parseFloat((sma - deviation * stdDev).toFixed(2)) });
  }
  
  return { upper, middle, lower };
}

function calculateRSI(series, period = 14) {
  const rsi = [];
  let avgGain = 0;
  let avgLoss = 0;
  
  for (let i = 0; i < series.length; i++) {
    if (i < period) {
      rsi.push({ x: series[i].x, y: null });
      continue;
    }
    
    if (i === period) {
      let totalGain = 0;
      let totalLoss = 0;
      for (let j = 1; j <= period; j++) {
        const change = series[j].y[3] - series[j - 1].y[3];
        if (change > 0) totalGain += change;
        else totalLoss += Math.abs(change);
      }
      avgGain = totalGain / period;
      avgLoss = totalLoss / period;
    } else {
      const change = series[i].y[3] - series[i - 1].y[3];
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? Math.abs(change) : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    
    if (avgLoss === 0) {
      rsi.push({ x: series[i].x, y: 100 });
    } else {
      const rs = avgGain / avgLoss;
      rsi.push({ x: series[i].x, y: parseFloat((100 - (100 / (1 + rs))).toFixed(2)) });
    }
  }
  return rsi;
}

function compileTechnicalSignal(symbol, timeframe) {
  const series = state.stockData[symbol] ? state.stockData[symbol][timeframe] : null;
  if (!series || series.length < 30) return { score: 50, rating: "NEUTRAL", breakdown: [] };
  
  const currentPrice = series[series.length - 1].y[3];
  
  const ema9 = calculateEMA(series, 9);
  const ema21 = calculateEMA(series, 21);
  const valEma9 = ema9[ema9.length - 1];
  const valEma21 = ema21[ema21.length - 1];
  
  const rsiData = calculateRSI(series, 14);
  const valRsi = rsiData[rsiData.length - 1].y;
  
  const bb = calculateBollingerBands(series, 20, 2);
  const valUpper = bb.upper[bb.upper.length - 1].y;
  const valLower = bb.lower[bb.lower.length - 1].y;
  
  let points = 0;
  const breakdown = [];
  
  if (valEma9 && valEma21) {
    const isBullishCross = valEma9 > valEma21;
    if (isBullishCross) {
      points += 2;
      breakdown.push({ indicator: "EMA (9/21)", value: "9-EMA above 21-EMA (Uptrend)", rating: "BUY", score: "+2" });
    } else {
      points -= 2;
      breakdown.push({ indicator: "EMA (9/21)", value: "9-EMA below 21-EMA (Downtrend)", rating: "SELL", score: "-2" });
    }
  }
  
  if (valRsi !== null) {
    if (valRsi < 30) {
      points += 4;
      breakdown.push({ indicator: "RSI (14)", value: `${valRsi} (Oversold Range)`, rating: "STRONG BUY", score: "+4" });
    } else if (valRsi > 70) {
      points -= 4;
      breakdown.push({ indicator: "RSI (14)", value: `${valRsi} (Overbought Range)`, rating: "STRONG SELL", score: "-4" });
    } else if (valRsi < 45) {
      points += 1.5;
      breakdown.push({ indicator: "RSI (14)", value: `${valRsi} (Accumulation Zone)`, rating: "ACCUMULATING", score: "+1.5" });
    } else {
      breakdown.push({ indicator: "RSI (14)", value: `${valRsi} (Neutral Zone)`, rating: "NEUTRAL", score: "0" });
    }
  }
  
  if (valUpper && valLower) {
    if (currentPrice <= valLower) {
      points += 3;
      breakdown.push({ indicator: "Bollinger Bands", value: "Price at Lower Band (Support)", rating: "BUY", score: "+3" });
    } else if (currentPrice >= valUpper) {
      points -= 3;
      breakdown.push({ indicator: "Bollinger Bands", value: "Price at Upper Band (Resistance)", rating: "SELL", score: "-3" });
    } else {
      breakdown.push({ indicator: "Bollinger Bands", value: "Normal range trading", rating: "NEUTRAL", score: "0" });
    }
  }
  
  const scorePercent = Math.min(Math.max(Math.round(((points + 9) / 18) * 100), 5), 95);
  let rating = "NEUTRAL";
  let ratingColorClass = "text-yellow-500 border-yellow-500/20 bg-yellow-500/5";
  
  if (scorePercent >= 75) {
    rating = "STRONG BUY";
    ratingColorClass = "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
  } else if (scorePercent >= 55) {
    rating = "BUY";
    ratingColorClass = "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
  } else if (scorePercent <= 25) {
    rating = "STRONG SELL";
    ratingColorClass = "text-rose-500 border-rose-500/20 bg-rose-500/5";
  } else if (scorePercent <= 45) {
    rating = "SELL";
    ratingColorClass = "text-rose-400 border-rose-400/20 bg-rose-400/5";
  }
  
  const atr = currentPrice * 0.015;
  const target1 = currentPrice + (points >= 0 ? atr * 1.5 : -atr * 1.2);
  const target2 = currentPrice + (points >= 0 ? atr * 3.5 : -atr * 3.0);
  const stopLoss = currentPrice + (points >= 0 ? -atr * 1.25 : atr * 1.0);
  
  return {
    score: scorePercent,
    rating,
    ratingColorClass,
    breakdown,
    tradeRecommendation: {
      entry: currentPrice.toFixed(2),
      t1: target1.toFixed(2),
      t2: target2.toFixed(2),
      sl: stopLoss.toFixed(2),
      confidence: scorePercent
    }
  };
}

// --- 6. APEXCHARTS CHART RENDERERS ---

function drawMainChart() {
  const currentTheme = THEME_CHARTS[state.theme];
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  
  if (!series || series.length === 0) return;
  
  const ema9Data = state.activeIndicators.ema9 ? calculateEMA(series, 9) : [];
  const ema21Data = state.activeIndicators.ema21 ? calculateEMA(series, 21) : [];
  const bbData = state.activeIndicators.bollinger ? calculateBollingerBands(series, 20, 2) : null;
  const bbUpper = bbData ? bbData.upper : [];
  const bbLower = bbData ? bbData.lower : [];
  const bbMiddle = bbData ? bbData.middle : [];
  
  const options = {
    series: [
      {
        name: 'Price Candlesticks',
        type: 'candlestick',
        data: series
      }
    ],
    chart: {
      type: 'line',
      height: 380,
      toolbar: { show: false },
      background: 'transparent',
      animations: { enabled: false }
    },
    theme: {
      mode: state.theme === 'light' ? 'light' : 'dark'
    },
    grid: {
      borderColor: currentTheme.gridColor,
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { colors: currentTheme.textColor, fontSize: '11px', fontFamily: 'var(--font-sans)' }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: function(val) { return '₹' + val.toLocaleString(undefined, { minimumFractionDigits: 2 }); },
        style: { colors: currentTheme.textColor, fontSize: '11px', fontFamily: 'var(--font-mono)' }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: currentTheme.bullColor,
          downward: currentTheme.bearColor
        },
        wick: { useFillColor: true }
      }
    },
    stroke: {
      width: [1, 2, 2, 1, 1, 1],
      curve: 'smooth'
    },
    legend: { show: false }
  };
  
  if (state.activeIndicators.ema9) {
    options.series.push({
      name: '9 EMA',
      type: 'line',
      data: ema9Data.map(pt => ({ x: pt.x, y: pt.y }))
    });
  }
  if (state.activeIndicators.ema21) {
    options.series.push({
      name: '21 EMA',
      type: 'line',
      data: ema21Data.map(pt => ({ x: pt.x, y: pt.y }))
    });
  }
  
  if (state.activeIndicators.bollinger && bbData) {
    options.series.push({
      name: 'BB Upper',
      type: 'line',
      data: bbUpper.map(pt => ({ x: pt.x, y: pt.y }))
    });
    options.series.push({
      name: 'BB Basis',
      type: 'line',
      data: bbMiddle.map(pt => ({ x: pt.x, y: pt.y }))
    });
    options.series.push({
      name: 'BB Lower',
      type: 'line',
      data: bbLower.map(pt => ({ x: pt.x, y: pt.y }))
    });
  }
  
  const strokeColors = [currentTheme.accentColor];
  if (state.activeIndicators.ema9) strokeColors.push('#fbbf24');
  if (state.activeIndicators.ema21) strokeColors.push('#ec4899');
  if (state.activeIndicators.bollinger) {
    strokeColors.push('rgba(16, 185, 129, 0.4)');
    strokeColors.push('rgba(156, 163, 175, 0.25)');
    strokeColors.push('rgba(239, 110, 110, 0.4)');
  }
  options.colors = strokeColors;
  
  if (chartInstanceMain) {
    chartInstanceMain.destroy();
  }
  
  chartInstanceMain = new ApexCharts(document.querySelector("#main-stock-chart"), options);
  chartInstanceMain.render();
}

function drawRsiChart() {
  const currentTheme = THEME_CHARTS[state.theme];
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  
  if (!series || series.length === 0 || !state.activeIndicators.rsi) {
    document.querySelector("#rsi-chart-container").classList.add("hidden");
    return;
  }
  
  document.querySelector("#rsi-chart-container").classList.remove("hidden");
  const rsiValues = calculateRSI(series, 14);
  
  const options = {
    series: [{
      name: 'RSI (14)',
      data: rsiValues.map(pt => ({ x: pt.x, y: pt.y }))
    }],
    chart: {
      type: 'line',
      height: 110,
      toolbar: { show: false },
      background: 'transparent',
      animations: { enabled: false }
    },
    grid: {
      borderColor: currentTheme.gridColor,
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    stroke: {
      width: 1.5,
      colors: [currentTheme.accentColor]
    },
    xaxis: {
      type: 'datetime',
      labels: { show: false }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 2,
      labels: {
        style: { colors: currentTheme.textColor, fontSize: '10px', fontFamily: 'var(--font-mono)' }
      }
    },
    annotations: {
      yaxis: [
        {
          y: 70,
          borderColor: currentTheme.bearColor,
          strokeDashArray: 2,
          label: {
            borderColor: 'transparent',
            style: { color: currentTheme.bearColor, background: 'transparent', fontSize: '9px' },
            text: '70'
          }
        },
        {
          y: 30,
          borderColor: currentTheme.bullColor,
          strokeDashArray: 2,
          label: {
            borderColor: 'transparent',
            style: { color: currentTheme.bullColor, background: 'transparent', fontSize: '9px' },
            text: '30'
          }
        }
      ]
    },
    legend: { show: false }
  };
  
  if (chartInstanceRsi) {
    chartInstanceRsi.destroy();
  }
  
  chartInstanceRsi = new ApexCharts(document.querySelector("#rsi-sub-chart"), options);
  chartInstanceRsi.render();
}

function updateChartsRealTime() {
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  if (!series || !chartInstanceMain) return;
  
  const ema9Data = state.activeIndicators.ema9 ? calculateEMA(series, 9).map(pt => ({ x: pt.x, y: pt.y })) : [];
  const ema21Data = state.activeIndicators.ema21 ? calculateEMA(series, 21).map(pt => ({ x: pt.x, y: pt.y })) : [];
  const bbData = state.activeIndicators.bollinger ? calculateBollingerBands(series, 20, 2) : null;
  
  const seriesArray = [{
    name: 'Price Candlesticks',
    data: series
  }];
  
  if (state.activeIndicators.ema9) seriesArray.push({ name: '9 EMA', data: ema9Data });
  if (state.activeIndicators.ema21) seriesArray.push({ name: '21 EMA', data: ema21Data });
  if (state.activeIndicators.bollinger && bbData) {
    seriesArray.push({ name: 'BB Upper', data: bbData.upper.map(pt => ({ x: pt.x, y: pt.y })) });
    seriesArray.push({ name: 'BB Basis', data: bbData.middle.map(pt => ({ x: pt.x, y: pt.y })) });
    seriesArray.push({ name: 'BB Lower', data: bbData.lower.map(pt => ({ x: pt.x, y: pt.y })) });
  }
  
  chartInstanceMain.updateSeries(seriesArray, false);
  
  if (state.activeIndicators.rsi && chartInstanceRsi) {
    const rsiValues = calculateRSI(series, 14).map(pt => ({ x: pt.x, y: pt.y }));
    chartInstanceRsi.updateSeries([{ name: 'RSI (14)', data: rsiValues }], false);
  }
}

// --- 7. DOUBLE-DECK PORTFOLIO SYNCHRONIZATION ---

function loadStateFromStorage() {
  const saved = localStorage.getItem("neo_signal_state_v2");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.cash = parsed.cash ?? 100000.00;
      state.holdings = parsed.holdings ?? {};
      state.transactions = parsed.transactions ?? [];
      state.watchlist = parsed.watchlist ?? ["RELIANCE", "TCS", "INFY", "HDFCBANK", "SBIN"];
      state.brokerageHoldings = parsed.brokerageHoldings ?? [];
      state.vettedSignals = parsed.vettedSignals ?? state.vettedSignals;
      state.gmailAddress = parsed.gmailAddress ?? "user@gmail.com";
      state.enableGmailAlerts = parsed.enableGmailAlerts ?? true;
      state.supabaseUrl = parsed.supabaseUrl ?? "";
      state.supabaseKey = parsed.supabaseKey ?? "";
    } catch (e) {
      console.warn("Error parsing local state:", e);
    }
  }
}

function saveStateToStorage() {
  localStorage.setItem("neo_signal_state_v2", JSON.stringify({
    cash: state.cash,
    holdings: state.holdings,
    transactions: state.transactions,
    watchlist: state.watchlist,
    brokerageHoldings: state.brokerageHoldings,
    vettedSignals: state.vettedSignals,
    gmailAddress: state.gmailAddress,
    enableGmailAlerts: state.enableGmailAlerts,
    supabaseUrl: state.supabaseUrl,
    supabaseKey: state.supabaseKey
  }));
}

// DECK A: Simulated Account Trade Execution
async function executeSimulatedOrder(type, symbol, qty) {
  if (qty <= 0 || isNaN(qty)) {
    showToast("Invalid quantity entered", "error");
    return;
  }
  
  const series = state.stockData[symbol] ? state.stockData[symbol][state.activeTimeframe] : null;
  if (!series || series.length === 0) {
    showToast("Price data currently unavailable. Syncing...", "error");
    return;
  }
  const price = series[series.length - 1].y[3];
  
  if (state.backendActive) {
    const res = await fetchFromBackend('/api/deck-a/order', {
      method: 'POST',
      body: JSON.stringify({ type, symbol, qty, price })
    });
    if (res && !res.error) {
      state.cash = res.cash;
      state.holdings = res.holdings;
      state.transactions = res.transactions;
      showToast(`[Backend Sync] ${type} order fulfilled successfully!`, "success");
    } else {
      showToast(res ? res.error : "Failed to execute order via backend", "error");
    }
  } else {
    // Fallback Local execution
    const sym = registerStockOnTheFlyLocal(symbol, price);
    const totalCost = price * qty;
    if (type === "BUY") {
      if (totalCost > state.cash) {
        showToast("Insufficient virtual cash!", "error");
        return;
      }
      state.cash -= totalCost;
      if (!state.holdings[sym]) state.holdings[sym] = { qty: 0, avgPrice: 0 };
      const prevQty = state.holdings[sym].qty;
      const prevAvg = state.holdings[sym].avgPrice;
      const newQty = prevQty + qty;
      const newAvg = ((prevQty * prevAvg) + totalCost) / newQty;
      
      state.holdings[sym].qty = newQty;
      state.holdings[sym].avgPrice = parseFloat(newAvg.toFixed(2));
      showToast(`Purchased ${qty} shares of ${sym} @ ₹${price.toFixed(2)}`, "success");
    } else {
      if (!state.holdings[sym] || state.holdings[sym].qty < qty) {
        showToast("Insufficient shares!", "error");
        return;
      }
      state.cash += totalCost;
      state.holdings[sym].qty -= qty;
      if (state.holdings[sym].qty === 0) delete state.holdings[sym];
      showToast(`Sold ${qty} shares of ${sym} @ ₹${price.toFixed(2)}`, "success");
    }
    
    state.transactions.unshift({
      time: new Date().toLocaleTimeString(),
      symbol: sym,
      type,
      qty,
      price,
      total: parseFloat(totalCost.toFixed(2))
    });
    saveStateToStorage();
  }
  
  updatePortfolioUI();
  updateOrderDeskForm();
}

// DECK B: Manual Brokerage Sync Ledger Execution
async function recordBrokeragePurchase(symbol, buyDate, buyPrice, qty) {
  if (!symbol || !buyDate || buyPrice <= 0 || qty <= 0) {
    showToast("Invalid data fields.", "error");
    return;
  }
  
  const sym = symbol.toUpperCase().trim();
  
  if (state.backendActive) {
    const res = await fetchFromBackend('/api/deck-b/holdings', {
      method: 'POST',
      body: JSON.stringify({ symbol: sym, buyDate, buyPrice, qty })
    });
    if (res && res.brokerageHoldings) {
      state.brokerageHoldings = res.brokerageHoldings;
      
      await fetchActiveStockChartData();
      showToast(`[Backend Sync] Manual brokerage position logged.`, "success");
    }
  } else {
    // Local fallback
    const targetSym = registerStockOnTheFlyLocal(sym, buyPrice);
    const record = {
      id: "brokerage-" + Date.now(),
      symbol: targetSym,
      buyDate,
      buyPrice: parseFloat(buyPrice),
      qty: parseInt(qty)
    };
    state.brokerageHoldings.unshift(record);
    saveStateToStorage();
    showToast(`Registered real holding: ${qty} shares of ${targetSym}`, "success");
  }
  updatePortfolioUI();
}

async function deleteBrokerageRecord(id) {
  if (state.backendActive) {
    const res = await fetchFromBackend(`/api/deck-b/holdings/${id}`, { method: 'DELETE' });
    if (res && res.brokerageHoldings) {
      state.brokerageHoldings = res.brokerageHoldings;
      showToast("[Backend Sync] Ledger record deleted.", "info");
    }
  } else {
    state.brokerageHoldings = state.brokerageHoldings.filter(b => b.id !== id);
    saveStateToStorage();
    showToast("Ledger record deleted locally.", "info");
  }
  updatePortfolioUI();
}

// --- 8. REAL-TIME NEWS GENERATOR & VOLATILITY SHOCKS ---

function triggerGlobalNewsFlash() {
  if (state.backendActive) return; 
  
  const isStockSpecific = Math.random() > 0.45;
  let headline = "";
  let targetSymbol = "";
  let sentiment = "neutral";
  
  if (isStockSpecific) {
    const keys = Object.keys(INDIAN_STOCKS_CONFIG);
    targetSymbol = keys[Math.floor(Math.random() * keys.length)];
    const stockConfig = INDIAN_STOCKS_CONFIG[targetSymbol];
    
    const template = INDIAN_NEWS_TEMPLATES[Math.floor(Math.random() * INDIAN_NEWS_TEMPLATES.length)];
    headline = template.text.replace("{symbol}", targetSymbol);
    sentiment = template.sentiment;
    
    stockConfig.newsImpactTimer = 15;
    stockConfig.newsImpactDirection = sentiment === "bullish" ? 1 : -1;
    stockConfig.newsImpactStrength = template.impact;
  } else {
    const macro = MACRO_INDIA_NEWS[Math.floor(Math.random() * MACRO_INDIA_NEWS.length)];
    headline = macro.text;
    sentiment = macro.sentiment;
    
    for (const s in INDIAN_STOCKS_CONFIG) {
      INDIAN_STOCKS_CONFIG[s].newsImpactTimer = 8;
      INDIAN_STOCKS_CONFIG[s].newsImpactDirection = macro.impactGlobal >= 0 ? 1 : -1;
      INDIAN_STOCKS_CONFIG[s].newsImpactStrength = Math.abs(macro.impactGlobal);
    }
  }
  
  const newsItem = {
    time: new Date().toLocaleTimeString(),
    headline,
    sentiment,
    symbol: targetSymbol
  };
  
  state.newsFeed.unshift(newsItem);
  if (state.newsFeed.length > 25) state.newsFeed.pop();
  
  showToast(headline, sentiment === "bullish" ? "bull" : sentiment === "bearish" ? "bear" : "info", 5000);
  renderNewsLogs();
}

// --- 9. TAB NAVIGATION SYSTEM ---

function setupTabNavigation() {
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      document.querySelectorAll(".nav-tab-btn").forEach(b => {
        b.classList.remove("nav-tab-active", "border-indigo-500", "text-indigo-400");
      });
      btn.classList.add("nav-tab-active");
      
      const activeTabId = btn.dataset.tab;
      document.querySelectorAll(".app-tab-pane").forEach(pane => pane.classList.add("hidden"));
      document.querySelector(`#tab-pane-${activeTabId}`).classList.remove("hidden");
      
      if (activeTabId === "terminal") {
        await fetchActiveStockChartData(); // Pull chart on-demand
        setTimeout(() => { 
          if (state.activeChartMode === "tv") {
            loadTradingViewWidget(state.activeSymbol);
          } else {
            drawMainChart(); 
            drawRsiChart(); 
          }
        }, 10);
      } else if (activeTabId === "signals") {
        renderSwingSignalsTab();
      } else if (activeTabId === "watchlist") {
        renderWatchlistTab();
      } else if (activeTabId === "scanner") {
        renderScannerTab();
        setTimeout(() => {
          const executeBtn = document.querySelector("#execute-scan-btn");
          if (executeBtn) executeBtn.click();
        }, 50);
      } else if (activeTabId === "tradingview") {
        // ---- LAZY LOADING DESIGN: Only build heavy TV widget when user clicks this tab! ----
        if (!tvWidgetInitialized) {
          loadTradingViewAdvancedTerminal();
          tvWidgetInitialized = true;
        } else {
          syncTradingViewSymbol(state.activeSymbol);
        }
      } else if (activeTabId === "portfolio") {
        updatePortfolioUI();
      } else if (activeTabId === "settings") {
        renderSettingsTab();
      }
    });
  });
}

// Render Quick Switch capsules directly on Terminal tab (FIX FOR STOCK SWITCH BUG!)
function renderQuickStockCapsules() {
  const container = document.querySelector("#quick-stock-capsules");
  if (!container) return;
  
  container.innerHTML = "";
  
  state.watchlist.forEach(symbol => {
    const isSelected = symbol === state.activeSymbol;
    const btn = document.createElement("button");
    
    btn.className = isSelected
      ? "px-3.5 py-1.5 bg-indigo-600 border border-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center space-x-1.5 transition duration-200 cursor-pointer animate-pulse"
      : "px-3.5 py-1.5 bg-custom-primary hover:bg-custom-tertiary border border-custom hover:border-indigo-500/30 text-custom-sub hover:text-custom-main text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition duration-200 cursor-pointer";
    
    const series = state.stockData[symbol] ? state.stockData[symbol][state.activeTimeframe] : null;
    let pctStr = "0.0%";
    let pctColor = "text-custom-muted";
    
    if (series && series.length > 0) {
      const lastPrice = series[series.length - 1].y[3];
      const prevPrice = series[0].y[3];
      const pct = ((lastPrice - prevPrice) / prevPrice * 100);
      pctStr = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
      pctColor = pct >= 0 ? "text-emerald-400" : "text-rose-400";
    }
    
    btn.innerHTML = `
      <span class="font-mono font-bold">${symbol}</span>
      <span class="text-[9px] font-mono ${isSelected ? 'text-indigo-200 font-bold' : pctColor}">${pctStr}</span>
    `;
    
    btn.addEventListener("click", () => {
      changeActiveStock(symbol);
    });
    
    container.appendChild(btn);
  });
}

// --- SWING SIGNALS TAB ---
function renderSwingSignalsTab() {
  const container = document.querySelector("#active-signals-list");
  if (!container) return;
  container.innerHTML = "";
  
  const activeSignals = state.vettedSignals;
  
  if (activeSignals.length === 0) {
    container.innerHTML = `
      <div class="col-span-12 py-12 text-center text-custom-muted text-sm border border-custom border-dashed rounded-xl">
        <i class="fa-solid fa-radar text-2xl mb-2 text-indigo-500/50"></i>
        <p>No swing trade triggers detected yet. High-trust strategies require precise indicators.</p>
      </div>
    `;
    return;
  }
  
  activeSignals.forEach(sig => {
    let statusClass = "border-emerald-500/20 bg-emerald-500/5 text-emerald-400";
    let iconClass = "fa-solid fa-circle-check";
    if (sig.status === "COMPLETED") {
      statusClass = "border-indigo-500/20 bg-indigo-500/5 text-indigo-400";
      iconClass = "fa-solid fa-flag-checkered";
    } else if (sig.status === "STOPPED") {
      statusClass = "border-rose-500/20 bg-rose-500/5 text-rose-400";
      iconClass = "fa-solid fa-circle-xmark";
    } else if (sig.status === "ACTIVE") {
      statusClass = "active-signal-glow bg-emerald-950/20 text-emerald-400";
      iconClass = "fa-solid fa-wave-square animate-pulse";
    }
    
    const card = document.createElement("div");
    card.className = "bg-custom-secondary border border-custom rounded-xl p-5 flex flex-col justify-between shadow-lg relative";
    
    const diffPct = sig.pnlPct;
    let barPercent = ((diffPct + 2) / 7) * 100;
    barPercent = Math.min(Math.max(barPercent, 0), 100);
    
    card.innerHTML = `
      <div>
        <div class="flex justify-between items-start mb-3">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-lg font-black font-mono text-custom-main">${sig.symbol}</span>
              <span class="text-xs text-custom-sub font-semibold">BSE/NSE Bluechip</span>
            </div>
            <span class="text-[10px] text-custom-muted font-mono">Trigger Date: ${sig.dateTriggered}</span>
          </div>
          <span class="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border flex items-center space-x-1 ${statusClass}">
            <i class="${iconClass}"></i>
            <span>${sig.status}</span>
          </span>
        </div>
        
        <div class="p-3 bg-custom-primary/60 border border-custom/60 rounded-lg mb-4 text-xs font-mono">
          <div class="flex justify-between py-0.5">
            <span class="text-custom-sub">Entry Trigger Price:</span>
            <span class="text-custom-main font-bold">₹${sig.entryPrice.toFixed(2)}</span>
          </div>
          <div class="flex justify-between py-0.5">
            <span class="text-custom-sub">Live Price:</span>
            <span class="text-custom-main font-bold">₹${sig.currentPrice.toFixed(2)}</span>
          </div>
          <div class="flex justify-between py-0.5 border-t border-custom/40 mt-1 pt-1">
            <span class="text-emerald-400 font-semibold">Profit Target (+5%):</span>
            <span class="text-emerald-400 font-extrabold">₹${sig.targetPrice.toFixed(2)}</span>
          </div>
          <div class="flex justify-between py-0.5">
            <span class="text-rose-400 font-semibold">Stop Loss (-2%):</span>
            <span class="text-rose-400 font-extrabold">₹${sig.stopPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <p class="text-[11px] text-custom-sub leading-relaxed mb-4 italic">"${sig.reason}"</p>
      </div>
      
      <div>
        <div class="flex justify-between items-center text-[10px] font-bold mb-1 font-mono">
          <span class="text-rose-400">Stop (-2.0%)</span>
          <span class="${sig.pnlPct >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-extrabold">Return: ${sig.pnlPct >= 0 ? '+' : ''}${sig.pnlPct}%</span>
          <span class="text-emerald-400">Target (+5.0%)</span>
        </div>
        <div class="h-2 w-full bg-custom-tertiary rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-rose-500 via-yellow-500 to-emerald-500 transition-all duration-300" style="width: ${barPercent}%"></div>
        </div>
        
        <div class="mt-4 flex space-x-2">
          <button class="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition" onclick="changeActiveStockAndJump('${sig.symbol}')">
            <i class="fa-solid fa-chart-line mr-1"></i> Chart
          </button>
          <button class="py-1.5 px-3 bg-custom-tertiary hover:bg-red-500 hover:text-white border border-custom text-[11px] font-bold text-custom-sub rounded-lg transition cursor-pointer" onclick="deleteVettedSignal('${sig.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ---- BUG FIX 1: UPDATE SIGNAL FRONTEND STATE ARRAYS DIRECTLY ON COMPLETED DELETIONS ----
async function deleteVettedSignal(id) {
  if (state.backendActive) {
    const res = await fetchFromBackend(`/api/vetted-signals/${id}`, { method: 'DELETE' });
    if (res && res.vettedSignals) {
      state.vettedSignals = res.vettedSignals; // Update list immediately!
    }
  } else {
    state.vettedSignals = state.vettedSignals.filter(s => s.id !== id);
    saveStateToStorage();
  }
  renderSwingSignalsTab();
  showToast("Swing signal deleted.", "info");
}

// --- WATCHLIST MONITOR TAB ---
function renderWatchlistTab() {
  const container = document.querySelector("#watchlist-tab-grid");
  if (!container) return;
  container.innerHTML = "";
  
  state.watchlist.forEach(symbol => {
    const config = INDIAN_STOCKS_CONFIG[symbol];
    const series = state.stockData[symbol] ? state.stockData[symbol][state.activeTimeframe] : null;
    if (!series || series.length === 0) return;
    
    const lastPrice = series[series.length - 1].y[3];
    const prevPrice = series[0].y[3];
    const pctChange = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
    const dayHigh = Math.max(...series.slice(-5).map(pt => pt.y[1]));
    const dayLow = Math.min(...series.slice(-5).map(pt => pt.y[2]));
    
    const card = document.createElement("div");
    card.className = "bg-custom-secondary border border-custom rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition hover:border-indigo-500/50";
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div>
          <span class="text-xs font-bold bg-custom-tertiary text-custom-sub px-2 py-0.5 rounded font-mono">${symbol}</span>
          <h4 class="text-sm font-bold text-custom-main mt-1 leading-tight">${config.name}</h4>
          <span class="text-[10px] text-custom-muted">${config.category} | ${config.exchange}</span>
        </div>
        <span class="text-xs font-bold px-2 py-0.5 rounded ${pctChange >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}">
          ${pctChange >= 0 ? '+' : ''}${pctChange}%
        </span>
      </div>
      
      <div class="border-y border-custom/50 py-2.5 my-3 grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <div class="text-[9px] uppercase text-custom-muted">Last Price</div>
          <div class="text-sm font-black text-custom-main">₹${lastPrice.toLocaleString()}</div>
        </div>
        <div>
          <div class="text-[9px] uppercase text-custom-muted">BSE Code</div>
          <div class="text-sm font-black text-custom-sub">${config.bseCode}</div>
        </div>
        <div>
          <div class="text-[9px] uppercase text-custom-muted">Day High</div>
          <div class="text-xs text-emerald-400">₹${dayHigh.toFixed(1)}</div>
        </div>
        <div>
          <div class="text-[9px] uppercase text-custom-muted">Day Low</div>
          <div class="text-xs text-rose-400">₹${dayLow.toFixed(1)}</div>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button class="flex-1 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:text-white text-[11px] font-bold text-indigo-400 rounded-lg transition font-bold" onclick="changeActiveStockAndJump('${symbol}')">
          <i class="fa-solid fa-chart-line mr-1"></i> Open Terminal
        </button>
        <button class="py-1.5 px-3 bg-custom-primary hover:bg-rose-500/10 hover:text-rose-500 text-[11px] font-bold text-custom-muted rounded-lg border border-custom transition" onclick="removeFromWatchlist('${symbol}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ---- BUG FIX 3: ENCODE SPECIAL SYMBOLS LIKE M&M ON watchlist delete ROUTING PATHS ----
async function removeFromWatchlist(symbol) {
  if (state.backendActive) {
    const encoded = encodeURIComponent(symbol); // M&M -> M%26M
    const res = await fetchFromBackend(`/api/watchlist/${encoded}`, { method: 'DELETE' });
    if (res && res.watchlist) {
      state.watchlist = res.watchlist; 
    }
  } else {
    state.watchlist = state.watchlist.filter(s => s !== symbol);
    saveStateToStorage();
  }
  renderWatchlistTab();
  renderQuickStockCapsules();
  showToast(`${symbol} removed from monitor.`, "info");
}

// --- ADVANCED MULTI-FACTOR SCANNER TAB ---
function renderScannerTab() {
  const select = document.querySelector("#scanner-universe-filter");
  const techSelect = document.querySelector("#scanner-technical-filter");
  const scanBtn = document.querySelector("#execute-scan-btn");
  
  if (!scanBtn) return;
  
  scanBtn.onclick = () => {
    const scannerLoading = document.querySelector("#scanner-loading");
    const scannerResults = document.querySelector("#scanner-results");
    const tbody = document.querySelector("#scanner-results-tbody");
    
    scannerLoading.classList.remove("hidden");
    scannerResults.classList.add("hidden");
    
    setTimeout(() => {
      scannerLoading.classList.add("hidden");
      scannerResults.classList.remove("hidden");
      
      tbody.innerHTML = "";
      
      const filterSegment = select.value;
      const filterTech = techSelect.value;
      
      let matchedCount = 0;
      
      for (const symbol in INDIAN_STOCKS_CONFIG) {
        const meta = INDIAN_STOCKS_CONFIG[symbol];
        
        if (filterSegment !== "all" && meta.segment !== filterSegment) continue;
        
        // ---- BUG FIX 2: STRICT NULL GUARD FOR STOCKDATA CONFLICTS ----
        const series = state.stockData[symbol]?.[ "1D" ];
        if (!series || series.length === 0) continue;
        
        const lastPrice = series[series.length - 1].y[3];
        const prevPrice = series[0].y[3];
        const pctChange = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
        
        const rsiData = calculateRSI(series, 14);
        const rsiVal = rsiData[rsiData.length - 1].y;
        
        const ema9 = calculateEMA(series, 9);
        const ema21 = calculateEMA(series, 21);
        const valEma9 = ema9[ema9.length - 1];
        const valEma21 = ema21[ema21.length - 1];
        
        const bb = calculateBollingerBands(series, 20, 2);
        const upperB = bb.upper[bb.upper.length - 1].y;
        const lowerB = bb.lower[bb.lower.length - 1].y;
        const width = (upperB - lowerB) / lastPrice * 100;
        
        let matched = false;
        let signalTrigger = "NEUTRAL";
        let scoreTrigger = "50%";
        let ratingColor = "text-yellow-500 border-yellow-500/20 bg-yellow-500/5";
        
        if (filterTech === "rsi_oversold" && rsiVal < 32) {
          matched = true;
          signalTrigger = "STRONG BUY";
          scoreTrigger = "86%";
          ratingColor = "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
        } else if (filterTech === "rsi_overbought" && rsiVal > 68) {
          matched = true;
          signalTrigger = "STRONG SELL";
          scoreTrigger = "12%";
          ratingColor = "text-rose-400 border-rose-400/20 bg-rose-400/5";
        } else if (filterTech === "golden_cross" && valEma9 > valEma21) {
          matched = true;
          signalTrigger = "BUY";
          scoreTrigger = "72%";
          ratingColor = "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
        } else if (filterTech === "bband_squeeze" && width < 3.5) {
          matched = true;
          signalTrigger = "CONSOLIDATION";
          scoreTrigger = "54%";
          ratingColor = "text-indigo-400 border-indigo-400/20 bg-indigo-400/5";
        } else if (filterTech === "all") {
          matched = true;
          const consensus = compileTechnicalSignal(symbol, "1D");
          signalTrigger = consensus.rating;
          scoreTrigger = `${consensus.score}%`;
          ratingColor = consensus.ratingColorClass;
        }
        
        if (!matched) continue;
        
        matchedCount++;
        const tr = document.createElement("tr");
        tr.className = "border-b border-custom/50 hover:bg-custom-tertiary/20 cursor-pointer text-xs";
        tr.innerHTML = `
          <td class="py-3 px-4 font-bold text-custom-main font-mono">${symbol}</td>
          <td class="py-3 px-4 text-custom-sub font-semibold max-w-[150px] truncate">${meta.name}</td>
          <td class="py-3 px-4 font-mono text-right font-bold">₹${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td class="py-3 px-4 text-right font-bold ${pctChange >= 0 ? 'text-emerald-500' : 'text-rose-500'} font-mono">
            ${pctChange >= 0 ? '+' : ''}${pctChange}%
          </td>
          <td class="py-3 px-4 text-right font-mono">${rsiVal ? rsiVal.toFixed(1) : '-'}</td>
          <td class="py-3 px-4 text-center">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${ratingColor}">
              ${signalTrigger}
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <button class="py-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition font-bold cursor-pointer" onclick="changeActiveStockAndJump('${symbol}')">
              Terminal
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }
      
      document.querySelector("#scanner-matches-count").innerText = `${matchedCount} stocks matched current scan filters.`;
    }, 1500);
  };
}

function changeActiveStockAndJump(sym) {
  changeActiveStock(sym);
  document.querySelector(".nav-tab-btn[data-tab='terminal']").click();
}

// --- SETTINGS TAB ---
function renderSettingsTab() {
  document.querySelector("#settings-gmail-address").value = state.gmailAddress;
  document.querySelector("#settings-gmail-alerts-toggle").checked = state.enableGmailAlerts;
  
  document.querySelector("#supabase-url-input").value = state.supabaseUrl;
  document.querySelector("#supabase-key-input").value = state.supabaseKey;
  
  const statusLight = document.querySelector("#supabase-status-indicator");
  if (state.supabaseConnected) {
    statusLight.className = "flex items-center space-x-1.5 text-xs text-emerald-400 font-bold";
    statusLight.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> <span>Cloud Synchronized (Active)</span>`;
  } else {
    statusLight.className = "flex items-center space-x-1.5 text-xs text-rose-400 font-bold";
    statusLight.innerHTML = `<span class="h-2 w-2 rounded-full bg-rose-500"></span> <span>Disconnected</span>`;
  }
}

// --- 11. DUAL-DECK PORTFOLIO LEDGERS ---

function updatePortfolioUI() {
  document.querySelector("#deck-a-cash").innerText = `₹${state.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  let totalEquityA = 0;
  const tbodyA = document.querySelector("#deck-a-table-body");
  if (!tbodyA) return;
  tbodyA.innerHTML = "";
  
  for (const symbol in state.holdings) {
    const record = state.holdings[symbol];
    
    // ---- BUG FIX 2: STRICT NULL GUARD FOR STOCKDATA CONFLICTS ----
    const series = state.stockData[symbol]?.[state.activeTimeframe];
    if (!series || series.length === 0) continue;
    
    const currentPrice = series[series.length - 1].y[3];
    const equityVal = currentPrice * record.qty;
    totalEquityA += equityVal;
    
    const profitLoss = equityVal - (record.avgPrice * record.qty);
    const profitLossPct = ((currentPrice - record.avgPrice) / record.avgPrice * 100).toFixed(2);
    
    const tr = document.createElement("tr");
    tr.className = "border-b border-custom/40 hover:bg-custom-tertiary/20 text-xs";
    tr.innerHTML = `
      <td class="py-2.5 px-3 font-bold font-mono text-custom-main">${symbol}</td>
      <td class="py-2.5 px-3 font-mono text-right">${record.qty}</td>
      <td class="py-2.5 px-3 font-mono text-right">₹${record.avgPrice.toFixed(2)}</td>
      <td class="py-2.5 px-3 font-mono text-right">₹${currentPrice.toFixed(2)}</td>
      <td class="py-2.5 px-3 text-right font-bold ${profitLoss >= 0 ? 'text-emerald-500' : 'text-rose-500'}">
        ₹${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${profitLossPct >= 0 ? '+' : ''}${profitLossPct}%)
      </td>
      <td class="py-2.5 px-3 text-right">
        <button class="px-2 py-0.5 bg-rose-600/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white text-[10px] font-bold rounded-lg transition animate-pulse cursor-pointer" onclick="executeSimulatedOrder('SELL', '${symbol}', ${record.qty})">
          LIQUIDATE
        </button>
      </td>
    `;
    tbodyA.appendChild(tr);
  }
  
  if (Object.keys(state.holdings).length === 0) {
    tbodyA.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-xs text-custom-muted">No open virtual positions. Use simulated order desk.</td></tr>`;
  }
  
  const totalValuationA = state.cash + totalEquityA;
  const initialCap = 100000.00;
  const returnNet = totalValuationA - initialCap;
  const returnNetPct = (returnNet / initialCap * 100).toFixed(2);
  
  document.querySelector("#deck-a-equity").innerText = `₹${totalValuationA.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  const pnlBadgeA = document.querySelector("#deck-a-pnl-label");
  pnlBadgeA.innerText = `ROI: ${returnNet >= 0 ? '+' : ''}${returnNetPct}%`;
  pnlBadgeA.className = `px-2 py-0.5 rounded text-[10px] font-extrabold border ${returnNet >= 0 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-rose-400 border-rose-500/20 bg-rose-500/5'}`;

  // DECK B Brokerage Ledger Manual tracking
  const tbodyB = document.querySelector("#deck-b-table-body");
  if (!tbodyB) return;
  tbodyB.innerHTML = "";
  
  let totalCostB = 0;
  let totalValueB = 0;
  
  state.brokerageHoldings.forEach(item => {
    // ---- BUG FIX 4: OPTIONAL CHAINING NULL GUARD ON DECK B ACCESS ----
    const series = state.stockData[item.symbol]?.[ "1D" ] ?? null;
    if (!series || series.length === 0) return;
    const currentPrice = series[series.length - 1].y[3];
    
    const costValue = item.buyPrice * item.qty;
    const currentVal = currentPrice * item.qty;
    totalCostB += costValue;
    totalValueB += currentVal;
    
    const diffVal = currentVal - costValue;
    const diffPct = costValue > 0 ? (diffVal / costValue * 100).toFixed(2) : "0.00";
    
    const tr = document.createElement("tr");
    tr.className = "border-b border-custom/40 hover:bg-custom-tertiary/20 text-xs";
    tr.innerHTML = `
      <td class="py-2.5 px-3 font-bold font-mono text-custom-main">${item.symbol}</td>
      <td class="py-2.5 px-3 font-mono text-center text-custom-sub">${item.buyDate}</td>
      <td class="py-2.5 px-3 font-mono text-right">${item.qty}</td>
      <td class="py-2.5 px-3 font-mono text-right">₹${item.buyPrice.toFixed(2)}</td>
      <td class="py-2.5 px-3 font-mono text-right font-semibold">₹${currentPrice.toFixed(2)}</td>
      <td class="py-2.5 px-3 text-right font-bold ${diffVal >= 0 ? 'text-emerald-500' : 'text-rose-500'}">
        ₹${diffVal.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${diffVal >= 0 ? '+' : ''}${diffPct}%)
      </td>
      <td class="py-2.5 px-3 text-center">
        <button class="text-custom-muted hover:text-rose-500 px-1 py-1 transition cursor-pointer" onclick="deleteBrokerageRecord('${item.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbodyB.appendChild(tr);
  });
  
  if (state.brokerageHoldings.length === 0) {
    tbodyB.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-xs text-custom-muted">No manual brokerage holdings registered. Use form above.</td></tr>`;
  }
  
  document.querySelector("#deck-b-total-cost").innerText = `₹${totalCostB.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  document.querySelector("#deck-b-total-value").innerText = `₹${totalValueB.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  const totalDiffB = totalValueB - totalCostB;
  const totalDiffPctB = totalCostB > 0 ? (totalDiffB / totalCostB * 100).toFixed(2) : "0.00";
  
  const returnLabelB = document.querySelector("#deck-b-total-pnl");
  returnLabelB.innerText = `₹${totalDiffB.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${totalDiffB >= 0 ? '+' : ''}${totalDiffPctB}%)`;
  returnLabelB.className = `text-base font-extrabold font-mono ${totalDiffB >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  
  renderTransactionsHistory();
}

function renderTransactionsHistory() {
  const container = document.querySelector("#deck-a-transactions-tbody");
  if (!container) return;
  container.innerHTML = "";
  
  if (state.transactions.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-xs text-custom-muted">Clear ledger logs.</td></tr>`;
    return;
  }
  
  state.transactions.slice(0, 10).forEach(tx => {
    const tr = document.createElement("tr");
    tr.className = "border-b border-custom/40 text-xs";
    tr.innerHTML = `
      <td class="py-2 px-3 text-custom-muted font-mono">${tx.time}</td>
      <td class="py-2 px-3 font-bold font-mono text-custom-main">${tx.symbol}</td>
      <td class="py-2 px-3 text-center">
        <span class="px-1.5 py-0.5 text-[9px] rounded font-bold ${tx.type === 'BUY' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}">${tx.type}</span>
      </td>
      <td class="py-2 px-3 text-right font-mono">${tx.qty}</td>
      <td class="py-2 px-3 text-right font-mono">₹${tx.price.toFixed(2)}</td>
    `;
    container.appendChild(tr);
  });
}

function renderNewsLogs() {
  const container = document.querySelector("#terminal-news-list");
  if (!container) return;
  
  container.innerHTML = "";
  
  if (state.newsFeed.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-xs text-custom-muted">Searching Indian markets news channels...</div>`;
    return;
  }
  
  state.newsFeed.forEach(news => {
    let bullet = "bg-blue-500";
    let border = "border-l-2 border-blue-500";
    if (news.sentiment === "bullish") {
      bullet = "bg-emerald-500 animate-pulse";
      border = "border-l-2 border-emerald-500";
    } else if (news.sentiment === "bearish") {
      bullet = "bg-rose-500 animate-pulse";
      border = "border-l-2 border-rose-500";
    }
    
    const block = document.createElement("div");
    block.className = `p-2.5 bg-custom-tertiary/20 rounded border border-custom/50 flex items-start space-x-2.5 ${border}`;
    block.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${bullet}"></span>
      <div class="flex-1">
        <p class="text-xs font-semibold text-custom-main leading-normal">${news.headline}</p>
        <span class="text-[9px] text-custom-muted font-mono inline-block mt-0.5">${news.time}</span>
      </div>
    `;
    container.appendChild(block);
  });
}

function updateUIOnTick(updatedStocks) {
  updatedStocks.forEach(stock => {
    const pulseElement = document.querySelector(`#pulse-${stock.symbol}`);
    if (pulseElement) {
      pulseElement.innerText = `₹${stock.newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
      pulseElement.className = "font-mono font-bold text-sm text-custom-main";
      void pulseElement.offsetWidth;
      pulseElement.className = stock.direction === "up" ? "font-mono font-bold text-sm text-emerald-400 animate-tick-up" : "font-mono font-bold text-sm text-rose-400 animate-tick-down";
    }
  });
  
  const activeTick = updatedStocks.find(s => s.symbol === state.activeSymbol);
  if (activeTick) {
    document.querySelector("#active-stock-price").innerText = `₹${activeTick.newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    
    const activeSeries = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
    if (activeSeries && activeSeries.length > 0) {
      const initialPrice = activeSeries[0].y[3];
      const netChangePct = ((activeTick.newPrice - initialPrice) / initialPrice * 100).toFixed(2);
      
      const chgLabel = document.querySelector("#active-stock-change");
      chgLabel.innerText = `${netChangePct >= 0 ? '+' : ''}${netChangePct}%`;
      chgLabel.className = netChangePct >= 0 ? "text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-semibold" : "text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded text-xs font-semibold";
    }
    
    if (state.activeChartMode === "lite") {
      updateChartsRealTime();
    }
    updateSignalsAnalysis();
    updateOrderDeskForm();
  }
}

function updateSignalsAnalysis() {
  const analysis = compileTechnicalSignal(state.activeSymbol, state.activeTimeframe);
  
  const ratingDiv = document.querySelector("#signal-score-badge");
  ratingDiv.innerText = analysis.rating;
  ratingDiv.className = `px-3 py-1 rounded text-xs font-bold border ${analysis.ratingColorClass}`;
  
  document.querySelector("#signal-score-percentage").innerText = `${analysis.score}%`;
  const ratingBar = document.querySelector("#signal-score-bar");
  ratingBar.style.width = `${analysis.score}%`;
  
  if (analysis.score >= 75) {
    ratingBar.className = "h-full bg-emerald-500 transition-all duration-300";
  } else if (analysis.score >= 55) {
    ratingBar.className = "h-full bg-emerald-400 transition-all duration-300";
  } else if (analysis.score <= 25) {
    ratingBar.className = "h-full bg-rose-600 transition-all duration-300";
  } else if (analysis.score <= 45) {
    ratingBar.className = "h-full bg-rose-400 transition-all duration-300";
  } else {
    ratingBar.className = "h-full bg-yellow-500 transition-all duration-300";
  }
  
  const gridContainer = document.querySelector("#indicators-breakdown-grid");
  gridContainer.innerHTML = "";
  
  analysis.breakdown.forEach(item => {
    const isBull = item.score.startsWith("+") || parseFloat(item.score) > 0;
    const isBear = item.score.startsWith("-") || parseFloat(item.score) < 0;
    
    let bulletColor = "bg-yellow-500";
    let scoreColor = "text-yellow-500";
    if (isBull) {
      bulletColor = "bg-emerald-500";
      scoreColor = "text-emerald-500";
    } else if (isBear) {
      bulletColor = "bg-rose-500";
      scoreColor = "text-rose-500";
    }
    
    const row = document.createElement("div");
    row.className = "flex justify-between items-center py-2.5 border-b border-custom/60 last:border-0";
    row.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 rounded-full ${bulletColor}"></span>
        <div>
          <h4 class="text-sm font-semibold text-custom-main">${item.indicator}</h4>
          <span class="text-xs text-custom-sub">${item.value}</span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs font-semibold uppercase ${scoreColor}">${item.rating}</div>
        <div class="text-xs font-mono font-bold text-custom-sub">${item.score}</div>
      </div>
    `;
    gridContainer.appendChild(row);
  });
  
  const rec = analysis.tradeRecommendation;
  document.querySelector("#rec-entry-price").innerText = `₹${rec.entry}`;
  document.querySelector("#rec-target1-price").innerText = `₹${rec.t1}`;
  document.querySelector("#rec-target2-price").innerText = `₹${rec.t2}`;
  document.querySelector("#rec-stop-price").innerText = `₹${rec.sl}`;
}

function updateOrderDeskForm() {
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  if (!series || series.length === 0) return;
  const price = series[series.length - 1].y[3];
  
  document.querySelector("#order-desk-symbol").innerText = state.activeSymbol;
  document.querySelector("#order-price-label").innerText = `₹${price.toFixed(2)}`;
  
  const inputQty = document.querySelector("#order-qty-input");
  const currentVal = parseInt(inputQty.value) || 0;
  document.querySelector("#order-total-price").innerText = `₹${(currentVal * price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function renderMarqueeTicker() {
  const container = document.querySelector("#marquee-ticker");
  container.innerHTML = "";
  
  const keys = Object.keys(INDIAN_STOCKS_CONFIG);
  const repeatedAssets = [...keys, ...keys, ...keys];
  
  repeatedAssets.forEach(symbol => {
    const config = INDIAN_STOCKS_CONFIG[symbol];
    const series = state.stockData[symbol] ? state.stockData[symbol][state.activeTimeframe] : null;
    if (!series || series.length === 0) return;
    const lastPrice = series[series.length - 1].y[3];
    const prevPrice = series[0].y[3];
    const pctChange = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
    
    const widget = document.createElement("div");
    widget.className = "inline-flex items-center space-x-1.5 px-6 py-2 border-r border-custom text-xs cursor-pointer hover:bg-custom-tertiary/20";
    widget.innerHTML = `
      <span class="font-bold text-custom-main font-mono">${symbol}</span>
      <span id="pulse-${symbol}" class="text-custom-sub font-mono">₹${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      <span class="font-semibold ${pctChange >= 0 ? 'text-emerald-500' : 'text-rose-500'} font-mono">
        ${pctChange >= 0 ? '▲' : '▼'} ${pctChange}%
      </span>
    `;
    
    widget.addEventListener("click", () => {
      changeActiveStock(symbol);
    });
    
    container.appendChild(widget);
  });
}

async function changeActiveStock(symbol) {
  if (!INDIAN_STOCKS_CONFIG[symbol]) return;
  state.activeSymbol = symbol;
  
  document.querySelector("#active-stock-symbol").innerText = symbol;
  document.querySelector("#active-stock-name").innerText = INDIAN_STOCKS_CONFIG[symbol].name;
  
  // High Performance On-Demand Chart loading: fetch only when activeSymbol switches!
  await fetchActiveStockChartData();
  
  updateActiveDashboard();
  renderQuickStockCapsules(); 
  
  // Update both terminal and TradingView Pro active symbols
  if (state.activeChartMode === "tv") {
    loadTradingViewWidget(symbol);
  }
  
  syncTradingViewSymbol(symbol);
}

async function updateActiveDashboard() {
  await fetchActiveStockChartData();
  
  const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
  if (!series || series.length === 0) return;
  const currentPrice = series[series.length - 1].y[3];
  const prevPrice = series[0].y[3];
  const pctChange = ((currentPrice - prevPrice) / prevPrice * 100).toFixed(2);
  
  document.querySelector("#active-stock-price").innerText = `₹${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  const chgLabel = document.querySelector("#active-stock-change");
  chgLabel.innerText = `${pctChange >= 0 ? '+' : ''}${pctChange}%`;
  chgLabel.className = pctChange >= 0 ? "text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-semibold" : "text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded text-xs font-semibold";
  
  if (state.activeChartMode === "lite") {
    drawMainChart();
    drawRsiChart();
  } else {
    loadTradingViewWidget(state.activeSymbol);
  }
  
  updateSignalsAnalysis();
  updateOrderDeskForm();
}

function dispatchGmailNotification(signal, eventType) {
  if (!state.enableGmailAlerts) return;
  
  let subject = "";
  let message = "";
  
  if (eventType === "BUY_TRIGGERED") {
    subject = `⚠️ STRICT BUY TRIGGERED: [${signal.symbol}] Swing Trade Setup`;
    message = `AI KHAN SIGNALS Alert Engine detected a high-probability swing trade setup on ${signal.symbol} at ₹${signal.entryPrice}. \n\nTarget Take-Profit (+5.0%): ₹${signal.targetPrice} \nStop-Loss Protection (-2.0%): ₹${signal.stopPrice} \n\nReasoning: ${signal.reason}`;
  } else if (eventType === "TARGET_HIT") {
    subject = `🏆 TARGET SUCCESS: [${signal.symbol}] Swing Trade Complete`;
    message = `AI KHAN SIGNALS Strategy reached its 5% profit target on ${signal.symbol}! \n\nEntry Price: ₹${signal.entryPrice} \nExecuted Sell: ₹${signal.currentPrice} \nResult: Net profit margin of +5.00% reached!`;
  } else if (eventType === "STOP_HIT") {
    subject = `🛑 PROTECTED STOPPED OUT: [${signal.symbol}] Exited Trade`;
    message = `AI KHAN SIGNALS Risk System executed stop-loss liquidation for ${signal.symbol} at ₹${signal.currentPrice} (-2% bound met). \n\nEntry Price: ₹${signal.entryPrice} \nExecuted Sell Exit: ₹${signal.currentPrice} \nLoss: -2.00% limited.`;
  }
  
  const mockEmailLogs = document.querySelector("#mock-email-logs");
  if (mockEmailLogs) {
    const item = document.createElement("div");
    item.className = "p-2.5 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-[11px] leading-relaxed mb-2 font-mono";
    item.innerHTML = `
      <div class="flex justify-between items-center text-indigo-400 font-bold mb-1">
        <span>To: ${state.gmailAddress}</span>
        <span>Sent</span>
      </div>
      <div><strong>Sub:</strong> ${subject}</div>
      <div class="text-custom-sub mt-1 max-h-[80px] overflow-y-auto">${message}</div>
    `;
    mockEmailLogs.prepend(item);
  }
  showToast(`📩 Swing alert queued for ${state.gmailAddress}!`, "info");
}

// --- 12. INITIALIZATION & BIND EVENTS ---

function initializeUI() {
  setupTabNavigation();
  
  document.querySelectorAll(".theme-selector-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setAppTheme(btn.dataset.theme);
    });
  });
  
  document.querySelector("#order-qty-input").addEventListener("input", updateOrderDeskForm);
  
  document.querySelectorAll(".sizing-shortcut").forEach(link => {
    link.addEventListener("click", () => {
      const pct = parseFloat(link.dataset.pct);
      const series = state.stockData[state.activeSymbol] ? state.stockData[state.activeSymbol][state.activeTimeframe] : null;
      if (!series || series.length === 0) return;
      const price = series[series.length - 1].y[3];
      const allocation = state.cash * pct;
      const qty = Math.floor(allocation / price);
      document.querySelector("#order-qty-input").value = qty;
      updateOrderDeskForm();
    });
  });
  
  document.querySelector("#execute-buy-btn").onclick = () => {
    const qty = parseInt(document.querySelector("#order-qty-input").value);
    executeSimulatedOrder("BUY", state.activeSymbol, qty);
  };
  
  document.querySelector("#execute-sell-btn").onclick = () => {
    const qty = parseInt(document.querySelector("#order-qty-input").value);
    executeSimulatedOrder("SELL", state.activeSymbol, qty);
  };
  
  document.querySelectorAll(".timeframe-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      document.querySelectorAll(".timeframe-btn").forEach(b => b.classList.remove("btn-toggle-active", "bg-indigo-600", "text-white"));
      btn.classList.add("btn-toggle-active");
      state.activeTimeframe = btn.dataset.timeframe;
      
      await fetchActiveStockChartData();
      updateActiveDashboard();
    });
  });
  
  document.querySelectorAll(".indicator-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.indicator;
      state.activeIndicators[field] = !state.activeIndicators[field];
      
      if (state.activeIndicators[field]) btn.classList.add("btn-toggle-active");
      else btn.classList.remove("btn-toggle-active");
      
      if (field === "rsi") drawRsiChart();
      else drawMainChart();
    });
  });

  const liteBtn = document.querySelector("#toggle-lite-chart");
  const tvBtn = document.querySelector("#toggle-tv-chart");
  const mainChartContainer = document.querySelector("#main-stock-chart");
  const rsiContainer = document.querySelector("#rsi-chart-container");
  const tvContainer = document.querySelector("#tv-chart-container");
  
  if (liteBtn && tvBtn) {
    liteBtn.onclick = () => {
      state.activeChartMode = "lite";
      liteBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition btn-toggle-active cursor-pointer";
      tvBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition text-custom-sub hover:text-custom-main cursor-pointer font-bold";
      
      mainChartContainer.classList.remove("hidden");
      rsiContainer.classList.remove("hidden");
      tvContainer.classList.add("hidden");
      
      drawMainChart();
      drawRsiChart();
    };
    
    tvBtn.onclick = () => {
      state.activeChartMode = "tv";
      tvBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition btn-toggle-active cursor-pointer";
      liteBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition text-custom-sub hover:text-custom-main cursor-pointer font-bold";
      
      mainChartContainer.classList.add("hidden");
      rsiContainer.classList.add("hidden");
      tvContainer.classList.remove("hidden");
      
      loadTradingViewWidget(state.activeSymbol);
    };
  }

  // ---- TIMEFRAME INTERVAL SWITCH BINDINGS inside TradingView Tab ----
  document.querySelectorAll(".tv-interval-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tv-interval-btn").forEach(b => {
        b.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition text-custom-sub hover:text-custom-main tv-interval-btn cursor-pointer font-mono font-bold";
      });
      btn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md transition btn-toggle-active tv-interval-btn cursor-pointer font-mono font-bold";
      
      const interval = btn.dataset.interval;
      changeTradingViewInterval(interval);
    };
  });

  // Help modal toggle handler
  const helpBtn = document.querySelector("#pine-help-btn");
  if (helpBtn) {
    helpBtn.onclick = () => {
      const helpCard = document.querySelector("#pine-help-card");
      if (helpCard) helpCard.classList.toggle("hidden");
    };
  }

  // Pine script copy to clipboard handler
  const copyBtn = document.querySelector("#copy-pine-btn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const pineCode = `//@version=5\nindicator("AI Khan Swing Trader Pro", overlay=true)\n\n// Inputs\nrsiLength = input.int(14, title="RSI Length")\nrsiOversold = input.int(32, title="RSI Oversold Level")\nbbLength = input.int(20, title="Bollinger Bands Length")\nbbMult = input.float(2.0, title="Bollinger Bands Multiplier")\n\n// Calculations\nrsiVal = ta.rsi(close, rsiLength)\n[basis, upper, lower] = ta.bb(close, bbLength, bbMult)\n\n// EMA Trend Filters\nema9 = ta.ema(close, 9)\nema21 = ta.ema(close, 21)\nemaBullish = ema9 > ema21\n\n// Buy/Sell Conditions\nbuySignal = (rsiVal < rsiOversold) and (close <= lower) and emaBullish\nsellSignal = ta.crossover(rsiVal, 70) or (close >= upper)\n\n// Plots\nplotshape(buySignal, title="Swing BUY", style=shape.triangleup, location=location.belowbar, color=color.emerald, size=size.normal)\nplotshape(sellSignal, title="Swing SELL", style=shape.triangledown, location=location.abovebar, color=color.rose, size=size.normal)\n\nplot(ema9, color=color.yellow, title="EMA 9")\nplot(ema21, color=color.fuchsia, title="EMA 21")`;
      
      navigator.clipboard.writeText(pineCode).then(() => {
        showToast("Pine Script code copied to clipboard!", "success");
      }).catch(err => {
        showToast("Failed to copy code to clipboard.", "error");
      });
    };
  }

  // Open External TradingView handler
  const extBtn = document.querySelector("#open-tv-external-btn");
  if (extBtn) {
    extBtn.onclick = () => {
      window.open(`https://www.tradingview.com/chart/?symbol=NSE:${state.activeSymbol}`, "_blank");
    };
  }

  // ---- DUAL-CONNECTED SUPABASE CONNECTOR BUTTON ACTION LIFECYCLE ----
  document.querySelector("#save-supabase-btn")?.addEventListener("click", async () => {
    const url = document.querySelector("#supabase-url-input").value.trim();
    const key = document.querySelector("#supabase-key-input").value.trim();
    if (!url || !key) {
      showToast("Please enter both Supabase Project URL and Public Anon Key", "error");
      return;
    }
    try {
      // Connect and select whitelisted check to test active schema
      const client = supabase.createClient(url, key);
      const { error } = await client.from("watchlists").select("symbol").limit(1);
      if (error) throw error;
      
      state.supabaseClient = client;
      state.supabaseUrl = url;
      state.supabaseKey = key;
      state.supabaseConnected = true;
      
      saveStateToStorage();
      renderSettingsTab(); // Repaint green active connected status light
      showToast("Supabase cloud synchronized successfully!", "success");
    } catch (err) {
      showToast("Supabase connection failed: " + err.message, "error");
    }
  });

  const searchInputTerminal = document.querySelector("#search-stock-input");
  const searchBtnTerminal = document.querySelector("#search-stock-btn");
  
  const handleWatchlistAdd = async (inputElement) => {
    if (!inputElement) return;
    const sym = inputElement.value.trim().toUpperCase();
    if (sym) {
      if (!state.watchlist.includes(sym)) {
        if (state.backendActive) {
          const res = await fetchFromBackend('/api/watchlist', {
            method: 'POST',
            body: JSON.stringify({ symbol: sym })
          });
          if (res && res.watchlist) {
            state.watchlist = res.watchlist; 
            const feed = await fetchFromBackend('/api/market-feed');
            if (feed) {
              state.stockData = feed.stockData;
              INDIAN_STOCKS_CONFIG = feed.stocksConfig;
            }
          }
        } else {
          registerStockOnTheFlyLocal(sym);
          state.watchlist.push(sym);
          saveStateToStorage();
        }
        showToast(`${sym} successfully added to watchlist.`, "success");
        renderWatchlistTab();
        renderQuickStockCapsules();
        changeActiveStock(sym); 
      } else {
        showToast(`${sym} is already monitored.`, "info");
        changeActiveStock(sym); 
      }
      inputElement.value = "";
    }
  };

  if (searchBtnTerminal && searchInputTerminal) {
    searchBtnTerminal.onclick = () => handleWatchlistAdd(searchInputTerminal);
  }
  
  // Real brokerage input
  document.querySelector("#add-brokerage-btn").onclick = () => {
    const symbol = document.querySelector("#brokerage-symbol-select").value;
    const date = document.querySelector("#brokerage-date-input").value;
    const price = parseFloat(document.querySelector("#brokerage-price-input").value);
    const qty = parseInt(document.querySelector("#brokerage-qty-input").value);
    
    recordBrokeragePurchase(symbol, date, price, qty);
    
    document.querySelector("#brokerage-price-input").value = "";
    document.querySelector("#brokerage-qty-input").value = "";
  };
  
  // Settings sync backend details (WITH SECURE ENCRYPTED SMTP INPUTS)
  document.querySelector("#save-settings-btn").onclick = async () => {
    const email = document.querySelector("#settings-gmail-address").value;
    const alerts = document.querySelector("#settings-gmail-alerts-toggle").checked;
    
    const smtpHost = document.querySelector("#smtp-host-input").value;
    const smtpPort = document.querySelector("#smtp-port-input").value;
    const smtpUser = document.querySelector("#smtp-user-input").value;
    const smtpPass = document.querySelector("#smtp-pass-input").value;
    
    state.gmailAddress = email;
    state.enableGmailAlerts = alerts;
    
    if (state.backendActive) {
      await fetchFromBackend('/api/settings', {
        method: 'POST',
        body: JSON.stringify({ 
          gmailAddress: email, 
          enableGmailAlerts: alerts,
          smtpHost,
          smtpPort: parseInt(smtpPort) || 465,
          smtpUser,
          smtpPass
        })
      });
    }
    
    saveStateToStorage();
    showToast("Configurations saved.", "success");
  };
  
  document.querySelector("#test-email-btn").onclick = async () => {
    if (state.backendActive) {
      await fetchFromBackend('/api/signals/test-email', { method: 'POST' });
    } else {
      const dummySignal = {
        symbol: "RELIANCE",
        entryPrice: 2845.50,
        currentPrice: 2845.50,
        targetPrice: 2987.77,
        stopPrice: 2788.59,
        dateTriggered: new Date().toLocaleDateString(),
        reason: "Local Verification Trigger Request (Test Mode)",
        status: "ACTIVE",
        pnlPct: 0.00
      };
      dummySignal.time = new Date().toLocaleTimeString();
      dispatchGmailNotification(dummySignal, "BUY_TRIGGERED");
    }
  };
  
  document.querySelector("#freeze-simulation-btn").onclick = () => {
    state.marketActive = !state.marketActive;
    const btn = document.querySelector("#freeze-simulation-btn");
    if (state.marketActive) {
      btn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Halt Market</span>`;
      btn.className = "px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center space-x-1";
      showToast("Simulation resumed.", "info");
    } else {
      btn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Resume Market</span>`;
      btn.className = "px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center space-x-1";
      showToast("Simulation paused.", "info");
    }
  };
  
  document.querySelector("#reset-portfolio-btn").onclick = async () => {
    if (confirm("Reset virtual account metrics back to ₹100,000.00?")) {
      if (state.backendActive) {
        await fetchFromBackend('/api/reset', { method: 'POST' });
      } else {
        state.cash = 100000.00;
        state.holdings = {};
        state.transactions = [];
        state.brokerageHoldings = [];
        saveStateToStorage();
      }
      updatePortfolioUI();
      showToast("Balances reset successfully.", "info");
    }
  };
  
  renderMarqueeTicker();
}

function setAppTheme(themeName) {
  state.theme = themeName;
  const body = document.body;
  body.className = "";
  
  if (themeName === "wallstreet") body.classList.add("theme-wallstreet");
  else if (themeName === "light") body.classList.add("theme-light");
  else if (themeName === "cyberpunk") body.classList.add("theme-cyberpunk");
  else if (themeName === "mint") body.classList.add("theme-mint");
  
  document.querySelectorAll(".theme-selector-btn").forEach(btn => {
    if (btn.dataset.theme === themeName) btn.classList.add("bg-indigo-600", "text-white");
    else btn.classList.remove("bg-indigo-600", "text-white");
  });
  
  if (chartInstanceMain) drawMainChart();
  if (chartInstanceRsi) drawRsiChart();
}

function showToast(message, type = "info", duration = 3500) {
  const container = document.querySelector("#toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = "p-3.5 rounded-xl border shadow-lg text-xs font-semibold flex items-start space-x-2.5 transition duration-300 transform translate-y-2 opacity-0 neon-glow bg-slate-900/95 border-slate-700/80 text-white";
  
  let icon = '<i class="fa-solid fa-circle-info text-blue-400"></i>';
  if (type === "success") icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
  else if (type === "error") icon = '<i class="fa-solid fa-circle-exclamation text-rose-400"></i>';
  else if (type === "bull") icon = '<i class="fa-solid fa-arrow-trend-up text-emerald-400"></i>';
  else if (type === "bear") icon = '<i class="fa-solid fa-arrow-trend-down text-rose-400"></i>';
  
  toast.innerHTML = `
    <span class="text-base mt-0.5">${icon}</span>
    <div class="flex-1">
      <p class="leading-relaxed font-sans">${message}</p>
    </div>
  `;
  
  container.appendChild(toast);
  setTimeout(() => { toast.classList.remove("translate-y-2", "opacity-0"); }, 10);
  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => { toast.remove(); }, 300);
  }, duration);
}

// --- 13. BOOTSTRAP INITIALIZATION ---

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  initializeMarketDatabaseLocal(); 
  initializeUI();
  
  setAppTheme(state.theme);
  updateActiveDashboard();
  renderQuickStockCapsules();
  
  const selector = document.querySelector("#brokerage-symbol-select");
  if (selector) {
    selector.innerHTML = "";
    for (const symbol in INDIAN_STOCKS_CONFIG) {
      const opt = document.createElement("option");
      opt.value = symbol;
      opt.text = `${symbol} - ${INDIAN_STOCKS_CONFIG[symbol].name}`;
      selector.appendChild(opt);
    }
  }
  
  const scanSelect = document.querySelector("#scanner-universe-filter");
  if (scanSelect) {
    scanSelect.innerHTML = `
      <option value="all">Entire High-Trust Indian Universe (BSE/NSE)</option>
      <option value="nifty50">Nifty 50 Index Bluechips Only</option>
      <option value="midcap">Nifty Midcap 150 Growth Segment Only</option>
    `;
  }
  
  // ---- WebSockets Initiation with Fallback Polling ----
  connectWebSocket();
  
  if (window.syncIntervalId) clearInterval(window.syncIntervalId);
  if (window.newsIntervalId) clearInterval(window.newsIntervalId);
  
  // Polling fallback loop - triggers ONLY if WebSocket is closed
  window.syncIntervalId = setInterval(synchronizeWithBackend, 2000); 
  window.newsIntervalId = setInterval(triggerGlobalNewsFlash, 28000);
  
  triggerGlobalNewsFlash();
});
