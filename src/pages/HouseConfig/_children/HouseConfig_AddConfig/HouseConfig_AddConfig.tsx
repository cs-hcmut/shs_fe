import { Divider, Modal } from "@mui/material";
import React from "react";
import useHouseConfigStore from "../../_stores/HouseConfig.store";
import CustomModal from "src/components/_common/CustomModal";

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
      </div>
    </CustomModal>
  );
}
