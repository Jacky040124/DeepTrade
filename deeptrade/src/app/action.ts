"use server";

type Recommendation = {
  symbol: string;
  action: "BUY" | "HOLD" | "SELL";
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
  cash_after_transactions: number;
};

export async function getPortfolioRecommendations(
  date: string,
  role: string,
  fund: number
): Promise<PortfolioRecommendation> {
    
  console.log(date, role, fund);
  const response = await fetch(`http://127.0.0.1:5000/trade?date=${date}&role=${role}&funds=${fund}`);
  const res = await response.json();
  console.log(res);

  return res;
}
