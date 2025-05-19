import { Container, Image } from "react-bootstrap";
import styles from "./ProfileCard.module.scss";

interface ProfileCardProps {
  name: string;
  imageUrl: string | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, imageUrl }) => {
  return (
    <Container
      fluid
      className="text-center mt-4 flex flex-col items-center md:flex-row md:items-center md:gap-4"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          roundedCircle
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
          className="shadow-lgmx-auto"
        />
      ) : (
        <p>Imagen</p>
      )}

      <h3 className={`mt-3 text-warning ${styles.name}`}>{name}</h3>
    </Container>
  );
};

export default ProfileCard;
