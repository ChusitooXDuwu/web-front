import styles from "./ProfileInfo.module.scss";

interface AboutMeProps {
    text: string;
    since:string;
  }
  
  const AboutMe: React.FC<AboutMeProps> = ({ text , since }) => {
    return (
      <div className="mt-4">
        <h3 className={`text-yellow-600 font-semibold ${styles.text}`}>Sobre mí:</h3>
        <textarea
          value={text}
          readOnly
          className="w-full max-w-full border border-gray-300 rounded-md  resize-none p-2 bg-green-100 resize-y min-h-[40px] sm:min-h-[60px] md:min-h-[80px]"
        />
        <p className={styles.text}>Jugador desde {since}</p>
      </div>
    );
  };
  
  export default AboutMe;
  