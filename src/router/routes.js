const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: (to) => {
          return { path: "login" };
        },
      },
      {
        path: "/login",
        meta: {
          notLoggedIn: true,
        },
        component: () => import("src/pages/LoginPage.vue"),
      },
      {
        path: "/dashboard",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
