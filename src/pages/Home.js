import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import { BASE_URL } from "../utils/config";
function Home(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [alert, setalert] = useState(false);
  useEffect(() => {
    //TODO: get auth_token from loaclStorage
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      history.push("/login");
    }
  });

  const getUserData = () => {
    axios
      .get(BASE_URL + "/api/v1/auth/whoami", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data);
        if (response.data.userType === "user") {
          setalert(response.data.isApproved);
        }
      })
      .catch((error) => {
        //TODO: Show alert message and logout the user
        if (error.response.status === 403) {
          //unauthorized, then logout
        }
      });
  };
  const loggedout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };

  return (
    <>
      {data.length === 0 && <p>loading...</p>}
      {/* <button onClick={getUserData}>Click me</button> */}
      {/* <p>{JSON.stringify(data)}</p> */}
      <div
        className="d-flex justify-content-center align-items-center vh-100 "
        style={{ backgroundColor: "rgba(0,0,20,0.5)" }}
      >
        <div
          className="col-12 col-md-6 d-inline-flex flex-md-row flex-column text-center shadow-lg p-4 "
          style={{
            borderRadius: "1%",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <div className="d-flex col-12 col-md-6 align-items-center ">
            <img
              className="img-fluid m-auto"
              src={
                data.image && data.image.includes("public")
                  ? `http://18.222.95.81:5000/${data.image}`
                  : data.image
              }
              alt="hi"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </div>

          <div>
            {!alert && (
              <div style={{ textAlign: "center", color: "red" }}>
                <p>Your account is not approved yet!</p>
              </div>
            )}
            <table className="table table-responsive">
              <tbody>
                <tr>
                  <th>Username</th>
                  <td>{data.username}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{data.status}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{data.userType}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              class="btn btn-primary w-100 justify-content-center align-self-center align-items-center d-flex"
              onClick={() => history.push("/edit", { data })}
            >
              Edit Data
            </button>
            <br />
            <button
              type="button"
              class="btn btn-secondary w-50 justify-content-end"
              onClick={loggedout}
              style={{ marginLeft: "30px" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Home);
