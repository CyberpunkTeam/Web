import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle, TickCircle} from "iconsax-react";
import DatePicker from "react-datepicker";

export default function AddExperienceModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [position, setPosition] = useState( "");
    const [company, setCompany] = useState( "");
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [actualDate, setActualDate] = useState(false);

    const ActualJob = () => {
        setActualDate(!actualDate)
    }

    const setPositionHandler = (event) => {
        setPosition(event.target.value);
    }

    const setCompanyHandler = (event) => {
        setCompany(event.target.value);
    }

    const setStartDateHandler = (date) => {
        setStartDate(date);
    }

    const setFinishDateHandler = (date) => {
        setFinishDate(date);
    }


    const createEducationButton = () => {
        setButtonDisabled(true)
        let workExperience = [...context.user.work_experience]
        const newWorkExperience =
            {
                "position": position,
                "company": company,
                "start_date": `${startDate.getFullYear()}-${parseInt(startDate.getMonth().toString()) + 1}-${startDate.getDate()}`,
                "finish_date": `${finishDate.getFullYear()}-${parseInt(finishDate.getMonth().toString()) + 1}-${finishDate.getDate()}`,
                "finished": actualDate
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
            <div className="labelPadding">
                Start Date
                <DatePicker selected={startDate} showMonthYearPicker dateFormat="MM/yyyy" className="input"
                            onChange={setStartDateHandler}/>
            </div>
            <div className={"checkRow"}>
                <div className={"checkRowButton"} onClick={ActualJob}>
                    {actualDate ? <TickCircle size="20" variant="Bold" color="#014751"/> : null}
                </div>
                I currently have this position
            </div>
            <div className={actualDate ? "labelDisable": "label"}>
                <div>
                    End Date
                    <DatePicker selected={actualDate ? "" : finishDate} readOnly={actualDate} showMonthYearPicker dateFormat="MM/yyyy" className={actualDate ? "inputDisable" : "input"}
                                onChange={setFinishDateHandler}/>
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
