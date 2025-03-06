import React, { FC } from 'react';
import styles from './SportsPage.module.scss';

interface SportsPageProps {}

const SportsPage: FC<SportsPageProps> = () => (
  <div className={styles.SportsPage}>
    SportsPage Component
  </div>
);

export default SportsPage;
