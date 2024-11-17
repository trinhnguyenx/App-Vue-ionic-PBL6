<template>
    <ion-page class="container bg-white" >
        <div class="home-page-container">
        <div class="home-page-header">
            <div class="home-page-header__avatar">
                <img src="http://www.gravatar.com/avatar/?d=mp" alt="avatar" />
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
        <div class="title-center">
            <p>Quản lí thông tin</p>
            <div class="filed-card-manager">
                <div class="filed-card-1">
                    <img src="../assets/img/card.jpg" alt="">
                    <p>Thẻ căn cước/CCCD</p>
                </div>
                <div class="filed-card-1">
                    <img src="../assets/img/card.jpg" alt="">
                    <p>Giấy phép lái xe</p>
                </div>
                <div class="filed-card-1">
                    <img src="../assets/img/card.jpg" alt="">
                    <p>Thẻ BHYT</p>
                </div>
            </div>
        </div>
    </div>

</ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';


</script>

<style scoped scss>
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
.home-page-center {
    .title-center {
        padding: 20px;
        p {
            font-size: 20px;
            font-weight: bold;
            color: #000;
        }
        .filed-card-manager {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 20px;
            .filed-card-1 {
                border-radius: 10px;
                justify-content: center;
                align-items: center;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%
                }
                p {
                    font-size: 12px;
                    font-weight: bold; 
                    color: black;
                }
            }
        }
    }
}
</style>