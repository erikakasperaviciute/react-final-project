import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<h1>Movies</h1>} />
        <Route path="/actors" element={<h1>Actors</h1>} />

        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
