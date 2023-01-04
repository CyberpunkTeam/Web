import {AddCircle, LampCharge, People, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import TeamModal from "../TeamModal";
import TeamsModal from "../TeamsModal";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import ProjectsModal from "../ProjectsModal";

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
            <div className="view-more" onClick={openModal}>
                Ver más (+{params.userData.projects.length - 1})
            </div>
        )
    }

    const teamView = () => {
        if (params.userData.projects.length === 0) {
            return;
        }

        const projects_link = "/projects/" + params.userData.projects[0].pid;

        return (
            <div className="data-info">
                <Link to={projects_link} className="team-link">
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
                <ProjectsModal projects={params.userData.projects}/>
            </Modal>
        )
    }

    if (params.userData.projects.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className="experience-empty-title">
                    <LampCharge size="32" color="#014751" className={"icon"}/>
                    Crear Proyecto
                </div>
                <AddCircle size="24" color="#B1B1B1" onClick={createProject}/>
                {modal()}
            </div>
        )
    }

    return (
        <div className="user-info-container">
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={createProject}/>}
            <div className="user-info">
                <div className="data-title">
                    <LampCharge size="32" color="#014751" className={"icon"}/>
                    Proyectos
                </div>
                {teamView()}
                {params.userData.projects.length > 1 ? viewMore() : null}
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
