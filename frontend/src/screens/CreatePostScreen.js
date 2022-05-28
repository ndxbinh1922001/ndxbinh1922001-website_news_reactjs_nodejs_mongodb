import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { PostContext } from "../App";
import { apiUrl } from "../components/constant";
import { useNavigate } from "react-router-dom";
export default function CreatePostScreen() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] = useState("");

  const [content, setContent] = useState("");
  const { userInfo } = useContext(PostContext);
  useEffect(() => {
    const a = () => {
      setShowOffNavBar(false);
    };
    a();
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${apiUrl}/api/uncheckposts`,
        {
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
      setShowOffNavBar(true);

      navigate("/");
    } catch (err) {
      console.log(e);
    }
  };
  const { setShowOffNavBar } = useContext(PostContext);
  return (
    <div className="container small-container">
      <h1 className="my-3">Tạo bài viết</h1>
      <center>
        <div className="container_form">
          <div className="container_wrap">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3 email" controlId="name">
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
                <Form.Label>Image File</Form.Label>
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
              <Form.Group className="mb-3 email" controlId="brand">
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
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </center>
    </div>
  );
}
