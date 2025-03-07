import React, { FC } from 'react';
import styles from './BookingCard.module.scss';

interface BookingCardProps {}

const BookingCard: FC<BookingCardProps> = () => (
  <div className={styles.BookingCard}>
    BookingCard Component
  </div>
);

export default BookingCard;
