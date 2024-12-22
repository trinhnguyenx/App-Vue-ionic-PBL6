<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cài đặt</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button expand="block" @click="handleshowAlert">Đăng xuất</ion-button>

      <IonAlert :isOpen="showAlert" onDidDismiss="() => showAlert.value = false" header="Thông báo"
        message="Bạn có muốn đăng xuất không?" :buttons="[
          {
            text: 'OK',
            handler: () => {
              handleLogout();
            }
          },
          {
            text: 'Hủy',
            role: 'cancel',
            handler: () => {
              router.push('/tabs/settings');
            }
          }
        ]" />
    </ion-content>
  </ion-page>
</template>


<style scoped>
:root {
  --ion-color-secondary: #f2f2f2;
  --ion-font-family: 'Roboto', sans-serif;
}

/* Lớp CSS tùy chỉnh */
.custom-button {
  --ion-button-padding-start: 20px;
  --ion-button-padding-end: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ion-button {
  --background: #D7344C;
  --border-radius: 10px;
  --border: 1px solid #D7344C;
  --border-color: #ffffff;
  padding-top: 10px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonButton, IonAlert, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { useRouter } from 'vue-router';
const router = useRouter();


const showAlert = ref(false);

const handleLogout = () => {
  localStorage.clear();
  router.push('/auth/login');
};
const handleshowAlert = () => {
  showAlert.value = !showAlert.value;
};
</script>