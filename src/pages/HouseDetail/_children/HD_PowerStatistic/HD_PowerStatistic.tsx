import { Divider } from "@mui/material";
import HD_PowerStatistic_Usage from "./_children/HD_PowerStatistic_Usage";
import HD_PowerStatistic_LineChart from "./_children/HD_PowerStatistic_LineChart";

interface RD_PowerStatisticProps {}

export default function HD_PowerStatistic({}: RD_PowerStatisticProps) {
  return (
    <div className="w-full flex flex-col gap-6 border rounded-xl border-border-primary p-4 lg:p-6 overflow-hidden bg-white">
      <p className="text-2xl font-semibold uppercase text-primary-blue">
        Statistics
      </p>

      <Divider className="!border-primary-blue" />

      <HD_PowerStatistic_Usage />

      <Divider className="!border-primary-blue" />

      <div className="w-full">
        <HD_PowerStatistic_LineChart />
      </div>
    </div>
  );
}
