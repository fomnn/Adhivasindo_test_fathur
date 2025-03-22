<script setup lang="ts">
import ContentsCarousel from '@/components/ContentsCarousel.vue'
import Header from '@/components/Header.vue'
import { useGetContentsByModuleId } from '@/queries/content-queries'
import { useGetAllModules } from '@/queries/module-queries'
import { Preferences } from '@capacitor/preferences'
import { IonButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'
import { ref, watch } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const router = useIonRouter()

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: false,
}
const selectedModuleId = ref<string>()

const { data: modules } = useGetAllModules()

watch(modules, () => {
  if (modules.value?.length) {
    selectedModuleId.value = modules.value[0].id
  }
})

async function handleLogout() {
  await Preferences.remove({
    key: 'token',
  })

  return router.replace('/auth/login')
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <Header />
      <div class="size-full flex flex-col gap-4 mt-10">
        <div class="bg-linear-to-b rounded-xl from-[#A28AFF] to-[#6547FE] px-4 pb-8! text-white">
          <h2>Pemrograman Frontend Modern dengan React dan Angular</h2>
          <div class="flex justify-between">
            <div class="">
              <p>Pemateri By Josep</p>
              <p>Date 20-10-2020</p>
            </div>
            <IonButton color="light" size="small">
              Mulai Learning
            </IonButton>
          </div>
        </div>
        <Carousel v-bind="carouselConfig">
          <Slide v-for="module in modules" :key="module.id">
            <div class="carousel__item w-full aspect-video! bg-amber-200! mx-1! flex items-center justify-center p-2 rounded-md" @click="selectedModuleId = module.id">
              {{ module.name }}
            </div>
          </Slide>
        </Carousel>
        <ContentsCarousel v-if="selectedModuleId" :module-id="selectedModuleId" />
        <!-- <Carousel v-bind="carouselConfig2">
          <Slide v-for="module in modules" :key="module.id">
            <div class="carousel__item w-full aspect-video! bg-amber-200! mx-1! flex items-center justify-center p-2 rounded-md">
              {{ module.name }}
            </div>
          </Slide>
        </Carousel> -->
        <IonButton class="mt-20" @click="handleLogout">
          Logout
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
