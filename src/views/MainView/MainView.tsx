import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBarComponent";
// Main layout for the application
export default function MainView() {
  return (
    <>
      <NavBar/>
      <Outlet></Outlet>
    </>
  );
}
