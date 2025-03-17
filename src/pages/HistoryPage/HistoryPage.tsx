import React, { FC } from 'react';
import styles from './HistoryPage.module.scss';
import {EventInterface } from "../../entities/Entities";
import { FormattedMessage } from 'react-intl';
interface HistoryPageProps {}


interface HistoryPageProps {}

const mockEvents: EventInterface[] = [
  {
    id: "1",
    startTime: new Date("2024-03-10T14:00:00"),
    endTime: new Date("2024-03-10T16:00:00"),
    currentPlayers: 4,
    maxPlayers: 5,
    sport: { id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 },
    field: {
      id: "1",
      name: "Cancha de baloncesto",
      address: "Calle 123",
      city: { id: "1", name: "Medellín" },
      sports: [{ id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 }],
      createdById: "1",
    },
    image: null,
  },
  {
    id: "2",
    startTime: new Date("2024-03-15T18:00:00"),
    endTime: new Date("2024-03-15T20:00:00"),
    currentPlayers: 8,
    maxPlayers: 10,
    sport: { id: "2", name: "Fútbol", availableFields: 3, availableBookings: 6 },
    field: {
      id: "2",
      name: "Cancha de fútbol",
      address: "Avenida 45",
      city: { id: "2", name: "Bogotá" },
      sports: [{ id: "2", name: "Fútbol", availableFields: 3, availableBookings: 6 }],
      createdById: "2",
    },
    image: null,
  },
  {
    id: "3",
    startTime: new Date("2024-03-15T18:00:00"),
    endTime: new Date("2024-03-15T20:00:00"),
    currentPlayers: 8,
    maxPlayers: 10,
    sport: { id: "2", name: "Fútbol", availableFields: 3, availableBookings: 6 },
    field: {
      id: "2",
      name: "Cancha de fútbol",
      address: "Avenida 45",
      city: { id: "2", name: "Bogotá" },
      sports: [{ id: "2", name: "Fútbol", availableFields: 3, availableBookings: 6 }],
      createdById: "3",
    },
    image: null,
  }
];

const HistoryPage: FC<HistoryPageProps> = () => (
  <div className={styles.HistoryPage}>
    <h2 className={styles.text_t}><FormattedMessage id="profile.history"/></h2>
    <div className={styles.scrollContainer}>
      <ul className={styles.eventList}>
        {mockEvents.map(event => (
          <li key={event.id} className={styles.eventCard}>
            <h3>{event.sport.name} <FormattedMessage id="profile.history.in"/> {event.field.name}</h3>
            <p><strong><FormattedMessage id="profile.history.location"/>:</strong> {event.field.address}, {event.field.city.name}</p>
            <p><strong><FormattedMessage id="profile.history.date"/>:</strong> {event.startTime.toLocaleDateString()} - {event.endTime.toLocaleTimeString()}</p>
            <p><strong><FormattedMessage id="profile.history.Players"/>:</strong> {event.currentPlayers}/{event.maxPlayers}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default HistoryPage;
