import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
// import {authUser} from "../store/atom/auth";
import axios from "axios";
import {lookInSession, removeFromSession} from "./session";
import {Navigate, useNavigate} from "react-router-dom";

export const ProtectedRoute = ({children}) => {
  // const [user, setUser] = useRecoilState(authUser);
  // const getUser = async () => {
  //   try {
  //     let userSession = lookInSession("token");
  //     const res = await axios.post(
  //       "http://localhost:8000/api/getuser",
  //       {},
  //       {
  //         headers: {
  //           authorization: userSession,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       await setUser(res.data.data);
  //     } else {
  //       removeFromSession("token");
  //       <Navigate to="/login" />;
  //     }
  //   } catch (error) {
  //     removeFromSession("token");
  //   }
  // };
  // useEffect(() => {
  //   if (!user) {
  //     getUser();
  //   }
  // }, [user]);
  // if (lookInSession("token")) {
  //   return children;
  // } else {
  //   return <Navigate to="/login" />;
  // }
};
