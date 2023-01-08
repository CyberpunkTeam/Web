import {AddCircle, LampCharge} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import ProjectsModal from "../ProjectsModal";
import {isMobile} from "react-device-detect";

export default function UserProjectComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
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

    const createProject = () => {
        navigate("/projects/new")
    }
    const viewMore = () => {
        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={openModal}>
                {params.userData.projects.length > 1 ? `Ver más (+${params.userData.projects.length - 1})` : ""}
            </div>
        )
    }

    const projectView = () => {
        if (params.userData.projects.length === 0) {
            return;
        }

        const projects_link = "/projects/" + params.userData.projects[0].pid;

        return (
            <div className={isMobile ? "data-info-mobile" : "data-info"}>
                <Link to={projects_link} className={isMobile ? "team-link-mobile" : "team-link"}>
                    {params.userData.projects[0].name}
                </Link>
                <div className="tags-project">
                    {params.userData.projects[0].technologies.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                    {params.userData.projects[0].idioms.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <ProjectsModal projects={params.userData.projects} closeModal={closeModal}/>
            </Modal>
        )
    }

    if (params.userData.projects.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className={isMobile ? "experience-empty-title-mobile" : "experience-empty-title"}>
                    <LampCharge size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Crear Proyecto
                </div>
                <AddCircle size={isMobile ? "56" : "24"} color="#B1B1B1" onClick={createProject}/>
                {modal()}
            </div>
        )
    }

    return (
        <div className={isMobile ? "user-info-container-mobile" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size={isMobile ? "56" : "24"} color="#B1B1B1" className="add-button" onClick={createProject}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <LampCharge size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Proyectos
                </div>
                {projectView()}
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
