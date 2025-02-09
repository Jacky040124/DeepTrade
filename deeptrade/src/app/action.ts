"use server";

type Recommendation = {
  symbol: string;
  action: 'BUY' | 'HOLD' | 'SELL';
  quantity: number;
  price_per_share: number;
  total_transaction_value: number;
  reasoning: string;
};

type PortfolioRecommendation = {
  recommendations: Recommendation[];
  key_metrics: string[];
  analysis: string;
  risks: string[];
  portfolio_impact: string;
  cash_after_transactions: string;
};

export async function getPortfolioRecommendations(): Promise<PortfolioRecommendation> {
    // stab
    return {
        recommendations: [],
        key_metrics: [],
        analysis: "",
        risks: [],
        portfolio_impact: "",
        cash_after_transactions: ""
    }
}