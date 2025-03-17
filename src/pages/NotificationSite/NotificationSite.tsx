import classNames from "classnames";
import React from "react";
import RightSideDrawer from "src/components/_common/RightSideDrawer";
import useNotificationSiteStore from "./_stores/NotificationSite.store";
import NotificationSite_NotiList from "./NotificationSite_NotiList";

interface NotificationSiteProps {}

export default function NotificationSite({}: NotificationSiteProps) {
  const { showingNotificationModal, setShowingNotificationModal } =
    useNotificationSiteStore();

  const onClose = () => {
    setShowingNotificationModal(false);
  };

  return (
    <RightSideDrawer
      open={showingNotificationModal}
      onClose={onClose}
      paperStyles={{
        top: 0,
        minWidth: "900px",
      }}
      shouldHaveEqualLevelWithHeader
    >
      <div className={classNames("w-full h-full flex-grow flex flex-col p-4")}>
        <div className="w-full flex justify-between items-center gap-1 p-4 border-b border-border-primary">
          <p className=" font-semibold text-xl">Notification</p>
        </div>
        {true ? (
          <div className="w-full flex flex-col">
            <NotificationSite_NotiList notificationList={[]} />
          </div>
        ) : (
          <div className="h-full py-6 flex flex-col flex-grow gap-4 items-center justify-center">
            <p className="text-[#B6BFCC] text-sm">No notification</p>
          </div>
        )}
      </div>
    </RightSideDrawer>
  );
}
