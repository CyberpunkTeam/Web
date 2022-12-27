import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import * as imageConversion from 'image-conversion';

export const savePhoto = async (app, file, name) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }
    file = await imageConversion.compressAccurately(file, 200);
    file = await imageConversion.compress(file, 0.9);

    const storage = getStorage(app);

    const storageRef = ref(storage, `/images/${name}`)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {
        return r
    })
}
