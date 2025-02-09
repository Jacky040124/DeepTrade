"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, User } from "lucide-react";
import { useState } from "react";
import { InvestorProfile } from "@/components/investor-profile";
import { AssetGraph } from "@/components/asset-graph";

// Add this type near the top of the file
type TradeActivity = {
  id: number;
  type: string;
  result: string;
  timestamp: string;
  explanation: string;
};

export default function Home() {
  // Sample data for the graph
  const data = [
    { time: "09:00", value: 4000 },
    { time: "10:00", value: 3000 },
    { time: "11:00", value: 2000 },
    { time: "12:00", value: 2780 },
    { time: "13:00", value: 1890 },
    { time: "14:00", value: 2390 },
    { time: "15:00", value: 3490 },
  ];

  // Update the investors type to include activities
  const investors = [
    {
      id: 1,
      name: "Sarah Chen",
      performance: "+28.5%",
      aum: "$2.4M",
      strategy: "Momentum Trading",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200",
      holdings: [
        { symbol: "AAPL", shares: 150, value: "$28,500", change: "+2.3%" },
        { symbol: "TSLA", shares: 75, value: "$18,750", change: "+1.8%" },
        { symbol: "MSFT", shares: 100, value: "$35,200", change: "-0.5%" },
      ],
      activities: [
        {
          id: 1,
          type: "Buy AAPL",
          result: "+2.3%",
          timestamp: "2 hours ago",
          explanation: "Increased position in AAPL following positive earnings report and strong iPhone sales forecast. Technical indicators suggested an upward trend with support at $170.",
        },
        {
          id: 2,
          type: "Sell NVDA",
          result: "+3.1%",
          timestamp: "5 hours ago",
          explanation: "Took profits after reaching target price of $850. RSI indicated overbought conditions and momentum showing signs of slowing.",
        },
        {
          id: 3,
          type: "Buy MSFT",
          result: "+1.8%",
          timestamp: "1 day ago",
          explanation: "Initiated position after cloud revenue growth exceeded expectations. Price action showed breakout from consolidation pattern.",
        },
      ],
    },
    {
      id: 2,
      name: "Michael Ross",
      performance: "+22.3%",
      aum: "$1.8M",
      strategy: "Value Investing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
      holdings: [
        { symbol: "BRK.B", shares: 80, value: "$25,600", change: "+1.2%" },
        { symbol: "JPM", shares: 200, value: "$24,000", change: "+0.8%" },
        { symbol: "JNJ", shares: 120, value: "$19,800", change: "+1.5%" },
      ],
      activities: [
        {
          id: 1,
          type: "Buy BRK.B",
          result: "+1.2%",
          timestamp: "1 day ago",
          explanation: "Increased position in Berkshire Hathaway following strong earnings and attractive valuation metrics. Company continues to demonstrate solid capital allocation.",
        },
        {
          id: 2,
          type: "Buy JPM",
          result: "+0.8%",
          timestamp: "2 days ago",
          explanation: "Added to JPMorgan position as banking sector valuations remain compelling. Strong balance sheet and rising interest rates support profitability.",
        },
        {
          id: 3,
          type: "Hold JNJ",
          result: "+1.5%",
          timestamp: "3 days ago",
          explanation: "Maintaining position in Johnson & Johnson due to stable cash flows and defensive characteristics. Healthcare sector provides recession resistance.",
        },
      ],
    },
    {
      id: 3,
      name: "Elena Martinez",
      performance: "+25.7%",
      aum: "$3.1M",
      strategy: "Quantitative",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
      holdings: [
        { symbol: "GOOGL", shares: 50, value: "$67,500", change: "+3.1%" },
        { symbol: "AMZN", shares: 60, value: "$72,000", change: "+2.7%" },
        { symbol: "META", shares: 90, value: "$31,500", change: "+1.9%" },
      ],
      activities: [
        {
          id: 1,
          type: "Buy GOOGL",
          result: "+3.1%",
          timestamp: "6 hours ago",
          explanation: "Algorithm detected strong momentum signals and positive sentiment analysis from social media data. AI/ML metrics indicate potential outperformance.",
        },
        {
          id: 2,
          type: "Increase AMZN",
          result: "+2.7%",
          timestamp: "1 day ago",
          explanation: "Quantitative models showing bullish signals based on technical indicators and market microstructure data. Volume analysis supports upward trend.",
        },
        {
          id: 3,
          type: "Buy META",
          result: "+1.9%",
          timestamp: "2 days ago",
          explanation: "Statistical arbitrage opportunity identified through correlation analysis. Risk models suggest favorable risk/reward ratio.",
        },
      ],
    },
  ];

  // Add this state near the top of the component
  const [selectedActivity, setSelectedActivity] = useState<TradeActivity | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DeepTrade</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={investors[0].id.toString()} className="space-y-8">
          {/* Investor Selector */}
          <div className="flex justify-end">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              {investors.map((investor) => (
                <TabsTrigger
                  key={investor.id}
                  value={investor.id.toString()}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <img src={investor.image} alt={investor.name} className="w-6 h-6 rounded-full object-cover mr-2" />
                  <span className="hidden sm:inline">{investor.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Asset Graph */}
          <AssetGraph data={data} />

          {/* Investor Profile Cards */}
          {investors.map((investor) => (
            <TabsContent key={investor.id} value={investor.id.toString()}>
              <InvestorProfile investor={investor} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
