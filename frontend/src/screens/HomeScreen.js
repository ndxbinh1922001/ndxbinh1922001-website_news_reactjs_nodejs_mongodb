import Post from "../components/Post";
import { apiUrl } from "../components/constant";
import { useEffect, useReducer, useContext } from "react";
import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { PostContext } from "../App";

function HomeScreen() {
  const { posts, setPosts, search, setS } = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/posts`);
        setPosts(result.data.sort((a, b) => a.createdAt - b.createdAt));
      } catch (err) {
        console(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="posts">
      <Row>
        {posts.map((post) => {
          console.log(search)
          if (
            post.title.toLowerCase().indexOf(search) !== -1 ||
            post.content.toLowerCase().indexOf(search) !== -1
          )
            return (
              <Col key={post.slug} sm={6} md={4} lg={3} className="mb-3">
                <Post post={post}></Post>
              </Col>
            );
        })}
      </Row>
    </div>
  );
}
export default HomeScreen;
