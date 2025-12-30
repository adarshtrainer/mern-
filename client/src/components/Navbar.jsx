import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };
  
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            BLOG
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to="/createblog"
                >
                  Create Blog
                </Link>
              </li>
            </ul>
            {user ? (
              <form class="d-flex" role="search">
                <Link to="#">
                  <button class="btn btn-outline-success" type="submit">
                    {user.name}
                  </button>
                </Link>
                <button
                  class="btn btn-outline-dark ms-1"
                  type="submit"
                  onClick={handleClick}
                >
                  Logout
                </button>
              </form>
            ) : (
              <form class="d-flex" role="search">
                <Link to="/userregister">
                  <button class="btn btn-outline-success" type="submit">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button class="btn btn-outline-dark ms-1" type="submit">
                    Login
                  </button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
