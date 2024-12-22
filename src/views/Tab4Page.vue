<template>
  <ion-page>

    <ion-content>
      <div class="loader" v-if="loading"></div>
      <div v-else>
        <ion-header>
          <ion-toolbar>
            <ion-title>Thông báo</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh" @ionPull="handlePulling" @ionStart="handleStart">
          <ion-refresher-content refreshingSpinner="circles">
            <div v-if="overPull" class="over-pull-effect">
              <ion-icon name="arrow-down-outline" class="pull-icon"></ion-icon>
            </div>
          </ion-refresher-content>
        </ion-refresher>

        <!-- Danh sách thông báo -->
        <ion-card v-for="item in listdata" :key="item.uuid" class="notification-card" @click="markAsRead(item)">
          <div v-if="item.is_new" class="notification-dot"></div>
          <p class="text-header-card">{{ handleDate(item.created_at) }}</p>
          <ion-card-header>
            <ion-card-title class="custom-title">{{ item.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="text-des">{{ item.description }}</p>
            <div class="icon-flex">
              <ion-icon aria-hidden="true" :icon="stopwatchOutline" />
              <p class="text-header">{{ handleTime(item.created_at) }}</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted,} from "vue";
import {
  IonPage,
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { INotification } from "@/type/auth";
import { getNoti, PutNoti } from "@/services/auth";
import { stopwatchOutline } from "ionicons/icons";
import { notify } from "@/utils/toast";

const userId = localStorage.getItem("id");
const listdata = ref<INotification[]>([]);
const overPull = ref(false);
const loading = ref(false);

// Lấy danh sách thông báo từ API
const getListNoti = async () => {
  loading.value = true;
  try {
    const res = await getNoti(Number(userId));
    listdata.value = res.map((item: any) => ({ ...item, isNew: item.is_new }));
  } catch (error) {
    notify.error(String(error));
  } finally {
    loading.value = false;
  }
};

const markAsRead = async (notification: INotification) => {
  if (!notification.is_new) return;
  try {
    await PutNoti(notification.uuid);
    notification.is_new = false;
  } catch (error) {
    notify.error("Lỗi khi cập nhật thông báo.");
  }
};
const doRefresh = async (event: any) => {
  await getListNoti();
  overPull.value = false;
  event.target.complete();
};
const handlePulling = (event: any) => {
  if (event.detail.ratio > 1) {
    overPull.value = true;
  } else {
    overPull.value = false;
  }
};
const handleStart = () => {
  overPull.value = false;
};
const handleDateTime = (dateTimeString: string) => {
  const parsedDate = new Date(dateTimeString);
  const localDate = parsedDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  return localDate;
};
const handleDate = (dateTimeString: string) => {
  const datetime = handleDateTime(dateTimeString);
  return datetime.split(" ")[1];
};
const handleTime = (dateTimeString: string) => {
  const datetime = handleDateTime(dateTimeString);
  return datetime.split(" ")[0];
};


onMounted(() => {
  getListNoti();
});
</script>

<style scoped>
.notification-card {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
}

.notification-card:hover {
  transform: scale(1.02);
}
.notification-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: rgb(215,52,67);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgb(215,52,67);
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
    box-shadow: 0 0 3px 3px rgb(215,52,67);
  }
  100% {
    transform: scale(1);
    opacity: 0;
    box-shadow: 0 0 0 0 rgb(215,52,67);
  }
}

.text-header-card {
  font-size: 0.9rem;
  color: gray;
}

.new-notification {
  color: #007aff;
  font-weight: bold;
}

.flex {
  display: flex;
  align-items: center;
  gap: 5px;
  color: gray;
  margin-top: 10px;
}

ion-card-title {
  font-size: 0.8rem;
  padding-top: 5px;

}

ion-card-header {
  padding: 0px 16px 3px;
}

.text-des {
  font-size: 0.7rem;
}

.text-header-card {
  font-size: 0.7rem;
  color: gray;
  margin: 3px 15px;
}

.icon-flex p {
  font-size: 0.7rem;
  color: gray;
}

.icon-flex {
  display: flex;
  align-items: center;
  color: gray;
}

icon-card-content {
  padding-top: 0;
  padding-bottom: 0;

}

ion-title {
  font-size: 0.9rem;
  font-weight: bold;
}
ion-header {
  border-bottom: 1px solid #ddd;
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
