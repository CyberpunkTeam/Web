import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle} from "iconsax-react";

export default function AddExperienceModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [position, setPosition] = useState( "");
    const [company, setCompany] = useState( "");
    const [startDate, setStartDate] = useState( "");
    const [finishDate, setFinishDate] = useState( "");

    const setPositionHandler = (event) => {
        setPosition(event.target.value);
    }

    const setCompanyHandler = (event) => {
        setCompany(event.target.value);
    }

    const setStartDateHandler = (event) => {
        setStartDate(event.target.value);
    }

    const setFinishDateHandler = (event) => {
        setFinishDate(event.target.value);
    }


    const createEducationButton = () => {
        setButtonDisabled(true)
        let workExperience = [...context.user.work_experience]
        const newWorkExperience =
            {
                "position": position,
                "company": company,
                "start_date": startDate,
                "finish_date": finishDate,
                "current_job": finishDate !== ""
            }

        workExperience.push(newWorkExperience)

        const body = {
            work_experience: workExperience
        }

        updateUser(context.user.uid, body).then((response) => {
            context.setUser(response);
            localStorage.setItem("user", JSON.stringify(response))
            setButtonDisabled(false)
            params.closeModal()
            window.location.reload()
        })
    }

    return (<div className="modal-container">
        <div className="form-text">
            Add Job Experience
        </div>
        <form className="modal-form">
            <div className="label">
                <label>
                    Position
                    <input type="text" value={position} className="input" onChange={setPositionHandler}/>
                </label>
            </div>
            <div className="label">
                <label>
                    Company
                    <input type="text" value={company} className="input" onChange={setCompanyHandler}/>
                </label>
            </div>
            <div className="label-double">
                <div className="label-double-column">
                    <label>
                        Start Date
                        <input type="date" value={startDate} placeholder="dd-mm-yyyy" min="1900-01-01"
                               max="2030-12-31" className="input-double" onChange={setStartDateHandler}/>
                    </label>
                </div>
                <div className="label-double-column">
                    <label>
                        End Date
                        <input type="date" value={finishDate} placeholder="dd-mm-yyyy" min="1900-01-01"
                               max="2030-12-31" className="input-double" onChange={setFinishDateHandler}/>
                    </label>
                </div>
            </div>
        </form>
        <div className="container-button-modal">
            <button className="cancel-edit-button-style" onClick={params.closeModal}>
                Cancel
            </button>
            <button disabled={buttonDisabled} className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"} onClick={createEducationButton}>
                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Add"}
            </button>
        </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
    </div>
    )
}
