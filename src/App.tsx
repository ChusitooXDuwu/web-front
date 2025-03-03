import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainView from "./views/MainView";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import BoxCancha from "./pages/box-cancha";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="box-cancha" element={<BoxCancha />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function ReactWelcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
