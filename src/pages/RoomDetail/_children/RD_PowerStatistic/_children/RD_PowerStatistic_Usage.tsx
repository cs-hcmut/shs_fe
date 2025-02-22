import { Divider } from "@mui/material";

interface RD_PowerStatistic_UsageProps {}

export default function RD_PowerStatistic_Usage({}: RD_PowerStatistic_UsageProps) {
  return (
    <div className="w-full border border-border-secondary bg-gray-100 p-3 rounded-lg flex flex-col gap-2">
      <p className="text-xl font-semibold">Power usage</p>
      <p className="w-full text-left text-lg font-semibold">In day</p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
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

      <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">In week</p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
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

      <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">In month</p>
      <div className="flex flex-col gap-2 w-full text-sm xl:text-base px-2">
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
    </div>
  );
}
