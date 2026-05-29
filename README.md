# 📈 AI KHAN SIGNALS | Advanced NSE/BSE Swing Signals & Portfolio Ledger

Welcome to **AI KHAN SIGNALS**, a highly sophisticated, professional Indian Share Market (NSE & BSE) Swing Trading Terminal and Dual Portfolio Ledger.

Designed specifically for **Swing Traders**, this client-side Single-Page Application (SPA) features mathematically precise indicators, strict high-trust signal filtering aiming for **5% profit targets**, active virtual paper trading accounts, manual brokerage sync ledgers (to safely track real investments alongside simulations), real-time macro volatility shock events, and **Supabase cloud-sync connectors**.

---

## 🌟 Core Features

### 1. 🇮🇳 High-Trust Indian Stock Universe (BSE & NSE)
*   Loaded with **30+ highly recognizable, liquid blue-chip and midcap stocks** (e.g. RELIANCE, TCS, INFY, HDFCBANK, SBIN, ZOMATO, HAL, BEL, DIXON).
*   *Manipulative penny stocks and untrustworthy small companies are strictly omitted* to keep evaluations high-quality and reliable.

### 2. 🎯 Selective 5% Swing Signal Strategy
*   Generates **vetted, ultra-exclusive swing signals** based on high-probability factors: extreme Daily RSI oversold conditions (<32) + lower Bollinger Band breaches + bullish news catalyst shocks.
*   Strict parameters: **Profit Target at +5.0%** and **Stop Loss at -2.0%** to lock in returns with tight risk bounds.
*   **📩 Gmail Notification Integrator**: Enter your email inside settings, and the system automatically formats and pushes transactional trade updates (triggers, wins, stops) with a simulated delivery logging screen.

### 3. 🔍 Algorithmic Multi-Factor Scanner
*   Filter through **Nifty 50 Index**, **Nifty Midcap 150 Segment**, or the entire high-trust Indian Stock database.
*   Execute immediate scans matching technical indicators: Daily RSI oversold, Daily RSI overbought, EMA 9/21 Golden Cross, or Bollinger Band consolidations.
*   Fires a beautiful scanning loading animation with custom scanning lasers.

### 4. 💼 Double-Deck Portfolio Ledger
*   **Deck A: Live Simulated Account**: Test strategies by buying and selling shares at live ticking market rates with custom cash allocation shortcuts.
*   **Deck B: Real Brokerage Ledger**: Safely log stocks you *already bought in your actual brokerage accounts* (e.g., Zerodha, Groww). Input fields: Symbol, Specific Purchase Date (calendar selector), Buy Price, and Quantity. Automatically calculates live valuations, days held, and exact ROIs.

### 5. ⚙️ Terminal Settings & Premium Themes
*   Choose between **5 gorgeous visual workspaces**:
    1.  🌌 **Slate Dark** (Obsidian dark developer mode)
    2.  🏛️ **Wall Street Classic** (Terminal navy blue mode)
    3.  ⚡ **Cyberpunk Neon** (Fuchsia and glowing cyan matrix mode)
    4.  🍃 **Mint Emerald** (Glowing deep mint mode)
    5.  ☀️ **Pro Light** (Clean contrast, light professional mode)
*   **Supabase Database Cloud Connector**: Link your database URL and Anon key to synchronize watchlists and manual brokerage holdings.

---

## ⚙️ Project File Map
*   `index.html`: Holds the responsive grid tab structures, panels, search bars, calendars, and CDNs (Tailwind CSS, FontAwesome, ApexCharts, Supabase).
*   `styles.css`: Dictates custom variables for all 5 workspaces, pulse highlights, scanner lasers, scrollbars, and ticker marquees.
*   `app.js`: Coordinates the mathematical equations (EMA, SMA, RSI, Bollinger Bands), order registries, Gmail warnings, news volatility generators, and cloud syncing.

---

## 🔒 Setup Supabase Table Structures

To persist your watchlists and brokerage ledger holdings in the cloud, open your **Supabase SQL Editor** and execute:

```sql
-- 1. Custom Watchlists Table
create table watchlists (
  id uuid default gen_random_uuid() primary key,
  symbol text unique,
  created_at timestamp default now()
);

-- 2. Brokerage Holdings Table
create table brokerage_holdings (
  id text primary key,
  symbol text,
  buy_date text,
  buy_price numeric,
  qty int,
  created_at timestamp default now()
);

-- 3. Swing Signals Table
create table vetted_signals (
  id text primary key,
  symbol text,
  entry_price numeric,
  current_price numeric,
  target_price numeric,
  stop_price numeric,
  date_triggered text,
  status text,
  reason text,
  pnl_pct numeric,
  created_at timestamp default now()
);
```
Once linked inside settings, all user actions automatically synchronize to your database!
