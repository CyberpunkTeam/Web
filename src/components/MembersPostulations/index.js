import {UserCirlceAdd} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import {isMobile} from "react-device-detect";
import NewMemberVacant from "../NewMemberVacant";

export default function MembersPostulations(params) {
    let context = useContext(AppContext);

    const [modalIsOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }


    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <NewMemberVacant closeModal={closeModal} tid={params.tid}/>
            </Modal>
        )
    }

    const addButton = () => {
        if (params.owner !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={openModal}>
                    <UserCirlceAdd color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="createTeamButton" onClick={openModal}>
                <UserCirlceAdd color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                Create Vacant
            </button>
        )
    }

    return (
        <div className="profile-data-container-mobile">
            <div className={"user-team-container"}>
                {addButton()}
                {modal()}
            </div>
        </div>
    )
}

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        fontFamily: "Inter",
        padding: '0',
        borderWidth: 0,
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
}
