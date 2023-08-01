import axios from "axios";
import keys from "../constants/localStorageKeys";
import axiosTypes from "../constants/axiosTypes";
import { LocalStorage } from "quasar";
import server_url from "src/constants/server-url";

export default function useAxios(data, type, URL) {
  const user = LocalStorage.getItem(keys.USER);
  // const token = user ? user.jwt : null;
  const token =
    "c4d7aa970fd60903bc8e7cf55f556aa2c360425ffa1c966d4a259e2e0f44583cc335465ae0b48ef5cb0f3e14e5aa83e78ab047a6cc935c82cd7fc040549035b088ede9cbd4a25d70efbbf7bcb9e922a09b0b59727b985e282e2c6b747833f3b0e77a508b032f41b9b79c2659bfe8e9c477227f50678b709aca07cf4055c0195c";
  // const baseURL = `${server_url}/api/`;
  const baseURL = `https://i-pond-backend.ap.ngrok.io/api/`;

  switch (type) {
    case axiosTypes.GET:
      return token
        ? axios.get(`${URL}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : axios.get(`${URL}`);
    case axiosTypes.POST:
      return token
        ? axios.post(`${URL}`, data, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        : axios.post(`${URL}`, data);

    case axiosTypes.PUT:
      return axios.put(
        `${baseURL}${URL}`,
        { data },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      break;
    case axiosTypes.DELETE:
      break;
    default:
      break;
  }
}
