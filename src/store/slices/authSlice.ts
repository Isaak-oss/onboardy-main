"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/rawTypes.ts";
import { isAuthName, tokenName } from "../../consts/consts.ts";

interface AuthState {
  isAuth: boolean;
  token: string | null;
  user: User | null;
}

const isAuth = localStorage.getItem(isAuthName);
const token = localStorage.getItem(tokenName);

const initialState: AuthState = {
  isAuth: isAuth ? JSON.parse(isAuth) : false,
  token: token || null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(tokenName, action.payload);
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      localStorage.setItem(isAuthName, JSON.stringify(action.payload));
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    deleteAuth: (state) => {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem(isAuthName);
      localStorage.removeItem(tokenName);
    },
  },
});

export const { setToken, setAuth, setUser, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
