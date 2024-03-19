import useField from '../hooks/useField';
import { useNotifyDispatch } from '../reducers/NotificationContext';
import { useUserDispatch } from '../reducers/UserContext';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = () => {
  const useUserName = useField('username');
  const usePassword = useField('password');
  const notifyDispatch = useNotifyDispatch();
  const userDispatch = useUserDispatch();
  let mes = '';

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: useUserName.value,
        password: usePassword.value,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'SET', payload: user });

      useUserName.onReset;
      usePassword.onReset;

      mes = 'Welcome back to Blog list app';
      notifyDispatch({ type: 'SUCCESS', payload: mes });

      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 3000);
    } catch (exception) {
      mes = 'Error: Incorrect username or password';
      notifyDispatch({ type: 'ERROR', payload: mes });
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input className="input-normal" id="username" {...useUserName} />
        </div>
        <div>
          password
          <input className="input-normal" id="password" {...usePassword} />
        </div>
        <button className="btn-normal" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
