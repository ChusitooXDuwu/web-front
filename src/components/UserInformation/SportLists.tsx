import styles from "./ProfileInfo.module.scss";
import { ReactComponent as Icon } from "../../icons/sportsIcon.svg";
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";

interface SportsListProps {
  sports: string[];
  isCurrentUser?: boolean;
  openModal: (() => void) | null;
}

const SportsList: React.FC<SportsListProps> = ({
  sports,
  isCurrentUser,
  openModal,
}) => {
  return (
    <div>
      <h3 className={`text-lg font-semibold text-yellow-600 ${styles.tittle}`}>
        <FormattedMessage id={"profile.content.sportList"} />
      </h3>
      {openModal !== null && (
        <Button variant="primary" onClick={(e) => openModal()}>
          <i className="bi bi-search me-2"></i>
          <FormattedMessage id="browse.sports" />
        </Button>
      )}
      <ul className={"flex items-center space-x-2"}>
        {sports.map((sport, index) => (
          <li key={index}>
            <Icon
              className={styles.image}
              style={{ fill: "#E99E14" }}
              fill={"#E99E14"}
            />
            <span className={styles.text}>{sport}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsList;
