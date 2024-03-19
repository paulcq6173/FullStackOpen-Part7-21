import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

const Home = ({ blogs, user }) => {
  const BlogFormComponent = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      <BlogFormComponent />
      <hr />

      <div className="blog-style">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
