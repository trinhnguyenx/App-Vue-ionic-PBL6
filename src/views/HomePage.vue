<template>
    <ion-page class="container bg-white">
        <div class="loader" v-if="isLoading"></div>

        <div v-else>
            <div class="home-page-container bg-white">
            <div class="home-page-header">
                <div class="home-page-header__avatar">
                    <img src="https://www.gravatar.com/avatar/?d=mp" alt="avatar" />
                </div>
                <div class="home-page-header__info ">
                    <div class="valid">
                        <p>Định danh mức 2</p>
                        <img src="../assets/img/icon-header.png" alt="" style="width: 13px; height: 13px;">
                    </div>
                    <p class="home-page-header__info__name ">{{ fullname }}</p>
                </div>
            </div>
            <div class="home-page-header-card ">
                <IonButton class="outbound-card-left" @click="gotoQR">
                    <div class="outbound-card-body">
                        <div class="outbound-card-icon-left">
                            <img src="https://media.istockphoto.com/id/1285468638/vector/blue-driver-license-card-icon.jpg?s=612x612&w=0&k=20&c=YCYtbsk__ZAPRrUdX1spES3F-kw-ktzcu18P_In8IB4="
                                alt="">
                        </div>
                        <div class="small-text-1">
                            <p>Mã QR</p>
                            <p>Thẻ CCCD</p>
                        </div>
                    </div>
                </IonButton>
                <IonButton class="outbound-card-right" @click="gotoQR">
                    <div class="outbound-card-body">
                        <div class="outbound-card-icon" style="width: 30px; height: 30px;">
                            <img src="https://vneid.gov.vn/_next/static/media/app-icon.a38acfa3.svg" alt=""
                                style="z-index: 99;">
                        </div>
                        <div class="small-text-2">
                            <p>Mã QR</p>
                            <p>Định danh điện tử</p>
                        </div>
                    </div>
                </IonButton>
            </div>
        </div>
        <!--  -->
        <div class="home-page-center bg-white">
            <h2 style="margin-top: 10px; font-weight: 600;">Nhóm dịch vụ</h2>
            <div class="title-center">
                <div class="filed-card-manager">
                    <!-- SVG được chèn trực tiếp -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 128 128">
                        <path fill="#ffb300"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <radialGradient id="notoSunWithFace0" cx="64" cy="64" r="75.481" gradientUnits="userSpaceOnUse">
                            <stop offset=".556" stop-color="#ffb604" />
                            <stop offset=".691" stop-color="#fec61b" />
                            <stop offset=".822" stop-color="#fdd835" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace0)"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <circle cx="64" cy="64" r="42.46" fill="#ffb300" />
                        <radialGradient id="notoSunWithFace1" cx="66.147" cy="100.924" r="66.57"
                            gradientTransform="matrix(1 0 0 1.0876 0 -8.844)" gradientUnits="userSpaceOnUse">
                            <stop offset=".694" stop-color="#ffb604" />
                            <stop offset=".849" stop-color="#fec61b" />
                            <stop offset="1" stop-color="#fdd835" />
                        </radialGradient>
                        <circle cx="64" cy="64" r="42.46" fill="url(#notoSunWithFace1)" />
                        <g fill="#5d4037">
                            <ellipse cx="46.8" cy="54.29" rx="5.25" ry="6.17" />
                            <ellipse cx="81.2" cy="54.29" rx="5.25" ry="6.17" />
                        </g>
                        <path fill="#5d4037"
                            d="M75.81 75.67c-1.7 1.11-5.31 3.72-11.82 3.72S53.59 76.85 52 75.54c-.73-.61-1.66-1.1-2.34-.59s-.81 1.55-.33 2.29c1.84 2.85 6.71 7.13 14.65 7.27c7.94-.14 12.81-4.42 14.65-7.27c.4-.62.44-1.51-.03-1.99c-.61-.64-1.75-.26-2.79.42" />
                        <path fill="#de7321"
                            d="M58.89 69.52c-1.39-1.42-.11-2.17 1.42-1.74c1.93.54 5.01.28 5.81-1.3c1.52-3.04-.38-4.76-2.74-10.02c-2.46-5.5.63-11.49 4.2-11.8c2.86-.24 1.91 1.12 1.01 1.7c-1.75 1.14-3.6 4.93-.77 9.17c4.82 7.21 4.82 10.62 2.33 14.06c-1.61 2.22-7.35 3.94-11.26-.07" />
                        <radialGradient id="notoSunWithFace2" cx="-1858.159" cy="139.608" r="15.525"
                            gradientTransform="matrix(-.7447 -.3192 -.3117 .736 -1297.374 -633.673)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace2)"
                            d="M50.38 71.89c-1.63 3.93-7.05 5.42-12.12 3.33c-5.06-2.09-7.85-6.98-6.22-10.91s7.05-5.42 12.12-3.33c5.06 2.09 7.85 6.98 6.22 10.91"
                            opacity="0.65" />
                        <radialGradient id="notoSunWithFace3" cx="200.244" cy="-2.317" r="15.525"
                            gradientTransform="matrix(.7447 -.3192 .3117 .736 -63.29 127.89)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace3)"
                            d="M77.62 71.89c1.63 3.93 7.05 5.42 12.12 3.33c5.06-2.09 7.85-6.98 6.22-10.91s-7.05-5.42-12.12-3.33c-5.06 2.09-7.85 6.98-6.22 10.91"
                            opacity="0.65" />
                    </svg>

                    <p>Thủ tục hành chính</p>
                </div>


                <div class="filed-card-manager">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 128 128">
                        <path fill="#ffb300"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <radialGradient id="notoSunWithFace0" cx="64" cy="64" r="75.481" gradientUnits="userSpaceOnUse">
                            <stop offset=".556" stop-color="#ffb604" />
                            <stop offset=".691" stop-color="#fec61b" />
                            <stop offset=".822" stop-color="#fdd835" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace0)"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <circle cx="64" cy="64" r="42.46" fill="#ffb300" />
                        <radialGradient id="notoSunWithFace1" cx="66.147" cy="100.924" r="66.57"
                            gradientTransform="matrix(1 0 0 1.0876 0 -8.844)" gradientUnits="userSpaceOnUse">
                            <stop offset=".694" stop-color="#ffb604" />
                            <stop offset=".849" stop-color="#fec61b" />
                            <stop offset="1" stop-color="#fdd835" />
                        </radialGradient>
                        <circle cx="64" cy="64" r="42.46" fill="url(#notoSunWithFace1)" />
                        <g fill="#5d4037">
                            <ellipse cx="46.8" cy="54.29" rx="5.25" ry="6.17" />
                            <ellipse cx="81.2" cy="54.29" rx="5.25" ry="6.17" />
                        </g>
                        <path fill="#5d4037"
                            d="M75.81 75.67c-1.7 1.11-5.31 3.72-11.82 3.72S53.59 76.85 52 75.54c-.73-.61-1.66-1.1-2.34-.59s-.81 1.55-.33 2.29c1.84 2.85 6.71 7.13 14.65 7.27c7.94-.14 12.81-4.42 14.65-7.27c.4-.62.44-1.51-.03-1.99c-.61-.64-1.75-.26-2.79.42" />
                        <path fill="#de7321"
                            d="M58.89 69.52c-1.39-1.42-.11-2.17 1.42-1.74c1.93.54 5.01.28 5.81-1.3c1.52-3.04-.38-4.76-2.74-10.02c-2.46-5.5.63-11.49 4.2-11.8c2.86-.24 1.91 1.12 1.01 1.7c-1.75 1.14-3.6 4.93-.77 9.17c4.82 7.21 4.82 10.62 2.33 14.06c-1.61 2.22-7.35 3.94-11.26-.07" />
                        <radialGradient id="notoSunWithFace2" cx="-1858.159" cy="139.608" r="15.525"
                            gradientTransform="matrix(-.7447 -.3192 -.3117 .736 -1297.374 -633.673)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace2)"
                            d="M50.38 71.89c-1.63 3.93-7.05 5.42-12.12 3.33c-5.06-2.09-7.85-6.98-6.22-10.91s7.05-5.42 12.12-3.33c5.06 2.09 7.85 6.98 6.22 10.91"
                            opacity="0.65" />
                        <radialGradient id="notoSunWithFace3" cx="200.244" cy="-2.317" r="15.525"
                            gradientTransform="matrix(.7447 -.3192 .3117 .736 -63.29 127.89)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace3)"
                            d="M77.62 71.89c1.63 3.93 7.05 5.42 12.12 3.33c5.06-2.09 7.85-6.98 6.22-10.91s-7.05-5.42-12.12-3.33c-5.06 2.09-7.85 6.98-6.22 10.91"
                            opacity="0.65" />
                    </svg>

                    <p>An sinh xã hội</p>
                </div>

                <div class="filed-card-manager">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 128 128">
                        <path fill="#ffb300"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <radialGradient id="notoSunWithFace0" cx="64" cy="64" r="75.481" gradientUnits="userSpaceOnUse">
                            <stop offset=".556" stop-color="#ffb604" />
                            <stop offset=".691" stop-color="#fec61b" />
                            <stop offset=".822" stop-color="#fdd835" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace0)"
                            d="M126.99 80.89L108.1 64.13l.06-.3L127 47.14l-24.83-5.09l-.07-.12l8-24.05l-24.02 8.02l-.12-.08L80.86 1L64.01 20.03h-.02L47.11 1.01l-5.08 24.88l-.06.03l-24.07-8.04l8 24.05c-.04.04-.07.09-.11.13L1.01 47.11l19 16.87l-.01.05L1 80.86l24.89 5.11l.02.04l-8.02 24.11l24.05-8.03l.1.08l5.1 24.83l16.84-19.01h.05l16.87 19l5.07-24.86l.07-.04l24.09 8.02l-8.02-24.03l.07-.12z" />
                        <circle cx="64" cy="64" r="42.46" fill="#ffb300" />
                        <radialGradient id="notoSunWithFace1" cx="66.147" cy="100.924" r="66.57"
                            gradientTransform="matrix(1 0 0 1.0876 0 -8.844)" gradientUnits="userSpaceOnUse">
                            <stop offset=".694" stop-color="#ffb604" />
                            <stop offset=".849" stop-color="#fec61b" />
                            <stop offset="1" stop-color="#fdd835" />
                        </radialGradient>
                        <circle cx="64" cy="64" r="42.46" fill="url(#notoSunWithFace1)" />
                        <g fill="#5d4037">
                            <ellipse cx="46.8" cy="54.29" rx="5.25" ry="6.17" />
                            <ellipse cx="81.2" cy="54.29" rx="5.25" ry="6.17" />
                        </g>
                        <path fill="#5d4037"
                            d="M75.81 75.67c-1.7 1.11-5.31 3.72-11.82 3.72S53.59 76.85 52 75.54c-.73-.61-1.66-1.1-2.34-.59s-.81 1.55-.33 2.29c1.84 2.85 6.71 7.13 14.65 7.27c7.94-.14 12.81-4.42 14.65-7.27c.4-.62.44-1.51-.03-1.99c-.61-.64-1.75-.26-2.79.42" />
                        <path fill="#de7321"
                            d="M58.89 69.52c-1.39-1.42-.11-2.17 1.42-1.74c1.93.54 5.01.28 5.81-1.3c1.52-3.04-.38-4.76-2.74-10.02c-2.46-5.5.63-11.49 4.2-11.8c2.86-.24 1.91 1.12 1.01 1.7c-1.75 1.14-3.6 4.93-.77 9.17c4.82 7.21 4.82 10.62 2.33 14.06c-1.61 2.22-7.35 3.94-11.26-.07" />
                        <radialGradient id="notoSunWithFace2" cx="-1858.159" cy="139.608" r="15.525"
                            gradientTransform="matrix(-.7447 -.3192 -.3117 .736 -1297.374 -633.673)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace2)"
                            d="M50.38 71.89c-1.63 3.93-7.05 5.42-12.12 3.33c-5.06-2.09-7.85-6.98-6.22-10.91s7.05-5.42 12.12-3.33c5.06 2.09 7.85 6.98 6.22 10.91"
                            opacity="0.65" />
                        <radialGradient id="notoSunWithFace3" cx="200.244" cy="-2.317" r="15.525"
                            gradientTransform="matrix(.7447 -.3192 .3117 .736 -63.29 127.89)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef6c00" />
                            <stop offset="1" stop-color="#ef6c00" stop-opacity="0" />
                        </radialGradient>
                        <path fill="url(#notoSunWithFace3)"
                            d="M77.62 71.89c1.63 3.93 7.05 5.42 12.12 3.33c5.06-2.09 7.85-6.98 6.22-10.91s-7.05-5.42-12.12-3.33c-5.06 2.09-7.85 6.98-6.22 10.91"
                            opacity="0.65" />
                    </svg>

                    <p>Hồ sơ sức khỏe</p>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="image-bgr bg-white">
            <img src="../assets/img/anhnen.jpg" alt="">
        </div>

        <!--  -->
        <div class="home-page-center bg-white">
            <h2 style="margin-top: 10px; font-weight: 600;">Tiện ích yêu thích</h2>
            <div class="title-center">
                <div class="filed-card-manager" @click="gotocccd">
                    <img src="https://media.istockphoto.com/id/1285468638/vector/blue-driver-license-card-icon.jpg?s=612x612&w=0&k=20&c=YCYtbsk__ZAPRrUdX1spES3F-kw-ktzcu18P_In8IB4="
                        alt="Thẻ căn cước/CCCD">
                    <p>Thẻ căn cước/CCCD</p>
                </div>

                <div class="filed-card-manager" @click="gotogplx">
                    <img src="https://media.istockphoto.com/id/1285468638/vector/blue-driver-license-card-icon.jpg?s=612x612&w=0&k=20&c=YCYtbsk__ZAPRrUdX1spES3F-kw-ktzcu18P_In8IB4="
                        alt="Giấy phép lái xe">
                    <p>Giấy phép lái xe</p>
                </div>

                <div class="filed-card-manager" @click="gotobhyt">
                    <img src="https://media.istockphoto.com/id/1285468638/vector/blue-driver-license-card-icon.jpg?s=612x612&w=0&k=20&c=YCYtbsk__ZAPRrUdX1spES3F-kw-ktzcu18P_In8IB4="
                        alt="Thẻ BHYT">
                    <p>Thẻ BHYT</p>
                </div>
            </div>
            <div class="bg-white">
                <h2 style="margin-top: 10px; font-weight: 600;">Thông tin</h2>
                <div class="home-page-end">
                    <div class="img-left">
                        <div class="flex-icon">
                            <ion-icon aria-hidden="true" :icon="warningOutline" />
                            <a href="https://phongtraoantq.bocongan.gov.vn/Category.html?catId=thu-doan-toi-pham">Thủ đoạn tội phạm</a>
                        </div>
                        <img style="width: 10rem; height: 5rem; border-radius: 10px;"
                            src="https://storage-vnportal.vnpt.vn/lci-ubnd-responsive/4650/2025/%E1%BA%A2nh%205.%20C%C3%A1c%20%C4%91%C6%A1n%20v%E1%BB%8B%20k%C3%BD%20cam%20k%E1%BA%BFt%20ch%E1%BA%A5p%20h%C3%A0nh%20ph%C3%A1p%20lu%E1%BA%ADt%20n%C4%83m%202025%20(4).jpg"
                            alt="">
                        <div class="flex-date">
                            <ion-icon aria-hidden="true" :icon="calendarClearOutline" />
                            <p>18-12-2024</p>
                        </div>
                    </div>
                    <div class="img-right">
                        <div class="flex-icon">
                            <ion-icon aria-hidden="true" :icon="newspaperOutline" />
                            <a href="https://vneid.gov.vn/news/xuat-hien-nhieu-cuoc-gioi-gia-danh-de-lua-dao-chiem-doat-tai-san?id=7563">Tin tức</a>
                        </div>
                        <img style="width: 10rem; height: 5rem; border-radius: 10px;" src="../assets/img/anh.jpg"
                            alt="">
                        <div class="flex-date">
                            <ion-icon aria-hidden="true" :icon="calendarClearOutline" />
                            <p>20-12-2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonPage, IonIcon} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { newspaperOutline, calendarClearOutline, warningOutline } from 'ionicons/icons';

