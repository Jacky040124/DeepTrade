"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CharacterCard({
  id,
  name,
  image,
  isSelected,
  onSelect,
}: CharacterCardProps) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={cn(
        "cursor-pointer rounded-lg p-4 border-2 transition-all duration-200",
        "hover:shadow-lg transform hover:-translate-y-1",
        "flex flex-col items-center",
        "bg-gray-900",
        isSelected
          ? "border-purple-500 shadow-purple-500/20 shadow-lg scale-[1.02]"
          : "border-gray-800 hover:border-purple-500/50"
      )}
    >
      <div className="relative w-24 h-24 mb-3">
        <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-gray-700">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
        </div>
      </div>
      <h3 className="font-semibold text-lg text-center text-gray-100">
        {name}
      </h3>
    </div>
  );
}