"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { type InvestorProfile } from "@/lib/types/Investor";

type FormattedHolding = {
  symbol: string;
  shares: number;
  value: string;
  change: string;
};

type TradeActivity = {
  id: number;
  type: string;
  result: string;
  timestamp: string;
  explanation: string;
};

// Helper function to format holdings
const formatHoldings = (holdings: Record<string, number>): FormattedHolding[] => {
  return Object.entries(holdings).map(([symbol, shares]) => ({
    symbol,
    shares,
    value: `$${(shares * 100).toLocaleString()}`, // Mock price calculation
    change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 5).toFixed(2)}%` // Mock change
  }));
};

// Mock activities for demonstration
const mockActivities = (style: string): TradeActivity[] => [
  {
    id: 1,
    type: `${Math.random() > 0.5 ? 'Buy' : 'Sell'} AAPL`,
    result: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 5).toFixed(2)}%`,
    timestamp: "2 hours ago",
    explanation: `Based on ${style} investment approach, executed this trade following market analysis.`
  },
  // Add more mock activities as needed
];

interface InvestorProfileProps {
  investor: InvestorProfile;
}

export function InvestorProfile({ investor }: InvestorProfileProps) {
  const [selectedActivity, setSelectedActivity] = useState<TradeActivity | null>(null);

  // Format the data for display
  const formattedHoldings = formatHoldings(investor.holdings);
  const activities = mockActivities(investor.investment_style);

  const displayData = {
    name: investor.name,
    fund: investor.fund,
    strategy: investor.investment_style,
    performance: "+22.3%", // Mock performance
    aum: "$350B", // Mock AUM
    image: investor.image,
    holdings: formattedHoldings,
    activities: activities,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Profile Section with Holdings */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Profile Info - Left Side */}
            <div className="md:col-span-6 flex flex-col sm:flex-row gap-6">
              <div>
                <img src={displayData.image} alt={displayData.name} className="w-32 h-32 rounded-lg object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{displayData.name}</h3>
                  <p className="text-muted-foreground">{displayData.strategy}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                    <div className="text-xl font-bold text-primary">{displayData.performance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">AUM</div>
                    <div className="text-xl font-bold">{displayData.aum}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Holdings - Right Side */}
            <div className="md:col-span-6 space-y-3">
              <h4 className="text-sm font-semibold">Current Holdings</h4>
              <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                {displayData.holdings.map((holding) => (
                  <div
                    key={holding.symbol}
                    className="flex items-center justify-between p-2 bg-background/50 rounded-md text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{holding.symbol}</div>
                      <div className="text-muted-foreground">({holding.shares})</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>{holding.value}</div>
                      <div className={holding.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {holding.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Recent Activity</h4>
              <Button variant="outline" size="sm" onClick={() => setSelectedActivity(null)}>
                Clear Selection
              </Button>
            </div>

            <div className="space-y-3">
              {displayData.activities?.map((activity) => (
                <div key={activity.id}>
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg transition-colors",
                      "hover:bg-muted/80",
                      selectedActivity?.id === activity.id ? "bg-muted ring-2 ring-primary" : "bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                      </div>
                      <div
                        className={cn(
                          "text-sm font-medium",
                          activity.result.startsWith("+") ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {activity.result}
                      </div>
                    </div>
                  </button>

                  {selectedActivity?.id === activity.id && (
                    <div className="mt-2 p-4 rounded-lg bg-background/50 text-sm">
                      <h5 className="font-medium mb-2">Trade Analysis</h5>
                      <p className="text-muted-foreground leading-relaxed">{activity.explanation}</p>
                    </div>
                  )}
                </div>
              )) || (
                <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
                  No recent activities to display
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 