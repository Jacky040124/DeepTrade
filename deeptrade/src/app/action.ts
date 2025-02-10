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
  cash_after_transactions: number;
};

// I wan to trade at 2020-1-1
// role is the first_last name of the investor all lowercase
export async function getPortfolioRecommendations(date: string, role : string, fund: number): Promise<PortfolioRecommendation> {
    // const response = await fetch(`https://deeptrade-api.onrender.com/recommendations?date=${date}&role=${role}&fund=${fund}`);

    console.log(date, role, fund);

    
    return {
        recommendations: [],
        key_metrics: [],
        analysis: "",
        risks: [],
        portfolio_impact: "",
        cash_after_transactions: 0
    }
}