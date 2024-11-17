<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import { IonSearchbar, IonPage } from '@ionic/vue';
import { notify } from '@/utils/toast';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useIonRouter } from '@ionic/vue';
const ionRouter = useIonRouter();
const handleRegister = async () => {
  console.log('Login');
  notify.success('Đăng nhập thành công');
  ionRouter.push({name: 'tabs'});
  // await new Promise((resolve) => setTimeout(() => {
  //   resolve(true);
  // }, 1000));
};
</script>
<template>
  <ion-page>
    <div class="relative w-full h-screen">
      <img class="absolute z-[-1] top-0 left-0"
        src="@/assets/img/trongdong.jpg"
        alt="">
      <div class="absolute p-8 z-10 h-[70vh] bottom-0 bg-white w-full left-0 rounded-tl-[36px] rounded-tr-[36px]">
        <div class="relative">
          <p class="-top-32 left-0 z-10 absolute font-semibold text-white text-2xl w-[80%]">Thưởng thức chuyến đi của
            bạn</p>
          <p class="text-3xl font-bold text-[#191919]">Đăng ký</p>
          <div class="mt-10">
            <div class="flex flex-col gap-2">
              <label for="username">Email</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon icon="solar-user-bold-duotone" />
                </InputGroupAddon>
                <InputText placeholder="Example@gmail.com" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2 mt-8">
              <label for="username">Mật khẩu</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon icon="solar-lock-keyhole-minimalistic-unlocked-bold-duotone" />
                </InputGroupAddon>
                <InputText placeholder="******" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2 mt-8">
              <label for="username">Xác nhận mật khẩu</label>
              <InputGroup class="w-full">
                <InputGroupAddon>
                  <Icon icon="solar-lock-keyhole-minimalistic-unlocked-bold-duotone" />
                </InputGroupAddon>
                <InputText placeholder="******" />
              </InputGroup>
            </div>
            
            <Button @click="handleRegister" class="mt-10 h-14 w-full rounded-full" label="Đăng ký" />
            <p class="text-center mt-5">Đã có tài khoản?
              <router-link :to="{name: 'login'}" class=" text-blue-700">Đăng nhập</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </ion-page>
</template>
