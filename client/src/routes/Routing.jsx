import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import SingleBlog from "../components/SingleBlog";
import UserRegister from "../components/UserRegister";
import Login from "../components/Login";
import CreateBlog from "../components/CreateBlog";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userregister" element={<UserRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createblog" element={<CreateBlog />} />
      <Route path="/singleblog/:id" element={<SingleBlog />} />
    </Routes>
  );
};

export default Routing;
