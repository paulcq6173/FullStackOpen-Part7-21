import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';

const NaviBar = ({ user }) => {
  return (
    <div className="navi">
      <Link to="/">home</Link>
      <Link to="/users">users</Link>
      {user ? (
        <div>
          <span>{user.username} logged in</span>
          <LogOutButton />
        </div>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  );
};

export default NaviBar;
