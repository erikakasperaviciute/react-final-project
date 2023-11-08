import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import styles from "./ActorPage.module.scss";
import { toast } from "react-toastify";
import firstLetterUpperCase from "../../utils";
import { BallTriangle } from "react-loader-spinner";
import { GoTrash, GoPencil } from "react-icons/go";

function ActorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

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
    return (
      <Container>
        <BallTriangle
          wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
          color="#bd0611"
        />
      </Container>
    );
  }

  const deleteActorHandler = async () => {
    const res = await axios.delete(`${API_URL}/actors/${id}`);
    navigate("/actors");
    toast.success("Actor was successfully deleted");
  };

  const profilePicElement = actor.profilePictureSrc && (
    <img src={actor.profilePictureSrc} alt={actor.name} />
  );

  const aboutElement = actor.about && (
    <div>
      <h2>About</h2>
      <p>{actor.about}</p>
    </div>
  );

  const ocupationElement =
    actor.ocupation &&
    actor.ocupation.map((ocupationItem, index) => (
      <li key={actor.ocupation[index]}>
        {firstLetterUpperCase(ocupationItem)}
      </li>
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
        <div className={styles.btnAndNameWrapper}>
          <h1>{actor.name}</h1>
          <div className={styles.btnWrapper}>
            <button className={styles.deleteBtn} onClick={deleteActorHandler}>
              <GoTrash />
            </button>
            <Link className={styles.editBtn} to={`/edit-actor/${id}`}>
              <GoPencil />
            </Link>
          </div>
        </div>
        <div className={styles.actorMainInfoWrapper}>
          {profilePicElement}
          <div>
            <ul>{ocupationElement}</ul>
            {actor.birthday && <span>Born on: {actor.birthday}</span>}
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
