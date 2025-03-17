import styles from "./ProfileInfo.module.scss";
import {Image} from "react-bootstrap";
import {ReactComponent as Icon} from "../../../icons/courtIcon.svg";
import { FormattedMessage } from "react-intl";
interface FavoriteCourtsProps {
    courts: string[];
  }
  
  const FavoriteCourts: React.FC<FavoriteCourtsProps> = ({ courts }) => {
    return (
      <div>
        <h3 className={ `text-lg font-semibold text-yellow-600 ${styles.tittle}`} ><FormattedMessage id= "profile.content.favoriteCourts"/>:</h3>
        <ul>
          {courts.map((court, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon className={styles.image} style={{ fill: "#E99E14" }} fill={"#E99E14"}/>
              <span  className={styles.text} >{court}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FavoriteCourts;
  