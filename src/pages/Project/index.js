import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProjectPostulations, getProject} from "../../services/projectService";
import {AddCircle, Edit, People, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import Modal from "react-modal";
import PostulationModal from "../../components/PostulationModal";
import {getOwnerTeams} from "../../services/teamService";
import PostulationsModal from "../../components/PostulationsModal";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import {isMobile} from "react-device-detect";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [project, setProject] = useState(undefined)
    const [postulations, setPostulations] = useState([])
    const [userTeams, setUserTeam] = useState(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tagSelect, setTagSelect] = useState("info")

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

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

    if (loading) {
        return <Loading/>
    }

    if (project.pid === undefined) {
        return (
            <NotFound/>
        )
    }

    const changePostulations = (post) => {
        if (post.length === 0) {
            closeModal()
            setPostulations([])
        } else {
            setPostulations(post)
        }
    }

    const postulate = () => {
        if (project.creator.uid === context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={openModal}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="postulate-button" onClick={openModal}>
                <People color="#FAFAFA" variant="Bold" size={36} className="icon"/>
                Postular Equipo
            </button>
        )
    }

    const owner = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === project.creator.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className="member-photo">
                        <User color="#FAFAFA" size="16px" variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt='' className="user-sidebar"/>
            }
        }

        return (
            <div className="members-info-container">
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name" onClick={userNavigate}>
                        {data.name} {data.lastname}
                        <div className="owner">
                            Owner
                        </div>
                    </div>
                </div>
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
                    <div className="cover-buttons">
                        <div className="project-edit-button" onClick={edit}>
                            <Edit size="24" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container">
                <div className="project-title-container">
                    <div className="team-name">
                        {project.name}
                    </div>
                    <div className="tags-container">
                        {project.technologies.map((data) => {
                            return <TechnologyTag key={data} technology={data}/>
                        })}
                    </div>
                    <div className="tags-container">
                        {project.idioms.map((data) => {
                            return <PreferenceTag key={data} preference={data}/>
                        })}
                    </div>
                </div>
                {editButton()}
            </div>
        )
    }

    const information = () => {
        return (
            <div className={context.size ? "project-information-container-reduce" : "project-information-container"}>
                <div className="project-information-card">
                    Descripción
                    <div className="project-description-card">
                        {project.description}
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {project.creator.uid === context.user.uid ?
                    <PostulationsModal postulations={postulations} closeModal={closeModal}
                                       changePostulations={changePostulations}/> :
                    <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}/>}
            </Modal>
        )
    }

    const tagInfo = () => {
        if (tagSelect === "info") {
            return (
                <div className={context.size ? "project-data-container-reduce" : "project-data-container"}>
                    {information()}
                </div>
            )
        }
    }

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className="team-container">
                {cover()}
            </div>
            <div className="project-buttons-container">
                {owner(project.creator)}
                {postulate()}
            </div>
            <div className="tagsFilterContainer">
                <div className={tagSelect === "info" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("info")
                }}>
                    Información del Proyecto
                </div>
                <div className={tagSelect === "history" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("history")
                }}>
                    Historial
                </div>
                <div className={tagSelect === "postulations" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("postulations")
                }}>
                    Postulaciones
                </div>
            </div>
            {tagInfo()}
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
