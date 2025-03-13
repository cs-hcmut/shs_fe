import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { homeManagementPaths } from "src/constants/path";
import AppLayout from "src/layouts/AppLayout";
import MuiStyles from "src/styles";
import { getIdFromNameId } from "src/utils/utils";
import { _mock_HouseConfigList } from "./_mocks/configList.mock";
import HouseConfig_ConfigItem from "./_children/HouseConfig_ConfigItem";

interface CHouseConfigProps {}

export default function HouseConfig({}: CHouseConfigProps) {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);

  return (
    <AppLayout
      pathList={[
        {
          pathName: "Home management",
          url: homeManagementPaths.homes,
        },
        {
          pathName: "My home",
          url: `${homeManagementPaths.homes}/${houseNameId}`,
        },
        { pathName: "Config actions", url: "", isNotALink: true },
      ]}
    >
      <div className="w-full flex flex-col gap-6 py-4">
        <div className="flex justify-between w-full items-center">
          <p className="text-2xl leading-6 font-semibold text-primary-blue">
            Config List
          </p>

          <Button
            sx={MuiStyles.buttonStyles.bluePrimaryBg}
            className="!rounded-lg !text-white !font-medium flex !items-center !py-2 !px-4 !justify-center !normal-case !gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add config
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {_mock_HouseConfigList.map((config) => {
            return <HouseConfig_ConfigItem key={config.id} config={config} />;
          })}
        </div>
      </div>
    </AppLayout>
  );
}
