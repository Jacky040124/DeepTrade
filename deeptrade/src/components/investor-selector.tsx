"use client";

import { useState } from "react";
import { InvestorDisplay } from "@/app/trade/page";

interface InvestorSelectorProps {
  investors: InvestorDisplay[];
  onInvestorChange: (investor: InvestorDisplay) => void;
}

export function InvestorSelector({
  investors,
  onInvestorChange,
}: InvestorSelectorProps) {
  const [selectedId, setSelectedId] = useState<InvestorDisplay["id"] | null>(
    investors[0]?.id || null
  );

  const handleInvestorChange = (investor: InvestorDisplay) => {
    setSelectedId(investor.id);
    onInvestorChange(investor);
  };

  return (
    <div className="flex items-center gap-2">
      {investors.map((investor) => {
        const isSelected = selectedId === investor.id;
        return (
          <button
            key={investor.id}
            onClick={() => handleInvestorChange(investor)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all 
              ${isSelected ? "bg-gray-300" : "hover:bg-muted/50"}`}
          >
            <div className="relative w-6 h-6">
              <img
                src={investor.image}
                alt={investor.name}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-medium">
              {investor.name.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
