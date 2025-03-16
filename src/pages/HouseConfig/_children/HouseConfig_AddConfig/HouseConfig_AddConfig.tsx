import { Divider } from "@mui/material";
import useHouseConfigStore from "../../_stores/HouseConfig.store";
import CustomModal from "src/components/_common/CustomModal";
import HouseConfig_Conditions from "../HouseConfig_Conditions";
import HouseConfig_Actions from "../HouseConfig_Actions";
import useHouseConfigStore_Conditions from "../../_stores/HouseConfig_Conditions.store";
import useHouseConfigStore_Actions from "../../_stores/HouseConfig_Actions.store";

interface HouseConfig_AddConfigProps {}

export default function HouseConfig_AddConfig({}: HouseConfig_AddConfigProps) {
  const { setConditionList } = useHouseConfigStore_Conditions();
  const { setActionList } = useHouseConfigStore_Actions();

  const { addingConfig, setAddingConfig } = useHouseConfigStore();

  const cancelAddingConfig = () => {
    setAddingConfig(false);
    setConditionList([]);
    setActionList([]);
  };

  return (
    <CustomModal
      isOpen={addingConfig}
      setIsOpen={setAddingConfig}
      onClose={cancelAddingConfig}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <p className="font-semibold text-xl text-center text-primaryBlue">
          Add config
        </p>

        <Divider className="!border-border-primary" />

        <div className="flex flex-grow overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
            <div className="col-span-1 pr-3 overflow-hidden h-full">
              <HouseConfig_Conditions />
            </div>
            <div className="col-span-1 lg:border-l border-border-primary pl-3 overflow-hidden h-full">
              <HouseConfig_Actions />
            </div>
          </div>
        </div>

        <Divider className="!border-border-primary" />

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={cancelAddingConfig}
            className="py-2 px-3 rounded-xl border border-border-primary font-medium hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
