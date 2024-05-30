import { Routes, Route } from "react-router-dom";
import ViewMain from "../main/ViewMain";
import SignUp from "../user/Signup";
import Home from "./Home";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<ViewMain />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}