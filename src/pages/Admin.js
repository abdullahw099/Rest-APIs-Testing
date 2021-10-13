import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../utils/config";

function Admin() {
  const history = useHistory();

  const [item, setItem] = useState([]);
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
      .get(BASE_URL + "/api/v1/user/getall?", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        //TODO: Show alert message and logout the user
      });
  };

  const blockbutton = (_id, status) => {
    if (status.toLowerCase() === "blocked") {
      //TODO: unblock the user

      axios
        .put(
          BASE_URL + "/api/v1/user/" + _id,
          { status: "active" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getUserData();
        })
        .catch((error) => {
          //TODO: Show alert message and logout the user
          if (error.response.status === 403) {
            //unauthorized, then logout
          }
        });
    } else if (status.toLowerCase() === "active") {
      //TODO: block the user
      axios
        .put(
          BASE_URL + "/api/v1/user/" + _id,
          { status: "blocked" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getUserData();
        })
        .catch((error) => {
          //TODO: Show alert message and logout the user
          if (error.response.status === 403) {
            //unauthorized, then logout
          }
        });
    }
  };
  const loggedout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };
  return (
    <>
      <div className="vh-100">
        <div className=" p-3 bg-light">
          <div className="container d-flex my-2  ">
            <h2 className=" container d-flex">ALL USERS</h2>
            <button className="btn btn-success w-25 p-2" onClick={loggedout}>
              Log out
            </button>
          </div>
        </div>
        {item.length === 0 && <p>loading...</p>}

        <div className="d-flex flex-row flex-wrap">
          {item.map((data) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-3">
                <div
                  className="card d-flex shadow"
                  //   style={{ width: "18rem;" }}
                >
                  <div className="card-body card ">
                    <div className="d-flex w-100 text-center">
                      <div>
                        <img
                          className="rounded-circle"
                          width="70px"
                          height="70px"
                          src={
                            data.image && data.image.includes("public")
                              ? `http://18.222.95.81:5000/${data.image}`
                              : data.image
                          }
                          alt="Can't load image"
                        />
                      </div>
                      <div className="container text-start">
                        <table className="table table-responsive">
                          <tbody>
                            <tr>
                              <td>{data.name}</td>
                            </tr>
                            <tr>
                              <td>{data.username}</td>
                            </tr>
                            <tr>
                              <td>{data.phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button
                      className="btn btn-success w-100"
                      onClick={() => blockbutton(data._id, data.status)}
                    >
                      {data.status}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Admin;
