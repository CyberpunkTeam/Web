import './style.css';
import logo from "../../assests/Logo-White.svg";
import {useNavigate} from "react-router-dom";
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
    Home2, Briefcase
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
    const [time, setTime] = useState(Date.now());
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
    }, [context.user.uid, time]);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 30000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const closeAll = () => {
        setWatchNotifications(false);
        setWatchSettings(false);
    }

    const projects = () => {
        navigate("/projects")
    }

    const jobs = () => {
        navigate("/jobs")
    }

    const home = () => {
        navigate("/")
    }

    const user = () => {
        navigate("/me")
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

    const notificationContainer = () => {
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

        return (
            <div className={context.size ? "notification-list-reduced" : "notification-list"}>
                {showNotifications()}
            </div>
        )
    }
    const notificationHover = () => {

        if (watchNotifications) {
            return (
                <div className={"notifications-container-reduce"}>
                    <div id="notifications" className={"notifications-reduce"}>
                        <div className="notification-title">
                            {watchNotifications ? "Notifications" : "Settings"}
                        </div>
                        {notificationContainer()}
                    </div>
                </div>
            )
        }
    }

    const settingsHover = () => {
        const logout = () => {
            localStorage.removeItem("user");
            localStorage.removeItem("auth_token")
            navigate("/")
        }

        if (watchSettings) {
            return (
                <div className="logout" onClick={logout}>
                    <div className="logout-info">
                        <Logout className="logout-icon" color="white" variant="Outline" size={24}/>
                        Log Out
                    </div>
                </div>
            )
        }
    }

    const browserView = () => {
        return (
            <>
                {watchNotifications || watchSettings ? <div onClick={closeAll} className="all-sidebar"/> : null}
                <div className="navbar-container">
                    <div className="navbar">
                        <div className="top">
                            <div className="navbar-icon" onClick={home}>
                                <img src={logo} className="logo-side" alt="logo"/>
                                <div className={"navbar-text"}>
                                    Home
                                </div>
                            </div>
                            <div className="navbar-icon" onClick={closeNotification}>
                                <Notification className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                {unreadNotifications.length !== 0 ?
                                    <span className="notification-numbers">{unreadNotifications.length}</span> : null}
                                <div className={"navbar-text"}>
                                    Notifications
                                </div>
                            </div>
                            <div className="navbar-icon">
                                <Message className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                <div className={"navbar-text"}>
                                    Messages
                                </div>
                            </div>
                            <div className="navbar-icon" onClick={projects}>
                                <LampCharge className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                <div className={"navbar-text"}>
                                    Projects
                                </div>
                            </div>
                            <div className="navbar-icon" onClick={jobs}>
                                <Briefcase className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                <div className={"navbar-text"}>
                                    Opportunities
                                </div>
                            </div>
                            <div className="navbar-icon">
                                <Notepad2 className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                <div className={"navbar-text"}>
                                    Articles
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="navbar-icon" onClick={user}>
                                {user_image()}
                                <div className={"navbar-text"}>
                                    Profile
                                </div>
                            </div>
                            <div className="navbar-icon" onClick={settingsModal}>
                                <Setting2 className="settings" color="#FAFAFA" variant="Outline" size={28}/>
                                <div className={"navbar-text"}>
                                    Settings
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={watchNotifications || watchSettings ? "navbar-notifications" : "navbar-notifications-no-show"}>
                        <div className="notification-title">
                            {watchNotifications ? "Notifications" : "Settings"}
                        </div>
                        {watchNotifications ? notificationContainer() : null}
                        {watchSettings ? settingsHover() : null}
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
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"} onClick={projects}>
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
                        <div className={context.size ? "navbar-web-icon" : "navbar-mobile-icon"} onClick={user}>
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
