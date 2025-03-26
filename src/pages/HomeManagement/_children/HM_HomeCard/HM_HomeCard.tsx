import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { homeManagementPaths } from "../../../../constants/path";
import { generateNameId } from "../../../../utils/utils";
import { EstateModel } from "src/types/estate/estate.type";

interface HM_HomeCardProps {
  estate: EstateModel;
}

export default function HM_HomeCard({ estate }: HM_HomeCardProps) {
  const { address, name } = estate;

  // ! Handle click house
  const navigate = useNavigate();

  const onClickHouse = () => {
    navigate({
      pathname: `${homeManagementPaths.homes}/${generateNameId({ name: estate.name, id: estate.id })}`,
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

      <p className="text-2xl font-medium">{name}</p>

      <p className="w-full text-center text-wrap flex-grow">{address}</p>
    </Button>
  );
}
