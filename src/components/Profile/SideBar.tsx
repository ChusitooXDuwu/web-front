import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import ProfileCard from "./ProfileCard";
interface SidebarProps {
  items: { label: string; path: string }[];
  isOwner: boolean;
  profile: ProfileCardProps;
}
interface ProfileCardProps {
  name: string;
  imageUrl: string |null;
}
const Sidebar: React.FC<SidebarProps> = ({ items,isOwner,profile }) => {
  return (

    <div className={styles.sidebar}>
      <ProfileCard {...profile} />
      {items.map((item, index) => (
        <Link key={index} to={item.path} className={styles.sidebar_item}>
          {item.label}
        </Link>

      ))}
        <Link  to={"/home"} className={styles.session}>
         {isOwner ? ("Cerrar Sesión"):("Volver")} 
        </Link>

    </div>
  );
};

export default Sidebar;