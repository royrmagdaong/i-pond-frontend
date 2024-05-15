<template>
  <q-item
    clickable
    @click="routeTo(link.link)"
    :class="{
      active: getActiveLink(link.link),
      inactive: !getActiveLink(link.link),
    }"
    class="link-item"
  >
    <q-item-section v-if="link.icon" avatar>
      <q-icon :name="link.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ link.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import { ref, onMounted } from "vue";
import keys from "../constants/localStorageKeys";
import { navDrawerLinks } from "src/composables/globalRefs";
import { activeLink } from "src/composables/globalRefs";

const props = defineProps(["link"]);
const router = useRouter();
const loading = ref(false);
const active = ref(false);

const routeTo = (path) => {
  switch (path) {
    case "pond-1":
      router.push({ path: "/pond-1" });
      setActive();
      break;
    case "pond-2":
      router.push({ path: "/pond-2" });
      setActive();
      break;
    case "pond-3":
      router.push({ path: "/pond-3" });
      setActive();
      break;
    case "pond-4":
      router.push({ path: "/pond-4" });
      setActive();
      break;
    case "pond-5":
      router.push({ path: "/pond-5" });
      setActive();
      break;
    case "demo-pond":
      router.push({ path: "/demo-pond" });
      setActive();
      break;
    case "report":
      router.push({ path: "/report" });
      setActive();
      break;
    case "logout":
      setActive();
      logout();
      break;
    default:
      console.log("default");
  }
};

const getActiveLink = (val) => {
  // console.log("get active link", val);
  if (val === activeLink.value) {
    return true;
  } else {
    return false;
  }
};

const logout = () => {
  loading.value = true;
  setTimeout(() => {
    LocalStorage.remove(keys.USER);
    router.push({ path: "/login" });
  }, 400);
};

const setActive = () => {
  activeLink.value = props.link.link;
};

const initActiveLink = () => {
  console.log("active link");
  if (router.currentRoute.value.path.includes(`/${props.link.link}`)) {
    active.value = true;
    activeLink.value = props.link.link;
    console.log("active ll", props.link.link);
  }
};

onMounted(() => {
  initActiveLink();
});
</script>
<style scoped>
.link-item {
  display: flex;
  align-items: center;
  padding: 15px 0 15px 24px;
  margin-right: 24px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  justify-content: space-between;
}
.link-item p {
  font-size: 20px;
  margin: 0;
}
.link-icon {
  margin-right: 12px;
  font-size: 30px;
}
.active {
  background-color: #3b45b6;
  color: #f8fafa;
  font-weight: 500;
}
.inactive {
  color: #8a8a8a;
  font-weight: 400;
}
.link-item:hover {
  cursor: pointer;
  background-color: #3b45b6;
  color: #f8fafa;
  font-weight: 500;
}
</style>
