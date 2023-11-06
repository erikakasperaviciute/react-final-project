import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import axios from "axios";
import { API_URL } from "../../config";
import ActorItemWrapper from "../../Components/ActorItemWrapper/ActorItemWrapper";
import styles from "./ActorsPage.module.scss";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

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
        <BallTriangle
          wrapperStyle={{ justifyContent: "center", marginTop: "200px" }}
          color="#bd0611"
        />
      </Container>
    );
  }

  const actorsListElement = actors.map((actor) => (
    <ActorItemWrapper key={actor.id} data={actor} />
  ));

  return (
    <Container>
      <div className="titleBtnWrapper">
        <h1>Actors</h1>
        <Link to="/add-actor" className="addBtn">
          Add New Actor
        </Link>
      </div>
      <div className={styles.actorsList}>{actorsListElement}</div>
    </Container>
  );
}

export default ActorsPage;
