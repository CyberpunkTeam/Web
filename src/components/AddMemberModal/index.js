import {sendInvitation} from "../../services/notificationService";
import {AddCircle, SearchNormal1, User} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function AddMemberModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState("")

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }

    const sendMemberInvitation = (uid) => {
        const body = {
            "sender_id": context.user.uid,
            "receiver_id": uid,
            "tid": params.tid
        }
        sendInvitation(body).then((r) => {
            console.log(r)
        }).catch()
    }

    const memberView = (data) => {
        if (params.members.includes(data.uid)) {
            return
        }

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


        if (data.name.toLowerCase().includes(search.toLowerCase()) || data.lastname.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase())) {
            return (
                <div key={data} className="add-member">
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
                    <div className="add-user">
                        <AddCircle size="24" color="#B1B1B1" onClick={() => {
                            sendMemberInvitation(data.uid)
                        }}/>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Agregar Miembro
            </div>
            <div className="search-member-input">
                <input type="text" value={search}
                       className="search-input-text"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
            </div>
            <div className="memberDiv">
                {params.users.map((data) => {
                    return memberView(data)
                })}
            </div>
        </div>
    )

}
