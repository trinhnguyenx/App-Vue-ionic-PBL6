<template>
  <ion-page :key="pageKey">
    <div class="loader" v-if="loading"></div>
    <ion-content class="ion-padding" v-else>
      <ion-header>
      <ion-toolbar>
        <div class="back">
                    <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
                    <ion-title>Scan</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
      <p v-if="scanResult">Scan Result:</p>
      <pre v-if="scanResult">{{ handleScanData(scanResult) }}</pre>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
import { alertController } from "@ionic/vue";
import { useRouter } from "vue-router";
import { arrowBack} from 'ionicons/icons';


const router = useRouter();
const scanResult = ref<string | null>(null);
  const loading = ref(false);
  const pageKey = ref(Date.now())

const startScanning = async () => {
  loading.value = true;
  try {
    const options = {
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
      cameraDirection: 1,
    };

    const result = await CapacitorBarcodeScanner.scanBarcode(options);
    scanResult.value = result.ScanResult;
  } catch (error) {
    console.error('Error scanning barcode: ', error);
  } finally {
    loading.value = false;
  }
};

const handleScanData = (data: string) => {
  return data.split(',').join('\n');
};
const presentAlert = async () => {
  const alert = await alertController.create({
    header: "Xác nhận quét QR code",
    buttons: [
      {
        text: "Ok",
        handler: () => {
          console.log("Ok button clicked");
          startScanning();
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          router.push("/tabs");
        },
      },
    ],
  });

  await alert.present();
};
const gotoHome = async () => {
  // Reset trạng thái quét
  scanResult.value = null;
  loading.value = false; // Đảm bảo loading được tắt
  // Dùng router.push để điều hướng đến trang /tabs và force reload lại trang scan
  router.push('/tabs').then(() => {
    pageKey.value = Date.now(); // Đổi giá trị key để force reload trang scan
    router.push('/scan'); // Quay lại trang scan sau khi đã chuyển sang /tabs
  });
};
watch(() => router.currentRoute, () => {
  // Đổi key mỗi khi route thay đổi để force reload trang
  pageKey.value = Date.now();
});

onMounted(() => {
  if(localStorage.getItem('is_scan') === 'true') {
    presentAlert();
  }
});
</script>
<style scoped>
.back {
    display: flex;
    align-items: center;
    padding: 0 10px;
}
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
