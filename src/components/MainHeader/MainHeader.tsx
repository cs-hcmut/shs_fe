import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import mainPath from "../../constants/path";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div className="flex justify-end items-center text-lg h-full p-6 shadow-gray-400 shadow-sm bg-white">
      <div className="flex gap-6 items-center justify-center w-full">
        <NavLink to={mainPath.home}>
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-text w-8 h-8 hover:text-primary-blue"
          />
        </NavLink>

        <NavLink
          to={isAuthenticated ? mainPath.userprofile : mainPath.login}
          className="text-gray-text"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="w-8 h-8 hover:text-primary-blue"
          />
        </NavLink>
      </div>
    </div>
  );
}
