import styles from "./ProfileInfo.module.scss";
import { FormattedMessage } from "react-intl";
import { UserEntityDto } from "../../entities/user/UserEntity";
interface AboutMeProps {
  text: string;
  since: Date | null;
  profile: UserEntityDto;
}

const AboutMe: React.FC<AboutMeProps> = ({ text, since, profile }) => {
  return (
    <div className="mt-4">
      <h3 className={`text-yellow-600 font-semibold ${styles.text}`}>
        <FormattedMessage id="profile.content.aboutme" />:
      </h3>
      <p className="w-full max-w-full border border-gray-300 p-2">{text}</p>
      <p className={styles.text}>
        <FormattedMessage id="profile.content.aboutme.since" />{" "}
        {since?.toDateString() || "?"}
      </p>
      <div className="mt-2">
        <p className={`${styles.text} flex items-center`}>
          <span className="font-semibold mr-2">
            <FormattedMessage id="profile.content.aboutme.email" />{" "}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="text-blue-600 hover:underline"
          >
            {profile.email}
          </a>
        </p>
        <p className={`${styles.text} flex items-center mt-1`}>
          <span className="font-semibold mr-2">
            <FormattedMessage id="profile.content.aboutme.phone" />{" "}
          </span>
          <a
            href={`tel:${profile.phoneNumber}`}
            className="text-blue-600 hover:underline"
          >
            {profile.phoneNumber}
          </a>
        </p>
        <p className={`${styles.text} flex items-center mt-1`}>
          <span className="font-semibold mr-2">
            <FormattedMessage id="profile.content.aboutme.gender" />{" "}
          </span>
          <span>{profile.gender}</span>
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
