import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.user = { ...action.payload };
    },
    loginUser: (state) => {
      state.user = { ...JSON.parse(localStorage.getItem('blog-platform-userState')) };
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser, signInUser } = userSlice.actions;

export default userSlice.reducer;
