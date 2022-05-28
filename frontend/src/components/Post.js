import { Card, Button } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

function Post(props) {
  const { post } = props;
  return (
    <Card>
      <Link to={`/post/${post.slug}`}>
        <Card.Img variant="top" src={post.image} />
      </Link>
      <Card.Body>
        <Button href={`/post/${post.slug}`} variant="light">
          <Card.Title>{post.title}</Card.Title>
        </Button>

        <Card.Text>
          {post.content.length > 100
            ? post.content.slice(0, 100).concat("...")
            : post.content}
        </Card.Text>
        <Card.Subtitle>
          {moment(post.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default Post;
