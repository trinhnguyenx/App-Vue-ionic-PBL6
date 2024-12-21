<template>
    <ion-page>
        <ion-content class="ion-padding">
        <div  v-if="!listData|| Object.keys(listData).length === 0">
            <div class="loader" v-if="loading"></div>
        </div>
            <!-- arrowBack -->
             <div v-else>
                <div class="back">
                <ion-icon aria-hidden="true" :icon="arrowBack" @click="gotoHome" />
                <p>Bảo hiểm y tế</p>
             </div>
             <div class="verify">
                <p>Đã xác thực</p>
                <ion-icon aria-hidden="true" :icon="checkmarkCircle" />
             </div>
            <div class="card">
                <ion-card>
                    <div class=card-container>
                        <div class="header-container">
                            <div class="header-right">  
                                <div class="header-left">
                                <img src="../assets/img/bhyt.png" alt="" style="width: 60px; height: 60px; margin-right: 50px; opacity: 0.7;;">
                            </div>
                                <div class="header-card">
                                    <p>BẢO HIỂM XÃ HỘI VIỆT NAM</p>
                                        <p>THẺ BẢO HIỂM Y TẾ</p>
                                </div>
                                <!--  -->
                            </div>
                            <div class="title-card">
                                        <p>Số/No: {{ listData.id }}</p>
                                </div>
                        </div>
                        <!--  -->
                        <div class="center-container">
                            <div class="center-left">
                                <img src="https://www.gravatar.com/avatar/?d=mp" alt=""  style="width: 100px; height: 100px; margin-top: 5px; ">
                            </div>
                            <div class="center-right">
                                <div class="text-one-line">
                                    <p>Họ và tên:  </p>
                                    <p>{{ listData.name }}</p>
                                </div> 
                                <div class="text-one-line">
                                    <div>
                                        <p>Ngày sinh: {{ listData.dob }}</p>
                                    </div>
                                    <div>
                                        <p>Giới tính: {{ listData.gender }}</p>
                                    </div>
                                </div>
                                <div class="text-one-line">
                                    <p>Nơi DK KCB BĐ:</p>
                                    <p>{{ listData.ihos }}</p>
                                </div>
                                <div class="text-one-line">
                                    <p>Giá trị sử dụng: từ ngày {{listData.issue_date}}</p>
                                </div>
                                <div class="text-one-line">
                                    <p>Thời điểm đủ 05 năm liên tục: từ ngày {{ listData.expire_date }}</p>
                                </div>
                                <div class="text-one-line">
                                    <p>Nơi cấp: {{ listData.iplace }}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </ion-card>
            </div>
             </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonCard, IonContent, IonPage, IonIcon} from '@ionic/vue';
import { arrowBack, checkmarkCircle} from 'ionicons/icons';
import { useRouter} from 'vue-router';
import { getBhyt } from '@/services/auth';
import { ICardBHYT } from "@/type/card";
import { notify } from '@/utils/toast';
const router = useRouter();
const loading = ref(false);

const gotoHome = async () => {
    router.push('/tabs');
};

onMounted(() => {
    getBhytData();
});

const listData = ref<ICardBHYT>({} as ICardBHYT);

const userId = localStorage.getItem('id');
const getBhytData = async () => {
    loading.value = true;
    try {
        if (userId !== null) {
        const userIdNumber = userId !== null ? parseInt(userId) : NaN;        
        const response = await getBhyt(userIdNumber);
        listData.value = response[0];
        console.log('userIdNumber', userIdNumber);

    } else {
        notify.error('Failed to get data CCCD');
    }
    } catch (error) {
        notify.error('Failed to get data CCCD');
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.card-container {
    padding: 10px;
    background-color: #FDFBF5;
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
.header-left img {
    margin-right: 20px;
}
.header-card :nth-child(1) {
    font-size: 10px;
    font-weight: bold
}
.header-card :nth-child(2) {
    font-size: 10px;
    font-weight: 600;
}
.title-card p {
    font-size: 12px;
    font-weight: bold;
    color: #E37055;
    text-align: center;
    margin-left: 120px;
    margin-bottom: 10px;
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
    gap: 5px;
}
.center-left p {
    text-align: center;
    
}
.text-one-line {
    display: flex;
    align-items: center;
    margin-left: 5px;
    gap: 10px;
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