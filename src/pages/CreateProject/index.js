import './style.css';
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {createProject, updateProject} from "../../services/projectService";
import Select from "react-select";
import {optionsIdioms, optionsLanguages, platformsOptions, frameworksOptionsData} from "../../config/dictonary";
import {selectedGreenStyle, selectedViolet, selectedViolet2, selectedViolet3} from "../../styles/commonStyles";

export default function CreateProjectScreen() {
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
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

    const defaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.programming_language) : []
    const IdiomsDefaultValues = state.project !== undefined ? valuesSelected(state.project.idioms) : []
    const frameworksDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.frameworks) : []
    const platformsDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.platforms) : []

    const [name, setName] = useState(state.project === undefined ? "" : state.project.name)
    const [description, setDescription] = useState(state.project === undefined ? "" : state.project.description.summary)
    const [languages, setLanguages] = useState(state.project === undefined ? [] : [...state.project.idioms])
    const [techs, setTechs] = useState(state.project === undefined ? [] : [...state.project.technologies.programming_language]);
    const [platforms, setPlatforms] = useState(state.project === undefined ? [] : [...state.project.technologies.platforms]);
    const [frameworksOptions, setFrameworksOptions] = useState(state.project === undefined ? [] : getFrameworksOptions(state.project.technologies.programming_language));
    const [frameworks, setFrameworks] = useState(state.project === undefined ? [] : [...state.project.technologies.frameworks]);
    const [estimatedBudget, setEstimatedBudget] = useState(state.project === undefined ? "0" : state.project.tentative_budget)
    const [timeValue, setTimeValue] = useState(state.project === undefined ? "0" : state.project.tentative_duration)
    const [coin, setCoin] = useState("DOLAR")
    const [time, setTime] = useState(state.project === undefined ? "Months" : state.project.unit_duration)
    const type = state.project === undefined ? state.type : state.project.project_type

    const projectButton = () => {
        setButtonDisabled(true)

        const body = {
            "name": name,
            "idioms": languages,
            "creator_uid": context.user.uid,
            "project_type": type,
            "description": {
                "files_attached": [],
                "functional_requirements": [],
                "non_function_requirements": [],
                "summary": description
            },
            "technologies": {
                "programming_language": techs,
                "frameworks": frameworks,
                "platforms": platforms
            },
            "tentative_budget": estimatedBudget,
            "budget_currency": "DOLAR",
            "tentative_duration": timeValue,
            "unit_duration": time.toUpperCase()
        }

        if (state.project === undefined) {
            createProject(body).then((r) => {
                setButtonDisabled(false)
                navigate("/projects/" + r.pid)
            })
        } else {
            updateProject(state.project.pid, body).then((r) => {
                setButtonDisabled(false)
                navigate("/projects/" + r.pid)
            })
        }
    }

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

    const setTechHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworksOptions(getFrameworksOptions(list))
        setTechs(list)
    }

    const setPlatformsHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPlatforms(list)
    }

    const setFrameworksHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworks(list)
    }

    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const setEstimatedBudgetHandler = (event) => {
        setEstimatedBudget(event.target.value);
    }

    const setCoinHandler = (event) => {
        setCoin(event.target.value);
    }

    const setTimeHandler = (event) => {
        setTime(event.target.value);
    }

    const setTimeValueHandler = (event) => {
        setTimeValue(event.target.value);
    }

    const details = () => {
        return (
            <div className="projects-description-container">
                <div className="information-container">
                    <div className="information-form">
                        <div className="text-area-label">
                            Description
                            <textarea className="textarea-style" value={description} onChange={setDescriptionHandler}
                                      name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                    </div>
                </div>
                <div className="create-project-buttons">
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "create-project-from-button-disabled" : "create-project-from-button"}
                            onClick={projectButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : state.project === undefined ? "Create" : "Save"}
                    </button>
                </div>
            </div>
        )
    }

    const BasicInfoLeft = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Name
                            <div className="create-project-input">
                                <input type="text" value={name} className="input" onChange={setNameHandler}/>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Total Budget
                            <div className="budget-input-container">
                                <input type="number" min="0" value={estimatedBudget} className="budget-input"
                                       onChange={setEstimatedBudgetHandler}/>
                                <select value={coin} className="select-coin" onChange={setCoinHandler}>
                                    <option value="DOLAR">USD</option>
                                </select>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Estimated Completion Time
                            <div className="budget-input-container">
                                <input type="number" min="0" value={timeValue} className="budget-input"
                                       onChange={setTimeValueHandler}/>
                                <select value={time} className="select-coin" onChange={setTimeHandler}>
                                    <option value="HOURS">Hours</option>
                                    <option value="DAYS">Days</option>
                                    <option value="MONTHS">Months</option>
                                </select>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={IdiomsDefaultValues}
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

    const BasicInfoRight = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Programming Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={defaultValues}
                                    options={optionsLanguages}
                                    onChange={(choice) => setTechHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={frameworksDefaultValues}
                                    options={frameworksOptions}
                                    onChange={(choice) => setFrameworksHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet3}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={platformsDefaultValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    name="Technologies"
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
                {state.project === undefined ? type === "Base" ? "New Project" : "New " + type + " Project" : "Edit Project"}
            </div>
            <div>
                <div className={context.size ? "projects-cards-reduced" : "projects-cards"}>
                    {BasicInfoLeft()}
                    {BasicInfoRight()}
                </div>
                {details()}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
