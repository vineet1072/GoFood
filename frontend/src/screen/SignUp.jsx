import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    // Reset credentials only if the user was created successfully
    if (json.success) {
      setCredentials({
        name: "",
        email: "",
        password: "",
        geolocation: "",
      });
      toast.success("User created successfully");
    } else {
      // Show error message using Toastify
      toast.error(json.message || "Enter valid credentials");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{ height: "100vh", backgroundColor: "#228cdc" }}
      className=" d-flex justify-content-center align-items-center"
    >
      <div style={{ backgroundColor: "#ffff" }} className="container py-5">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={credentials.name}
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={handleChange}
              value={credentials.email}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={handleChange}
              value={credentials.password}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Location</label>
            <input
              onChange={handleChange}
              name="geolocation"
              value={credentials.geolocation}
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Location"
            />
          </div>

          <button type="submit" className="mt-5 btn btn-success">
            Submit
          </button>
          <Link to="/login">
            <button type="button" className="mt-5 ms-3 btn btn-danger">
              Already a user
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
