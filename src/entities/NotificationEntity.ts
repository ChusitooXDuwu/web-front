import BaseEntity from "./BaseEntity";
import UserEntity from "./user/UserEntity";

export default interface NotificationEntity extends BaseEntity {
  content: string;
  isRead: boolean;
  type: "info" | "warning" | "success" | "error";
  user?: UserEntity;
}
