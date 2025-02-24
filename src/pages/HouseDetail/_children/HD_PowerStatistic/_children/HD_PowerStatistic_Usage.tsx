import HD_PowerStatistic_Usage_NumberAndChart from "./HD_PowerStatistic_Usage_NumberAndChart";

interface HD_PowerStatistic_UsageProps {}

export default function HD_PowerStatistic_Usage({}: HD_PowerStatistic_UsageProps) {
  return (
    <div className="w-full border border-border-secondary bg-gray-100 p-3 rounded-lg flex flex-col gap-2">
      <p className="text-xl font-semibold">Power usage</p>
      <HD_PowerStatistic_Usage_NumberAndChart title="in day" />

      <HD_PowerStatistic_Usage_NumberAndChart title="in week" />

      <HD_PowerStatistic_Usage_NumberAndChart title="in month" />
    </div>
  );
}
