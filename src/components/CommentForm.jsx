import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNotifyDispatch } from '../reducers/NotificationContext';
import blogService from '../services/blogs';

const CommentForm = ({ blogId, comments, service }) => {
  const [comment, setComment] = useState('');
  const notifyDispatch = useNotifyDispatch();

  const newCommentMutation = useMutation(blogService.createComment, {
    onSuccess: (comment) => {
      setComment('');
      service.setComments(comments.concat(comment));

      const mes = `New comment: ${comment.content} created.`;
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

  const submitComment = (event) => {
    event.preventDefault();

    if (!comment || comment.replace(' ', '') === '') {
      const errMes = 'Error: comment cannot be blank';
      notifyDispatch({ type: 'ERROR', payload: errMes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 5000);
      return;
    }

    const newObject = {
      content: comment,
      blogId: blogId,
    };
    newCommentMutation.mutate(newObject);
  };

  return (
    <div>
      <form onSubmit={submitComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
