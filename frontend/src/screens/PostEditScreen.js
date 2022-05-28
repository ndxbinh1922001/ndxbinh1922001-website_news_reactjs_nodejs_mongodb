import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../components/constant";
import { PostContext } from "../App";
export default function PostEditScreen() {
  const navigate = useNavigate();
  const { userInfo } = useContext(PostContext);
  const params = useParams();
  const { id: postId } = params;
  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();

  const [image, setImage] = useState();

  const [category, setCategory] = useState();

  const [content, setContent] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/posts/${postId}`,
        {
          _id: postId,
          title,
          slug,
          image,
          category,
          content,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      navigate("/admin/listposts");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts/${postId}`);
        setTitle(data.title);
        setSlug(data.slug);
        setImage(data.image);
        setCategory(data.category);
        setContent(data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  return (
    <center>
      <div className="container_form">
        <div className="container_wrap">
          <h1>Edit post {postId}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 email" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 email" controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 email" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 email" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 email" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <Button type="submit">Update</Button>
            </div>
          </Form>
        </div>
      </div>
    </center>
  );
}
