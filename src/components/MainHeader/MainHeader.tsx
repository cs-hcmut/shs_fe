import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import mainPath, { homeManagementPaths } from "../../constants/path";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import NotificationSite from "src/pages/NotificationSite";
import useNotificationSiteStore from "src/pages/NotificationSite/_stores/NotificationSite.store";

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext);

  const { setShowingNotificationModal } = useNotificationSiteStore();

  return (
    <div className="flex justify-center items-center text-lg h-full p-6 gap-6 shadow-gray-400 shadow-sm bg-white">
      <div className="w-1/2">
        <NavLink to={mainPath.home}>
          <p className="shrink-0 flex-grow text-3xl text-start font-semibold text-primaryBlue">
            Smart Home System
          </p>
        </NavLink>
      </div>
      <div className="flex w-1/2 gap-6 items-center justify-end">
        <NavLink to={homeManagementPaths.homes}>
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-text w-8 h-8 hover:text-primary-blue"
          />
        </NavLink>

        <button
          type="button"
          onClick={() => {
            setShowingNotificationModal(true);
          }}
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-gray-text w-8 h-8 hover:text-primary-blue"
          />
        </button>
      </div>

      <NotificationSite />
    </div>
  );
}
