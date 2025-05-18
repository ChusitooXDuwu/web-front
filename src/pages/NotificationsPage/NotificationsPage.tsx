
import styles from './NotificationsPage.module.scss';
import React, { FC, useState,useEffect,useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { LocaleContext } from "../../contexts/LocaleContext";
import NotificationEntity from '../../entities/NotificationEntity';
import { FormattedMessage } from "react-intl";
import { markAllUserAsRead,markAsReadOne,getAllNotificationUser } from '../../services/NotificationService/NotificationService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
dayjs.extend(relativeTime);



const defaultId = "911047ae-2186-4fcb-973a-f6f7ff450592";

const NotificationsPage:FC<{userId?:string}>= ({userId}) => {
  const id = userId? userId:defaultId; 
  const { locale } = useContext(LocaleContext);
  useEffect(() => {
    dayjs.locale(locale || 'es'); // cambia el idioma dinámicamente
  }, [locale]);
  const [notifications, setNotifications] = useState<NotificationEntity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {data} = await getAllNotificationUser(id);
        setNotifications(data);
      } catch (error) {
        console.error("Error cargando notificaciones:");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);
  return (
    <div className={styles.notificationsPage}>
      <h2 className={styles.text_t}><FormattedMessage id="profile.notifications"/></h2>
      {notifications.length > 0 && (
        <button
              className={styles.button}
              onClick={async () => {
                try {
                  await markAllUserAsRead(id);
                  setNotifications(prev =>
                    prev.map(n => ({ ...n, isRead: true }))
                  );
                } catch (error) {
                  console.error("Error al marcar todas como leídas:", error);
                }
              }}>
              Marcar todas como leídas
        </button>
      )}
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
              <p>{notification.content}</p>
              <span>{notification.createdAt? dayjs(notification.createdAt).fromNow(): ""}</span>
            {!notification.isRead? (
                <button
                      className={styles.button}
                      onClick={async () => {
                        try {
                          await markAsReadOne(notification.id);
                          setNotifications(prev =>
                            prev.map(n =>
                              n.id === notification.id ? { ...n, isRead: true } : n
                            )
                          );
                        } catch (error) {
                          console.error("Error al marcar como leída:", error);
                        }
                      }}>
                      Marcar como leída
                    </button>
              ):
              <span className={styles.read_label}>Leída</span>}
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