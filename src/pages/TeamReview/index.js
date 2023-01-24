import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Star1} from "iconsax-react";

import Loading from "../../components/loading";
import {getTeam} from "../../services/teamService";
import MemberReview from "../../components/MemberReview";

export default function TeamReview() {
    const params = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(undefined)
    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTeam(params.id).then((response) => {
            setTeam(response)
            console.log(response)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            navigate("/*")
        });
    }, [params.id]);


    if (isLoading) {
        return <Loading />
    }

    if (review.length !== 0) {
        return (
            <div className="profile-screen">
                <div className={"reviewCompleteContainer"}>
                    Ya realizaste la review
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }

    return (
        <div className="profile-screen">
            <div className={"reviewContainer"}>
                Complete the team review for the project
                <br/>
                {team.members.map((value) => {
                    return <MemberReview key={value.uid} user={value} />
                })}
                <div className="review-buttons">
                    <button disabled={loading} className={"review-red-button"}>
                        Cancelar
                    </button>
                    <button disabled={loading} className={loading  ? "review-green-button-disabled" : "review-green-button"}>
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
