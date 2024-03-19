import { useDispatch } from 'react-redux';
import useField from '../hooks/useField';
import { createNewBlog } from '../reducers/blogReducer';
import { setMessage } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

const BlogForm = () => {
  const dispatch = useDispatch();
  const useTitle = useField('title');
  const useAuthor = useField('author');
  const useUrl = useField('url');

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: useTitle.value,
      author: useAuthor.value,
      url: useUrl.value,
    };

    try {
      const blog = await blogService.create(newBlog);
      dispatch(createNewBlog(blog));

      // Clear input values
      useTitle.onReset();
      useAuthor.onReset();
      useUrl.onReset();

      dispatch(setMessage(`New blog title: ${blog.title} created.`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 3000);
    } catch (error) {
      const errMessage = `Error: ${error.response.data.error}`;
      dispatch(setMessage(errMessage));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form data-testid="testForm" onSubmit={addBlog}>
        <li>
          title:
          <input id="input-title" placeholder="input title" {...useTitle} />
        </li>
        <li>
          author:
          <input id="input-author" placeholder="input author" {...useAuthor} />
        </li>
        <li>
          url:
          <input id="input-url" placeholder="input url" {...useUrl} />
        </li>

        <button className="btn-normal" type="submit">
          create
        </button>
        <br />
      </form>
    </div>
  );
};

export default BlogForm;
