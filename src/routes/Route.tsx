import { Routes, Route } from "react-router-dom";
import { Home as HomePage } from "../pages/home/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
        </Routes>
    );
}

export { Router }