import { useUserDispatch } from '../reducers/UserContext';
import blogService from '../services/blogs';

const LogOutButton = () => {
  const userDispatch = useUserDispatch();

  const handleLogOutClick = (event) => {
    event.preventDefault();
    const localStorage = window.localStorage;
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      localStorage.removeItem('loggedUser');
      userDispatch({ type: 'RESET' });
      blogService.setToken(null);
    }
  };

  return (
    <button className="btn-navi" onClick={handleLogOutClick}>
      log out
    </button>
  );
};

export default LogOutButton;
