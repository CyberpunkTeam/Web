import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import Loading from "../../components/loading";
import {createMembersTeamReview, getMembersTeamReview, getTeam} from "../../services/teamService";
import MemberReview from "../../components/MemberReview";
import AppContext from "../../utils/AppContext";

export default function TeamReview() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const {state} = useLocation();
    const [team, setTeam] = useState(undefined)
    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState({})
    const errorMessage = "An error has occurred while trying loading team's information. Please, try again later"
    const errorMessageReviews = "An error has occurred while loading team's member reviews. Please, try again later"
    const errorMessageReviewsSend = "An error has occurred while sending team's member reviews. Please, try again later"

    const updateReviews = (newReviews) => {
        setReviews(newReviews)
    }

    useEffect(() => {
        getMembersTeamReview(state.pid, params.id, context.user.uid, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessageReviews) {
                    context.setErrorMessage(errorMessageReviews);
                }
                return
            }
            setReview(response)
            if (response.length === 0) {
                getTeam(params.id, context).then((response) => {
                    if (response === undefined) {
                        if (context.errorMessage !== errorMessage) {
                            context.setErrorMessage(errorMessage);
                        }
                        return
                    }
                    setTeam(response)
                    setIsLoading(false)
                }).catch((error) => {
                    console.log(error)
                    navigate("/*")
                });
            } else {
                setIsLoading(false)
            }
        }).catch((error) => {
            console.log(error)
            navigate("/*")
        });
    }, [params.id, state.pid, navigate, context.user.uid]);


    if (isLoading) {
        return <Loading/>
    }

    if (review.length !== 0) {
        return (
            <div className="profile-screen">
                <div className={"reviewCompleteContainer"}>
                    You already reviewed the team
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }

    const sendReviews = () => {
        setLoading(true);
        Object.keys(reviews).map((value) => {
            const body = {
                pid: state.pid,
                tid: params.id,
                rating: reviews[value],
                member_reviewed: value,
                member_reviewer: context.user.uid
            }
           createMembersTeamReview(body, context).then((response) => {
                if (response === undefined) {
                    if (context.errorMessage !== errorMessageReviewsSend) {
                        context.setErrorMessage(errorMessageReviewsSend);
                    }
                }
            })
            return null;
        })
        context.setCreateMessage("Reviews sent successfully")
        navigate("/team/" + params.id)
        setLoading(false);
    }

    return (
        <div className="profile-screen">
            <div className={"reviewContainer"}>
                Complete the team's members review for the project
                <br/>
                {team.members.map((value) => {
                    return <MemberReview key={value.uid} user={value} updateReviews={updateReviews} reviews={reviews}/>
                })}
                <div className="review-buttons">
                    <button disabled={loading} className={"review-red-button"}>
                        Cancel
                    </button>
                    <button disabled={loading || Object.keys(reviews).length === 0}
                            className={loading || Object.keys(reviews).length === 0 ? "review-green-button-disabled" : "review-green-button"}
                            onClick={sendReviews}
                    >
                        {loading ? <i className="fa fa-circle-o-notch fa-spin"/> : null}
                        {loading ? "" : "Send Reviews"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
