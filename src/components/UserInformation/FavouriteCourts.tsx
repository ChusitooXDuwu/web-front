import styles from "./ProfileInfo.module.scss";
import { ReactComponent as Icon } from "../../icons/courtIcon.svg";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserFieldInterface } from "../../entities/user/UserFieldEntity";
interface FavoriteCourtsProps {
  courts: UserFieldInterface[];
  isCurrentUser?: boolean;
}

const FavoriteCourts: React.FC<FavoriteCourtsProps> = ({
  courts,
  isCurrentUser,
}) => {
  return (
    <div>
      <h3 className={`text-lg font-semibold text-yellow-600 ${styles.tittle}`}>
        <FormattedMessage id="profile.content.favoriteCourts" />
      </h3>
      {isCurrentUser && (
        <Link to={"/fields"}>
          <Button variant="primary">
            <i className="bi bi-search me-2"></i>
            <FormattedMessage id="browse.fields" />
          </Button>
        </Link>
      )}
      <ul>
        {courts.map((court, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Icon
              className={[styles.image, "my-2 me-2"].join(" ")}
              style={{ fill: "#E99E14" }}
              fill={"#E99E14"}
            />
            <span className={styles.text}>{court.fieldName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCourts;
