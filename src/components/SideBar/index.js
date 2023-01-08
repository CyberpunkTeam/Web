import './style.css';
import logo from "../../assests/logo-complete.svg";
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
import {getNotifications, viewNotifications} from "../../services/notificationService";
import {getInvitation} from "../../services/invitationService";
import moment from "moment/moment";
import 'moment/locale/es';
import {getPostulation} from "../../services/projectService";
import {BrowserView, MobileView} from "react-device-detect";

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
                <div className="user-sidebar-mobile">
                    <User color="#FAFAFA" size="20px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={context.user.profile_image} alt='' className="user-sidebar-mobile"/>
        }
    }


    const notificationHover = () => {

        const buttonNavigation = (id, notification_type) => {
            if (notification_type === "TEAM_INVITATION") {
                getInvitation(id).then((invitation) => {
                    const link = "/team/" + invitation.metadata.team.tid
                    navigate(link);
                })
            } else if (notification_type === "TEAM_POSTULATION") {
                getPostulation(id).then((postulation) => {
                    const link = "/projects/" + postulation.pid
                    navigate(link);
                })
            }
        }

        const formatDate = (date) => {
            const d = date.replace(/:/, ' ');
            return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
        }

        const icon = (notification_type) => {
            if (notification_type === "TEAM_INVITATION") {
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
                    buttonNavigation(data.resource_id, data.notification_type)
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
                        Sin Notificaciones
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
                <div id="notifications" className="notifications">
                    <div className="notification-title">
                        Notificaciones
                    </div>
                    <div className="notification-list">
                        {showNotifications()}
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
                <div id="settings-container" className="notifications">
                    <div className="notification-title">
                        Configuración
                    </div>
                    <div className="logout" onClick={logout}>
                        <div className="logout-info">
                            <Logout className="logout-icon" color="white" variant="Outline" size={24}/>
                            Cerrar Sesión
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
                <div className="navbar">
                    <div className="top">
                        <Link to="/">
                            <img src={logo} className="logo-side" alt="logo"/>
                        </Link>
                        <div className="notification" onClick={closeNotification}>
                            <Notification className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
                            {unreadNotifications.length !== 0 ?
                                <span className="notification-numbers">{unreadNotifications.length}</span> : null}
                        </div>
                        <Message className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
                        <Link to="/projects">
                            <LampCharge className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
                        </Link>
                        <Notepad2 className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
                    </div>
                    <div className="bottom">
                        <Link to="/me">
                            {user_image()}
                        </Link>
                        <Setting2 className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}
                                  onClick={settingsModal}/>
                    </div>
                </div>
            </>
        )
    }

    const mobileView = () => {
        return (
            <div className="navbar-mobile">
                <div className="navbar-mobile-icon">
                    <Home2 className="settings-mobile" color="rgb(46, 153, 153)" variant="Outline" size={60}/>
                    Inicio
                </div>
                <div className="navbar-mobile-icon" onClick={() => {navigate("/projects")}}>
                    <LampCharge className="settings-mobile" color="rgb(46, 153, 153)" variant="Outline" size={60}/>
                    Proyectos
                </div>
                <div className="navbar-mobile-icon">
                    <Notepad2 className="settings-mobile" color="rgb(46, 153, 153)" variant="Outline" size={60}/>
                    Publicaciones
                </div>
                <div className="navbar-mobile-icon">
                    <Message className="settings-mobile" color="rgb(46, 153, 153)" variant="Outline" size={60}/>
                    Mensajes
                </div>
                <div className="navbar-mobile-icon">
                    <Notification className="settings-mobile" color="rgb(46, 153, 153)" variant="Outline" size={60}/>
                    Notificaciones
                </div>
                <div className="navbar-mobile-icon" onClick={() => {navigate("/me")}}>
                    {user_image_mobile()}
                    Perfil
                </div>
            </div>
        )
    }

    return (
        <>
            <BrowserView>
                {browserView()}
            </BrowserView>
            <MobileView>
                {mobileView()}
            </MobileView>
        </>
    );
}

export default SideBar;
