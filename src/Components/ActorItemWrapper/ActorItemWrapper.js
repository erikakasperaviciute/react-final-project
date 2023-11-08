import styles from "./ActorItemWrapper.module.scss";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";

const ActorItemWrapper = ({ data }) => {
  const { id, name, profilePictureSrc, ocupation } = data;

  const ocupationElement =
    ocupation &&
    ocupation.map((ocupationItem, index) => (
      <li key={index}>{firstLetterUpperCase(ocupationItem)}</li>
    ));

  return (
    <div className={styles.actorItem}>
      <Link to={`/actors/${id}`}>
        <div>
          {profilePictureSrc && (
            <img src={profilePictureSrc} alt="actors profile" />
          )}

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
