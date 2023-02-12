import './style.css';
import {isMobile} from "react-device-detect";
export default function DataBaseTag (params) {
    return (
        <div key={params.cloud} className={isMobile ? "database-tag-mobile" : "database-tag"}>
            {params.database}
        </div>
    )
}
