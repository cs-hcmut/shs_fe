import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../../../../components/_common/CustomButton";
import MuiStyles from "../../../../styles";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import RD_RoomController_Devices from "./_children/RD_RoomController_Devices";
import DeviceServices from "src/services/device.service";
import { useParams } from "react-router-dom";
import { getIdFromNameId } from "src/utils/utils";
import VoiceRecorder from "src/components/_common/VoiceRecorder";
import { toast } from "sonner";
import { createFileFromAudioBlob } from "src/utils/audio.util";
import { get } from "lodash";

interface RD_RoomControllerProps {}

export default function RD_RoomController({}: RD_RoomControllerProps) {
  const { roomId: roomNameId } = useParams();
  const roomId = getIdFromNameId(roomNameId || "");

  const showLightningDevices = true;
  const showFanDevices = true;
  const showACDevices = true;

  // ! get device
  const { data: deviceData } = DeviceServices.queries.useListAllDevices({
    roomId,
  });

  const deviceList = deviceData?.data || [];

  const fanDeviceList = deviceList.filter((d) => d.type === "fan");
  const lightDeviceList = deviceList.filter((d) => d.type === "light");
  const airConditionorDeviceList = deviceList.filter(
    (d) => d.type === "air_conditioner"
  );

  // ! voice recording

  const uploadVoiceMutation = DeviceServices.create.useUploadVoiceRecord();
  const handleSaveRecording = (blob: Blob) => {
    const audioFile = createFileFromAudioBlob(blob);

    // const body = {
    //   file: audioFile,
    // };
    // console.log(body);
    // return;

    const formData = new FormData();
    formData.append("file", audioFile);

    toast.promise(uploadVoiceMutation.mutateAsync(formData), {
      loading: "Uploading",
      success: "Uploaded voice command successfully",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (err: any) => get(err, "message", "Cannot upload voice"),
    });
  };

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
      </div>
    </div>
  );
}
