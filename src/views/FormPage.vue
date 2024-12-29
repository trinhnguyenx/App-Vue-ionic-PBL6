<script setup lang="ts">
import { ref } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
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
  IonContent,
  IonCheckbox,
} from "@ionic/vue";

import { updloadImages } from "@/services/photoService";
import { notify } from "@/utils/toast";
import { ICardCCCDCreate, ICardCCCDBehind, ICardCCCD } from "@/type/card";
import { useRouter, useRoute } from "vue-router";
import { saveCCCD, updateCCCD } from "@/services/photoService";
import { updateActive } from "@/services/auth";
import { alertController } from "@ionic/vue";
import { getCccd } from "@/services/auth";
import { onIonViewWillEnter } from "@ionic/vue";
import { uploadImageToFireBase } from "../services/firebaseService";

const router = useRouter();
const route = useRoute();

const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardCCCDCreate | null>(null);
const dataBehind = ref<ICardCCCDBehind | null>(null);
const showForm = ref(false);
const userId = ref(0);
const isFront = ref(true);
const loading = ref(false);
const isValid = ref<null | boolean>(null);
const idbehind = ref("");
const images = ref("");
const imagesBehind = ref("");
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
const personal_identifi = ref("");
const user = ref("");
//////////////
const isUpdate = !(localStorage.getItem("is_update") === "true");
const handleSpace = (item: string) => {
  return item ? item.replace(/\s/g, "") : "";
};
const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: true,
      quality: 100,
      saveToGallery: true,
      source: CameraSource.Camera,
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
    // firebase
    const filetruoc = new Blob([byteNumbers], { type: image.format });
    images.value =
      (await uploadImageToFireBase(filetruoc, "cccdmattruoc", userId.value)) || "";
    //

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([byteNumbers], { type: image.format }),
      "photo.jpg"
    );

    const response = await updloadImages(formData);
    listData.value = response.text;
    if (response.text && listData.value) {
      dob.value = listData.value.dob || "";
      nationality.value = listData.value.nationality || "";
      id.value = handleSpace(listData.value.id) || "";
      name.value = listData.value.name || "";
      gender.value = listData.value.gender || "";
      expireDate.value = listData.value.expire_date || "";
      originPlace.value = listData.value.origin_place || "";
      currentPlace.value = listData.value.current_place || "";
    } else {
      notify.error("Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.");
      console.error("Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.");
    }
    loading.value = false;
    setTimeout(async () => {
      if (isFront.value) {
        isFront.value = false;
        presentAlertBehind();
      }
    }, 1000);

  } catch (error) {
    notify.error(`Lỗi khi tải ảnh: ${error}`);
    console.error(`Lỗi khi tải ảnh: ${error}`);
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
    // firebase
    const filesau = new Blob([byteNumbers], { type: image.format });
    imagesBehind.value =
      (await uploadImageToFireBase(filesau, "cccdmatsau", userId.value)) || "";
    //
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
      idbehind.value = handleSpace(dataBehind.value.id_);
      personal_identifi.value = dataBehind.value.personal_identifi || "";
      if (listData.value) {
        listData.value.personal_identifi = personal_identifi.value;
      }
      if (isUpdate && id.value !== idbehind.value) {
        notify.error("Số CCCD mặt sau không trùng khớp. Vui lòng thử lại.");
        console.error("Số CCCD mặt sau không trùng khớp. Vui lòng thử lại.");
        setTimeout(() => {
          router.push("/auth/login");
          showForm.value = false;
        }, 1000);
      }
    } else {
      notify.error(
        "Không thể xác thực thông tin từ ảnh mặt sau. Vui lòng thử lại."
      );
      console.error(
        "Không thể xác thực thông tin từ ảnh mặt sau. Vui lòng thử lại."
      );
    }

    setTimeout(() => {
      showForm.value = true;
    }, 1000);
  } catch (error) {
    notify.error(` Lỗi ${error}`);
    console.error(` Lỗi ${error}`);
  } finally {
    loading.value = false;
  }
};
////////////
const handleCheckboxChange = (type: string) => {
  if (type === "correct") {
    isValid.value = true;
  } else if (type === "incorrect") {
    isValid.value = false;
  }
};

