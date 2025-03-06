import React, { FC } from 'react';
import styles from './BookingsPage.module.scss';

interface BookingsPageProps {}

const BookingsPage: FC<BookingsPageProps> = () => (
  <div className={styles.BookingsPage}>
    BookingsPage Component
  </div>
);

export default BookingsPage;
