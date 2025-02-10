"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Brain, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAgent } from "./hooks/useAgent";

export default function Home() {
  const { buffett, soros, kotegawa, siebert } = useAgent();
  const router = useRouter();
  const [selectedInvestor, setSelectedInvestor] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedInvestor((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const selectedNames = [buffett, soros, kotegawa, siebert]
      .filter(investor => selectedInvestor.includes(investor.name))
      .map(investor => investor.name);
    
    const searchParams = new URLSearchParams();
    selectedNames.forEach(name => searchParams.append('names', name));
    router.push(`/trade?${searchParams.toString()}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold ml-2">DeepTrade</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Choose Your Investors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[buffett, soros, kotegawa, siebert].map((investor) => (
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

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={selectedInvestor.length === 0}
            className="flex items-center"
          >
            Continue
            <User className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}