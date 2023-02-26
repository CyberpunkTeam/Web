import './style.css'
import {Ranking, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import {isMobile} from "react-device-detect";
import {Link} from "react-router-dom";

export default function ReviewComponent(params) {
    let context = useContext(AppContext);
    const [length, setLength] = useState(1);
    const less = () => {
        setLength(1)
    }

    const more = () => {
        setLength(params.reviews.length)
    }

    const viewMore = () => {
        if (params.reviews.length <= 1) {
            return (<div className={isMobile ? "view-more-mobile" : "view-more"}/>)
        }

        if (length === 1) {
            return (
                <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={more}>
                    {`Show More (+${params.reviews.length - 1})`}
                </div>
            )
        }

        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={less}>
                Show Less
            </div>
        )

    }

    const reviewView = (data) => {
        if (params.reviews.length === 0) {
            return;
        }

        return (
            <div key={data.pid} className={isMobile ? "data-info-mobile" : "data-info"}>
                <Link to={"/projects/" + data.pid} className={isMobile ? "team-link-mobile" : "team-link"}>
                    {data.project.name}
                </Link>
                <div className={isMobile ? "reviewRatingMobile" : "reviewRatingInfo"}>
                    <Star1 size={isMobile ? "40" : "20"} color="#ECA95A" variant="Linear" className={"star"}/>
                    {data.rating}
                </div>
            </div>
        )
    }

    if (params.reviews.length === 0) {
        return (
            <div className={isMobile ? "teamWithoutReviewsContainerMobile" : context.size ? "teamWithoutReviewsContainerReduced" : "teamWithoutReviewsContainer"}>
                <div className={isMobile ? "user-info-mobile" : "user-info"}>
                    <div className={isMobile ? "data-title-mobile" : "data-title"}>
                        <Ranking size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                        Without Reviews
                    </div>
                </div>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={length === 1 ? "user-info-container-mobile-condensed" : "user-info-container-mobile"}>
                <div className="user-info-mobile">
                    <div className="data-title-mobile">
                        <Ranking size="80" color="#014751" className="icon"/>
                        Reviews
                    </div>
                    {params.reviews.slice(0, length).map((data) => {
                        return reviewView(data)
                    })}
                    {viewMore()}
                </div>
            </div>
        )
    }

    return (
        <div className={context.size ? "teamReviewsContainerReduced" : length === 1 ? "teamReviewsContainer" : "teamReviewsAllContainer"}>
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Ranking size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                    Reviews
                </div>
                {params.reviews.slice(0, length).map((data) => {
                    return reviewView(data)
                })}
                {viewMore()}
            </div>
        </div>
    )
}
