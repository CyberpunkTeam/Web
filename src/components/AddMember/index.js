import {useContext, useState} from "react";
import {sendInvitation} from "../../services/notificationService";
import {AddCircle, TickCircle, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function AddMember(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const errorMessageRequest = "An error occurred while trying to send invitation"

    const sendMemberInvitation = (uid) => {
        setLoading(true)
        const body = {
            "sender_id": context.user.uid,
            "receiver_id": uid,
            "tid": params.tid
        }
        sendInvitation(body).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessageRequest) {
                    context.setErrorMessage(errorMessageRequest);
                }
            } else {
                let invitationsUpdated = [...params.invitations]
                invitationsUpdated.push(uid)
                params.setInvitations(invitationsUpdated)
            }
            setLoading(false)
        }).catch()
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

    const user_link = "/user/" + params.data.uid

    const invited = () => {
        return (
            <div className={"invited"}>
                <TickCircle size="24" className={"icon"} variant="Bold" color="#2E9999"/>
                Invited
            </div>
        )
    }

    const invite = (data) => {
        return (
            <div className={"invite"} onClick={() => {
                sendMemberInvitation(data.uid)
            }}>
                {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                    <AddCircle size="24" color="#B1B1B1" className={"icon"}/>}
                {loading ? "" : "Invite"}
            </div>
        )
    }

    return (
        <div key={params.data.uid} className="add-member">
            <div className="member">
                {user_image(params.data)}
                <div className="member-name" onClick={() => {
                    navigate(user_link)
                }}>
                    {params.data.name} {params.data.lastname}
                    <div className="email">
                        {params.data.email}
                    </div>
                </div>
            </div>
            <div className="add-user">
                {params.invitations.includes(params.data.uid) ? invited() : invite(params.data)}
            </div>
        </div>
    )


}
