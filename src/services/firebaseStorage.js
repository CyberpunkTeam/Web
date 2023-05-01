import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getFirestore, setDoc, doc, getDoc, updateDoc, serverTimestamp} from "firebase/firestore"
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

export const saveArticle = async (app, file, name, user, team) => {
    if (!file) {
        alert("Please choose a file first!")
        return;
    }

    const storage = getStorage(app);

    const refName = team !== user ? `/articles/teams/${team}/${name}` : `/articles/users/${user}/${name}`

    const storageRef = ref(storage, refName)
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef).then((r) => {
        return r
    })
}

export const createUserChat = async (uid) => {
    const db = getFirestore()
    const res = await getDoc(doc(db, "usersChats", uid))
    if (!res.exists()) {
        await setDoc(doc(db, "usersChats", uid), {})
    }
}

export const createChat = async (userInfo, otherUserInfo) => {

    console.log(userInfo, otherUserInfo)

    const combinedId = userInfo.uid < otherUserInfo.uid ? userInfo.uid + otherUserInfo.uid : otherUserInfo.uid + userInfo.uid
    const db = getFirestore()
    const res = await getDoc(doc(db, "chats", combinedId))
    if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []})

        await updateDoc(doc(db, "usersChats", userInfo.uid), {
            [combinedId + ".userInfo"]: {
                uid: otherUserInfo.uid,
                displayName: otherUserInfo.name + " " + otherUserInfo.lastname,
                photoUrl: otherUserInfo.profile_image
            },
            [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "usersChats", otherUserInfo.uid), {
            [combinedId + ".userInfo"]: {
                uid: userInfo.uid,
                displayName: userInfo.name + " " + userInfo.lastname,
                photoUrl: userInfo.profile_image
            },
            [combinedId + ".date"]: serverTimestamp()
        })
    }
}
