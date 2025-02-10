"use client";

import { WarrenBuffett as BuffettProfile, GeorgeSoros as SorosProfile, TakashiKotegawa as KotegawaProfile, MurielSiebert as SiebertProfile, BillAckman as AckmanProfile, MichaelBurry as BurryProfile, BillHwang as HwangProfile, type InvestorProfile } from "../../lib/types/Investor";
import { createContext, useState, useContext } from "react";

type AgentContextType = {
    buffett: InvestorProfile;
    soros: InvestorProfile;
    ackman: InvestorProfile;
    burry: InvestorProfile;
    hwang: InvestorProfile;
}

export const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [buffett, setBuffett] = useState<InvestorProfile>(BuffettProfile);
    const [soros, setSoros] = useState<InvestorProfile>(SorosProfile);
    const [ackman, setAckman] = useState<InvestorProfile>(AckmanProfile);
    const [burry, setBurry] = useState<InvestorProfile>(BurryProfile);
    const [hwang, setHwang] = useState<InvestorProfile>(HwangProfile);
    

    return (
        <AgentContext.Provider value={{ buffett, soros, ackman, burry, hwang }}>
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