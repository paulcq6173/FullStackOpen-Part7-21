import { createContext, useContext, useReducer } from 'react';

const BlogReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return [...state, payload];
    case 'SET':
      return payload;
    case 'UPDATE':
      return state.map((e) => (e.id === payload.id ? payload : e));
    case 'DELETE':
      return state.filter((e) => e.id !== payload);
    default:
      return state;
  }
};

const BlogContext = createContext();

export const useBlogs = () => {
  const context = useContext(BlogContext);
  return context[0];
};

export const useBlogDispatch = () => {
  const context = useContext(BlogContext);
  return context[1];
};

export const BlogContextProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(BlogReducer, []);

  return (
    <BlogContext.Provider value={[blogs, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
