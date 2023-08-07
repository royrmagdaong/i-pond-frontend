a
<template>
  <q-layout>
    <q-page-container class="flex flex-center fade-in" style="height: 90vh">
      <div class="not-available">This feature is currently unavailable.</div>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.not-available {
  color: tomato;
  font-size: 64px;
}

@media only screen and (max-width: 1400px) {
  .not-available {
    font-size: 44px;
  }
}

@media only screen and (max-width: 800px) {
  .not-available {
    font-size: 34px;
  }
}

@media only screen and (max-width: 580px) {
  .not-available {
    font-size: 24px;
  }
}

@media only screen and (max-width: 400px) {
  .not-available {
    font-size: 16px;
  }
}
</style>
