import { useTheme } from "@mui/material";
import { Chart, ChartLegends, useChart } from "src/components/chart";
import { Iconify } from "src/components/iconify";

interface RD_PowerStatistic_LineChartProps {}

export default function RD_PowerStatistic_PieChart({}: RD_PowerStatistic_LineChartProps) {
  const theme = useTheme();
  const chart = {
    series: [
      { label: "Lights", value: 22 },
      { label: "Fans", value: 18 },
      { label: "Air conditioners", value: 16 },
      { label: "Doors", value: 17 },
      { label: "Others", value: 14 },
    ],
    icons: [
      <Iconify icon="streamline:dices-entertainment-gaming-dices-solid" />,
      <Iconify icon="maki:fuel" />,
      <Iconify icon="ion:fast-food" />,
      <Iconify icon="maki:cafe" />,
      <Iconify icon="basil:mobile-phone-outline" />,
    ],
  };

  const chartColors = [
    theme.palette.secondary.dark,
    theme.palette.error.main,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.dark,
  ];

  const chartSeries = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: { offsetY: 12 },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 1, colors: [theme.palette.background.paper] },
    fill: { opacity: 0.88 },
    tooltip: {
      y: { formatter: (value: number) => `${value} kW` },
      theme: "light",
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
  });

  return (
    <div className="w-full flex gap-4 p-4 overflow-hidden">
      <Chart
        type="polarArea"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, md: 280 }}
        height={{ xs: 240, md: 280 }}
      />

      <ChartLegends
        colors={chartOptions?.colors}
        labels={chartOptions?.labels}
        icons={chart.icons}
        sublabels={chart.series.map((item) => `${item.value} kW`)}
        sx={{
          gap: 2.5,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          "& .MuiStack-root": {
            margin: 0,
          },
        }}
      />
    </div>
  );
}
