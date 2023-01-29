import './style.css'
import {useContext} from "react";
import AppContext from "../../utils/AppContext";
import ReviewComponent from "../ReviewComponent";
import TeamProjectInProgress from "../TeamProjectInProgress";

export default function TeamInformationView(params) {
    let context = useContext(AppContext);

    return (
        <div className="profile-data-container">
            <div className={context.size ? "teamInformationContainerReduced" : "teamInformationContainer"}>
                <ReviewComponent reviews={params.reviews}/>
                <TeamProjectInProgress projects={params.postulations}/>
            </div>
        </div>
    )

}
