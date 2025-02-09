"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Brain, Loader2 } from "lucide-react";
import { InvestorProfile } from "@/components/investor-profile";
import { AssetGraph } from "@/components/asset-graph";
import { 
  WarrenBuffett, 
  GeorgeSoros,
  TakashiKotegawa,
  MurielSiebert,
  type InvestorProfile as InvestorProfileType 
} from "@/lib/types/Investor";
import { useSearchParams } from "next/navigation";
import { InvestorSelector } from "@/components/investor-selector";
import PieChart from "../../components/PieCahrt";


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
  // Map the investor profiles to our display format
  const investors: InvestorDisplay[] = [
    {
      id: "buffett",
      name: WarrenBuffett.name,
      image: WarrenBuffett.image,
      profile: WarrenBuffett
    },
    {
      id: "soros",
      name: GeorgeSoros.name,
      image: GeorgeSoros.image,
      profile: GeorgeSoros
    },
    {
      id: "kotegawa",
      name: TakashiKotegawa.name,
      image: TakashiKotegawa.image,
      profile: TakashiKotegawa
    },
    {
      id: "siebert",
      name: MurielSiebert.name,
      image: MurielSiebert.image,
      profile: MurielSiebert
    }
  ];
  const [selectedInvestor, setSelectedInvestor] = useState<string>(investors[0].name);
  const searchParams = useSearchParams();
  const selectedNames = searchParams.getAll("names");
  
  const handleInvestorChange = (investor: InvestorDisplay) => {
    setSelectedInvestor(investor.name);
  };

  const [loading, setLoading] = useState(false);

  async function handleNextQuarter() {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error executing next quarter action:", error);
    } finally {
      setLoading(false);
    }
  }

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
            <InvestorSelector investors={investors} onInvestorChange={handleInvestorChange} />
            <Button variant="ghost" onClick={handleNextQuarter} disabled={loading}>
              Next Quarter
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`transition-all duration-500 ${loading ? "blur-md" : "blur-0"}`}>
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue={investors[0].id} className="space-y-8">
            {/* Asset Graph */}
            <AssetGraph data={graphData} />
            <PieChart investor_name={selectedInvestor} />
            {/* Investor Profile Cards */}
            {investors.map((investor) => (
              <TabsContent key={investor.id} value={investor.id}>
                <InvestorProfile selectedInvestor={selectedInvestor} />
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
