import './style.css'

import {getPostulantTeamInvitations, updateInvitation} from "../../services/invitationService";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle, TickCircle} from "iconsax-react";

export default function TeamInvitation(params) {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(false)

    const [invitation, setInvitation] = useState(undefined);

    useEffect(() => {
        getPostulantTeamInvitations(context.user.uid, params.tid).then((r) => {
            if (r.length !== 0) {
                if (r[0].state === "PENDING") {
                    setInvitation(r[0])
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }, [params.tid, context.user.uid]);
    const invitationButton = (status) => {
        setLoading(true)
        const body = {
            "state": status
        }

        updateInvitation(invitation.tiid, body).then(() => {
            setLoading(false)
            setInvitation(undefined)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
        })
    }

    const rejectButton = () => {
        if (loading) {
            return (
                <div className="loading-button-reject">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <CloseCircle size="48px" color="#CD5B45" variant="Bold" onClick={() => {
                    invitationButton("REJECTED")
                }}/>
            )
        }
    }
    const acceptButton = () => {
        if (loading) {
            return (
                <div className="loading-button">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size="48" color="#014751" variant="Bold" onClick={() => {
                    invitationButton("ACCEPTED")
                }}/>
            )
        }
    }

    if (invitation !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        <b>{params.owner.name} {params.owner.lastname}</b> te invitó a unirte a este equipo
                    </div>
                    <div className="postulations-buttons-container">
                        {rejectButton()}
                        {acceptButton()}
                    </div>
                </div>
            </div>
        )
    }

}
