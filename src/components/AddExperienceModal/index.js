import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle, TickCircle} from "iconsax-react";
import DatePicker from "react-datepicker";

export default function AddExperienceModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [actualDate, setActualDate] = useState(false);
    const errorMessageUpdate = "An error has occurred while updating user information. Please, try again later"

    const [errorPosition, setErrorPosition] = useState(false);
    const [errorCompany, setErrorCompany] = useState(false);
    const [errorStartDate, setErrorStartDate] = useState(false);
    const [errorFinishDate, setErrorFinishDate] = useState(false);
    const validateFields = () => {
        let error = false;

        if (position.length <= 3) {
            error = true;
            setErrorPosition(true)
        }

        if (company.length <= 3) {
            error = true;
            setErrorCompany(true)
        }

        if (!startDate) {
            error = true;
            setErrorStartDate(true)
        }

        if (!actualDate && !finishDate) {
            error = true;
            setErrorFinishDate(true)
        }

        return error;
    }

    const ActualJob = () => {
        setActualDate(!actualDate)
    }

    const setPositionHandler = (event) => {
        if (event.target.value.length > 3) {
            setErrorPosition(false)
        }
        setPosition(event.target.value);
    }

    const setCompanyHandler = (event) => {
        if (event.target.value.length > 3) {
            setErrorCompany(false)
        }
        setCompany(event.target.value);
    }

    const setStartDateHandler = (date) => {
        setErrorStartDate(false)
        setStartDate(date);
    }

    const setFinishDateHandler = (date) => {
        setErrorFinishDate(false)
        setFinishDate(date);
    }


    const createEducationButton = () => {
        if (validateFields()) {
            context.setErrorMessage("Please complete the required fields");
            return;
        }
        setButtonDisabled(true)
        let workExperience = [...context.user.work_experience]
        const newWorkExperience =
            {
                "position": position,
                "company": company,
                "start_date": `${startDate.getFullYear()}-${parseInt(startDate.getMonth().toString()) + 1}-${startDate.getDate()}`,
                "finish_date": `${finishDate.getFullYear()}-${parseInt(finishDate.getMonth().toString()) + 1}-${finishDate.getDate()}`,
                "current_job": actualDate
            }

        workExperience.push(newWorkExperience)

        const body = {
            work_experience: workExperience
        }

        updateUser(context.user.uid, body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessageUpdate) {
                    context.setErrorMessage(errorMessageUpdate);
                }
            } else {
                context.setUser(response);
                localStorage.setItem("user", JSON.stringify(response))
                params.closeModal()
            }
            setButtonDisabled(false)
        })
    }

    return (<div className="modal-container">
            <div className="form-text-modal">
                Add Job Experience
            </div>
            <form className="modal-form">
                <div className={errorPosition ? "label-error" : "label"}>
                    <label>
                        Position *
                        <input type="text" value={position} className="input" onChange={setPositionHandler}/>
                    </label>
                </div>
                <div className={errorCompany ? "label-error" : "label"}>
                    <label>
                        Company *
                        <input type="text" value={company} className="input" onChange={setCompanyHandler}/>
                    </label>
                </div>
                <div className={errorStartDate ? "labelPaddingError" : "labelPadding"}>
                    Start Date *
                    <DatePicker selected={startDate} showMonthYearPicker dateFormat="MM/yyyy" className="input"
                                onChange={setStartDateHandler}/>
                </div>
                <div className={"checkRow"}>
                    <div className={"checkRowButton"} onClick={ActualJob}>
                        {actualDate ? <TickCircle size="20" variant="Bold" color="#014751"/> : null}
                    </div>
                    I currently have this position
                </div>
                <div className={actualDate ? "labelDisable" : errorFinishDate ? "label-error" : "label"}>
                    <div>
                        End Date {actualDate ? null : "*"}
                        <DatePicker selected={actualDate ? "" : finishDate} readOnly={actualDate} showMonthYearPicker
                                    dateFormat="MM/yyyy" className={actualDate ? "inputDisable" : "input"}
                                    onChange={setFinishDateHandler}/>
                    </div>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={createEducationButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Add"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
