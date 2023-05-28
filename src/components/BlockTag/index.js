import './style.css';
import {Lock} from "iconsax-react";
import {isMobile} from "react-device-detect";

export default function BlockTag() {
    return (
        <div className={isMobile ? "blocked-tag-mobile" : "blocked-tag"}>
            <Lock size={isMobile ? "32" : "20"} color="#FAFAFA" className={"icon"}/>
            Blocked
        </div>
    )
}
