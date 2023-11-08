import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import axios from "axios";
import { API_URL } from "../../config";
import MovieItemWrapper from "../../Components/MovieItemWrapper/MovieItemWrapper";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);
  const [newestMovies, setNewestMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopMovies = async () => {
      const { data } = await axios.get(
        `${API_URL}/movies?_sort=rating&_order=desc&_limit=5`
      );
      setTopMovies(data);
      setLoading(false);
    };
    getTopMovies();

    const getNewestMovies = async () => {
      const { data } = await axios.get(
        `${API_URL}/movies?_sort=year&_order=desc&_limit=5`
      );
      setNewestMovies(data);
      setLoading(false);
    };

    getNewestMovies();
  }, []);

  if (loading) {
    return (
      <Container>
        <BallTriangle
          wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
          color="#bd0611"
        />
      </Container>
    );
  }

  if (topMovies.length === 0 && newestMovies.length === 0) {
    return (
      <Container>
        <h1>No movies yet...</h1>
      </Container>
    );
  }

  const newestMoviesElement = newestMovies.map((movie) => (
    <MovieItemWrapper key={movie.id} data={movie} />
  ));

  const topMoviesElement =
    topMovies &&
    topMovies.map((topMovie) => (
      <div key={topMovie.id} className={styles.movieItem}>
        <Link to={`/movies/${topMovie.id}`}>
          <div className={styles.movieWrapper}>
            <div className={styles.overlayItems}>
              <h3>
                {topMovie.title} ({topMovie.year})
              </h3>
              <ul>
                {topMovie.genre.map((genreTitle, index) => (
                  <li key={index}>{genreTitle}</li>
                ))}
              </ul>

              <span className={styles.ratingWrapper}>
                {topMovie.rating}
                <span>/10</span>
              </span>
            </div>
            <img
              className={styles.mainMoviePhoto}
              src={topMovie.imageSrc}
              alt="movie poster"
            />
          </div>
        </Link>
      </div>
    ));

  return (
    <Container>
      <div className={styles.ContentWrapper}>
        <div className={styles.topMoviesContainer}>
          <h2>Top 5 rated movies</h2>
          <div className={styles.topMoviesWrapper}>{topMoviesElement}</div>
        </div>
        <div className={styles.newestMoviesContainer}>
          <h2>Newest movies</h2>
          <div className={styles.newestMoviesWrapper}>
            {newestMoviesElement}
          </div>
        </div>
        <Link to="/movies" className={styles.AllMoviesBtn}>
          See all movies
        </Link>
      </div>
    </Container>
  );
}
export default HomePage;
