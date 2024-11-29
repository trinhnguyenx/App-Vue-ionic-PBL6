<template>
    <ion-page class="container bg-white" >
        <div class="home-page-container">
        <div class="home-page-header">
            <div class="home-page-header__avatar">
                <img src="https://www.gravatar.com/avatar/?d=mp" alt="avatar" />
            </div>
            <div class="home-page-header__info">
                <p class="home-page-header__info__name ">Nguyễn Công Trình</p>
            </div>
        </div>
        <div class="home-page-header-card">
            <div class="outbound-card-left">
                <div class="outbound-card-body">
                    <div>
                        <img src="../assets/img/cccd.jpg" alt="">
                    </div>
                    <div>
                        <p>Mã QR</p>
                        <p class="small-text" >Thẻ CCCD</p>
                    </div>
                </div>
            </div>
            <div class="outbound-card-right">
                <div class="outbound-card-body">
                    <div>
                        <img src="https://vneid.gov.vn/_next/static/media/app-icon.a38acfa3.svg" alt="">
                    </div>
                    <div>
                        <p>Mã QR</p>
                        <p class="small-text">Định danh điện tử</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="home-page-center bg-white">
        <h2>Quản lí thông tin</h2>
    <div class="title-center">
      <div class="filed-card-manager">
          <img src="../assets/img/card.jpg" alt="Thẻ căn cước/CCCD">
          <p>Thẻ căn cước/CCCD</p>
      </div>
        
        <div class="filed-card-1" @click="gotogplx">
          <img src="../assets/img/card.jpg" alt="Giấy phép lái xe">
          <p>Giấy phép lái xe</p>
        </div>
        
        <div class="filed-card-1" @click="gotobhyt">
          <img src="../assets/img/card.jpg" alt="Thẻ BHYT">
          <p>Thẻ BHYT</p>
        </div>
      </div>
  </div>

</ion-page>
</template>

<script setup lang="ts">
import { IonPage, useIonRouter } from '@ionic/vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter} from 'vue-router';
const router = useRouter();

const gotogplx = async () => {
    router.push('/gplx');
};
const gotobhyt = async () => {
    router.push('/bhyt');
};
</script>

<style lang="scss">
.ion-page {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: flex-start;
    contain: layout size style;
    z-index: 0;
}
.container {
    display: flex;
    background-color: #f5f5f5;
}
.home-page-container {
    background-image: url('../assets/img/trongdo.jpg');
    background-size: cover; 
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    .home-page-header {
        display: flex;
        padding:  20px;
        align-items: center;
        gap: 20px;
        text-transform: uppercase;;
        .home-page-header__avatar {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .home-page-header__info {
            .home-page-header__info__name {
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
    .home-page-header-card {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        .outbound-card-left {
            width: 48%;
            height: 70px;
            background-color: #f5f5f5;
            border-radius: 10px;
            .outbound-card-body {
                display: flex;
                padding: 10px;
                gap: 20px;
                align-items: center;
                img {
                    width: 60px;
                    height: 40px;
                    margin-top: 5px;
                }
                p {
                    font-size: 16px;
                    font-weight: bold;
                    color: black;
                }
                .small-text {
                    font-size: 12px;
                }
                
            }
        }
        .outbound-card-right {
            width: 48%;
            height: 70px;
            background-color: #f5f5f5;
            border-radius: 10px;
            .outbound-card-body {
                display: flex;
                justify-content: center;
                padding: 10px;
                gap: 10px;
                img {
                    width: 60px;
                    height: 40px;
                    margin-top: 5px;
                }
                p {
                    font-size: 16px;
                    font-weight: bold;
                    color: black;
                }
                .small-text {
                    font-size: 12px;
                }
            }
        }
    }
}
.title-center {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px 10px;
}

.title-center img {
    width: 60px;
    height: 60px;
}

p {
    font-size: 12px;
    color: black;
    text-align: center
}
h2 {
    color: black;
    text-align: center
}


</style>