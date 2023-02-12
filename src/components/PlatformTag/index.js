import './style.css';
import {isMobile} from "react-device-detect";
export default function PlatformTag (params) {
    return (
        <div key={params.platform} className={isMobile ? "platform-tag-mobile" : "platform-tag"}>
            {params.platform}
        </div>
    )
}
