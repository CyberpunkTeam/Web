import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import * as imageConversion from 'image-conversion';

export const savePhoto = async (app, file, name) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }
    file = await imageConversion.compressAccurately(file, 2000);
    file = await imageConversion.compress(file, 0.9);

    const storage = getStorage(app);

    const storageRef = ref(storage, `/images/${name}`)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {
        return r
    })
}

export const saveFile = async (app, file, name) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }

    const storage = getStorage(app);

    const storageRef = ref(storage, `/files/${name}`)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {
        return r
    })
}

export const saveArticle = async (app, file, name, user) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }

    const storage = getStorage(app);

    const storageRef = ref(storage, `/articles/${user}/${name}`)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {
        return r
    })
}
