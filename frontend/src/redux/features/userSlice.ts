import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  role: string;
  companyName: string;
  _id: string;
  slug: string;
  phone: string;
  account_status: string;
  avatar?: string;
}

interface IUserState {
  userInfo: UserInfo | null;
  role: string;
  token: string | null;
}

interface AccessToken {
  exp: number;
  role: string;
}

const returnRole = (token: string | null) => {
  if (token) {
    const decodeToken: AccessToken = jwtDecode(token);

    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

const initialState: IUserState = {
  userInfo: null,
  role: returnRole(localStorage.getItem("accessToken")),
  token: localStorage.getItem("accessToken"),
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.role = returnRole(localStorage.getItem("accessToken"));
      state.token = localStorage.getItem("accessToken") || null;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.role = "";
    },
  },
});

export default userSlice.reducer;

export const { setUser, userLogout } = userSlice.actions;
