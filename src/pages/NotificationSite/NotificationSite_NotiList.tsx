import { NotificationModel } from "src/types/notification/notification.type";
import classNames from "classnames";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import NotiServices from "src/services/noti.service";
import { IDType } from "src/types/_commons/id.type";
import { toast } from "sonner";
import { get } from "lodash";

interface NotificationSite_NotiListProps {
  notificationList: NotificationModel[];
}

export default function NotificationSite_NotiList({
  notificationList,
}: NotificationSite_NotiListProps) {
  // ! handle acknow noti
  const acknowNotiMutation = NotiServices.update.useUpdateNoti();
  const toggleAcknowNoti = (notiId: IDType, isKnown: boolean) => () => {
    toast.promise(
      acknowNotiMutation.mutateAsync(
        {
          id: notiId,
          body: {
            status: isKnown ? "unack" : "ack",
          },
        },
        {
          onSuccess() {},
        }
      ),
      {
        loading: "Updating",
        success: "Updated",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (err: any) => get(err, "message", "Cannot update noti"),
        position: "top-right",
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {notificationList.map((noti, index) => {
        const isKnown = noti.status === "ack";
        return (
          <div
            key={noti.id}
            className={classNames(
              "pt-3 !border-border-primary !font-normal !justify-start !text-start !items-start flex w-full",
              {
                "border-t border-border-primary": index !== 0,
              }
            )}
          >
            <div
              className={classNames(
                "rounded-xl p-4 flex-grow flex flex-col gap-3",
                {
                  "": isKnown,
                  "bg-black/5": !isKnown,
                }
              )}
            >
              <div className="w-ful flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                  <p className="text-xl font-semibold text-primary-900 ">
                    {noti.title}
                  </p>
                  <button
                    type="button"
                    onClick={toggleAcknowNoti(noti.id, isKnown)}
                    className="rounded-full p-1 hover:bg-black/20"
                  >
                    <FontAwesomeIcon
                      icon={isKnown ? faEnvelopeOpen : faEnvelope}
                    />
                  </button>
                </div>
                <p className="text-text-secondary-700">{noti.message}</p>
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