////////////
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
    if (isValid.value === null) {
      notify.error("Vui lòng xác nhận thông tin trước khi lưu.");
      return;
    }
    listData.value = {
      dob: dob.value || "",
      nationality: nationality.value || "",
      id: handleSpace(id.value) || "",
      name: name.value || "",
      gender: gender.value || "",
      expire_date: expireDate.value || "",
      type: type.value || "",
      origin_place: originPlace.value || "",
      current_place: currentPlace.value || "",
      issue_date: issueDate.value || "",
      personal_identifi: personal_identifi.value || "",
      is_valid: isValid.value,
      images: images.value || "",
      images_behind: imagesBehind.value || "",
      user: userId.value,
    };

    if (localStorage.getItem("is_update") === "false") {
      await saveCCCD(listData.value);
      setTimeout(async () => {
        await updateActive(name.value, userId.value);
        localStorage.setItem("is_verified", "true");
        localStorage.setItem("dob", dob.value);
      }, 1000);
      notify.success("Dữ liệu đã được lưu thành công");
      setTimeout(() => {
        router.push("/tabs");
      }, 1000);
    } else {
      await getCccdData();
      if (dataCCCD.value) {
        await updateCCCD(listData.value, dataCCCD.value.uuid);
        localStorage.setItem("is_update", "false");
        setTimeout(() => {
          router.push("/tabs");
        }, 1000);
        notify.success("Dữ liệu đã được cập nhật thành công");
        showForm.value = false;
      } else {
        notify.error("Dữ liệu CCCD không tồn tại.");
      }
    }
  } catch (error) {
    console.error(
      "Lỗi khi lưu dữ liệu:",
      userId.value,
      localStorage.getItem("is_update")
    );
    notify.error(`Lỗi xảy ra, vui lòng thử lại. ${error}`);
  }
};

//////////////
const presentAlert = async () => {
  const alert = await alertController.create({
    header: isUpdate
      ? "Xác thực Căn Cước Công Dân"
      : "Cập nhật Căn Cước Công Dân",
    message: isUpdate
      ? "Bạn cần xác thực tài khoản bằng CCCD"
      : "Bạn cần cập nhật thông tin CCCD",
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
    header: isUpdate
      ? "Xác thực Căn Cước Công Dân"
      : "Cập nhật Căn Cước Công Dân",
    message: isUpdate
      ? "Bạn cần chụp mặt sau của CCCD"
      : "Bạn cần cập nhật thông tin mặt sau của CCCD",
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
    cssClass: "custom-alert",
  });

  await alert.present();
};
onIonViewWillEnter(() => {
  showForm.value = false;
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
              <IonCardTitle>Card Information</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList>
                <IonItem lines="full">
                  <IonLabel position="stacked">Full Name</IonLabel>
                  <IonInput v-model="name" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Card Number</IonLabel>
                  <IonInput v-model="id" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Birthday</IonLabel>
                  <IonInput v-model="dob" readonly> </IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Nationality</IonLabel>
                  <IonInput v-model="nationality" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Issued by</IonLabel>
                  <IonInput v-model="originPlace" readonly></IonInput>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="stacked">Current Place</IonLabel>
                  <IonInput v-model="currentPlace" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Gender</IonLabel>
                  <IonInput v-model="gender" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Expire Date</IonLabel>
                  <IonInput v-model="expireDate" readonly></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Issue Date</IonLabel>
                  <IonInput v-model="issueDate" readonly></IonInput>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="stacked"
                    >Identifying Characteristics</IonLabel
                  >
                  <IonInput v-model="personal_identifi" readonly></IonInput>
                </IonItem>

                <IonItem>
                  <IonCheckbox
                    @ionChange="handleCheckboxChange('correct')"
                    :checked="isValid === true"
                    slot="start"
                  />
                  <IonLabel style="font-size: 12px"
                    >Information is correct</IonLabel
                  >
                </IonItem>
                <IonItem>
                  <IonCheckbox
                    @ionChange="handleCheckboxChange('incorrect')"
                    :checked="isValid === false"
                    slot="start"
                  />
                  <IonLabel style="font-size: 12px"
                    >Information is incorrect</IonLabel
                  >
                </IonItem>
                <!-- Submit Button -->
                <IonButton
                  expand="full"
                  class="ion-margin-top"
                  @click="saveForm"
                >
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

ion-card {
  margin: 0;
  border-radius: 10px;
}

ion-input {
  width: 100%;
}

ion-button {
  --background: #d7344c;
  --color: white;
  font-weight: bold;
  border-radius: 15px;
}
ion-label {
  font-weight: bold;
  font-size: 1rem;
}
ion-checkbox {
  --border-color-checked: #f4f4f4;
  --checkbox-background-checked: #ffffff;
  --size: 16px;
  --background: #ffffff;
  --border-color: #ccc;
  --border-width: 2px;
  --checkmark-color: #d7344c;
  margin-right: 8px;
}

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
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }

  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
      0 0.5em rgba(111, 202, 220, 0.75);
  }

  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
      1em 0.5em rgba(111, 202, 220, 0.75);
  }

  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}

@keyframes after6 {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }

  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
      -0.5em 0 rgba(233, 169, 32, 0.75);
  }

  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
      -0.5em 1em rgba(233, 169, 32, 0.75);
  }

  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}

.loader {
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
}
</style>
