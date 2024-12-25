<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div v-if="!listData || Object.keys(listData).length === 0">
        <div class="loader" v-if="loading"></div>
      </div>
      <!-- arrowBack -->
      <div v-else>
        <div class="back">
          <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
          <p>Căn cước điện tử</p>
        </div>
        <div class="flex-update">
                    <div class="verify">
                    <p>Đã xác thực</p>
                    <ion-icon aria-hidden="true" :icon="checkmarkCircle" />
                </div>
                <div class="button-update">
                    <ion-button @click="gotoUpdate">
                       <p> Cập nhật</p>
                    </ion-button>
                </div>
                </div>
        <div class="card">
          <ion-card>
            <div class="card-container">
              <div class="header-container">
                <div class="header-left">
                  <img src="../assets/img/chinhphu.png" alt="" style="
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    opacity: 0.7;
                  " />
                </div>
                <div class="header-right">
                  <div class="header-card">
                    <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                    <p>Độc lập - Tự do - Hạnh phúc</p>
                  </div>
                  <div class="title-card">
                    <p>CĂN CƯỚC ĐIỆN TỬ</p>
                  </div>
                  <!--  -->
                </div>
              </div>
              <!--  -->
              <div class="center-container">
                <div class="center-left">
                  <img src="https://www.gravatar.com/avatar/?d=mp" alt=""
                    style="width: 60px; height: 80px; margin-top: 5px" />
                </div>
                <div class="center-right">
                  <p>
                    Số định danh cá nhân
                    <scan>/ Personal Identification number:</scan>
                  </p>
                  <b> {{ listData.id || 'Chưa có dữ liệu' }}</b>
                  <p>Họ, chữ đệm và tên <scan>/ Full name</scan>
                  </p>
                  <b>{{ listData.name || 'Chưa có dữ liệu' }}</b>
                  <div class="text-one-line">
                    <p>Ngày sinh <scan>/ Date of birth</scan>
                    </p>
                    <p>Giới tính <scan>/ Sex</scan>
                    </p>
                    <p>{{ listData.gender || 'Chưa có dữ liệu' }}</p>
                  </div>
                  <p>{{ listData.dob || 'Chưa có dữ liệu' }}</p>
                  <p>
                    Quốc tịch<scan>/ Nationality: {{ listData.nationality || 'Chưa có dữ liệu' }}</scan>
                  </p>
                </div>
              </div>
            </div>
          </ion-card>
        </div>
        <div class="container-bottom">
          <div class="text-1">
            <p>Nơi thường trú:</p>
            <pre>{{ listData.origin_place || 'Chưa có dữ liệu' }}</pre>
          </div>
          <div class="text-2">
            <p>Nơi ở hiện tại:</p>
            <pre>{{ listData.current_place || 'Chưa có dữ liệu' }}</pre>
          </div>
          <div class="text-2">
            <p>Ngày cấp:</p>
            <pre>{{ listData.issue_date || 'Chưa có dữ liệu' }}</pre>
          </div>
          <div class="text-2">
            <p>Ngày hết hạn:</p>
            <pre>{{ listData.expire_date || 'Chưa có dữ liệu' }}</pre>
          </div>
          <div class="text-2">
            <p>Đặc điểm nhận dạng:</p>
            <pre>{{ listData.personal_identifi || 'Chưa có dữ liệu' }}</pre>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonCard, IonContent, IonPage, IonIcon } from "@ionic/vue";
import { arrowBack, checkmarkCircle } from "ionicons/icons";
import { useRouter } from "vue-router";
import { getCccd } from "@/services/auth";
import { ICardCCCD } from "@/type/card";
import { notify } from "@/utils/toast";
import { onIonViewWillEnter } from "@ionic/vue";

const router = useRouter();
const loading = ref(false);

const gotoHome = async () => {
  router.push("/tabs");
};
const gotoUpdate = async () => {
  localStorage.setItem("is_update", "true");
  const isUpdate = localStorage.getItem("is_update");
  if (isUpdate === "true") {
    router.push({ name: "FormPage", params: { userId: userId } });
  } else {
    notify.error("Failed to set 'is_update' in localStorage");
  }
};
onIonViewWillEnter(() => {
  getCccdData();
});

const listData = ref<ICardCCCD>({} as ICardCCCD);

const userId = localStorage.getItem("id");
const getCccdData = async () => {
  loading.value = true;
  try {
    if (userId !== null) {
      const userIdNumber = userId !== null ? parseInt(userId) : NaN;
      const response = await getCccd(userIdNumber);
      listData.value = response[0];
    } else {
      notify.error("Failed to get data BHYT");
    }
  } catch (error) {
    notify.error("Failed to get data BHYT");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card-container {
  padding: 10px;
  background-color: #a9cacf;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-right p {
  text-align: center;
}

.header-card :nth-child(1) {
  font-size: 10px;
  font-weight: bold;
}

.header-card :nth-child(2) {
  font-size: 8px;
  text-decoration: underline;
}

.title-card p {
  font-size: 10px;
  font-weight: bold;
  color: #e37055;
}

.header-right img {
  width: 1rem;
  height: 1rem;
}

.center-container {
  display: flex;
  gap: 20px;
  border: none;
}

.center-container p {
  font-size: 7px;
  font-weight: bold;
}

.center-container b {
  font-size: 12px;
  font-weight: 700;
}

.center-container scan {
  font-size: 6px;
  font-weight: normal;
  text-decoration: inherit;
}

.text-one-line {
  display: flex;
  gap: 20px;
}

.back {
  display: flex;
  align-items: center;
  gap: 5px;
}

.back p {
  font-weight: bold;
  font-size: 12px;
}

.container-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-left: 10px;
}

.container-bottom p {
  font-size: 10px;
  font-weight: bold;
  color: #1a73e8;
}

.container-bottom pre {
  font-size: 10px;
  font-weight: normal;
}

.text-1 {
  display: flex;
  align-items: center;
  gap: 5px;
}

.text-2 {
  display: flex;
  align-items: center;
  gap: 5px;
}

.verify {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  margin-left: 10px;
}

.verify p {
  font-weight: 600;
  font-size: 10px;
  padding: 2px 4px;
  border: 1px solid #41a350;
  border-radius: 30px;
  background-color: #41a350;
  color: white;
}

.verify ion-icon {
  color: #41a350;
}
.flex-update {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
ion-button {
    --background: #41A350;
    --color: white;
    --padding-start: 15px;
    --padding-end: 15px;
    --box-shadow: none;
    --border-width: 0;
    --border-color: transparent;
    --border-style: solid;
}
 ion-button p {
    font-weight: 600;
    font-size: 0.5rem;
 }

/* From Uiverse.io by SchawnnahJ */
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}

.loader:before,
.loader:after {
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
