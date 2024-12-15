<template>
    <ion-page>
    <ion-content class="ion-padding">
        <!-- Kiểm tra xem dữ liệu đã được tải xong chưa -->
        <div v-if="!listData|| Object.keys(listData).length === 0">
            <p>Đang tải dữ liệu...</p>
        </div>

        <!-- Nếu dữ liệu đã có, hiển thị các thông tin -->
        <div v-else>
            <!-- arrowBack -->
            <div class="back">
                <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
                <p>Giấy phép lái xe</p>
            </div>
            <div class="verify">
                <p>Đã xác thực</p>
                <ion-icon aria-hidden="true" :icon="checkmarkCircle" />
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
                                <img src="https://www.gravatar.com/avatar/?d=mp" alt="" style="width: 80px; height: 80px; margin-top: 5px;">
                                <p>Hạng/Class: {{ listData?.level || 'Chưa có dữ liệu' }}</p>
                            </div>
                            <div class="center-right">
                                <div class="text-one-line">
                                    <p>Họ tên <scan>/ Full name:</scan></p>
                                    <p>{{ listData?.name || 'Chưa có dữ liệu' }}</p>
                                </div>
                                <div class="text-one-line">
                                    <p>Ngày sinh <scan>/ Date of birth:</scan></p>
                                    <p>{{ listData?.dob || 'Chưa có dữ liệu' }}</p>
                                </div>
                                <div class="text-one-line">
                                    <p>Quốc tịch<scan>/ Nationality:</scan></p>
                                    <p>{{ listData?.nationality || 'Chưa có dữ liệu' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ion-card>
            </div>
            <div class="container-bottom">
                <div class="text-1">
                    <p>Nơi thường trú:</p> <scan>{{ listData?.origin_place || 'Chưa có dữ liệu' }}</scan>
                </div>
                <div class="text-2">
                    <p>Nơi ở hiện tại:</p> <scan>{{ listData?.iplace || 'Chưa có dữ liệu' }}</scan>
                </div>
                <div class="text-3">
                    <p>Ngày cấp:</p> <scan>{{ listData?.issue_date || 'Chưa có dữ liệu' }}</scan>
                </div>
                <div class="text-4">
                    <p>Ngày hết hạn:</p> <scan>{{ listData?.expire_date || 'Chưa có dữ liệu' }}</scan>
                </div>
            </div>
        </div>

    </ion-content>
</ion-page>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount} from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonText, IonButton, IonContent, IonPage } from '@ionic/vue';
import { arrowBack, checkmarkCircle} from 'ionicons/icons';
import { useRouter} from 'vue-router';
import { getGplx } from '@/services/auth';
import { ICardGPLX } from "@/type/card";
import { notify } from '@/utils/toast';
const router = useRouter();
const gotoHome = async () => {
    router.push('/tabs');
};

onMounted(() => {
    getGplxData();
});

const listData = ref<ICardGPLX>({} as ICardGPLX);

const userId = localStorage.getItem('id');
const getGplxData = async () => {
    try {
        const userIdNumber = userId !== null ? parseInt(userId) : NaN;        
        if (userId !== null) {
            const response = await getGplx(userIdNumber);
            listData.value = response[0];
            console.log('userIdNumber', userIdNumber);

            
        }
    } catch (error) {
        notify.error('Failed to get data GPLX');
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
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
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
</style>