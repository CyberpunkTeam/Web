import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import NotFound from "../NotFound";
import {User} from "iconsax-react";

function ProfileScreen() {
    let context = useContext(AppContext);

    console.log(context.user)

    const user_image = () => {
        if (context.user.image === undefined) {
            return (
                <div className="user-svg">
                    <User color="#FAFAFA" size="50px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={image} alt={'user'} className="user"/>
        }
    }

    const image = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

    const userCover = () => {
        return (
            <div className="front-page">
                <div className="user-container">
                    {user_image()}
                </div>
                <div className="user-data-container">
                    <text className="name">
                        {context.user.name} {context.user.lastname}
                    </text>
                    <text className="extra-data">
                        {context.user.location}
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
            <NotFound/>
        )
    } else {
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
