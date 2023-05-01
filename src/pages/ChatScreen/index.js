import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useContext, useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {ArrowCircleRight2, Message2, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {formatDateMessage} from "../../utils/dateFormat";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import Loading from "../../components/loading";
import {sendMessage} from "../../services/firebaseStorage";

export default function ChatScreen() {
    let context = useContext(AppContext);
    const db = getFirestore()
    const [chats, setChats] = useState(undefined)
    const [actualChat, setActualChat] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", context.user.uid), (docResponse) => {
                const orderChats = Object.entries(docResponse.data())?.sort((a, b) => b[1].date - a[1].date)
                setChats(orderChats)
                if (orderChats.length !== 0) {
                    setActualChat(orderChats[0])
                    onSnapshot(doc(db, "chats", orderChats[0][0]), (doc2) => {
                        setMessages(doc2.data().messages.reverse())
                    });
                }

            });
            return () => {
                unsub()
            }
        }

        context.user && getChats()

    }, [context.user])

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
        setLoading(true)
        setNewMessage("")
        sendMessage(actualChat[0], context.user.uid, actualChat[1].userInfo.uid, newMessage).then((id) => {
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
            setNewMessage(lastMessage)
        })
    }

    const user_image = (data) => {
        if (data.profile_image === "default") {
            return (<div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                <User color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
            </div>)
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
                    {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        <ArrowCircleRight2 size={32} variant="Bold" color={'#2E9999'} className={"sendMessage"}
                                           onClick={addMessage}/>}
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
                <div key={message.id}  className={"messageOtherUserContainer"}>
                    {message.message}
                    <div className={"messageDate"}>
                        {formatDateMessage(message.date)}
                    </div>
                </div>
            )
        }


        return (<div className={"chatMessageContainer"}>
            {messages.map((message) => {
                if (message.senderId === context.user.uid) {
                    return yourMessages(message)
                } else {
                    return otherMessages(message)
                }
            })}
        </div>)

    }

    const chatsView = () => {
        if (chats === undefined || chats.length === 0) {
            return (
                <div className={"chatNoListMessage"}>
                    <Message2 size="32" variant={"Bold"} color="#2E9999"/>
                    Without messages
                </div>
            )
        }

        const chat = (chatInfo) => {
            const id = chatInfo[0]
            const data = chatInfo[1]
            const changeChat = () => {
                setActualChat(chatInfo)
            }

            return (
                <div key={id}
                     className={id === actualChat[0] ? "chatsListObjectContainerSelected" : "chatsListObjectContainer"}
                     onClick={changeChat}>
                    <div className={"chatsListObject"}>
                        {user_image(data.userInfo)}
                        <div className={"chatsLisName"}>
                            {data.userInfo.displayName}
                            <div className={"chatsListMessage"}>
                                {data.lastMessage !== undefined ? data.lastMessage.message : ""}
                            </div>
                        </div>

                    </div>

                </div>)
        }

        return (
            <div className={"chatsListDiv"}>
                {chats.map((chatData) => {
                    return chat(chatData)
                })}
            </div>
        )
    }

    if (chats === undefined && actualChat.length === 0) {
        return <Loading/>
    }

    return (<div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
        <div className={"chatContainer"}>
            <div className={isMobile || context.size ? "chatSScrollerReduced" : "chatSScrollerContainer"}>
                {chatsView()}
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
    </div>)
}
