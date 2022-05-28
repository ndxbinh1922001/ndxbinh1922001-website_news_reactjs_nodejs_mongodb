import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../components/constant";
import axios from "axios";
import { PostContext } from "../App";
export default function UserEditScreen() {
  const { userInfo } = useContext(PostContext);
  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (err) {}
    };
    fetchData();
  }, [userId, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      navigate("/admin/users");
    } catch (error) {}
  };
  return (
    <>
      <h1>Edit User {userId}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          type="checkbox"
          id="isAdmin"
          label="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />

        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </>
  );
}
