
import {useContext, useEffect, useState} from "react";
import {CloseCircle, TickCircle} from "iconsax-react";
import {abandonProject} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";
import {getRequestAbandonProject} from "../../services/projectService";

export default function LeaveProject(params) {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(undefined);
    const errorMessage = "An error has occurred while updating this project. Please, try again later"
    const errorMessageRequest = "An error has occurred while getting abandonment requests. Please, try again later"

    useEffect(() => {
        if (params.project.state !== "ABANDONS_REQUEST") {
            return
        }

        if (params.project.team_assigned.owner !== context.user.uid) {
            return;
        }

        getRequestAbandonProject(params.project.team_assigned.tid, params.project.pid, context).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessageRequest) {
                    context.setErrorMessage(errorMessageRequest);
                }
                return;
            }
            if (r.length !== 0) {
                for (let i = 0; i < r.length; i++) {
                    if (r[i].state === "PENDING") {
                        setRequest(r[i])
                        return
                    }
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }, [context.user.uid, params.project.pid, params.project.team_assigned, params.project.state]);

    const leaveRejectButton = (state) => {
        setLoading(true)

        const body = {
            "state": state,
            "request_id": request.par_id,
            "pid": params.project.pid,
            "tid": params.project.team_assigned.tid,
            "reasons" : request.reasons
        }

        abandonProject(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                setRequest(undefined)
                window.location.reload()
            }
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
        })
    }

    const rejectButton = () => {
        const reject = () => {
            leaveRejectButton("REJECTED")
        }

        if (loading) {
            return (
                <div className="loading-button-reject">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <CloseCircle size="48px" color="#CD5B45" variant="Bold" className={"icon-button"} onClick={reject}/>
            )
        }
    }
    const acceptButton = () => {
        const accept = () => {
            leaveRejectButton("ACCEPTED")
        }

        if (loading) {
            return (
                <div className="loading-button">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size="48" color="#014751" variant="Bold" className={"icon-button"} onClick={accept} />
            )
        }
    }

    if (params.project.internal_state === "BLOCKED") {
        return null;
    }

    if (request !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        Do you agree to abandon this project because: <b>{request.reasons[0]}</b>
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
