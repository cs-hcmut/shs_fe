import RD_PowerStatistic_Usage_NumberAndChart from "./RD_PowerStatistic_Usage_NumberAndChart";

interface RD_PowerStatistic_UsageProps {}

export default function RD_PowerStatistic_Usage({}: RD_PowerStatistic_UsageProps) {
  return (
    <div className="w-full border border-border-secondary bg-gray-100 p-3 rounded-lg flex flex-col gap-2">
      <p className="text-xl font-semibold">Power usage</p>
      <RD_PowerStatistic_Usage_NumberAndChart title="in day" />

      <RD_PowerStatistic_Usage_NumberAndChart title="in week" />

      <RD_PowerStatistic_Usage_NumberAndChart title="in month" />
    </div>
  );
}
