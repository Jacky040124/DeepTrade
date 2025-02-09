"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Holding = {
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

type Investor = {
  id: number;
  name: string;
  performance: string;
  aum: string;
  strategy: string;
  image: string;
  holdings: Holding[];
  activities: TradeActivity[];
};

interface InvestorProfileProps {
  investor: Investor;
}

export function InvestorProfile({ investor }: InvestorProfileProps) {
  const [selectedActivity, setSelectedActivity] = useState<TradeActivity | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div>
              <img src={investor.image} alt={investor.name} className="w-32 h-32 rounded-lg object-cover" />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{investor.name}</h3>
                <p className="text-muted-foreground">{investor.strategy}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                  <div className="text-xl font-bold text-primary">{investor.performance}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">AUM</div>
                  <div className="text-xl font-bold">{investor.aum}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Holdings and Activity Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Current Holdings - Left Column (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-semibold">Current Holdings</h4>
              <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                {investor.holdings.map((holding) => (
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
                      <div className={holding.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {holding.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity - Right Column (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Recent Activity</h4>
                <Button variant="outline" size="sm" onClick={() => setSelectedActivity(null)}>
                  Clear Selection
                </Button>
              </div>
              
              <div className="space-y-3">
                {investor.activities?.map((activity) => (
                  <div key={activity.id}>
                    <button
                      onClick={() => setSelectedActivity(activity)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg transition-colors",
                        "hover:bg-muted/80",
                        selectedActivity?.id === activity.id 
                          ? "bg-muted ring-2 ring-primary" 
                          : "bg-muted/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{activity.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.timestamp}
                          </div>
                        </div>
                        <div className={cn(
                          "text-sm font-medium",
                          activity.result.startsWith('+') ? 'text-green-500' : 'text-red-500'
                        )}>
                          {activity.result}
                        </div>
                      </div>
                    </button>
                    
                    {selectedActivity?.id === activity.id && (
                      <div className="mt-2 p-4 rounded-lg bg-background/50 text-sm">
                        <h5 className="font-medium mb-2">Trade Analysis</h5>
                        <p className="text-muted-foreground leading-relaxed">
                          {activity.explanation}
                        </p>
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
        </div>
      </CardContent>
    </Card>
  );
} 