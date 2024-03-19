import { useDispatch } from 'react-redux';
import useField from '../hooks/useField';
import { setMessage } from '../reducers/notificationReducer';
import { userLogin } from '../reducers/userReducer';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = () => {
  const dispatch = useDispatch();
  const useUserName = useField('username');
  const usePassword = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: useUserName.value,
        password: usePassword.value,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(userLogin(user));

      // Clear input values
      useUserName.onReset;
      usePassword.onReset;

      dispatch(setMessage('Welcome back to Blog list app'));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 3000);
    } catch (exception) {
      dispatch(setMessage('Error: Incorrect username or password'));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          className="input-normal"
          id="username"
          name="Username"
          {...useUserName}
        />
      </div>
      <div>
        password
        <input
          className="input-normal"
          id="password"
          name="Password"
          {...usePassword}
        />
      </div>
      <button className="btn-normal" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
