import './style.css';
import logo from '../../assests/projects-pana.svg';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle, ArrowCircleLeft, ArrowCircleRight, ArrowDown2, ArrowUp2} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import {getProjects} from "../../services/projectService";
import Loading from "../../components/loading";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";
import ProjectTileMobileComponent from "../../components/ProjectTileMobileComponent";
import ReactPaginate from "react-paginate";
import {
    databasesOptions,
    frameworksOptionsDataAll, optionsIdioms,
    optionsLanguages,
    optionsProjects,
    platformsOptions
} from "../../config/dictonary";
import {
    selectedFrameworks,
    selectedGreenStyle, selectedLanguages, selectedPlatform,
    selectedViolet,
    selectedViolet2,
    selectedViolet3, selectPref
} from "../../styles/commonStyles";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import {styled} from "@mui/material/styles";
import {formatter} from "../../utils/budgetFormatter";
import AlertMessage from "../../components/AlertMessage";

const CustomSlider = styled(Slider)(({theme}) => ({
    color: "#58ADAD",
    "& .MuiSlider-thumb": {
        backgroundColor: "#2E9999"
    },
    "& .MuiSlider-rail": {
        color: '#222222'
    }
}));

const CustomSliderMobile = styled(Slider)(({theme}) => ({
    color: "#58ADAD",
    height: "20px",
    "& .MuiSlider-thumb": {
        backgroundColor: "#2E9999",
        height: "60px",
        width: "60px",
    },
    "& .MuiSlider-rail": {
        color: '#222222'
    }
}));

