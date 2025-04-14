import { IDType } from "../_commons/id.type";

export type Notification_Type = "notify" | "alert";

export type Notification_Status = "ack" | "unack";

export interface NotificationModel {
  id: IDType;
  status: Notification_Status;
  title: string;
  message: string;
  userId: IDType;
  type: Notification_Type;
  createdAt: string;
  updatedAt: string;
}

export function parseNotificationMessage(
  jsonString: string
): NotificationModel {
  try {
    // Parse the JSON string
    const parsedData = JSON.parse(jsonString);

    // Validate and convert to appropriate enum types
    const notification: NotificationModel = {
      id: parsedData.id,
      status: parsedData.status as Notification_Status,
      title: parsedData.title,
      message: parsedData.message,
      userId: parsedData.userId,
      type: parsedData.type as Notification_Type,
      createdAt: parsedData.createdAt,
      updatedAt: parsedData.updatedAt,
    };

    return notification;
  } catch (error) {
    console.error("Failed to parse notification message:", error);
    throw new Error("Invalid notification message format");
  }
}
