import { getIdFromNameId } from "../../utils/utils";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";
import { HD_floorList } from "./_mocks/floor-list";
import HD_FloorItem from "./_children/HD_FloorItem";
import { Box, Button, Card, Divider } from "@mui/material";
import HD_PowerStatistic from "./_children/HD_PowerStatistic";
import { Chart } from "src/components/chart";
import WidgetSummary from "src/components/_common/WidgetSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

export default function HouseDetail() {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);

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
          <WidgetSummary title="Temperature" percent={2.6} total={18765} />

          <WidgetSummary title="Humidity " percent={2.6} total={18765} />

          <WidgetSummary title="Air Quality" percent={2.6} total={18765} />

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
          {HD_floorList.map((floor) => (
            <HD_FloorItem key={floor.id} floor={floor} />
          ))}
        </div>

        <Divider className="!border-primary-blue" />

        <HD_PowerStatistic />
      </div>
    </AppLayout>
  );
}
