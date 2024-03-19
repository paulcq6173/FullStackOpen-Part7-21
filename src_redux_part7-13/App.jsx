import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import LogOutButton from './components/LogOutButton';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { updateBlog } from './reducers/blogReducer';
import { userLogin } from './reducers/userReducer';
import blogService from './services/blogs';
import './styles/main.css';

const App = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(updateBlog(blogs));
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(userLogin(user));
    }
  }, [dispatch]);

  const orderedBlogs = blogs.map((e) => e).sort((a, b) => b.likes - a.likes);

  const BlogFormComponent = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {user.username} logged in
          <LogOutButton />
        </p>
        <div>
          <BlogFormComponent />
          <hr />

          <div className="blog-style">
            {orderedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
