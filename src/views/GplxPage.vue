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
import { ICardGPLXCreate, ICardGPLX } from "@/type/card";
import { useRouter } from "vue-router";
import {
  saveGPLX,
  updateActiveGPLX,
  updateGPLX,
} from "@/services/photoService";
import { alertController } from "@ionic/vue";
import { getGplx } from '@/services/auth';
import {uploadImageToFireBase} from "../services/firebaseService";

const router = useRouter();

const photoList = ref([] as any);
const directory = Directory.ExternalStorage;
const rootDir = "DCIM";
const listData = ref<ICardGPLXCreate | null>(null);
const showForm = ref(false);
const isValid = ref(false);
const images = ref("");
const fullname = ref('')

////////////
const name = ref("");
const dob = ref("");
const id = ref("");
const iplace = ref("");
const origin_place = ref("");
const issue_date = ref("");
const expire_date = ref("");
const nationality = ref("");
const level = ref("");
const type = ref("GPL");
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
    images.value = (await uploadImageToFireBase(file, 'gplx', userId)) || '';
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
      dob.value = listData.value.dob || "";
      id.value = handleSpace(listData.value.id) || "";
      iplace.value = listData.value.iplace || "";
      origin_place.value = listData.value.origin_place || "";
      issue_date.value = listData.value.issue_date || "";
      expire_date.value = listData.value.expire_date || "";
      nationality.value = listData.value.nationality || "";
      level.value = listData.value.level || "";
      fullname.value = localStorage.getItem('name') || '';
      if (fullname.value !== name.value) {
        notify.error("Vui lòng cung cấp thẻ chính chủ để xác thực!");
        router.push("/tabs");
      }

    } else {
      notify.error("Không thể xác thực thông tin từ ảnh. Vui lòng thử lại.");
    }
    setTimeout(() => {
      showForm.value = true;
    }, 1000);

    return result;
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw error;
  }
};
const handleSpace = (item: string) => {
    return item.replace(/\s+/g, "")
}

////////////
const handleCheckboxChange = (type: string) => {
  if (type === 'correct') {
    isValid.value = true; 
    console.log(isValid.value);
  } else if (type === 'incorrect') {
    isValid.value = false;
    console.log("2",isValid.value);
  }
};
/////
const gotohome = async () => {
  showForm.value = false;
  router.push("/tabs");
};
const listDataGPLX = ref<ICardGPLX>({} as ICardGPLX);
///
const getGplxData = async () => {
    try {
        if (userId !== null) {
            const response = await getGplx(userId);
            listDataGPLX.value = response[0];
            console.log('userIdNumber', userId);


        }
    } catch (error) {
        notify.error('Failed to get data GPLX');
    }
};
///
const saveForm = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!dob.value || !name.value || !id.value || !nationality.value) {
      notify.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    // Gán dữ liệu vào listData
    listData.value = {
      name: name.value,
      dob: dob.value,
      id: handleSpace(id.value),
      iplace: iplace.value,
      origin_place: origin_place.value,
      issue_date: issue_date.value,
      expire_date: expire_date.value,
      nationality: nationality.value,
      level: level.value,
      type: type.value,
      is_valid: isValid.value,
      images: images.value,
      user: userId,
    };
    if (localStorage.getItem("is_update") === "false") {
      await saveGPLX(listData.value);
      setTimeout(async () => {
        await updateActiveGPLX(userId);
        localStorage.setItem("is_gplx", "true");
      }, 2000);
      notify.success("Dữ liệu đã được lưu thành công");
      showForm.value = false;

      setTimeout(() => {
        router.push("/tabs");
      }, 1000);
    } else {
      await getGplxData();
      if (listDataGPLX.value) {
        if (listDataGPLX.value.uuid) {
          await updateGPLX(listData.value, listDataGPLX.value.uuid);
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

//////////////
const isUpdate = !(localStorage.getItem("is_update") === "true");

const presentAlert = async () => {
  const alert = await alertController.create({
    header: isUpdate ? "Xác thực Giấy Phép Lái Xe": "Cập nhật thông tin GPLX",
    message: isUpdate ? "Bạn cần xác thực tài khoản bằng GPLX": "Bạn cần cập nhật thông tin GPLX",
    buttons: [
      {
        text: "Ok",
        handler: () => {
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
            <IonCardTitle>Thông tin thẻ GPLX</IonCardTitle>
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
                <IonLabel position="stacked">Nationality:</IonLabel>
                <IonInput
                  v-model="nationality"
                  placeholder="Nhập quốc tịch"
                  readonly
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Origin Place:</IonLabel>
                <IonInput v-model="origin_place" readonly></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">IPlace:</IonLabel>
                <IonInput v-model="iplace" readonly></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Level:</IonLabel>
                <IonInput
                  v-model="level"
                  placeholder="Nhập trình độ"
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
ion-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ion-card {
  margin: 0;
  border-radius: 10px;
}

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
