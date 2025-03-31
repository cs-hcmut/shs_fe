import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { homeManagementPaths } from "src/constants/path";
import AppLayout from "src/layouts/AppLayout";
import MuiStyles from "src/styles";
import { getIdFromNameId } from "src/utils/utils";
import HouseRule_RuleItem from "./_children/HouseRule_RuleItem";
import HouseRule_AddRule from "./_children/HouseRule_AddRule";
import useHouseRuleStores from "./_stores/HouseRule.store";
import HouseRule_RuleDetail from "./_children/HouseRule_RuleDetail";
import RuleServices from "src/services/rule.service";

interface HouseRuleProps {}

export default function HouseRule({}: HouseRuleProps) {
  const { setAddingRule: setAddingConfig } = useHouseRuleStores();

  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);

  // ! get rule list
  const { data: ruleData } = RuleServices.queries.useListRules();
  const ruleList = ruleData?.data || [];

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
            onClick={() => {
              setAddingConfig(true);
            }}
            sx={MuiStyles.buttonStyles.bluePrimaryBg}
            className="!rounded-lg !text-white !font-medium flex !items-center !py-2 !px-4 !justify-center !normal-case !gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add config
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {ruleList.map((rule) => {
            return <HouseRule_RuleItem key={rule.id} rule={rule} />;
          })}
        </div>
      </div>

      <HouseRule_AddRule />

      <HouseRule_RuleDetail />
    </AppLayout>
  );
}
