import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../App";
import { apiUrl } from "../components/constant";
import "../css/LoginScreen.css";
import { useNavigate } from "react-router-dom";
function SignUpScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showNavBar, setShowOffNavBar, setUserInfo, userInfo } =
    useContext(PostContext);
  useEffect(() => {
    const a = () => {
      console.log(showNavBar);
      try {
        setShowOffNavBar(false);
      } catch (err) {}
    };
    a();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setShowOffNavBar(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <center className="login_form">
      <div className="container_form">
        <div className="container_wrap">
          <form onSubmit={submitHandler}>
            <h1>Sign Up</h1>
            <div className="mb-3 email">
              <h5>Name</h5>

              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 email">
              <h5>Email address</h5>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 password">
              <h5>Password</h5>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 password">
              <h5>Confirm Password</h5>
              <input
                type="password"
                className="form-control"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary login_btn">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right dangky">
              Bạn chưa tạo tài khoản? <a href="#">Đăng ký</a>
            </p>
          </form>
        </div>
      </div>
    </center>
  );
}
export default SignUpScreen;
