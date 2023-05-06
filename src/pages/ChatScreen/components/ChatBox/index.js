import {isMobile} from "react-device-detect";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ArrowCircleRight2, ArrowLeft2, People, User} from "iconsax-react";
import {formatDateMessage} from "../../../../utils/dateFormat";
import {sendMessage, sendTeamMessage} from "../../../../services/firebaseStorage";
import AppContext from "../../../../utils/AppContext";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const Message = ({message, context}) => {
    const ref = useRef()

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

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [])

    return (
        <div ref={ref} key={message.id}
             className={message.senderId !== context.user.uid ? "messagesChatOtherUserContainer" : "messagesChatContainer"}>
            <div
                className={message.displayName === undefined ? null : message.senderId === context.user.uid ? null : "messagesChatImageContainer"}>
                {message.displayName === undefined ? null : message.senderId === context.user.uid ? null : user_image(message)}
            </div>
            <div className={message.senderId === context.user.uid ? "messageContainer" : "messageOtherUserContainer"}>
                <div className={message.senderId !== context.user.uid ? "messageNameOtherUser" : "messageNameUser"}>
                    {message.senderId === context.user.uid ? null : message.displayName}
                </div>
                {message.message}
                <div className={"messageDate"}>
                    {formatDateMessage(message.date)}
                </div>
            </div>
        </div>
    )
}

export default function ChatBox(params) {
    const navigate = useNavigate();
    const db = getFirestore()
    let context = useContext(AppContext);
    const {actualChat, setActualChat} = params
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const getChat = () => {
            const unsub = onSnapshot(doc(db, "chats", actualChat[0]), (doc) => {
                setMessages(doc.data().messages)
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

        if (actualChat[1].userInfo === undefined) {
            sendTeamMessage(actualChat[0], context.user, actualChat[1].teamInfo.members, newMessage).then((id) => {
            }).catch((e) => {
                console.log(e)
                setNewMessage(lastMessage)
            })
        } else {
            sendMessage(actualChat[0], context.user.uid, actualChat[1].userInfo.uid, newMessage).then((id) => {
            }).catch((e) => {
                console.log(e)
                setNewMessage(lastMessage)
            })
        }
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

        const backButton = () => {
            const goBack = () => {
                setActualChat([])
            }

            if (isMobile || context.size) {
                return (
                    <ArrowLeft2 color="#222222" size={isMobile ? "48" : "24"} className={"icon-b"} onClick={goBack}/>
                )
            }
        }

        if (actualChat[1].userInfo === undefined) {
            const goToTeam = () => {
                navigate("/team/" + actualChat[0])
            }

            return (
                <div className={"chatHeader"}>
                    {backButton()}
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <People color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                    </div>
                    <div className={"chatUserNameHeader"} onClick={goToTeam}>
                        {actualChat[1].teamInfo.displayName}
                    </div>
                </div>
            )
        }

        const goToProfile = () => {
            navigate("/user/" + actualChat[1].userInfo.uid)
        }

        return (
            <div className={"chatHeader"}>
                {backButton()}
                {user_image(actualChat[1].userInfo)}
                <div className={"chatUserNameHeader"} onClick={goToProfile}>
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
                <ArrowCircleRight2 size={32} variant="Bold" color={'#2E9999'} className={"sendMessage"}
                                   onClick={addMessage}/>
            </div>
        )

    }

    const chat = () => {

        return (
            <div className={"chatMessageContainer"}>
                {messages.map((message) => {
                    return <Message key={message.id} message={message} context={context}/>
                })}
            </div>
        )

    }


    return (
        <div className={actualChat.length === 0 ? "chatSScrollerReduced" : isMobile || context.size ? "chatDivReduced" : "chatDiv"}>
            {header()}
            {chat()}
            {chatInput()}
        </div>
    )
}
