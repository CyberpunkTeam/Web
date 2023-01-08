import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext, useEffect, useState} from "react";
import NotFound from "../NotFound";
import {Edit, User} from "iconsax-react";
import Modal from 'react-modal';
import {useParams} from "react-router-dom";
import {getProfile} from "../../services/userService";
import Loading from "../../components/loading";
import SearchBar from "../../components/SearchBar";
import EditProfileModal from "../../components/EditProfileModal";
import EducationComponent from "../../components/EducationComponent";
import WorkExperienceComponent from "../../components/WorkExperienceComponent";
import UserTeamsComponent from "../../components/UserTeamsComponent";
import UserProjectComponent from "../../components/UserProjectComponent";
import {isMobile} from "react-device-detect";

function ProfileScreen() {
    const params = useParams();
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    const id = params.id ? params.id : context.user.uid

    const [userData, setUserData] = useState({})

    useEffect(() => {
        setLoading(true);
        getProfile(id).then((response) => {
            setUserData(response);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, [id, context]);

    const user_image = () => {
        if (userData.user.profile_image === "default") {
            return (
                <div className={isMobile ? "user-svg-mobile" : "user-svg"}>
                    <User color="#FAFAFA" size="100px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={userData.user.profile_image} alt={'user'}
                        className={isMobile ? "user-svg-mobile" : "user"}/>
        }
    }

    const user_data = () => {
        return (
            <div className="user-data-container">
                <div className={isMobile ? "name-mobile" : "name"}>
                    {id !== context.user.uid ? userData.user.name : context.user.name} {id !== context.user.uid ? userData.user.lastname : context.user.lastname}
                </div>
                <div className={isMobile ? "extra-data-mobile" : "extra-data"}>
                    {id !== context.user.uid ? userData.user.location : context.user.location}
                </div>
                <div className={isMobile ? "extra-data-mobile" : "extra-data"}>
                    {id !== context.user.uid ? userData.user.email : context.user.email}
                </div>
            </div>
        )
    }

    const coverImage = () => {
        if (userData.user.cover_image === "default") {
            return (
                <div className={isMobile ? "cover-user-container-mobile" : "cover-user-container"}/>
            )
        }
        return <img src={userData.user.cover_image} className={isMobile ? "image-container-mobile" : "image-container"}
                    alt=""/>
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <EditProfileModal closeModal={closeModal}/>
            </Modal>
        )
    }

    const cover = () => {

        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="cover-buttons">
                        <div className="edit-button" onClick={openModal}>
                            <Edit size="24" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                </div>
                {coverImage()}
            </div>
        )
    }

    const coverMobile = () => {

        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="cover-buttons">
                        <div className="edit-button-mobile" onClick={openModal}>
                            <Edit size="40" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container-mobile">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                </div>
                {coverImage()}
            </div>
        )
    }

    if (loading) {
        return <Loading/>
    }

    if (context.user === undefined || context.user === null || Object.keys(userData).length === 0) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="profile-screen">
                <div className="profile-container">
                    {isMobile ? coverMobile() : cover()}
                </div>
                <div className={isMobile ? "profile-data-container-mobile" : "profile-data-container"}>
                    <div className={isMobile ? "column-mobile" : "column"}>
                        <UserTeamsComponent userData={userData}/>
                        <UserProjectComponent userData={userData}/>
                        <EducationComponent userData={userData}/>
                        <WorkExperienceComponent userData={userData}/>
                    </div>
                </div>
                {modal()}
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }
}

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        fontFamily: "Inter",
        padding: '0',
        borderWidth: 0,
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
};

export default ProfileScreen;
