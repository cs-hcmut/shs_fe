import { useParams } from "react-router-dom";
import { getIdFromNameId, getNameFromNameId } from "../../utils/utils";
import AppLayout from "../../layouts/AppLayout";
import { homeManagementPaths } from "../../constants/path";

export default function RoomDetail() {
  const { roomId: roomNameId, homeId: homeNameId } = useParams();
  const roomId = getIdFromNameId(roomNameId || "");
  const roomName = getNameFromNameId(roomNameId || "");
  // const homeId = getIdFromNameId(homeNameId || "");
  const homeName = getNameFromNameId(homeNameId || "");

  return (
    <AppLayout
      pathList={[
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
      ]}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"></div>
    </AppLayout>
  );
}
