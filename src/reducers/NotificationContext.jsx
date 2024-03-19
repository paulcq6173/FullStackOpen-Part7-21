import { createContext, useContext, useReducer } from 'react';

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return { message: action.payload };
    case 'SUCCESS':
      return { message: action.payload };
    case 'RESET':
      return { message: '' };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotifyValue = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

export const useNotifyDispatch = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

export const NotificationContextProvider = (props) => {
  const [notify, notifyDispatch] = useReducer(NotificationReducer, '');

  return (
    <NotificationContext.Provider value={[notify, notifyDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
