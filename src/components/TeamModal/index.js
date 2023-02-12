import {createTeam, updateTeam} from "../../services/teamService";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {CloseCircle} from "iconsax-react";
import {
    CloudOptions, databasesOptions,
    frameworksOptionsDataAll, MethodologiesOptions, optionsIdioms,
    optionsLanguages,
    optionsProjects,
    platformsOptions
} from "../../config/dictonary"
import Select from "react-select";
import {
    selected4, selectedColor5,
    selectedGreenStyle,
    selectedViolet,
    selectedViolet2,
    selectedViolet3
} from "../../styles/commonStyles";
import SearchBar from "../SearchBar";
import SideBar from "../SideBar";
import {isMobile} from "react-device-detect";

export default function TeamModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const valuesSelected = (data) => {
        let list = []
        data.forEach((value) => {
            list.push({value: value, label: value})
        })
        return list
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [teamName, setTeamName] = useState(params.team !== undefined ? params.team.name : "");
    const languagesValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.programming_language)
    const preferencesValues = params.team === undefined ? [] : valuesSelected(params.team.project_preferences)
    const methodologiesValues = params.team === undefined ? [] : valuesSelected(params.team.methodologies)
    const idiomsValues = params.team === undefined ? [] : valuesSelected(params.team.idioms)
    const frameworksValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.frameworks)
    const platformsValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.platforms)

    const [languages, setLanguages] = useState(params.team !== undefined ? [...params.team.technologies.programming_language] : []);
    const [prefs, setPrefs] = useState(params.team !== undefined ? [...params.team.project_preferences] : []);
    const [methodologies, setMethodologies] = useState(params.team !== undefined ? [...params.team.methodologies] : [])
    const [idioms, setIdioms] = useState(params.team !== undefined ? [...params.team.idioms] : [])
    const [frameworks, setFrameworks] = useState(params.team !== undefined ? [...params.team.technologies.frameworks] : [])
    const [platforms, setPlatforms] = useState(params.team !== undefined ? [...params.team.technologies.platforms] : [])

    const goBack = () => {
        if (params.team !== undefined) {
            navigate("/team/" + params.team.tid)
            return
        }
        navigate("/me")
    }

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

    const setMethodologiesHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setMethodologies(list);
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

    const setTeamHandler = (event) => {
        setTeamName(event.target.value);
    }

    const setPrefHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPrefs(list)
    }

    const setIdiomsHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setIdioms(list)
    }

    const buttonOnClick = () => {
        if (params.team !== undefined) {
            return updateTeamButton()
        }
        return createTeamButton()
    }

    const createTeamButton = () => {
        setButtonDisabled(true)
        const body = {
            name: teamName,
            technologies: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms
            },
            methodologies: methodologies,
            idioms: idioms,
            project_preferences: prefs,
            owner: context.user.uid
        }

        createTeam(body).then((response) => {
            setButtonDisabled(false)
            navigate("/team/" + response.tid)
        })

    }

    const updateTeamButton = () => {
        setButtonDisabled(true)
        const body = {
            name: teamName,
            technologies: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms
            },
            methodologies: methodologies,
            idioms: idioms,
            project_preferences: prefs,
            owner: context.user.uid
        }

        updateTeam(params.team.tid, body).then((response) => {
            setButtonDisabled(false)
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
                            Name
                            <div className="create-project-input">
                                <input type="text"
                                       value={teamName}
                                       className={isMobile ? "input-mobile" : "input"}
                                       onChange={setTeamHandler}/>
                            </div>
                        </label>
                        <label
                            className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={idiomsValues}
                                    options={optionsIdioms}
                                    onChange={(choice) => setIdiomsHandler(choice)}
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label
                            className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Project Preferences
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={preferencesValues}
                                    options={optionsProjects}
                                    onChange={(choice) => setPrefHandler(choice)}
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Methodologies
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={methodologiesValues}
                                    options={MethodologiesOptions}
                                    onChange={(choice) => setMethodologiesHandler(choice)}
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
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
                            Programming Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={languagesValues}
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
                                    defaultValue={frameworksValues}
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
                                    defaultValue={platformsValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    styles={selectedViolet2}
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
                {params.team !== undefined ? "Edit Team" : "New Team"}
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
                            onClick={buttonOnClick}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : params.team !== undefined ? "Save" : "Create"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
