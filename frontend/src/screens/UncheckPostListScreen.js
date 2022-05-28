import { Button, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiUrl } from "../components/constant";
import axios from "axios";
import { PostContext } from "../App";
export default function UncheckPostListScreen() {
  const navigate = useNavigate();
  const { userInfo } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/uncheckposts `, {
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
        await axios.delete(`${apiUrl}/api/uncheckposts/${post._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setSuccessDelete((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const createHandler = async (post) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/posts/`,
        {
          title: post.title,
          slug: post.slug,
          image: post.image,
          category: post.category,
          content: post.content,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
    } catch (err) {
      console.log(err);
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
                    onClick={() => {
                      createHandler(post);
                      deleteHandler(post);
                    }}
                  >
                    Duyệt
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
