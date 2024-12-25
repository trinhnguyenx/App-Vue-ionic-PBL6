import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const uploadImageToFireBase = async (file: any, namefile: string, idfile: number) => {
  try {
    const storageRef = ref(storage, `images/${idfile}_${namefile}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage: ", error);
  }
};
