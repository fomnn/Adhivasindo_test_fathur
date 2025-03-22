<script lang="ts" setup>
import { useSignup } from '@/queries/auth-queries'
import { IonPage } from '@ionic/vue'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { mutate: signup, status: signupStatue } = useSignup()

const signupData = reactive({
  name: '',
  email: '',
  password: '',
})

function goToLogin() {
  return router.replace({ path: '/auth/login' })
}

function onSubmit() {
  signup(signupData)
}

watch(signupStatue, (newStatus) => {
  if (newStatus === 'success') {
    router.replace('/contents')
  }
})
</script>

<template>
  <IonPage>
    <div class="grid h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <div class="flex flex-col">
        <div class="">
          <span class="text-2xl font-bold">LMS</span>
        </div>
        <div class="flex h-full flex-col justify-center gap-8 pb-[30%] lg:pb-0">
          <div class="flex flex-col items-center gap-2">
            <h1 class="text-2xl font-semibold">
              Hi, welcome
            </h1>
            <p class="text-lg">
              Lorem, ipsum dolor.
            </p>
          </div>
          <form class="flex flex-col gap-6 px-0 lg:px-32" @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1">
                <label for="name">
                  Name
                </label>
                <input
                  id="name"
                  v-model="signupData.name"
                  class="d-input w-full"
                  placeholder="Enter your Name"
                  type="text"
                >
              </div>
              <div class="flex flex-col gap-1">
                <label for="email">
                  Email
                </label>
                <input
                  id="email"
                  v-model="signupData.email"
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
                  v-model="signupData.password"
                  class="d-input w-full"
                  placeholder="Enter your password"
                  type="text"
                >
              </div>
            </div>
            <button class="d-btn d-btn-primary w-full" type="submit">
              Sign up
            </button>
            <p class="text-center">
              Already have an account?
              <button type="button" class="text-sky-700" @click="goToLogin">
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
      <div class="hidden h-full rounded-xl bg-cover bg-center lg:block" style="background-image: url(https://images.unsplash.com/photo-1741548384019-44e405f96772?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" />
    </div>
  </IonPage>
</template>
