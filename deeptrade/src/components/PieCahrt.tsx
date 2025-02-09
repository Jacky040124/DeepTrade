import { PieChart as RechartsPieChart, Pie} from "recharts";
import { useAgent } from "@/app/hooks/useAgent";

interface PieChartProps {
  investor_name: string;
}

export default function PieChart({ investor_name }: PieChartProps) {
  const { buffett, soros } = useAgent();

  const investor = investor_name === "Warren Buffett" ? buffett : soros;

  const holdings = Object.entries(investor.holdings).map(([symbol, shares]) => ({
    name: symbol,
    value: shares,
  }));

  return (
    <RechartsPieChart width={730} height={250}>
      <Pie data={holdings} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      <Pie
        data={holdings}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
    </RechartsPieChart>
  );
}
