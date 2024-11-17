<template>
  <ion-page>
    <Teleport to="body">
      <div class="loading" v-if="isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="#000000" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25" />
          <path fill="#000000"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
              values="0 12 12;360 12 12" />
          </path>
        </svg>
        <p>Đang tạo...</p>
        <div class="p-5">
          <img src="/ads2.jpg" alt="">
        </div>
      </div>
    </Teleport>
    <div class="relative h-screen">
        <div class="fixed w-full left-0 text-3xl font-bold text-center top-12 z-10 text-white">Tạo lịch trình</div>
        <div class="absolute w-full h-[40vh] z-[-1]">
        <img
          src="/bg.avif"
          class="w-full h-full object-cover" />
      </div>
      <div class="p-5 absolute w-full bottom-0 h-[80vh] z-10">
        <div class="p-5 bg-white rounded-2xl overflow-y-auto h-full">
          <div>
            <p>Tìm kiếm địa điểm</p>
            <AutoComplete class="!w-full mt-2" v-model="payload.destination" :suggestions="listCitySuggest" @complete="search" placeholder="Nhập địa điểm..." />
          </div>
          <div class="mt-5">
            <div class="time-travel">
              <div class="time-travel__header">
                <p>Thời gian</p>
                <p>
                  {{calculateDaysBetween(payload.fromDate.toISOString().split("T")[0], payload.toDate.toISOString().split("T")[0]) || ' '}} ngày
                </p>
              </div>
              <div class="time-travel__main">
                <div class="time-travel__main__item">
                  <p>Ngày đi</p>
                  <DatePicker dateFormat="dd/mm/yy" v-model="payload.fromDate" />
                </div>
                <div class="time-travel__main__item">
                  <p>Ngày về</p>
                  <DatePicker dateFormat="dd/mm/yy" v-model="payload.toDate" />
                </div>
              </div>
            </div>

            <!-- range -->
            <div class="w-full mt-5">
            <div>
              <div class="flex gap-2">
                <p>Ngân sách:</p> {{ formatNumber(payload.budget) }} VND
              </div>
              <InputText class="w-full mt-2" type="number" v-model.number="payload.budget" />
            </div>
            <div class="mt-5">
              <Slider :step="500000" v-model="payload.budget" class="w-full" :min="0" :max="100000000"/>
            </div>
          </div>
<br>
            <div class="field customer">
              <p>
                Khách
              </p>
              <div>
                <ion-icon class="icon" @click="removeCustomer" aria-hidden="true" :icon="removeCircle" />
                <p>{{ customer }}</p>
                <ion-icon class="icon" @click="addCustomer" aria-hidden="true" :icon="addCircle" />
              </div>
            </div>

            <div class="mt-5">
              <p>Ẩm thực muốn thưởng thức:</p>
              <InputText class="w-full mt-2" type="text" v-model="payload.favoriteFoods" placeholder="vd: Ẩm thực địa phương..vv" />
            </div>
            <div class="mt-5">
              <p>Yêu cầu khác:</p>
              <InputText class="w-full mt-2" type="text" v-model="payload.otherSpecialRequests" placeholder="Nhập yêu cầu khác" />
            </div>

            <div class="field">
              <Button class="w-full" @click="onSubmited" label="Tạo timeline bằng AI" />
            </div>
          </div>
        </div>
      </div>
    </div>


  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRange, IonSelect, IonSelectOption } from '@ionic/vue';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Slider from 'primevue/slider';
import { formatNumber } from '@/utils/price';
import { addCircle, removeCircle } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { IonInput, IonLabel, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import location from "@/utils/location.json"
import { calculateDaysBetween } from '@/utils/time';
import AutoComplete from 'primevue/autocomplete';
import { createTimeline } from '@/services/timeline';

const startDate = ref(new Date());
const endDate = ref(new Date());
const budget = ref(500000);
const desiredLocation = ref('');

const destination = ref('');
const customer = ref(1);
function addCustomer() {
  customer.value++;
}

const listCitySuggest = ref<any[]>([]);
const search = () => {
  listCitySuggest.value = location.filter(city => city.name.toLowerCase().includes(payload.value.destination.toLowerCase())).map(city => city.name);
}

export interface Payload {
  destination: string
  fromDate: Date
  toDate: Date
  numberOfPeople: number
  budget: any
  preferredTypeOfTravel: string
  typeOfTravel: string
  favoriteActivities: string
  favoriteFoods: string
  otherSpecialRequests: string
}

const payload = ref<Payload>({
  destination: '',
  fromDate: new Date(),
  toDate: new Date(),
  numberOfPeople: 1,
  budget: 500000,
  preferredTypeOfTravel: 'Văn hóa',
  typeOfTravel: 'Tham quan',
  favoriteActivities: 'Thăm các địa điểm du lịch',
  favoriteFoods: '',
  otherSpecialRequests: ''
});

const payloadComputed = computed(() => {
  return {
    ...payload.value,
    fromDate: payload.value.fromDate.toISOString().split('T')[0],
    toDate: payload.value.toDate.toISOString().split('T')[0],
    budget: formatNumber(payload.value.budget) + ' VND',
    destination: payload.value.destination + ' Việt Nam',
    favoriteFoods: payload.value.favoriteFoods || 'Ẩm thực địa phương, Bánh ngọt',
    otherSpecialRequests: payload.value.otherSpecialRequests || 'Cần danh sách nhà hàng',
    numberOfPeople: customer.value
  }
});

function removeCustomer() {
  if (customer.value > 1) {
    customer.value--;
  }
}

const isLoading = ref(false);
const router = useRouter();


const onSubmited = async () => {
  isLoading.value = true;
  try {
    console.log(payloadComputed.value);
    // const data = await createTimeline(payloadComputed.value);
    await new Promise((resolve) => setTimeout(() => {
      resolve(true);
      router.push({
        name: 'detail',
        params: {
          id: '66a51f5084382d057743ab60'
        }
      });
    }, 3000));
    // console.log(data);
    // router.push({
    //   name: 'detail',
    //   params: {
    //     id: data._id
    //   }
    // });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<style scoped>
.wrapper {
  padding: 0 20px;
  padding-top: 40px;
}

.title {
  font-size: 2em;
  padding: 0 0;
  color: #007aff;
  font-weight: 800;
}

.grid-container {
  margin-top: 30px;
}

.page-container {
  padding: 0 20px !important;
}

.time-container {
  padding: 20px;
}

.time-travel {
  border: 1px solid #cbcbcb;
  border-radius: 10px;
}

.time-travel__header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #cbcbcb;
}

.time-travel__main {
  display: flex;
}

.time-travel__main__item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
}

.time-travel__main__item p:nth-child(1) {
  font-weight: 800;
}

.field {
  margin-top: 20px;
}

.customer {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  border-radius: 10px;
}

.customer>div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.5em;
  color: #007aff;
}

.row {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.row div {
  flex: 1;
}

.select-custom {
  --background: #ffffff;
  --placeholder-color: #868686;
  --placeholder-opacity: 0.8;

  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
  --border-color: #cbcbcb;
  --border-style: solid;
  --border-width: 1px;
  border: 1px solid #cbcbcb;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
}

.btn-custom {
  --background: #007aff;
  --color: #ffffff;
  border-radius: 14px;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  flex-direction: column;
  color: #fff;
}
</style>