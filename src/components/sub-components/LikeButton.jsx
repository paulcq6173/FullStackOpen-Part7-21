import { useMutation, useQueryClient } from 'react-query';
import { useNotifyDispatch } from '../../reducers/NotificationContext';
import blogService from '../../services/blogs';

const LikeButton = ({ blog }) => {
  const notifyDispatch = useNotifyDispatch();
  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      const newBlogs = blogs.map((e) =>
        e.id === updatedBlog.id ? updatedBlog : e
      );

      queryClient.setQueryData('blogs', newBlogs);

      const mes = `You added like: ${blog.title}`;
      notifyDispatch({ type: 'SUCCESS', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 3000);
    },
    onError: (error) => {
      const mes = error.response.data.message;
      notifyDispatch({ type: 'ERROR', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 5000);
    },
  });

  const handleLikeClick = async (event) => {
    event.preventDefault();

    const { likes, user } = blog;
    const updateObj = { ...blog, likes: likes + 1, user: user.id };
    likeBlogMutation.mutate(updateObj);
  };

  return (
    <button
      data-testid="testLikeButton"
      className="btn-red"
      onClick={handleLikeClick}
    >
      like
    </button>
  );
};

export default LikeButton;
