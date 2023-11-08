import { FormHelperText, TextField, formLabelClasses } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import isUrl from "is-url";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import { useEffect, useState } from "react";
import styles from "./EditMoviePage.module.scss";

const theme = createTheme({
  palette: {
    primary: brown,
  },
  typography: {
    fontFamily: "Inter",
  },
});

function EditMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState([]);
  const [posterSrc, setPosterSrc] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [year, setYear] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [yearError, setYearError] = useState("");
  const [posterSrcError, setPosterSrcErorr] = useState("");
  const [imageSrcError, setImageSrcErorr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios(`${API_URL}/movies/${id}`);
      setMovie(data);

      setTitle(data.title);
      setDescription(data.description);
      setGenre(data.genre);
      setRating(data.rating);
      setDirector(data.director);
      setPosterSrc(data.posterSrc);
      setImageSrc(data.imageSrc);
      setYear(data.year);
    };
    getMovie();
  }, [id]);

  const ratingHandler = (e) => setRating(e.target.value);

  const titleHandler = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setTitleError("");

    if (!titleValue) {
      setTitleError("Title is required");
    } else if (titleValue.length < 3) {
      setTitleError("Title must be at least 3 characters long");
    }
  };

  const descriptionHandler = (e) => {
    const descriptionValue = e.target.value;
    setDescription(descriptionValue);
    setDescriptionError("");

    if (!descriptionValue) {
      setDescriptionError("Storyline is required");
    } else if (descriptionValue.length < 15) {
      setDescriptionError("Storyline must be at least 15 characters long");
    }
  };

  const yearHandler = (e) => {
    const yearValue = e.target.value;
    setYear(yearValue);
    setYearError("");

    if (!yearValue) {
      setYearError("Release year is required");
    } else if (yearValue.length !== 4) {
      setYearError("Please check year format. It should be YYYY");
    } else {
      const currentYear = new Date().getFullYear();
      const minYear = 1874;
      const maxYear = currentYear;

      if (yearValue < minYear || yearValue > maxYear) {
        setYearError(
          `Please check entered value. Release year must be between ${minYear} and ${maxYear}`
        );
      }
    }
  };

  const posterSrcHandler = (e) => {
    const posterSrcValue = e.target.value;
    setPosterSrc(posterSrcValue);
    setPosterSrcErorr("");

    if (!posterSrcValue) {
      setPosterSrcErorr("Poster image link is required");
    } else if (!isUrl(posterSrcValue)) {
      setPosterSrcErorr("Please enter a valid URL");
    }
  };

  const imageSrcHandler = (e) => {
    const imageSrcValue = e.target.value;
    setImageSrc(imageSrcValue);
    setImageSrcErorr("");

    if (!imageSrcValue) {
      setImageSrcErorr("Image link is required");
    } else if (!isUrl(imageSrcValue)) {
      setImageSrcErorr("Please enter a valid URL");
    }
  };

  const genreHandler = (e) => {
    const enteredGenreValue = e.target.value;

    if (!enteredGenreValue) {
      setGenre([]);
      return;
    }
    const genreArr = enteredGenreValue.split(",");
    const updatedGenreArr = genreArr.map((genreItem) => {
      const trimmedGenre = genreItem.trim();
      return trimmedGenre;
    });
    setGenre(updatedGenreArr);
  };

  const directorHandler = (e) => {
    const enteredDirectorValue = e.target.value;

    if (!enteredDirectorValue) {
      setDirector([]);
      return;
    }
    const directorArr = enteredDirectorValue.split(",");
    setDirector(directorArr);
  };

  const editMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      description,
      genre,
      rating,
      director,
      posterSrc,
      imageSrc,
      year,
    };

    const res = await axios.put(`${API_URL}/movies/${id}`, movieData);

    if (res.statusText === "OK") {
      navigate(`/movies/${id}`);
      toast.success("Movie successfully updated");
    } else {
      toast.error("Oops..! Something went wrong");
    }
  };

  return (
    <Container>
      <div className={styles.formWrapper}>
        <h1>Edit Movie</h1>
        {movie ? (
          <form onSubmit={editMovieHandler} className={styles.movieForm}>
            <ThemeProvider theme={theme}>
              <TextField
                id="title"
                label="Title"
                variant="filled"
                size="small"
                color="primary"
                required
                name="title"
                value={title}
                onChange={titleHandler}
                helperText={
                  titleError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {titleError}
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
                id="description"
                label="Storyline"
                variant="filled"
                size="small"
                color="primary"
                required
                multiline
                minRows={4}
                name="description"
                value={description}
                onChange={descriptionHandler}
                helperText={
                  descriptionError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {descriptionError}
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
                id="year"
                label="Release year"
                variant="filled"
                size="small"
                color="primary"
                type="number"
                name="year"
                placeholder="YYYY"
                required
                value={year}
                onChange={yearHandler}
                helperText={
                  yearError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {yearError}
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
                id="director"
                label="Director"
                variant="filled"
                size="small"
                color="primary"
                multiline
                name="director"
                value={director}
                onChange={directorHandler}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="genre"
                label="Genre"
                variant="filled"
                size="small"
                color="primary"
                multiline
                minRows={2}
                name="genre"
                value={genre}
                onChange={genreHandler}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="rating"
                label="Rating"
                variant="filled"
                size="small"
                color="primary"
                type="number"
                name="rating"
                value={rating}
                onChange={ratingHandler}
                InputProps={{
                  inputProps: { min: 0, step: 0.1 },
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="posterSrc"
                label="Poster photo link"
                variant="filled"
                size="small"
                color="primary"
                required
                multiline
                minRows={2}
                name="posterSrc"
                value={posterSrc}
                onChange={posterSrcHandler}
                helperText={
                  posterSrcError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {posterSrcError}
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
                id="imageSrc"
                label="Scenery photo link"
                variant="filled"
                size="small"
                color="primary"
                name="imageSrc"
                required
                multiline
                minRows={2}
                value={imageSrc}
                onChange={imageSrcHandler}
                helperText={
                  imageSrcError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {imageSrcError}
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
            <button type="submit">Edit Movie</button>
          </form>
        ) : (
          <BallTriangle
            wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
            color="#bd0611"
          />
        )}
      </div>
    </Container>
  );
}

export default EditMoviePage;
