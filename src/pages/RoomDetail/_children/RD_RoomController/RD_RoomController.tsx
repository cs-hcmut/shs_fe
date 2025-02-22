import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../../../../components/_common/CustomButton";
import MuiStyles from "../../../../styles";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import RD_RoomController_Devices from "./_children/RD_RoomController_Devices";

interface RD_RoomControllerProps {}

export default function RD_RoomController({}: RD_RoomControllerProps) {
  const showLightningDevices = true;
  const showFanDevices = true;
  const showACDevices = true;
  const showDoorDevices = true;
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-center">
        <CustomButton
          variant="contained"
          sx={MuiStyles.buttonStyles.contained.dangerActionBg}
          className="!text-white flex !items-center !rounded-xl !py-3 !px-4 !gap-2 !justify-center "
        >
          <FontAwesomeIcon icon={faPowerOff} />
          <p className="text-xl uppercase">Turn off all devices</p>
        </CustomButton>
      </div>

      <Divider className="!border-primaryBlue" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {showLightningDevices && (
          <RD_RoomController_Devices deviceType="light" deviceList={[]} />
        )}
        {showFanDevices && (
          <RD_RoomController_Devices deviceType="door" deviceList={[]} />
        )}
        {showACDevices && (
          <RD_RoomController_Devices deviceType="fan" deviceList={[]} />
        )}
        {showDoorDevices && (
          <RD_RoomController_Devices
            deviceType="air_conditioner"
            deviceList={[]}
          />
        )}
      </div>
    </div>
  );
}
