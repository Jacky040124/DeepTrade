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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for the graph (keep this until you have real data)
const graphData = [
  { time: "09:00", value: 1000000 },
  { time: "10:00", value: 920000 },
  { time: "11:00", value: 840000 },
  { time: "12:00", value: 1110000 },
  { time: "13:00", value: 760000 },
  { time: "14:00", value: 960000 },
  { time: "15:00", value: 1400000 },
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
  const searchParams = useSearchParams();
  const selectedNames = searchParams.getAll("names");

  const investors: InvestorDisplay[] = investorProfiles
    .filter(profile => selectedNames.includes(profile.name))
    .map(profile => ({
      id: profile.name.toLowerCase().replace(/\s+/g, '-'),
      name: profile.name,
      image: profile.image,
      profile: profile,
    }));

  const [selectedInvestor, setSelectedInvestor] = useState<string>(investors[0].name);
  const [quarter, setQuarter] = useState<string>("2020-Q1");
  const [loading, setLoading] = useState(false);

  const displayData = (() => {
    switch (selectedInvestor) {
      case "Warren Buffett":
        return buffett;
      case "George Soros":
        return soros;
      case "Bill Ackman":
        return ackman;
      case "Michael Burry":
        return burry;
      case "Bill Hwang":
        return hwang;
      default:
        return buffett;
    }
  })();

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
        actions: res.recommendations.map((rec) => ({
          symbol: rec.symbol,
          action: rec.action,
          quantity: rec.quantity,
          price_per_share: rec.price_per_share,
          total_transaction_value: rec.total_transaction_value,
          reasoning: rec.reasoning,
        })),
      };

      const actions = res.recommendations.map((rec) => ({
        symbol: rec.symbol,
        action: rec.action,
        quantity: rec.quantity,
        price_per_share: rec.price_per_share,
        total_transaction_value: rec.total_transaction_value,
        reasoning: rec.reasoning,
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HedgeFun-R1</span>
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
                <InvestorProfile selectedInvestor={selectedInvestor} firstInvestor={selectedNames[0]} />
              </TabsContent>
            ))}
          </Tabs>

          {/* Quarter Analysis Card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quarter Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Analysis Section */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Analysis</h3>
                      <p className="text-sm text-muted-foreground">{displayData.last_quarter.analysis}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Portfolio Impact</h3>
                      <p className="text-sm text-muted-foreground">{displayData.last_quarter.portfolio_impact}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Cash Position</h3>
                      <p className="text-xl font-bold">
                        ${displayData.last_quarter.cash_after_transactions.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Metrics and Risks Section */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {displayData.last_quarter.key_metrics.map((metric, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Risks</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {displayData.last_quarter.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Quarter Actions</h3>
                  <div className="space-y-2">
                    {displayData.last_quarter.actions.map((action, index) => (
                      <div key={index} className="bg-background/50 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{action.symbol}</span>
                            <span
                              className={`ml-2 px-2 py-0.5 rounded text-xs ${
                                action.action === "BUY"
                                  ? "bg-green-100 text-green-800"
                                  : action.action === "SELL"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {action.action}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {action.quantity.toLocaleString()} shares @ ${action.price_per_share}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{action.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
