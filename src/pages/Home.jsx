import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
};

export default Home;
