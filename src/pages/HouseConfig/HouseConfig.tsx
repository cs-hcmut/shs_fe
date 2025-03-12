import { useParams } from "react-router-dom";
import { homeManagementPaths } from "src/constants/path";
import AppLayout from "src/layouts/AppLayout";
import { getIdFromNameId } from "src/utils/utils";

interface CHouseConfigProps {}

export default function HouseConfig({}: CHouseConfigProps) {
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
          url: `${homeManagementPaths.homes}/${houseNameId}`,
        },
        { pathName: "Config actions", url: "", isNotALink: true },
      ]}
    >
      <div className="w-full flex flex-col gap-6">
        <p className="text-2xl leading-6 font-semibold text-primary-blue">
          Config List
        </p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="col-span-1 border rounded-lg border-border-primary p-2 lg:p-4"></div>
          <div className="col-span-1 lg:col-span-3 rounded-lg border border-border-primary p-2 lg:p-4"></div>
        </div>
      </div>
    </AppLayout>
  );
}
