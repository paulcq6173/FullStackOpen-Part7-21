import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
  name: 'user', // combination reducer name
  initialState,
  reducers: {
    userLogin(state, action) {
      return action.payload;
    },
    userLogout() {
      return null;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
