import { getIdFromNameId } from "../../utils/utils";
import { useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";
import { HD_floorList } from "./_mocks/floor-list";
import HD_FloorItem from "./_children/HD_FloorItem";

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
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {HD_floorList.map((floor) => (
          <HD_FloorItem key={floor.id} floor={floor} />
        ))}
      </div>
    </AppLayout>
  );
}
