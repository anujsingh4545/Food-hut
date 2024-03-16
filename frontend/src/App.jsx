import "./App.css";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./shared/Navbar";
import {useEffect, useRef} from "react";
import Menu from "./pages/Menu";
import AddFood from "./pages/AddFood";
import {userdata} from "./common/UserData";
import {useDispatch, useSelector} from "react-redux";
import {signInFailure, signInStart, signInSuccess} from "./store/slice/user/userscilce";
import Loader from "./common/Loader";
import TodaySpecial from "./component/TodaySpecial";
import FoodDetail from "./pages/FoodDetail";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";

function App() {
  const dispatch = useDispatch();
  const {loading, error, currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const getdata = async () => {
      dispatch(signInStart());
      const data = await userdata();

      if (data) {
        dispatch(signInSuccess(data));
      } else {
        dispatch(signInFailure(data));
      }
    };

    getdata();
  }, []);

  // ******************************************************************************
  // useEffect(() => {
  //   const loaderTimeout = setTimeout(() => {
  //     setLoading(false);
  //     s;
  //   }, 1000);
  //   return () => {
  //     clearTimeout(loaderTimeout);
  //   };
  // }, []);

  // ******************************************************************************

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<FoodDetail />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail" element={<FoodDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
