import EditProfileModal from "../../components/EditProfileModal";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import NotFound from "../NotFound";
import React from "react";

export default function EditProfile() {
    const navigate = useNavigate()

    const closeModal = () => {
        navigate("/me")
    }

    if (!isMobile) {
        return <NotFound/>
    }

    return (
        <div className="profile-screen-mobile">
            <EditProfileModal closeModal={closeModal}/>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
