import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import mainPath, { homeManagementPaths } from "../../constants/path";
import { useContext, useMemo } from "react";
import { AppContext } from "../../contexts/app.context";
import NotificationSite from "src/pages/NotificationSite";
import useNotificationSiteStore from "src/pages/NotificationSite/_stores/NotificationSite.store";
import NotiServices from "src/services/noti.service";
import { Badge } from "@mui/material";
import classNames from "classnames";

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext);

  const { setShowingNotificationModal } = useNotificationSiteStore();

  // ! get notification
  const { data: notiData } = NotiServices.queries.useListNotis({});
  const notiList = useMemo(() => notiData?.data || [], [notiData]);

  const unAckNotiCount = notiList.reduce(
    (count, noti) => count + (noti.status === "unack" ? 1 : 0),
    0
  );

  return (
    <div
      className={classNames(
        "flex justify-center items-center text-lg h-full p-6 gap-6 shadow-gray-400 shadow-sm bg-white",
        {}
      )}
    >
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

        {!isAuthenticated && (
          <NavLink to={mainPath.login}>
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-text w-8 h-8 hover:text-primary-blue"
            />
          </NavLink>
        )}

        {isAuthenticated && (
          <button
            type="button"
            onClick={() => {
              setShowingNotificationModal(true);
            }}
          >
            <Badge badgeContent={unAckNotiCount} color="error">
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-text w-8 h-8 hover:text-primary-blue"
              />
            </Badge>
          </button>
        )}
        {isAuthenticated && (
          <button>
            <FontAwesomeIcon
              icon={faSignOut}
              className="text-gray-text w-8 h-8 hover:text-primary-blue"
            />
          </button>
        )}
      </div>

      <NotificationSite />
    </div>
  );
}
