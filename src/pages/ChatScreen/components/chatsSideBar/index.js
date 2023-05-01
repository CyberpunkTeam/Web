import {isMobile} from "react-device-detect";
import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../../../utils/AppContext";
import {Message2, User} from "iconsax-react";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";

export default function ChatsSideBar(params) {
    const db = getFirestore()
    let context = useContext(AppContext);
    const [chats, setChats] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const {actualChat, setActualChat} = params

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", context.user.uid), (docResponse) => {
                const orderChats = Object.entries(docResponse.data())?.sort((a, b) => b[1].date - a[1].date)
                setChats(orderChats)
                setLoading(false)

            });
            return () => {
                unsub()
            }
        }

        context.user && getChats()

    }, [context.user])

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

    const chatsView = () => {
        if (chats === undefined || chats.length === 0) {
            return (
                <div className={"chatNoListMessage"}>
                    {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        <Message2 size="32" variant={"Bold"} color="#2E9999"/>}
                    {loading ? null : "Without messages"}
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

    return (
        <div className={isMobile || context.size ? "chatSScrollerReduced" : "chatSScrollerContainer"}>
            {chatsView()}
        </div>
    )
}
