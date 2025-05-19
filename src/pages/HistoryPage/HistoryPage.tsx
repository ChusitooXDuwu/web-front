import React, { FC, useEffect, useState } from 'react';
import styles from './HistoryPage.module.scss';
import { EventEntity } from "../../entities/Entities";
import { FormattedMessage } from 'react-intl';
import { getEventsByUserId } from '../../services/EventsService/EventsService';

interface HistoryPageProps {
  userId?: string
}

const defaultId = "8016d59a-dc9d-4a4d-bd39-201aa2a34f19";
const HistoryPage: FC<HistoryPageProps> = ({ userId }) => {
  const id = userId ? userId : defaultId;
  const [events, setEvents] = useState<EventEntity[]>([])
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const rawEvents = (await getEventsByUserId(id)).data;
        const eventsFromApi: EventEntity[] = rawEvents.flatMap((item: any) => {
          try {
            return [EventEntity.fromApi(item)];
          } catch (error) {
            console.warn("Invalid event data", error);
            return [];
          }
        });;
        setEvents(eventsFromApi);
      }
      catch (error) {
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className={styles.HistoryPage}>
      <h2 className={styles.text_t}><FormattedMessage id="profile.history" /></h2>
      <div className={styles.scrollContainer}>
        <ul className={styles.eventList}>
          {events.map(event => (
            <li key={event.id} className={styles.eventCard}>
              <h3>{event.sport.name} <FormattedMessage id="profile.history.in" /> {event.field.name}</h3>
              <p><strong><FormattedMessage id="profile.history.location" />:</strong> {event.field.address}, {event.field.city.name}</p>
              <p><strong><FormattedMessage id="profile.history.date" />:</strong> {event.startTime.toLocaleDateString()} - {event.endTime.toLocaleTimeString()}</p>
              <p><strong><FormattedMessage id="profile.history.Players" />:</strong> {event.currentPlayers}/{event.maxPlayers}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};
export default HistoryPage;
