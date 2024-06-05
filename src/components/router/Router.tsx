import { Routes, Route } from "react-router-dom";
import ViewMain from "../main/ViewMain";
import SignUp from "../page/Signup";
import Start from "../page/Start";
import Signin from "../page/Signin";
import Error404 from "../page/Error404";
import UserList from "../parts/UserList";
import Home from "../parts/Home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog-list" element={<ViewMain />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/*" element={<Error404 />} />
        </Routes>
    )
}