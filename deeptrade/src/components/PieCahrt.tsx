import { PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import { useAgent } from "@/app/hooks/useAgent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PieChartProps {
  investor_name: string;
}

export default function PieChart({ investor_name }: PieChartProps) {
  const { buffett, soros, kotegawa, siebert } = useAgent();
  
  const investor = (() => {
    switch (investor_name) {
      case "Warren Buffett":
        return buffett;
      case "George Soros":
        return soros;
      case "Takashi Kotegawa":
        return kotegawa;
      case "Muriel Siebert":
        return siebert;
      default:
        return buffett; // Handle cases where no match is found
    }
  })();

  const holdings = Object.entries(investor.holdings).map(([symbol, shares]) => ({
    name: symbol,
    value: shares,
  }));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Portfolio Distribution
        </CardTitle>
      </CardHeader>
      <CardContent> 
        <RechartsPieChart width={400} height={400}>
          <Pie 
            data={holdings} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={130} 
            fill="#404040" 
            label={({ name }) => name}
          >
            {holdings.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </CardContent>
      </Card>
  );
}
