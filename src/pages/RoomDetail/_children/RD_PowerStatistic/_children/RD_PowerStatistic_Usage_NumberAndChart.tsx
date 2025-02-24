import { Divider } from "@mui/material";
import RD_PowerStatistic_PieChart from "./RD_PowerStatistic_PieChart";

interface RD_PowerStatistic_Usage_NumberAndChartProps {
  title: string;
}

export default function RD_PowerStatistic_Usage_NumberAndChart({
  title,
}: RD_PowerStatistic_Usage_NumberAndChartProps) {
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <p className="w-full text-left text-lg font-semibold uppercase">
        {title}
      </p>
      <Divider className="border border-border-primary" />
      <div className="grid grid-cols-1 lg:grid-cols-3 p-4">
        <div className="flex flex-col gap-2 w-full justify-between text-sm xl:text-base px-2 col-span-1">
          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <p className="font-medium text-darkColor500">Lightning system</p>
            <p className="font-semibold">2 kW</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <p className="font-medium text-darkColor500">Fans</p>
            <p className="font-semibold">4 kW</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <p className="font-medium text-darkColor500">Doors</p>
            <p className="font-semibold">1 kW</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <p className="font-medium text-darkColor500">Air conditioner</p>
            <p className="font-semibold">10 kW</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-left text-base xl:text-lg">
            <p className="font-semibold text-darkColor500 uppercase">Total</p>
            <p className="font-bold">10 kW</p>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 border-l border-border-primary">
          <RD_PowerStatistic_PieChart />
        </div>
      </div>
    </div>
  );
}
