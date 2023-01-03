import {Link} from "react-router-dom";
import {Star1} from "iconsax-react";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";

export default function UserEducationsModal(params) {
    const educations = params.educations
    const educationView = (data) => {
        return (
            <div key={data.title + data.institution} className="education-data-info">
                <div className="line">
                    {data.title}
                    <div className="education-info">
                        {data.institution}
                        <div>
                            {data.start_date.split('-')[0]} - {data.finished ? data.finish_date.split('-')[0] : "Actual"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Títulos y Certificaciones
            </div>
            <div className="scrollDiv">
                {educations.map((data) => {
                    return educationView(data)
                })}
            </div>
        </div>
    )

}
