import './style.css';
import SideBar from "../../components/SideBar";
import user from "../../assests/user.jpg";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import NotFound from "../NotFound";

function ProfileScreen() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    console.log(context.user)

    const userCover = () => {
        return(
            <div className="front-page">
                <div className="user-container">
                    <img src={user} alt={'user'} className="user"/>
                </div>
                <div className="user-data-container">
                    <text className="name">
                        {context.user.name} {context.user.lastname}
                    </text>
                    <text className="extra-data">
                        {context.user.city}
                    </text>
                    <text className="extra-data">
                        {context.user.email}
                    </text>
                </div>
            </div>
        )
    }

    if (context.user === undefined || context.user === null) {
        return (
            <NotFound />
        )
    }
    else {
        return (
            <div className="profile-screen">
                <SideBar/>
                <div className="profile-container">
                    {userCover()}
                </div>
            </div>
        )
    }
}

export default ProfileScreen;
