import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useState} from "react";
import {isMobile} from "react-device-detect";
import ChatsSideBar from "./components/chatsSideBar";
import ChatBox from "./components/ChatBox";

export default function ChatScreen() {
    const [actualChat, setActualChat] = useState([])

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className={"chatContainer"}>
                <ChatsSideBar setActualChat={setActualChat} actualChat={actualChat}/>
                <ChatBox actualChat={actualChat}/>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )
}
