import './style.css';
import {isMobile} from "react-device-detect";

export default function BlockTag() {
    return (
        <div className={isMobile ? "blocked-tag-mobile" : "blocked-tag"}>
            Blocked
        </div>
    )
}
