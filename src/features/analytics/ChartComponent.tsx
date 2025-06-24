import { useI18n } from "@/contexts/LangContext";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartProps {
  data: ChartData[];
  title: string;
}

export function ChartComponent({ data, title }: ChartProps) {
  const { t } = useI18n();

  if (!data.length) {
    return (
      <div className="text-center text-muted-foreground p-8 h-80 flex items-center justify-center">
        <p>{t.analyse.noData}</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium text-center mb-4">{title}</h4>
      <div className="h-96 md:h-96">
        <p className="text-center text-sm text-muted-foreground font-medium">
          {t.analyse.totalSpent}: {total.toFixed(2)}
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              innerRadius="0%"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toFixed(2),
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={60}
              wrapperStyle={{
                paddingTop: "5px",
                fontSize: "12px",
                backgroundColor: "hsl(var(--card))",
                borderRadius: "6px",
                padding: "8px",
                border: "1px solid hsl(var(--border))",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
