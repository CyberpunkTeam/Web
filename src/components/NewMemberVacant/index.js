import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {isMobile} from "react-device-detect";
import {createTeamVacant} from "../../services/teamService";

export default function NewMemberVacant(params) {
    const [vacant, setVacant] = useState("")
    const [description, setDescription] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const setVacantHandler = (event) => {
        setVacant(event.target.value);
    }

    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const createVacant = () => {
        setButtonDisabled(true);
        const body = {
            title: vacant,
            description: description,
            tid: params.tid
        }
        createTeamVacant(body).then(() => {
            setButtonDisabled(true);
            params.closeModal()
        })
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Create Vacant
            </div>
            <form className="modal-form">
                <div className={"label"}>
                    <label>
                        Title
                        <input type="text"
                               value={vacant}
                               className={isMobile ? "input-mobile" : "input"}
                               onChange={setVacantHandler}/>
                    </label>
                </div>
                <div className="text-area-postulation-label">
                    Description
                    <textarea className="description" value={description} onChange={setDescriptionHandler} name="Text1"
                              cols="40"
                              rows="5"/>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={createVacant}
                >
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Create"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
