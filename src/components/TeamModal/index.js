import {createTeam, updateTeam} from "../../services/teamService";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {
    databasesOptions,
    frameworksOptionsData, MethodologiesOptions, optionsIdioms,
    optionsLanguages,
    optionsProjects,
    platformsOptions
} from "../../config/dictonary"
import Select from "react-select";
import {
    selected4, selectedCloud, selectedFrameworks,
    selectedGreenStyle, selectedLanguages, selectedPlatform,
    selectedViolet,
    selectedViolet2,
    selectedViolet3, selectPref
} from "../../styles/commonStyles";
import SearchBar from "../SearchBar";
import SideBar from "../SideBar";
import {isMobile} from "react-device-detect";

export default function TeamModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const errorMessageUpdate = "An error has occurred while updating team's information. Please, try again later"
    const errorMessageCreate = "An error has occurred while creating the team. Please, try again later"

    const valuesSelected = (data) => {
        let list = []
        data.forEach((value) => {
            list.push({value: value, label: value})
        })
        return list
    }

    const getFrameworksOptions = (data) => {
        let list = []
        data.forEach((value) => {
            if (Object.keys(frameworksOptionsData).includes(value)) {
                list = list.concat(frameworksOptionsData[value])
            }
        })
        return list
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [teamName, setTeamName] = useState(params.team !== undefined ? params.team.name : "");

    const languagesValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.programming_language)
    const [languages, setLanguages] = useState(params.team !== undefined ? [...params.team.technologies.programming_language] : []);

    const preferencesValues = params.team === undefined ? [] : valuesSelected(params.team.project_preferences)
    const [prefs, setPrefs] = useState(params.team !== undefined ? [...params.team.project_preferences] : []);

    const methodologiesValues = params.team === undefined ? [] : valuesSelected(params.team.methodologies)
    const [methodologies, setMethodologies] = useState(params.team !== undefined ? [...params.team.methodologies] : [])

    const idiomsValues = params.team === undefined ? [] : valuesSelected(params.team.idioms)
    const [idioms, setIdioms] = useState(params.team !== undefined ? [...params.team.idioms] : [])

    const frameworksValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.frameworks)
    const [frameworks, setFrameworks] = useState(params.team !== undefined ? [...params.team.technologies.frameworks] : [])
    const [frameworksOptions, setFrameworksOptions] = useState(params.team === undefined ? [] : getFrameworksOptions(params.team.technologies.programming_language));

    const platformsValues = params.team === undefined ? [] : valuesSelected(params.team.technologies.platforms)
    const [platforms, setPlatforms] = useState(params.team !== undefined ? [...params.team.technologies.platforms] : [])

    const databasesDefault = params.team === undefined ? [] : valuesSelected(params.team.technologies.databases)
    const [db, setDb] = useState(params.team === undefined ? [] : [...params.team.technologies.databases])

    const goBack = () => {
        navigate(-1)
    }

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworksOptions(getFrameworksOptions(list))
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

    const setDBHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setDb(list);
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
                platforms: platforms,
                databases: db
            },
            methodologies: methodologies,
            idioms: idioms,
            project_preferences: prefs,
            owner: context.user.uid
        }

        createTeam(body).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessageCreate) {
                    context.setErrorMessage(errorMessageCreate);
                }
            } else {
                context.setCreateMessage("Team created successfully")
                navigate("/team/" + response.tid)
            }
            setButtonDisabled(false)
        })

    }

    const updateTeamButton = () => {
        setButtonDisabled(true)
        const body = {
            name: teamName,
            technologies: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms,
                databases: db
            },
            methodologies: methodologies,
            idioms: idioms,
            project_preferences: prefs,
            owner: context.user.uid
        }

        updateTeam(params.team.tid, body).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessageUpdate) {
                    context.setErrorMessage(errorMessageUpdate);
                }
            } else {
                context.setCreateMessage("Team updated successfully")
                goBack()
            }
            setButtonDisabled(false)

        })
    }
    const basicInformation = () => {
        return (
            <div
                className={isMobile ? "create-project-info-container-mobile" : context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={isMobile || context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Name
                            <div className="create-project-input">
                                <input type="text"
                                       value={teamName}
                                       className={isMobile ? "input-mobile" : "input"}
                                       onChange={setTeamHandler}/>
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages ({idioms.length}/3)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => idioms.length === 3}
                                    defaultValue={idiomsValues}
                                    options={optionsIdioms}
                                    onChange={(choice) => setIdiomsHandler(choice)}
                                    styles={isMobile ? selectPref : selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Project Preferences ({prefs.length}/3)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => prefs.length === 3}
                                    defaultValue={preferencesValues}
                                    options={optionsProjects}
                                    onChange={(choice) => setPrefHandler(choice)}
                                    styles={isMobile ? selectPref : selectedGreenStyle}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Methodologies ({methodologies.length}/3)
                            <div className={isMobile ? "modal-form-input-select-mobile" : "modal-form-input-select"}>
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => methodologies.length === 3}
                                    defaultValue={methodologiesValues}
                                    options={MethodologiesOptions}
                                    onChange={(choice) => setMethodologiesHandler(choice)}
                                    styles={isMobile ? selectPref : selectedGreenStyle}
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
                                    defaultValue={languagesValues}
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
                                    defaultValue={frameworksValues}
                                    options={frameworksOptions}
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
                                    defaultValue={platformsValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    styles={isMobile ? selectedPlatform : selectedViolet2}
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
                                    defaultValue={databasesDefault}
                                    options={databasesOptions}
                                    onChange={(choice) => setDBHandler(choice)}
                                    styles={isMobile ? selectedCloud : selected4}
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
                {params.team !== undefined ? "Edit Team" : "New Team"}
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
