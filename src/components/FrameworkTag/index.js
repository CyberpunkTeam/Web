import './style.css';
import {isMobile} from "react-device-detect";
export default function FrameworkTag (params) {
    return (
        <div key={params.framework} className={isMobile ? "framework-tag-mobile" : "framework-tag"}>
            {params.framework}
        </div>
    )
}
