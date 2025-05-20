import styles from "./ProfileInfo.module.scss";
import { Button, Image } from "react-bootstrap";
import icon from "../../icons/User.svg";
import { FormattedMessage } from "react-intl";
import { UserEntityDto } from "../../entities/user/UserEntity";
import { Link } from "react-router-dom";
interface FriendsListProps {
  friends: UserEntityDto[];
  handleShowFriendsModal: (() => void) | null;
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
      {handleShowFriendsModal && (
        <Button
          variant="primary"
          onClick={handleShowFriendsModal}
          className="my-2"
        >
          <i className="bi bi-plus-lg"></i>
          <FormattedMessage id="profile.content.friendList.addfriends" />
        </Button>
      )}
      <ul className="list-none">
        {friends.map((friend, index) => (
          <Link to={`/users/${friend.id}`}>
            <li key={index} className="flex items-center space-x-2 my-2">
              <Image src={icon} className={styles.img} />
              <span className={styles.text}>
                {friend.givenName} {friend.lastName}{" "}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
