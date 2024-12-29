<template>
    <ion-page class="bg-white" style="z-index: 100;">
        <ion-content class="ion-padding">
            <div v-if="!listData || Object.keys(listData).length === 0">
                <div class="loader" v-if="loading"></div>
            </div>

            <div v-else>
                <!-- arrowBack -->
                <div class="back">
                    <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
                    <p>Giấy phép lái xe</p>
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
                                <div class="header-right">
                                    <div class="header-left">
                                        <p>BỘ GTVT</p>
                                        <p>MOT</p>
                                    </div>
                                    <div class="header-card">
                                        <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                        <p>Độc lập - Tự do - Hạnh phúc</p>
                                    </div>
                                </div>
                                <div class="title-card">
                                    <p>GIẤY PHÉP LÁI XE/ DRIVER'S LICENSE</p>
                                    <p>Số/No: {{ listData?.id || 'Chưa có dữ liệu' }}</p>
                                </div>
                            </div>
                            <div class="center-container">
                                <div class="center-left">
                                    <img src="https://www.gravatar.com/avatar/?d=mp" alt=""
                                        style="width: 80px; height: 80px; margin-top: 5px;">
                                    <p>Hạng/Class: {{ listData?.level || 'NaN' }}</p>
                                </div>
                                <div class="center-right">
                                    <div class="text-one-line">
                                        <p>Họ tên <scan>/ Full name:</scan>
                                        </p>
                                        <p>{{ listData?.name || 'Chưa có dữ liệu' }}</p>
                                    </div>
                                    <div class="text-one-line">
                                        <p>Ngày sinh <scan>/ Date of birth:</scan>
                                        </p>
                                        <p>{{ listData?.dob || 'Chưa có dữ liệu' }}</p>
                                    </div>
                                    <div class="text-one-line">
                                        <p>Quốc tịch<scan>/ Nationality:</scan>
                                        </p>
                                        <p>{{ listData?.nationality || 'Chưa có dữ liệu' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ion-card>
                </div>
                <div class="container-bottom">
                    <div class="text-1">
                        <p>Nơi thường trú:</p>
                        <scan>{{ listData?.origin_place || 'Chưa có dữ liệu' }}</scan>
                    </div>
                    <div class="text-2">
                        <p>Nơi ở hiện tại:</p>
                        <scan>{{ listData?.iplace || 'Chưa có dữ liệu' }}</scan>
                    </div>
                    <div class="text-3">
                        <p>Ngày cấp:</p>
                        <scan>{{ listData?.issue_date || 'Chưa có dữ liệu' }}</scan>
                    </div>
                    <div class="text-4">
                        <p>Ngày hết hạn:</p>
                        <scan>{{ listData?.expire_date || 'Chưa có dữ liệu' }}</scan>
                    </div>
                </div>
            </div>

        </ion-content>
    </ion-page>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonIcon, IonContent, IonPage, IonButton } from '@ionic/vue';
import { arrowBack, checkmarkCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { getGplx } from '@/services/auth';
import { ICardGPLX } from "@/type/card";
import { notify } from '@/utils/toast';
import { onIonViewWillEnter } from "@ionic/vue";

const router = useRouter();

const loading = ref(false);

const gotoHome = async () => {
    router.push('/tabs');
};
const gotoUpdate = async () => {
  localStorage.setItem("is_update", "true");
  const isUpdate = localStorage.getItem("is_update");
  if (isUpdate === "true") {
    router.push('/verify-gplx');
  } else {
    console.error("Failed to set 'is_update' in localStorage");
  }
};

onIonViewWillEnter(() => {
    getGplxData();
});

const listData = ref<ICardGPLX>({} as ICardGPLX);

const userId = localStorage.getItem('id');
const getGplxData = async () => {
    loading.value = true;
    try {
        const userIdNumber = userId !== null ? parseInt(userId) : NaN;
        if (userId !== null) {
            const response = await getGplx(userIdNumber);
            listData.value = response[0];
            console.log('userIdNumber', userIdNumber);


        }
    } catch (error) {
        notify.error('Failed to get data GPLX');
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.card-container {
    padding: 10px;
    background-color: #E2DD9A;
}

.header-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.header-right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.header-right p {
    text-align: center;
}

.header-left p {
    font-size: 10px;
    font-weight: bold;
    text-align: center;
}

.header-card :nth-child(1) {
    font-size: 10px;
    font-weight: bold
}

.header-card :nth-child(2) {
    font-size: 8px;
    text-decoration: underline;
}

.title-card p {
    font-size: 10px;
    font-weight: bold;
    color: #E37055;
    text-align: center;
    margin-left: 50px;
}

.title-card :nth-child(2) {
    margin-bottom: 10px;
}

.center-container {
    display: flex;
}

.center-container p {
    font-size: 10px;
    font-weight: bold;
}

.center-container scan {
    font-size: 8px;
    font-weight: normal;
    text-decoration: inherit;
}

.center-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
}

.center-left p {
    text-align: center;
    margin-top: 5px;
}

.text-one-line {
    display: flex;
    align-items: center;
    margin-left: 5px;
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
    color: #1A73E8;
}

.container-bottom scan {
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

.text-3 {
    display: flex;
    align-items: center;
    gap: 5px;
}

.text-4 {
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
    border: 1px solid #41A350;
    border-radius: 30px;
    background-color: #41A350;
    color: white;
}

.verify ion-icon {
    color: #41A350;
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