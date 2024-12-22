<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="tabbar-custom" slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="home" />
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/wallet">
          <ion-icon aria-hidden="true" :icon="wallet" />
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/scan">
          <div class="add-btn">
            <ion-icon aria-hidden="true" :icon="scanOutline" />
          </div>
        </ion-tab-button>
        <ion-tab-button tab="tab4" href="/tabs/notification">
          <ion-icon aria-hidden="true" :icon="notifications" />
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {  home, wallet, scanOutline, notifications, settings} from 'ionicons/icons';
import { useRoute } from 'vue-router';
</script>

<style>
.tabbar-custom {
  --background: #ffffff;
  --border-color: #cbcbcb;
  --border-style: solid;
  --border-width: 1px;
  border: 1px solid #cbcbcb;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}

.add-btn {
  --background: #cbcbcb;
  border-radius: 10px;
  width: 40px;
  max-width: 40px;
  height: 40px;
  overflow: hidden;
  color: #000000;
  background-color: #cbcbcb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  font-weight: 800;
}
.tab-selected .add-btn {
  color: #D7344C;
}
.tabbar-custom .tab-selected {
  color: #D7344C;
}
.add-btn icon-icon {
  color: #D7344C;
}
</style>