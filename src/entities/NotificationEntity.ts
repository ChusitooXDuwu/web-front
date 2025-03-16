export interface NotificationEntity {
  id: string;
  type: "info" | "warning" | "success" | "error";
  message: string;
  timestamp: Date;
}

