<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Filesystem, Directory} from "@capacitor/filesystem";
import { Camera, CameraResultType } from "@capacitor/camera";
import { IonPage, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonContent } from "@ionic/vue";

import {
  imageOutline,
} from "ionicons/icons";

import { updloadImages } from "@/services/photoService";
import { notify } from "@/utils/toast";
import { ICardCCCDCreate } from "@/type/card";
import { useRouter, useRoute } from 'vue-router';
import { saveCCCD } from '@/services/photoService';
import {updateActive} from '@/services/auth';
import { alertController } from '@ionic/vue';


const router = useRouter();


const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardCCCDCreate | null>(null);
const showForm = ref(false);
const showerror = ref<string | null>(null);
const showAlert = ref(false);

////////////
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
const user = ref('');
//////////////


const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: true,
      quality: 100,
      saveToGallery: true,
    });

    if (image.path) {
      await uploadPhoto(image);
    }
  } catch (error) {
    notify.error(`${error}`);
    console.error(error);
  }
};
const addToList = async (path: string) => {
  const name = path?.split("/").at(-1);
  if (name) {
    photoList.value.push({ name: name, data: await readPhoto(name) });
  }
};
const readPhoto = async (fileName: string) => {
  const file = await Filesystem.readFile({
    path: `${rootDir}/${fileName}`,
    directory: directory,
  });
  return `data:image/jpeg;base64,${file.data}`;
};

const uploadPhoto = async (image: any) => {
  try {
    const fileData = await Filesystem.readFile({
      path: image.path || image.webPath,
    });

    const fileContent = atob(fileData.data as string);
    const byteNumbers = new Uint8Array(
      fileContent.split('').map((char) => char.charCodeAt(0))
    );

    const formData = new FormData();
    formData.append('file', new Blob([byteNumbers], { type: image.format }), 'photo.jpg');

    const response = await updloadImages(formData);

    const result = response.text
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
    setTimeout(() => {
      showForm.value = true;
    }, 2000);

    showerror.value = null;
    return result;
  } catch (error) {
    showerror.value = `${error}`;
    throw error;
  }
};
////////////
const userId: number = parseInt(localStorage.getItem('id') || '0', 10);

const saveForm = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!dob.value || !name.value || !id.value || !nationality.value) {
      notify.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }
    // Gán dữ liệu vào listData
    listData.value = {
      dob: dob.value,
      nationality: nationality.value,
      id: id.value,
      name: name.value,
      gender: gender.value,
      expire_date: expireDate.value,
      type: type.value,
      origin_place: originPlace.value,
      current_place: currentPlace.value,
      issue_date: issueDate.value,
      user: userId
    };

      await saveCCCD(listData.value);
      setTimeout( async () => {
        await updateActive(name.value,userId);
      }, 2000);
      notify.success('Dữ liệu đã được lưu thành công');
      setTimeout(() => {
        router.push('/tabs');
      }, 1000);
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
    notify.error(`Lỗi xảy ra, vui lòng thử lại. ${error}`);
  }
};

//////////////

const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'Xác thực Căn Cước Công Dân',
    message: 'Bạn cần xác thực tài khoản bằng CCCD',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          console.log('Ok button clicked');
          takePhoto();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          router.push('/auth/login');
        }
      }
    ],
  });

  await alert.present();
};

onMounted(() => {
  presentAlert();
});
</script>

<template>
  <ion-page>
    <!-- Popup Alert -->
          <IonContent class="ion-padding" v-if="showForm">
      <IonGrid class="ion-no-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Thông tin thẻ CCCD</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem lines="full">
                <IonLabel position="stacked">Full Name:</IonLabel>
                <IonInput v-model="name" placeholder="Nhập họ và tên" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Card Number:</IonLabel>
                <IonInput v-model="id" placeholder="Nhập số thẻ" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Birthday:</IonLabel>
                <IonInput v-model="dob" placeholder="Nhập ngày sinh"></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Nationality:</IonLabel>
                <IonInput v-model="nationality" placeholder="Nhập quốc tịch" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Issued by:</IonLabel>
                <IonInput v-model="originPlace" placeholder="Nhập nơi cấp" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Gender:</IonLabel>
                <IonInput v-model="gender" placeholder="Nhập giới tính" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Expire Date:</IonLabel>
                <IonInput v-model="expireDate" placeholder="Ngày hết hạn"></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Issue Date:</IonLabel>
                <IonInput v-model="issueDate" placeholder="Ngày cấp" clear-input></IonInput>
              </IonItem>

              <!-- Submit Button -->
              <IonButton expand="full" class="ion-margin-top" @click="saveForm">
                Lưu thông tin
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonGrid>
    </IonContent>    
  </ion-page>
</template>

<style scoped>
/* Full page styling */
ion-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Card styling */
ion-card {
  margin: 0;
  border-radius: 10px;
}

/* Full-width inputs */
ion-input {
  width: 100%;
}

/* Button styling */
ion-button {
  --background: #3880ff;
  --color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
}

/* Alert spacing */
ion-alert {
  width: 80%;
  margin-left: 10%;
}
</style>