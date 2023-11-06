import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "./App.css";
import Header from "./Components/Header/Header";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import MoviePage from "./Pages/MoviePage/MoviePage";
import ActorsPage from "./Pages/ActorsPage/ActorsPage";
import ActorPage from "./Pages/ActorPage/ActorPage";
import NotFoundPage from "./Pages/404Page/NotFoundPage";
import CreateMoviePage from "./Pages/CreateMoviePage/CreateMoviePage";
import CreateActorPage from "./Pages/CreateActorPage/CreateActorPage";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EditActorPage from "./Pages/EditActorPage/EditActorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/add-movie" element={<CreateMoviePage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/add-actor" element={<CreateActorPage />} />
        <Route path="/edit-actor/:id" element={<EditActorPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="bottom-right" newestOnTop theme="dark" />
    </>
  );
}

export default App;
