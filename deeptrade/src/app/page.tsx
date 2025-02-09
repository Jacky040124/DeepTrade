"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    name: "Paul Tudor Jones",
    image: "/paul.png",
  },
  {
    id: "4",
    name: "Muriel Siebert",
    image: "/muriel.jpg",
  },
];

export default function Home() {
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
    alert(`Selected characters: ${selectedNames.join(", ")}`);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Select Your Characters</h1>
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