import React, { FC } from 'react';
import styles from './ProfilePage.module.scss';

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => (
  <div className={styles.ProfilePage}>
    ProfilePage Component
  </div>
);

export default ProfilePage;
