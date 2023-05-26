import './style.css';
import {isMobile} from "react-device-detect";
import React from "react";
import NotFound from "../NotFound";
import {ArrowLeft2, EmojiHappy, LampCharge, Message, People, SearchNormal1} from "iconsax-react";
import SideBar from "../../components/SideBar";
import {getInvitation} from "../../services/invitationService";
import {getPostulation, getProject, getRequestAbandonProjectWithID} from "../../services/projectService";
import {getFinishProject, getTeamPosition} from "../../services/notificationService";
import {formatDate} from "../../utils/dateFormat";
import {useLocation, useNavigate} from "react-router-dom";

export default function Notifications() {
    const navigate = useNavigate();
    const {state} = useLocation();

    if (!isMobile) {
        return <NotFound/>
    }

    const notificationContainer = () => {
        const buttonNavigation = (id, notification_type, message, metadata) => {
            if (notification_type === "TEAM_INVITATION") {
                getInvitation(id, context).then((invitation) => {
                    const link = "/team/" + invitation.metadata.team.tid
                    navigate(link);
                })
            } else if (notification_type === "TEAM_POSTULATION" || notification_type === "TEAM_POSTULATION_RESPONSE") {
                getPostulation(id).then((postulation) => {
                    const link = "/projects/" + postulation.pid
                    navigate(link);
                })
            } else if (notification_type === "NEW_TEAM_MEMBERS") {
                navigate("/user/" + id);
            } else if (notification_type === "PROJECT_FINISHED_REQUEST") {
                getFinishProject(id).then((r) => {
                    navigate("/projects/" + r.pid);
                })
            } else if (notification_type === "PROJECT_FINISHED") {
                getProject(id).then((response) => {
                    if (message.includes("rechazada") || message.includes("rejected")) {
                        navigate("/projects/" + response.pid)
                    } else {
                        navigate("/review", {state: {project: response, isProject: false}})
                    }
                });
            } else if (notification_type === "PROJECT_ABANDONS_REQUEST") {
                getRequestAbandonProjectWithID(id).then((response) => {
                    navigate("/projects/" + response.pid)
                })
            } else if (notification_type === "ABANDONED_PROJECT" || notification_type === "PROJECT_INVITATION") {
                navigate("/projects/" + id)
            } else if (notification_type === "TEAM_REVIEW") {
                navigate("/team/review/" + id, {state: metadata})
            } else if (notification_type === "NEW_TEAM_CANDIDATE" || notification_type === "POSITION_INVITATION") {
                getTeamPosition(id).then((response) => {
                    navigate("/team/" + response.team.tid)
                })
            } else if (notification_type === "TEAM_POSITION_ACCEPTED" || notification_type === "NEW_TEMPORAL_TEAM") {
                navigate("/team/" + id)
            } else if (notification_type === "TEAM_PROJECT_INTERNAL_RECOMMENDATION") {
                navigate("/projects/" + id)
            } else if (notification_type === "TEAM_MEMBER_INTERNAL_RECOMMENDATION" || notification_type === "NEW_FOLLOWER") {
                navigate("/user/" + id)
            }
        }

        const icon = (notification_type) => {
            if (notification_type === "TEAM_INVITATION" || notification_type === "NEW_TEAM_CANDIDATE" || notification_type === "TEAM_POSITION_ACCEPTED") {
                return (
                    <People color="#FAFAFA" size="48" variant="Bold"/>
                )
            } else {
                return (
                    <LampCharge color="#FAFAFA" size="48" variant="Bold"/>
                )
            }
        }
        const notificationLi = (data) => {
            return (
                <li key={data.nid} onClick={() => {
                    buttonNavigation(data.resource_id, data.notification_type, data.content, data.metadata)
                }}>
                    <div className="notification-list-data">
                        <div className={"chat-photo-mobile"}>
                            {icon(data.notification_type)}
                        </div>
                        <div className="notification-list-data-message-mobile">
                            {data.content}
                        </div>
                    </div>
                    <div className="dateMobile">
                        {formatDate(data.created_date)}
                    </div>
                </li>
            )
        }
        const showNotifications = () => {
            if (state === undefined || state.list.length === 0) {
                return (
                    <div className="without">
                        <EmojiHappy size="48" color="rgb(46, 153, 153)" variant="Bold"/>
                        Without Notifications
                    </div>
                )
            } else {
                return state.list.map((not) => {
                    return notificationLi(not)
                })
            }
        }

        return (
            <div className={"notification-mobile-list"}>
                {showNotifications()}
            </div>
        )
    }

    const chat = () => {
        navigate("/chats")
    }

    const backButton = () => {
        const goBack = () => {
            navigate(-1)
        }

        return (
            <ArrowLeft2 color="#222222" size={isMobile ? "48" : "24"} className={"icon-b"} onClick={goBack}/>
        )
    }

    return (
        <div className={"chatDivMobile"}>
            <div className="searchbar-mobile">
                <div className="header-notification-mobile-container">
                    <div className={"header-title-mobile-container"}>
                        {backButton()}
                        <div className={"chatUserNameHeaderMobile"}>
                            Notifications
                        </div>
                    </div>
                    <div className="searchbar-mobile-buttons">
                        <div className="search-button" onClick={chat}>
                            <Message color="#222222" variant="Outline" size={48}/>
                        </div>
                        <div className="search-button">
                            <SearchNormal1 color="#222222" variant="Outline" size={48}/>
                        </div>
                    </div>
                </div>
            </div>
            {notificationContainer()}
            <SideBar/>
        </div>
    )
}
