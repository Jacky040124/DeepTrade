"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Brain, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAgent } from "./hooks/useAgent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CharacteristicsRadarChart from "@/components/RadarChart";

export default function Home() {
  const { buffett, soros, ackman, burry, hwang } = useAgent();
  const router = useRouter();

  // State for tracking selected investors
  const [selectedInvestor, setSelectedInvestor] = useState<string[]>([]);
  // State for tracking the most recently clicked investor
  const [currentInvestor, setCurrentInvestor] = useState<{
    name: string;
    image: string;
    // include any other properties your investor objects have
  } | null>(null);

  const handleSelect = (id: string) => {
    // Toggle selection of the investor
    setSelectedInvestor((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    // Update currentInvestor with the investor data that matches the id
    const investor = [buffett, soros, ackman, burry, hwang].find(
      (investor) => investor.name === id
    );
    if (investor) {
      setCurrentInvestor(investor);
    }
  };

  const handleContinue = () => {
    const selectedNames = [buffett, soros, ackman, burry, hwang]
      .filter((investor) => selectedInvestor.includes(investor.name))
      .map((investor) => investor.name);

    const searchParams = new URLSearchParams();
    selectedNames.forEach((name) => searchParams.append("names", name));
    router.push(`/trade?${searchParams.toString()}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold ml-2">HedgeFun</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-4xl font-bold">Choose Your Investors</h1>
          <Button onClick={handleContinue} disabled={selectedInvestor.length === 0} className="flex items-center">
            Continue
            <User className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[buffett, soros, ackman, burry, hwang].map((investor) => (
            <CharacterCard
              key={investor.name}
              id={investor.name}
              name={investor.name}
              image={investor.image}
              isSelected={selectedInvestor.includes(investor.name)}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Display details of the most recently clicked investor */}
        {currentInvestor && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{currentInvestor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CharacteristicsRadarChart investor_name={currentInvestor.name}></CharacteristicsRadarChart>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
