import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import styles from "./MoviePage.module.scss";

function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios(
        `${API_URL}/movies/${id}?_embed=actorMovies`
      );
      setMovie(data);
    };
    getMovie();

    const getMovieActors = async () => {
      const { data } = await axios(
        `${API_URL}/actorMovies?movieId=${id}&_expand=actor`
      );
      setActors(data);
    };
    getMovieActors();
  }, [id]);

  if (!movie) {
    return <h2>Loading</h2>;
  }

  const storyLineElement = movie.description && (
    <div>
      <h2>Storyline</h2>
      <p>{movie.description}</p>
    </div>
  );

  const ratingElement = movie.rating && (
    <span className={styles.ratingWrapper}>
      {movie.rating}
      <span>/10</span>
    </span>
  );

  const genreElement = movie.genre.map((genreTitle, index) => (
    <li key={movie.genre[index]}>{genreTitle}</li>
  ));

  let directorElementTitle = "";
  if (movie.director.length === 1) {
    directorElementTitle = "Director:";
  } else if (movie.director.length > 1) {
    directorElementTitle = "Directors:";
  }

  const directorElement = movie.director.map((movieDirector, index) => (
    <li key={movie.director[index]}>{movieDirector}</li>
  ));

  const actorsElement = actors.map((actor) => (
    <Link key={actor.id} to={`/actors/${actor.actorId}`}>
      <div>
        <img src={actor.actor.profilePictureSrc} alt={actor.actor.name} />
        <h3>{actor.actor.name}</h3>
      </div>
    </Link>
  ));

  return (
    <Container>
      <div className={styles.movieWrapper}>
        <div className={styles.overlayItems}>
          <h1 style={{ color: "whitesmoke" }}>
            {movie.title} ({movie.year})
          </h1>
          <ul>{genreElement}</ul>
          {ratingElement}
        </div>
        <img
          className={styles.mainMoviePhoto}
          src={movie.imageSrc}
          alt="movie poster"
        />
        <div className={styles.movieInfoWrapper}>
          {storyLineElement}
          <div className={styles.directorWrapper}>
            {directorElementTitle}
            <ul>{directorElement}</ul>
          </div>
        </div>
        <h2>Stars</h2>
        <div className={styles.actorsWrapper}>{actorsElement}</div>
      </div>
    </Container>
  );
}

export default MoviePage;
