import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
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
