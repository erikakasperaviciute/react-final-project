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
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const { data } = await axios.get(`${API_URL}/movies?_sort=id&_order=desc`);
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
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

  if (movies.length === 0) {
    return (
      <Container>
        <div className="titleBtnWrapper">
          <h1>No movies yet...</h1>
          <Link to="/add-movie" className="addBtn">
            Add New Movie
          </Link>
        </div>
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
