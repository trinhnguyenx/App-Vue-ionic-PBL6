<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import { IonPage } from '@ionic/vue';
import { notify } from '@/utils/toast';
import { useRouter } from 'vue-router';
import { loginApi } from '@/services/auth';
import { ref } from 'vue';
const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  console.log('Login');
  try {
    loading.value = true;
    const data = await loginApi({
      username: username.value,
      password: password.value
    })
    notify.success('Đăng nhập thành công');
    await new Promise((resolve) => setTimeout(() => {
      router.push('/tabs');
      resolve(true);
    }, 1000));
    localStorage.setItem('token', 'data.accessToken');
  } catch (error) {
    notify.error('Đăng nhập thất bại'); 
  } finally {
    loading.value = false;
  }
};

const loading = ref(false);
</script>
<template>
  <ion-page>
    <div class="relative w-full h-screen">
      <img class="absolute z-[-1] top-0 left-0 w-full" src="@/assets/img/trongdong.jpg" alt="">
      <div class="absolute p-8 z-10 h-[70vh] bottom-0 bg-white w-full left-0 rounded-tl-[36px] rounded-tr-[36px]">
        <div class="relative">
          <p class="text-3xl font-bold text-[#191919]">Đăng nhập</p>
          <div class="mt-10">
            <div class="flex flex-col gap-2">
              <label for="username">Username</label>
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
            <Button :loading="loading" class="mt-10 h-14 w-full rounded-full" @click="handleLogin" label="Đăng nhập" />
            <p class="text-center mt-5">Chưa có tài khoản?
              <router-link to="/auth/register" class=" text-blue-700">Đăng ký</router-link>
            </p>
            <router-link to="/tabs" class="text-center w-full block mt-5 text-blue-700">Tiếp tục với tư cách khách</router-link>
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

</style>