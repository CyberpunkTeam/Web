import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle, TickCircle} from "iconsax-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddEducationModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [actualDate, setActualDate] = useState(false);
    const errorMessageUpdate = "An error has occurred while updating user information. Please, try again later"

    const [errorTittle, setErrorTittle] = useState(false);
    const [errorInstitution, setErrorInstitution] = useState(false);
    const [errorStartDate, setErrorStartDate] = useState(false);
    const [errorFinishDate, setErrorFinishDate] = useState(false);
    const validateFields = () => {
        let error = false;

        if (title.length <= 3) {
            error = true;
            setErrorTittle(true)
        }

        if (institution.length <= 3) {
            error = true;
            setErrorInstitution(true)
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

    const setTitleHandler = (event) => {
        if (event.target.value.length > 3) {
            setErrorTittle(false)
        }
        setTitle(event.target.value);
    }

    const setInstitutionHandler = (event) => {
        if (event.target.value.length > 3) {
            setErrorInstitution(false)
        }
        setInstitution(event.target.value);
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
        let educations = [...context.user.education]
        const newEducation =
            {
                "title": title,
                "institution": institution,
                "start_date": `${startDate.getFullYear()}-${parseInt(startDate.getMonth().toString()) + 1}-${startDate.getDate()}`,
                "finish_date": actualDate ? "" : `${finishDate.getFullYear()}-${parseInt(finishDate.getMonth().toString()) + 1}-${finishDate.getDate()}`,
                "finished": !actualDate
            }

        educations.push(newEducation)

        const body = {
            education: educations
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

    return (
        <div className={context.size ? "modal-container-reduce" : "modal-container"}>
            <div className="form-text-modal">
                Add Degree or Certification
            </div>
            <form className="modal-form">
                <div className={errorTittle ? "label-error" : "label"}>
                    <label>
                        Title *
                        <input type="text" value={title} className="input" onChange={setTitleHandler}/>
                    </label>
                </div>
                <div className={errorInstitution ? "label-error" : "label"}>
                    <label>
                        Institution *
                        <input type="text" value={institution} className="input" onChange={setInstitutionHandler}/>
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
                    In Progress
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
