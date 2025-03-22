<script lang="ts" setup>
import type { Content } from '@/types/Content'
import apiFetch from '@/lib/ofetch'
import { useGetContentsByModuleId } from '@/queries/content-queries'
import { Preferences } from '@capacitor/preferences'
import { useIonRouter } from '@ionic/vue'
import { onMounted, ref, watch } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

const { moduleId } = defineProps<{
  moduleId: string
}>()

const router = useIonRouter()

const carouselConfig = {
  itemsToShow: 1.5,
  wrapAround: false,
}

// const { data: contents } = useGetContentsByModuleId(moduleId)
const contents = ref<Content[]>()

async function fetchContents() {
  const token = await Preferences.get({ key: 'token' })

  const { contents: contentsData } = await apiFetch<{ contents: Content[] }>(`/modules/${moduleId}/contents`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    // params: {
    //   take,
    // },
  })

  contents.value = contentsData
}

function goToDetailContent(contentId: string) {
  return router.push(`modules/${moduleId}/contents/${contentId}`)
}

watch(() => moduleId, () => {
  if (moduleId) {
    fetchContents()
  }
})

onMounted(() => {
  fetchContents()
})
</script>

<template>
  <!-- <p>{{ moduleId }}</p> -->
  <Carousel v-bind="carouselConfig">
    <Slide v-for="content in contents" :key="content.id">
      <div class="carousel__item w-full flex flex-col bg-amber-200! mx-1! gap-2 items-center justify-center p-2 rounded-md" @click="() => goToDetailContent(content.id)">
        <img :src="content.img_url" alt="" class="w-full aspect-video object-cover rounded">
        <p class="line-clamp-2 h-[3rem]">
          {{ content.title }}
        </p>
      </div>
    </Slide>
  </Carousel>
</template>
