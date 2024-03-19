import { createContext, useContext, useReducer } from 'react';

const CommentReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return [...state, payload];
    case 'SET':
      return payload;
    case 'DELETE':
      return state.filter((e) => e.id !== payload);
    default:
      return state;
  }
};

const CommentContext = createContext();

export const useBlogs = () => {
  const context = useContext(CommentContext);
  return context[0];
};

export const useBlogDispatch = () => {
  const context = useContext(CommentContext);
  return context[1];
};

export const CommentContextProvider = (props) => {
  const [comments, commentDispatch] = useReducer(CommentReducer, []);

  return (
    <CommentContext.Provider value={[comments, commentDispatch]}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
