import { getIdFromNameId } from "../../utils/utils";
import { useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";
import { HD_floorList } from "./_mocks/floor-list";
import HD_FloorItem from "./_children/HD_FloorItem";
import { Box, Card, Divider } from "@mui/material";
import HD_PowerStatistic from "./_children/HD_PowerStatistic";
import { Chart } from "src/components/chart";
import WidgetSummary from "src/components/_common/WidgetSummary";

export default function HouseDetail() {
  const { homeId } = useParams();
  const houseId = getIdFromNameId(homeId as string);

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
