import './style.css';
import SideBar from "../../components/SideBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProject} from "../../services/projectService";
import {Edit} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {getProfile} from "../../services/userService";
import Modal from "react-modal";
import PostulationModal from "../../components/PostulationModal";
import {getOwnerTeams} from "../../services/teamService";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [project, setProject] = useState(undefined)
    const [userTeams, setUserTeam] = useState(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(params.id).then((response) => {
            setProject(response)
            if (response.creator.uid !== context.user.uid) {
                console.log(context.user.uid)
                getOwnerTeams(context.user.uid).then((teams) => {
                    console.log(teams)
                    setUserTeam(teams);
                }).catch((error) => {
                    console.log(error)
                });
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        });
    },[params.id, context.user.uid]);

    if (loading) {
        return <Loading/>
    }

    const tech_tag = (technology) => {
        return (
            <div key={technology} className={"tech-tag"}>
                {technology}
            </div>
        )
    }

    const pref_tag = (preference) => {
        return (
            <div key={preference} className={"pref-tag"}>
                {preference}
            </div>
        )
    }

    const cover = () => {
        const editButton = () => {
            if (project.creator.uid === context.user.uid) {
                const edit = () => {
                    navigate(`/projects/${project.pid}/edit`, {state: {project}})
                }

                return (
                    <div className="edit-button" onClick={edit}>
                        <Edit size="24" color="#014751"/>
                    </div>
                )
            } else {
                return (
                    <button className="postulation-button" onClick={() => {
                        setIsOpen(true);
                    }}>
                        Postularse
                    </button>
                )
            }
        }
        const link = project.creator.uid !== context.user.uid ? `/user/${project.creator.uid}` : "/me"

        return (
            <div className="cover-container">
                <div className="project-title-container">
                    <div className="team-name">
                        {project.name}
                    </div>
                    <div className="tags-container">
                        {project.technologies.map((data) => {
                            return (tech_tag(data))
                        })}
                        {project.idioms.map((data) => {
                            return (pref_tag(data))
                        })}
                    </div>
                    <div className="creator" onClick={() => navigate(link)}>
                        {project.creator.name} {project.creator.lastname}
                    </div>
                </div>
                {editButton()}
            </div>
        )
    }

    if (project.pid === undefined) {
        return (
            <NotFound/>
        )
    }

    const information = () => {
        return (
            <div className="project-information-container">
                <div className="project-information-card">
                    Descripción
                    <div className="project-description-card">
                        {project.description}
                    </div>
                </div>
            </div>
        )
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}/>
            </Modal>
        )
    }

    return (
        <div className="team-screen">
            <div className="team-container">
                {cover()}
            </div>
            <div className="project-data-container">
                {information()}
            </div>
            {modal()}
            <SearchBar/>
            <SideBar/>
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
};