const router = useRouter();
const isLoading = ref(true)
const gotocccd = async () => {
    const isVerified = localStorage.getItem('is_verified') === 'true';
    router.push(isVerified ? '/cccd-view' : '/form');
};

const gotogplx = async () => {
    const isGplx = localStorage.getItem('is_gplx') === 'true';
    router.push(isGplx ? '/gplx-view' : '/verify-gplx');
};

const gotobhyt = async () => {
    const isBhyt = localStorage.getItem('is_bhyt') === 'true';
    router.push(isBhyt ? '/bhyt-view' : '/verify-bhyt');
};
const gotoQR = async () => {
    router.push('/generate-qr');
};

const fullname = ref<string>(localStorage.getItem('name') || 'Tên Người Dùng');

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); 
});

</script>

<style scoped>
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
}

.home-page-container {
    background-image: url('../assets/img/trongdo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 99;
}

.home-page-header {
    display: flex;
    padding: 10px 10px 0px 10px;
    align-items: center;
    gap: 10px;
}

.home-page-header__avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.home-page-header__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
}

.home-page-header__info .home-page-header__info__name {
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    margin: 10px;

}

.home-page-header-card {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 20px 10px;
}

.outbound-card-left,
.outbound-card-right {
    width: 50%;
    height: 50px;
}

