import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import ProfileCard from "./ProfileCard";

import { FormattedMessage, useIntl } from "react-intl";
interface SidebarProps {
  items: { label: string; path: string; enabled: boolean }[];
  isOwner: boolean;
  profile: ProfileCardProps;
}
interface ProfileCardProps {
  name: string;
  imageUrl: string | null;
}
const Sidebar: React.FC<SidebarProps> = ({ items, isOwner, profile }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.sidebar}>
      <ProfileCard {...profile} />
      {items.map((item, index) => (
       item.enabled ? (
            <Link key={index} to={item.path} className={styles.sidebar_item}>
              {item.label}
            </Link>
          ) : (
            <span key={index} className={`${styles.sidebar_item} ${styles.disabled}`}>
              {item.label}
            </span>
          )
      ))}
      <Link to={isOwner? "/login":"/"} className={styles.session}>
        {isOwner
          ? formatMessage({ id: "profile.sidebar.logout" })
          : formatMessage({ id: "profile.sidebar.goback" })}
      </Link>
    </div>
  );
};

export default Sidebar;
