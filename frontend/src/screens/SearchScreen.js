import Post from "../components/Post";
import { apiUrl } from "../components/constant";
import {useLocation} from "react-router-dom"
import { useEffect, useReducer } from 'react';
import React from "react";
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state};
    case "FETCH_SUCCESS":
      return { ...state, posts: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
function SearchScreen() {
  const { search } = useLocation();
  const chude = new URLSearchParams(search);
  const [{  error, posts }, dispatch] = useReducer(reducer, {
    posts: [],
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/posts/${chude}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

    };
    fetchData();
  }, []);
  return (
    <div className="">
      <Row>
        {posts.map((post) => (
          <Col key={post.slug} sm={6} md={4} lg={3} className="mb-3">
            <Post post={post}></Post>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default SearchScreen;
