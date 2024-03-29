import axios from "axios";
import {lookInSession} from "./session";

export const userdata = async () => {
  let userSession = lookInSession("token");

  if (!userSession) return null;

  const res = await axios.post(
    "http://localhost:8000/api/getuser",
    {},
    {
      headers: {
        authorization: userSession,
      },
    }
  );
  if (res.data.success) {
    return res.data;
  } else {
    return null;
  }
};
