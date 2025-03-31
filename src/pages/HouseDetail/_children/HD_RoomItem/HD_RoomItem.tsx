import { RoomModel } from "../../../../types/room/room.type";
import CustomButton from "../../../../components/_common/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { homeManagementPaths } from "../../../../constants/path";
import { generateNameId } from "../../../../utils/utils";

interface HD_RoomItemProps {
  room: RoomModel;
}

export default function HD_RoomItem({ room }: HD_RoomItemProps) {
  const { id: roomId, name: roomName, deviceCount } = room;

  // ! Handle click house
  const { homeId: homeNameId } = useParams();
  const navigate = useNavigate();

  const onClickRoom = () => {
    navigate({
      pathname: `${homeManagementPaths.homes}/${homeNameId}/${generateNameId({ name: roomName, id: roomId })}`,
    });
  };

  return (
    <CustomButton
      variant="outlined"
      onClick={onClickRoom}
      className="py-4 px-3 rounded-lg border !border-border-primary flex !flex-col !gap-3"
    >
      <p className="text-lg">{roomName}</p>

      {/* <div className="w-full grid grid-cols-2 gap-2">
        <p className="text-left text-sm lg:text-base font-medium">{roomName}</p>
      </div> */}
      <div className="w-full grid grid-cols-2 gap-2">
        <p className="text-left text-sm lg:text-base text-darkColor500">
          Devices
        </p>
        <p className="text-left text-sm lg:text-base font-medium">
          {deviceCount}
        </p>
      </div>
      {/* <div className="w-full grid grid-cols-2 gap-2">
        <p className="text-left text-sm lg:text-base text-darkColor500 ">
          Power used
        </p>
        <p className="text-left text-sm lg:text-base font-medium">
          {powerConsumedInDay}
        </p>
      </div> */}
    </CustomButton>
  );
}
