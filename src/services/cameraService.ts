import { Camera, CameraResultType } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { notify } from "@/utils/toast";
import { updloadImages } from "@/services/photoService";
import { ICard } from "@/type/card";


const directory = Directory.ExternalStorage;
const rootDir = "DCIM";

export const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: true,
      quality: 100,
      saveToGallery: true,
    });
    return image;
  } catch (error) {
    notify.error(`${error}`);
    console.error(error);
    throw error;
  }
};

export const readPhoto = async (fileName: string) => {
  const file = await Filesystem.readFile({
    path: `${rootDir}/${fileName}`,
    directory: directory,
  });
  return `data:image/jpeg;base64,${file.data}`;
};

export const uploadPhoto = async (image: any) => {
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
 
      return result;
    } catch (error) {
      throw error;
    }
  };