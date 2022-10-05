import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const changeInput = (e) => {
    let { name, value } = e.target;
    const newData = {
      ...loginData,
    };
    newData[name] = value;
    setLoginData(newData);
  };
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const loginHandler = () => {
    postData("http://localhost:3000/login", loginData)
      .then((res) => {
        if (!res.access_token) {
          throw new Error("error");
        }
        localStorage.setItem("access_token", res.access_token);
        navigate("/home");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Invalid username / password",
        });
      });
  };
  return (
    <div>
      <div className="bg">
        <div className="card">
          <div className="text-center">
            <h1 className="mb-5">Login Form</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputusername1" className="form-label">
                username
              </label>
              <input
                type="username"
                className="form-control"
                name="username"
                id="exampleInputusername1"
                aria-describedby="usernameHelp"
                value={loginData.username}
                onChange={(e) => changeInput(e)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                value={loginData.password}
                onChange={(e) => changeInput(e)}
              ></input>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary text-white" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
