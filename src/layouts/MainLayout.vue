<template>
  <q-layout>
    <FullpageLoader v-if="fullpageLoaderState" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import FullpageLoader from "../components/FullpageLoader.vue";
import { fullpageLoaderState } from "src/composables/globalRefs";
</script>
