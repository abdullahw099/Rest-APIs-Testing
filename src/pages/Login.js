import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../style/loginstyle.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import Blue from "../images/blue.jpg";
function Login() {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    //TODO: get auth_token from loaclStorage
    if (localStorage.getItem("token") !== null) {
      history.push("/home");
    }
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "/api/v1/auth/login", {
        username: email,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          //TODO:
          //set auth token in localstorage here...

          localStorage.setItem("token", res.data.token);
          if (res.data.userType === "admin") {
            history.push("/admin");
          } else history.push("/home");
          console.log(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("You are blocked by the admin");
        } else {
          alert("Incorrect username and password");
        }
      });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "rgba(0,0,20,0.5)" }}
    >
      <div className="col-12 col-md-3"></div>
      <div
        className="col-12 col-md-6 d-inline-flex flex-md-row flex-column text-center  shadow-lg  justify-content-center "
        style={{
          borderRadius: "1%",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <div className="col-12 col-md-4 ">
          <img
            className="img-fluid m-auto"
            src={Blue}
            alt="hi"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-12 col-md-8 p-4 border-primary">
          <form className="p-4 rounded-3 ">
            <h1 className="h3  fw-normal">Please sign in</h1>
            <br />
            <div className="form-floating my-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <br />
            <div className="form-floating my-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <br />
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={loginUser}
            >
              Sign in
            </button>
            <br></br>
            <br></br>
            <button
              className="w-100 btn btn-lg btn-primary "
              style={{
                backgroundColor: "white",
                color: "rgb(0,20,150)",
                border: "1px solid white",
                fontSize: "15px",
              }}
              type="button"
              onClick={() => history.push("/signup")}
            >
              Don't have an Account?<u> Sign Up here</u>
            </button>
          </form>
        </div>
      </div>
      <div className="col-12 col-md-3"></div>
    </div>
  );
}

export default Login;
