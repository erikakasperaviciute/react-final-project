import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import Container from "../../Components/Container/Container";
import { FormHelperText, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import isUrl from "is-url";
import { BallTriangle } from "react-loader-spinner";
import styles from "./EditActorPage.module.scss";

const theme = createTheme({
  palette: {
    primary: brown,
  },
  typography: {
    fontFamily: "Inter",
  },
});

function EditActorPage() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [about, setAbout] = useState("");
  const [ocupation, setOcupation] = useState([]);
  const [profilePictureSrc, setProfilePictureSrc] = useState("");

  const [nameError, setNameError] = useState("");
  const [profilePictureSrcError, setProfilePictureSrcError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getActor = async () => {
      const { data } = await axios(`${API_URL}/actors/${id}`);
      setActor(data);

      setName(data.name);
      setBirthday(data.birthday);
      setAbout(data.about);
      setOcupation(data.ocupation);
      setProfilePictureSrc(data.profilePictureSrc);
    };
    getActor();
  }, [id]);

  const birthdayHandler = (e) => setBirthday(e.target.value);
  const aboutHandler = (e) => setAbout(e.target.value);

  const nameHandler = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameError("");

    if (!nameValue) {
      setNameError("Actor name is required");
    } else if (nameValue.length < 3) {
      setNameError("Actor name must be at least 3 characters long");
    }
  };

  const profilePictureSrcHandler = (e) => {
    const profilePictureSrcValue = e.target.value;
    setProfilePictureSrc(profilePictureSrcValue);
    setProfilePictureSrcError("");

    if (!profilePictureSrcValue) {
      setProfilePictureSrcError("Image link is required");
    } else if (!isUrl(profilePictureSrcValue)) {
      setProfilePictureSrcError("Please enter a valid URL");
    }
  };

  const ocupationHandler = (e) => {
    const enteredOcupationValue = e.target.value;

    if (!enteredOcupationValue) {
      setOcupation([]);
      return;
    }
    const ocupationArr = enteredOcupationValue.split(",");
    const updatedOcupationArr = ocupationArr.map((ocupationItem) => {
      const trimmedOcupation = ocupationItem.trim();
      return trimmedOcupation;
    });
    setOcupation(updatedOcupationArr);
  };

  const editActorHandler = async (e) => {
    e.preventDefault();

    const actorData = {
      name,
      birthday,
      about,
      profilePictureSrc,
      ocupation,
    };

    const res = await axios.put(`${API_URL}/actors/${id}`, actorData);

    if (res.statusText === "OK") {
      navigate(`/actors/${id}`);
      toast.success("Actor successfully updated");
    } else {
      toast.error("Oops..! Something went wrong");
    }
  };

  return (
    <Container>
      <div className={styles.formWrapper}>
        <h1>Edit Actor</h1>
        {actor ? (
          <form onSubmit={editActorHandler} className={styles.actorForm}>
            <ThemeProvider theme={theme}>
              <TextField
                id="name"
                label="Full name"
                variant="filled"
                size="small"
                color="primary"
                required
                name="name"
                value={name}
                onChange={nameHandler}
                helperText={
                  nameError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {nameError}
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
                id="birthday"
                label="Birthday"
                variant="filled"
                size="small"
                color="primary"
                type="text"
                name="birthday"
                placeholder="Month DD, YYYY"
                value={birthday}
                onChange={birthdayHandler}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="ocupation"
                label="Ocupation"
                variant="filled"
                size="small"
                color="primary"
                multiline
                minRows={2}
                name="ocupation"
                value={ocupation}
                onChange={ocupationHandler}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="about"
                label="About"
                variant="filled"
                size="small"
                color="primary"
                multiline
                minRows={4}
                name="about"
                value={about}
                onChange={aboutHandler}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: "whitesmoke",
                  },
                }}
              />
              <TextField
                id="profilePictureSrc"
                label="Profile photo link"
                variant="filled"
                size="small"
                color="primary"
                required
                name="profilePictureSrc"
                value={profilePictureSrc}
                multiline
                minRows={2}
                onChange={profilePictureSrcHandler}
                helperText={
                  profilePictureSrcError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {profilePictureSrcError}
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
            <button type="submit">Edit Actor</button>
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

export default EditActorPage;
