import './style.css';
import {isMobile} from "react-device-detect";
export default function PreferenceTag (params) {
    return (
        <div key={params.preference} className={isMobile ? "pref-tag-mobile" : "pref-tag"}>
            {params.preference}
        </div>
    )
}
