import { HouseConfigModel } from "src/types/house-config/houseConfig.type";

export const _mock_HouseConfigList: HouseConfigModel[] = [
  {
    id: "1",
    name: "Config 1",
    conditions: [
      {
        deviceId: "1",
        deviceName: "Floor 2 thermometer",
        deviceType: "temperature_sensor",
        value: "temperature",
        condition: ">=",
        threshold: "32 Celcius",
      },
    ],
    actions: [
      {
        deviceType: "air_conditioner",
        device: {
          id: "1",
          name: "Air 1",
        },
        room: {
          id: "1",
          name: "Bedroom 1",
        },
        action: "turn_on",
      },
      {
        deviceType: "air_conditioner",
        device: {
          id: "2",
          name: "Air 2",
        },
        room: {
          id: "2",
          name: "Bedroom 2",
        },
        action: "turn_on",
      },
    ],
  },
  {
    id: "2",
    name: "Config 2",
    conditions: [
      {
        deviceId: "1",
        deviceType: "temperature_sensor",
        deviceName: "Floor 2 thermometer",
        value: "temperature",
        condition: "<=",
        threshold: "22 Celcius",
      },
    ],
    actions: [
      {
        deviceType: "air_conditioner",
        device: {
          id: "1",
          name: "Air 1",
        },
        room: {
          id: "1",
          name: "Bedroom 1",
        },
        action: "turn_off",
      },
      {
        deviceType: "air_conditioner",
        device: {
          id: "2",
          name: "Air 2",
        },
        room: {
          id: "2",
          name: "Bedroom 2",
        },
        action: "turn_off",
      },
    ],
  },
];
