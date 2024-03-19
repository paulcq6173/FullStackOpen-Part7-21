import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

/**
 * @see main.jsx, LoginForm.jsx, BlogForm.jsx
 */
const blogSlice = createSlice({
  name: 'blogs', // combination reducer name
  initialState,
  reducers: {
    createNewBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const reqId = action.payload;
      const newState = state.filter((e) => e.id !== reqId);

      return newState;
    },
  },
});

export const { createNewBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
