import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import React, {useContext, useEffect, useState} from "react";
import NotFound from "../NotFound";
import {AddCircle, Edit, ArrowForward, User, Notepad2, Message} from "iconsax-react";
import Modal from 'react-modal';
import {useNavigate, useParams} from "react-router-dom";
import {followUser, getProfile} from "../../services/userService";
import Loading from "../../components/loading";
import SearchBar from "../../components/SearchBar";
import EditProfileModal from "../../components/EditProfileModal";
import EducationComponent from "../../components/EducationComponent";
import WorkExperienceComponent from "../../components/WorkExperienceComponent";
import UserTeamsComponent from "../../components/UserTeamsComponent";
import {isMobile} from "react-device-detect";
import UserProjectMobileComponent from "../../components/UserProjectMobileComponent";
import {modalStyle} from "../../styles/commonStyles";
import UserSkills from "../../components/UserSkills";
import AlertMessage from "../../components/AlertMessage";
import {getMyTeams} from "../../services/teamService";
import FollowingTag from "../../components/FollowingTag";
import {RecommendUserModal} from "../../components/RecommendUserModal";
import PublicationTile from "../../components/PublicationTile";
import {getMyArticles} from "../../services/contentService";
import {createChat} from "../../services/firebaseStorage";

function ProfileScreen() {
    const params = useParams();
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [followButtonStatus, setFollowButtonStatus] = useState(false);
    const [time, setTime] = useState(Date.now());
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalRecommend, setModalRecommend] = useState(false);
    const [tagSelect, setTagSelect] = useState("profile")
    const [allTeams, setAllTeams] = useState(undefined);
    const id = params.id ? params.id : context.user.uid

    const [userData, setUserData] = useState({})
    const [articles, setArticles] = useState([])

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    const resetUserData = () => {
        setUserData({});
        setLoading(true);
        window.location.reload()
    };

    useEffect(() => resetUserData, [params.id])

    useEffect(() => {
        getProfile(id).then((response) => {
            if (response === undefined) {
                setError("An error has occurred while loading user's information. Please, try again later");
                return
            }
            getMyArticles(id).then((articlesResponse) => {
                if (response === undefined) {
                    setError("An error has occurred while loading user's information. Please, try again later");
                    return
                }
                setArticles(articlesResponse)
                setUserData(response);
                setLoading(false);
            })
            getMyTeams(context.user.uid).then((teams) => {
                if (teams === undefined) {
                    setError("An error has occurred while loading user's teams. Please, try again later");
                } else {
                    let t = []
                    teams.forEach((team) => {
                        if (team.owner !== context.user.uid && !team.temporal) {
                            t.push(team)
                            for (let i = 0; i < team.members.length; i++) {
                                if (team.members[i].uid === id) {
                                    t.pop();
                                    break
                                }
                            }
                        }
                    })
                    setAllTeams(t);
                }
            })
        }).catch((error) => {
            console.log(error)
        });
    }, [id, time]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setTime(Date.now()), 2000);
        return () => clearTimeout(timeoutId);
    }, [time]);

    const followUserButton = () => {
        if (context.user.following.users.includes(id)) {
            return;
        }
        setFollowButtonStatus(true);
        followUser(context.user.uid, id).then((userdata) => {
            if (userdata === undefined) {
                setError("An error has occurred while following the user. Please, try again later");
                return
            }
            context.setUser(userdata);
            localStorage.setItem("user", JSON.stringify(userdata))
            setFollowButtonStatus(false);
        })
    }

    const recommendUserButton = () => {
        setFollowButtonStatus(true);
        setModalRecommend(true)
        setIsOpen(true);
    }

    const user_image = () => {
        if (userData.user.profile_image === "default") {
            return (
                <div className={isMobile ? "user-svg-mobile" : "user-svg"}>
                    <User color="#FAFAFA" size={isMobile ? "100px" : "50px"} variant="Bold"/>
                </div>
            )
        } else {
            return <img src={userData.user.profile_image} alt={'user'}
                        className={isMobile ? "user-svg-mobile" : "user"}/>
        }
    }

    const user_data = () => {
        return (
            <div className="user-data-container">
                <div className={isMobile ? "name-mobile" : "name"}>
                    {id !== context.user.uid ? userData.user.name : context.user.name} {id !== context.user.uid ? userData.user.lastname : context.user.lastname}
                    {context.user.following.users.includes(id) ? <FollowingTag/> : null}
                </div>
                <div className={isMobile ? "extra-data-mobile" : "extra-data"}>
                    {id !== context.user.uid ? userData.user.location : context.user.location}
                </div>
                <div className={isMobile ? "extra-data-mobile" : "extra-data"}>
                    {id !== context.user.uid ? userData.user.email : context.user.email}
                </div>
            </div>
        )
    }

    const coverImage = () => {
        if (userData.user.cover_image === "default") {
            return (
                <div className={isMobile ? "cover-user-container-mobile" : "cover-user-container"}/>
            )
        }
        return <img src={userData.user.cover_image} className={isMobile ? "image-container-mobile" : "image-container"}
                    alt=""/>
    }

    const openModal = () => {
        setModalRecommend(false)
        setIsOpen(true);
    }

    const closeModal = () => {
        setModalRecommend(false);
        setFollowButtonStatus(false);
        setIsOpen(false);
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {modalRecommend ? <RecommendUserModal uid={id} closeModal={closeModal} teams={allTeams}/> :
                    <EditProfileModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    const followButton = () => {
        if (id === context.user.uid || context.user.following.users.includes(id)) {
            return
        }

        return (
            <button
                className={isMobile ? "followButtonMobile" : context.size ? "follow2ReducedButton" : "follow2Button"}
                disabled={followButtonStatus}
                onClick={followUserButton}>
                {followButtonStatus ?
                    <i className="fa fa-circle-o-notch fa-spin"></i> :
                    <AddCircle color="#FAFAFA"
                               size={isMobile ? 48 : 24}
                               className={isMobile || context.size ? null : "icon"}/>
                }
                {isMobile || context.size || followButtonStatus ? null : "Follow"}
            </button>
        )
    }

    const recommendUser = () => {
        if (id === context.user.uid || !context.user.following.users.includes(id) || allTeams === undefined || allTeams.length === 0) {
            return
        }

        return (
            <button
                className={isMobile ? "followButtonMobile" : "followReducedButton"}
                disabled={followButtonStatus}
                onClick={recommendUserButton}>
                {followButtonStatus ?
                    <i className="fa fa-circle-o-notch fa-spin"></i> :
                    <ArrowForward color="#FAFAFA" size={isMobile ? 48 : 24}/>
                }
            </button>
        )
    }

    const chatUser = () => {
        if (id === context.user.uid || !context.user.following.users.includes(id)) {
            return
        }

        const create = () => {
            createChat(context.user, userData.user).then((combinedId) => {
                console.log(context.chats, context.chats[combinedId])
                context.chats.forEach((chat) => {
                    if (chat[0] === combinedId) {
                        navigate("/chats", {state: {actualChat: chat}})
                    }

                })
            })
        }

        return (
            <div className="cover-buttons" onClick={create}>
                <div className={isMobile ? "edit-button-mobile" : "edit-button"}>
                    <Message size={isMobile ? 48 : 24} color="#014751"/>
                </div>
            </div>
        )
    }

    const cover = () => {

        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="cover-buttons">
                        <div className="edit-button" onClick={openModal}>
                            <Edit size="24" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className={context.size ? "user-data-reduce" : "user-data"}>
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                    {followButton()}
                    {recommendUser()}
                    {chatUser()}
                </div>
                {coverImage()}
            </div>
        )
    }

    const coverMobile = () => {

        const editProfile = () => {
            navigate("/user/edit")
        }

        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="cover-buttons">
                        <div className="edit-button-mobile" onClick={editProfile}>
                            <Edit size="48" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container-mobile">
                <div className="user-cover-container-mobile">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                    {followButton()}
                    {recommendUser()}
                    {chatUser()}
                </div>
                {coverImage()}
            </div>
        )
    }

    const showUserInfo = () => {
        if (tagSelect === "profile") {
            return (
                <div
                    className={isMobile || context.size ? "userInformationContainerReduced" : "userInformationContainer"}>
                    <div className={isMobile ? "column-mobile" : context.size ? "row" : "column"}>
                        <EducationComponent userData={userData}/>
                        <WorkExperienceComponent userData={userData}/>
                        <UserSkills userData={userData}/>
                    </div>
                    <div className={isMobile ? "column-mobile" : context.size ? "row" : "column"}>
                        <div className={"teamProjectsInProgressContainerReduced"}>
                            <div className={"teamInformationTitleContainer"}>
                                <div className={isMobile ? "teamInformationTitleMobile" : "teamInformationTitle"}>
                                    <Notepad2 size={isMobile ? "80" : "32"} color="#FAFAFA" className="icon"/>
                                    Articles
                                </div>
                            </div>
                        </div>
                        {articles.map((article) => {
                            return <PublicationTile key={article.cid} publication={article}/>
                        })}
                    </div>
                </div>
            )
        } else if (tagSelect === "teams") {
            return (
                <UserTeamsComponent userData={userData}/>
            )
        } else {
            return <UserProjectMobileComponent userData={userData}/>
        }
    }

    if (loading && Object.keys(userData).length === 0) {
        return <Loading/>
    }

    if (context.user === undefined || context.user === null || Object.keys(userData).length === 0) {
        return (
            <NotFound/>
        )
    } else if (isMobile) {
        return (
            <div className="profile-screen-mobile">
                <div className="profile-container">
                    {coverMobile()}
                </div>
                <div className="tagsFilterContainer">
                    <div className={tagSelect === "profile" ? "tagSelectorSelectMobile" : "tagSelectorMobile"}
                         onClick={() => {
                             setTagSelect("profile")
                         }}>
                        Profile
                    </div>
                    <div className={tagSelect === "teams" ? "tagSelectorSelectMobile" : "tagSelectorMobile"}
                         onClick={() => {
                             setTagSelect("teams")
                         }}>
                        Teams
                    </div>
                    <div className={tagSelect === "projects" ? "tagSelectorSelectMobile" : "tagSelectorMobile"}
                         onClick={() => {
                             setTagSelect("projects")
                         }}>
                        Projects
                    </div>
                </div>
                <div className="profile-data-container-mobile">
                    {showUserInfo()}
                </div>
                {modal()}
                <SearchBar/>
                <SideBar/>
            </div>
        )
    } else {
        return (
            <div className="profile-screen">
                <div className="profile-container">
                    {cover()}
                </div>
                <div className="tagsFilterContainer">
                    <div className={tagSelect === "profile" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                        setTagSelect("profile")
                    }}>
                        Information
                    </div>
                    <div className={tagSelect === "teams" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                        setTagSelect("teams")
                    }}>
                        Teams
                    </div>
                    <div className={tagSelect === "projects" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                        setTagSelect("projects")
                    }}>
                        Projects
                    </div>
                </div>
                <div className="profile-data-container">
                    {showUserInfo()}
                </div>
                {modal()}
                <SearchBar/>
                <SideBar/>
                <AlertMessage/>
            </div>
        )
    }
}

export default ProfileScreen;
