import axiosTypes from "../constants/axiosTypes";
import endpoints from "../constants/endpoints";
import keys from "../constants/localStorageKeys";
import useAxios from "../composables/useAxios";
import userTypes from "src/constants/userTypes";
import { LocalStorage } from "quasar";
import SERVER from "src/constants/server-url";

const login = async (data) => {
  let user = null;
  let jwt = null;
  let error = null;
  let success = false;

  if (data) {
    const { email, password } = data;
    const params = { identifier: email, password: password };

    await useAxios(params, axiosTypes.POST, SERVER.loginURL) // login api
      .then(async (res) => {
        user = res.data.user;
        jwt = res.data.jwt;
        LocalStorage.set(keys.USER, { jwt, user });
        success = true;
      })
      .catch((err) => {
        console.log("ERROR", err);
        error = { message: err.response.data.error };
      });
  } else {
    error = { message: "username or password is empty" };
  }

  return { error, success };
};

export { login };
