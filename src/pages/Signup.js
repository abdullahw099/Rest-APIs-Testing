import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import Blue from "../images/blue.jpg";

function Signup() {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  useEffect(() => {
    //TODO: get auth_token from loaclStorage
    if (localStorage.getItem("token") !== null) {
      history.push("/home");
    }
  });
  const signupUser = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Password must be same");
    } else if (password.length < 6) {
      alert("Password must be atleast 6 chars long");
    } else
      axios
        .post(BASE_URL + "/api/v1/auth/register", {
          email,
          password,
          phone,
          repeat_password: repassword,
          name,
        })
        .then((res) => {
          history.push("/login");
        })
        .catch((err) => {
          alert(err?.response?.data?.error);
        });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "rgba(0,0,20,0.5)" }}
    >
      <div
        className="col-12 col-md-6 d-inline-flex flex-md-row flex-column text-center card shadow-lg  justify-content-center "
        style={{ borderRadius: "1%", overflow: "hidden" }}
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
          <form>
            <h1 className="h3 m -3 fw-normal">Sign up here</h1>
            <br />

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <label htmlfor="floatingInput">Name</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="email"
                className="form-control "
                id="floatingPassword"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <label htmlfor="floatingPassword">Email</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <label htmlfor="floatingPassword">Phone number</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <label htmlfor="floatingPassword">Password</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Repeat Password"
                value={repassword}
                onChange={(e) => setrepassword(e.target.value)}
              />
              <label htmlfor="floatingPassword">Repeat Password</label>
            </div>
            <br />
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={signupUser}
            >
              Sign up
            </button>
            <br />
            <br />
            <button
              className="w-100 btn btn-lg btn-primary "
              style={{
                backgroundColor: "white",
                color: "rgb(0,20,150)",
                border: "1px solid white",
                fontSize: "15px",
              }}
              type="button"
              onClick={() => history.push("/login")}
            >
              Back to?<u> Login</u>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
