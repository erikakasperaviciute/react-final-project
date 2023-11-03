import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import axios from "axios";
import { API_URL } from "../../config";
import ActorItemWrapper from "../../Components/ActorItemWrapper/ActorItemWrapper";

function ActorsPage() {
  const [actors, setActors] = useState([]);

  const getActors = async () => {
    const { data } = await axios(`${API_URL}/actors`);
    setActors(data);
  };

  useEffect(() => {
    getActors();
  }, []);

  if (actors.length === 0) {
    return (
      <Container>
        <span>Loading</span>
      </Container>
    );
  }

  const actorsListElement = actors.map((actor) => (
    <ActorItemWrapper key={actor.id} data={actor} />
  ));

  return (
    <Container>
      <h1>Actors</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
        {actorsListElement}
      </div>
    </Container>
  );
}

export default ActorsPage;
