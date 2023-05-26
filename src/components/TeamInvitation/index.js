import './style.css'

import {getPostulantTeamInvitations, updateInvitation} from "../../services/invitationService";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle, TickCircle} from "iconsax-react";
import {addMemberOnTeamChat} from "../../services/firebaseStorage";

export default function TeamInvitation(params) {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState(Date.now());
    const errorMessageRequest = "An error has occurred while loading invitations. Please, try again later"
    const errorMessage = "An error has occurred while updating this invitation. Please, try again later"
    const [invitation, setInvitation] = useState(undefined);

    useEffect(() => {
        getPostulantTeamInvitations(context.user.uid, params.tid, context).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessageRequest) {
                    context.setErrorMessage(errorMessageRequest);
                }
                return;
            }
            if (r.length !== 0) {
                if (r[0].state === "PENDING") {
                    setInvitation(r[0])
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }, [params.tid, context.user.uid, time]);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => setTime(Date.now()), 10000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [loading]);
    const invitationButton = (status) => {
        setLoading(true)

        updateInvitation(invitation.tiid, {"state": status}, context).then(async (r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                if (status === "ACCEPTED") {
                    await addMemberOnTeamChat(params.team, context.user)
                }
                setInvitation(undefined)
            }
            setLoading(false)
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
                        <b>{params.owner.name} {params.owner.lastname}</b> invited you to join this team
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
