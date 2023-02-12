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
    selected4,
    selectedColor5,
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
            tid: params.tid,
            requirements: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms,
                cloud_providers: cloud,
                databases: db
            }
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
                                    styles={selectedViolet}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={frameworksOptionsDataAll}
                                    onChange={(choice) => setFrameworksHandler(choice)}
                                    styles={selectedViolet3}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    styles={selectedViolet2}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Cloud Providers
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={CloudOptions}
                                    onChange={(choice) => setCloudHandler(choice)}
                                    styles={selected4}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Databases
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    options={databasesOptions}
                                    onChange={(choice) => setDBHandler(choice)}
                                    styles={selectedColor5}
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
