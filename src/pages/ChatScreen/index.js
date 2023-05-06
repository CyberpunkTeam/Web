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
        <div className={isMobile ? "profile-screen-mobile" : "chat-screen"}>
            <div className={"chatContainer"}>
                <ChatsSideBar setActualChat={setActualChat} actualChat={actualChat}/>
                <ChatBox actualChat={actualChat} setActualChat={setActualChat}/>
            </div>
            <SearchBar/>
            {isMobile && state === null ? null : <SideBar/>}
            <AlertMessage/>
        </div>
    )
}
