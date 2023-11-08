import { Link } from "react-router-dom";
import Container from "../../Components/Container/Container";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <Container>
      <div className={styles.contentWrapper}>
        <h1>404</h1>
        <h2>You have found a secret place.</h2>
        <p>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>

        <Link to="/" className={styles.backHomeBtn}>
          Take me back to home page
        </Link>
      </div>
    </Container>
  );
}
export default NotFoundPage;
