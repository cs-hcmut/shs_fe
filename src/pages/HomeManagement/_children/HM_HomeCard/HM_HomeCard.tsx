import { HomeModel } from "../../../../types/home/home.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

interface HM_HomeCardProps {
  home: HomeModel;
}

export default function HM_HomeCard({ home }: HM_HomeCardProps) {
  const { addressLine, city, state, country } = home;

  const address = `${addressLine}, ${city}, ${state}, ${country}`;

  return (
    <Button
      variant="outlined"
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
