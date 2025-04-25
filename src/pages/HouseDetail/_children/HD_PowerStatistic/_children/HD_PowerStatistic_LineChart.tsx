/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@mui/material";
import { Chart, useChart } from "src/components/chart";

interface HD_PowerStatistic_LineChartProps {
  PowerUsages: {
    [key: string]: {
      chart: {
        series: {
          name: string;
          data: number[];
        }[];
      };
    };
  };
}

export default function HD_PowerStatistic_LineChart({
  PowerUsages,
}: HD_PowerStatistic_LineChartProps) {
  const theme = useTheme();

  const chartColors = [
    theme.palette.primary.dark,
    theme.palette.secondary.main,
  ];

  const commonSettings = {
    colors: chartColors,

    stroke: { width: 3 },
    tooltip: {
      y: {
        formatter: (
          value: number,
          {
            seriesIndex,
            w,
          }: { seriesIndex: number; dataPointIndex: number; w: any }
        ) => {
          // Get the series name to identify the field
          const seriesName = w.globals.seriesNames[seriesIndex];

          // Add appropriate units based on series name
          let unit = "";
          if (seriesName.toLowerCase().includes("temp")) {
            unit = " °C";
          } else if (seriesName.toLowerCase().includes("humid")) {
            unit = " %";
          }

          // Return formatted string with field name and value with unit
          return `${seriesName}: ${value}${unit}`;
        },
      },
      theme: "light",
      marker: {
        show: true,
      },
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
      <p className="text-xl font-semibold">Sensor statistics</p>

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
