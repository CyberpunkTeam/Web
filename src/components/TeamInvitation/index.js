import './style.css'

import {getPostulantTeamInvitations, updateInvitation} from "../../services/invitationService";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";

export default function TeamInvitation(params) {
    let context = useContext(AppContext);

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
        const body = {
            "state": status
        }

        updateInvitation(invitation.tiid, body).then((r) => {
            console.log(r)
            setInvitation(undefined)
        }).catch((e) => {
            console.log(e)
        })
    }

    if (invitation !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        <b>{params.owner.name} {params.owner.lastname}</b> te invitó a unirte a este equipo
                    </div>
                    <div>
                        <button className="deny-invitation" onClick={() => {
                            invitationButton("REJECTED")
                        }}>
                            Rechazar
                        </button>
                        <button className="accept-invitation" onClick={() => {
                            invitationButton("ACCEPTED")
                        }}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
