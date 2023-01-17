import './style.css'
import {useContext, useState} from "react";
import {ArrowCircleLeft, ArrowCircleRight, CloseCircle, Star1, TickCircle, User} from "iconsax-react";
import TechnologyTag from "../TechnologyTag";
import {updateTeamPostulation} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";

export default function PostulationsModal(params) {
    let context = useContext(AppContext);

    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false);

    if (params.postulations.length === 0) {
        return
    }

    const seeMore = () => {
        setShowMore(!showMore)
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
                window.location.reload()
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
            <div className={context.size ? "postulation-team-view-reduce" : "postulation-team-view"}>
                <div className={context.size ? "team-postulation-info-reduce" : "team-postulation-info"}>
                    <div className="team-postulation-name">
                        {data.team.name}
                        <div className="team-postulation-star">
                            <Star1 size="16" color="#ECA95A" variant="Linear" className={"star"}/>
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
                        <div className={context.size ? "team-postulation-budget-reduce" : "team-postulation-budget"}>
                            {formatter.format(data.estimated_budget)}
                            <div className="usd">
                                USD
                            </div>
                        </div>
                    </div>
                </div>
                <div className={context.size ? "descriptionContainerReduce" : "descriptionContainer"}>
                    Descripción
                    <div className="description-modal">
                        {showMore ? data.proposal_description.substring(0, data.proposal_description.length) : data.proposal_description.substring(0, 600)}
                        {showMore || data.proposal_description.length < 600 ? "" : "..."}
                    </div>
                    <div className={"seeMore"} onClick={seeMore}>
                        {data.proposal_description.length < 600 ? null : !showMore ?
                            "Ver Más" : "Ver Menos"}
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
                <CloseCircle className={"button"} size="48px" color="#CD5B45" variant="Bold" onClick={() => {
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
                <TickCircle size="48" className={"button"} color="#014751" variant="Bold" onClick={() => {
                    postulationButton("ACCEPTED")
                }}/>
            )
        }
    }

    return (
        <div className={"user-team-container"}>
            <div className="postulation-view-modal">
                {postulationView(params.postulations[index])}
            </div>
            <div className="postulations-buttons">
                <ArrowCircleLeft
                    size="24"
                    className={"button"}
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
                    className={"button"}
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
