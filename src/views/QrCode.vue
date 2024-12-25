<template>
  <ion-page>
    <ion-content class="ion-padding">
    <div class="loader" v-if="loading"></div>

    <div class="container" v-else>
      <div class="back">
        <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
        <p>QR code thẻ căn cước công dân</p>
      </div>

      <div class="card">
        <div v-if="qrCodeUrl">
          <div class="card-container">
            <img :src="qrCodeUrl" alt="QR code" />
          </div>
        </div>
        <div v-else>
          <p>Đang tạo mã QR...</p>
        </div>
      </div>
    </div>
  </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonPage } from "@ionic/vue";
import { ref, onMounted} from "vue";
import { notify } from "@/utils/toast";
import { getQrcode } from "@/services/auth";
import { arrowBack } from "ionicons/icons";
import { useRouter } from "vue-router";
import { onIonViewWillEnter } from "@ionic/vue";

const router = useRouter();


const gotoHome = async () => {
  router.push("/tabs");
};

const loading = ref(false);  
const userId = localStorage.getItem("id");  
const qrCodeUrl = ref<string | null>(null);

const getImagesQr = async () => {
  loading.value = true;
  try {
    if (userId !== null) {
      const userIdNumber = Number(userId);
      const response = await getQrcode(userIdNumber);

      if (response) {
        qrCodeUrl.value = URL.createObjectURL(response);          
      } else {
        notify.error("Không có dữ liệu cho CCCD này.");
      }
    } else {
      notify.error("Không tìm thấy ID người dùng.");
    }
  } catch (error) {
    notify.error("Đã xảy ra lỗi khi lấy dữ liệu CCCD.");
  } finally {
    loading.value = false;
  }
};

onIonViewWillEnter(async () => {
    await getImagesQr();
});
</script>


<style scoped>
.container {
  background-color: #7d1a29;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.card {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  margin-top: 150px;
}
.back {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 10px;
  margin-bottom: 15px;
  color: white;
}
.back p {
  font-weight: bold;
  font-size: 14px;
}
.card-container {
  width: 16rem;
  height: 16rem;
}
/* From Uiverse.io by SchawnnahJ */ 
.loader {
 position: relative;
 width: 2.5em;
 height: 2.5em;
 transform: rotate(165deg);
}

.loader:before, .loader:after {
 content: "";
 position: absolute;
 top: 50%;
 left: 50%;
 display: block;
 width: 0.5em;
 height: 0.5em;
 border-radius: 0.25em;
 transform: translate(-50%, -50%);
}

.loader:before {
 animation: before8 2s infinite;
}

.loader:after {
 animation: after6 2s infinite;
}

@keyframes before8 {
 0% {
  width: 0.5em;
  box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
 }

 35% {
  width: 2.5em;
  box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
 }

 70% {
  width: 0.5em;
  box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
 }

 100% {
  box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
 }
}

@keyframes after6 {
 0% {
  height: 0.5em;
  box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
 }

 35% {
  height: 2.5em;
  box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
 }

 70% {
  height: 0.5em;
  box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
 }

 100% {
  box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
 }
}

.loader {
 position: absolute;
 top: calc(50% - 1.25em);
 left: calc(50% - 1.25em);
}
</style>
