import React, { useState } from "react";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/userregistration`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "content-type": "application/json" },
      });
      const result = await res.json();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChnage = (e) => {
    setCredentials((prevs) => ({ ...prevs, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form className="mt-2" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user name...!"
                id="name"
                onChange={handleChnage}
              />
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
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Enter user phone number...!"
                id="phone"
                onChange={handleChnage}
              />
              <button type="submit" className="btn btn-info mt-2">
                Create Account
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
