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
        path: "/pond-1",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/DashboardPage.vue"),
          },
          {
            path: "ph",
            component: () => import("src/components/PHPage.vue"),
          },
          {
            path: "sal",
            component: () => import("src/components/SalPage.vue"),
          },
          {
            path: "temp",
            component: () => import("src/components/TempPage.vue"),
          },
          {
            path: "dox",
            component: () => import("src/components/DOXPage.vue"),
          },
        ],
      },
      {
        path: "/pond-2",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/DashboardPage.vue"),
          },
          {
            path: "ph",
            component: () => import("src/components/PHPage.vue"),
          },
          {
            path: "sal",
            component: () => import("src/components/SalPage.vue"),
          },
          {
            path: "temp",
            component: () => import("src/components/TempPage.vue"),
          },
          {
            path: "dox",
            component: () => import("src/components/DOXPage.vue"),
          },
        ],
      },
      {
        path: "/pond-3",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/DashboardPage.vue"),
          },
          {
            path: "ph",
            component: () => import("src/components/PHPage.vue"),
          },
          {
            path: "sal",
            component: () => import("src/components/SalPage.vue"),
          },
          {
            path: "temp",
            component: () => import("src/components/TempPage.vue"),
          },
          {
            path: "dox",
            component: () => import("src/components/DOXPage.vue"),
          },
        ],
      },
      {
        path: "/pond-4",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/DashboardPage.vue"),
          },
          {
            path: "ph",
            component: () => import("src/components/PHPage.vue"),
          },
          {
            path: "sal",
            component: () => import("src/components/SalPage.vue"),
          },
          {
            path: "temp",
            component: () => import("src/components/TempPage.vue"),
          },
          {
            path: "dox",
            component: () => import("src/components/DOXPage.vue"),
          },
        ],
      },
      {
        path: "/pond-5",
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/DashboardPage.vue"),
          },
          {
            path: "ph",
            component: () => import("src/components/PHPage.vue"),
          },
          {
            path: "sal",
            component: () => import("src/components/SalPage.vue"),
          },
          {
            path: "temp",
            component: () => import("src/components/TempPage.vue"),
          },
          {
            path: "dox",
            component: () => import("src/components/DOXPage.vue"),
          },
        ],
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
