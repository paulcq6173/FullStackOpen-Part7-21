import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import userService from '../services/userService';

const Users = () => {
  const result = useQuery('users', () => userService.getAll(), {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>Blog App service disabled due to problems in server</div>;
  }

  const users = result.data;

  return (
    <div>
      <h1>Users</h1>
      <div className="grid-users">
        <div className="grid-users-field">
          {users.map((e, index) => (
            <li key={index}>
              <Link
                to={`/users/${e.id.toString()}`}
                className="link-userDetails"
              >
                {e.username}
              </Link>
            </li>
          ))}
        </div>
        <div className="grid-users-value">
          <label>
            <strong>Blogs created</strong>
          </label>
          {users.map((e, index) => (
            <li key={index}>{e.blogs.length}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
