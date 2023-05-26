import './style.css'
import React, {useContext, useState} from "react";
import {ArrowCircleLeft, ArrowCircleRight, CloseCircle, Star1, TickCircle} from "iconsax-react";
import TechnologyTag from "../TechnologyTag";
import {updateTeamPostulation} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";
import {formatter} from "../../utils/budgetFormatter";
import PlatformTag from "../PlatformTag";
import FrameworkTag from "../FrameworkTag";
import CloudTag from "../CloudTag";
import PreferenceTag from "../PreferenceTag";
import {isMobile} from "react-device-detect";

export default function PostulationsModal(params) {
    let context = useContext(AppContext);

    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false);
    const errorMessage = "An error has occurred while updating the postulation request. Please, try again later"

    if (params.postulations.length === 0) {
        return (
            <div className={"no-data-tag"}>
                No postulations available
            </div>
        )
    }

    const seeMore = () => {
        setShowMore(!showMore)
    }

    const postulationButton = (status) => {
        const body = {
            "ppid": params.postulations[index].ppid,
            "state": status
        }
        setLoading(true)
        updateTeamPostulation(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
                setLoading(false)
                return
            }
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

    const postulationView = (data) => {

        const tools = () => {
            return (
                <div className={isMobile ? "team-postulation-data-mobile" : "team-postulation-data"}>
                    Tools
                    <div className="tags-modal">
                        {data.team.technologies.programming_language.map((data) => {
                            return <TechnologyTag key={data + "-modal"} technology={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.team.technologies.frameworks.map((data) => {
                            return <FrameworkTag key={data + "-modal"} framework={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.team.technologies.platforms.map((data) => {
                            return <PlatformTag key={data + "-modal"} platform={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.team.technologies.databases.map((data) => {
                            return <CloudTag key={data + "-modal"} cloud={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.team.idioms === null ? null : data.team.idioms.map((data) => {
                            return <PreferenceTag key={data + "-modal"} preference={data}/>
                        })}
                    </div>
                </div>
            )
        }

        if (isMobile) {
            return (
                <div className={"postulation-team-view-mobile"}>
                    <div className={"team-postulation-info-reduce"}>
                        <div className="team-postulation-name-mobile">
                            {data.team.name}
                            <div className="team-postulation-star-mobile">
                                <Star1 size="32" color="#ECA95A" variant="Linear" className={"star"}/>
                                {data.team.overall_rating.toFixed(1)}
                            </div>
                        </div>
                        {tools()}
                        <div className={isMobile ? "team-postulation-data-mobile" : "team-postulation-data"}>
                            Budget
                            <div className={"team-postulation-budget-mobile"}>
                                {formatter.format(data.estimated_budget)}
                                <div className="usd-mobile">
                                    USD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"descriptionContainerMobile"}>
                        Description
                        <div className="description-modal-mobile">
                            {showMore ? data.proposal_description.substring(0, data.proposal_description.length) : data.proposal_description.substring(0, 600)}
                            {showMore || data.proposal_description.length < 600 ? "" : "..."}
                        </div>
                        <div className={"seeMoreMobile"} onClick={seeMore}>
                            {data.proposal_description.length < 600 ? null : !showMore ?
                                "Show More" : "Show Less"}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={context.size ? "postulation-team-view-reduce" : "postulation-team-view"}>
                <div className={context.size ? "team-postulation-info-reduce" : "team-postulation-info"}>
                    <div className="team-postulation-name">
                        {data.team.name}
                        <div className="team-postulation-star">
                            <Star1 size="16" color="#ECA95A" variant="Linear" className={"star"}/>
                            {data.team.overall_rating.toFixed(1)}
                        </div>
                    </div>
                    {tools()}
                    <div className="team-postulation-data">
                        Budget
                        <div className={context.size ? "team-postulation-budget-reduce" : "team-postulation-budget"}>
                            {formatter.format(data.estimated_budget)}
                            <div className="usd">
                                USD
                            </div>
                        </div>
                    </div>
                </div>
                <div className={context.size ? "descriptionContainerReduce" : "descriptionContainer"}>
                    Description
                    <div className="description-modal">
                        {showMore ? data.proposal_description.substring(0, data.proposal_description.length) : data.proposal_description.substring(0, 600)}
                        {showMore || data.proposal_description.length < 600 ? "" : "..."}
                    </div>
                    <div className={"seeMore"} onClick={seeMore}>
                        {data.proposal_description.length < 600 ? null : !showMore ?
                            "Show More" : "Show Less"}
                    </div>
                </div>
            </div>
        )
    }


    const rejectButton = () => {
        if (loading) {
            return (
                <div className={isMobile ? "loading-button-mobile-reject" : "loading-button-reject"}>
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <CloseCircle className={"button"} size={isMobile ? 120 : 48} color="#CD5B45" variant="Bold"
                             onClick={() => {
                                 postulationButton("REJECTED")
                             }}/>
            )
        }
    }
    const acceptButton = () => {
        if (loading) {
            return (
                <div className={isMobile ? "loading-mobile-button" : "loading-button"}>
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size={isMobile ? 120 : 48} className={"button"} color="#014751" variant="Bold"
                            onClick={() => {
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
                    size={isMobile ? "80" : "24"}
                    className={"button"}
                    color={index !== 0 ? "#AAAAAA" : "#FAFAFA"}
                    onClick={() => {
                        if (index !== 0) {
                            setIndex(index - 1)
                        }
                    }}
                />
                <div className={isMobile ? "postulations-buttons-mobile-container" : "postulations-buttons-container"}>
                    {rejectButton()}
                    {acceptButton()}
                </div>
                <ArrowCircleRight
                    size={isMobile ? "80" : "24"}
                    className={"button"}
                    color={params.postulations.length - 1 !== index ? "#AAAAAA" : "#FAFAFA"}
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
