import './style.css';
import SideBar from "../../components/SideBar";
import user from "../../assests/user.jpg";

function ProfileScreen() {
    return (
        <>
            <SideBar/>
            <div className="profile-container">
                <div className="front-page">
                    <div className="user-container">
                        <img src={user} alt={'user'} className="user"/>
                    </div>
                    <div className="user-data-container">
                        <text className="name">
                            John Appleseed
                        </text>
                        <text className="extra-data">
                            Buenos Aires, Argentina
                        </text>
                        <text className="extra-data">
                            john.appleseed@gmail.com
                        </text>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProfileScreen;
