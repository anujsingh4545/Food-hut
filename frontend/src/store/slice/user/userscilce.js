import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  error: false,
  loading: false,
};

const userSclice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;

      state.currentUser = action.payload;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = false;
      state.loading = false;
    },
  },
});

export const {signInStart, signInSuccess, signoutSuccess, updateFailure, updateStart, signInFailure} = userSclice.actions;

export default userSclice.reducer;
