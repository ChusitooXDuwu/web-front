import React, { FC } from 'react';
import styles from './EventsPage.module.scss';

interface EventsPageProps {}

const EventsPage: FC<EventsPageProps> = () => (
  <div className={styles.EventsPage}>
    EventsPage Component
  </div>
);

export default EventsPage;
