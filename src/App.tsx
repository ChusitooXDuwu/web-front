import "./App.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<MainView />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="home1" element={<HomePage />} />
        </Route>
        <Route path="/" element={<LoginView />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
