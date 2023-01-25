import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {finishProject} from "../../services/notificationService";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Star1} from "iconsax-react";
import {getProjectReview, projectReview} from "../../services/projectService";
import {getTeamReview, teamReview} from "../../services/teamService";
import Loading from "../../components/loading";

export default function ReviewScreen() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [rate, setRate] = useState(0)

    useEffect(() => {
        if (state.isProject) {
            getProjectReview(state.project.pid, state.project.team_assigned.tid).then((r) => {
                setReview(r);
                setIsLoading(false);
            })
        } else {
            getTeamReview(state.project.pid, state.project.team_assigned.tid).then((r) => {
                setReview(r);
                setIsLoading(false);
            })
        }
    }, [state.isProject, state.project.pid, state.project.team_assigned.tid]);

    const changeRate = (value) => {
        setRate(value)
    }

    const goBack = () => {
        navigate("/projects/" + state.project.pid)
    }

    const finishButton = () => {
        setLoading(true)
        const rateBody = {
            "rating": rate,
            "pid": state.project.pid,
            "tid": state.project.team_assigned.tid
        }

        if (state.isProject) {
            projectReview(rateBody).then(() => {
                const body = {
                    "state": "ACCEPTED",
                    "pid": state.project.pid,
                    "tid": state.project.team_assigned.tid,
                    "request_id": state.request.pfr_id
                }
                finishProject(body).then(() => {
                    setLoading(false)
                    goBack();
                }).catch((e) => {
                    console.log(e)
                    setLoading(false)
                })
            }).catch((e) => {
                console.log(e)
                setLoading(false)
            })
        } else {
            teamReview(rateBody).then(() => {
                setLoading(false)
                goBack();
            }).catch((e) => {
                console.log(e)
                setLoading(false)
            })
        }
    }

    const star = (value) => {
        return (
            <Star1 size="28"
                   key={value}
                   color="#014751"
                   variant={rate < value ? "Outline" : "Linear"} className={"iconRating"}
                   onClick={() => {
                       changeRate(value)
                   }
                   }/>
        )
    }

    if (isLoading) {
        return <Loading />
    }

    if (review.length !== 0) {
        return (
            <div className="profile-screen">
                <div className={"reviewCompleteContainer"}>
                    {state.isProject ? "You already reviewed this project" : "You already reviewed this team"}
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }

    return (
        <div className="profile-screen">
            <div className={"reviewContainer"}>
                Review the {state.isProject ?  "Project: " + state.project.name : "Team: " + state.project.team_assigned.name}
                <div className="reviewRating">
                    <div className="reviewRatingData">
                        How would you rate it?
                        <div className={"stars"}>
                            {[1, 2, 3, 4, 5].map((value) => {
                                return star(value);
                            })}
                        </div>
                    </div>
                </div>
                <div className="review-buttons">
                    <button disabled={loading} className={"review-red-button"} onClick={goBack}>
                        Cancel
                    </button>
                    <button disabled={loading || rate === 0}
                            className={loading || rate === 0 ? "review-green-button-disabled" : "review-green-button"}
                            onClick={finishButton}>
                        {loading ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {loading ? "" : "Send Review"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
