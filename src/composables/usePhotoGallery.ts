import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const usePhotoGallery = () => {
  const photo = ref<string | null>(null);

  const takePhoto = async () => {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, 
        quality: 100, 
      });
      photo.value = capturedPhoto.webPath ?? null; 
    } catch (error) {
      console.error('Lỗi khi chụp ảnh:', error);
    }
  };

  return {
    photo,
    takePhoto,
  };
};
