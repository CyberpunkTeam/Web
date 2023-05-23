import {isMobile} from "react-device-detect";
import React, {useContext, useState} from "react";
import AppContext from "../../../../utils/AppContext";
import {Message2, People, User} from "iconsax-react";
import {formatDateMessage} from "../../../../utils/dateFormat";
import {readChat} from "../../../../services/firebaseStorage";

export default function ChatsSideBar(params) {
    let context = useContext(AppContext);
    const loading = context.chats === undefined
    const {actualChat, setActualChat} = params
    const [search, setSearch] = useState("")

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }

    const user_image = (data) => {
        if (data.profile_image === "default") {
            return (
                <div className={isMobile ? "chat-photo-mobile" : "member-photo"}>
                    <User color="#FAFAFA" size={isMobile ? "48" : "16"} variant="Bold"/>
                </div>
            )
        } else {
            return <img src={data.profile_image} alt=''
                        className={isMobile ? "chat-user-mobile-image" : "user-sidebar"}/>
        }
    }

    const chatsView = () => {
        if (context.chats === undefined || context.chats === null || context.chats.length === 0) {
            return (
                <div className={isMobile ? "chatNoListMessageMobile" : "chatNoListMessage"}>
                    {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        <Message2 size="32" variant={"Bold"} color="#2E9999"/>}
                    {loading ? null : "Without messages"}
                </div>
            )
        }

        const chat = (chatInfo) => {
            const id = chatInfo[0]
            const data = chatInfo[1]
            const changeChat = async () => {
                if (data.lastMessage && !data.lastMessage.read) {
                    await readChat(context.user, chatInfo)
                }
                setActualChat(chatInfo)
            }

            if (data.userInfo === undefined) {
                return (
                    <div key={id}
                         className={isMobile ? "chatsListObjectContainerMobile" : id === actualChat[0] ? "chatsListObjectContainerSelected" : "chatsListObjectContainer"}
                         onClick={changeChat}>
                        <div className={"chatsListObject"}>
                            <div className={"chatsListObject2"}>
                                <div className={isMobile ? "chat-photo-mobile" : "member-photo"}>
                                    <People color="#FAFAFA" size={isMobile ? "48" : "16"} variant="Bold"/>
                                </div>
                                <div className={isMobile ? "chatsLisNameMobile" : "chatsLisName"}>
                                    {data.teamInfo.displayName}
                                    <div className={isMobile ? "chatsListMessageMobile" : "chatsListMessage"}>
                                        {data.lastMessage !== undefined ? data.lastMessage.userId === context.user.uid ? "You: " : data.lastMessage.displayName + ": " : ""}
                                        {data.lastMessage !== undefined ? data.lastMessage.message.substring(0, 20) : "No messages"}
                                    </div>
                                </div>
                            </div>
                            <div className={isMobile ? "messageListDateMobile" : "messageListDate"}>
                                {data.lastMessage !== undefined ? formatDateMessage(data.date) : "New"}
                            </div>
                            {data.lastMessage && !data.lastMessage.read ? <div className={"chatsUnread"}/> : null}
                        </div>
                    </div>
                )
            }

            return (
                <div key={id}
                     className={isMobile ? "chatsListObjectContainerMobile" : id === actualChat[0] ? "chatsListObjectContainerSelected" : "chatsListObjectContainer"}
                     onClick={changeChat}>
                    <div className={"chatsListObject"}>
                        <div className={"chatsListObject2"}>
                            {user_image(data.userInfo)}
                            <div className={isMobile ? "chatsLisNameMobile" : "chatsLisName"}>
                                {data.userInfo.displayName}
                                <div className={isMobile ? "chatsListMessageMobile" : "chatsListMessage"}>
                                    {data.lastMessage !== undefined ? data.lastMessage.message.substring(0, 20) : ""}
                                </div>
                            </div>
                        </div>
                        <div className={isMobile ? "messageListDateMobile" : "messageListDate"}>
                            {data.lastMessage !== undefined ? formatDateMessage(data.date) : "New"}
                        </div>
                    </div>
                    {data.lastMessage && !data.lastMessage.read ? <div className={"chatsUnread"}/> : null}
                </div>
            )
        }

        return (
            <div className={isMobile ? "chatsListDivMobile" : "chatsListDiv"}>
                <input type={"text"} value={search}
                       className={isMobile ? "chatInputSearchMobile" : "chatSearchInput"}
                       placeholder={"Search"}
                       onChange={setSearchHandler}/>
                {context.chats.map((chatData) => {
                    if (search.length === 0) {
                        if (chatData[1].lastMessage === undefined) {
                            return
                        }
                    }
                    if (chatData[1].userInfo.displayName.toLowerCase().includes(search.toLowerCase())) {
                        return chat(chatData)
                    }
                    return null
                })}
            </div>
        )
    }

    return (
        <div
            className={actualChat.length !== 0 && context.size ? "chatSScrollerReduced" : isMobile ? "chatSScrollerContainerMobile" : context.size ? "chatSScrollerContainerReducedAll" : "chatSScrollerContainer"}>
            {chatsView()}
        </div>
    )
}
