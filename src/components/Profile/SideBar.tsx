import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import ProfileCard from "./ProfileCard";

import { useIntl } from "react-intl";
import { requestLogout } from "../../services/UserService/UserService";
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
  const handleLogout = async () => {
    try {
      requestLogout()
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <div className={styles.sidebar}>
      <ProfileCard {...profile} />
      {items.map((item, index) =>
        item.enabled ? (
          <Link key={index} to={item.path} className={styles.sidebar_item}>
            {item.label}
          </Link>
        ) : (
          <span
            key={index}
            className={`${styles.sidebar_item} ${styles.disabled}`}
          >
            {item.label}
          </span>
        )
      )}
      <button onClick={handleLogout} className={styles.session}>
        {formatMessage({ id: "profile.sidebar.logout" })}
      </button>
    </div>
  );
};

export default Sidebar;
