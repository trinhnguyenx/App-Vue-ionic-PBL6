<template>
  <ion-page>
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
      <div class="scan-result" v-if="scanResult">
        <h2>Kết quả quét:</h2>
        <pre>{{ handleScanData(scanResult) }}</pre>
      </div>
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
import { onIonViewWillEnter } from "@ionic/vue";


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
  const regex = /Số CCCD:\s?(.+?),\s?Họ tên:\s?(.+?),\s?Ngày Sinh:\s?(.+?),\s?Quốc tịch:\s?(.+?),\s?Giới tính:\s?(.+?),\s?Ngày cấp:\s?(.+?),\s?Nơi cấp:\s?(.+?),\s?Ngày hết hạn:\s?(.+)/;
  const match = data.match(regex);

  if (match) {
    const [
      , // Ignore full match
      cccd,
      fullName,
      dob,
      nationality,
      gender,
      issueDate,
      issuePlace,
      expiryDate,
    ] = match;

    return `
      Số CCCD: ${cccd}
      Họ tên: ${fullName}
      Ngày Sinh: ${dob}
      Quốc tịch: ${nationality}
      Giới tính: ${gender}
      Ngày cấp: ${issueDate}
      Nơi cấp: ${issuePlace}
      Ngày hết hạn: ${expiryDate}
    `;
  }

  return data;
};
const gotoHome = async () => {
  scanResult.value = null;
  loading.value = false;
  router.push('/tabs')
};

onIonViewWillEnter(() => {
    startScanning();
});
</script>
<style scoped>
.back {
    display: flex;
    align-items: center;
    padding: 0 10px;
}
.scan-result {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.scan-result h2 {
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #626ae4;
}

pre {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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
