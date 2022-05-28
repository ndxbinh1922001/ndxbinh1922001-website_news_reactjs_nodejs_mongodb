import "./App.css";
import {
  Button,
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "./components/constant";
import SearchScreen from "./screens/SearchScreen";
import moment from "moment";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PostListScreen from "./screens/PostListScreen";
import PostEditScreen from "./screens/PostEditScreen";
import UncheckPostListScreen from "./screens/UncheckPostListScreen";
export const PostContext = React.createContext();
function App() {
  const [categories, setCategories] = useState([]);
  const [showNavBar, setShowOffNavBar] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    const checklogin = () => {
      localStorage.getItem("userInfo")
        ? setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
        : setUserInfo(null);
    };
    fetchCategories();
    checklogin();
  }, []);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    window.location.href = "/";
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        search,
        setSearch,
        showNavBar,
        setShowOffNavBar,
        userInfo,
        setUserInfo,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar bg="white" expand="lg" className="ms-5">
              <Container>
                <Navbar.Brand
                  onClick={() => {
                    setShowOffNavBar(true);
                  }}
                  href="/"
                >
                  <img
                    src="https://s1.vnecdn.net/vnexpress/restruct/i/v607/v2_2019/pc/graphics/logo.svg"
                    alt="VnExpress - Bao tieng Viet nhieu nguoi xem nhat"
                  />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">{moment().format("DD/MM/YYYY")}</Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            {showNavBar && (
              <div className="Nav-phu">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUserAlt /> Tài khoản
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/create">
                      <NavDropdown.Item>
                        <FaUserAlt /> Create Post
                      </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />

                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      <FaSignInAlt /> Đăng xuất
                    </Link>
                  </NavDropdown>
                ) : (
                  <Button
                    href="/login"
                    variant="outline-success"
                    className="ms-3"
                  >
                    Đăng nhập
                  </Button>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>List User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/listposts">
                      <NavDropdown.Item>List Post</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/checkpost">
                      <NavDropdown.Item>Check post</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Form className="d-flex ms-3">
                  <FormControl
                    type="search"
                    placeholder="Tìm kiếm"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form>
              </div>
            )}
          </header>
          {showNavBar && (
            <div className="danh_muc">
              {categories.map((category) => (
                <Button
                  href={`/search?category=${category}`}
                  variant="outline-secondary"
                  className="me-1 ms-1"
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/admin/listposts" element={<PostListScreen />} />
                <Route path="/admin/editposts/:id" element={<PostEditScreen />} />
                <Route path="/admin/checkpost" element={<UncheckPostListScreen />} />

                <Route path="/admin/users/:id" element={<UserEditScreen />} />
                <Route path="/api/users/signup" element={<SignUpScreen />} />

                <Route path="/admin/users" element={<UserListScreen />} />
                <Route path="/create" element={<CreatePostScreen />} />

                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/post/:slug" element={<PostScreen />} />
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </PostContext.Provider>
  );
}

export default App;
