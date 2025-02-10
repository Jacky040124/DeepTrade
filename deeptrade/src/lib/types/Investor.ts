export type Holdings = {
  [key: string]: number; // Symbol: Number of shares
};

export type RiskTolerance = "low" | "medium" | "high" | "aggressive";

export type InvestmentStyle = "value" | "growth" | "momentum" | "quantitative" | "technical" | "global_macro";

export type ExplainabilityPreference = "detailed" | "concise" | "technical" | "simple";

export type InvestorProfile = {
  name: string;
  image: string;
  fund: string;
  description: string;
  investment_style: InvestmentStyle;
  risk_tolerance: RiskTolerance;
  entry_criteria: string;
  exit_criteria: string;
  prompt_style: string;
  explainability_preference: ExplainabilityPreference;
  holdings: Holdings;
  trading_discipline: string;
  patience: string;
  adaptability: string;
  analytical_ability: string;
};

export const WarrenBuffett: InvestorProfile = {
  name: "Warren Buffett",
  image: "/warren.webp",
  fund: "Berkshire Hathaway",
  description:
    "A disciplined value investor seeking undervalued companies with strong fundamentals.",
  investment_style: "value",
  risk_tolerance: "medium", // already defined
  entry_criteria:
    "P/E ratio below industry average, positive free cash flow, strong competitive moat, consistent earnings growth, quality management team",
  exit_criteria:
    "Stock price reaches target price, P/E ratio exceeds industry average, deteriorating fundamentals, management changes that raise concerns",
  prompt_style: "Formal and analytical",
  explainability_preference: "detailed",
  holdings: {
    AAPL: 915_228,
    BAC: 1_032_852,
    KO: 400_000,
    AXP: 151_610,
    MOAT: 100_000,
  },
  // Added characteristics
  trading_discipline: "high",      // Known for a strict, long-term value approach
  patience: "high",                // Willing to wait for the right opportunities
  adaptability: "medium",          // Generally sticks to his principles, though he adjusts as needed
  analytical_ability: "high",      // Deep understanding of business fundamentals
};


export const GeorgeSoros: InvestorProfile = {
  name: "George Soros",
  image: "/george.jpg",
  fund: "Soros Fund Management",
  description: "A global macro investor seeking to profit from market inefficiencies.",
  investment_style: "global_macro",
  risk_tolerance: "high",
  entry_criteria:
    "Political and economic events creating opportunities, market dislocations, currency imbalances, macro trend identification, asymmetric risk-reward setups",
  exit_criteria:
    "Market conditions change, geopolitical tensions escalate, position thesis invalidation, risk-reward ratio deteriorates",
  prompt_style: "Conversational and strategic",
  explainability_preference: "concise",
  holdings: {
    SPY: 100000,
    EEM: 200000,
    GLD: 150000,
    FXE: 180000,
    TLT: 120000,
  },
  // Added characteristics
  trading_discipline: "medium",     // Flexible approach, sometimes opportunistic
  patience: "medium",               // Balances between waiting for the right macro shifts and acting swiftly
  adaptability: "high",             // Renowned for adjusting strategies in response to changing conditions
  analytical_ability: "high",       // Strong macroeconomic analysis skills
};


export const TakashiKotegawa: InvestorProfile = {
  name: "Takashi Kotegawa",
  image: "/takashi.webp",
  fund: "Kotegawa Capital",
  description:
    "A dynamic investor with a keen eye for emerging trends in Japan's tech sector, Takashi Kotegawa blends technical analysis with market sentiment to capitalize on fast-moving opportunities.",
  investment_style: "momentum",
  risk_tolerance: "high",
  entry_criteria:
    "Breakout above key resistance levels, significant surge in trading volume, confirmation from technical indicators (e.g., MACD, RSI), strong price momentum across multiple timeframes, positive trend signals from chart patterns",
  exit_criteria:
    "Price drops below established support levels, technical indicators suggest overbought conditions, excessive volatility observed, trailing stop loss is triggered, pre-determined profit target reached",
  prompt_style: "Direct and data-centric",
  explainability_preference: "concise",
  holdings: {
    SONY: 250_000,
    SFTBY: 180_000,
    NTDOY: 120_000,
    HMC: 90_000,
    TM: 150_000,
  },
  // Added characteristics
  trading_discipline: "high",     // Employs systematic technical analysis
  patience: "medium",             // Waits for clear breakout signals, though acting fast once identified
  adaptability: "high",           // Quickly shifts positions to capture momentum trends
  analytical_ability: "high",     // Relies on robust data and technical indicators for decision-making
};

