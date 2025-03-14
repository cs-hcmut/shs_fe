import { Divider, Modal } from "@mui/material";
import React from "react";
import useHouseConfigStore from "../../_stores/HouseConfig.store";
import CustomModal from "src/components/_common/CustomModal";
import HouseConfig_Conditions from "../HouseConfig_Conditions";

interface HouseConfig_AddConfigProps {}

export default function HouseConfig_AddConfig({}: HouseConfig_AddConfigProps) {
  const { addingConfig, setAddingConfig } = useHouseConfigStore();

  return (
    <CustomModal isOpen={addingConfig} setIsOpen={setAddingConfig}>
      <div className="max-w-[80vw] max-h-[90vh] overflow-auto flex flex-col gap-4">
        <p className="font-semibold text-xl text-center text-primaryBlue">
          Add config
        </p>

        <Divider className="!border-border-primary" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="col-span-1">
            <HouseConfig_Conditions />
          </div>
          <div className="col-span-1 lg:col-span-2 lg:border-l border-border-primary"></div>
        </div>
      </div>
    </CustomModal>
  );
}
