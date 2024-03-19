import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NaviBar from './components/NaviBar';
import Notification from './components/Notification';
import BlogDetails from './pages/BlogDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import Users from './pages/Users';
import UserContext from './reducers/UserContext';
import blogService from './services/blogs';
import './styles/main.css';

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  const result = useQuery('blogs', () => blogService.getAll(), {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SET', payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Blog App service disabled due to problems in server</div>;
  }

  const blogs = result.data;

  const orderedBlogs = blogs.map((e) => e).sort((a, b) => b.likes - a.likes);

  if (user === null) {
    return (
      <div>
        <div>
          <h2>Log in to application</h2>
          <NaviBar user={user} />
          <Notification />
          <div className="loginForm">
            <LoginForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <header>
        <h2>Blogs</h2>
        <NaviBar user={user} />
        <Notification />
      </header>
      <div style={{ marginTop: '10px' }}>
        <Routes>
          <Route path="/" element={<Home blogs={orderedBlogs} user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users blogs={blogs} />} />
          <Route path="/users/:id" element={<UserDetails blogs={blogs} />} />
          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
