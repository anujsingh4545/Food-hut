import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menu: [{}],
  loading: false,
  error: false,
};

const menuSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    startFetchingFood: (state) => {
      state.loading = true;
    },

    doneFetchingFood: (state, action) => {
      state.menu = action.payload;
      state.loading = false;
    },

    errorFetchingFood: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {startFetchingFood, doneFetchingFood, errorFetchingFood} = menuSlice.actions;
export default menuSlice.reducer;
