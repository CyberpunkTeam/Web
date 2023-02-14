import './style.css';
import {isMobile} from "react-device-detect";

export default function BudgetTag(params) {
    return (
        <div key={params.budget} className={isMobile ? "budget-tag-mobile" : "budget-tag"}>
            {params.budget}
        </div>
    )
}
