import { useTheme } from "@mui/material";
import { Chart, useChart } from "src/components/chart";
import { fCurrency } from "src/utils/format-number";

interface RD_PowerStatistic_GraphsProps {}

const TABS = [
  {
    value: "income",
    label: "Income",
    percent: 8.2,
    total: 9990,
    chart: { series: [{ data: [5, 31, 33, 50, 100, 76, 72, 76, 89] }] },
  },
  {
    value: "expenses",
    label: "Expenses",
    percent: -6.6,
    total: 1989,
    chart: { series: [{ data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }] },
  },
];

export default function RD_PowerStatistic_Graphs({}: RD_PowerStatistic_GraphsProps) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark];

  const chartOptions = useChart({
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
    },
  });

  return (
    <div className="w-full     flex flex-col gap-2">
      <Chart
        type="line"
        series={TABS[0].chart.series}
        options={chartOptions}
        height={270}
      />
    </div>
  );
}
