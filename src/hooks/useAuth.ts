import { useAppSelector } from "../store/store.ts";

const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return { isAuth };
};

export default useAuth;
