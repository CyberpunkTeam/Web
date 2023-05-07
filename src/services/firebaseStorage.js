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

export const createTeamChat = async (team) => {
    const db = getFirestore()
    const res = await getDoc(doc(db, "chats", team.tid))
    if (!res.exists()) {
        await setDoc(doc(db, "chats", team.tid), {messages: []})
        let memberFormat = []

        for (const member of team.members) {
            memberFormat.push({
                uid: member.uid,
                name: member.name,
                lastname: member.lastname,
                profile_image: member.profile_image
            })
        }


        for (const member of team.members) {
            await updateDoc(doc(db, "usersChats", member.uid), {
                [team.tid + ".teamInfo"]: {
                    tid: team.tid,
                    displayName: team.name,
                    members: memberFormat
                },
                [team.tid + ".date"]: serverTimestamp()
            })
        }
    }
    return team.tid
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
            read: false,
        },
        [combinedId + ".date"]: serverTimestamp()
    })

    return id
}

export const sendTeamMessage = async (chatId, userInfo, members, text) => {
    const db = getFirestore()
    const id = uuid();
    await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
            id: id,
            message: text,
            senderId: userInfo.uid,
            displayName: userInfo.name + " " + userInfo.lastname,
            profile_image: userInfo.profile_image,
            date: Timestamp.now(),
        })
    })

    for (const member of members) {
        await updateDoc(doc(db, "usersChats", member.uid), {
            [chatId + ".lastMessage"]: {
                displayName: userInfo.name + " " + userInfo.lastname,
                userId: userInfo.uid,
                message: text,
                read: userInfo.uid === member.uid,
            },
            [chatId + ".date"]: serverTimestamp()
        })
    }

    return id
}

export const addMemberOnTeamChat = async (team, newMember) => {
    const db = getFirestore()
    const res = await getDoc(doc(db, "chats", team.tid))
    const messages = res.data().messages
    const lastMessage = messages[messages.length - 1]
    let newMembers = [...team.members]
    newMembers.push(newMember)

    let memberFormat = []

    for (const member of newMembers) {
        memberFormat.push({
            uid: member.uid,
            name: member.name,
            lastname: member.lastname,
            profile_image: member.profile_image
        })
    }

    for (const member of newMembers) {
        await updateDoc(doc(db, "usersChats", member.uid), {
            [team.tid + ".teamInfo"]: {
                tid: team.tid,
                displayName: team.name,
                members: memberFormat
            },
            [team.tid + ".date"]: serverTimestamp()
        })
    }

    await updateDoc(doc(db, "usersChats", newMember.uid), {
        [team.tid + ".lastMessage"]: {
            displayName: lastMessage.displayName,
            userId: lastMessage.userId,
            message: lastMessage.text,
            read: false,
        },
        [team.tid + ".date"]: serverTimestamp()
    })

    return team.tid
}

export const readChat = async (user, lastMessage) => {
    const db = getFirestore()

    console.log(lastMessage[0], lastMessage[1])

    if (lastMessage[1].teamInfo) {
        await updateDoc(doc(db, "usersChats", user.uid), {
            [lastMessage[0] + ".lastMessage"]: {
                displayName: lastMessage[1].lastMessage.displayName,
                userId: lastMessage[1].lastMessage.userId,
                message: lastMessage[1].lastMessage.message,
                read: true,
            }
        })
    } else {
        await updateDoc(doc(db, "usersChats", user.uid), {
            [lastMessage[0] + ".lastMessage"]: {
                message: lastMessage[1].lastMessage.message,
                read: true,
            }
        })
    }
}
