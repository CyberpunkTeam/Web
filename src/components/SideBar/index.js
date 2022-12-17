import './style.css';
import logo from "../../assests/logo-complete.svg";
import {Link} from "react-router-dom";
import {Setting2, User, Notification, Message, Notepad2} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";

function SideBar() {
    let context = useContext(AppContext);
    const [watchNotifications, setWatchNotifications] = useState(false)

    const closeNotification = () => {
        setWatchNotifications(!watchNotifications);
    }

    const user_image = () => {
        if (context.user.image === undefined) {
            return (
                <div className="user-sidebar">
                    <User color="#FAFAFA" size="20px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={user} alt='' className="user-sidebar"/>
        }
    }

    const notificationHover = () => {
        if (watchNotifications) {
            return (
                <>
                    <div id="notifications" className="notification-list">
                        <div>
                            Notificaciones
                        </div>
                        <li>
                            Juan Antono Peréz te invito a su equipo Juan Team
                        </li>
                        <li>
                            Juan Antono Peréz te invito a su equipo Juan Team
                        </li>
                        <li>
                            Juan Antono Peréz te invito a su equipo Juan Team
                        </li>
                        <li>
                            Juan Antono Peréz te invito a su equipo Juan Team
                        </li>
                    </div>
                </>
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
                        <span className="notification-numbers">4</span>
                    </div>
                    <Message className="settings" color="rgb(46, 153, 153)" variant="Outline" size={28}/>
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
