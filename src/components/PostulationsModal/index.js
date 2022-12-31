import './style.css'
import {useState} from "react";
import {ArrowCircleLeft, ArrowCircleRight, CloseCircle, Star1, TickCircle, User} from "iconsax-react";
import TechnologyTag from "../TechnologyTag";
import {updateTeamPostulation} from "../../services/notificationService";

export default function PostulationsModal(params) {
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)

    if (params.postulations.length === 0) {
        return
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const postulationButton = (status) => {
        const body = {
            "ppid": params.postulations[index].ppid,
            "state": status
        }
        setLoading(true)
        updateTeamPostulation(body).then((r) => {
            if (status === "ACCEPTED") {
                params.changePostulations([])
            } else {
                let post = [...params.postulations]
                post.splice(index, 1);
                params.changePostulations(post)
            }
            setLoading(false)
        })
    }

    const showTeamMembers = (data) => {

        if (data.profile_image === "default") {
            return (
                <div className="member-photo-postulation">
                    <div className="photo-postulations">
                        <User color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                </div>
            )

        } else {
            return (
                <div className="member-photo-postulation">
                    <img src={data.profile_image} alt='' className="photo-postulations"/>
                </div>
            )
        }
    }
    const postulationView = (data) => {
        return (
            <div className="postulation-team-view">
                <div className="team-postulation-name">
                    {data.team.name}
                    <div className="team-postulation-star">
                        <Star1 size="16" color="#2E9999" variant="Bold" className={"icon"}/>
                        5.0
                    </div>
                </div>
                <div className="members-postulation">
                    {data.team.members.map((user) => {
                        return showTeamMembers(user)
                    })}
                </div>
                <div className="team-postulation-data">
                    Herramientas
                    <div className="tags-modal">
                        {data.team.technologies.map((data) => {
                            return <TechnologyTag key={data + "-modal"} technology={data}/>
                        })}
                    </div>
                </div>
                <div className="team-postulation-data">
                    Presupuesto propuesto
                    <div className="team-postulation-budget">
                        {formatter.format(data.estimated_budget)}
                        <div className="usd">
                            USD
                        </div>
                    </div>
                </div>
                <div className="team-postulation-description">
                    Descripción
                    <div className="team-postulation-description-data">
                        {data.proposal_description}
                    </div>
                </div>

            </div>
        )
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
                    postulationButton("REJECTED")
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
                    postulationButton("ACCEPTED")
                }}/>
            )
        }
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Postulaciones
            </div>
            <div className="postulation-view-modal">
                {postulationView(params.postulations[index])}
            </div>
            <div className="postulations-buttons">
                <ArrowCircleLeft
                    size="24"
                    color={index !== 0 ? "#AAAAAA" : "#F1F1F1"}
                    onClick={() => {
                        if (index !== 0) {
                            setIndex(index - 1)
                        }
                    }}
                />
                <div className="postulations-buttons-container">
                    {rejectButton()}
                    {acceptButton()}
                </div>
                <ArrowCircleRight
                    size="24"
                    color={params.postulations.length - 1 !== index ? "#AAAAAA" : "#F1F1F1"}
                    onClick={() => {
                        if (params.postulations.length - 1 !== index) {
                            setIndex(index + 1)
                        }
                    }}
                />
            </div>
        </div>
    )

}
