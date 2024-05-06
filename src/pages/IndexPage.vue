<template>
  <q-layout class="login-layout" view="lHh Lpr lFf">
    <q-header elevated style="background-color: #eee !important">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          style="color: #242424"
        />

        <q-toolbar-title style="color: #242424"> iPond </q-toolbar-title>
        <q-btn color="grey-6" round flat icon="more_horiz">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-mt-xl">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          :link="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import keys from "../constants/localStorageKeys";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Pond 1",
    icon: "water_drop",
    link: "pond-1",
  },
  {
    title: "Pond 2",
    icon: "water_drop",
    link: "pond-2",
  },
  {
    title: "Pond 3",
    icon: "water_drop",
    link: "pond-3",
  },
  {
    title: "Pond 4",
    icon: "water_drop",
    link: "pond-4",
  },
  {
    title: "Pond 5",
    icon: "water_drop",
    link: "pond-5",
  },
  {
    title: "Demo Pond",
    icon: "water_drop",
    link: "demo-pond",
  },
  // {
  //   title: "Report",
  //   icon: "summarize",
  //   link: "report",
  // },
  {
    title: "Logout",
    icon: "logout",
    link: "logout",
  },
];
const leftDrawerOpen = ref(false);
const router = useRouter();
const loading = ref(false);

const logout = () => {
  loading.value = true;
  setTimeout(() => {
    LocalStorage.remove(keys.USER);
    router.push({ path: "/login" });
  }, 400);
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<style scoped></style>
