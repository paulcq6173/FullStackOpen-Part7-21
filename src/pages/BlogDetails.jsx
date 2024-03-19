import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import LikeButton from '../components/sub-components/LikeButton';
import useComment from '../hooks/useComment';

const BlogDetails = ({ blogs }) => {
  const blogId = useParams().id;
  const [blogComments, commentSerivce] = useComment(blogId);
  const blog = blogs.find((e) => e.id === blogId);
  if (!blog) {
    return <p>Sorry, the blog that you requested not exists</p>;
  }

  return (
    <div className="link-blogDetails">
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <br />
      <span>
        {blog.likes} likes
        <LikeButton blog={blog} />
      </span>
      <p>Added by {blog.user.username}</p>
      <h2>Comments</h2>
      <CommentForm
        blogId={blog.id}
        comments={blogComments}
        service={commentSerivce}
      />
      <ul>
        {blogComments.map((e, index) => (
          <li key={index}>{e.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;
