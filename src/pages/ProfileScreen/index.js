import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import NotFound from "../NotFound";
import {AddCircle, People, Star1, User} from "iconsax-react";

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

    const user_data = () => {
        return (
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
        )
    }

    const team_user_view = () => {
        return(
            <div className="user-info-container">
                <AddCircle size="24" color="#B1B1B1" className="add-button"/>
                <div className="user-info">
                    <div className="data-title">
                        <People size="32" color="#014751" className={"icon"}/>
                        Teams
                    </div>
                    <div className="data-info">
                        Equipo Alfa
                        <div className="rank">
                            <Star1 size="24" color="#2E9999" variant="Bold" className={"icon"}/>
                            5.0
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    const image = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    const image_cover = 'https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'

    const cover = () => {
        return(
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                </div>
                <img src={image_cover} className="image-container" alt=""/>
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
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {team_user_view()}
                </div>
            </div>
        )
    }
}

export default ProfileScreen;
