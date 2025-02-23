import { useTheme } from "@mui/material";
import { Chart, useChart } from "src/components/chart";
import { fCurrency } from "src/utils/format-number";

interface RD_PowerStatistic_LineChartProps {}

const TABS = [
  {
    value: "income",
    label: "Income",
    percent: 8.2,
    total: 9990,
    chart: { series: [{ data: [5, 31, 33, 50, 100, 76, 72, 76, 89] }] },
  },
];

export default function RD_PowerStatistic_LineChart({}: RD_PowerStatistic_LineChartProps) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark];

  const chartOptionsForDay = useChart({
    colors: chartColors,
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    stroke: { width: 3 },
    tooltip: {
      y: {
        formatter: (value: number) => fCurrency(value),
        title: { formatter: () => "" },
      },
      theme: "light",
    },
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <Chart
        type="line"
        series={TABS[0].chart.series}
        options={chartOptionsForDay}
        height={270}
      />
    </div>
  );
}
