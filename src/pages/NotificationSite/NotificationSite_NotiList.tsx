import { NotificationModel } from "src/types/notification/notification.type";
import classNames from "classnames";
import dayjs from "dayjs";

interface NotificationSite_NotiListProps {
  notificationList: NotificationModel[];
}

export default function NotificationSite_NotiList({
  notificationList,
}: NotificationSite_NotiListProps) {
  const template = {
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  };
  const mockNotificationList: NotificationModel[] = [
    {
      ...template,
      id: "1",
      title: "Device status changed",
      content: "Status of device A is changed from on to off",
    },
    {
      id: "2",
      ...template,
      title: "New review",
      content: "The Duc Nguyen Has reviewed the Dev Salon",
    },
    {
      id: "3",
      ...template,
      title: "Device status changed",
      content: "Status of device A is changed from on to off",
    },
    {
      id: "4",
      ...template,
      title: "New review",
      content: "The Duc Nguyen Has reviewed the Dev Salon",
    },
    {
      id: "5",
      ...template,
      title: "Device status changed",
      content: "Status of device A is changed from on to off",
    },
    {
      id: "6",
      ...template,
      title: "Payment successfully",
      content: "The Duc Nguyen Has reviewed the Dev Salon",
    },
    {
      id: "7",
      ...template,
      title: "New review",
      content: "The Duc Nguyen Has reviewed the Dev Salon",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockNotificationList.map((noti, index) => {
        return (
          <div
            key={noti.id}
            className={classNames(
              "!py-4 !px-5 !rounded-2xl  !border-border-primary !font-normal !justify-start !text-start !items-start flex w-full !gap-4",
              {
                "border-t border-border-primary": index !== 0,
              }
            )}
          >
            <div className="flex-grow flex flex-col gap-2">
              <div className="w-full">
                <p className="text-xl font-semibold text-primary-900">
                  {noti.title}
                </p>
                <p className="text-text-secondary-700">{noti.content}</p>
              </div>
              <p className="text-xs text-text-placeholder">
                {dayjs(noti.createdAt).format("ddd, MM/DD/YYYY h:mm A")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
