export type Holdings = {
  [key: string]: number;  // Symbol: Number of shares
};

export type RiskTolerance = 'low' | 'medium' | 'high' | 'aggressive';

export type InvestmentStyle = 'value' | 'growth' | 'momentum' | 'quantitative' | 'technical' | 'global_macro';

export type ExplainabilityPreference = 'detailed' | 'concise' | 'technical' | 'simple';

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
    "Quality management team"
  ],
  exit_criteria: [
    "Stock price reaches target price",
    "P/E ratio exceeds industry average",
    "Deteriorating fundamentals",
    "Management changes that raise concerns"
  ],
  prompt_style: "Formal and analytical",
  explainability_preference: "detailed",
  holdings: {
    "AAPL": 915_228_702,
    "BAC": 1_032_852_006,
    "KO": 400_000_000,
    "AXP": 151_610_700,
    "MOAT": 0
  }
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
    "Asymmetric risk-reward setups"
  ],
  exit_criteria: [
    "Market conditions change",
    "Geopolitical tensions escalate",
    "Position thesis invalidation",
    "Risk-reward ratio deteriorates"
  ],
  prompt_style: "Conversational and strategic",
  explainability_preference: "concise",
  holdings: {
    "SPY": 100000,
    "EEM": 200000,
    "GLD": 150000,
    "FXE": 180000,
    "TLT": 120000
  }
};
