"use client";

import { InvestorDisplay } from "@/app/trade/page";

interface InvestorSelectorProps {
  investors: InvestorDisplay[];
  onInvestorChange: (investor: InvestorDisplay) => void;
}

export function InvestorSelector({ investors, onInvestorChange }: InvestorSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {investors.map((investor) => (
        <button
          key={investor.id}
          onClick={() => onInvestorChange(investor)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-all"
        >
          <div className="relative w-6 h-6">
            <img src={investor.image} alt={investor.name} className="rounded-full object-cover w-full h-full" />
          </div>
          <span className="text-sm font-medium">{investor.name.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  );
} 