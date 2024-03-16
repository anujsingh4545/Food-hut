import {configureStore} from "@reduxjs/toolkit";
import userscilce from "./slice/user/userscilce";
import menuslice from "./slice/menu/menuslice";
import favslice from "./slice/menu/favouriteslice";

export const store = configureStore({
  reducer: {
    food: menuslice,
    user: userscilce,
    fav: favslice,
  },
});
