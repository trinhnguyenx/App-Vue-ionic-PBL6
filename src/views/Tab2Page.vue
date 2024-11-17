<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="button-container">
        <ion-button expand="block" @click="takePhoto">Chụp Ảnh</ion-button>
      </div>

      <div class="photo-container" v-if="photo">
        <ion-img :src="photo" alt="Ảnh chụp" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

const { photo, takePhoto } = usePhotoGallery();
</script>

<style scoped>
.button-container {
  margin: 20px 0;
}

.photo-container {
  margin-top: 20px;
  text-align: center;
}

.photo-container ion-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
