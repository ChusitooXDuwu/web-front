import styles from "./ProfileInfo.module.scss";
import { Button, Image } from "react-bootstrap";
import icon from "../../../icons/User.svg";
import { FormattedMessage } from "react-intl";
interface FriendsListProps {
  friends: string[];
  handleShowFriendsModal: () => void;
}

const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  handleShowFriendsModal,
}) => {
  return (
    <div>
      <h3 className={`text-lg font-semibold ${styles.tittle}`}>
        {" "}
        <FormattedMessage id="profile.content.friendList.friends" />
      </h3>
      <Button variant="primary" onClick={handleShowFriendsModal}>
        <i className="bi bi-plus-lg"></i>
        <FormattedMessage id="profile.content.friendList.addfriends" />
      </Button>
      <ul className="list-none">
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Image src={icon} className={styles.img} />
            <span className={styles.text}>{friend}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
