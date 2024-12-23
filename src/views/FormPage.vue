<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonPage,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonContent,
} from "@ionic/vue";

import { updloadImages } from "@/services/photoService";
import { notify } from "@/utils/toast";
import { ICardCCCDCreate, ICardCCCDBehind,ICardCCCD } from "@/type/card";
import { useRouter, useRoute } from "vue-router";
import { saveCCCD,updateCCCD } from "@/services/photoService";
import { updateActive } from "@/services/auth";
import { alertController } from "@ionic/vue";
import {getCccd} from "@/services/auth";

const router = useRouter();
const route = useRoute();

const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardCCCDCreate | null>(null);
const dataBehind = ref<ICardCCCDBehind | null>(null);;
const showForm = ref(false);
const userId = ref(0);
const isFront = ref(true);


////////////
const dob = ref("");
const nationality = ref("");
const id = ref("");
const name = ref("");
const gender = ref("");
const expireDate = ref("");
const originPlace = ref("");
const currentPlace = ref("");
const issueDate = ref("");
const type = ref("CCCD");
const user = ref("");
//////////////

const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: true,
      quality: 100,
      saveToGallery: true,
    });

    if (image.path && isFront.value) {
      await uploadPhoto(image);
    } else {
      await uploadPhotoBehind(image);
    }
  } catch (error) {
    notify.error(`${error}`);
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

const loading = ref(false);
const uploadPhoto = async (image: any) => {
  try {
    loading.value = true;
    const fileData = await Filesystem.readFile({
      path: image.path || image.webPath,
    });

    const fileContent = atob(fileData.data as string);
    const byteNumbers = new Uint8Array(
      fileContent.split("").map((char) => char.charCodeAt(0))
    );

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([byteNumbers], { type: image.format }),
      "photo.jpg"
    );

    const response = await updloadImages(formData);

    const result = response.text;
    listData.value = response.text;
    if (response.text && listData.value) {
      dob.value = listData.value.dob;
      nationality.value = listData.value.nationality;
      id.value = listData.value.id;
      name.value = listData.value.name;
      gender.value = listData.value.gender;
      expireDate.value = listData.value.expire_date;
      originPlace.value = listData.value.origin_place;
      currentPlace.value = listData.value.current_place;
    } else {
      notify.error("Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.");
    }
    loading.value = false;
    setTimeout(async () => {
      if (isFront.value) {
        isFront.value = false;
        presentAlertBehind()
      }
    }, 1500);

    return result;
  } catch (error) {
    notify.error(`Lỗi khi tải ảnh: ${error}`);
  }
};
////////////
const uploadPhotoBehind = async (image: any) => {
  try {
    loading.value = true;
    const fileData = await Filesystem.readFile({
      path: image.path || image.webPath,
    });

    const fileContent = atob(fileData.data as string);
    const byteNumbers = new Uint8Array(
      fileContent.split("").map((char) => char.charCodeAt(0))
    );

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([byteNumbers], { type: image.format }),
      "photo.jpg"
    );

    const response = await updloadImages(formData);
    dataBehind.value = response.text;
    if (response.text && dataBehind.value) {
      issueDate.value = dataBehind.value.issue_date;
    } else {
      notify.error("Không thể xác thực thông tin từ ảnh mặt sau. Vui lòng thử lại.");
    }

    setTimeout(() => {
      showForm.value = true;
    }, 1000);
  } catch (error) {
    notify.error(`${error}`);
  } finally {
    loading.value = false;
  }

}
const dataCCCD = ref<ICardCCCD | null>(null);
const getCccdData = async () => {
  try {
    if (userId !== null) {
      const response = await getCccd(userId.value);
      dataCCCD.value = response[0];
    } else {
      notify.error("Failed to get data BHYT");
    }
  } catch (error) {
    notify.error("Failed to get data BHYT");
  }
};

const saveForm = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!dob.value || !name.value || !id.value || !nationality.value) {
      notify.error("Vui lòng điền đầy đủ các trường bắt buộc");
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
      user: userId.value,
    };

    if(localStorage.getItem('is_update') === 'false') {
      await saveCCCD(listData.value);
    setTimeout(async () => {
      await updateActive(name.value, userId.value);
      localStorage.setItem("is_verified", "true");
    }, 2000);
    notify.success("Dữ liệu đã được lưu thành công");
    setTimeout(() => {
      router.push("/tabs");
    }, 1000);
    } else {
      await getCccdData();
      if (dataCCCD.value) {
        await updateCCCD(listData.value, dataCCCD.value.uuid);
        notify.success("Dữ liệu đã được cập nhật thành công");
        localStorage.setItem("is_update", "false");
    setTimeout(() => {
      router.push("/tabs");
    }, 1000);
      } else {
        notify.error("Dữ liệu CCCD không tồn tại.");
      }
    }
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", userId.value);
    notify.error(`Lỗi xảy ra, vui lòng thử lại. ${error}`);
  }
};


//////////////
const isUpdate = !(localStorage.getItem("is_update") === "true");
const presentAlert = async () => {
  const alert = await alertController.create({
    header: isUpdate ? "Xác thực Căn Cước Công Dân" : "Cập nhật Căn Cước Công Dân",
    message: isUpdate ? "Bạn cần xác thực tài khoản bằng CCCD" : "Bạn cần cập nhật thông tin CCCD",
    buttons: [
      {
        text: "Ok",
        handler: () => {
          console.log("Ok button clicked");
          takePhoto();
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          router.push("/auth/login");
        },
      },
    ],
  });

  await alert.present();
};

const presentAlertBehind = async () => {
  const alert = await alertController.create({
    header: isUpdate ? "Xác thực Căn Cước Công Dân" : "Cập nhật Căn Cước Công Dân",
    message: isUpdate ? "Bạn cần chụp mặt sau của CCCD" : "Bạn cần cập nhật thông tin của CCCD",
    buttons: [
      {
        text: "Ok",
        handler: () => {
          console.log("Ok button clicked");
          takePhoto();
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          router.push("/auth/login");
        },
      },
    ],
  });

  await alert.present();
};

onMounted(() => {
  userId.value = Number(route.params.userId);
  presentAlert();
});
</script>

<template>
  <ion-page>
    <!-- Popup Alert -->
    <div class="loader" v-if="loading"></div>
      
    <IonContent v-else>
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
                <IonInput v-model="dob" placeholder="Nhập ngày sinh" clear-input>
                </IonInput>
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
                <IonInput v-model="expireDate" placeholder="Ngày hết hạn" clear-input></IonInput>
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
