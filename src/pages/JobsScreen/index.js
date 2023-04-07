import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useContext, useEffect, useState} from "react";
import Loading from "../../components/loading";
import {getAllTeamPositions, getUserOpportunities} from "../../services/teamService";
import AppContext from "../../utils/AppContext";
import TeamOpportunity from "../../components/TeamOpportunity";
import logo from "../../assests/Collab-pana.svg";
import ReactPaginate from "react-paginate";
import {ArrowCircleLeft, ArrowCircleRight, ArrowDown2, ArrowUp2} from "iconsax-react";
import AlertMessage from "../../components/AlertMessage";
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
    selectedCloud,
    selectedColor5,
    selectedDb, selectedFrameworks, selectedLanguages, selectedPlatform,
    selectedViolet,
    selectedViolet2,
    selectedViolet3
} from "../../styles/commonStyles";

export default function JobsScreen() {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(Date.now());

    const [jobs, setJobs] = useState([]);
    const [index, setIndex] = useState(0);

    const [recommendationsIndex, setRecommendationsIndex] = useState(0);
    const [recommendations, setRecommendations] = useState([]);

    const pageCount = Math.ceil(jobs.length / 10);

    const recommendationsCount = recommendations.length;

    const [filtersMobile, setFiltersMobile] = useState(false)
    const [toolsFilters, setToolsFilters] = useState(false)
    const [techs, setTechs] = useState([])
    const [techsDefaults, setTechsDefaults] = useState([])
    const [frameworks, setFrameworks] = useState([])
    const [frameworksDefault, setFrameworksDefault] = useState([])
    const [cloud, setClouds] = useState([])
    const [cloudDefault, setCloudDefault] = useState([])
    const [databases, setDatabases] = useState([])
    const [databasesDefault, setDatabasesDefault] = useState([])
    const [preferencesFilters, setPreferencesFilters] = useState(false)
    const [platforms, setPlatforms] = useState([])
    const [platformsDefault, setPlatformsDefault] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        getAllTeamPositions().then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== "An error has occurred while loading jobs opportunities. Please, try again later") {
                    if (jobs === undefined) {
                        setJobs([]);
                    }
                    context.setErrorMessage("An error has occurred while loading jobs opportunities. Please, try again later");
                }
                return
            }
            setJobs(response)
            setLoading(false)
        })
    }, [time]);

    useEffect(() => {
        getUserOpportunities(context.user).then((recommendationsResponse) => {
            if (recommendationsResponse === undefined) {
                if (context.errorMessage !== "An error has occurred while loading jobs recommendations. Please, try again later") {
                    if (recommendations === undefined) {
                        setRecommendations([]);
                    }
                    context.setErrorMessage("An error has occurred while loading jobs recommendations. Please, try again later");
                }
                return
            }
            setRecommendations(recommendationsResponse)
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 8000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const toolButton = () => {
        setPreferencesFilters(false)
        setToolsFilters(!toolsFilters)
    }

    const filterButton = () => {
        setFiltersMobile(!filtersMobile)
    }

    const closeAll = () => {
        setToolsFilters(false);
        setFiltersMobile(false);
        setPreferencesFilters(false);
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

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % jobs.length;
        window.scrollTo(0, 0);
        setIndex(newOffset);
    };

    const handleRecommendations = (event) => {
        const newOffset = (event.selected * 1);
        setRecommendationsIndex(newOffset);
    };

    const cleanAll = () => {
        setTechs([])
        setTechsDefaults([])

        setFrameworks([])
        setFrameworksDefault([])

        setDatabases([])
        setDatabasesDefault([])

        setPlatforms([])
        setPlatformsDefault([])
    }

    const filtersMobileAndReduced = () => {
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
                    </div>
                    <div className={"filters-container-options-buttons-reduced"}>
                        <button className={"cancel-edit-button-style-reduced"} onClick={cleanAll}>Clean All</button>
                        <button disabled={buttonDisabled}
                                className={buttonDisabled ? "filter-button-disabled-reduced" : "filter-button-reduced"}>
                            {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                            {buttonDisabled ? "" : "Apply"}
                        </button>
                    </div>
                </div>
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
                                        styles={isMobile ? selectedLanguages : selectedViolet}
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
                                        styles={isMobile ? selectedFrameworks : selectedViolet3}
                                        onChange={(choice) => setFrameworkHandler(choice)}
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
                                        styles={isMobile ? selectedPlatform : selectedViolet2}
                                        onChange={(choice) => setPlatformsHandler(choice)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={"filters-selectors-column-container"}>
                            <div className={"filters-selectors-input"}>
                                Cloud Providers ({cloud.length}/5)
                                <div className="modal-form-input-select">
                                    <Select
                                        isMulti
                                        value={cloudDefault}
                                        isOptionDisabled={(option) => cloud.length === 5}
                                        options={CloudOptions}
                                        styles={isMobile ? selectedCloud : selected4}
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
                                        styles={isMobile ? selectedDb : selectedColor5}
                                        onChange={(choice) => setDBHandler(choice)}
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
                <div className={"filters-jobs-container-buttons"}>
                    <button className={"filters-buttons"} onClick={toolButton}>
                        Filters
                        {toolsFilters ?
                            <ArrowUp2 size={16} color={"#222222"} className={"filters-buttons-icon"}/> :
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        }
                    </button>
                </div>
                <div
                    className={toolsFilters || preferencesFilters ? "filters-container-div" : "filters-selector-container-hidden"}>
                    <div className={"filters-container-options"}>
                        {tools()}
                    </div>
                    <div className={"filters-container-options-buttons"}>
                        <button className={"cancel-edit-button-style"} onClick={cleanAll}>Clean All</button>
                        <button disabled={buttonDisabled}
                                className={buttonDisabled ? "filter-button-disabled" : "filter-button"}
                        >
                            {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                            {buttonDisabled ? "" : "Apply"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const cover = () => {
        return (
            <div className="opportunity-header">
                <div className="projects-cover">
                    <img src={logo} className="pana-jobs-style" alt="logo"/>
                    <div className={"projects-cover-title"}>
                        Discover your dream team to work on the coolest projects ever!
                    </div>
                </div>
                {filters()}
            </div>
        )
    }

    const coverMobile = () => {

        return (
            <div className={isMobile ? "projects-header-mobile" : "opportunity-header"}>
                <div className="projects-cover-reduced">
                    <div className={isMobile ? "projects-cover-title-reduced-mobile" : "projects-cover-title-reduced"}>
                        Discover your dream team to work on the coolest projects ever!
                    </div>
                    <img src={logo} className={isMobile ? "pana-projects-style-mobile" : "pana-projects-style-reduced"}
                         alt="logo"/>
                </div>
                {isMobile ? null : filtersMobileAndReduced()}
            </div>
        )
    }

    const recommendationsContainer = () => {
        if (recommendations.length === 0) {
            return
        }

        return (
            <div className={"recommendations-container"}>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Recommendations
                </div>
                <TeamOpportunity key={recommendations[recommendationsIndex].tid}
                                 data={recommendations[recommendationsIndex]}/>
                <ReactPaginate
                    containerClassName={isMobile ? "paginationMobile" : "pagination"}
                    breakLabel={'...'}
                    nextLabel={<ArrowCircleRight size={isMobile ? "64" : "24"}
                                                 color={recommendationsIndex + 1 >= recommendations.length ? "#E3E3E3" : "#014751"}
                                                 className={"pagination-icon"}/>}
                    onPageChange={handleRecommendations}
                    pageRangeDisplayed={10}
                    pageCount={recommendationsCount}
                    activeClassName={"active-page"}
                    previousLabel={<ArrowCircleLeft size={isMobile ? "64" : "24"}
                                                    color={recommendationsIndex === 0 ? "#E3E3E3" : "#014751"}
                                                    className={"pagination-icon"}/>}
                    renderOnZeroPageCount={null}
                />
            </div>

        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            {isMobile || context.size ? coverMobile() : cover()}
            {recommendationsContainer()}
            <div>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Opportunities
                </div>
                {jobs.slice(index, 10 + (index)).map((data) => {
                    return <TeamOpportunity key={data.tpid} data={data}/>
                })}
            </div>
            <div className={isMobile ? "paginationMobile" : "pagination"}>
                <ReactPaginate
                    containerClassName={isMobile ? "paginationMobile" : "pagination"}
                    breakLabel={'...'}
                    nextLabel={<ArrowCircleRight size={isMobile ? "64" : "24"}
                                                 color={index + 10 >= jobs.length ? "#E3E3E3" : "#014751"}
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
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    );
}
