import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  favourite: [{}],
  loading: false,
  error: false,
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    startFetchingFav: (state) => {
      state.loading = true;
    },

    doneFetchingFav: (state, action) => {
      state.favourite = action.payload;
      state.loading = false;
    },

    errorFetchingFav: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {startFetchingFav, doneFetchingFav, errorFetchingFav} = favSlice.actions;
export default favSlice.reducer;
