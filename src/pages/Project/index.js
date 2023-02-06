import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProjectPostulations, getProject} from "../../services/projectService";
import {
    AddCircle,
    ArrowCircleDown,
    CloseCircle,
    Edit,
    LogoutCurve,
    People,
    TickCircle,
    Trash,
    User
} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import Modal from "react-modal";
import PostulationModal from "../../components/PostulationModal";
import {getOwnerTeams} from "../../services/teamService";
import PostulationsModal from "../../components/PostulationsModal";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import {isMobile} from "react-device-detect";
import {formatDate} from "../../utils/dateFormat";
import ProjectFinish from "../../components/ProjectFinish";
import {AbandonProjectModal} from "../../components/AbandonProjectModal";
import LeaveProject from "../../components/LeaveProject";
import {CompleteProjectModal} from "../../components/CompleteProjectModal";
import {DeleteProjectModal} from "../../components/DeleteProjectModal";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [project, setProject] = useState(undefined)
    const [logs, setLogs] = useState([])
    const [postulations, setPostulations] = useState([])
    const [userTeams, setUserTeam] = useState(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCancelProject, setIsCancelProject] = useState(false)
    const [isFinishProject, setIsFinishProject] = useState(false)
    const [isDeleteProject, setIsDeleteProject] = useState(false)
    const [tagSelect, setTagSelect] = useState("info")
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        getProject(params.id).then((response) => {
            setProject(response)
            setLogs([...response.activities_record.reverse()])
            if (response.state === "PENDING") {
                if (response.creator.uid !== context.user.uid) {
                    getOwnerTeams(context.user.uid).then((teams) => {
                        setUserTeam(teams);
                        setLoading(false);
                    })
                }
                getProjectPostulations(params.id).then((response) => {
                    setPostulations(response);
                    setLoading(false);
                })
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }, [params.id, context.user.uid, time]);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => setTime(Date.now()), 10000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [loading]);

    if (loading) {
        return <Loading/>
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsFinishProject(false);
        setIsCancelProject(false);
        setIsDeleteProject(false)
        setIsOpen(true);
    }

    const openModalIfCancelProject = () => {
        setIsFinishProject(false);
        setIsDeleteProject(false)
        setIsCancelProject(true);
        setIsOpen(true);
    }

    const openModalIfDeleteProject = () => {
        setIsFinishProject(false);
        setIsCancelProject(false);
        setIsDeleteProject(true)
        setIsOpen(true);
    }

    const openModalIfFinishProject = () => {
        setIsCancelProject(false);
        setIsDeleteProject(false)
        setIsFinishProject(true);
        setIsOpen(true);
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


        if (project.state !== "PENDING") {
            return
        }

        if (userTeams === undefined) {
            return
        }

        if (userTeams.length === 0) {
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
                <People color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Postulate Team
            </button>
        )
    }

    const cancelProject = () => {
        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "PENDING") {
            return
        }

        if (isMobile) {
            return (
                <button className="cancelButtonMobile" onClick={openModalIfDeleteProject}>
                    <CloseCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="cancel-project-button" onClick={openModalIfDeleteProject}>
                <Trash color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Delete Project
            </button>
        )
    }

    const abandonProjectButton = () => {
        if (project.state !== "WIP") {
            return
        }

        if (project.team_assigned.owner !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="cancelButtonMobile" onClick={openModalIfCancelProject}>
                    <LogoutCurve color="#FAFAFA" size={48}/>
                </button>
            )
        }

        return (
            <button className="cancel-project-button" onClick={openModalIfCancelProject}>
                <LogoutCurve color="#FAFAFA" variant="Bulk" size={24} className="icon"/>
                Leave Project
            </button>
        )
    }

    const actionsButton = () => {
        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "WIP") {
            return
        }

        return (
            <div className="dropdown">
                <button className={context.size ? "dropbtnReduced" : "dropbtn"}>
                    {context.size ? "" : "Request"}
                    <ArrowCircleDown className={context.size ? null : "chevron"} color="#FAFAFA" variant="Outline"
                                     size={24}/>
                </button>
                <div className="dropdown-content">
                    <div onClick={openModalIfCancelProject}>
                        <LogoutCurve color="#CD5B45" variant={"Bulk"} size={context.size ? 32 : 24}
                                     className={context.size ? null : "icon"}/>
                        {context.size ? "" : "Abandonment"}
                    </div>
                    <div onClick={openModalIfFinishProject}>
                        <TickCircle color="#014751" variant="Bold" size={context.size ? 32 : 24}
                                    className={context.size ? null : "icon"}/>
                        {context.size ? "" : "Completion"}
                    </div>
                </div>
            </div>
        )

    }

    const owner = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
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
            <div className={context.size ? "members-info-container-reduced" : "members-info-container"}>
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

    const teamAssigned = (data) => {

        if (project.state === "CANCELLED" || project.state === "PENDING") {
            return
        }
        const userNavigate = () => {
            const user_link = '/team/' + data.tid;
            navigate(user_link);
        }

        return (
            <div className="members-info-container">
                <div className="members-info">
                    <div className="member-photo">
                        <People color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                    <div className="member-name" onClick={userNavigate}>
                        {data.name}
                    </div>
                </div>
            </div>
        )
    }

    const cover = () => {
        const editButton = () => {
            if (project.creator.uid === context.user.uid) {

                if (project.state !== "PENDING") {
                    return
                }
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
                    Description
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
                {isCancelProject ? <AbandonProjectModal closeModal={closeModal} project={project}/> :
                    isFinishProject ? <CompleteProjectModal closeModal={closeModal} project={project}/> :
                        isDeleteProject ? <DeleteProjectModal closeModal={closeModal} project={project}/> :
                            <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}/>}
            </Modal>
        )
    }

    const activity = (data) => {
        return (
            <div key={data.description} className={"history"}>
                {data.description}
                <div>
                    {formatDate(data.created_date)}
                </div>
            </div>
        )
    }

    const tagInfo = () => {
        if (tagSelect === "info") {
            return (
                <div className={context.size ? "project-data-container-reduce" : "project-data-container"}>
                    {information()}
                </div>
            )
        } else if (tagSelect === "postulations") {
            return (
                <div className="project-data-container-reduce">
                    <PostulationsModal postulations={postulations} closeModal={closeModal}
                                       changePostulations={changePostulations}/>
                </div>
            )
        } else if (tagSelect === "history") {
            return (
                <div>
                    {logs.map((info) => {
                        return activity(info)
                    })}
                </div>
            )
        }
    }

    const teamsPostulations = () => {
        if (project.creator.uid === context.user.uid && project.state === "PENDING") {
            return (
                <div className={tagSelect === "postulations" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("postulations")
                }}>
                    Postulations
                </div>
            )
        }
    }

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className="team-container">
                <ProjectFinish project={project}/>
                <LeaveProject project={project}/>
                {cover()}
            </div>
            <div className={context.size ? "projectButtonsContainerReduced" : "projectButtonsContainer"}>
                <div className={"projectButtonContainer"}>
                    {owner(project.creator)}
                    {teamAssigned(project.team_assigned)}
                    {postulate()}
                </div>
                <div className={"projectButtonContainer"}>
                    {cancelProject()}
                    {abandonProjectButton()}
                    {actionsButton()}
                </div>
            </div>
            <div className="tagsFilterContainer">
                <div className={tagSelect === "info" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("info")
                }}>
                    Information
                </div>
                <div className={tagSelect === "history" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                    setTagSelect("history")
                }}>
                    History
                </div>
                {teamsPostulations()}
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
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
};
