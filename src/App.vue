<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
        router.push('/auth/login');
  }
});
</script>
