import styles from "./MovieItemWrapper.module.scss";
import { Link } from "react-router-dom";

const MovieItemWrapper = ({ data }) => {
  const { id, title, genre, rating, posterSrc } = data;

  const genreElement = genre.map((genreItem, index) => (
    <li key={index}>{genreItem}</li>
  ));

  return (
    <div className={styles.movieItem}>
      <Link to={`/movies/${id}`}>
        <div className={styles.movieImg}>
          <img src={posterSrc} alt="movie poster" />
          <span>⭐{rating}</span>
        </div>
        <div className={styles.titleWrapper}>
          <h3>{title}</h3>
          <ul>{genreElement}</ul>
        </div>
      </Link>
    </div>
  );
};

export default MovieItemWrapper;
