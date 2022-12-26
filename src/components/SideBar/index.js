import './style.css';
import logo from "../../assests/logo-complete.svg";
import {Link, useNavigate} from "react-router-dom";
import {Setting2, User, Notification, Message, Notepad2, LampCharge} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {getNotifications, viewNotifications} from "../../services/notificationService";
import {addMember} from "../../services/teamService";

function SideBar() {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [watchNotifications, setWatchNotifications] = useState(false)


    useEffect(() => {
        getNotifications(context.user.uid).then((response) => {
            setNotifications(response);
            let notifications = []
            response.map((data) => {
                if (!data.viewed) {
                    notifications.push(data.nid);
                }
            })
            setUnreadNotifications(notifications);
        }).catch((error) => {
            console.log(error)
        });
    }, [context.user.uid]);

    const acceptInvitation = (tid) => {
        addMember(tid, context.user.uid).then((r) => {
            const link = "/team/" + tid
            navigate(link);
        }).catch((e) => {
            console.log(e)
        })
    }


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
        const notificationLi = (data) => {
            if (data.notification_type === "TEAM_INVITATION") {
                const link = "/team/" + data.resource_id
                return (
                    <li key={data.nid}>
                        <div onClick={() => {
                            navigate(link);
                        }}>
                            {data.content}
                        </div>
{/*                        <div className="invitation">
                            <button className="deny-invitation">
                                Rechazar
                            </button>
                            <button className="accept-invitation" onClick={() => {
                                acceptInvitation(data.resource_id)
                            }}>
                                Aceptar
                            </button>
                        </div>*/}
                    </li>
                )
            }
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
                <div id="notifications" className="notification-list">
                    <div>
                        Notificaciones
                    </div>
                    {showNotifications()}
                </div>
            )
        }
    }

    const user = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    return (
        <>
            {notificationHover()}
            <div className="navbar">
                <div className="top">
                    <Link to="/">
                        <img src={logo} className="logo-side" alt="logo"/>
                    </Link>
                    <div className="notification" onClick={() => {
                        closeNotification()
                    }}>
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
