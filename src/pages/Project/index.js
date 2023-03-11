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
    ArrowCircleDown, DollarSquare,
    Edit,
    LogoutCurve,
    People,
    TickCircle,
    Trash,
    Document,
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
import {modalStyle} from "../../styles/commonStyles";
import PlatformTag from "../../components/PlatformTag";
import FrameworkTag from "../../components/FrameworkTag";
import BudgetTag from "../../components/BudgetTag";
import {formatter} from "../../utils/budgetFormatter";
import CloudTag from "../../components/CloudTag";

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

    const recommendation = () => {
        console.log("entra")
        navigate("/projects/" + project.pid + "/teamRecommendation")
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

    const filesUploads = (file) => {
        let name = file.split("-file-")[1].split("?")[0].split(".")[1]

        return (
            <a key={file} className="input-image-container" href={file}>
                <Document className="input-docs" size={28} color="#FAFAFA"/>
                .{name === undefined ? "empty" : name}
            </a>
        )
    }

    const imagesUploads = (file) => {
        return (
            <a key={file} className="input-image-container" href={file}>
                <img src={file} alt='' className="input-image"/>
            </a>
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

    const teamRecommendations = () => {
        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "PENDING") {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={recommendation}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="postulate-button" onClick={recommendation}>
                <People color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Team Recommendations
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
                    <Trash color="#FAFAFA" variant="Bold" size={48}/>
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
                        {project.technologies.programming_language.map((data) => {
                            return <TechnologyTag key={data} technology={data}/>
                        })}
                        {project.technologies.frameworks.map((data) => {
                            return <FrameworkTag key={data} framework={data}/>
                        })}
                    </div>
                    <div className="tags-container">
                        {project.technologies.platforms.map((data) => {
                            return <PlatformTag key={data} platform={data}/>
                        })}
                        {project.technologies.databases.map((data) => {
                            return <CloudTag key={data} cloud={data}/>
                        })}
                    </div>
                    <div className="tags-container">
                        {project.idioms.map((data) => {
                            return <PreferenceTag key={data} preference={data}/>
                        })}
                        {project.description.non_function_requirements.map((data) => {
                            return <PreferenceTag key={data} preference={data}/>
                        })}
                    </div>
                </div>
                {editButton()}
            </div>
        )
    }


    const budget = () => {

        return (
            <div
                className={context.size ? "project-information-container-reduce" : "project-information-container-left"}>
                <div className={"information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            <DollarSquare size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                            Budget
                        </div>
                        <div className={"budget-container"}>
                            <BudgetTag budget={formatter.format(project.tentative_budget) + " USD"}/>
                        </div>
                    </div>
                </div>
                <div className={"information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            <Document size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                            Files
                        </div>
                        <div className={"project-files"}>
                            <div className={"input-files"}>
                                {project.description.files_attached.files === undefined ? null : project.description.files_attached.files.map((file) => {
                                    return filesUploads(file)
                                })}
                            </div>
                            <div className={"input-files"}>
                                {project.description.files_attached.images === undefined ? null : project.description.files_attached.images.map((file) => {
                                    return imagesUploads(file)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const information = () => {
        const summary = () => {
            if (project.description.summary.length === 0) {
                return
            }
            return (
                <div className={"information-container-reduce"}>
                    <div className="project-information-card">
                        Summary
                        <div className="project-description-card">
                            {project.description.summary}
                        </div>
                    </div>
                </div>
            )
        }

        const functional = () => {
            if (project.description.functional_requirements.length <= 1) {
                return
            }
            return (
                <div className={"information-container-reduce"}>
                    <div className="project-information-card">
                        Functional Requirements
                        <div className="project-description-card">
                            {project.description.functional_requirements}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={context.size ? "project-information-container-reduce" : "project-information-container"}>
                {summary()}
                {functional()}
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isCancelProject ? <AbandonProjectModal closeModal={closeModal} project={project}/> :
                    isFinishProject ? <CompleteProjectModal closeModal={closeModal} project={project}/> :
                        isDeleteProject ? <DeleteProjectModal closeModal={closeModal} project={project}/> :
                            <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}
                                              budget={project.tentative_budget}/>}
            </Modal>
        )
    }

    const activity = (data) => {
        return (
            <div key={data.description} className={"history"}>
                {data.description}
                <div className={"history-date"}>
                    {formatDate(data.created_date)}
                </div>
            </div>
        )
    }

    const tagInfo = () => {
        if (tagSelect === "info") {
            return (
                <div className={context.size ? "project-data-container-reduce" : "project-data-container"}>
                    {budget()}
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
                <div className={"historyContainer"}>
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
                    {teamRecommendations()}
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
