import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "src/contexts/SocketContext";
import StatsServices from "src/services/stats.service";
import { getIdFromNameId } from "src/utils/utils";

interface RD_PowerUsageEstimateProps {}

export default function RD_PowerUsageEstimate({}: RD_PowerUsageEstimateProps) {
  const { socket } = useSocket();

  const { homeId: houseNameId } = useParams();
  const realEstateId = getIdFromNameId(houseNameId as string);

  const { data: powerData, refetch } = StatsServices.queries.useGetPowerUsage({
    realEstateId,
    startDate: dayjs().format("YYYY-MM-DD"),
  });
  const powerUsageList = powerData?.data || [];

  useEffect(() => {
    socket.on("refresh", () => {
      refetch();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-1">
        <p className="text-xl font-semibold uppercase text-primary-blue">
          Power usage
        </p>
        {/* <p className="text-darkColor500">
          Estimate the power usage base on the active devices
        </p> */}
      </div>

      <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">Today</p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
        {powerUsageList.map((ele) => {
          return (
            <div
              key={ele.device.id}
              className="w-full grid grid-cols-2 gap-2 text-left"
            >
              <p className="font-medium text-darkColor500">{ele.device.name}</p>
              <p className="font-semibold">
                {Number(ele.power / 1000).toFixed(2)} kW
              </p>
            </div>
          );
        })}
      </div>

      {/* <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">
        Till the end of the week
      </p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Lightning</p>
          <p className="font-semibold">6.9 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Fans</p>
          <p className="font-semibold">9.44 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Air conditioner</p>
          <p className="font-semibold">0 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Others</p>
          <p className="font-semibold">21.3 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left text-base xl:text-lg">
          <p className="font-semibold text-darkColor500 uppercase">Total</p>
          <p className="font-bold">37.6 kW</p>
        </div>
      </div>

      <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">
        Till the end of the month
      </p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Lightning</p>
          <p className="font-semibold">29.1 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Fans</p>
          <p className="font-semibold">41.2 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Air conditioner</p>
          <p className="font-semibold">0 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left">
          <p className="font-medium text-darkColor500">Others</p>
          <p className="font-semibold">12.7 kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-left text-base xl:text-lg">
          <p className="font-semibold text-darkColor500 uppercase">Total</p>
          <p className="font-bold">83 kW</p>
        </div>
      </div> */}
    </div>
  );
}
