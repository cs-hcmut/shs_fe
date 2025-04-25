import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import StatsServices from "src/services/stats.service";
import StatsUtils from "src/utils/stats.util";
import { getIdFromNameId } from "src/utils/utils";

export const useHD_PowerStatistic = () => {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);

  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");

  // ! get stats data
  const { data: statsData } = StatsServices.queries.useGetStats({
    realEstateId: houseId,
    startDate: startOfMonth,
  });
  const statsList = statsData?.data || [];

  const temperatureStats =
    statsList.find((stat) => stat.key === "temp")?.logs || [];

  const humidityStats =
    statsList.find((stat) => stat.key === "humidity")?.logs || [];

  const tempStatsInMonth =
    StatsUtils.getAverageValuesByDayThisMonth(temperatureStats);
  const tempStatsInWeek =
    StatsUtils.getAverageValuesByDayThisWeek(temperatureStats);
  const tempStatsInDay =
    StatsUtils.getAverageValuesByHourToday(temperatureStats);

  const humidityStatsInMonth =
    StatsUtils.getAverageValuesByDayThisMonth(humidityStats);
  const humidityStatsInWeek =
    StatsUtils.getAverageValuesByDayThisWeek(humidityStats);
  const humidityStatsInDay =
    StatsUtils.getAverageValuesByHourToday(humidityStats);

  const PowerUsages: {
    [key: string]: {
      chart: {
        series: {
          name: string;
          data: number[];
        }[];
      };
    };
  } = {
    day: {
      chart: {
        series: [
          {
            name: "Humidity",
            data: humidityStatsInDay,
          },
          {
            name: "Temperature",
            data: tempStatsInDay,
          },
        ],
      },
    },
    week: {
      chart: {
        series: [
          {
            name: "Humidity",
            data: humidityStatsInWeek,
          },
          {
            name: "Temperature",
            data: tempStatsInWeek,
          },
        ],
      },
    },
    month: {
      chart: {
        series: [
          {
            name: "Humidity",
            data: humidityStatsInMonth,
          },
          {
            name: "Temperature",
            data: tempStatsInMonth,
          },
        ],
      },
    },
  };

  return {
    PowerUsages,
  };
};
