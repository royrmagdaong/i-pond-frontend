import keys from "../constants/localStorageKeys";
import { LocalStorage } from "quasar";

const routeGuards = (Router) => {
  Router.beforeEach((to, from) => {
    const isLoggedIn = LocalStorage.getItem(keys.USER) ? true : false;
    // const isAdmin = isLoggedIn
    //   ? LocalStorage.getItem(keys.USER).user.role.type === "admin"
    //     ? true
    //     : false
    //   : false;

    if (to.meta.notLoggedIn && isLoggedIn) {
      console.log("you are already logged in");
      return {
        path: "/dashboard",
      };
    } else if (to.meta.requiresAuth && !isLoggedIn) {
      console.log("not logged in");
      return {
        path: "/login",
      };
    }
  });
};

export default routeGuards;
