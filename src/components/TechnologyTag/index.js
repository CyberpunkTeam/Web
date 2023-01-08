import './style.css';
import {isMobile} from "react-device-detect";

export default function TechnologyTag(params) {
    return (
        <div key={params.technology} className={isMobile ? "tech-tag-mobile" : "tech-tag"}>
            {params.technology}
        </div>
    )
}
