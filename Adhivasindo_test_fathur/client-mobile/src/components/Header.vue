<script setup lang="ts">
import SolarMagniferLinear from '@/components/icons/SolarMagniferLinear.vue'
import { IonText } from '@ionic/vue'
</script>

<template>
  <header class="h-14 flex justify-between items-center">
    <img
      src="https://images.unsplash.com/photo-1742210595290-f021aba0d9f2?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
      class="size-12 object-cover rounded"
    >
    <div class="flex flex-col items-center">
      <select class="text-slate-400! text-sm!">
        <option value="Location">
          Location
        </option>
      </select>
      <IonText class="font-semibold">
        Sylhet, Bangladesh
      </IonText>
    </div>
    <button type="button" class="bg-white size-10 flex items-center justify-center shadow rounded-xl!">
      <SolarMagniferLinear />
    </button>
  </header>
</template>
