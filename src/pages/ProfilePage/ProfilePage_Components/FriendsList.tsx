import styles from "./ProfileInfo.module.scss";
import {Image} from "react-bootstrap";
import icon from "../../../icons/User.svg";
import { FormattedMessage} from "react-intl";
interface FriendsListProps {
    friends: string[];
  }
  
  const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
    return (
      <div>
        <h3 className={`text-lg font-semibold ${styles.tittle}`}> <FormattedMessage id="profile.content.friendList.friends" />:</h3>
        <ul className="list-none">
          {friends.map((friend, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Image src= {icon} className={styles.img} />
              <span className={styles.text}>{friend}</span>
            </li>
          ))}
        </ul>
        <button className={styles.button}>
        <FormattedMessage id="profile.content.friendList.addfriends" />
        </button>
      </div>
    );
  };
  
  export default FriendsList;
  