import './style.css';
import {isMobile} from "react-device-detect";
export default function CloudTag (params) {
    return (
        <div key={params.cloud} className={isMobile ? "cloud-tag-mobile" : "cloud-tag"}>
            {params.cloud}
        </div>
    )
}
