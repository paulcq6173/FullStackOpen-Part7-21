import { createContext, useContext, useReducer } from 'react';

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET':
      return payload;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context[0];
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  return context[1];
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
