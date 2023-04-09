import {useContext, useEffect, useState} from "react";
import {CloseCircle, TickCircle} from "iconsax-react";
import {sendTeamPostulation} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";
import {getTeamTemporal} from "../../services/teamService";

export default function TemporalTeamPostulate(params) {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [teamTemporal, setTeamTemporal] = useState(undefined)
    const errorMessage = "An error has occurred loading temporal team. Please, try again later"
    const errorMessageRequest = "An error has occurred while postulation temporal team. Please, try again later"


    useEffect(() => {
        if (params.project.team_assigned !== null) {
            return
        }

        getTeamTemporal(params.project.pid).then((temporalTeamResponse) => {
            if (temporalTeamResponse === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                let members = []
                let teams = []

                temporalTeamResponse[0].members.map((user) => {
                    members.push(user.uid)
                    return null
                })

                params.postulations.map((team) => {
                    teams.push(team.tid)
                    return null
                })

                if (!teams.includes(temporalTeamResponse[0].tid) && members.includes(context.user.uid)) {
                    setTeamTemporal(temporalTeamResponse[0]);
                }

            }
        }).catch((error) => {
            console.log(error)
        });
    }, [context.user.uid, params.project.pid, params.project.team_assigned]);

    const finishRejectButton = () => {
        setTeamTemporal(undefined)
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

        const postulate = () => {
            setLoading(true)
            const body = {
                tid: teamTemporal.tid,
                pid: params.project.pid,
                estimated_budget: params.project.tentative_budget,
                currency: "DOLAR",
                proposal_description: "Your temporal team accept your offer"
            }

            sendTeamPostulation(body).then((response) => {
                if (response === undefined) {
                    if (context.errorMessage !== errorMessageRequest) {
                        context.setErrorMessage(errorMessageRequest);
                    }
                } else {
                    setTeamTemporal(undefined)
                }
                setLoading(false)
            })
        }

        if (loading) {
            return (
                <div className="loading-button">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size="48" color="#014751" variant="Bold" className={"icon-button"} onClick={postulate}/>
            )
        }
    }

    if (teamTemporal !== undefined) {
        return (
            <div className="invitation-container">
                <div className="invitation">
                    <div>
                        Your are member of <b>{teamTemporal.name}</b>, Do you want to postulate it for this project?
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
