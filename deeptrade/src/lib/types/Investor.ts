export type Holdings = {
  [key: string]: number; // Symbol: Number of shares
};

export type RiskTolerance = "low" | "medium" | "high" | "aggressive";

export type InvestmentStyle = "value" | "growth" | "momentum" | "quantitative" | "technical" | "global_macro";

export type ExplainabilityPreference = "detailed" | "concise" | "technical" | "simple";

export type Info = {
  analysis: string;
  key_metrics: string[];
  risks: string[];
  portfolio_impact: string;
  cash_after_transactions: number;
  actions: {
    symbol: string;
    action: "BUY" | "SELL" | "HOLD";
    quantity: number;
    price_per_share: number;
    total_transaction_value: number;
    reasoning: string;
  }[];
};

export type InvestorProfile = {
  name: string;
  image: string;
  fund: number;
  description: string;
  investment_style: InvestmentStyle;
  risk_tolerance: RiskTolerance;
  entry_criteria: string;
  exit_criteria: string;
  prompt_style: string;
  explainability_preference: ExplainabilityPreference;
  holdings: Holdings;
  last_quarter: Info;
  trading_discipline: string;
  patience: string;
  adaptability: string;
  analytical_ability: string;
};





export const WarrenBuffett: InvestorProfile = {
  name: "Warren Buffett",
  image: "/warren.webp",
  fund: 1000000,
  description: "A disciplined value investor seeking undervalued companies with strong fundamentals.",
  investment_style: "value",
  risk_tolerance: "medium", // already defined
  entry_criteria:
    "P/E ratio below industry average, positive free cash flow, strong competitive moat, consistent earnings growth, quality management team",
  exit_criteria:
    "Stock price reaches target price, P/E ratio exceeds industry average, deteriorating fundamentals, management changes that raise concerns",
  prompt_style: "Formal and analytical",
  explainability_preference: "detailed",
  holdings: {},
  last_quarter: {
    analysis: "",
    key_metrics: [],
    risks: [],
    portfolio_impact: "",
    cash_after_transactions: 0,
    actions: [],
  },
  trading_discipline: "high",
  patience: "high",
  adaptability: "low",
  analytical_ability: "high",
};


export const GeorgeSoros: InvestorProfile = {
  name: "George Soros",
  image: "/george.jpg",
  fund: 1000000,
  description: "A global macro investor seeking to profit from market inefficiencies.",
  investment_style: "global_macro",
  risk_tolerance: "high",
  entry_criteria:
    "Political and economic events creating opportunities, market dislocations, currency imbalances, macro trend identification, asymmetric risk-reward setups",
  exit_criteria:
    "Market conditions change, geopolitical tensions escalate, position thesis invalidation, risk-reward ratio deteriorates",
  prompt_style: "Conversational and strategic",
  explainability_preference: "concise",
  holdings: {},
  last_quarter: {
    analysis: "",
    key_metrics: [],
    risks: [],
    portfolio_impact: "",
    cash_after_transactions: 0,
    actions: [],
  },
  trading_discipline: "medium",
  patience: "medium",
  adaptability: "high",
  analytical_ability: "high",
};

export const BillAckman: InvestorProfile = {
  name: "Bill Ackman",
  image: "/ackman.jpg",
  fund: 1000000,
  description: "A fundamental-driven activist investor focused on long-term value creation.",
  investment_style: "value", // Closest match to activist investing
  risk_tolerance: "medium",
  entry_criteria:
    "Undervalued companies with strong fundamentals, potential for activist involvement, management inefficiencies, catalyst-driven opportunities",
  exit_criteria:
    "Valuation reaches target, management refuses reforms, thesis invalidation, better opportunities arise",
  prompt_style: "Confident and analytical",
  explainability_preference: "detailed",
  holdings: {},
  last_quarter: {
    analysis: "",
    key_metrics: [],
    risks: [],
    portfolio_impact: "",
    cash_after_transactions: 0,
    actions: [],
  },
  trading_discipline: "high",
  patience: "high",
  adaptability: "medium",
  analytical_ability: "high",
};

export const MichaelBurry: InvestorProfile = {
  name: "Michael Burry",
  image: "/burry2.jpg",
  fund: 1000000,
  description: "A deep-value contrarian investor famous for spotting financial bubbles and crises.",
  investment_style: "value", // Burry focuses on deep-value investing
  risk_tolerance: "high",
  entry_criteria:
    "Significantly undervalued assets, market bubbles, asymmetric risk-reward scenarios, misunderstood stocks, historical patterns",
  exit_criteria:
    "Bubble bursts, asset reaches fair value, market mispricing corrects, liquidity concerns",
  prompt_style: "Blunt and data-driven",
  explainability_preference: "concise",
  holdings: {},
  last_quarter: {
    analysis: "",
    key_metrics: [],
    risks: [],
    portfolio_impact: "",
    cash_after_transactions: 0,
    actions: [],
  },
  trading_discipline: "medium",
  patience: "high",
  adaptability: "low",
  analytical_ability: "high",
};

export const BillHwang: InvestorProfile = {
  name: "Bill Hwang",
  image: "/hwang.webp",
  fund: 1000000,
  description: "A highly leveraged investor known for concentrated positions in high-growth stocks.",
  investment_style: "growth", // Closest match to his strategy
  risk_tolerance: "aggressive",
  entry_criteria:
    "High-growth companies with strong momentum, leverage-driven strategies, mispriced opportunities in tech and media",
  exit_criteria:
    "Liquidity constraints, excessive leverage risk, regulatory concerns, unexpected market volatility",
  prompt_style: "Visionary and high-risk",
  explainability_preference: "simple",
  holdings: {},
  last_quarter: {
    analysis: "",
    key_metrics: [],
    risks: [],
    portfolio_impact: "",
    cash_after_transactions: 0,
    actions: [],
  },
  trading_discipline: "low",
  patience: "medium",
  adaptability: "high",
  analytical_ability: "medium",
};
