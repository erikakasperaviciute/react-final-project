import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";

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

  console.log(movie);
  console.log(actors);

  const storyLineElement = movie.description && (
    <div>
      <h2>Storyline</h2>
      <p>{movie.description}</p>
    </div>
  );

  const ratingElement = movie.rating && (
    <div>
      <span>{movie.rating}/10</span>
    </div>
  );

  const genreElement = movie.genre.map((genreTitle) => <li>{genreTitle}</li>);

  let directorElementTitle = "";
  if (movie.director.length === 1) {
    directorElementTitle = "Director:";
  } else if (movie.director.length > 1) {
    directorElementTitle = "Directors:";
  }

  const directorElement = movie.director.map((movieDirector) => (
    <span>{movieDirector}</span>
  ));

  const actorsElement = actors.map((actor) => (
    <div key={actor.id}>
      <img src={actor.actor.profilePictureSrc} alt={actor.actor.name} />
      <h3>{actor.actor.name}</h3>
    </div>
  ));

  return (
    <Container>
      <h1 style={{ color: "whitesmoke" }}>
        {movie.title} ({movie.year})
      </h1>
      {ratingElement}
      <img src={movie.imageSrc} alt="movie poster" />
      <div>
        {directorElementTitle}
        {directorElement}
      </div>
      {storyLineElement}
      <ul>{genreElement}</ul>
      {actorsElement}
    </Container>
  );
}

export default MoviePage;
