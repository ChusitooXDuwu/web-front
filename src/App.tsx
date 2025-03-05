import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
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
