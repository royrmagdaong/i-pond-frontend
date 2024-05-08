import axios from "axios";
import keys from "../constants/localStorageKeys";
import axiosTypes from "../constants/axiosTypes";
import { LocalStorage } from "quasar";
import baseURL from "src/constants/server-url";

export default function useAxios(data, type, URL) {
  const user = LocalStorage.getItem(keys.USER);
  // const token = user ? user.jwt : null;
  const token = LocalStorage.getItem("ipond-user")?.jwt;

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
