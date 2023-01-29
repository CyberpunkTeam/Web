import './style.css'
import {Ranking} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import {isMobile} from "react-device-detect";

export default function ReviewComponent(params) {
    let context = useContext(AppContext);
    const [length, setLength] = useState(1);

    /*if (Object.keys(params.userData).length === 0) {
        return;
    }

    const less = () => {
        setLength(1)
    }

    const more = () => {
        setLength(params.userData.user.education.length)
    }


    const viewMore = () => {
        if (params.userData.user.education.length <= 1) {
            return (<div className={isMobile ? "view-more-mobile" : "view-more"}/>)
        }

        if (length === 1) {
            return (
                <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={more}>
                    {`Show More (+${params.userData.user.education.length - 1})`}
                </div>
            )
        }

        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={less}>
                Show Less
            </div>
        )

    }

    const experienceView = (data) => {
        if (params.userData.user.education.length === 0) {
            return;
        }

        return (
            <div key={data.title} className={isMobile ? "data-info-mobile" : "data-info"}>
                {data.title}
                <div className={isMobile ? "education-info-mobile" : "education-info"}>
                    {data.institution}
                    <div>
                        {data.start_date.split('-')[0]} - {data.finished ? data.finish_date.split('-')[0] : "Actual"}
                    </div>
                </div>
            </div>
        )
    }*/

    if (isMobile) {
        return (
            <div className={length === 1 ? "user-info-container-mobile-condensed" : "user-info-container-mobile"}>
                <div className="user-info-mobile">
                    <div className="data-title-mobile">
                        <Ranking size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                        Reviews
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={context.size ? "teamReviewsContainerReduced" : "teamReviewsContainer"}>
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Ranking size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                    Reviews
                </div>
                Aaa
            </div>
        </div>
    )
}