export default function ProjectsScreen() {
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    //const [projectsAll, setProjectsAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(true);
    const [time, setTime] = useState(Date.now());
    const [shake, setShake] = useState(false);
    const [index, setIndex] = useState(0);
    const pageCount = Math.ceil(projects.length / 10);
    const [filtersMobile, setFiltersMobile] = useState(false)
    const [toolsFilters, setToolsFilters] = useState(false)
    const [techs, setTechs] = useState([])
    const [techsDefaults, setTechsDefaults] = useState([])
    const [frameworks, setFrameworks] = useState([])
    const [frameworksDefault, setFrameworksDefault] = useState([])
    const [databases, setDatabases] = useState([])
    const [databasesDefault, setDatabasesDefault] = useState([])
    const [preferencesFilters, setPreferencesFilters] = useState(false)
    const [prefProjects, setPrefProjects] = useState([])
    const [prefProjectsDefault, setPrefProjectsDefault] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [platformsDefault, setPlatformsDefault] = useState([])
    const [budgetFilter, setBudgetFilter] = useState(false)
    const [maxValue, setMaxValue] = useState(-1)
    const [range, setRange] = useState([0, maxValue]);
    const [idiomsFilter, setIdiomsFilter] = useState(false)
    const [idiomsSelected, setIdiomsSelected] = useState([])
    const [idiomsSelectedDefault, setIdiomsSelectedDefault] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(false);

    function handleChanges(event, newValue) {
        setRange(newValue);
    }

    const queryParams = () => {
        let params = "&min_budget=" + range[0]

        if (range[1] !== -1) {
            params = params + "&max_budget=" + range[1]
        }

        if (techs.length !== 0) {
            params = params + "&programming_languages=" + techs.toString()
        }
        if (frameworks.length !== 0) {
            params = params + "&frameworks=" + frameworks.toString()
        }
        if (databases.length !== 0) {
            params = params + "&databases=" + databases.toString()
        }
        if (platforms.length !== 0) {
            params = params + "&platforms=" + platforms.toString()
        }
        if (prefProjects.length !== 0) {
            params = params + "&project_types=" + prefProjects.toString()
        }
        if (idiomsSelected.length !== 0) {
            params = params + "&idioms=" + idiomsSelected.toString()
        }
        return params
    }

    useEffect(() => {
        setTeam(!team)
    }, [time]);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 8000);
        animate()
        return () => {
            clearInterval(interval);
        };
    }, [team]);

    useEffect(() => {
        const params = queryParams()
        getProjects(params).then((response) => {
            if ( response === undefined) {
                if (context.errorMessage !== "An error occurred while trying to get projects") {
                    if (projects === undefined) {
                        setProjects([]);
                    }
                    context.setErrorMessage("An error occurred while trying to get projects");
                }
                return
            }
            setProjects([...response]);
            if (maxValue === -1) {
                let max = 0;
                response.forEach((value) => {
                    if (value.tentative_budget > max) {
                        max = value.tentative_budget
                    }
                })
                setRange([0, max])
                setMaxValue(max)
            }
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, [time]);

    const cleanAll = () => {
        setTechs([])
        setTechsDefaults([])

        setFrameworks([])
        setFrameworksDefault([])

        setDatabases([])
        setDatabasesDefault([])

        setPlatforms([])
        setPlatformsDefault([])

        setPrefProjects([])
        setPrefProjectsDefault([])

        setIdiomsSelected([])
        setIdiomsSelectedDefault([])

        setRange([0, maxValue])

        const params = queryParams()
        getProjects(params).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== "An error occurred while trying to get projects") {
                    context.setErrorMessage("An error occurred while trying to get projects");
                }
                return
            }
            setProjects([...response]);
            setButtonDisabled(false);
            closeAll()
        }).catch((error) => {
            console.log(error)
        });
    }

    const find = () => {
        setButtonDisabled(true);
        const params = queryParams()
        getProjects(params).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== "An error occurred while trying to get projects") {
                    context.setErrorMessage("An error occurred while trying to get projects");
                }
                return
            }
            setProjects([...response]);
            setIndex(0)
            setButtonDisabled(false);
            closeAll()
        }).catch((error) => {
            console.log(error)
        });
    }

    const toolButton = () => {
        setPreferencesFilters(false)
        setBudgetFilter(false)
        setIdiomsFilter(false)
        setToolsFilters(!toolsFilters)
    }

    const filterButton = () => {
        setFiltersMobile(!filtersMobile)
    }

    const preferencesButton = () => {
        setToolsFilters(false)
        setIdiomsFilter(false)
        setBudgetFilter(false)
        setPreferencesFilters(!preferencesFilters)
    }

    const budgetButton = () => {
        setToolsFilters(false)
        setPreferencesFilters(false)
        setIdiomsFilter(false)
        setBudgetFilter(!budgetFilter)
    }

    const idiomsButton = () => {
        setPreferencesFilters(false)
        setBudgetFilter(false)
        setToolsFilters(false)
        setIdiomsFilter(!idiomsFilter)
    }

    const closeAll = () => {
        setToolsFilters(false);
        setBudgetFilter(false);
        setIdiomsFilter(false);
        setFiltersMobile(false);
        setPreferencesFilters(false);
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % projects.length;
        window.scrollTo(0, 0);
        setIndex(newOffset);
    };

    const animate = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }

    const change = () => {
        setTeam(!team);
        animate()
    }

    const setDBHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setDatabasesDefault(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setDatabases(list);
    }

    const setTechLanguagesHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setTechsDefaults(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setTechs(list);
    }

    const setFrameworkHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setFrameworksDefault(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworks(list);
    }

    const setProjectsHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setPrefProjectsDefault(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPrefProjects(list);
    }

    const setIdiomsHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setIdiomsSelectedDefault(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setIdiomsSelected(list);
    }

    const setPlatformsHandler = (event) => {
        if (event.length > 5) {
            return
        }

        setPlatformsDefault(event)

        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPlatforms(list);
    }

    if (loading) {
        return <Loading/>
    }

    const mobileFilters = () => {
        if (!isMobile) {
            return
        }
        const tools = () => {
            return (
                <div className={"filters-selectors-mobile"}>
                    <div className={"filters-mobile"} onClick={toolButton}>
                        Tools
                        {toolsFilters ?
                            <ArrowUp2 size={32} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={32} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={toolsFilters ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input-mobile"}>
                            Programming Languages ({techs.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={techsDefaults}
                                    isOptionDisabled={(option) => techs.length === 5}
                                    options={optionsLanguages}
                                    styles={selectedLanguages}
                                    onChange={(choice) => setTechLanguagesHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input-mobile"}>
                            Frameworks ({frameworks.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={frameworksDefault}
                                    isOptionDisabled={(option) => frameworks.length === 5}
                                    options={frameworksOptionsDataAll}
                                    styles={selectedFrameworks}
                                    onChange={(choice) => setFrameworkHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input-mobile"}>
                            Databases ({databases.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={databasesDefault}
                                    isOptionDisabled={(option) => databases.length === 5}
                                    options={databasesOptions}
                                    styles={selectedPlatform}
                                    onChange={(choice) => setDBHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const preferences = () => {
            return (
                <div className={"filters-selectors-mobile"}>
                    <div className={"filters-mobile"} onClick={preferencesButton}>
                        Preferences
                        {preferencesFilters ?
                            <ArrowUp2 size={32} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={32} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={preferencesFilters ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input-mobile"}>
                            Project Preferences ({prefProjects.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={prefProjectsDefault}
                                    isOptionDisabled={(option) => prefProjects.length === 5}
                                    options={optionsProjects}
                                    styles={selectPref}
                                    onChange={(choice) => setProjectsHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input-mobile"}>
                            Platforms ({platforms.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={platformsDefault}
                                    isOptionDisabled={(option) => platformsOptions.length === 5}
                                    options={platformsOptions}
                                    styles={selectedPlatform}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const budget = () => {
            return (
                <div className={"filters-selectors-mobile"}>
                    <div className={"filters-mobile"} onClick={budgetButton}>
                        Budget
                        {budgetFilter ?
                            <ArrowUp2 size={32} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={32} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={budgetFilter ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-slider-container-mobile"}>
                            <CustomSliderMobile className={"slider"} min={0} max={maxValue} step={10} value={range}
                                                onChange={handleChanges}/>
                            <div className={"filters-slider-values-mobile"}>
                                <div>
                                    {formatter.format(range[0]) + " USD"}
                                </div>
                                <div>
                                    {formatter.format(range[1]) + " USD"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const idioms = () => {
            return (
                <div className={"filters-selectors-mobile"}>
                    <div className={"filters-mobile"} onClick={idiomsButton}>
                        Language
                        {idiomsFilter ?
                            <ArrowUp2 size={32} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={32} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={idiomsFilter ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input-mobile"}>
                            Languages ({idiomsSelected.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={idiomsSelectedDefault}
                                    isOptionDisabled={(option) => idiomsSelected.length === 5}
                                    options={optionsIdioms}
                                    styles={selectPref}
                                    onChange={(choice) => setIdiomsHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={"filters-container-mobile"}>
                <div className={"filters-container-buttons-mobile"}>
                    <button className={"filters-buttons-mobile"} onClick={filterButton}>
                        Filters
                        {filtersMobile ?
                            <ArrowUp2 size={48} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={48} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </button>
                </div>
                <div
                    className={filtersMobile ? "filters-container-div-mobile" : "filters-selector-container-hidden"}>
                    <div className={"filters-container-options-mobile"}>
                        {tools()}
                        {preferences()}
                        {budget()}
                        {idioms()}
                    </div>
                    <div className={"filters-container-options-buttons-mobile"}>
                        <button className={"cancel-edit-button-style-mobile"} onClick={cleanAll}>
                            Clean All
                        </button>
                        <button disabled={buttonDisabled}
                                className={buttonDisabled ? "button-style-disabled-mobile" : "button-style-mobile"}
                                onClick={find}>
                            {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                            {buttonDisabled ? "" : "Apply"}
                        </button>
                    </div>
                </div>
            </div>
        )

    }

    const coverMobile = () => {
        const tools = () => {
            return (
                <div className={"filters-selectors-reduced"}>
                    <div className={"filters-reduced"} onClick={toolButton}>
                        Tools
                        {toolsFilters ?
                            <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={toolsFilters ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input"}>
                            Programming Languages ({techs.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={techsDefaults}
                                    isOptionDisabled={(option) => techs.length === 5}
                                    options={optionsLanguages}
                                    styles={selectedViolet}
                                    onChange={(choice) => setTechLanguagesHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input"}>
                            Frameworks ({frameworks.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={frameworksDefault}
                                    isOptionDisabled={(option) => frameworks.length === 5}
                                    options={frameworksOptionsDataAll}
                                    styles={selectedViolet3}
                                    onChange={(choice) => setFrameworkHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input"}>
                            Databases ({databases.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={databasesDefault}
                                    isOptionDisabled={(option) => databases.length === 5}
                                    options={databasesOptions}
                                    styles={selectedViolet2}
                                    onChange={(choice) => setDBHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const preferences = () => {
            return (
                <div className={"filters-selectors-reduced"}>
                    <div className={"filters-reduced"} onClick={preferencesButton}>
                        Preferences
                        {preferencesFilters ?
                            <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={preferencesFilters ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input"}>
                            Project Preferences ({prefProjects.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={prefProjectsDefault}
                                    isOptionDisabled={(option) => prefProjects.length === 5}
                                    options={optionsProjects}
                                    styles={selectedGreenStyle}
                                    onChange={(choice) => setProjectsHandler(choice)}
                                />
                            </div>
                        </div>
                        <div className={"filters-selectors-input"}>
                            Platforms ({platforms.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={platformsDefault}
                                    isOptionDisabled={(option) => platformsOptions.length === 5}
                                    options={platformsOptions}
                                    styles={selectedViolet2}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const budget = () => {
            return (
                <div className={"filters-selectors-reduced"}>
                    <div className={"filters-reduced"} onClick={budgetButton}>
                        Budget
                        {budgetFilter ?
                            <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={budgetFilter ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-slider-container-reduced"}>
                            <CustomSlider className={"slider"} min={0} max={maxValue} step={10} value={range}
                                          onChange={handleChanges}/>
                            <div className={"filters-slider-values"}>
                                <div>
                                    {formatter.format(range[0]) + " USD"}
                                </div>
                                <div>
                                    {formatter.format(range[1]) + " USD"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const idioms = () => {
            return (
                <div className={"filters-selectors-reduced"}>
                    <div className={"filters-reduced"} onClick={idiomsButton}>
                        Language
                        {idiomsFilter ?
                            <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </div>
                    <div
                        className={idiomsFilter ? "filters-selectors-container-mobile" : "filters-selector-container-hidden"}>
                        <div className={"filters-selectors-input"}>
                            Languages ({idiomsSelected.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    value={idiomsSelectedDefault}
                                    isOptionDisabled={(option) => idiomsSelected.length === 5}
                                    options={optionsIdioms}
                                    styles={selectedGreenStyle}
                                    onChange={(choice) => setIdiomsHandler(choice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const filters = () => {
            return (
                <div className={"filters-container-reduced"}>
                    <div className={"filters-container-buttons-reduced"}>
                        <button className={"filters-buttons-reduced"} onClick={filterButton}>
                            Filters
                            {filtersMobile ?
                                <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                                <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                            }
                        </button>
                    </div>
                    <div
                        className={filtersMobile ? "filters-container-div-reduced" : "filters-selector-container-hidden"}>
                        <div className={"filters-container-options-reduced"}>
                            {tools()}
                            {preferences()}
                            {budget()}
                            {idioms()}
                        </div>
                        <div className={"filters-container-options-buttons-reduced"}>
                            <button className={"cancel-edit-button-style-reduced"} onClick={cleanAll}>Clean All</button>
                            <button disabled={buttonDisabled}
                                    className={buttonDisabled ? "filter-button-disabled-reduced" : "filter-button-reduced"}
                                    onClick={find}>
                                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                                {buttonDisabled ? "" : "Apply"}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className={isMobile ? "projects-header-mobile" : "projects-header"}>
                <div className="projects-cover-reduced">
                    <div className={isMobile ? "projects-cover-title-reduced-mobile" : "projects-cover-title-reduced"}>
                        Create a project that fits your preferences
                    </div>
                    <img src={logo} className={isMobile ? "pana-projects-style-mobile" : "pana-projects-style-reduced"}
                         alt="logo"/>
                    <button className={isMobile ? "createProjectButtonCoverMobile" : "createProjectButtonCover"}
                            onClick={() => {
                                navigate("/new/projects/type")
                            }}>
                        <AddCircle color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24}
                                   className={isMobile ? "iconMobile" : "icon"}/>
                        Create Project
                    </button>
                </div>
                {isMobile ? null : filters()}
            </div>
        )
    }

    const cover = () => {
        const projectsCover = () => {
            return (
                <div className={shake ? "shake" : "projects-cover-title"}>
                    Create a project that fits your preferences
                    <button className="createProjectButtonCover" onClick={() => {
                        navigate("/new/projects/type")
                    }}>
                        <AddCircle color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                        Create Project
                    </button>
                </div>
            )
        }

        const teamCover = () => {
            return (
                <div className={shake ? "shake" : "projects-cover-title"}>
                    Find the project you’ve been looking forward to work in
                </div>
            )
        }

        const filters = () => {
            const tools = () => {
                if (toolsFilters) {
                    return (
                        <div className={"filters-selectors-container"}>
                            <div className={"filters-selectors-column-container"}>
                                <div className={"filters-selectors-input"}>
                                    Programming Languages ({techs.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={techsDefaults}
                                            isOptionDisabled={(option) => techs.length === 5}
                                            options={optionsLanguages}
                                            styles={selectedViolet}
                                            onChange={(choice) => setTechLanguagesHandler(choice)}
                                        />
                                    </div>
                                </div>
                                <div className={"filters-selectors-input"}>
                                    Frameworks ({frameworks.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={frameworksDefault}
                                            isOptionDisabled={(option) => frameworks.length === 5}
                                            options={frameworksOptionsDataAll}
                                            styles={selectedViolet3}
                                            onChange={(choice) => setFrameworkHandler(choice)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"filters-selectors-column-container"}>
                                <div className={"filters-selectors-input"}>
                                    Databases ({databases.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={databasesDefault}
                                            isOptionDisabled={(option) => databases.length === 5}
                                            options={databasesOptions}
                                            styles={selectedViolet2}
                                            onChange={(choice) => setDBHandler(choice)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            const preferences = () => {
                if (preferencesFilters) {
                    return (
                        <div className={"filters-selectors-container"}>
                            <div className={"filters-selectors-column-container"}>
                                <div className={"filters-selectors-input"}>
                                    Project Preferences ({prefProjects.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={prefProjectsDefault}
                                            isOptionDisabled={(option) => prefProjects.length === 5}
                                            options={optionsProjects}
                                            styles={selectedGreenStyle}
                                            onChange={(choice) => setProjectsHandler(choice)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"filters-selectors-column-container"}>
                                <div className={"filters-selectors-input"}>
                                    Platforms ({platforms.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={platformsDefault}
                                            isOptionDisabled={(option) => platformsOptions.length === 5}
                                            options={platformsOptions}
                                            styles={selectedViolet2}
                                            onChange={(choice) => setPlatformsHandler(choice)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            const budgetContainer = () => {
                if (budgetFilter) {
                    return (
                        <div className={"filters-slider-container"}>
                            <CustomSlider className={"slider"} min={0} max={maxValue} step={10} value={range}
                                          onChange={handleChanges}/>
                            <div className={"filters-slider-values"}>
                                <div>
                                    {formatter.format(range[0]) + " USD"}
                                </div>
                                <div>
                                    {formatter.format(range[1]) + " USD"}
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            const idioms = () => {
                if (idiomsFilter) {
                    return (
                        <div className={"filters-selectors-container"}>
                            <div className={"filters-selectors-column-container"}>
                                <div className={"filters-selectors-input"}>
                                    Languages ({idiomsSelected.length}/5)
                                    <div className="modal-form-input-select">
                                        <Select
                                            isMulti
                                            value={idiomsSelectedDefault}
                                            isOptionDisabled={(option) => idiomsSelected.length === 5}
                                            options={optionsIdioms}
                                            styles={selectedGreenStyle}
                                            onChange={(choice) => setIdiomsHandler(choice)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            return (
                <div className={"filters-container"}>
                    <div className={"filters-container-buttons"}>
                        <button className={"filters-buttons"} onClick={toolButton}>
                            Tools
                            {toolsFilters ?
                                <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                                <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                            }
                        </button>
                        <button className={"filters-buttons"} onClick={preferencesButton}>
                            Preferences
                            {preferencesFilters ?
                                <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                                <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                            }
                        </button>
                        <button className={"filters-buttons"} onClick={budgetButton}>
                            Budget
                            {budgetFilter ?
                                <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                                <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                            }
                        </button>
                        <button className={"filters-buttons"} onClick={idiomsButton}>
                            Language
                            {idiomsFilter ?
                                <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                                <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                            }
                        </button>
                    </div>
                    <div
                        className={toolsFilters || preferencesFilters || budgetFilter || idiomsFilter ? "filters-container-div" : "filters-selector-container-hidden"}>
                        <div className={"filters-container-options"}>
                            {tools()}
                            {preferences()}
                            {budgetContainer()}
                            {idioms()}
                        </div>
                        <div className={"filters-container-options-buttons"}>
                            <button className={"cancel-edit-button-style"} onClick={cleanAll}>Clean All</button>
                            <button disabled={buttonDisabled}
                                    className={buttonDisabled ? "filter-button-disabled" : "filter-button"}
                                    onClick={find}>
                                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                                {buttonDisabled ? "" : "Apply"}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="projects-header">
                <ArrowCircleLeft
                    size="48"
                    className={"carrousel-buttons"}
                    color={"#FAFAFA"}
                    onClick={change}
                />
                <div className="projects-cover">
                    {team ? teamCover() : projectsCover()}
                    <img src={logo} className="pana-projects-style" alt="logo"/>
                </div>
                <ArrowCircleRight
                    size="48"
                    color={"#FAFAFA"}
                    className={"carrousel-buttons"}
                    onClick={change}
                />
                {filters()}
            </div>
        )
    }

    const noData = () => {
        if (projects.length === 0) {
            return (
                <div className={"noDataDiv"}>
                    No results found
                </div>
            )
        }
    }

    return (
        <>
            {toolsFilters || preferencesFilters || budgetFilter || idiomsFilter || filtersMobile ?
                <div onClick={closeAll} className="all-sidebar"/> : null}
            <div>
                <div className={isMobile ? "profile-screen-mobile" : "projects-screen"}>
                    {isMobile || context.size ? coverMobile() : cover()}
                    {mobileFilters()}
                    <div className="projects-container">
                        {projects.slice(index, 10 + (index)).map((value) => {
                            return <ProjectTileMobileComponent key={value.pid} data={value}/>
                        })}
                        {noData()}
                        <div className={isMobile ? "paginationMobile" : "pagination"}>
                            <ReactPaginate
                                containerClassName={isMobile ? "paginationMobile" : "pagination"}
                                breakLabel={'...'}
                                nextLabel={<ArrowCircleRight size={isMobile ? "64" : "24"}
                                                             color={index + 10 >= projects.length ? "#E3E3E3" : "#014751"}
                                                             className={"pagination-icon"}/>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={10}
                                pageCount={pageCount}
                                activeClassName={"active-page"}
                                previousLabel={<ArrowCircleLeft size={isMobile ? "64" : "24"}
                                                                color={index === 0 ? "#E3E3E3" : "#014751"}
                                                                className={"pagination-icon"}/>}
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
                <SearchBar/>
                <SideBar/>
                <AlertMessage/>
            </div>
        </>
    )
}
