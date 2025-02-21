import { HomeModel } from "../../../../types/home/home.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { homeManagementPaths } from "../../../../constants/path";
import { generateNameId } from "../../../../utils/utils";

interface HM_HomeCardProps {
  home: HomeModel;
}

export default function HM_HomeCard({ home }: HM_HomeCardProps) {
  const { addressLine, city, state, country } = home;

  const address = `${addressLine}, ${city}, ${state}, ${country}`;

  // ! Handle click house
  const navigate = useNavigate();

  const onClickHouse = () => {
    navigate({
      pathname: `${homeManagementPaths.homes}/${generateNameId({ name: home.name, id: home.id })}`,
    });
  };

  return (
    <Button
      variant="outlined"
      onClick={onClickHouse}
      className="!border-border-primary !normal-case !text-darkText !font-normal overflow-hidden w-full !rounded-lg p-2 flex flex-col !gap-2 items-center h-full"
    >
      <div className="w-[40%] pt-[40%] relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <FontAwesomeIcon
            icon={faHouse}
            className="w-full h-full !text-primaryBlue"
          />
        </div>
      </div>

      <p className="text-2xl font-medium">{home.name}</p>

      <p className="w-full text-center text-wrap flex-grow">{address}</p>
    </Button>
  );
}
