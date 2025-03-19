import AppLayout from "src/layouts/AppLayout";
import HouseSchedule_AddSchedule from "./_children/HouseSchedule_AddSchedule";
import HouseSchedule_ScheduleDetail from "./_children/HouseSchedule_ScheduleDetail";
import { homeManagementPaths } from "src/constants/path";
import { useParams } from "react-router-dom";
import { getIdFromNameId } from "src/utils/utils";
import { Button } from "@mui/material";
import MuiStyles from "src/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HouseSchedule_Item from "./_children/HouseSchedule_Item";
import { _mock_HouseScheduleList } from "./_mocks/scheduleList.mock";
import useHouseScheduleStore_AddSchedule from "./_stores/useHouseSchedule_AddSchedule.store";

interface HouseScheduleProps {}

export default function HouseSchedule({}: HouseScheduleProps) {
  const { setAddingSchedule } = useHouseScheduleStore_AddSchedule();

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
        { pathName: "Schedule", url: "", isNotALink: true },
      ]}
    >
      <div className="w-full flex flex-col gap-6 py-4">
        <div className="flex justify-between w-full items-center">
          <p className="text-2xl leading-6 font-semibold text-primary-blue">
            Schedule List
          </p>

          <Button
            onClick={() => {
              setAddingSchedule(true);
            }}
            sx={MuiStyles.buttonStyles.bluePrimaryBg}
            className="!rounded-lg !text-white !font-medium flex !items-center !py-2 !px-4 !justify-center !normal-case !gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add schedule
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {_mock_HouseScheduleList.map((schedule) => {
            return <HouseSchedule_Item key={schedule.id} schedule={schedule} />;
          })}
        </div>
      </div>

      <HouseSchedule_AddSchedule />

      <HouseSchedule_ScheduleDetail />
    </AppLayout>
  );
}
