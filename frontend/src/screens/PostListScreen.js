import { Button, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiUrl } from "../components/constant";
import axios from "axios";
import { PostContext } from "../App";
export default function PostListScreen() {
  const navigate = useNavigate();
  const { userInfo } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setPosts(data);
      } catch (err) {}
    };

    fetchData();
  }, [userInfo, successDelete]);
  const deleteHandler = async (post) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`${apiUrl}/api/posts/${post._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setSuccessDelete((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>List Post</h1>
        </Col>
      </Row>
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>SLUG</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>CONTENT</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{post.image}</td>
                <td>{post.category}</td>
                <td>{post.content}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/admin/editposts/${post._id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(post)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
}
