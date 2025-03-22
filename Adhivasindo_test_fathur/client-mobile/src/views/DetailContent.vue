<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useGetContentById } from '@/queries/content-queries'
import { IonButton, IonContent, IonHeader, IonPage, IonToolbar, useIonRouter } from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useIonRouter()

const { data: content } = useGetContentById(route.params.moduleId as string, route.params.contentId as string)
</script>

<template>
  <IonPage>
    <IonHeader class="ion-no-border ion-padding">
      <IonToolbar>
        <IonButton @click="router.back()">
          Back
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <div class="">
        <img :src="content?.img_url" alt="" class="w-full aspect-video object-cover">
        <h1>{{ content?.title }}</h1>
        <p>{{ content?.content }}</p>
      </div>
    </IonContent>
  </IonPage>
</template>
