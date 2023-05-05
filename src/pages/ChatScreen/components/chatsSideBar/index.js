import {isMobile} from "react-device-detect";
import React, {useContext} from "react";
import AppContext from "../../../../utils/AppContext";
import {Message2, People, User} from "iconsax-react";
import {formatDateMessage} from "../../../../utils/dateFormat";

export default function ChatsSideBar(params) {
    let context = useContext(AppContext);
    const loading = context.chats === undefined
    const {actualChat, setActualChat} = params

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

    const chatsView = () => {
        if (context.chats === undefined || context.chats === null || context.chats.length === 0) {
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

            if (data.userInfo === undefined) {
                return (
                    <div key={id}
                         className={id === actualChat[0] ? "chatsListObjectContainerSelected" : "chatsListObjectContainer"}
                         onClick={changeChat}>
                        <div className={"chatsListObject"}>
                            <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                                <People color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                            </div>
                            <div className={"chatsLisName"}>
                                {data.teamInfo.displayName}
                                <div className={"chatsListMessage"}>
                                    {data.lastMessage !== undefined ? data.lastMessage.userId === context.user.uid ? "You: " : data.lastMessage.displayName + ": " : ""}
                                    {data.lastMessage !== undefined ? data.lastMessage.message.substring(0, 20) : "No messages"}
                                </div>
                            </div>
                            <div className={"messageListDate"}>
                                {data.lastMessage !== undefined ? formatDateMessage(data.date) : "New"}
                            </div>
                        </div>
                    </div>
                )
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
                                {data.lastMessage !== undefined ? data.lastMessage.message.substring(0, 20) : ""}
                            </div>
                        </div>
                        <div className={"messageListDate"}>
                            {data.lastMessage !== undefined ? formatDateMessage(data.date) : "New"}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={"chatsListDiv"}>
                {context.chats.map((chatData) => {
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
