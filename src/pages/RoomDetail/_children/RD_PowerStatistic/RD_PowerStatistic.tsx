import { Divider } from "@mui/material";
import RD_PowerStatistic_Usage from "./_children/RD_PowerStatistic_Usage";
import RD_PowerStatistic_PieChart from "./_children/RD_PowerStatistic_PieChart";
import RD_PowerStatistic_LineChart from "./_children/RD_PowerStatistic_LineChart";

interface RD_PowerStatisticProps {}

export default function RD_PowerStatistic({}: RD_PowerStatisticProps) {
  return (
    <div className="w-full flex flex-col gap-3 border rounded-xl border-border-primary p-4 lg:p-6 overflow-hidden bg-white">
      <p className="text-2xl font-semibold uppercase text-primary-blue">
        Power statistics
      </p>

      <Divider className="!border-primary-blue" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="col-span-1">
          <RD_PowerStatistic_Usage />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <RD_PowerStatistic_PieChart />
        </div>
      </div>

      <Divider className="!border-primary-blue" />

      <div className="w-full">
        <RD_PowerStatistic_LineChart />
      </div>
    </div>
  );
}
