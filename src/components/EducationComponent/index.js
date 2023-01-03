import './style.css'
import {AddCircle, Teacher} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddEducationModal from "../AddEducationModal";

export default function EducationComponent(params) {

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
    const viewMore = () => {
        return (
            <div className="view-more">
                Ver más (+{params.userData.user.education.length - 1})
            </div>
        )
    }

    const experienceView = () => {
        if (params.userData.user.education.length === 0) {
            return;
        }

        return (
            <div className="data-info">
                {params.userData.user.education[0].title}
                <div className="education-info">
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
                <AddEducationModal closeModal={closeModal}/>
            </Modal>
        )
    }

    if (params.userData.user.education.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className="experience-empty-title">
                    <Teacher size="32" color="#014751" className={"icon"}/>
                    Agregar Título o Certificación
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
                    <Teacher size="32" color="#014751" className={"icon"}/>
                    Títulos y Certificaciones
                </div>
                {experienceView()}
                {params.userData.user.education.length > 1 ? viewMore() : null}
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
