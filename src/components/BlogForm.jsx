import { useMutation, useQueryClient } from 'react-query';
import useField from '../hooks/useField';
import { useNotifyDispatch } from '../reducers/NotificationContext';
import blogService from '../services/blogs';

const BlogForm = () => {
  const notifyDispatch = useNotifyDispatch();
  const useTitle = useField('title');
  const useAuthor = useField('author');
  const useUrl = useField('url');
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.concat(newBlog));

      // Clear input values
      useTitle.onReset();
      useAuthor.onReset();
      useUrl.onReset();

      const mes = `New blog title: ${newBlog.title} created.`;
      notifyDispatch({ type: 'SUCCESS', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 3000);
    },
    onError: (error) => {
      const errMes = `Error: ${error.response.data.error}`;
      notifyDispatch({ type: 'ERROR', payload: errMes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 5000);
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: useTitle.value,
      author: useAuthor.value,
      url: useUrl.value,
    };

    newBlogMutation.mutate(newBlog);
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

        <button className="btn-normal">create</button>
        <br />
      </form>
    </div>
  );
};

export default BlogForm;
