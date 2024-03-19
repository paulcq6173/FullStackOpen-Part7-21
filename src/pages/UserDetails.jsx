import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import userService from '../services/userService';

const UserDetails = ({ blogs }) => {
  const userId = useParams().id;
  const result = useQuery('users', () => userService.getAll(), {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    <div>Error occurs when loading userID:{userId} info</div>;
  }

  const users = result.data;
  const user = users.find((e) => e.id === userId);

  if (!user) {
    return <p>Requested user info not found</p>;
  }
  const filteredBlogs = blogs.filter((e) => e.user.id === userId);

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>Added Blogs</h3>
      <div>
        <ul>
          {filteredBlogs.map((e, index) => (
            <li key={index}>
              <Link to={`/blogs/${e.id}`}>{e.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
