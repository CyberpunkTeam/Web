import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {finishProject} from "../../services/notificationService";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Star1} from "iconsax-react";
import {projectReview} from "../../services/projectService";
import {teamReview} from "../../services/teamService";

export default function ReviewScreen() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [loading, setLoading] = useState(false)
    const [rate, setRate] = useState(0)

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

    return (
        <div className="profile-screen">
            <div className={"reviewContainer"}>
                {state.isProject ? state.project.name : state.project.team_assigned.name}
                <div className="reviewRating">
                    <div className="reviewRatingData">
                        {state.isProject ? "Calificación del Proyecto" : "Calificación del Equipo"}
                        <div className={"stars"}>
                            {[1, 2, 3, 4, 5].map((value) => {
                                return star(value);
                            })}
                        </div>
                    </div>
                </div>
                <div className="review-buttons">
                    <button disabled={loading} className={"review-red-button"} onClick={goBack}>
                        Cancelar
                    </button>
                    <button disabled={loading || rate === 0}
                            className={loading || rate === 0 ? "review-green-button-disabled" : "review-green-button"}
                            onClick={finishButton}>
                        {loading ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {loading ? "" : "Finalizar"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
