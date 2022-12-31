import './style.css';
import logo from "../../assests/logo-complete.svg";
import {Link, useNavigate} from "react-router-dom";
import {Setting2, User, Notification, Message, Notepad2, LampCharge} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {getNotifications, viewNotifications} from "../../services/notificationService";
import {getInvitation} from "../../services/invitationService";
import moment from "moment/moment";
import 'moment/locale/es';
import {getPostulation} from "../../services/projectService";

function SideBar() {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [watchNotifications, setWatchNotifications] = useState(false)


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

    const closeNotification = () => {
        setWatchNotifications(!watchNotifications);

        if (unreadNotifications.length !== 0) {
            const not = "[" + unreadNotifications.toString() + "]"
            viewNotifications(not).then((r => {
                setUnreadNotifications([])
            }))
        }
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
        const notificationLi = (data) => {

            return (
                <li key={data.nid} onClick={ () => {buttonNavigation(data.resource_id, data.notification_type)}}>
                    {data.content}
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

    return (
        <>
            {watchNotifications ? <div onClick={closeNotification} className="all-sidebar"/> : null}
            {notificationHover()}
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
                    <Setting2 className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
                </div>
            </div>
        </>
    )

}

export default SideBar;
