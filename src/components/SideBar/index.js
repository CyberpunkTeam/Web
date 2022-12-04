import './style.css';
import logo from "../../assests/logo-complete.svg";
import {Link} from "react-router-dom";
import user from "../../assests/user.jpg";
import {Setting2} from "iconsax-react";

function SideBar() {
    return (
        <div className="navbar">
            <div className="top">
                <Link to="/">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
            </div>
            <div className="bottom">
                <img src={user} alt='' className="user-sidebar"/>
                <Setting2 className="settings" color="rgb(46, 153, 153)" variant="outline" size={28}/>
            </div>
        </div>
    )

}

export default SideBar;
