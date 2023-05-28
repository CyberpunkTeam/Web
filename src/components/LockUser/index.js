import './style.css'
import {modalStyle} from "../../styles/commonStyles";
import Modal from "react-modal";
import {isMobile} from "react-device-detect";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function LockUser() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        context.setLocked(false);
        setIsOpen(false);
        if (context.user) {
            localStorage.removeItem("user");
            localStorage.removeItem("auth_token")
            window.location.reload()
            context.setUser(undefined);
            navigate("/")
        }
    }

    useEffect(() => {
        if (context.locked) {
            setIsOpen(true)
        }
    }, [context.locked])


    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
            <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
                <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                    Your user has been blocked by the administrator
                </div>
                <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                    <button className={isMobile ? "save-edit-button-style-red-mobile" : "blocked-button-style-red"}
                            onClick={closeModal}>
                        {context.user ? "Log out" : "Close"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
