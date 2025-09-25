"use client";

import useAuth from "../hooks/useAuth.ts";
import { useAppDispatch } from "../store/store.ts";
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth/authApi.ts";
import { redirect } from "next/navigation";
import { setUser } from "../store/slices/authSlice.ts";
import Header from "../components/Header/Header.tsx";
import { useCleanPathname } from "../hooks/useCleanPathname.ts";

const hiddenHeaderPaths = ["/auth/signIn", "/auth/signUp", "/"];

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const pathname = useCleanPathname();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const { data: user } = useQuery(["user"], authApi.getUser, { enabled: isAuth });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  if (!isAuth && !pathname?.includes("auth") && pathname !== "/") {
    redirect("/auth/signIn");
    return;
  } else if (isAuth && pathname === "/") {
    redirect("/projects");
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      {!hiddenHeaderPaths.some((path) => pathname === path) && <Header />}
      {children}
    </div>
  );
};

export default ProtectedLayout;
