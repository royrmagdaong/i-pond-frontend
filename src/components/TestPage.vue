<template>
  <q-layout>
    <q-page-container class="flex flex-center fade-in" style="height: 100vh">
      <div>
        <img src="jrome.jpg" alt="img" width="500" height="500" class="img-j" />
        <p class="text-center text-h6 q-mt-md">
          I'm not single I have a Relationship with bikes.
        </p>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.img-j {
  width: 100%;
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 10s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {
  .img-j {
    width: 100%;
  }
}
</style>
