<template>
  <q-layout class="login-layout">
    <q-page-container>
      <q-page class="flex flex-center">
        <div v-if="loading" class="loading flex flex-center">
          <q-spinner color="info" size="4em" :thickness="8" />
        </div>
        <div class="login-card">
          <div class="flex items-center q-mb-lg">
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
              <p class="q-ma-none sign-in text-center">i-Pond</p>
              <p class="q-mt-sm q-mb-none title text-center">
                A LoRaWAN-based Pond Water Quality Control and Monitoring System
              </p>
            </div>
          </div>
          <q-form @submit="signIn">
            <q-input
              outlined
              label="Username"
              class="q-mb-sm"
              color="primary"
              v-model="username"
              :rules="[required, isValidEmail]"
              lazy-rules
              :error="errorMessage ? true : false"
              :error-message="errorMessage"
            />
            <q-input
              outlined
              label="Password"
              type="password"
              color="primary"
              v-model="password"
              :rules="[required]"
              lazy-rules
              :error="errorMessage ? true : false"
              :error-message="errorMessage"
            />
            <q-btn
              label="Sign In"
              size="lg"
              class="login-btn"
              type="submit"
              flat
            />
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { login } from "../api/user";
import { required, isValidEmail } from "../composables/formValidations";
import { LocalStorage } from "quasar";
import userTypes from "../constants/userTypes";
import keys from "../constants/localStorageKeys";
import { useRouter } from "vue-router";
import logo from "/icons/Picture1.jpg";
import logo2 from "/icons/Picture2.png";
import logo3 from "/icons/Picture3.png";
import logo4 from "/icons/Picture4.jpg";

const username = ref("admin@gmail.com");
const password = ref("P@ssw0rd123");
const errorMessage = ref(null);
const router = useRouter();
const loading = ref(false);

const signIn = async () => {
  let data = { email: username.value, password: password.value };
  const { success, error } = await login(data);
  if (success) {
    loading.value = true;
    setTimeout(() => {
      router.push("/pond-1");
    }, 800);
  } else {
    console.log("Error", error?.message);
    errorMessage.value = error?.message;
  }
};
</script>
<style scoped>
.login-layout {
  background-color: #fefefe;
}
.login-card {
  width: 400px;
  padding: 32px 24px 48px 24px;
  box-sizing: border-box;
  background-color: #fefefe;
  border: 1px solid #0000001d;
  box-shadow: 1px 1.5px 2px #0000003d;
  border-radius: 3px;
}
#logo {
  width: 50px;
  margin-right: 16px;
}
.sign-in {
  font-size: 28px;
  font-weight: 600;
  color: #484848;
  line-height: 24px;
}
.title {
  font-size: 13px;
  color: #626262;
  line-height: 18px;
}
.login-btn {
  width: 100%;
  margin-top: 12px;
  background-color: #3b45b6;
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: capitalize;
}
.login-btn:hover {
  color: #181818;
}
.loading {
  position: fixed;
  z-index: 9;
  inset: 0;
  background-color: #f8fafaaa;
}

/* Media Queries */
@media only screen and (max-width: 600px) {
  .login-card {
    width: 350px;
    padding: 26px 24px;
  }
  #logo {
    width: 44px;
  }
  .login-btn {
    margin-top: 6px;
  }
}
</style>
