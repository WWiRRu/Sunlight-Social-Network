import { Outlet } from "react-router-dom";
import NavComponent from "../components/NavComponent.jsx";

const NormalLayout = () => {
    return (
        <>
        <NavComponent/>
        <Outlet/>
        </>
    );
};

export default NormalLayout;
