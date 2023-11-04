import Container from "../../Components/Container/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import MovieItemWrapper from "../../Components/MovieItemWrapper/MovieItemWrapper";
import styles from "./MoviesPage.module.scss";

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axios.get(`${API_URL}/movies`);
    setMovies(data);
  };

  console.log(movies);

  useEffect(() => {
    getMovies();
  }, []);

  if (movies.length === 0) {
    return (
      <Container>
        <span>Loading</span>
      </Container>
    );
  }

  const moviesListElement = movies.map((movie) => (
    <MovieItemWrapper key={movie.id} data={movie} />
  ));

  return (
    <Container>
      <h1 style={{ color: "whitesmoke" }}>Movies Page</h1>
      <div className={styles.moviesList}>{moviesListElement}</div>
    </Container>
  );
}
export default MoviesPage;
