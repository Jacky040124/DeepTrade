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
  entry_criteria: string[];
  exit_criteria: string[];
  prompt_style: string;
  explainability_preference: ExplainabilityPreference;
  holdings: Holdings;
};

export const WarrenBuffett: InvestorProfile = {
  name: "Warren Buffett",
  image: "/warren.webp",
  fund: "Berkshire Hathaway",
  description: "A disciplined value investor seeking undervalued companies with strong fundamentals.",
  investment_style: "value",
  risk_tolerance: "medium",
  entry_criteria: [
    "P/E ratio below industry average",
    "Positive free cash flow",
    "Strong competitive moat",
    "Consistent earnings growth",
    "Quality management team",
  ],
  exit_criteria: [
    "Stock price reaches target price",
    "P/E ratio exceeds industry average",
    "Deteriorating fundamentals",
    "Management changes that raise concerns",
  ],
  prompt_style: "Formal and analytical",
  explainability_preference: "detailed",
  holdings: {
    AAPL: 915_228_702,
    BAC: 1_032_852_006,
    KO: 400_000_000,
    AXP: 151_610_700,
    MOAT: 0,
  },
};

export const GeorgeSoros: InvestorProfile = {
  name: "George Soros",
  image: "/george.jpg",
  fund: "Soros Fund Management",
  description: "A global macro investor seeking to profit from market inefficiencies.",
  investment_style: "global_macro",
  risk_tolerance: "high",
  entry_criteria: [
    "Political and economic events creating opportunities",
    "Market dislocations",
    "Currency imbalances",
    "Macro trend identification",
    "Asymmetric risk-reward setups",
  ],
  exit_criteria: [
    "Market conditions change",
    "Geopolitical tensions escalate",
    "Position thesis invalidation",
    "Risk-reward ratio deteriorates",
  ],
  prompt_style: "Conversational and strategic",
  explainability_preference: "concise",
  holdings: {
    SPY: 100000,
    EEM: 200000,
    GLD: 150000,
    FXE: 180000,
    TLT: 120000,
  },
};

export const TakashiKotegawa: InvestorProfile = {
  name: "Takashi Kotegawa",
  image: "/takashi.webp",
  fund: "Kotegawa Capital",
  description:
    "A dynamic investor with a keen eye for emerging trends in Japan’s tech sector, Takashi Kotegawa blends technical analysis with market sentiment to capitalize on fast-moving opportunities.",
  investment_style: "momentum",
  risk_tolerance: "high",
  entry_criteria: [
    "Breakout above key resistance levels",
    "Significant surge in trading volume",
    "Confirmation from technical indicators (e.g., MACD, RSI)",
    "Strong price momentum across multiple timeframes",
    "Positive trend signals from chart patterns"
  ],
  exit_criteria: [
    "Price drops below established support levels",
    "Technical indicators suggest overbought conditions",
    "Excessive volatility observed",
    "Trailing stop loss is triggered",
    "Pre-determined profit target reached"
  ],
  prompt_style: "Direct and data-centric",
  explainability_preference: "concise",
  holdings: {
    "SONY": 250_000_000,
    "SFTBY": 180_000_000,
    "NTDOY": 120_000_000,
    "HMC": 90_000_000,
    "TM": 150_000_000
  }
};

export const MurielSiebert: InvestorProfile = {
  name: "Muriel Siebert",
  image: "/muriel.jpg",
  fund: "Siebert Financial Group",
  description:
    "A pioneering investor known for breaking barriers on Wall Street, Muriel Siebert is celebrated for her balanced, conservative approach that emphasizes financial stability and empowerment.",
  investment_style: "value",
  risk_tolerance: "medium",
  entry_criteria: [
    "Robust balance sheets and stable earnings",
    "Consistent dividend history",
    "Sustainable competitive advantages",
    "Stocks undervalued relative to intrinsic value",
    "Experienced, reputable management teams"
  ],
  exit_criteria: [
    "Deterioration in financial fundamentals",
    "Dividend reductions or cuts",
    "Overvaluation compared to intrinsic metrics",
    "Negative shifts in industry trends",
    "Loss of competitive advantage"
  ],
  prompt_style: "Empathetic and insightful",
  explainability_preference: "detailed",
  holdings: {
    "IBM": 300_000_000,
    "GE": 200_000_000,
    "KO": 150_000_000,
    "PEP": 100_000_000,
    "WMT": 250_000_000
  }
};
