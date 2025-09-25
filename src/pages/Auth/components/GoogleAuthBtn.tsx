import React, { useState } from "react";
import GoogleIcon from "../../../components/SvgIcons/GoogleIcon.tsx";
import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../../../api/auth/authApi.ts";
import { useAppDispatch } from "../../../store/store.ts";
import { setAuth, setToken } from "../../../store/slices/authSlice.ts";
import Loader from "../../../components/Loader/Loader.tsx";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const GoogleAuthBtn = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setIsLoading(true);
        const authRes = await authApi.signInWithGoogle(response.access_token);
        dispatch(setAuth(true));
        dispatch(setToken(authRes?.access_token));
        setIsLoading(false);
        router.push("/configuration");
      } catch (error) {
        console.error("Error fetching user info or adding account:", error);
      }
    },
    onError: (error) => console.log(error),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 bg-white rounded-lg shadow-sm mt-5 p-2 cursor-pointer">
        <Loader />
      </div>
    );
  }

  return (
    <div
      onClick={() => login()}
      className="flex items-center justify-center gap-2 bg-white rounded-lg shadow-sm mt-5 p-2 cursor-pointer"
    >
      <GoogleIcon />
      {t("Sign In With Google")}
    </div>
  );
};

export default GoogleAuthBtn;
