import { useNotifyValue } from '../reducers/NotificationContext';

const Notification = () => {
  const notify = useNotifyValue();

  if (!notify || notify.message === '' || !notify.message) {
    return null;
  }
  const { message } = notify;
  const lowerCaseMes = message.toLowerCase();
  if (lowerCaseMes.includes('error') || lowerCaseMes.includes('fail')) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
