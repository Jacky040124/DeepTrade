"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Brain, Loader2 } from "lucide-react";
import { InvestorProfile } from "@/components/investor-profile";
import { AssetGraph } from "@/components/asset-graph";
import { useSearchParams } from "next/navigation";
import { InvestorSelector } from "@/components/investor-selector";
import PieChart from "../../components/PieCahrt";
import { getPortfolioRecommendations } from "../action";
import { incrementQuarter, quarterToDate, formatInvestorName } from "@/lib/utils/date";
import { useAgent } from "@/app/hooks/useAgent";
import { InvestorProfile as InvestorProfileType, Info, Holdings } from "@/lib/types/Investor";

// Sample data for the graph (keep this until you have real data)
const graphData = [
  { time: "09:00", value: 4000 },
  { time: "10:00", value: 3000 },
  { time: "11:00", value: 2000 },
  { time: "12:00", value: 2780 },
  { time: "13:00", value: 1890 },
  { time: "14:00", value: 2390 },
  { time: "15:00", value: 3490 },
];

// Create a type for our UI-specific investor data
export type InvestorDisplay = {
  id: string;
  name: string;
  image: string;
  profile: InvestorProfileType;
};



export default function Home() {
  const { buffett, soros, ackman, burry, hwang, setBuffett, setSoros, setAckman, setBurry, setHwang } = useAgent();
  const investorProfiles: InvestorProfileType[] = [buffett, soros, ackman, burry, hwang];

  const investors: InvestorDisplay[] = investorProfiles.map(profile => ({
    id: profile.name.toLowerCase().replace(/\s+/g, '-'),
    name: profile.name,
    image: profile.image,
    profile: profile,
  }));
  
  const [selectedInvestor, setSelectedInvestor] = useState<string>(investors[0].name);
  const [quarter, setQuarter] = useState<string>("2020-Q1");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const selectedNames = searchParams.getAll("names");

  

  async function handleNextQuarter() {
    setLoading(true);
    setQuarter(incrementQuarter(quarter));
    const dateStr = quarterToDate(quarter);

    for (const investor of investorProfiles) {
      const formattedName = formatInvestorName(investor.name);
      const res = await getPortfolioRecommendations(dateStr, formattedName, 1000000);
      
      const info: Info = {
        analysis: res.analysis,
        key_metrics: res.key_metrics,
        risks: res.risks,
        portfolio_impact: res.portfolio_impact,
        cash_after_transactions: res.cash_after_transactions,
        actions: res.recommendations.map(rec => ({
          symbol: rec.symbol,
          action: rec.action,
          quantity: rec.quantity,
          price_per_share: rec.price_per_share,
          total_transaction_value: rec.total_transaction_value,
          reasoning: rec.reasoning
        }))
      };

      const actions = res.recommendations.map(rec => ({
        symbol: rec.symbol,
        action: rec.action,
        quantity: rec.quantity,
        price_per_share: rec.price_per_share,
        total_transaction_value: rec.total_transaction_value,
        reasoning: rec.reasoning
      }));

      const newHoldings = handleHoldings(investor.holdings, actions);
      const newFund = res.cash_after_transactions;

      switch (formattedName) {
        case "warren_buffett":
          setBuffett({ ...buffett, holdings: newHoldings, fund: newFund, last_quarter: info });
          break;
        case "george_soros":
          setSoros({ ...soros, holdings: newHoldings, fund: newFund, last_quarter: info });
          break;
        case "bill_ackman":
          setAckman({ ...ackman, holdings: newHoldings, fund: newFund, last_quarter: info });
          break;
        case "michael_burry":
          setBurry({ ...burry, holdings: newHoldings, fund: newFund, last_quarter: info });
          break;
        case "bill_hwang":
          setHwang({ ...hwang, holdings: newHoldings, fund: newFund, last_quarter: info });
          break;
      }
    }
    setLoading(false);
  }

  function handleHoldings(holdings: Holdings, actions: any[]) {
    const updatedHoldings = { ...holdings };
    
    for (const action of actions) {
      if (action.action === "BUY") {
        updatedHoldings[action.symbol] = (updatedHoldings[action.symbol] || 0) + action.quantity;
      } else if (action.action === "SELL") {
        const currentHolding = updatedHoldings[action.symbol] || 0;
        updatedHoldings[action.symbol] = Math.max(0, currentHolding - action.quantity);
        if (updatedHoldings[action.symbol] === 0) {
          delete updatedHoldings[action.symbol];
        }
      }
      // HOLD action doesn't modify holdings
    }
    
    return updatedHoldings;
  }



  // display analysis
  // display key metrics
  // display risks
  // display portfolio impact
  // display cash after transactions
  // display actions

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DeepTrade</span>
            <span className="text-sm text-muted-foreground ml-4">{quarter}</span>
          </div>
          <div className="flex items-center space-x-4">
            <InvestorSelector
              investors={investors.filter((investor) => selectedNames.includes(investor.name))}
              onInvestorChange={(investor) => setSelectedInvestor(investor.name)}
            />
            <Button variant="ghost" onClick={handleNextQuarter} disabled={loading}>
              Next Quarter
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`transition-all duration-500 ${loading ? "blur-md" : "blur-0"}`}>
        <main className="container mx-auto px-4 py-4">
          <Tabs defaultValue={investors[0].id} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-[4]">
                <AssetGraph data={graphData} />
              </div>
              <div className="flex-[1]">
                <PieChart investor_name={selectedInvestor} />
              </div>
            </div>

            {investors.map((investor) => (
              <TabsContent key={investor.id} value={investor.id}>
                <InvestorProfile selectedInvestor={selectedInvestor} firstInvestor={selectedNames[0]}/>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Loader2 className="h-10 w-10 animate-spin text-black" />
      </div>
    </div>
  );
}