.outbound-card-left .outbound-card-body,
.outbound-card-right .outbound-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
}

.outbound-card-left img {
    width: 17vw;
    height: 10vh;
}

.outbound-card-right img {
    margin-top: 0;
}

.outbound-card-left p {
    font-weight: bold;
}

.outbound-card-right p {
    font-weight: bold;
}

.outbound-card-body .small-text-1 p {
    font-size: 8px;
    width: 60px;
    color: black;
    margin-bottom: 3px;
    text-align: left;
    padding-left: 10px;
    font-style: normal;
}

.outbound-card-body .small-text-2 p {
    font-size: 8px;
    width: 60px;
    color: black;
    margin-bottom: 3px;
    text-align: left;
    margin-left: 10px;
    font-style: normal;

}

.title-center {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 20px;
    margin: 10px;
}

.title-center img {
    width: 3.5rem;
    height: 3.5rem;
}

.title-center p {
    font-size: 0.6rem;
    color: black;
}

h2 {
    color: black;
    font-size: 0.8rem;
    padding-left: 10px;
    font-weight: 800;
}

.outbound-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0px;
}

.outbound-card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 43px;
    height: 50px;
}

.outbound-card-icon-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

}

.image-bgr {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-bgr img {
    width: 94vw;
    border-radius: 10px;
}

ion-button {
    --background: #ffffff;
    --border-radius: 10px;
    --border: 1px solid #ffffff;
    --border-color: #ffffff;
}

.valid {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: black;
    font-size: 12px;
    font-weight: bold;
    padding: 5px 0px;
    border-radius: 15px;
    background-color: #ffffff;
    width: 120px;
}

.valid p {
    font-size: 0.5rem;

}

.filed-card-manager {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: #ffffff;
    color: black;
}

.flex-icon {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 5px;
    margin-bottom: 10px;

}

.flex-icon a {
    font-size: 0.7rem;
    color: #D7344C;
    padding: 3px;
    font-weight: bold;
    cursor: pointer;
}

.flex-date {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 10px;
}

.flex-date p {
    font-size: 0.6rem;
    color: gray;
}

.home-page-end {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
}

.img-left,
.img-right {
    flex: 1;
    padding: 0 0 5px 0;
    border-bottom: 1px solid #F9F9F9;
}

.img-left {
    margin-left: 10px;
}

.flex-icon ion-icon {
    color: #D7344C;
}

.flex-date ion-icon {
    color: gray;
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
