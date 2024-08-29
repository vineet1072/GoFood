import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screen/Cart";
import { useCart } from "../context/ContextReducer";
const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const isLoggedIn = localStorage.getItem("authToken");
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="container-fluid navbar navbar-expand-lg bg-success">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white fs-1 fst-italic fw-bold"
          to="/"
        >
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link
              to="/"
              className="nav-link active text-white fs-5  bg-success-lg"
              aria-current="page"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <Link
                to="/myorder"
                className="nav-link active text-white fs-5  bg-success-lg"
                aria-current="page"
              >
                My Orders
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="nav-link btn bg-white text-success px-3 py-2 me-3 "
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="nav-link btn bg-white text-success px-3 py-2 me-3  "
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => {
                    setCartView(true);
                  }}
                  className="nav-link btn bg-white text-success px-3 py-2 me-3 "
                >
                  My Cart &nbsp;
                  {data.length > 0 && (
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  )}
                </Link>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <Link
                  to="/login"
                  className="nav-link btn bg-danger text-white px-3 py-2 me-3 "
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
