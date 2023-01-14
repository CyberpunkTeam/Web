import {AddCircle, Briefcase, Teacher} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddExperienceModal from "../AddExperienceModal";
import WorkExperienceModal from "../WorkExperienceModal";
import {isMobile} from "react-device-detect";

export default function WorkExperienceComponent(params) {
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
                {params.userData.user.work_experience.length > 1 ? `Ver más (+${params.userData.user.work_experience.length - 1})` : ""}
            </div>
        )
    }

    const experienceView = () => {
        if (params.userData.user.work_experience.length === 0) {
            return;
        }

        return (
            <div className={isMobile ? "data-info-mobile" : "data-info"}>
                {params.userData.user.work_experience[0].position}
                <div className={isMobile ? "education-info-mobile" : "education-info"}>
                    {params.userData.user.work_experience[0].company}
                    <div>
                        {params.userData.user.work_experience[0].start_date.split('-')[0]} - {params.userData.user.work_experience[0].current_job ? params.userData.user.work_experience[0].finish_date.split('-')[0] : "Actual"}
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {viewAll ? <WorkExperienceModal works={params.userData.user.work_experience} closeModal={closeModal}/> :
                    <AddExperienceModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    if (params.userData.user.work_experience.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <div className="user-info-container-mobile">
                    <div className="user-info-mobile">
                        <div className="data-title-mobile">
                            <Briefcase size="56" color="#014751" className={"icon"}/>
                            Agregar Experiencia
                        </div>
                        <div className="button-center">
                            <AddCircle size="80" color="#B1B1B1" onClick={openModal}/>
                        </div>
                    </div>
                    {modal()}
                </div>
            )
        }

        return (
            <div className="experience-empty-container">
                <div className={context.size ? "experience-empty-title-reduce" : "experience-empty-title"}>
                    <Briefcase size="32px" color="#014751" className={context.size ? "icon-reduce" : "icon"}/>
                    Agregar Experiencia
                </div>
                <AddCircle size="28px" color="#B1B1B1" onClick={openModal} className={"icon-button"}/>
                {modal()}
            </div>
        )
    }

    return (
        <div className={isMobile ? "user-info-container-mobile" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null : isMobile ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Briefcase size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Experiencia
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
