import { ref } from "vue";

const navDrawerLinks = ref([
  {
    name: "pond-1",
    active: true,
  },
  {
    name: "pond-2",
    active: false,
  },
  {
    name: "pond-3",
    active: false,
  },
  {
    name: "pond-4",
    active: false,
  },
  {
    name: "pond-5",
    active: false,
  },
]);

const fullpageLoaderState = ref(false);
const activeLink = ref("");

export { navDrawerLinks, fullpageLoaderState, activeLink };
