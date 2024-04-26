<template>
  <div class="fullpage-loader">
    <q-spinner color="primary" size="8em" :thickness="8" />
    <div>Fetching data...</div>
  </div>
</template>
<style scoped>
.fullpage-loader {
  height: 100vh;
  width: 100%;
  background-color: rgba(247, 248, 248, 0.88);
  z-index: 10000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
