<template>
  <ion-page>
    <!-- <div v-if="showForm" class="form-data">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Thông tin GPLX</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>Họ và Tên:</ion-label>
                  <ion-text>{{ listData?.name }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Ngày Sinh:</ion-label>
                  <ion-text>{{ listData?.dob }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Quốc Tịch:</ion-label>
                  <ion-text>{{ listData?.nationality }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Loại GPLX:</ion-label>
                  <ion-text>{{ listData?.type }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Cấp bởi:</ion-label>
                  <ion-text>{{ listData?.iplace }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Hạn:</ion-label>
                  <ion-text>{{ listData?.expire_date }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Xuất xứ:</ion-label>
                  <ion-text>{{ listData?.origin_place }}</ion-text>
                </ion-item>
                <div v-if="showerror" style="margin-top: 20px;">
                  <ion-card color="danger">
                    <ion-card-header>
                      <ion-card-title>Error</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <p>{{ showerror }}</p>
                    </ion-card-content>
                  </ion-card>
                </div>

              </ion-list>
              <ion-button expand="block" color="primary" @click="closeForm">
                Đóng
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div> -->
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
