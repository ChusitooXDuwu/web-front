import styles from "./ProfileInfo.module.scss";
import { ReactComponent as Icon } from "../../icons/sportsIcon.svg";
import { FormattedMessage } from "react-intl";

interface SportsListProps {
  sports: string[];
}

const SportsList: React.FC<SportsListProps> = ({ sports }) => {
  return (
    <div>
      <h3 className={`text-lg font-semibold text-yellow-600 ${styles.tittle}`}>
        <FormattedMessage id={"profile.content.sportList"} />
      </h3>
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
