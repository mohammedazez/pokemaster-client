import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userLogoutActions } from "../redux/actions/userAction";
import Swal from "sweetalert2";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutSuccess = () => {
    dispatch(userLogoutActions(history));
    localStorage.removeItem("accessToken");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Success Logout",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload();
  };

  const LoginButton = styled.button`
    cursor: pointer;
    background: #c1292e;
    font-size: 14px;
    border-radius: 5px;
    border: 3px solid #c1292e;
    padding: 0.25em 0.5em;
    transition: 0.2s all ease-out;
    color: #f4f4f6;
    font-weight: bold;

    &:hover {
      background-color: #f4f4f6;
      color: #c1292e;
    }
  `;

  const RegisButton = styled.button`
    cursor: pointer;
    background: transparent;
    font-size: 14px;
    border-radius: 5px;
    border: 3px solid #c1292e;
    padding: 0.25em 0.5em;
    transition: 0.2s all ease-out;
    color: #c1292e;
    font-weight: bold;

    &:hover {
      background-color: #c1292e;
      color: #f4f4f6;
    }
  `;

  return (
    <div className="container-fluid">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Pokédex
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!localStorage.getItem("accessToken") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <RegisButton>Register</RegisButton>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <LoginButton>Login</LoginButton>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* dropdown */}
                  <div className="kebawah">
                    <button className="kebawah-tombol">Menus</button>
                    <div className="kebawah-content">
                      {/* <Link to="/profile">
                        <p className="teks-kebawah">Profile</p>
                      </Link> */}
                      <Link to="/pokemonfavorite">
                        <p className="teks-kebawah">My Pokemon</p>
                      </Link>
                      <div
                        onClick={() => logoutSuccess()}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="teks-kebawah">Logout</p>
                      </div>
                    </div>
                  </div>
                  {/* dropdown */}

                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/pokemonfavorite">
                      My Pokémon
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link">
                      <LoginButton onClick={() => logoutSuccess()}>
                        Logout
                      </LoginButton>
                    </Link>
                  </li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
