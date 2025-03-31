import { useParams } from "react-router-dom";
import { getNameFromNameId } from "../../utils/utils";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";
import RD_RoomController from "./_children/RD_RoomController/RD_RoomController";
import RD_PowerStatistic from "./_children/RD_PowerStatistic";
import RD_PowerUsageEstimate from "./_children/RD_PowerUsageEstimate";

export default function RoomDetail() {
  const { roomId: roomNameId, homeId: homeNameId } = useParams();
  const roomName = getNameFromNameId(roomNameId || "").replace("-", " ");
  // const homeId = getIdFromNameId(homeNameId || "");
  const homeName = getNameFromNameId(homeNameId || "").replace("-", " ");

  // ! path
  const pathList = [
    {
      pathName: "My homes",
      url: homeManagementPaths.homes,
    },
    {
      pathName: homeName,
      url: `${homeManagementPaths.homes}/${homeNameId}`,
    },
    {
      pathName: roomName,
      url: `${homeManagementPaths.homes}/${homeNameId}/${roomNameId}`,
      isNotALink: true,
    },
  ];

  return (
    <AppLayout pathList={pathList}>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center w-full gap-2">
          <p className="tracking-wide text-2xl font-semibold uppercase">
            {homeName} - {"Floor 2"}
          </p>

          <p className="tracking-wide text-xl font-semibold text-primaryBlue">
            {roomName}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="col-span-1 lg:col-span-2 border rounded-xl border-border-primary p-4 lg:p-6 overflow-hidden bg-white h-fit">
            <RD_RoomController />
          </div>
          <div className="col-span-1 border rounded-xl border-border-primary p-4 lg:p-6 overflow-hidden bg-white">
            <RD_PowerUsageEstimate />
          </div>
        </div>

        <RD_PowerStatistic />
      </div>
    </AppLayout>
  );
}
