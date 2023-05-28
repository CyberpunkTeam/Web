import './style.css'

import {useContext, useEffect, useState} from "react";
import {CloseCircle, TickCircle} from "iconsax-react";
import {finishProject, getRequestFinishProject} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function ProjectFinish(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [finish, setFinish] = useState(undefined);
    const errorMessage = "An error has occurred while marking this project as completed. Please, try again later"
    const errorMessageRequest = "An error has occurred while getting completion requests. Please, try again later"

    useEffect(() => {
        if (params.project.team_assigned === null) {
            return
        }

        if (params.project.team_assigned.owner !== context.user.uid) {
            return;
        }

        getRequestFinishProject(params.project.team_assigned.tid, params.project.pid, context).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessageRequest) {
                    context.setErrorMessage(errorMessageRequest);
                }
                return;
            }
            if (r.length !== 0) {
                for (let i = 0; i < r.length; i++) {
                    if (r[i].state === "PENDING") {
                        setFinish(r[i])
                        return
                    }
                }
            }

        }).catch((error) => {
            console.log(error)
        });
    }, [context.user.uid, params.project.pid, params.project.team_assigned]);

    const finishRejectButton = () => {
        setLoading(true)
        const body = {
            "state": "REJECTED",
            "pid": params.project.pid,
            "tid": params.project.team_assigned.tid,
            "request_id": finish.pfr_id
        }

        finishProject(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                setFinish(undefined)
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
                <CloseCircle size="48px" color="#CD5B45" variant="Bold" className={"icon-button"}
                             onClick={finishRejectButton}/>
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
                <TickCircle size="48" color="#014751" variant="Bold" className={"icon-button"} onClick={() => {
                    navigate("/review", {state: {project: params.project, isProject: true, request: finish}})
                }}/>
            )
        }
    }

    if (params.project.internal_state === "BLOCKED") {
        return null;
    }

    if (finish !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        <b>{params.project.creator.name} {params.project.creator.lastname}</b> requested the completion
                        of this project
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
