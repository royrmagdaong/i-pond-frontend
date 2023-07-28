<template>
  <div class="back-btn">
    <q-icon name="arrow_back" @click="back" size="md" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const back = () => {
  router.push({ path: "/dashboard" });
};
</script>
<style scoped>
.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 111;
}
.back-btn:hover {
  cursor: pointer;
}
</style>
