<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Camera, CameraResultType } from "@capacitor/camera";
import { onIonViewWillEnter } from "@ionic/vue";

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
import { ICardBHYTCreate, ICardBHYT } from "@/type/card";
import { useRouter } from "vue-router";
import {
  saveBHYT,
  updateActiveBHYT,
  updateBHYT,
} from "@/services/photoService";
import { alertController } from "@ionic/vue";
import { getBhyt } from "@/services/auth";
import {uploadImageToFireBase} from "../services/firebaseService";

const router = useRouter();

const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardBHYTCreate | null>(null);
const showForm = ref(false);
const showerror = ref<string | null>(null);
const isValid = ref(false);
const images = ref("");

////////////
const name = ref("");
const id = ref("");
const dob = ref("");
const gender = ref("");
const iplace = ref("");
const expire_date = ref("");
const ihos = ref("");
const issue_date = ref("");
const type = ref("BHYT");
const user = ref("");
//////////////
const userId: number = parseInt(localStorage.getItem("id") || "0", 10);

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
      fileContent.split("").map((char) => char.charCodeAt(0))
    );
    // firebase
    const file = new Blob([byteNumbers], { type: image.format });
    images.value = (await uploadImageToFireBase(file, 'bhyt', userId)) || '';
    //
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
      name.value = listData.value.name || "";
      id.value = handleSpace(listData.value.id) || "";
      dob.value = listData.value.dob || "";
      gender.value = listData.value.gender || "";
      iplace.value = listData.value.iplace  || "";
      expire_date.value = listData.value.issue_date || "";
      ihos.value = listData.value.ihos || "";
      issue_date.value = listData.value.expire_date || "";
    } else {
      notify.error("Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.");
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
const handleCheckboxChange = (type: string) => {
  if (type === 'correct') {
    isValid.value = true; 
  } else if (type === 'incorrect') {
    isValid.value = false;
  }
};

////////////
const listDataBHYT = ref<ICardBHYT>({} as ICardBHYT);
const getBhytData = async () => {
  try {
    if (userId !== null) {
      const response = await getBhyt(userId);
      listDataBHYT.value = response[0];
      console.log("userIdNumber", userId);
    } else {
      notify.error("Failed to get data CCCD");
    }
  } catch (error) {
    notify.error("Failed to get data CCCD");
  }
};
const handleSpace = (item: string) => {
  return item.replace(/\s+/g, "");
};
const saveForm = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!dob.value || !name.value || !id.value) {
      notify.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    // Gán dữ liệu vào listData
    listData.value = {
      name: name.value,
      id: handleSpace(id.value),
      dob: dob.value,
      gender: gender.value,
      iplace: iplace.value,
      issue_date: issue_date.value,
      expire_date: expire_date.value,
      ihos: ihos.value,
      type: type.value,
      is_valid: isValid.value,
      images: images.value,
      user: userId,
    };
    if (localStorage.getItem("is_update") === "false") {
      await saveBHYT(listData.value);
      setTimeout(async () => {
        await updateActiveBHYT(userId);
        localStorage.setItem("is_bhyt", "true");
      }, 2000);
      notify.success("Dữ liệu đã được lưu thành công");
      setTimeout(() => {
        router.push("/tabs");
      }, 1000);
    } else {
      await getBhytData();
      if (listDataBHYT.value) {
        if (listDataBHYT.value.uuid) {
          await updateBHYT(listData.value, listDataBHYT.value.uuid);
        } else {
          notify.error("UUID is missing, cannot update BHYT");
        }
        notify.success("Dữ liệu đã được cập nhật thành công");
        localStorage.setItem("is_update", "false");
        setTimeout(() => {
          router.push("/tabs");
        }, 1000);
        showForm.value = false;
      }
    }
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error);
    notify.error(`Lỗi xảy ra, vui lòng thử lại. ${error}`);
  }
};

const gotohome = async () => {
  showForm.value = false;
  router.push("/tabs");
};
//////////////
const isUpdate = !(localStorage.getItem("is_update") === "true");
const presentAlert = async () => {
  const alert = await alertController.create({
    header: isUpdate ? "Xác thực Bảo hiểm y tế": "Cập nhật thông tin BHYT",
    message: isUpdate ? "Bạn cần xác thực tài khoản bằng BHYT" : "Bạn cần cập nhật thông tin BHYT",
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
          router.push("/tabs");
        },
      },
    ],
  });

  await alert.present();
};

// onMounted(() => {
//   presentAlert();
// });
onIonViewWillEnter(() => {
  presentAlert();
});

</script>

<template>
  <ion-page>
    <IonContent class="ion-padding" v-if="showForm">
      <IonGrid class="ion-no-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Thông tin thẻ BHYT</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem lines="full">
                <IonLabel position="stacked">Full Name:</IonLabel>
                <IonInput
                  v-model="name"
                  placeholder="Nhập họ và tên"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Card Number:</IonLabel>
                <IonInput
                  v-model="id"
                  placeholder="Nhập số thẻ"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Birthday:</IonLabel>
                <IonInput
                  v-model="dob"
                  placeholder="Nhập ngày sinh"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">IPlace:</IonLabel>
                <IonInput v-model="iplace" readonly></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Hospital:</IonLabel>
                <IonInput
                  v-model="ihos"
                  placeholder="Nhập tên bệnh viện"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Expire Date:</IonLabel>
                <IonInput
                  v-model="expire_date"
                  placeholder="Ngày hết hạn"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Issue Date:</IonLabel>
                <IonInput
                  v-model="issue_date"
                  placeholder="Ngày cấp"
                  readonly
                ></IonInput>
              </IonItem>
              <IonItem>
                  <IonCheckbox @ionChange="handleCheckboxChange('correct')"  slot="start" />
                  <IonLabel style="font-size: 12px;">Information is correct</IonLabel>
                </IonItem>
                <IonItem>
                  <IonCheckbox @ionChange="handleCheckboxChange('incorrect')" slot="start" />
                  <IonLabel style="font-size: 12px;" >Information is incorrect</IonLabel>
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

ion-button {
  --background: #D7344C;
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
  --checkmark-color: #D7344C;
  margin-right: 8px;
}
</style>
