<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Button from "primevue/button";
import { IonSearchbar, IonPage } from "@ionic/vue";
import { notify } from "@/utils/toast";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { IUser } from "@/type/auth";
import { registerApi } from "@/services/auth";
const router = useRouter();

const loading = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const registerData = ref<IUser>();

const handleRegister = async () => {
  loading.value = true;
  try {
    if (password.value == confirmPassword.value) {
      registerData.value = await registerApi({
        email: email.value,
        username: username.value,
        password: password.value,
      });
      if (registerData.value) {
        notify.success("Đăng ký thành công");
        router.push("/auth/login");
      }
    } else {
      notify.error("Mật khẩu không khớp");
    }
  } catch (error) {
    notify.error("Đăng kí thất bại");
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <ion-page>
    <div class="relative w-full h-screen">
      <img
        class="absolute z-[-1] top-0 left-0"
        src="@/assets/img/trongdong.jpg"
        alt=""
      />
      <div
        class="absolute p-8 z-10 h-[70vh] bottom-0 bg-white w-full left-0 rounded-tl-[36px] rounded-tr-[36px]"
      >
        <div class="relative">
          <p class="text-3xl font-bold text-[#191919]">Đăng ký</p>
          <div class="mt-10">
            <div class="flex flex-col gap-2">
              <label for="username">Username</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon icon="solar-user-bold-duotone" />
                </InputGroupAddon>
                <InputText v-model="username" placeholder="Username" />
              </InputGroup>
            </div>
            <div class="flex flex-col gap-2">
              <label for="username">Email</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon icon="solar-user-bold-duotone" />
                </InputGroupAddon>
                <InputText v-model="email" placeholder="Example@gmail.com" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2 mt-8">
              <label for="username">Mật khẩu</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon
                    icon="solar-lock-keyhole-minimalistic-unlocked-bold-duotone"
                  />
                </InputGroupAddon>
                <InputText type="password" v-model="password" placeholder="******" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2 mt-8">
              <label for="username">Xác nhận mật khẩu</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon
                    icon="solar-lock-keyhole-minimalistic-unlocked-bold-duotone"
                  />
                </InputGroupAddon>
                <InputText type="password" v-model="confirmPassword" placeholder="******" />
              </InputGroup>
            </div>

            <Button
              @click="handleRegister"
              class="mt-10 h-14 w-full rounded-full"
              label="Đăng ký"
            />
            <p class="text-center mt-5">
              Đã có tài khoản?
              <router-link :to="{ name: 'login' }" class="text-blue-700"
                >Đăng nhập</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </ion-page>
</template>
