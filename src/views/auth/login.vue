<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import { IonPage } from '@ionic/vue';
import { notify } from '@/utils/toast';
import { loginApi } from '@/services/auth';
import { IUser } from '@/type/auth';

const router = useRouter();

const username = ref('');
const password = ref('');
const loginData = ref<IUser>();
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
      loginData.value = await loginApi({
      username: username.value,
      password: password.value,
    });
      if (loginData.value) {
        console.log(loginData.value.id);
      }
    if (loginData.value) {
      localStorage.setItem('token', loginData.value.accessToken);
      localStorage.setItem('name', loginData.value.fullname);
      localStorage.setItem('id', loginData.value.id.toString());
      localStorage.setItem('is_bhyt', loginData.value.is_bhyt.toString());
      localStorage.setItem('is_gplx', loginData.value.is_gplx.toString());
      localStorage.setItem('is_verified', loginData.value.is_verified.toString());
      localStorage.setItem('is_scan', 'true');
        if (loginData.value.is_verified) {
        router.push('/tabs'); 
        } else {
          router.push({ name: 'FormPage', params: { userId: loginData.value.id } });
      }
    } else {
      notify.error("Login failed, please try again.");
    }
  } catch (error) {
    notify.error('Đăng nhập thất bại');
    console.error(error);
  } finally {
    loading.value = false;
  }
};


</script>



<template>
  <ion-page>
    <div class="relative w-full h-screen">
      <img class="absolute z-[-1] top-0 left-0 w-full  zoom" src="@/assets/img/trongdo.jpg" alt="">
      <div class="absolute p-8 z-10 h-[70vh] bottom-0 bg-white w-full left-0 rounded-tl-[36px] rounded-tr-[36px]">
        <div class="relative">
          <p class="text-3xl font-bold text-[#191919]">Đăng nhập VNeID</p>
          <div class="mt-10">
            <div class="flex flex-col gap-2">
              <label for="username">Tài khoản</label>
              <InputGroup class="w-full custom-input">
                <InputGroupAddon class="bg-white">
                  <Icon icon="solar-user-bold-duotone" class="custom-icon-color" />
                </InputGroupAddon>
                <InputText v-model="username" placeholder="Username" class="bg-white text-black" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2 mt-8">
              <label for="username">Mật khẩu</label>
              <InputGroup class="w-full">
                <InputGroupAddon class="bg-white">
                  <Icon icon="solar-lock-keyhole-minimalistic-unlocked-bold-duotone" class="custom-icon-color" />
                </InputGroupAddon>
                <InputText v-model="password" type="password" placeholder="******" class="bg-white text-black" />
              </InputGroup>
            </div>
            <Button :loading="loading" class=" button-login mt-10 h-14 w-full rounded-full" @click="handleLogin" label="Đăng nhập" />
            <p class="text-center mt-5">Chưa có tài khoản?
              <router-link to="/auth/register" class="button-dk">Đăng ký</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<style scoped>
.custom-input {
  background-color: white !important; 
  color: white !important; 
}

.custom-icon-bg {
  background-color: white !important;
  padding: 0.5rem; 
  border-radius: 4px; 
}

.custom-icon-color {
  color: black !important; 
  font-size: 1.2rem;
}
.button-login {
  background-color: #D7344C !important;
  border-color: #D7344C !important;
}
.button-dk {
  color: #D7344C !important;
  font-weight: bold;
}
.zoom {
    transform: scale(1.5);  
    transform-origin: center center;
  }
</style>