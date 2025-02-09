"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Brain, User } from "lucide-react";
import { InvestorProfile } from "@/components/investor-profile";
import { AssetGraph } from "@/components/asset-graph";
import { 
  WarrenBuffett, 
  GeorgeSoros,
  type InvestorProfile as InvestorProfileType 
} from "@/lib/types/Investor";
import { useRouter, useSearchParams } from "next/navigation";

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
type InvestorDisplay = {
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
    }
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedNames = searchParams.getAll("names");

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
            {/* Investor Selector */}
            <div className="flex items-center gap-2">
              {investors.map((investor) => (
                <button
                  key={investor.id}
                  onClick={() => {
                    const tab = document.querySelector(
                      `[data-state="inactive"][value="${investor.id}"]`
                    ) as HTMLButtonElement;
                    tab?.click();
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-all"
                >
                  <div className="relative w-6 h-6">
                    <img src={investor.image} alt={investor.name} className="rounded-full object-cover w-full h-full" />
                  </div>
                  <span className="text-sm font-medium">{investor.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <Button variant="ghost">
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={investors[0].id} className="space-y-8">
          {/* Investor Selector */}
          <div className="flex justify-end">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              {investors
                .filter(investor => selectedNames.includes(investor.name))
                .map((investor) => (
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
          <AssetGraph data={graphData} />

          {/* Investor Profile Cards */}
          {investors.map((investor) => (
            <TabsContent key={investor.id} value={investor.id}>
              <InvestorProfile investor={investor.profile} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
