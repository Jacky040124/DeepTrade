"use client";

import { WarrenBuffett as BuffettProfile, GeorgeSoros as SorosProfile, type InvestorProfile } from "../../lib/types/Investor";
import { createContext, useState, useContext } from "react";

type AgentContextType = {
    buffett: InvestorProfile;
    soros: InvestorProfile;
}

export const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [buffett, setBuffett] = useState<InvestorProfile>(BuffettProfile);
    const [soros, setSoros] = useState<InvestorProfile>(SorosProfile);

    return (
        <AgentContext.Provider value={{ buffett, soros }}>
            {children}
        </AgentContext.Provider>
    );
}

export function useAgent() {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error("useAgent must be used within an AgentProvider");
    }
    return context;
}