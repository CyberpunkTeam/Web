import './style.css';
import {Profile2User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import {isMobile} from "react-device-detect";
import {modalStyle} from "../../styles/commonStyles";
import FollowersModal from "../FollowersModal";

export default function FollowersComponent(params) {
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <FollowersModal closeModal={closeModal} userData={params.userData.user}/>
            </Modal>
        )
    }

    if (isMobile) {
        return (
            <div className={"user-info-container-mobile"}>
                <div className="user-info-mobile">
                    <div className="data-title-mobile">
                        <Profile2User size="56" color="#014751" className="icon"/>
                        Social
                    </div>
                    <div className={"socialContainerMobile"}>
                        <div className={"socialFollowingContainer"}>
                            Following
                            <div className={"socialNumberMobile"}>
                                {params.userData.user.following.users.length}
                            </div>
                        </div>
                        <div className={"socialTeamsContainer"}>
                            Teams
                            <div className={"socialNumberMobile"}>
                                {params.userData.user.following.teams.length}
                            </div>
                        </div>
                        <div className={"socialFollowerContainer"}>
                            Followers
                            <div className={"socialNumberMobile"}>
                                {params.userData.user.followers.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={context.size ? "user-info-container-reduce" : "user-info-container"}>
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Profile2User size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                    Social
                </div>
                <div className={"socialContainer"} onClick={openModal}>
                    <div className={"socialFollowingContainer"}>
                        Following
                        <div className={"socialNumber"}>
                            {params.userData.user.following.users.length}
                        </div>
                    </div>
                    <div className={"socialTeamsContainer"}>
                        Teams
                        <div className={"socialNumber"}>
                            {params.userData.user.following.teams.length}
                        </div>
                    </div>
                    <div className={"socialFollowerContainer"}>
                        Followers
                        <div className={"socialNumber"}>
                            {params.userData.user.followers.length}
                        </div>
                    </div>
                </div>
            </div>
            {modal()}
        </div>
    )
}
