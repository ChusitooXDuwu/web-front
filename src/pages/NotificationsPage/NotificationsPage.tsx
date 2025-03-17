
import styles from './NotificationsPage.module.scss';
import React, { FC, useState,useEffect,useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { LocaleContext } from "../../contexts/LocaleContext";

import { FormattedMessage } from "react-intl";
export interface NotificationEntity {
  id: string;
  type: "info" | "warning" | "success" | "error";
  message: string;
  timestamp: Date;
}
const fallbackNotifications: NotificationEntity[] = [
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
    message: "Tu inscripción está lista.",
    timestamp: new Date(),
  },
];

const NotificationsPage: FC = () => {
  const { locale } = useContext(LocaleContext);
  const [notifications, setNotifications] = useState<NotificationEntity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://my.api.mockaroo.com/notifications_sport_hub.json?key=d49a1240");
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        
        
        const formattedData = data.map((item: any) => ({
          id: item.id,
          type: item.type,
          message: item.message,
          timestamp: new Date(item.timeStamp).toLocaleTimeString(locale, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: undefined,  // Evita mostrar la hora
            minute: undefined,
            second: undefined,
            hour12: undefined, // Evita AM/PM en algunos casos
          }),
        }));
        

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error cargando notificaciones:", error);
        setNotifications(fallbackNotifications);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <div className={styles.notificationsPage}>
      <h2 className={styles.text_t}><FormattedMessage id="profile.notifications"/></h2>
      <div className={styles.notificationsContainer}>
      {loading ? (
          <>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
          </>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className={`${styles.notification} ${styles[notification.type]}`}>
              <p>{notification.message}</p>
              <span>{notification.timestamp.toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p>
            <FormattedMessage id="profile.notifications.none" />
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;