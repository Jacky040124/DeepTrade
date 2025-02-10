"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgent } from "@/app/hooks/useAgent";

interface InvestorQuarterInfoProps {
  selectedInvestor: string;
}

export function InvestorQuarterInfo({ selectedInvestor }: InvestorQuarterInfoProps) {
  const { buffett, soros, ackman, burry, hwang } = useAgent();

  const displayData = (() => {
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
        return buffett;
    }
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarter Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Analysis Section */}
            <div className="md:col-span-6 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Analysis</h3>
                <p className="text-sm text-muted-foreground">{displayData.last_quarter.analysis}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Portfolio Impact</h3>
                <p className="text-sm text-muted-foreground">{displayData.last_quarter.portfolio_impact}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Cash Position</h3>
                <p className="text-xl font-bold">${displayData.last_quarter.cash_after_transactions.toLocaleString()}</p>
              </div>
            </div>

            {/* Metrics and Risks Section */}
            <div className="md:col-span-6 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                <ul className="list-disc list-inside space-y-1">
                  {displayData.last_quarter.key_metrics.map((metric, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{metric}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Risks</h3>
                <ul className="list-disc list-inside space-y-1">
                  {displayData.last_quarter.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Quarter Actions</h3>
            <div className="space-y-2">
              {displayData.last_quarter.actions.map((action, index) => (
                <div key={index} className="bg-background/50 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{action.symbol}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        action.action === "BUY" 
                          ? "bg-green-100 text-green-800" 
                          : action.action === "SELL" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {action.action}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {action.quantity.toLocaleString()} shares @ ${action.price_per_share}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{action.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 