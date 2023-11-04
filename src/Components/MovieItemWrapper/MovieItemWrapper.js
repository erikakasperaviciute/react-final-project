import styles from "./MovieItemWrapper.module.scss";
import { Link } from "react-router-dom";

const MovieItemWrapper = ({ data }) => {
  const {
    id,
    title,
    description,
    year,
    genre,
    rating,
    amountOfRatings,
    director,
    posterSrc,
  } = data;

  const genreElement = genre.map((genreItem) => <li>{genreItem}</li>);

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
