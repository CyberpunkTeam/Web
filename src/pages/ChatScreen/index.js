import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useContext, useState} from "react";
import {isMobile} from "react-device-detect";
import {ArrowCircleRight2, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {formatDateMessage} from "../../utils/dateFormat";
import moment from "moment/moment";

export default function ChatScreen() {
    let context = useContext(AppContext);
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            user: context.user.uid,
            message: "Hola como va?",
            date: '30-04-2023:12:33:29'
        },
        {
            user: "asd",
            message: "Todo bien, vos?",
            date: '30-04-2023:12:35:00'
        },
        {
            user: context.user.uid,
            message: "Bien",
            date: '30-04-2023:13:01:00'
        },
        {
            user: "asd",
            message: "Bueno, que queres?",
            date: '30-04-2023:16:28:00'
        },
    ].reverse())

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

        const messageToAdd = {
            user: context.user.uid,
            message: newMessage,
            date: moment.utc().format('DD-MM-YYYY:hh:mm')
        }

        const messagesList = [...messages]

        messagesList.reverse().push(messageToAdd)
        setMessages(messagesList.reverse())
        setNewMessage("")
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
        return (
            <div className={"chatHeader"}>
                {user_image({profile_image: "default"})}
                <div className={"chatUserNameHeader"}>
                    Header
                </div>
            </div>
        )

    }

    const chatInput = () => {
        return (
            <div className={"chatInputContainer"}>
                <input type={"text"} onKeyUp={submit} value={newMessage} className={"chatInput"} onChange={setMessageHandler}/>
                <ArrowCircleRight2 size={32} variant="Bold" color={'#2E9999'} className={"sendMessage"}
                                   onClick={addMessage}/>
            </div>
        )

    }

    const chat = () => {

        const yourMessages = (message) => {
            return (
                <div className={"messageContainer"}>
                    {message.message}
                    <div className={"messageDate"}>
                        {formatDateMessage(message.date)}
                    </div>
                </div>
            )
        }

        const otherMessages = (message) => {
            return (
                <div className={"messageOtherUserContainer"}>
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
                    if (message.user === context.user.uid) {
                        return yourMessages(message)
                    } else {
                        return otherMessages(message)
                    }
                })}
            </div>
        )

    }

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className={"chatContainer"}>
                <div className={isMobile || context.size ? "chatSScrollerReduced" : "chatSScrollerContainer"}>
                    Chats
                </div>
                <div className={isMobile || context.size ? "chatDivReduced" : "chatDiv"}>
                    {header()}
                    {chat()}
                    {chatInput()}
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )
}
