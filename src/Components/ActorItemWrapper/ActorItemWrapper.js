import styles from "./ActorItemWrapper.module.scss";
import { Link } from "react-router-dom";

const ActorItemWrapper = ({ data }) => {
  const { id, name, birthday, profilePictureSrc, ocupation, about } = data;

  const ocupationElement = ocupation.map((ocupationItem) => (
    <li>{ocupationItem}</li>
  ));

  return (
    <div className={styles.actorItem}>
      <Link to={`/actors/${id}`}>
        <div>
          <img src={profilePictureSrc} alt="actors profile" />
          <div className={styles.infoWrapper}>
            <ul>{ocupationElement}</ul>
            <h3>{name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ActorItemWrapper;