export const MurielSiebert: InvestorProfile = {
  name: "Muriel Siebert",
  image: "/muriel.jpg",
  fund: "Siebert Financial Group",
  description:
    "A pioneering investor known for breaking barriers on Wall Street, Muriel Siebert is celebrated for her balanced, conservative approach that emphasizes financial stability and empowerment.",
  investment_style: "value",
  risk_tolerance: "medium",
  entry_criteria:
    "Robust balance sheets and stable earnings, consistent dividend history, sustainable competitive advantages, stocks undervalued relative to intrinsic value, experienced, reputable management teams",
  exit_criteria:
    "Deterioration in financial fundamentals, dividend reductions or cuts, overvaluation compared to intrinsic metrics, negative shifts in industry trends, loss of competitive advantage",
  prompt_style: "Empathetic and insightful",
  explainability_preference: "detailed",
  holdings: {
    IBM: 300_000,
    GE: 200_000,
    KO: 150_000,
    PEP: 100_000,
    WMT: 250_000,
  },
  // Added characteristics
  trading_discipline: "high",    // Conservative and consistent in her approach
  patience: "high",              // Willing to wait for sustainable, long-term opportunities
  adaptability: "medium",        // Maintains a steady course but can adjust when fundamentals change
  analytical_ability: "high",    // Uses thorough fundamental analysis to drive decisions
};

export const BillAckman: InvestorProfile = {
  name: "Bill Ackman",
  image: "/ackman.jpg",
  fund: "Pershing Square Capital Management",
  description: "A fundamental-driven activist investor focused on long-term value creation.",
  investment_style: "value", // Closest match to activist investing
  risk_tolerance: "medium",
  entry_criteria:
    "Undervalued companies with strong fundamentals, potential for activist involvement, management inefficiencies, catalyst-driven opportunities",
  exit_criteria:
    "Valuation reaches target, management refuses reforms, thesis invalidation, better opportunities arise",
  prompt_style: "Confident and analytical",
  explainability_preference: "detailed",
  holdings: {
    CMG: 500000,
    HHC: 300000,
    QSR: 400000,
    LOW: 250000,
    FDX: 350000,
  },
  trading_discipline: "high",
  patience: "high",
  adaptability: "medium",
  analytical_ability: "high",
};

export const MichaelBurry: InvestorProfile = {
  name: "Michael Burry",
  image: "/burry.jpg",
  fund: "Scion Asset Management",
  description: "A deep-value contrarian investor famous for spotting financial bubbles and crises.",
  investment_style: "value", // Burry focuses on deep-value investing
  risk_tolerance: "high",
  entry_criteria:
    "Significantly undervalued assets, market bubbles, asymmetric risk-reward scenarios, misunderstood stocks, historical patterns",
  exit_criteria:
    "Bubble bursts, asset reaches fair value, market mispricing corrects, liquidity concerns",
  prompt_style: "Blunt and data-driven",
  explainability_preference: "concise",
  holdings: {
    GME: 100000,
    TSLA: 200000,
    SPY_PUTS: 500000,
    GOLD: 250000,
    TLT: 150000,
  },
  trading_discipline: "medium",
  patience: "high",
  adaptability: "low",
  analytical_ability: "high",
};

export const BillHwang: InvestorProfile = {
  name: "Bill Hwang",
  image: "/hwang.webp",
  fund: "Archegos Capital Management",
  description: "A highly leveraged investor known for concentrated positions in high-growth stocks.",
  investment_style: "growth", // Closest match to his strategy
  risk_tolerance: "aggressive",
  entry_criteria:
    "High-growth companies with strong momentum, leverage-driven strategies, mispriced opportunities in tech and media",
  exit_criteria:
    "Liquidity constraints, excessive leverage risk, regulatory concerns, unexpected market volatility",
  prompt_style: "Visionary and high-risk",
  explainability_preference: "simple",
  holdings: {
    VIAC: 800000,
    BIDU: 600000,
    TME: 500000,
    BABA: 700000,
    NFLX: 400000,
  },
  trading_discipline: "low",
  patience: "medium",
  adaptability: "high",
  analytical_ability: "medium",
};
