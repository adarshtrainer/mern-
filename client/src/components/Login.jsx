import React, { useContext, useState } from "react";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChnage = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: { "content-type": "application/json" },
      });
      const result = await res.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data,
        role: result.role,
        token: result.token,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form className="mt-2" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mt-2"
                placeholder="Enter user email...!"
                id="email"
                onChange={handleChnage}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Enter user password...!"
                id="password"
                onChange={handleChnage}
              />

              <button type="submit" className="btn btn-info mt-2">
                Login
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
