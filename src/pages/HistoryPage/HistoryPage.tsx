import React, { FC, useEffect, useState } from 'react';
import styles from './HistoryPage.module.scss';
import { EventEntity } from "../../entities/Entities";
import { FormattedMessage } from 'react-intl';
import { getEventsByUserId } from '../../services/EventsService/EventsService';

interface HistoryPageProps {
  userId?: string
}

const defaultId = "71d9df0d-5da4-4b9d-b5da-2ff323c403b8";

const HistoryPage: FC<HistoryPageProps> = ({ userId }) => {
  const id = userId ?? defaultId;
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const rawEvents = (await getEventsByUserId(id)).data;
        console.log(rawEvents)
        console.log("raw")
        setEvents(rawEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    console.log(events)
    console.log("eventos")
  }, []);

  return (
    <div className={styles.HistoryPage}>
      <h2 className={styles.text_t}>
        <FormattedMessage id="profile.history" />
      </h2>

      {loading ? (
        <p><FormattedMessage id="loading" defaultMessage="Loading..." /></p>
      ) : error ? (
        <p><FormattedMessage id="error.loading" defaultMessage="Error loading events." /></p>
      ) : events.length === 0 ? (
        <p><FormattedMessage id="profile.history.none" defaultMessage="No history available." /></p>
      ) : (
        <div className={styles.scrollContainer}>
          <ul className={styles.eventList}>
            {events.map(event =>
            (

              <li key={event.id} className={styles.eventCard}>
                <h3>
                  {event.sport.name ?? '⚠️'} <FormattedMessage id="profile.history.in" /> {event.field.fieldName ?? '⚠️'}
                </h3>
                <p>
                  <strong><FormattedMessage id="profile.history.location" />:</strong>{' '}
                  {event.field.fieldName ?? '-'}, {event.field.cityName ?? '-'}
                </p>
                <p>
                  <strong><FormattedMessage id="profile.history.date" />:</strong>{' '}
                  {event.startTime.toLocaleDateString()} - {event.endTime.toLocaleTimeString()}
                </p>
                <p>
                  <strong><FormattedMessage id="profile.history.Players" />:</strong>{' '}
                  {event.currentPlayers}/{event.maxPlayers}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;