import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import React, {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {
    getProjectPostulations,
    getProject,
    getProjectTeamRecommendations,
    getTemporallyTeamRecommendations
} from "../../services/projectService";
import {
    AddCircle,
    ArrowCircleDown, DollarSquare,
    Edit,
    LogoutCurve,
    People,
    TickCircle,
    Trash,
    Document,
    User,
    Share
} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import Modal from "react-modal";
import PostulationModal from "../../components/PostulationModal";
import {getMyTeams, getOwnerTeams, getTeamTemporal} from "../../services/teamService";
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
import AlertMessage from "../../components/AlertMessage";
import TemporalTeamPostulate from "../../components/TemporalTeamPostulate";
import {RecommendProjectModal} from "../../components/RecommendProjectModal";
import BlockTag from "../../components/BlockTag";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [project, setProject] = useState(undefined)
    const [logs, setLogs] = useState([])
    const [postulations, setPostulations] = useState(undefined)
    const [userTeams, setUserTeam] = useState(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [temporal, setTemporal] = useState(undefined);
    const [isCancelProject, setIsCancelProject] = useState(false)
    const [isFinishProject, setIsFinishProject] = useState(false)
    const [isDeleteProject, setIsDeleteProject] = useState(false)
    const [tagSelect, setTagSelect] = useState("info")
    const [time, setTime] = useState(Date.now());

    const [modalRecommend, setModalRecommend] = useState(false);
    const [allTeams, setAllTeams] = useState(undefined);

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    useEffect(() => {
        getProject(params.id, context).then((response) => {
            if (response === undefined) {
                setError("An error has occurred while loading project's information. Please, try again later");
                return
            }
            if (response.detail === "User is blocked") {
                return;
            }
            setProject(response)
            setLogs([...response.activities_record.reverse()])
            if (response.state === "PENDING") {
                if (response.creator.uid !== context.user.uid) {
                    getOwnerTeams(context.user.uid, context).then((teams) => {
                        if (teams === undefined) {
                            setError("An error has occurred while loading user's teams. Please, try again later");
                        } else {
                            let activeTeams = []
                            teams.forEach((team) => {
                                if (team.state === "ACTIVE") {
                                    activeTeams.push(team)
                                }
                            })
                            setUserTeam(activeTeams);
                        }
                    })
                }
                getMyTeams(context.user.uid, context).then((teams) => {
                    if (teams === undefined) {
                        setError("An error has occurred while loading user's teams. Please, try again later");
                    } else {
                        let t = []
                        teams.forEach((team) => {
                            if (!team.temporal && team.owner !== context.user.uid && team.state === "ACTIVE") {
                                t.push(team)
                            }
                        })
                        setAllTeams(t);
                    }
                })
                getTemporallyTeamRecommendations(response, context).then((r) => {
                    if (r === undefined) {
                        setError("An error has occurred while loading temporally team. Please, try again later");
                    } else {
                        if (r.length === 0) {
                            getTeamTemporal(response.pid, context).then((temporalTeamResponse) => {
                                setTemporal(temporalTeamResponse)
                            })
                        } else {
                            setTemporal(r)
                        }
                    }
                })
                getProjectTeamRecommendations(response, context).then((r) => {
                    if (r === undefined) {
                        setError("An error has occurred while loading recommended teams. Please, try again later");
                    } else {
                        setRecommendations(r)
                    }
                })
                getProjectPostulations(params.id, context).then((postulationResponse) => {
                    if (postulationResponse === undefined) {
                        setError("An error has occurred while loading team's postulations. Please, try again later");
                    } else {
                        setPostulations(postulationResponse);
                    }
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
        setModalRecommend(false);
        setIsFinishProject(false);
        setIsCancelProject(false);
        setIsDeleteProject(false)
        setIsOpen(true);
    }

    const recommendationButton = () => {
        navigate("/projects/" + project.pid + "/teamRecommendation", {
            state: {
                teams: recommendations,
                project: project.pid,
                temporal: temporal,
                again: true
            }
        })
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
            <a key={file} className={isMobile ? "input-image-container-mobile" : "input-image-container"} href={file}>
                <Document className="input-docs" size={isMobile ? 46 : 28} color="#FAFAFA"/>
                .{name === undefined ? "empty" : name}
            </a>
        )
    }

    const imagesUploads = (file) => {
        return (
            <a key={file} className={isMobile ? "input-image-container-mobile" : "input-image-container"} href={file}>
                <img src={file} alt='' className={isMobile ? "input-image-mobile" : "input-image"}/>
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
        if (project.internal_state === "BLOCKED") {
            return null;
        }

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
        const postulateButton = () => {
            navigate("postulate", {
                state: {
                    pid: project.pid,
                    teams: userTeams,
                    budget: project.tentative_budget
                }
            })
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={postulateButton}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "postulate-button-reduced" : "postulate-button"} onClick={openModal}>
                <People color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Postulate Team"}
            </button>
        )
    }

    const teamRecommendations = () => {
        if (project.internal_state === "BLOCKED") {
            return null;
        }

        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "PENDING") {
            return
        }

        if (recommendations === undefined) {
            return
        }

        if (temporal === undefined) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={recommendationButton}>
                    <People color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "postulate-button-reduced" : "postulate-button"}
                    onClick={recommendationButton}>
                <People color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Team Recommendations"}
            </button>
        )
    }

    const cancelProject = () => {
        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "PENDING" || project.internal_state === "BLOCKED") {
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
            <button className={context.size ? "cancel-project-button-reduced" : "cancel-project-button"}
                    onClick={openModalIfDeleteProject}>
                <Trash color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Delete Project"}
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
            <button className={context.size ? "cancel-project-button-reduced" : "cancel-project-button"}
                    onClick={openModalIfCancelProject}>
                <LogoutCurve color="#FAFAFA" variant="Bulk" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Leave Project"}
            </button>
        )
    }

    const actionsButton = () => {
        if (project.internal_state === "BLOCKED") {
            return null;
        }

        if (project.creator.uid !== context.user.uid) {
            return
        }

        if (project.state !== "WIP") {
            return
        }

        return (
            <div className={"dropdown"}>
                <button className={isMobile ? "dropbtnMobile" : context.size ? "dropbtnReduced" : "dropbtn"}>
                    {isMobile || context.size ? "" : "Request"}
                    <ArrowCircleDown className={isMobile || context.size ? null : "chevron"} color="#FAFAFA"
                                     variant="Outline"
                                     size={isMobile ? 64 : 24}/>
                </button>
                <div className={isMobile ? "dropdown-content-mobile" : "dropdown-content"}>
                    <div onClick={openModalIfCancelProject}>
                        <LogoutCurve color="#CD5B45" variant={"Bulk"} size={isMobile ? 80 : context.size ? 32 : 24}
                                     className={isMobile || context.size ? null : "icon"}/>
                        {isMobile || context.size ? "" : "Abandonment"}
                    </div>
                    <div onClick={openModalIfFinishProject}>
                        <TickCircle color="#014751" variant="Bold" size={isMobile ? 80 : context.size ? 32 : 24}
                                    className={isMobile || context.size ? null : "icon"}/>
                        {isMobile || context.size ? "" : "Completion"}
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
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <User color="#FAFAFA" size={isMobile ? 40 : 16} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt=''
                            className={isMobile ? "user-mobile-image" : "user-sidebar"}/>
            }
        }

        return (
            <div
                className={isMobile ? "members-info-container-mobile" : context.size ? "members-info-container-reduced" : "members-info-container"} onClick={userNavigate}>
                <div className={isMobile ? "members-info-mobile" : "members-info"}>
                    {user_image(data)}
                    <div className={isMobile ? "member-name-mobile" : "member-name"}>
                        {data.name} {data.lastname}
                        <div className={isMobile ? "owner-mobile" : "owner"}>
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
            <div
                className={isMobile ? "members-info-container-mobile" : context.size ? "members-info-container-reduced" : "members-info-container"} onClick={userNavigate}>
                <div className={isMobile ? "members-info-mobile" : "members-info"}>
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <People color="#FAFAFA" size={isMobile ? 32 : 24} variant="Bold"/>
                    </div>
                    <div className={isMobile ? "member-name-mobile" : "member-name"}>
                        {data.name}
                    </div>
                </div>
            </div>
        )
    }

    const cover = () => {
        const editButton = () => {
            if (project.state !== "PENDING") {
                return
            }

            if (project.internal_state === "BLOCKED") {
                return;
            }

            if (project.creator.uid === context.user.uid) {

                const edit = () => {
                    navigate(`/projects/${project.pid}/edit`, {state: {project}})
                }

                if (isMobile) {
                    return (
                        <div className="edit-button-mobile" onClick={edit}>
                            <Edit size="48" color="#014751"/>
                        </div>
                    )
                }

                return (
                    <div className="edit-button" onClick={edit}>
                        <Edit size="24" color="#014751"/>
                        <div className={"LockButtonText"}>
                            Edit
                        </div>
                    </div>
                )
            }
        }

        const recommendProject = () => {
            if (project.internal_state === "BLOCKED") {
                return;
            }

            if (project.owner === context.user.uid || allTeams === undefined || allTeams.length === 0) {
                return
            }

            const recommendProjectButton = () => {
                setModalRecommend(true);
                setIsFinishProject(false);
                setIsCancelProject(false);
                setIsDeleteProject(false)
                setIsOpen(true);
            }

            if (isMobile) {
                return (
                    <div className={"edit-button-mobile"} onClick={recommendProjectButton}>
                        <Share size={48} color="#014751"/>
                    </div>
                )
            }

            return (
                <div className={"edit-button"} onClick={recommendProjectButton}>
                    <Share size={24} color="#014751"/>
                    <div className={"LockButtonText"}>
                        Share
                    </div>
                </div>
            )
        }

        const tags = () => {

            return (
                <div className={isMobile || context.size ? "teamCoverTagsMobile" : "team-tags"}>
                    {project.technologies.programming_language.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                    {project.technologies.frameworks.map((data) => {
                        return <FrameworkTag key={data} framework={data}/>
                    })}
                    {project.technologies.platforms.map((data) => {
                        return <PlatformTag key={data} platform={data}/>
                    })}
                    {project.technologies.databases.map((data) => {
                        return <CloudTag key={data} cloud={data}/>
                    })}
                    {project.idioms.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                    {project.description.non_function_requirements.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                </div>
            )
        }

        if (isMobile) {
            return (
                <div className="team-cover-container-mobile">
                    <div className="project-title-container-mobile">
                        <div className="team-name-mobile">
                            {project.name}
                        </div>
                        {tags()}
                    </div>
                    <div className="cover-buttons">
                        {recommendProject()}
                        {editButton()}
                    </div>
                    {editButton()}

                </div>
            )
        }

        return (
            <div className="cover-container">
                <div className="project-title-container">
                    <div className="team-name">
                        {project.name}
                        {project.internal_state === "BLOCKED" ? <BlockTag/> : null}
                    </div>
                    {tags()}
                </div>
                <div className="cover-buttons">
                    {recommendProject()}
                    {editButton()}
                </div>
            </div>
        )
    }

    const budget = () => {

        const filesContainer = () => {
            if (project.description.files_attached.files === undefined && project.description.files_attached.images === undefined) {
                return
            }

            if (project.description.files_attached.files.length === 0 && project.description.files_attached.images.length === 0) {
                return
            }

            return (
                <div className={isMobile ? "info-container-mobile" : "information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            <Document size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                            Files
                        </div>
                        <div className={isMobile ? "project-files-mobile" : "project-files"}>
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
            )
        }


        return (
            <div
                className={context.size || isMobile ? "project-information-container-reduce" : "project-information-container-left"}>
                <div className={isMobile ? "info-container-mobile" : "information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            <DollarSquare size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                            Budget
                        </div>
                        <div className={isMobile ? "budget-container-mobile" : "budget-container"}>
                            <BudgetTag budget={formatter.format(project.tentative_budget) + " USD"}/>
                        </div>
                    </div>
                </div>
                {filesContainer()}
            </div>
        )
    }

    const information = () => {
        const summary = () => {
            if (project.description.summary.length === 0) {
                return
            }
            return (
                <div className={isMobile ? "info-container-mobile" : "information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            Summary
                        </div>
                        <div className={isMobile ? "project-description-card-mobile" : "project-description-card"}>
                            {project.description.summary}
                        </div>
                    </div>
                </div>
            )
        }

        const functional = () => {
            if (project.description.functional_requirements.length === 0) {
                return
            }
            return (
                <div className={isMobile ? "info-container-mobile" : "information-container-reduce"}>
                    <div className="project-information-card">
                        <div className={isMobile ? "data-title-mobile" : "data-title"}>
                            Functional Requirements
                        </div>
                        <div className={isMobile ? "project-description-card-mobile" : "project-description-card"}>
                            {project.description.functional_requirements}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div
                className={isMobile || context.size ? "project-information-container-reduce" : "project-information-container"}>
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
                            modalRecommend ?
                                <RecommendProjectModal teams={allTeams} closeModal={closeModal} project={project}/> :
                                <PostulationModal teams={userTeams} closeModal={closeModal} pid={project.pid}
                                                  budget={project.tentative_budget}/>}
            </Modal>
        )
    }

    const activity = (data) => {
        return (
            <div key={data.description} className={isMobile ? "history-mobile" : "history"}>
                {data.description}
                <div className={isMobile ? "history-date-mobile" : "history-date"}>
                    {formatDate(data.created_date)}
                </div>
            </div>
        )
    }

    const tagInfo = () => {
        if (tagSelect === "info") {
            return (
                <div className={context.size || isMobile ? "project-data-container-reduce" : "project-data-container"}>
                    {budget()}
                    {information()}
                </div>
            )
        } else if (tagSelect === "postulations") {
            return (
                <div className="project-data-container-reduce">
                    {postulations === undefined ? noData() :
                        <PostulationsModal postulations={postulations} closeModal={closeModal}
                                           changePostulations={changePostulations}/>}
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
                <div
                    className={tagSelect === "postulations" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
                        setTagSelect("postulations")
                    }}>
                    Postulations
                </div>
            )
        }
    }

    const noData = () => {
            return (
                <div className={"no-data-tag"}>
                    No postulations available
                </div>
            )
    }

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className="team-container">
                <ProjectFinish project={project}/>
                <LeaveProject project={project}/>
                {postulations === undefined ? null :
                    <TemporalTeamPostulate project={project} postulations={postulations}/>}
                {cover()}
            </div>
            <div className={context.size ? "projectButtonsContainerReduced" : "projectButtonsContainer"}>
                <div className={isMobile ? "projectButtonContainerMobile" : "projectButtonContainer"}>
                    {owner(project.creator)}
                    {teamAssigned(project.team_assigned)}
                    {postulate()}
                    {teamRecommendations()}
                </div>
                <div className={isMobile ? "projectButtonContainerMobile" : "projectButtonContainer"}>
                    {cancelProject()}
                    {abandonProjectButton()}
                    {actionsButton()}
                </div>
            </div>
            <div className="tagsFilterContainer">
                <div
                    className={tagSelect === "info" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
                        setTagSelect("info")
                    }}>
                    Information
                </div>
                <div
                    className={tagSelect === "history" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
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
