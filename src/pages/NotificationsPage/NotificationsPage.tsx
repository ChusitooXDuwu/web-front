
import styles from './NotificationsPage.module.scss';
import React, { FC, useState } from "react";
import { NotificationEntity } from "../../entities/NotificationEntity";
import { FormattedMessage } from "react-intl";
const NotificationsPage: FC = () => {
  const [notifications, setNotifications] = useState<NotificationEntity[]>([
    {
      id: "1",
      type: "info",
      message: "Tu reserva ha sido confirmada.",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "warning",
      message: "Tu suscripción está por vencer.",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "success",
      message: "Tu inscrición esta lista.",
      timestamp: new Date(),
    },
  ]);

  return (
    <div className={styles.notificationsPage}>
      <h2 className={styles.text_t}><FormattedMessage id="profile.notifications"/></h2>
      <div className={styles.notificationsContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className={`${styles.notification} ${styles[notification.type]}`}>
              <p>{notification.message}</p>
              <span>{notification.timestamp.toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p><FormattedMessage id="profile.notifications.none"/></p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;