<script lang="ts" setup>
import { useLogin } from '@/queries/auth-queries'
import { IonButton, IonPage, useIonRouter } from '@ionic/vue'
import { reactive, watch } from 'vue'

const router = useIonRouter()
const { mutate: login, status } = useLogin()
const loginData = reactive({
  email: '',
  password: '',
})
async function handleSubmit() {
  login(loginData)
}

watch(status, (newStatus) => {
  if (newStatus === 'success') {
    router.replace('/')
  }
})
</script>

<template>
  <IonPage>
    <div class="grid h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <div class="flex flex-col">
        <div class="">
          <span class="text-2xl font-bold"> LMS </span>
        </div>
        <div class="flex h-full flex-col justify-center gap-8 pb-[30%] lg:pb-0">
          <div class="flex flex-col items-center gap-2">
            <h1 class="text-2xl font-semibold">
              Hi, welcome back👋
            </h1>
            <p class="text-lg">
              Lorem, ipsum dolor.
            </p>
          </div>
          <form class="flex flex-col gap-6 px-0 lg:px-32" @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1">
                <label for="email">
                  Email
                </label>
                <input
                  id="email"
                  v-model="loginData.email"
                  class="d-input w-full"
                  placeholder="Enter your email"
                  type="text"
                >
              </div>
              <div class="flex flex-col gap-1">
                <label for="password">
                  Password
                </label>
                <input
                  id="password"
                  v-model="loginData.password"
                  class="d-input w-full"
                  placeholder="Enter your password"
                  type="text"
                >
              </div>
              <div class="flex justify-end">
                <button class="d-link" type="button">
                  Forgot password?
                </button>
              </div>
            </div>
            <button class="d-btn d-btn-primary w-full" type="submit">
              Login
            </button>
            <p class="text-center">
              Don't have an account?
              <button type="button" class="text-sky-700" @click="router.replace('/auth/signup')">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
      <div class="hidden h-full rounded-xl bg-cover bg-center lg:block" style="background-image: url(https://images.unsplash.com/photo-1722019840937-ce4b9e247f56?q=80&w=2456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" />
    </div>
  </IonPage>
</template>
