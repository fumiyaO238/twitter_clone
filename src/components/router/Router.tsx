import { Routes, Route } from "react-router-dom";
import ViewMain from "../main/ViewMain";
import SignUp from "../page/Signup";
import Start from "../page/Start";
import Signin from "../page/Signin";
import Error404 from "../page/Error404";
import UserList from "../parts/UserList";
import Home from "../parts/Home";
import Logout from "../page/Logout";
import User from "../parts/User";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/blog-list" element={<ViewMain />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/user/:id" element={<User />}/>
            <Route path="/*" element={<Error404 />} />
        </Routes>
    )
}