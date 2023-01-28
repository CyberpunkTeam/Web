import './style.css'
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";
import {UserCirlceAdd} from "iconsax-react";

export default function MemberPostulationView(params) {
    const [showMore, setShowMore] = useState(false);
    let context = useContext(AppContext);
    const seeMore = () => {
        setShowMore(!showMore)
    }

    if (params.owner !== context.user.uid) {
        return (
            <div key={params.data.ppid} className="vacantPostulationContainer">
                <div className={isMobile || context.size ? "vacantDataMobile" : "vacantData"}>
                    <div className={isMobile || context.size ? "vacantInfoContainerReduced" : "vacantInfoContainer"}>
                        <div className="vacantPostulationsTitle">
                            {params.data.title}
                        </div>
                        <div className="vacantDescription">
                            Description
                            <div className="vacantPostulationDescription">
                                {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                                {showMore || params.data.description.length < 600 ? "" : "..."}
                            </div>
                            <div className={"seeMore"} onClick={seeMore}>
                                {params.data.description.length < 600 ? null : !showMore ?
                                    "Show More" : "Show Less"}
                            </div>
                        </div>
                    </div>
                    <button className="postulateVacantButton">
                        <UserCirlceAdd color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                        Postulate
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div key={params.data.ppid} className="teamPostulationContainer">
            <div className={context.size ? "teamPostulationInfoReduce" : "teamPostulationInfo"}>
                <div className={context.size ? "vacantInfoReduce" : "vacantInfo"}>
                    <div className="vacantTitle">
                        {params.data.title}
                    </div>
                    <div>
                        Description
                        <div className="description-modal">
                            {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                            {showMore || params.data.description.length < 600 ? "" : "..."}
                        </div>
                        <div className={"seeMore"} onClick={seeMore}>
                            {params.data.description.length < 600 ? null : !showMore ?
                                "Show More" : "Show Less"}
                        </div>
                    </div>
                </div>
                <div className={context.size ? "vacantDescriptionContainerReduced" : "vacantDescriptionContainer"}>
                    {params.owner === context.user.uid ? "No Postulations" : "postulate"}
                </div>
            </div>
        </div>
    )
}
