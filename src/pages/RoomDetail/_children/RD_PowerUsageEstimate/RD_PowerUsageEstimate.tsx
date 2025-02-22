import { Divider } from "@mui/material";

interface RD_PowerUsageEstimateProps {}

export default function RD_PowerUsageEstimate({}: RD_PowerUsageEstimateProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-1">
        <p className="text-xl font-semibold uppercase text-primary-blue">
          Power usage estimate
        </p>
        <p className="text-darkColor500">
          Estimate the power usage base on the active devices
        </p>
      </div>

      <Divider className="!border-border-primary" />

      <p className="w-full text-left text-lg font-semibold">
        Till the end of today
      </p>
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

      <p className="w-full text-left text-lg font-semibold">
        Till the end of the week
      </p>
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

      <p className="w-full text-left text-lg font-semibold">
        Till the end of the month
      </p>
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
