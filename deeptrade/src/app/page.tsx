"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Brain, User } from "lucide-react";
import { useRouter } from "next/navigation";

const characters = [
  {
    id: "1",
    name: "Warren Buffett",
    image: "/warren.webp",
  },
  {
    id: "2",
    name: "George Soros",
    image: "/george.jpg",
  },
  {
    id: "3",
    name: "Takashi Kotegawa",
    image: "/takashi.webp",
  },
  {
    id: "4",
    name: "Muriel Siebert",
    image: "/muriel.jpg",
  },
];

export default function Home() {
  const router = useRouter(); // <-- Move this hook to the top level of the component
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(id)
        ? prev.filter((charId) => charId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedNames = characters
      .filter((char) => selectedCharacters.includes(char.id))
      .map((char) => char.name);

      const params = new URLSearchParams();
      selectedNames.forEach((name) => params.append("names", name));

      router.push(`/trade?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-black">
      <nav className="border-b text-white">
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
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Select Your Characters
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              {...character}
              isSelected={selectedCharacters.includes(character.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleConfirm}
            disabled={selectedCharacters.length === 0}
            className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-100 text-black"
            color="white"
          >
            Confirm Selection ({selectedCharacters.length})
          </Button>
        </div>
      </div>
    </main>
  );
}