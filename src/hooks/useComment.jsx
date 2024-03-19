import { useEffect, useState } from 'react';
import blogService from '../services/blogs';

const useComment = (blogId) => {
  const [comments, setComments] = useState([]);

  const service = { setComments };

  useEffect(() => {
    async function fetchData() {
      const data = await blogService.getBlogComments(blogId);
      setComments(data);
    }

    fetchData();
  }, [blogId]);

  return [comments, service];
};

export default useComment;
