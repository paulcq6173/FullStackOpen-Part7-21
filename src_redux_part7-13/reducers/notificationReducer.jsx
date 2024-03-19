import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const newState = {
        message: action.payload,
      };
      return newState;
    },
  },
});

export const { setMessage } = notifySlice.actions;
export default notifySlice.reducer;
