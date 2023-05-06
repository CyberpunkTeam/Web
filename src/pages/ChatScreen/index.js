import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useState} from "react";
import {isMobile} from "react-device-detect";
import ChatsSideBar from "./components/chatsSideBar";
import ChatBox from "./components/ChatBox";
import {useLocation} from "react-router-dom";

export default function ChatScreen() {
    const {state} = useLocation();
    const [actualChat, setActualChat] = useState(state === null ? [] : state.actualChat)

    return (
        <div className={isMobile ? actualChat.length !== 0 ? "profile-screen-mobileChatsSelected" : "profile-screen-mobile" : "chat-screen"}>
            <div className={isMobile ? null : "chatContainer"}>
                <ChatsSideBar setActualChat={setActualChat} actualChat={actualChat}/>
                <ChatBox actualChat={actualChat} setActualChat={setActualChat}/>
            </div>
            {isMobile && actualChat.length !== 0 ? null : <SearchBar/>}
            {isMobile && actualChat.length !== 0 ? null : <SideBar/>}
            <AlertMessage/>
        </div>
    )
}
