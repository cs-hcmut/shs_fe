import { useTheme } from "@mui/material";
import { Chart, useChart } from "src/components/chart";

interface HD_PowerStatistic_LineChartProps {}

const PowerUsages: {
  [key: string]: {
    chart: {
      series: {
        data: number[];
      }[];
    };
  };
} = {
  day: {
    chart: {
      series: [
        {
          data: [
            0.34, 0.38, 0.61, 0.5, 0.3, 0.44, 1.67, 1.43, 1.32, 1.07, 1.03,
            1.01, 0.94, 1.14, 1.04,
          ],
        },
      ],
    },
  },
  week: {
    chart: {
      series: [
        {
          data: [24.45, 25.51, 25.47, 24.6, 24.9, 24.91, 25.45],
        },
      ],
    },
  },
  month: {
    chart: {
      series: [
        {
          data: [
            25.6, 25.19, 24.4, 24.31, 24.18, 24.29, 24.93, 25.8, 24.15, 24.8,
            24.89, 26.1, 25.1, 23.61, 25.34, 25.6, 25.66, 25.73, 25.28, 25.82,
            24.26, 25.95, 25.31, 24.96, 25.37, 24.35, 25.26, 25.64, 24.92,
            24.27,
          ],
        },
      ],
    },
  },
};

export default function HD_PowerStatistic_LineChart({}: HD_PowerStatistic_LineChartProps) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark];

  const commonSettings = {
    colors: chartColors,

    stroke: { width: 3 },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} kW`,
        title: { formatter: () => "" },
      },
      theme: "light",
    },
  };

  const chartOptionsForDay = useChart({
    ...commonSettings,
    xaxis: {
      categories: [
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
    },
  });

  const chartOptionsForWeek = useChart({
    ...commonSettings,
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  });

  const chartOptionsForMonth = useChart({
    ...commonSettings,
    xaxis: {
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
  });

  return (
    <div className="w-full border border-border-secondary bg-gray-100 p-4 rounded-lg flex flex-col gap-4">
      <p className="text-xl font-semibold">Usage statistics</p>

      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-semibold uppercase text-start">In day</p>
        <Chart
          type="line"
          series={PowerUsages["day"].chart.series}
          options={chartOptionsForDay}
          height={270}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-semibold uppercase text-start">In week</p>
        <Chart
          type="line"
          series={PowerUsages["week"].chart.series}
          options={chartOptionsForWeek}
          height={270}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-semibold uppercase text-start">In month</p>
        <Chart
          type="line"
          series={PowerUsages["month"].chart.series}
          options={chartOptionsForMonth}
          height={270}
        />
      </div>
    </div>
  );
}
