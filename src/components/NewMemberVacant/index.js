import './styles.css'
import {useContext, useState} from "react";
import {isMobile} from "react-device-detect";
import {createTeamVacant} from "../../services/teamService";
import Select from "react-select";
import {optionsIdioms, optionsLanguages} from "../../config/dictonary";
import {selectedGreenStyle} from "../../styles/commonStyles";
import SearchBar from "../SearchBar";
import SideBar from "../SideBar";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function NewMemberVacant(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [vacant, setVacant] = useState("")
    const [description, setDescription] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [languages, setLanguages] = useState([])

    const goBack = () => {
        navigate("/team/" + params.tid)
    }

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

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
            goBack()
        })
    }

    const basicInformation = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Title
                            <div className="create-project-input">
                                <input type="text"
                                       value={vacant}
                                       className={isMobile ? "input-mobile" : "input"}
                                       onChange={setVacantHandler}/>
                            </div>
                        </label>
                        <div className={context.size ? "text-area-label-vacant-reduced" : "text-area-label-vacant"}>
                            Description
                            <textarea className="new-vacant-textarea" value={description}
                                      onChange={setDescriptionHandler}
                                      name="Text1" cols="40"
                                      rows="18"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const skillsColumn = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={optionsLanguages}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Cloud Providers
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Databases
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="projects-screen">
            <div className="create-projects-header">
                New Opportunity
            </div>
            <div>
                <div className={context.size ? "projects-cards-reduced" : "projects-cards"}>
                    {basicInformation()}
                    {skillsColumn()}
                </div>
                <div className={context.size ? "new-vacant-button-reduced" : "new-vacant-button"}>
                    <button className="cancel-edit-button-style" onClick={goBack}>
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
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
