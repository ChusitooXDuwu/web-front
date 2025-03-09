import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";
function NotFoundPage() {
  return (
    <div className={styles.not_found_container}>
      <h1 className={`display-1 ${styles.not_found_title}`}>
        404 Página no encontrada
      </h1>
      <p className={`display-4 ${styles.not_found_text}`}>
        La página que estás buscando no existe o ha sido movida.{" "}
        <Link to={"/"}>Volver a Inicio</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
