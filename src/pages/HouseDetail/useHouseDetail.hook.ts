import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "src/contexts/SocketContext";
import DeviceServices from "src/services/device.service";
import EstateServices from "src/services/estates.service";
import { Device_Attribute } from "src/types/device/device.attribute.type";
import { DeviceAttribute_KeyType } from "src/types/device/deviceAttribute/deviceAttribute.type";
import { getIdFromNameId } from "src/utils/utils";

export const useHouseDetail = () => {
  const { socket } = useSocket();

  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);

  // ! get room list
  const { data: houseDetailData } =
    EstateServices.queries.useGetEstateDetail(houseId);

  const houseDetail = houseDetailData?.data;
  const floorList = houseDetail?.floors || [];

  // ! gen sensor devices
  const { data: deviceData, refetch: refetchSensorData } =
    DeviceServices.queries.useListAllDevices({});
  const deviceList = deviceData?.data || [];
  const sensorList = deviceList.filter(
    (device) => device.attributes[0].isPublisher
  );
  const sensorAttributeList = sensorList.reduce(
    (acc: Device_Attribute[], ele) => {
      const attrList = ele.attributes;
      return [...acc, ...attrList];
    },
    []
  );

  useEffect(() => {
    socket.on("refresh", () => {
      refetchSensorData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sensorValueMap: Map<DeviceAttribute_KeyType, number> = new Map();
  sensorAttributeList.map((ele) => sensorValueMap.set(ele.key, ele.value));

  return { floorList, sensorValueMap, houseNameId };
};
