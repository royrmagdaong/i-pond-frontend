<template>
  <q-layout class="login-layout" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          style="color: #fff"
        />

        <q-toolbar-title style="color: #fff"> iPond </q-toolbar-title>
        <q-btn
          color="grey-6"
          round
          flat
          icon="more_horiz"
          style="color: #fff !important"
        >
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
        <div class="q-mb-xl">
          <div class="flex items-center flex-center q-mb-lg">
            <div class="">
              <div class="text-center q-mb-sm">
                <q-img
                  :src="logo2"
                  alt="logo"
                  id="logo2"
                  width="60px"
                  height="65px"
                  style="margin-right: 4px"
                />
                <q-img
                  :src="logo3"
                  alt="logo"
                  id="logo3"
                  width="60px"
                  min-height="60px"
                  class="q-mr-sm"
                />
                <q-img
                  :src="logo4"
                  alt="logo"
                  id="logo4"
                  width="60px"
                  min-height="60px"
                  class="q-mr-sm"
                />
                <q-img
                  :src="logo"
                  alt="logo"
                  id="logo"
                  height="60px"
                  width="55px"
                />
              </div>
              <p class="q-ma-none text-h5 text-center">i-Pond</p>
              <p class="q-mt-sm q-mb-none text-caption text-center">
                A LoRaWAN-based Pond Water Quality Control
                <br />
                <span>and Monitoring System</span>
              </p>
            </div>
          </div>
        </div>
        <hr />
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

import logo from "/icons/Picture1.jpg";
import logo2 from "/icons/Picture2.png";
import logo3 from "/icons/Picture3.png";
import logo4 from "/icons/Picture4.jpg";

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
