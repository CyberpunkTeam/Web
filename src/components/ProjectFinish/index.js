import './style.css'

import {useContext, useEffect, useState} from "react";
import {CloseCircle, TickCircle} from "iconsax-react";
import {finishProject, getRequestFinishProject} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";

export default function ProjectFinish(params) {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [finish, setFinish] = useState(undefined);

    useEffect(() => {
        if (params.team === null) {
            return
        }

        if (params.team.owner !== context.user.uid) {
            return;
        }

        getRequestFinishProject(params.team.tid, params.pid).then((r) => {
            if (r.length !== 0) {
                if (r[0].state === "PENDING") {
                    setFinish(r[0])
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }, [params.pid]);

    const finishButton = (status) => {
        setLoading(true)
        const body = {
            "state": status,
            "pid": params.pid,
            "tid": params.team.tid
        }

        finishProject(body).then(() => {
            setLoading(false)
            setFinish(undefined)
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
                <CloseCircle size="48px" color="#CD5B45" variant="Bold" className={"icon-button"} onClick={() => {
                    finishButton("REJECTED")
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
                <TickCircle size="48" color="#014751" variant="Bold" className={"icon-button"} onClick={() => {
                    finishButton("ACCEPTED")
                }}/>
            )
        }
    }

    if (finish !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        <b>{params.owner.name} {params.owner.lastname}</b> solícito la finalización del proyecto
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
