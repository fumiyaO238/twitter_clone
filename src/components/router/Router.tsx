import { Routes, Route } from "react-router-dom";
import ViewMain from "../main/ViewMain";
import SignUp from "../user/Signup";
import Home from "./Home";
import Signin from "../user/Signin";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<ViewMain />} />
        </Routes>
    )
}