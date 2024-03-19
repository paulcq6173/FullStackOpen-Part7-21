import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useNotifyDispatch } from '../reducers/NotificationContext';
import blogService from '../services/blogs';
import LikeButton from './sub-components/LikeButton';

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const notifyDispatch = useNotifyDispatch();
  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation(blogService.deleteBlogById, {
    onSuccess: (data, reqId) => {
      const blogs = queryClient.getQueryData('blogs');
      const newBlogs = blogs.filter((e) => e.id !== reqId);

      queryClient.setQueryData('blogs', newBlogs);

      const mes = `Blog: ${blog.title} deleted`;
      notifyDispatch({ type: 'SUCCESS', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 3000);
    },
    onError: (error) => {
      const mes = error.response.data.error;
      notifyDispatch({ type: 'ERROR', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 5000);
    },
  });

  const isAuthorized = blog.user.username === user.username;

  const handleDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }

    deleteBlogMutation.mutate(blog.id);
  };

  return (
    <div data-testid="blogContent" className="blog-layout">
      {showDetails ? (
        <div>
          <li key={blog.id}>
            <Link className="link-blogDetails" to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
            <button
              className="btn-normal"
              onClick={() => setShowDetails(false)}
            >
              hide
            </button>
          </li>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}
            <LikeButton blog={blog} />
          </li>
          <li>{blog.user.username}</li>
          {isAuthorized && (
            <button className="btn-red" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      ) : (
        <div data-testid="testblog1">
          <Link className="link-blogDetails" to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
          <button
            data-testid="viewButton"
            className="btn-normal"
            onClick={() => setShowDetails(true)}
          >
            view
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
