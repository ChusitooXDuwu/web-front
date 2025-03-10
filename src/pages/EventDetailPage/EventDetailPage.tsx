import React, { FC } from 'react';
import styles from './EventDetailPage.module.scss';

interface EventDetailPageProps {}

const EventDetailPage: FC<EventDetailPageProps> = () => (
  <div className={styles.EventDetailPage}>
    EventDetailPage Component
  </div>
);

export default EventDetailPage;
