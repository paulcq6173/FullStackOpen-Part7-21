import { useDispatch } from 'react-redux';
import { userLogout } from '../reducers/userReducer';
import blogService from '../services/blogs';

const LogOutButton = () => {
  const dispatch = useDispatch();

  const handleLogOutClick = (event) => {
    event.preventDefault();
    const localStorage = window.localStorage;
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      localStorage.removeItem('loggedUser');
      dispatch(userLogout());
      blogService.setToken(null);
    }
  };

  return (
    <button className="btn-normal" onClick={handleLogOutClick}>
      log out
    </button>
  );
};

export default LogOutButton;
