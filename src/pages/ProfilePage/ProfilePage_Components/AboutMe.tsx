import styles from "./ProfileInfo.module.scss";
import { FormattedMessage } from "react-intl";
interface AboutMeProps {
    text: string;
    since:string;
  }
  
  const AboutMe: React.FC<AboutMeProps> = ({ text , since }) => {
    return (
      <div className="mt-4">
        <h3 className={`text-yellow-600 font-semibold ${styles.text}`}><FormattedMessage id="profile.content.aboutme"/>:</h3>
        <p className="w-full max-w-full border border-gray-300 rounded-md  resize-none p-2 bg-green-100 resize-y min-h-[40px] sm:min-h-[60px] md:min-h-[80px]" >
          {text}
        </p>
        <p className={styles.text}><FormattedMessage id="profile.content.aboutme.since"/> {since}</p>
      </div>
    );
  };
  
  export default AboutMe;
  