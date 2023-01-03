import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProjectPostulations, getProject} from "../../services/projectService";
import {Edit} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import Modal from "react-modal";
import PostulationModal from "../../components/PostulationModal";
import {getOwnerTeams} from "../../services/teamService";
import PostulationsModal from "../../components/PostulationsModal";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [project, setProject] = useState(undefined)
    const [postulations, setPostulations] = useState([])
    const [userTeams, setUserTeam] = useState(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(params.id).then((response) => {
            setProject(response)
            if (response.creator.uid !== context.user.uid) {
                getOwnerTeams(context.user.uid).then((teams) => {
                    setUserTeam(teams);
                    setLoading(false);
                }).catch((error) => {
                    console.log(error)
                });
            } else {
                getProjectPostulations(params.id).then((response) => {
                    setPostulations(response)
                    setLoading(false);
                })
            }
        }).catch((error) => {
            console.log(error)
        });
    }, [params.id, context.user.uid]);

    const changePostulations = (post) => {
        if(post.length === 0) {
            closeModal()
            setPostulations([])
        } else {
            setPostulations(post)
        }
    }

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

                const postulationsButton = () => {
                    if (postulations.length !== 0) {
                        return (
                            <button className="postulations-button" onClick={() => {
                                setIsOpen(true);
                            }}>
                                Postulaciones
                            </button>
                        )
                    }
                }

                return (
                    <div className="cover-buttons">
                        {postulationsButton()}
                        <div className="project-edit-button" onClick={edit}>
                            <Edit size="24" color="#014751"/>
                        </div>
                    </div>
                )
            } else {
                if (userTeams.length > 0){
                    return (
                        <button className="postulation-button" onClick={() => {
                            setIsOpen(true);
                        }}>
                            Postularse
                        </button>
                    )
                }

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
                {project.creator.uid === context.user.uid ? <PostulationsModal postulations={postulations} closeModal={closeModal} changePostulations={changePostulations}/> :
                    <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}/>}
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
