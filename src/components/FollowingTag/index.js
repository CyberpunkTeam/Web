import './style.css';
import {isMobile} from "react-device-detect";

export default function FollowingTag() {
    return (
        <div className={isMobile ? "follow-tag-mobile" : "follow-tag"}>
            Following
        </div>
    )
}
