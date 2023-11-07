import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import styles from "./MoviePage.module.scss";
import ActorSelect from "../../Components/ActorSelect/ActorSelect";
import { toast } from "react-toastify";
import firstLetterUpperCase from "../../utils";
import { BallTriangle } from "react-loader-spinner";
import { FormHelperText, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import isUrl from "is-url";
import { GoTrash, GoPencil } from "react-icons/go";

const theme = createTheme({
  palette: {
    primary: brown,
  },
  typography: {
    fontFamily: "Inter",
  },
});

function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const [trailerTitle, setTrailerTitle] = useState("");
  const [trailerSrc, setTrailerSrc] = useState("");

  const [trailerTitleError, setTrailerTitleError] = useState("");
  const [trailerSrcError, setTrailerSrcError] = useState("");

  const trailerTitleHandler = (e) => {
    const trailerTitleValue = e.target.value;
    setTrailerTitle(trailerTitleValue);
    setTrailerTitleError("");

    if (!trailerTitleValue) {
      setTrailerTitleError("Title is required");
    } else if (trailerTitleValue.length < 3) {
      setTrailerTitleError("Title must be at least 3 characters long");
    }
  };

  const trailerSrcHandler = (e) => {
    const trailerSrcValue = e.target.value;
    setTrailerSrc(trailerSrcValue);
    setTrailerSrcError("");

    if (!trailerSrcValue) {
      setTrailerSrcError("Video link is required");
    } else if (!isUrl(trailerSrcValue)) {
      setTrailerSrcError("Please enter a valid URL");
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios(
        `${API_URL}/movies/${id}?_embed=actorMovies&_embed=movieTrailers`
      );
      console.log(data);
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

    const getMovieTrailers = async () => {
      const { data } = await axios(
        `${API_URL}/movieTrailers?movieId=${id}&_expand=movie`
      );
      setTrailers(data);
    };
    getMovieTrailers();
  }, [id]);

  const updateActors = async () => {
    const { data } = await axios(
      `${API_URL}/actorMovies?movieId=${id}&_expand=actor`
    );
    setActors(data);
  };

  const deleteMovieHandler = async () => {
    const res = await axios.delete(`${API_URL}/movies/${id}`);
    navigate("/movies");
    toast.success("Movie was successfully deleted");
  };

  if (!movie) {
    return (
      <Container>
        <BallTriangle
          wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
          color="#bd0611"
        />
      </Container>
    );
  }

  const newTrailerHandler = async (e) => {
    e.preventDefault();

    const newTrailerData = {
      movieId: movie.id,
      title: trailerTitle,
      trailerSrc,
    };

    const { data } = await axios.post(
      `${API_URL}/movieTrailers`,
      newTrailerData
    );

    setTrailers((prevTrailers) => [data, ...prevTrailers]);

    setTrailerTitle("");
    setTrailerSrc("");
  };

  function MovieTrailer({ trailerSrc, title }) {
    return (
      <div className={styles.videoContainer}>
        <iframe
          width="100%"
          height="400"
          src={trailerSrc}
          frameBorder="0"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    );
  }

  const deleteTrailerHandler = (id) => {
    axios.delete(`${API_URL}/movieTrailers/${id}`);
    setTrailers((prevTrailers) =>
      prevTrailers.filter((trailer) => trailer.id !== id)
    );
    toast.success("Trailer deleted");
  };

  const removeActorFromMovieHandler = (id) => {
    axios.delete(`${API_URL}/actorMovies/${id}`);
    setActors((prevActors) => prevActors.filter((actor) => actor.id !== id));
  };

  const storyLineElement = movie.description && (
    <div>
      <h2>Storyline</h2>
      <p>{firstLetterUpperCase(movie.description)}</p>
    </div>
  );

  const ratingElement = movie.rating && (
    <span className={styles.ratingWrapper}>
      {movie.rating}
      <span>/10</span>
    </span>
  );

  const genreElement = movie.genre.map((genreTitle, index) => (
    <li key={index}>{genreTitle}</li>
  ));

  let directorElementTitle = "";
  if (movie.director.length === 1) {
    directorElementTitle = "Director:";
  } else if (movie.director.length > 1) {
    directorElementTitle = "Directors:";
  }

  const directorElement = movie.director.map((movieDirector, index) => (
    <li key={index}>{firstLetterUpperCase(movieDirector)}</li>
  ));

  const actorsElement = actors.map((actor) => (
    <div key={actor.id} className={styles.actorItem}>
      <Link to={`/actors/${actor.actorId}`}>
        {actor.actor.profilePictureSrc && (
          <img src={actor.actor.profilePictureSrc} alt={actor.actor.name} />
        )}
        <h3>{actor.actor.name}</h3>
      </Link>
      <button
        className={styles.deleteBtn}
        onClick={() => removeActorFromMovieHandler(actor.id)}
      >
        <GoTrash />
      </button>
    </div>
  ));
  const trailerForm = (
    <form onSubmit={newTrailerHandler} className={styles.trailerForm}>
      <ThemeProvider theme={theme}>
        <TextField
          id="trailerTitle"
          label="Title"
          variant="filled"
          size="small"
          color="primary"
          required
          name="name"
          value={trailerTitle}
          onChange={trailerTitleHandler}
          helperText={
            trailerTitleError ? (
              <FormHelperText style={{ color: "red" }}>
                {trailerTitleError}
              </FormHelperText>
            ) : null
          }
          InputProps={{
            style: {
              color: "black",
              backgroundColor: "whitesmoke",
            },
          }}
        />
        <TextField
          id="trailerSrc"
          label="Video link"
          variant="filled"
          size="small"
          color="primary"
          required
          name="trailerSrc"
          value={trailerSrc}
          onChange={trailerSrcHandler}
          helperText={
            trailerSrcError ? (
              <FormHelperText style={{ color: "red" }}>
                {trailerSrcError}
              </FormHelperText>
            ) : null
          }
          InputProps={{
            style: {
              color: "black",
              backgroundColor: "whitesmoke",
            },
          }}
        />
      </ThemeProvider>
      <button className={styles.AddBtn} type="submit">
        Add Trailer
      </button>
    </form>
  );

  const trailerElement = (
    <>
      <div className={styles.trailersWrapper}>
        {trailers.length > 0 ? (
          trailers.map((trailer) => (
            <div key={trailer.id} className={styles.trailerItem}>
              <MovieTrailer
                trailerSrc={trailer.trailerSrc}
                title={trailer.title}
              />
              <button
                className={styles.deleteBtn}
                onClick={() => deleteTrailerHandler(trailer.id)}
              >
                <GoTrash />
              </button>
            </div>
          ))
        ) : (
          <p>No trailers yet...</p>
        )}
      </div>
    </>
  );

  return (
    <Container>
      <div className={styles.movieWrapper}>
        <div className={styles.buttonsWrapper}>
          <button className={styles.deleteBtn} onClick={deleteMovieHandler}>
            <GoTrash />
          </button>
          <Link className={styles.editBtn} to={`/edit-movie/${id}`}>
            <GoPencil />
          </Link>
        </div>
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
        <div className={styles.trailersSectionWrapper}>
          <h2>Trailer</h2>
          {trailerForm}
          {trailerElement}
        </div>
        <h2>Stars</h2>
        <ActorSelect movieId={id} updateActors={updateActors} />
        <div className={styles.actorsWrapper}>{actorsElement}</div>
      </div>
    </Container>
  );
}

export default MoviePage;
