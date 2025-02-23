import { useTheme } from "@mui/material";
import { Chart, useChart } from "src/components/chart";
import { Iconify } from "src/components/iconify";
import { fCurrency } from "src/utils/format-number";

interface RD_PowerStatistic_LineChartProps {}

export default function RD_PowerStatistic_PieChart({}: RD_PowerStatistic_LineChartProps) {
  const theme = useTheme();
  const chart = {
    series: [
      { label: "Entertainment", value: 22 },
      { label: "Fuel", value: 18 },
      { label: "Fast food", value: 16 },
      { label: "Cafe", value: 17 },
      { label: "Сonnection", value: 14 },
      { label: "Healthcare", value: 22 },
      { label: "Fitness", value: 10 },
      { label: "Supermarket", value: 21 },
    ],
    icons: [
      <Iconify icon="streamline:dices-entertainment-gaming-dices-solid" />,
      <Iconify icon="maki:fuel" />,
      <Iconify icon="ion:fast-food" />,
      <Iconify icon="maki:cafe" />,
      <Iconify icon="basil:mobile-phone-outline" />,
      <Iconify icon="solar:medical-kit-bold" />,
      <Iconify icon="ic:round-fitness-center" />,
      <Iconify icon="solar:cart-3-bold" />,
    ],
  };

  const chartColors = [
    theme.palette.secondary.dark,
    theme.palette.error.main,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.dark,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.dark,
  ];

  const chartSeries = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: { offsetY: 12 },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 1, colors: [theme.palette.background.paper] },
    fill: { opacity: 0.88 },
    tooltip: {
      y: { formatter: (value: number) => fCurrency(value) },
      theme: "light",
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <Chart
        type="polarArea"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, md: 280 }}
        height={{ xs: 240, md: 280 }}
      />
    </div>
  );
}
