"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type InvestorProfile } from "@/lib/types/Investor";
import { useAgent } from "@/app/hooks/useAgent";
import { useState } from "react";

interface InvestorProfileProps {
  selectedInvestor: string;
  firstInvestor: string;
}

export function InvestorProfile({ selectedInvestor, firstInvestor}: InvestorProfileProps) {
  const { buffett, soros, ackman, burry, hwang} = useAgent();
  
  const displayData = (() => {
    if (selectedInvestor == null) {
      selectedInvestor = firstInvestor;
    }
    switch (selectedInvestor) {
      case "Warren Buffett":
        return buffett;
      case "George Soros":
        return soros;
      case "Bill Ackman":
        return ackman;
      case "Michael Burry":
        return burry;
      case "Bill Hwang":
        return hwang;
      default:
        return buffett; // Fallback in case of no match
    }
  })();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Investor Header - now directly in the profile */}
            <div className="md:col-span-6 flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-muted/30">
              <div>
                <img src={displayData.image} alt={displayData.name} className="w-32 h-32 rounded-lg object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{displayData.name}</h3>
                  <p className="text-muted-foreground">{displayData.fund}</p>
                  <p className="text-sm text-muted-foreground mt-2">{displayData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Investment Style</div>
                    <div className="text-xl font-bold text-primary">{displayData.investment_style}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Risk Tolerance</div>
                    <div className="text-xl font-bold">{displayData.risk_tolerance}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Holdings - Right Side */}
            <div className="md:col-span-6 space-y-3">
              <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                {Object.entries(displayData.holdings).map(([symbol, shares]) => (
                  <div
                    key={symbol}
                    className="flex items-center justify-between p-2 bg-background/50 rounded-md text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{symbol}</div>
                      <div className="text-muted-foreground">({shares.toLocaleString()})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
