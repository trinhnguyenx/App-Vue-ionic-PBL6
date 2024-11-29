
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonPage, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonAlert } from "@ionic/vue";
import { ICardCCCDCreate } from "@/type/card";
import { ICard } from "@/type/card";
import { useRouter, useRoute } from 'vue-router';
import { takePhoto, uploadPhoto } from "@/services/cameraService";
import { notify } from '@/utils/toast';
import { saveCCCD } from '@/services/photoService';

const route = useRoute();
const userId = parseInt(route.params.userId as string, 1);

const dob = ref('');
const nationality = ref('');
const id = ref('');
const name = ref('');
const gender = ref('');
const expireDate = ref('');
const originPlace = ref('');
const currentPlace = ref('');
const issueDate = ref('');
const type = ref('CCCD');

const listData = ref<ICardCCCDCreate | null>(null);
const showForm = ref(false);
const showAlert = ref(false);
const router = useRouter();


onMounted(() => {
  showAlert.value = true;
});

const handleCardVerification = async () => {
  try {
    const photo = await takePhoto();
    const response = await uploadPhoto(photo);
    listData.value = response.text;
    if ( response.text && listData.value) {
      dob.value = listData.value.dob;
      nationality.value = listData.value.nationality;
      id.value = listData.value.id;
      name.value = listData.value.name;
      gender.value = listData.value.gender;
      expireDate.value = listData.value.expire_date;
      originPlace.value = listData.value.origin_place;
      currentPlace.value = listData.value.current_place;
      issueDate.value = listData.value.issue_date;
    } else {
      notify.error('Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.');
    }
      showForm.value = true;
  } catch (error) {
    notify.error('Xác thực thất bại. Vui lòng thử lại.');
    console.error(error);
  }
};
const closeForm = () => {
  showForm.value = false;
};

const saveForm = async () => {
  try {
    listData.value = {
      dob: dob.value,
      nationality: nationality.value,
      id: id.value  ,
      name: name.value,
      gender: gender.value,
      expire_date: expireDate.value,
      type: type.value,
      origin_place: originPlace.value,
      current_place: currentPlace.value,
      issue_date: issueDate.value,
      user: userId || 1,
    };

    const response = await saveCCCD(listData.value);

    if (response.success) {
      notify.success('Dữ liệu đã được lưu thành công');
      router.push('/tabs');
    } else {
      notify.error('Đã có lỗi khi lưu dữ liệu');
    }
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
    notify.error('Lỗi xảy ra, vui lòng thử lại');
  }
};




</script>
<template>
  <ion-page>
    <IonAlert
      :isOpen="showAlert"
      onDidDismiss="() => showAlert.value = false"
      header="Xác thực tài khoản"
      message="Bạn cần xác thực tài khoản bằng CCCD."
      :buttons="[
        {
          text: 'OK',
          handler: () => {
            handleCardVerification();
          }
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
            router.push('/auth/login');
          }
        }
      ]"
    />

    <IonGrid v-if="showForm" class="ion-padding">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Thông tin thẻ CCCD</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel>Full Name:</IonLabel>
              <IonInput v-model="name" placeholder="Nhập họ và tên" clear-input></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Card Number:</IonLabel>
              <IonInput v-model="id" placeholder="Nhập số thẻ" clear-input></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Birthday:</IonLabel>
              <IonInput v-model="dob" type="date"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Nationality:</IonLabel>
              <IonInput v-model="nationality" placeholder="Nhập quốc tịch" clear-input></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Issued by:</IonLabel>
              <IonInput v-model="originPlace" placeholder="Nhập nơi cấp" clear-input></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Gender:</IonLabel>
              <IonInput v-model="gender" placeholder="Nhập giới tính" clear-input></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Expire Date:</IonLabel>
              <IonInput v-model="expireDate" placeholder="Nhập ngày sinh"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Issue Date:</IonLabel>
              <IonInput v-model="issueDate" placeholder="Ngày cấp" clear-input></IonInput>
            </IonItem>
          </IonList>

          <!-- Submit button -->
          <IonButton expand="full" @click="saveForm">Submit</IonButton>
        </IonCardContent>
      </IonCard>
    </IonGrid>
  </ion-page>
</template>

<style scoped>
ion-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ion-padding {
  padding: 16px;
}

ion-card {
  margin: 16px 0;
}

ion-item {
  margin-bottom: 12px;
}

ion-input {
  width: 100%;
}

.ion-button {
  margin-top: 16px;
}
</style>