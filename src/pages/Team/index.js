import './style.css';
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import React, {useContext, useEffect, useState} from "react";
import {getTeam, getTeamReviews} from "../../services/teamService";
import {Edit, Message, Star1, User, UserAdd, UserCirlceAdd} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import Modal from "react-modal";
import {followTeams, getUsers} from "../../services/userService";
import AddMemberModal from "../../components/AddMemberModal";
import TeamInvitation from "../../components/TeamInvitation";
import {getTeamInvitations} from "../../services/invitationService";
import {getTeamPostulations} from "../../services/projectService";
import TeamProjectPostulations from "../../components/TeamProjectPostulations";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import {BrowserView, isMobile, MobileView} from "react-device-detect";
import MembersPostulations from "../../components/MembersPostulations";
import TeamInformationView from "../../components/TeamInformationView";
import {modalStyle} from "../../styles/commonStyles";
import PlatformTag from "../../components/PlatformTag";
import FrameworkTag from "../../components/FrameworkTag";
import CloudTag from "../../components/CloudTag";
import FollowingTag from "../../components/FollowingTag";
import BlockTag from "../../components/BlockTag";

export default function TeamScreen() {
    const params = useParams();
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [teamData, setTeamData] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [postulations, setPostulations] = useState([])
    const [loadingPostulations, setLoadingPostulations] = useState(true)
    const [tagSelect, setTagSelect] = useState(state === null ? "info" : "members")
    const [time, setTime] = useState(Date.now());
    const [followButtonStatus, setFollowButtonStatus] = useState(false);

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    useEffect(() => {
        getTeam(params.id, context).then((response) => {
            if (response === undefined) {
                setError("An error has occurred while loading team's information. Please, try again later");
                return
            }
            if (response.detail === "User is blocked") {
                return;
            }
            setTeamData(response);
            getTeamReviews(params.id, context).then((reviews) => {
                if (reviews === undefined) {
                    setError("An error has occurred while loading team`s reviews. Please, try again later");
                    return
                } else {
                    setReviews(reviews)
                }

                const list = []
                response.members.forEach((data) => {
                    list.push(data.uid)
                })
                setMembersList(list)
                getUsers(context).then((users) => {
                    if (users === undefined) {
                        setError("An error has occurred while loading users. Please, try again later");
                    } else {
                        setUsers(users)
                    }
                })
                getTeamInvitations(params.id, context).then((invitations) => {
                    if (invitations === undefined) {
                        setError("An error has occurred while loading team's invitations. Please, try again later");
                    } else {
                        if (invitations.length !== 0) {
                            const usersInvited = []
                            invitations.forEach((data) => {
                                if (data.state === "PENDING") {
                                    usersInvited.push(data.metadata.user.uid)
                                }
                            })
                            setInvitations(usersInvited);
                        }
                    }

                    getTeamPostulations(params.id, context).then((response) => {
                        if (invitations === undefined) {
                            setError("An error has occurred while loading team's postulations. Please, try again later");
                        } else {
                            setPostulations(response)
                        }
                        setLoadingPostulations(false)
                        setLoading(false);
                    })
                })
            })
        }).catch((error) => {
            console.log(error)
            navigate("/*")
        });
    }, [params.id, navigate, time]);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => setTime(Date.now()), 10000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [loading]);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const editButtonNavigation = () => {
        navigate(`edit`, {state: {team: teamData}})
    }

    if (loading) {
        return <Loading/>
    }

    const IMAGE = 'https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg'

    const followTeam = () => {
        if (context.user.following.teams.includes(params.id)) {
            return;
        }
        setFollowButtonStatus(true);
        followTeams(context.user.uid, params.id, context).then((userdata) => {
            if (userdata === undefined) {
                setError("An error has occurred while following the user. Please, try again later");
                return
            }
            context.setUser(userdata);
            localStorage.setItem("user", JSON.stringify(userdata))
            setFollowButtonStatus(false);
        })
    }

    const followTeamButton = () => {
        if (teamData.state === "BLOCKED") {
            return null;
        }

        let members = []
        teamData.members.forEach((member) => {
            members.push(member.uid)
        })

        if (members.includes(context.user.uid) || teamData.temporal || context.user.following.teams.includes(params.id)) {
            return
        }

        if (isMobile) {
            return (
                <div className={"edit-button-mobile"} onClick={followTeam}>
                    {followButtonStatus ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        <UserAdd size={48} color="#014751"/>}
                </div>
            )
        }

        return (
            <div className={"edit-button"} onClick={followTeam}>
                {followButtonStatus ? <i className="fa fa-circle-o-notch fa-spin"/> :
                    <UserAdd size={24} color="#014751"/>}
                <div className={followButtonStatus ? null : "LockButtonText"}>
                    {followButtonStatus ? null : "Follow"}
                </div>
            </div>
        )
    }

    const teamChat = () => {
        if (!membersList.includes(context.user.uid)) {
            return
        }

        const create = () => {
            context.chats.forEach((chat) => {
                if (chat[0] === teamData.tid) {
                    navigate("/chats", {state: {actualChat: chat}})
                }

            })
        }

        if (isMobile) {
            return (
                <div className={"edit-button-mobile"} onClick={create}>
                    <Message size={48} color="#014751"/>
                </div>
            )
        }

        return (
            <div className={"edit-button"} onClick={create}>
                <Message size={24} color="#014751"/>
                <div className={"LockButtonText"}>
                    Message
                </div>
            </div>
        )
    }
    const editButton = () => {
        if (teamData.state === "BLOCKED") {
            return null;
        }

        if (teamData.owner === context.user.uid) {
            if (isMobile) {
                return (
                    <div className="edit-button-mobile" onClick={editButtonNavigation}>
                        <Edit size="48" color="#014751"/>
                    </div>
                )
            }

            return (
                <div className="edit-button" onClick={editButtonNavigation}>
                    <Edit size="24" color="#014751"/>
                    <div className={"LockButtonText"}>
                        Edit
                    </div>
                </div>
            )
        }
    }
    const cover = () => {

        const tags = () => {

            return (
                <div className={isMobile ? "teamCoverTagsMobile" : "team-tags"}>
                    {teamData.technologies.programming_language.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                    {teamData.technologies.frameworks.map((data) => {
                        return <FrameworkTag key={data} framework={data}/>
                    })}
                    {teamData.technologies.platforms.map((data) => {
                        return <PlatformTag key={data} platform={data}/>
                    })}
                    {teamData.technologies.databases.map((data) => {
                        return <CloudTag key={data} cloud={data}/>
                    })}
                    {teamData.project_preferences === null ? null : teamData.project_preferences.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                    {teamData.idioms === null ? null : teamData.idioms.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                    {teamData.methodologies === null ? null : teamData.methodologies.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                </div>
            )
        }

        if (isMobile) {
            return (
                <div className="team-cover-container-mobile">
                    <div className="team-data-container-mobile">
                        <div className="team-name-mobile">
                            {teamData.name}
                            <div className="team-rating-mobile">
                                <Star1 size="32" color="#ECA95A" variant="Linear" className={"star"}/>
                                {teamData.overall_rating.toFixed(1)}
                            </div>
                            {teamData.state === "BLOCKED" ? <BlockTag/> : null}
                            {context.user.following.teams.includes(params.id) ? <FollowingTag/> : null}
                        </div>
                        {tags()}
                        <div className="cover-buttons">
                            {followTeamButton()}
                            {teamChat()}
                            {editButton()}
                        </div>
                    </div>
                    <img src={IMAGE} className="team-image-container-mobile" alt=""/>
                </div>
            )
        }


        return (
            <div className="cover-container">
                <div className="team-data-container">
                    <div className="team-name">
                        {teamData.name}
                        <div className="team-rating">
                            <Star1 size="24" color="#ECA95A" variant="Linear" className={"star"}/>
                            {teamData.overall_rating.toFixed(1)}
                        </div>
                        {teamData.state === "BLOCKED" ? <BlockTag/> : null}
                        {context.user.following.teams.includes(params.id) ? <FollowingTag/> : null}
                    </div>
                    {tags()}
                    <div className="cover-buttons">
                        {followTeamButton()}
                        {teamChat()}
                        {editButton()}
                    </div>
                </div>
                <img src={IMAGE} className="image-container" alt=""/>
            </div>
        )
    }

    const member = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <User color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt=''
                            className={isMobile ? "user-mobile-image" : "user-sidebar"}/>
            }
        }

        if (isMobile) {
            return (
                <div key={data.uid} className="members-info-container-mobile-3" onClick={userNavigate}>
                    <div className="members-info-mobile">
                        {user_image(data)}
                        <div className="member-name-mobile">
                            {data.name} {data.lastname}
                            <div className="owner-mobile">
                                {data.uid === teamData.owner ? 'Owner' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div key={data.uid} className="members-info-container" onClick={userNavigate}>
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name">
                        {data.name} {data.lastname}
                        <div className="owner">
                            {data.uid === teamData.owner ? 'Owner' : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <AddMemberModal members={membersList} tid={teamData.tid} users={users} invitations={invitations}
                                setInvitations={setInvitations} closeModal={closeModal}/>
            </Modal>
        )
    }

    const addButton = () => {
        if (teamData.state === "BLOCKED") {
            return null;
        }

        if (context.user.uid === teamData.owner) {
            return (
                <button className="addMemberButton" onClick={openModal}>
                    <UserCirlceAdd color="#FAFAFA" variant="Bold" size={40}/>
                </button>
            )
        }
    }

    const tagsInfo = () => {
        if (tagSelect === "projects") {
            return <TeamProjectPostulations postulations={postulations} loadingPostulations={loadingPostulations}/>
        }

        if (tagSelect === "members") {
            return <MembersPostulations owner={teamData.owner}
                                        tid={teamData.tid}
                                        members={membersList}
                                        state={teamData.state}/>
        }

        if (tagSelect === "info") {
            return <TeamInformationView postulations={postulations} reviews={reviews}/>
        }

    }

    const postulationsTag = () => {
        if (teamData.owner === null) {
            return
        }

        if (context.user.uid === teamData.owner) {
            return (
                <div
                    className={tagSelect === "projects" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
                        setTagSelect("projects")
                    }}>
                    Project Postulations
                </div>
            )
        }
    }

    const membersTag = () => {
        if (context.user.uid === teamData.owner) {
            return (
                <div
                    className={tagSelect === "members" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
                        setTagSelect("members")
                    }}>
                    Member Postulations
                </div>
            )
        }

        if (!membersList.includes(context.user.uid)) {
            return (
                <div
                    className={tagSelect === "members" ? isMobile ? "tagSelectorSelectMobile" : "tagSelectorSelect" : isMobile ? "tagSelectorMobile" : "tagSelector"}
                    onClick={() => {
                        setTagSelect("members")
                    }}>
                    Opportunities
                </div>
            )
        }
    }

    const browserView = () => {
        return (
            <div className={"team-screen"}>
                <div className="team-container">
                    <TeamInvitation tid={teamData.tid} owner={teamData.members[0]} team={teamData} state={teamData.state}/>
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {addButton()}
                    <div className="members-container">
                        {teamData.members.map((data) => {
                                return member(data)
                            }
                        )}
                    </div>
                </div>
                <div className="tagsFilterContainer">
                    <div className={tagSelect === "info" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                        setTagSelect("info")
                    }}>
                        Information
                    </div>
                    {membersTag()}
                    {postulationsTag()}
                </div>
                {tagsInfo()}
                {modal()}
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }

    const mobileView = () => {
        return (
            <div className={"profile-screen-mobile"}>
                <div className="team-container">
                    {cover()}
                </div>
                <div className="profile-data-container">
                    <div className="members-container">
                        {teamData.members.map((data) => {
                                return member(data)
                            }
                        )}
                    </div>
                </div>
                <div className="tagsFilterContainer">
                    <div className={tagSelect === "info" ? "tagSelectorSelectMobile" : "tagSelectorMobile"}
                         onClick={() => {
                             setTagSelect("info")
                         }}>
                        Information
                    </div>
                    {membersTag()}
                    {postulationsTag()}
                </div>
                {tagsInfo()}
                {modal()}
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }


    if (teamData.tid === undefined) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <>
                <BrowserView>
                    {browserView()}
                </BrowserView>
                <MobileView>
                    {mobileView()}
                </MobileView>
            </>
        )
    }
}
