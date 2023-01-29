import './style.css';
import logo from "../../assests/Logo-White.svg";
import {Link, useNavigate} from "react-router-dom";
import {
    Setting2,
    User,
    Notification,
    Message,
    Notepad2,
    LampCharge,
    Logout,
    People,
    EmojiHappy,
    Home2
} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {
    getFinishProject,
    getNotifications,
    getTeamPosition,
    viewNotifications
} from "../../services/notificationService";
import {getInvitation} from "../../services/invitationService";
import {getPostulation, getProject, getRequestAbandonProjectWithID} from "../../services/projectService";
import {isMobile} from "react-device-detect";
import {formatDate} from "../../utils/dateFormat";

function SideBar() {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [watchNotifications, setWatchNotifications] = useState(false)
    const [watchSettings, setWatchSettings] = useState(false)

    useEffect(() => {
        getNotifications(context.user.uid).then((response) => {
            setNotifications(response.reverse());
            let notifications = []
            response.forEach((data) => {
                if (!data.viewed) {
                    notifications.push(data.nid);
                }
            })
            setUnreadNotifications(notifications);
        }).catch((error) => {
            console.log(error)
        });
    }, [context.user.uid]);

    const closeAll = () => {
        setWatchNotifications(false);
        setWatchSettings(false);
    }

    const closeNotification = () => {
        closeAll();
        setWatchNotifications(!watchNotifications);

        if (unreadNotifications.length !== 0) {
            const not = "[" + unreadNotifications.toString() + "]"
            viewNotifications(not).then((r => {
                setUnreadNotifications([])
            }))
        }
    }

    const settingsModal = () => {
        closeAll();
        setWatchSettings(!watchSettings);
    }

    const user_image = () => {
        if (context.user.profile_image === "default") {
            return (
                <div className="user-sidebar">
                    <User color="#FAFAFA" size="20px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={context.user.profile_image} alt='' className="user-sidebar"/>
        }
    }

    const user_image_mobile = () => {
        if (context.user.profile_image === "default") {
            return (
                <div className={context.size ? "user-sidebar-web" : "user-sidebar-mobile"}>
                    <User color="#FAFAFA" size="20px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={context.user.profile_image} alt=''
                        className={context.size ? "user-sidebar-web" : "user-sidebar-mobile"}/>
        }
    }

    const notificationHover = () => {
        const buttonNavigation = (id, notification_type, message, metadata) => {
            if (notification_type === "TEAM_INVITATION") {
                getInvitation(id).then((invitation) => {
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
                    if (message.includes("rechazada")) {
                        navigate("/projects/" + response.pid)
                    } else {
                        navigate("/review", {state: {project: response, isProject: false}})
                    }
                });
            } else if (notification_type === "PROJECT_ABANDONS_REQUEST") {
                getRequestAbandonProjectWithID(id).then((response) => {
                    navigate("/projects/" + response.pid)
                })
            } else if (notification_type === "ABANDONED_PROJECT") {
                navigate("/projects/" + id)
            } else if (notification_type === "TEAM_REVIEW") {
                navigate("/team/review/" + id, {state: metadata})
            } else if (notification_type === "NEW_TEAM_CANDIDATE") {
                getTeamPosition(id).then((response) => {
                    navigate("/team/" + response.team.tid)
                })
            } else if (notification_type === "TEAM_POSITION_ACCEPTED") {
                navigate("/team/" + id)
            }
        }

        const icon = (notification_type) => {
            if (notification_type === "TEAM_INVITATION" || notification_type === "NEW_TEAM_CANDIDATE" || notification_type === "TEAM_POSITION_ACCEPTED") {
                return (
                    <People color="#FAFAFA" size="20px" variant="Bold"/>
                )
            } else {
                return (
                    <LampCharge color="#FAFAFA" size="20px" variant="Bold"/>
                )
            }
        }
        const notificationLi = (data) => {
            return (
                <li key={data.nid} onClick={() => {
                    buttonNavigation(data.resource_id, data.notification_type, data.content, data.metadata)
                }}>
                    <div className="notification-list-data">
                        <div className="user-notification">
                            {icon(data.notification_type)}
                        </div>
                        <div className="notification-list-data-message">
                            {data.content}
                        </div>
                    </div>
                    <div className="date">
                        {formatDate(data.created_date)}
                    </div>
                </li>
            )
        }

        const showNotifications = () => {
            if (notifications.length === 0) {
                return (
                    <div className="without">
                        <EmojiHappy size="48" color="rgb(46, 153, 153)" variant="Bold"/>
                        Without Notifications
                    </div>
                )
            } else {
                return notifications.map((not) => {
                    return notificationLi(not)
                })
            }
        }

        if (watchNotifications) {
            return (
                <div className={context.size ? "notifications-container-reduce" : "notifications-container"}>
                    <div id="notifications" className={context.size ? "notifications-reduce" : "notifications"}>
                        <div className="notification-title">
                            Notifications
                        </div>
                        <div className="notification-list">
                            {showNotifications()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const settingsHover = () => {
        const logout = () => {
            localStorage.removeItem("user");
            navigate("/")
        }

        if (watchSettings) {
            return (
                <div className="notifications-container">
                    <div id="notifications" className="notifications">
                        <div className="notification-title">
                            Settings
                        </div>
                        <div className="logout" onClick={logout}>
                            <div className="logout-info">
                                <Logout className="logout-icon" color="white" variant="Outline" size={24}/>
                                Log Out
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const browserView = () => {
        return (
            <>
                {watchNotifications || watchSettings ? <div onClick={closeAll} className="all-sidebar"/> : null}
                {notificationHover()}
                {settingsHover()}
                <div className="navbar-container">
                    <div className="navbar">
                        <div className="top">
                            <Link to="/">
                                <img src={logo} className="logo-side" alt="logo"/>
                            </Link>
                            <div className="notification" onClick={closeNotification}>
                                <Notification className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                {unreadNotifications.length !== 0 ?
                                    <span className="notification-numbers">{unreadNotifications.length}</span> : null}
                            </div>
                            <Message className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                            <Link to="/projects">
                                <LampCharge className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                            </Link>
                            <Notepad2 className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                        </div>
                        <div className="bottom">
                            <Link to="/me">
                                {user_image()}
                            </Link>
                            <Setting2 className="settings" color="#FAFAFA" variant="Outline" size={28}
                                      onClick={settingsModal}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const mobileView = () => {
        return (
            <>
                {watchNotifications || watchSettings ? <div onClick={closeAll} className="all-sidebar"/> : null}
                {notificationHover()}
                <div className={context.size ? "navbar-web-container-reduce" : "navbar-mobile-container"}>
                    <div className={context.size ? "navbar-web" : "navbar-mobile"}>
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"} onClick={() => {
                            navigate("/projects")
                        }}>
                            <LampCharge className="settings-mobile" color="#FAFAFA" variant="Outline"
                                        size={context.size ? 28 : 60}/>
                            Projects
                        </div>
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"}>
                            <Notepad2 className="settings-mobile" color="#FAFAFA" variant="Outline"
                                      size={context.size ? 28 : 60}/>
                            Articles
                        </div>
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"}>
                            <Home2 className="settings-mobile" color="#FAFAFA" variant="Outline"
                                   size={context.size ? 28 : 60}/>
                            Home
                        </div>
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"}
                             onClick={context.size ? closeNotification : null}>
                            <Notification className="settings-mobile" color="#FAFAFA" variant="Outline"
                                          size={context.size ? 28 : 60}/>
                            {unreadNotifications.length !== 0 ?
                                <span className="notification-numbers-mobile"></span> : null}
                            Notifications
                        </div>
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"} onClick={() => {
                            navigate("/me")
                        }}>
                            {user_image_mobile()}
                            Profile
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return isMobile || context.size ? mobileView() : browserView()
}

export default SideBar;
