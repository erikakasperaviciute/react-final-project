import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import styles from "./ActorPage.module.scss";

function ActorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  console.log(movies);

  useEffect(() => {
    const getActor = async () => {
      const { data } = await axios(
        `${API_URL}/actors/${id}?_embed=actorMovies`
      );
      setActor(data);
    };
    getActor();

    const getActorMovies = async () => {
      const { data } = await axios(
        `${API_URL}/actorMovies?actorId=${id}&_expand=movie`
      );
      setMovies(data);
    };
    getActorMovies();
  }, [id]);

  if (!actor) {
    return <h2>Loading</h2>;
  }

  const profilePicElement = actor.profilePictureSrc && (
    <img src={actor.profilePictureSrc} alt={actor.name} />
  );

  const aboutElement = actor.about && (
    <div>
      <h2>About</h2>
      <p>{actor.about}</p>
    </div>
  );

  const ocupationElement = actor.ocupation.map((ocupationItem, index) => (
    <li key={actor.ocupation[index]}>{ocupationItem}</li>
  ));

  const moviesElement = movies.map((movie) => (
    <Link key={movie.id} to={`/movies/${movie.movieId}`}>
      <div className={styles.movieItem}>
        <img src={movie.movie.posterSrc} alt={movie.movie.title} />
        <span>⭐{movie.movie.rating}</span>
        <h3>{movie.movie.title}</h3>
      </div>
    </Link>
  ));

  return (
    <Container>
      <div className={styles.actorWrapper}>
        <h1>{actor.name}</h1>
        <div className={styles.actorMainInfoWrapper}>
          {profilePicElement}
          <div>
            <ul>{ocupationElement}</ul>
            <span>Born on: {actor.birthday}</span>

            {aboutElement}
          </div>
        </div>

        <h2>Played at</h2>
        <div className={styles.moviesWrapper}>{moviesElement}</div>
      </div>
    </Container>
  );
}

export default ActorPage;
