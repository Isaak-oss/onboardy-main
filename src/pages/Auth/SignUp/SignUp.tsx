"use client";

import { authApi } from "../../../api/auth/authApi.ts";
import GoogleAuthBtn from "../components/GoogleAuthBtn.tsx";
import { useAppDispatch } from "../../../store/store.ts";
import { setAuth, setToken } from "../../../store/slices/authSlice.ts";
import { useMutation } from "@tanstack/react-query";
import { parseServerError, setServerErrorToForm } from "../../../services/parse.ts";
import { Controller, useForm } from "react-hook-form";
import { LoginScheme } from "../../../types/formTypes.ts";
import CustomInput from "../../../components/CustomInput/CustomInput.tsx";
import CustomBtn from "../../../components/CustomBtn/CustomBtn.tsx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../../../components/LanguageChanger/LanguageChanger.tsx";

const SignUp = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setError } = useForm<LoginScheme>();

  const { mutate, isLoading } = useMutation(
    ({ email, password }: LoginScheme) => authApi.register(email, password),
    {
      onSuccess: (data) => {
        dispatch(setAuth(true));
        dispatch(setToken(data?.access_token));
        router.push("/configuration");
      },
      onError: (error) => {
        setServerErrorToForm(parseServerError(error)?.error, setError);
      },
    },
  );

  const onSubmit = (data: LoginScheme) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-300">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {t("Sign up to your account")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                {t("Email address")}
              </label>
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"email"}
                  rules={{ required: { message: "This field is Required!", value: true } }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomInput value={value} onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  {t("Password")}
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {t("Forgot password")}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"password"}
                  rules={{ required: { message: "This field is Required!", value: true } }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomInput value={value} onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
            </div>
            <div>
              <CustomBtn title={t("Sign up")} isLoading={isLoading} style={{ width: "100%" }} />
            </div>
          </div>

          <Link
            href={"/auth/signIn"}
            className="mt-5 font-semibold text-indigo-600 hover:text-indigo-500 w-full flex items-center justify-center"
          >
            {t("Sign in")}
          </Link>
          <GoogleAuthBtn />
          <div className="flex flex-1 justify-center mt-2">
            <LanguageChanger />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
