import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "./App.css";
import Header from "./Components/Header/Header";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import MoviePage from "./Pages/MoviePage/MoviePage";
import ActorsPage from "./Pages/ActorsPage/ActorsPage";
import ActorPage from "./Pages/ActorPage/ActorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actors/:id" element={<ActorPage />} />

        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
