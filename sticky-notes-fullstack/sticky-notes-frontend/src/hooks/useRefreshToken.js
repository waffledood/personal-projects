import axios from "../components/api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/token/refresh/",
      {
        refresh: auth?.refreshToken,
      },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.access);
      return { ...prev, accessToken: response.data.access };
    });

    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
