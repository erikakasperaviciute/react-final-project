import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import { FormHelperText, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import isUrl from "is-url";
import styles from "./CreateActorPage.module.scss";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: brown,
  },
  typography: {
    fontFamily: "Inter",
  },
});
function CreateActorPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [about, setAbout] = useState("");
  const [ocupation, setOcupation] = useState([]);
  const [profilePictureSrc, setProfilePictureSrc] = useState("");

  const [nameError, setNameError] = useState("");
  const [profilePictureSrcError, setProfilePictureSrcError] = useState("");

  const birthdayHandler = (e) => setBirthday(e.target.value);
  const aboutHandler = (e) => setAbout(e.target.value);

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

  const newActorHandler = async (e) => {
    e.preventDefault();

    const newActor = {
      name,
      birthday,
      about,
      ocupation,
      profilePictureSrc,
    };

    const res = await axios.post(`${API_URL}/actors`, newActor);

    if (res.statusText === "Created") {
      toast.success(`New actor was created`);
      navigate(`/actors/${res.data.id}`);
    } else {
      toast.error("Oops..! Something went wrong");
    }
  };

  return (
    <Container>
      <div className={styles.formWrapper}>
        <h1>Add new actor</h1>
        <form onSubmit={newActorHandler} className={styles.actorForm}>
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
              multiline
              minRows={2}
              name="profilePictureSrc"
              value={profilePictureSrc}
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
          <button type="submit">Add Actor</button>
        </form>
      </div>
    </Container>
  );
}

export default CreateActorPage;
