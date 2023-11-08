import axios from "axios";
import { API_URL } from "../../config";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import styles from "./ActorSelect.module.scss";

function ActorSelect({ movieId, updateActors }) {
  const [actors, setActors] = useState([]);
  const [options, setOptions] = useState([]);
  const [newActor, setNewActor] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    const getActors = async () => {
      const res = await axios(`${API_URL}/actors`);
      const actorData = res.data;

      const defaultOptions = actorData.map((actor) => ({
        key: actor.id,
        value: actor.name.toLowerCase(),
        label: actor.name.toUpperCase(),
      }));
      setActors(actorData);
      setOptions(defaultOptions);
    };
    getActors();
  }, []);

  const handleCreate = (inputValue) => {
    axios.post(`${API_URL}/actors`, { name: inputValue }).then((res) => {
      const newActorOption = {
        key: res.data.id,
        value: res.data.name.toLowerCase(),
        label: res.data.name.toUpperCase(),
      };

      setOptions((prevOptions) => [...prevOptions, newActorOption]);
      setNewActor(newActorOption);
      setSelectedActor(newActorOption);
    });
  };

  const addActorToMovie = async () => {
    if (newActor) {
      await axios.post(`${API_URL}/actorMovies`, {
        movieId: Number(movieId),
        actorId: newActor.key,
      });
    } else if (selectedActor) {
      await axios.post(`${API_URL}/actorMovies`, {
        movieId: Number(movieId),
        actorId: selectedActor.key,
      });
    }
    updateActors();
  };

  return (
    <div>
      <CreatableSelect
        className={styles.selectableElements}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "silver",
            primary: "#bd0611",
          },
        })}
        isClearable
        options={options}
        value={selectedActor}
        onChange={(newValue) => setSelectedActor(newValue)}
        onCreateOption={handleCreate}
      />
      <button
        className={styles.addActorBtn}
        onClick={addActorToMovie}
        disabled={!selectedActor}
      >
        Add actor
      </button>
    </div>
  );
}

export default ActorSelect;
