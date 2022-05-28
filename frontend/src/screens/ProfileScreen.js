import React, { useContext, useEffect, useReducer, useState } from "react";
import "../css/ProfileScreen.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../components/constant";
import { PostContext } from "../App";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { setShowOffNavBar, userInfo, setUserInfo } = useContext(PostContext);
  useEffect(() => {
    const a = () => {
      setShowOffNavBar(false);
    };
    a();
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${apiUrl}/api/users/profile`,
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setShowOffNavBar(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container small-container">
      <h1 className="my-3">Thông tin người dùng</h1>
      <center>
        <div className="container_form">
          <div className="container_wrap">
            <form onSubmit={submitHandler}>
              <Form.Group className="mb-3 email" controlId="name">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 email" controlId="name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 email" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 email" controlId="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <Button type="submit">Cập nhật thông tin</Button>
              </div>
            </form>
          </div>
        </div>
      </center>
    </div>
  );
}
