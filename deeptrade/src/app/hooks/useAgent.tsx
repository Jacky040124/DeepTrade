"use client";

import { WarrenBuffett as BuffettProfile, GeorgeSoros as SorosProfile, TakashiKotegawa as KotegawaProfile, MurielSiebert as SiebertProfile, type InvestorProfile } from "../../lib/types/Investor";
import { createContext, useState, useContext } from "react";

type AgentContextType = {
    buffett: InvestorProfile;
    soros: InvestorProfile;
    kotegawa: InvestorProfile;
    siebert: InvestorProfile;
}

export const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [buffett, setBuffett] = useState<InvestorProfile>(BuffettProfile);
    const [soros, setSoros] = useState<InvestorProfile>(SorosProfile);
    const [kotegawa, setKotegawa] = useState<InvestorProfile>(KotegawaProfile);
    const [siebert, setSiebert] = useState<InvestorProfile>(SiebertProfile);

    return (
        <AgentContext.Provider value={{ buffett, soros, kotegawa, siebert }}>
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