import styles from "./ProfileInfo.module.scss";
import {Image} from "react-bootstrap";
import icon from "../../../icons/User.svg";
interface FriendsListProps {
    friends: string[];
  }
  
  const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
    return (
      <div>
        <h3 className={`text-lg font-semibold ${styles.tittle}`}>Mis amigos:</h3>
        <ul className="list-none">
          {friends.map((friend, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Image src= {icon} className={styles.img} />
              <span className={styles.text}>{friend}</span>
            </li>
          ))}
        </ul>
        <button className={styles.button}>
          Agregar Amigo
        </button>
      </div>
    );
  };
  
  export default FriendsList;
  