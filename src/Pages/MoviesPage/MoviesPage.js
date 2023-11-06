import Container from "../../Components/Container/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import MovieItemWrapper from "../../Components/MovieItemWrapper/MovieItemWrapper";
import styles from "./MoviesPage.module.scss";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axios.get(`${API_URL}/movies`);
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (movies.length === 0) {
    return (
      <Container>
        <BallTriangle
          wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
          color="#bd0611"
        />
      </Container>
    );
  }

  const moviesListElement = movies.map((movie) => (
    <MovieItemWrapper key={movie.id} data={movie} />
  ));

  return (
    <Container>
      <div className="titleBtnWrapper">
        <h1>Movies</h1>

        <Link to="/add-movie" className="addBtn">
          Add New Movie
        </Link>
      </div>
      <div className={styles.moviesList}>{moviesListElement}</div>
    </Container>
  );
}
export default MoviesPage;
