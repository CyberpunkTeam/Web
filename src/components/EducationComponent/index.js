import './style.css'
import {AddCircle, Teacher} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddEducationModal from "../AddEducationModal";
import UserEducationsModal from "../UserEducationsModal";
import {isMobile} from "react-device-detect";

export default function EducationComponent(params) {

    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const closeModal = () => {
        setViewAll(false);
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const openViewAll = () => {
        setViewAll(true)
        setIsOpen(true)
    }
    const viewMore = () => {
        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={openViewAll}>
                {params.userData.user.education.length > 1 ? `Ver más (+${params.userData.user.education.length - 1})` : ""}
            </div>
        )
    }

    const experienceView = () => {
        if (params.userData.user.education.length === 0) {
            return;
        }

        return (
            <div className={isMobile ? "data-info-mobile" : "data-info"}>
                {params.userData.user.education[0].title}
                <div className={isMobile ? "education-info-mobile" : "education-info"}>
                    {params.userData.user.education[0].institution}
                    <div>
                        {params.userData.user.education[0].start_date.split('-')[0]} - {params.userData.user.education[0].finished ? params.userData.user.education[0].finish_date.split('-')[0] : "Actual"}
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {viewAll ? <UserEducationsModal educations={params.userData.user.education} closeModal={closeModal}/> : <AddEducationModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    if (params.userData.user.education.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className={isMobile ? "experience-empty-title-mobile" : "experience-empty-title"}>
                    <Teacher size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Agregar Título o Certificación
                </div>
                <AddCircle size={isMobile ? "56" : "24"} color="#B1B1B1" onClick={openModal}/>
                {modal()}
            </div>
        )
    }

    return (
        <div className={isMobile ? "user-info-container-mobile" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size={isMobile ? "56" : "24"} color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Teacher size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Títulos y Certificaciones
                </div>
                {experienceView()}
                {viewMore()}
            </div>
            {modal()}
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
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
}
