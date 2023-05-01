import {isMobile} from "react-device-detect";
import React, {useContext, useEffect, useState} from "react";
import {ArrowCircleRight2, User} from "iconsax-react";
import {formatDateMessage} from "../../../../utils/dateFormat";
import {sendMessage} from "../../../../services/firebaseStorage";
import AppContext from "../../../../utils/AppContext";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";

export default function ChatBox(params) {
    const db = getFirestore()
    let context = useContext(AppContext);
    const {actualChat} = params
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getChat = () => {
            const unsub = onSnapshot(doc(db, "chats", actualChat[0]), (doc) => {
                setMessages(doc.data().messages.reverse())
            });
            return () => {
                unsub()
            }
        }
        actualChat.length !== 0 && getChat()

    }, [actualChat])

    const setMessageHandler = (event) => {
        setNewMessage(event.target.value);
    }

    const submit = (event) => {
        if (event.key === "Enter") {
            addMessage();
        }
    }

    const addMessage = () => {
        if (newMessage.length === 0) {
            return
        }
        const lastMessage = newMessage
        setNewMessage("")
        sendMessage(actualChat[0], context.user.uid, actualChat[1].userInfo.uid, newMessage).then((id) => {
        }).catch((e) => {
            console.log(e)
            setNewMessage(lastMessage)
        })
    }

    const user_image = (data) => {
        if (data.profile_image === "default") {
            return (
                <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                    <User color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                </div>
            )
        } else {
            return <img src={data.profile_image} alt=''
                        className={isMobile ? "user-mobile-image" : "user-sidebar"}/>
        }
    }

    const header = () => {
        if (actualChat.length === 0) {
            return
        }

        return (
            <div className={"chatHeader"}>
                {user_image(actualChat[1].userInfo)}
                <div className={"chatUserNameHeader"}>
                    {actualChat[1].userInfo.displayName}
                </div>
            </div>
        )
    }

    const chatInput = () => {
        return (
            <div className={"chatInputContainer"}>
                <input type={"text"} onKeyUp={submit} value={newMessage} className={"chatInput"}
                       placeholder={"Type something..."}
                       onChange={setMessageHandler}/>
                <div className={"chatInputButton"}>
                    <ArrowCircleRight2 size={32} variant="Bold" color={'#2E9999'} className={"sendMessage"}
                                       onClick={addMessage}/>
                </div>
            </div>
        )

    }

    const chat = () => {

        const yourMessages = (message) => {
            return (
                <div key={message.id} className={"messageContainer"}>
                    {message.message}
                    <div className={"messageDate"}>
                        {formatDateMessage(message.date)}
                    </div>
                </div>
            )
        }

        const otherMessages = (message) => {
            return (
                <div key={message.id} className={"messageOtherUserContainer"}>
                    {message.message}
                    <div className={"messageDate"}>
                        {formatDateMessage(message.date)}
                    </div>
                </div>
            )
        }


        return (
            <div className={"chatMessageContainer"}>
                {messages.map((message) => {
                    if (message.senderId === context.user.uid) {
                        return yourMessages(message)
                    } else {
                        return otherMessages(message)
                    }
                })}
            </div>
        )

    }

    if (actualChat.length === 0) {
        return
    }

    return (
        <div className={isMobile || context.size ? "chatDivReduced" : "chatDiv"}>
            {header()}
            {chat()}
            {chatInput()}
        </div>
    )
}
