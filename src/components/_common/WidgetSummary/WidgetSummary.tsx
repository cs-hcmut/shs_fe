import { Box, Card, CardProps } from "@mui/material";
import { ChartOptions } from "src/components/chart";
import { Iconify } from "src/components/iconify";
import { fNumber, fPercent } from "src/utils/format-number";

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  chart?: {
    colors?: string[];
    categories: string[];
    series: number[];
    options?: ChartOptions;
  };
};

export default function WidgetSummary({
  title,
  percent,
  total,
  sx,
  ...other
}: Props) {
  // const theme = useTheme();

  // const chartColors = chart.colors ?? [theme.palette.primary.main];

  // const chartOptions = useChart({
  //   chart: { sparkline: { enabled: true } },
  //   colors: chartColors,
  //   stroke: { width: 0 },
  //   xaxis: { categories: chart.categories },
  //   tooltip: {
  //     y: {
  //       formatter: (value: number) => fNumber(value),
  //       title: { formatter: () => "" },
  //     },
  //   },
  //   plotOptions: { bar: { borderRadius: 1.5, columnWidth: "64%" } },
  //   ...chart.options,
  // });

  const renderTrending = (
    <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
      <Iconify
        width={24}
        icon={
          percent < 0
            ? "solar:double-alt-arrow-down-bold-duotone"
            : "solar:double-alt-arrow-up-bold-duotone"
        }
        sx={{
          flexShrink: 0,
          color: "success.main",
          ...(percent < 0 && { color: "error.main" }),
        }}
      />

      <Box component="span" sx={{ typography: "subtitle2" }}>
        {percent > 0 && "+"}
        {fPercent(percent)}
      </Box>
      <Box
        component="span"
        sx={{ typography: "body2", color: "text.secondary" }}
      >
        last 7 days
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        ...sx,
      }}
      {...other}
    >
      <div className="flex flex-col gap-2 w-full items-center">
        <Box sx={{ typography: "h6" }}>{title}</Box>
        <Box sx={{ mt: 1.5, mb: 1, typography: "h3" }}>{fNumber(total)}</Box>

        {renderTrending}
      </div>

      {/* <Chart
        type="bar"
        series={[{ data: chart.series }]}
        options={chartOptions}
        width={60}
        height={40}
      /> */}
    </Card>
  );
}
