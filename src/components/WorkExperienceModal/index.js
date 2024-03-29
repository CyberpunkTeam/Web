import {CloseCircle} from "iconsax-react";

export default function WorkExperienceModal(params) {
    const works = params.works
    const workView = (data) => {
        return (
            <div key={data.title + data.institution} className="education-data-info">
                <div className="line">
                    {data.position}
                    <div className="education-info">
                        {data.company}
                        <div>
                            {data.start_date.split('-')[0]} - {data.current_job ? data.finish_date.split('-')[0] : "Actual"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Experiencia
            </div>
            <div className="scrollDiv">
                {works.map((data) => {
                    return workView(data)
                })}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
