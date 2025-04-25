import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";
import HD_FloorItem from "./_children/HD_FloorItem";
import { Divider } from "@mui/material";
import HD_PowerStatistic from "./_children/HD_PowerStatistic";
import WidgetSummary from "src/components/_common/WidgetSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useHouseDetail } from "./useHouseDetail.hook";

export default function HouseDetail() {
  const { floorList, sensorValueMap, houseNameId } = useHouseDetail();

  return (
    <AppLayout
      pathList={[
        {
          pathName: "Home management",
          url: homeManagementPaths.homes,
        },
        {
          pathName: "My home",
          url: homeManagementPaths.homes,
          isNotALink: true,
        },
      ]}
    >
      <div className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          <WidgetSummary
            title="Temperature"
            shouldHideTrend
            total={Number(sensorValueMap.get("temp"))}
          />

          <WidgetSummary
            title="Humidity "
            shouldHideTrend
            total={Number(sensorValueMap.get("humidity"))}
          />

          <WidgetSummary title="Air Quality" total={3.3} percent={-0.6} />

          <WidgetSummary title="Power Usage" percent={2.6} total={18765} />
        </div>

        <div className=" gap-4 lg:gap-6 grid grid-cols-3 lg:grid-cols-6">
          <Link
            to={`${homeManagementPaths.homes}/${houseNameId}/config`}
            className="flex flex-col items-center bg-white hover:bg-slate-100 p-6 rounded-2xl border border-primaryBlue"
          >
            <FontAwesomeIcon
              icon={faSliders}
              className="text-[#00B4D8] text-5xl mb-4"
            />
            <h2 className="text-xl font-semibold text-darkText">
              Config Actions
            </h2>
          </Link>

          <Link
            to={`${homeManagementPaths.homes}/${houseNameId}/schedule`}
            className="flex flex-col items-center bg-white hover:bg-slate-100 p-6 rounded-2xl border border-primaryBlue"
          >
            <FontAwesomeIcon
              icon={faSliders}
              className="text-[#00B4D8] text-5xl mb-4"
            />
            <h2 className="text-xl font-semibold text-darkText">Schedule</h2>
          </Link>
        </div>

        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {floorList.map((floor) => (
            <HD_FloorItem key={floor.id} floor={floor} />
          ))}
        </div>

        <Divider className="!border-primary-blue" />

        <HD_PowerStatistic />
      </div>
    </AppLayout>
  );
}
