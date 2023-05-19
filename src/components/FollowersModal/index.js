import './style.css'
import {CloseCircle, People, SearchNormal1, User} from "iconsax-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function FollowersModal(params) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [buttonSelected, setButtonSelected] = useState("Following")

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }

    const userView = (data) => {
        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className="member-photo">
                        <User color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt='' className="member-photo"/>
            }
        }

        const user_link = "/user/" + data.uid

        return (
            <div key={data.uid} className="add-member">
                <div className="member">
                    {user_image(data)}
                    <div className="member-name" onClick={() => {
                        navigate(user_link)
                    }}>
                        {data.name} {data.lastname}
                        <div className="email">
                            {data.email}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const teamView = (data) => {

        const user_link = "/team/" + data.tid

        return (
            <div key={data.tid} className="add-member">
                <div className="member">
                    <div className="member-photo">
                        <People color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                    <div className="member-name" onClick={() => {
                        navigate(user_link)
                    }}>
                        {data.name}
                    </div>
                </div>
            </div>
        )
    }

    const filterView = () => {
        if (buttonSelected === "Following") {
            return (
                <>
                    {params.userData.following_info.users.map((data) => {
                        if (data.name.includes(search) || data.lastname.includes(search) || data.email.includes(search)) {
                            return userView(data)
                        }
                    })}
                </>
            )
        } else if (buttonSelected === "Followers") {
            return (
                <>
                    {params.userData.followers_info.map((data) => {
                        if (data.name.includes(search) || data.lastname.includes(search) || data.email.includes(search)) {
                            return userView(data)
                        }
                    })}
                </>
            )
        } else {
            return (
                <>
                    {params.userData.following_info.teams.map((data) => {
                        if (data.name.includes(search)) {
                            return teamView(data)
                        }
                    })}
                </>
            )
        }
    }

    return (
        <div className="modal-container">
            <div className="form-text-modal">
                Social
            </div>
            <div className="search-member-input">
                <input type="text" value={search}
                       className="search-input-text"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
            </div>
            <div className="buttons-filter">
                <button
                    className={buttonSelected === "Following" ? "button-members-selected" : "button-members"}
                    onClick={() => {
                        setButtonSelected("Following")
                    }}>
                    {params.userData.following.users.length} Following
                </button>
                <button className={buttonSelected === "Teams" ? "button-members-selected" : "button-members"}
                        onClick={() => {
                            setButtonSelected("Teams")
                        }}>
                    {params.userData.following.teams.length} Teams
                </button>
                <button
                    className={buttonSelected === "Followers" ? "button-members-selected" : "button-members"}
                    onClick={() => {
                        setButtonSelected("Followers")
                    }}>
                    {params.userData.followers.length} Followers
                </button>
            </div>
            <div className="memberDiv">
                {filterView()}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
