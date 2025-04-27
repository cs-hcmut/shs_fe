import { Divider } from "@mui/material";
import RD_RoomController_Devices from "./_children/RD_RoomController_Devices";
import DeviceServices from "src/services/device.service";
import { useParams } from "react-router-dom";
import { getIdFromNameId } from "src/utils/utils";
import VoiceRecorder from "src/components/_common/VoiceRecorder";
import { toast } from "sonner";
import {
  createFileFromAudioBlob,
  fixAudioMetadata,
} from "src/utils/audio.util";
import { get } from "lodash";
import { useSocket } from "src/contexts/SocketContext";
import { useEffect } from "react";

interface RD_RoomControllerProps {}

export default function RD_RoomController({}: RD_RoomControllerProps) {
  const { socket } = useSocket();

  const { roomId: roomNameId } = useParams();
  const roomId = getIdFromNameId(roomNameId || "");

  const showLightningDevices = true;
  const showFanDevices = true;
  const showACDevices = true;

  // ! get device
  const { data: deviceData, refetch: refecthDeviceData } =
    DeviceServices.queries.useListAllDevices({
      roomId,
    });

  const deviceList = deviceData?.data || [];

  useEffect(() => {
    socket.on("refresh", () => {
      refecthDeviceData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fanDeviceList = deviceList.filter((d) => d.type === "fan");
  const lightDeviceList = deviceList.filter((d) => d.type === "light");
  const airConditionorDeviceList = deviceList.filter(
    (d) => d.type === "air_conditioner"
  );
  const otherDeviceList = deviceList.filter((d) => d.type === "other");

  // ! voice recording

  const uploadVoiceMutation = DeviceServices.create.useUploadVoiceRecord();
  const handleSaveRecording = async (blob: Blob) => {
    const fixedBlob = await fixAudioMetadata(blob);
    const audioFile = createFileFromAudioBlob(fixedBlob);

    const formData = new FormData();
    formData.append("file", audioFile);

    toast.promise(uploadVoiceMutation.mutateAsync(formData), {
      loading: "Uploading voice command",
      success: "Uploaded voice command successfully",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (err: any) => get(err, "message", "Cannot upload voice"),
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* <div className="w-full flex items-center justify-center">
        <CustomButton
          variant="contained"
          sx={MuiStyles.buttonStyles.contained.dangerActionBg}
          className="!text-white flex !items-center !rounded-xl !py-3 !px-4 !gap-2 !justify-center "
        >
          <FontAwesomeIcon icon={faPowerOff} />
          <p className="text-xl uppercase">Turn off all devices</p>
        </CustomButton>
      </div> */}

      <VoiceRecorder onSave={handleSaveRecording} />

      <Divider className="!border-primaryBlue" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {showLightningDevices && (
          <RD_RoomController_Devices
            deviceType="light"
            deviceList={lightDeviceList}
          />
        )}

        {showFanDevices && (
          <RD_RoomController_Devices
            deviceType="fan"
            deviceList={fanDeviceList}
          />
        )}
        {showACDevices && (
          <RD_RoomController_Devices
            deviceType="air_conditioner"
            deviceList={airConditionorDeviceList}
          />
        )}

        <RD_RoomController_Devices
          deviceType="other"
          deviceList={otherDeviceList}
        />
      </div>
    </div>
  );
}
