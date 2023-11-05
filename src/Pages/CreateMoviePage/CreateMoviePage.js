import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/Container/Container";
import { TextField } from "@mui/material";
import styles from "./CreateMoviePage.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: brown,
  },
  typography: {
    fontFamily: "Inter",
  },
});

function CreateMoviePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState([]);
  const [posterSrc, setPosterSrc] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const titleHandler = (e) => setTitle(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const ratingHandler = (e) => setRating(e.target.value);
  const posterSrcHandler = (e) => setPosterSrc(e.target.value);
  const imageSrcHandler = (e) => setImageSrc(e.target.value);
  const yearHandler = (e) => setYear(e.target.value);

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
    const updatedDirectorArr = directorArr.map((directorItem) => {
      const trimmedDirector = directorItem.trim();
      return trimmedDirector;
    });
    setDirector(updatedDirectorArr);
  };

  const newMovieHandler = async (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      year,
      genre,
      rating: Number(rating),
      director,
      posterSrc,
      imageSrc,
    };

    const res = await axios.post(`${API_URL}/movies`, newMovie);

    if (res.statusText === "Created") {
      navigate(`/movies/${res.data.id}`);
    } else {
      console.error("Something wrong");
    }
  };

  return (
    <Container>
      <div className={styles.formWrapper}>
        <h1>Add new movie</h1>

        <form onSubmit={newMovieHandler} className={styles.movieForm}>
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
              format="YYYY"
              required
              value={year}
              onChange={yearHandler}
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
              required
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
              name="posterSrc"
              value={posterSrc}
              onChange={posterSrcHandler}
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
              value={imageSrc}
              onChange={imageSrcHandler}
              InputProps={{
                style: {
                  color: "black",
                  backgroundColor: "whitesmoke",
                },
              }}
            />
          </ThemeProvider>

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </Container>
  );
}

export default CreateMoviePage;
