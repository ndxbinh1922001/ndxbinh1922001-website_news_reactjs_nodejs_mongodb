import "../css/PostScreen.css";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../components/constant";
import axios from "axios";
import moment from "moment";
const reducer = (state, action) => {
  switch (action.type) {

    case "FETCH_SUCCESS":
      return { ...state, post: action.payload};
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
function PostScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  console.log(slug)
  const [{  error, post }, dispatch] = useReducer(reducer, {
    post: [],
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await axios.get(`${apiUrl}/api/posts/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    fetchData();
  }, [slug]);
  return (
    <div className="post_page">
      <div className="metadata">
        <a href="">
          <div className="category">{post.category}</div>
        </a>
        <div className="createdat">{moment(post.createAt).format("DD-MM-YYYY HH:mm:ss")}</div>
      </div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="content">
        <p>

        {post.content}
        </p>
      </div>
    </div>
  );
}
export default PostScreen;
