import './style.css'
import {ArrowDown2, Star1} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";

export default function MemberReview(params) {
    let context = useContext(AppContext);
    const [rate, setRate] = useState(0)
    const [participate, setParticipate] = useState("No")

    if (params.user.uid === context.user.uid) {
        return;
    }
    const changeRate = (value) => {
        setRate(value)
    }

    const setLanguageHandler = (event) => {
        setParticipate(event.target.value);
    }
    const star = (value) => {
        return (
            <Star1 size="28"
                   key={value}
                   color="#014751"
                   variant={rate < value ? "Outline" : "Linear"} className={"iconRating"}
                   onClick={() => {
                       changeRate(value)
                   }
                   }/>
        )
    }

    const showRating = () => {
        if (participate === "Yes") {
            return (
                <>
                    How would you rate it?
                    <div className={"stars"}>
                        {[1, 2, 3, 4, 5].map((value) => {
                            return star(value);
                        })}
                    </div>
                </>
            )
        }
    }

    return (
        <div className="reviewRating">
            <div className="reviewRatingData">
                <div className={"membersReviewContainer"}>
                    {params.user.name} {params.user.lastname}
                </div>
                Participated in the project?
                <label className="participation-label">
                    <div className="create-project-input">
                        <select value={participate} className="select" onChange={setLanguageHandler}>
                            <option value={"No"}>No</option>
                            <option value={"Yes"}>Yes</option>
                        </select>
                        <ArrowDown2 className="from-button" color="#B1B1B1" variant="Outline" size={20}/>
                    </div>
                </label>
                {showRating()}
            </div>
        </div>
    )
}
