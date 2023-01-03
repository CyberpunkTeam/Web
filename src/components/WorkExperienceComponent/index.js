import {AddCircle, Briefcase} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddExperienceModal from "../AddExperienceModal";
import WorkExperienceModal from "../WorkExperienceModal";

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
            <div className="view-more" onClick={openViewAll}>
                Ver más (+{params.userData.user.work_experience.length - 1})
            </div>
        )
    }

    const experienceView = () => {
        if (params.userData.user.work_experience.length === 0) {
            return;
        }

        return (
            <div className="data-info">
                {params.userData.user.work_experience[0].position}
                <div className="education-info">
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
                {viewAll ? <WorkExperienceModal works={params.userData.user.work_experience}/> :
                    <AddExperienceModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    if (params.userData.user.work_experience.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className="experience-empty-title">
                    <Briefcase size="32" color="#014751" className={"icon"}/>
                    Agregar Experiencia
                </div>
                <AddCircle size="24" color="#B1B1B1" onClick={openModal}/>
                {modal()}
            </div>
        )
    }

    return (
        <div className="user-info-container">
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className="user-info">
                <div className="data-title">
                    <Briefcase size="32" color="#014751" className={"icon"}/>
                    Experiencia
                </div>
                {experienceView()}
                {params.userData.user.work_experience.length > 1 ? viewMore() : null}
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
