import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../components/constant";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../App";

export default function UserListScreen() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);

  const { userInfo } = useContext(PostContext);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  },[userInfo,successDelete]);
  const deleteHandler = async (user) => {
    console.log(user);
    if (window.confirm("Are you sure to delete?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setSuccessDelete(prev=>!prev)
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>IS ADMIN</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "YES" : "NO"}</td>
            <td>
              <Button
                type="button"
                variant="light"
                onClick={() => navigate(`/admin/users/${user._id}`)}
              >
                Edit
              </Button>
              &nbsp;
              <Button
                type="button"
                variant="light"
                onClick={() => deleteHandler(user)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
