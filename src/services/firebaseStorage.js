import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const savePhoto = async (app, file) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }
    const storage = getStorage(app);

    const storageRef = ref(storage, `/images/${file.name}`)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {return r})
}
