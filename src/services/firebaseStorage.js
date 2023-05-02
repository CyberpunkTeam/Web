import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    Timestamp
} from "firebase/firestore"
import * as imageConversion from 'image-conversion';
import {v4 as uuid} from "uuid"

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
    const combinedId = userInfo.uid < otherUserInfo.uid ? userInfo.uid + otherUserInfo.uid : otherUserInfo.uid + userInfo.uid
    const db = getFirestore()
    const res = await getDoc(doc(db, "chats", combinedId))
    if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []})

        await updateDoc(doc(db, "usersChats", userInfo.uid), {
            [combinedId + ".userInfo"]: {
                uid: otherUserInfo.uid,
                displayName: otherUserInfo.name + " " + otherUserInfo.lastname,
                profile_image: otherUserInfo.profile_image
            },
            [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "usersChats", otherUserInfo.uid), {
            [combinedId + ".userInfo"]: {
                uid: userInfo.uid,
                displayName: userInfo.name + " " + userInfo.lastname,
                profile_image: userInfo.profile_image
            },
            [combinedId + ".date"]: serverTimestamp()
        })
    }
    return combinedId
}

export const sendMessage = async (chatId, senderId, receivedUid, text) => {
    const db = getFirestore()
    const combinedId = senderId < receivedUid ? senderId + receivedUid : receivedUid + senderId
    const id = uuid();
    await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
            id: id,
            message: text,
            senderId: senderId,
            date: Timestamp.now(),
        })
    })

    await updateDoc(doc(db, "usersChats", senderId), {
        [combinedId + ".lastMessage"]: {
            message: text,
        },
        [combinedId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "usersChats", receivedUid), {
        [combinedId + ".lastMessage"]: {
            message: text,
        },
        [combinedId + ".date"]: serverTimestamp()
    })

    return id
}
