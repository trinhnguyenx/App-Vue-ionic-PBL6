<script setup lang="ts">
import { onMounted, ref} from "vue";
import { Filesystem, Directory} from "@capacitor/filesystem";
import { Camera, CameraResultType } from "@capacitor/camera";
import { IonPage, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonContent } from "@ionic/vue";
import {updloadImages } from "@/services/photoService";
import { notify } from "@/utils/toast";
import { ICardGPLXCreate } from "@/type/card";
import { useRouter} from 'vue-router';
import { saveGPLX, updateActiveGPLX } from '@/services/photoService';
const router = useRouter();


const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardGPLXCreate | null>(null);
const showForm = ref(false);    
const showerror = ref<string | null>(null);
const showAlert = ref(false);

////////////
const name = ref('');
const dob = ref('');
const id = ref('');
const iplace = ref('');
const origin_place = ref('');
const issue_date = ref('');
const expire_date = ref('');
const nationality = ref('');
const level = ref('');
const type = ref('GPL');
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
      name.value = listData.value.name;
      dob.value = listData.value.dob;
      id.value = listData.value.id;
      iplace.value = listData.value.iplace;
      origin_place.value = listData.value.origin_place;
      issue_date.value = listData.value.issue_date;
      expire_date.value = listData.value.expire_date;
      nationality.value = listData.value.nationality;
      level.value = listData.value.level;
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
const gotohome = async () => {
    router.push('/tabs');
};
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
      name: name.value,
      dob: dob.value,
      id: id.value,
      iplace: iplace.value,
      origin_place: origin_place.value,
      issue_date: issue_date.value,
      expire_date: expire_date.value,
      nationality: nationality.value,
      level: level.value,
      type: type.value,
      user: userId
    };

      await saveGPLX(listData.value);
      setTimeout( async () => {
        await updateActiveGPLX(userId);
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

onMounted(() => {
  showAlert.value = true;
});
</script>

<template>
  <ion-page>
    <!-- Popup Alert -->
    <IonAlert
      :isOpen="showAlert"
      onDidDismiss="() => showAlert.value = false"
      header="Xác thực Giấy Phép Lái Xe"
      message="Bạn cần xác thực tài khoản bằng GPLX."
      :buttons="[ 
        {
          text: 'OK',
          handler: () => {
            takePhoto();
          }
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
            router.push('/tabs');
          }
        }
      ]"
    />
          <IonContent class="ion-padding" v-if="showForm">
      <IonGrid class="ion-no-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Thông tin thẻ GPLX</IonCardTitle>
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
                <IonInput v-model="dob" placeholder="Nhập ngày sinh" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Nationality:</IonLabel>
                <IonInput v-model="nationality" placeholder="Nhập quốc tịch" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Origin Place:</IonLabel>
                <IonInput v-model="origin_place"  clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">IPlace:</IonLabel>
                <IonInput v-model="iplace"  clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Level:</IonLabel>
                <IonInput v-model="level" placeholder="Nhập trình độ" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Expire Date:</IonLabel>
                <IonInput v-model="expire_date" placeholder="Ngày hết hạn" clear-input></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Issue Date:</IonLabel>
                <IonInput v-model="issue_date" placeholder="Ngày cấp" clear-input></IonInput>
              </IonItem>

              <!-- Submit Button -->
              <IonButton expand="full" class="ion-margin-top" @click="saveForm">
                Lưu thông tin
              </IonButton>
              <IonButton expand="full" class="ion-margin-top" @click="gotohome">
                Thoát
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