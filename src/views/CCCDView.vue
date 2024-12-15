<template>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- arrowBack -->
      <div class="back">
        <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
        <p>Căn cước điện tử</p>
      </div>
      <div class="verify">
        <p>Đã xác thực</p>
        <ion-icon aria-hidden="true" :icon="checkmarkCircle" />
      </div>
      <div class="card">
        <ion-card>
          <div class="card-container">
            <div class="header-container">
              <div class="header-left">
                <img
                  src="../assets/img/chinhphu.png"
                  alt=""
                  style="
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    opacity: 0.7;
                  "
                />
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
                <img
                  src="https://www.gravatar.com/avatar/?d=mp"
                  alt=""
                  style="width: 60px; height: 80px; margin-top: 5px"
                />
              </div>
              <div class="center-right">
                <p>
                  Số định danh cá nhân
                  <scan>/ Personal Identification number:</scan>
                </p>
                <b> {{ listData.id }}</b>
                <p>Họ, chữ đệm và tên <scan>/ Full name</scan></p>
                <b>{{ listData.name }}</b>
                <div class="text-one-line">
                  <p>Ngày sinh <scan>/ Date of birth</scan></p>
                  <p>Giới tính <scan>/ Sex</scan></p>
                  <p>{{ listData.gender }}</p>
                </div>
                <p>{{ listData.dob }}</p>
                <p>
                  Quốc tịch<scan
                    >/ Nationality: {{ listData.nationality }}</scan
                  >
                </p>
              </div>
            </div>
          </div>
        </ion-card>
      </div>
      <div class="container-bottom">
        <div class="text-1">
          <p>Nơi thường trú:</p>
          <pre>{{ listData.origin_place || "" }}</pre>
        </div>
        <div class="text-2">
          <p>Nơi ở hiện tại:</p>
          <pre>{{ listData.current_place || "" }}</pre>
        </div>
        <div class="text-2">
          <p>Ngày cấp:</p>
          <pre>{{ listData.issue_date || "" }}</pre>
        </div>
        <div class="text-2">
          <p>Ngày hết hạn:</p>
          <pre>{{ listData.expire_date || "" }}</pre>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonCard, IonContent, IonPage } from "@ionic/vue";
import { arrowBack, checkmarkCircle } from "ionicons/icons";
import { useRouter } from "vue-router";
import { getCccd } from "@/services/auth";
import { ICardCCCD } from "@/type/card";
import { notify } from "@/utils/toast";

const router = useRouter();
const gotoHome = async () => {
  router.push("/tabs");
};
onMounted(() => {
  getCccdData();
});

const listData = ref<ICardCCCD>({} as ICardCCCD);

const userId = localStorage.getItem("id");
const getCccdData = async () => {
  try {
    if (userId !== null) {
      const userIdNumber = userId !== null ? parseInt(userId) : NaN;
      const response = await getCccd(userIdNumber);
      listData.value = response[0];
      console.log("userIdNumber", userIdNumber);
    } else {
      notify.error("Failed to get data BHYT");
    }
  } catch (error) {
    notify.error("Failed to get data BHYT");
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
</style>
