import './styles.css'
import {useContext, useState} from "react";
import {isMobile} from "react-device-detect";
import {createTeamVacant} from "../../services/teamService";
import Select from "react-select";
import {
    CloudOptions,
    databasesOptions,
    frameworksOptionsDataAll,
    optionsLanguages,
    platformsOptions
} from "../../config/dictonary";
import {
    selected4, selectedCloud,
    selectedColor5, selectedDb, selectedFrameworks, selectedLanguages, selectedPlatform,
    selectedViolet,
    selectedViolet2,
    selectedViolet3,
} from "../../styles/commonStyles";
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
    const [frameworks, setFrameworks] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [cloud, setCloud] = useState([])
    const [db, setDb] = useState([])
    const errorMessage = "An error has occurred while creating this opportunity. Please, try again later"
    const errorMessageCompleteData = "Please complete the required fields"

    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const validateFields = () => {
        let error = false;
        if (vacant === "" || vacant.length <= 3) {
            error = true;
            setErrorName(true)
        }

        if (description === "" || description.length < 30) {
            error = true;
            setErrorDescription(true)
        }

        return error;
    }

    const goBack = () => {
        navigate("/team/" + params.tid, {state: "members"})
    }

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

    const setFrameworksHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworks(list);
    }

    const setPlatformsHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPlatforms(list);
    }

    const setCloudHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setCloud(list);
    }

    const setDBHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setDb(list);
    }

    const setVacantHandler = (event) => {
        if (event.target.value.length > 3) {
            setErrorName(false)
        }

        setVacant(event.target.value);
    }

    const setDescriptionHandler = (event) => {
        if (event.target.value.length > 30) {
            setErrorDescription(false)
        }
        setDescription(event.target.value);
    }

    const createVacant = () => {
        if (validateFields()) {
            context.setErrorMessage(errorMessageCompleteData)
            return;
        }

        setButtonDisabled(true);
        const body = {
            title: vacant,
            description: description,
            tid: params.tid,
            requirements: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms,
                cloud_providers: cloud,
                databases: db
            }
        }
        createTeamVacant(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                context.setCreateMessage("Vacant created successfully")
                goBack()
            }
            setButtonDisabled(false);
        })
    }

    const basicInformation = () => {
        return (
            <div
                className={isMobile ? "create-project-info-container-mobile" : context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={isMobile || context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={isMobile ?
                                errorName ? "create-project-label-mobile-error" : "create-project-label-mobile" :
                                context.size ?
                                    errorName ? "create-project-label-reduced-error" : "create-project-label-reduced" :
                                    errorName ? "create-project-label-error" : "create-project-label"}>
                            Title *
                            <div className="create-project-input">
                                <input type="text"
                                       value={vacant}
                                       className={isMobile ? errorName ? "input-mobile-error" : "input-mobile" : errorName ? "inputError" : "input"}
                                       onChange={setVacantHandler}/>
                            </div>
                        </label>
                        <div
                            className={isMobile ? errorDescription ? "text-area-label-vacant-mobile-error" : "text-area-label-vacant-mobile" :
                                context.size ? errorDescription ? "text-area-label-vacant-reduced-error" : "text-area-label-vacant-reduced" :
                                    errorDescription ? "text-area-label-vacant-error" : "text-area-label-vacant"}>
                            Description *
                            <textarea
                                className={isMobile ? errorDescription ? "new-vacant-textarea-mobile-error" : "new-vacant-textarea-mobile" :
                                    errorDescription ? "new-vacant-textarea-error" : "new-vacant-textarea"}
                                value={description}
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
            <div
                className={isMobile ? "create-project-info-container-mobile" : context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={isMobile || context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Programming Languages ({languages.length}/5)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => languages.length === 5}
                                    options={optionsLanguages}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    styles={isMobile ? selectedLanguages : selectedViolet}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks ({frameworks.length}/5)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => frameworks.length === 5}
                                    options={frameworksOptionsDataAll}
                                    onChange={(choice) => setFrameworksHandler(choice)}
                                    styles={isMobile ? selectedFrameworks : selectedViolet3}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms ({platforms.length}/5)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => platforms.length === 5}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    styles={isMobile ? selectedPlatform : selectedViolet2}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Cloud Providers ({cloud.length}/5)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => cloud.length === 5}
                                    options={CloudOptions}
                                    onChange={(choice) => setCloudHandler(choice)}
                                    styles={isMobile ? selectedCloud : selected4}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Databases ({db.length}/5)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => db.length === 5}
                                    options={databasesOptions}
                                    onChange={(choice) => setDBHandler(choice)}
                                    styles={isMobile ? selectedDb : selectedColor5}
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
            <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                New Opportunity
            </div>
            <div>
                <div className={isMobile || context.size ? "projects-cards-reduced" : "projects-cards"}>
                    {basicInformation()}
                    {skillsColumn()}
                </div>
                <div
                    className={isMobile ? "new-vacant-button-mobile" : context.size ? "new-vacant-button-reduced" : "new-vacant-button"}>
                    <button className={isMobile ? "cancel-edit-button-style-mobile" : "cancel-edit-button-style"}
                            onClick={goBack}>
                        Cancel
                    </button>
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "button-style-mobile" : "save-edit-button-style"}
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
