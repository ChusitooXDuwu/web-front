import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView/LoginView";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="home" element={<LandingPage />} />
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
