import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";

function Edit(props) {
  const [name, setName] = useState(props?.location?.state?.data?.name);

  const [phone, setPhone] = useState(props?.location?.state?.data?.phone);

  const [status, setStatus] = useState(props?.location?.state?.data?.status);

  const [image, setImage] = useState(null);

  const [imgstyle, setImgstyle] = useState(props?.location?.state?.data?.image);

  let formData = new FormData();
  const history = useHistory();
  useEffect(() => {
    //TODO: get auth_token from loaclStorage
    if (localStorage.getItem("token") && props?.location?.state?.data?.name) {
    } else {
      history.push("/login");
    }
  });

  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("status", status);
  formData.append("image", image);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .patch(
        BASE_URL + "/api/v1/user/" + props?.location?.state?.data?._id,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        history.push("/home");
      })
      .catch((error) => {});
  };
  const handleImage = (e) => {
    var file = e.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      setImgstyle(URL.createObjectURL(file));
    }
  };
  const refer = useRef(null);

  const loggedout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };
  return (
    <>
      <div className="offset-sm-2">
        <form className=".form-control-static" onSubmit={handleEdit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div class="form-group">
            <label for="exampleInputPassword1">Phone</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <br />
          <div>
            <select
              class="custom-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="NotActive">Not Active</option>
            </select>
          </div>
          <br />
          <div class="form-group">
            <label for="exampleInputPassword1">Update Image</label>
            <input
              type="file"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Choose File"
              ref={refer}
              onChange={(e) => handleImage(e)}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <img
              src={
                imgstyle && imgstyle.includes("public")
                  ? `http://18.222.95.81:5000/${imgstyle}`
                  : imgstyle
              }
              alt="hi"
              style={{
                maxWidth: "75px",
                maxHeight: "75px",
                borderRadius: "50%",
                border: "1px solid silver",
              }}
              onClick={() => refer.current.click()}
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <br />
          <br />

          <button type="butoon" class="btn btn-primary" onClick={loggedout}>
            logout
          </button>
          <br />
        </form>
      </div>
    </>
  );
}
export default withRouter(Edit);
