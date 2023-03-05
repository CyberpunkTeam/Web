import './style.css';
import logo from '../../assests/projects-pana.svg';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle, ArrowCircleLeft, ArrowCircleRight, ArrowDown2} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import {getProjects} from "../../services/projectService";
import Loading from "../../components/loading";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";
import ProjectTileMobileComponent from "../../components/ProjectTileMobileComponent";
import ReactPaginate from "react-paginate";
import {
    databasesOptions,
    frameworksOptionsDataAll,
    optionsLanguages,
    optionsProjects,
    platformsOptions
} from "../../config/dictonary";
import {
    selected4,
    selectedGreenStyle,
    selectedViolet,
    selectedViolet2,
    selectedViolet3
} from "../../styles/commonStyles";
import Select from "react-select";

export default function ProjectsScreen() {
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(true);
    const [time, setTime] = useState(Date.now());
    const [shake, setShake] = useState(false);
    const [index, setIndex] = useState(0);
    const pageCount = Math.ceil(projects.length / 10);
    const [toolsFilters, setToolsFilters] = useState(false)
    const [preferencesFilters, setPreferencesFilters] = useState(false)

    const toolButton = () => {
        setPreferencesFilters(false)
        setToolsFilters(!toolsFilters)
    }

    const preferencesButton = () => {
        setToolsFilters(false)
        setPreferencesFilters(!preferencesFilters)
    }

    const closeAll = () => {
        setToolsFilters(false);
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % projects.length;
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
        getProjects().then((response) => {
            setProjects([...response]);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    if (loading) {
        return <Loading/>
    }

    const coverMobile = () => {
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
                return (
                    <div className={"filters-button-selector-container"}>
                        <button className={"filters-buttons"} onClick={toolButton}>
                            Tools
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        </button>
                        <div
                            className={toolsFilters ? "filters-selector-container" : "filters-selector-container-hidden"}>
                            <div className={"filters-selectors-container"}>
                                <div className={"filters-selectors-column-container"}>
                                    <div className={"filters-selectors-input"}>
                                        Programming Languages
                                        <Select
                                            isMulti
                                            options={optionsLanguages}
                                            styles={selectedViolet}
                                        />
                                    </div>
                                    <div className={"filters-selectors-input"}>
                                        Frameworks
                                        <Select
                                            isMulti
                                            options={frameworksOptionsDataAll}
                                            styles={selectedViolet3}
                                        />
                                    </div>
                                </div>
                                <div className={"filters-selectors-column-container"}>
                                    <div className={"filters-selectors-input"}>
                                        Platforms
                                        <Select
                                            isMulti
                                            options={platformsOptions}
                                            styles={selectedViolet2}
                                        />
                                    </div>
                                    <div className={"filters-selectors-input"}>
                                        Databases
                                        <Select
                                            isMulti
                                            options={databasesOptions}
                                            styles={selected4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            const preferences = () => {
                return (
                    <div className={"filters-button-selector-container"}>
                        <button className={"filters-buttons"} onClick={preferencesButton}>
                            Preferences
                            <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                        </button>
                        <div
                            className={preferencesFilters ? "filters-selector-container" : "filters-selector-container-hidden"}>
                            <div className={"filters-selectors-container"}>
                                <div>
                                    Project Preferences
                                    <Select
                                        isMulti
                                        options={optionsProjects}
                                        styles={selectedGreenStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div className={"filters-container"}>
                    {tools()}
                    {preferences()}
                    <button className={"filters-buttons"}>
                        Budget
                        <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                    </button>
                    <button className={"filters-buttons"}>
                        Language
                        <ArrowDown2 size={16} color={"#222222"} className={"filters-buttons-icon"}/>
                    </button>
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

    return (
        <>
            {toolsFilters ? <div onClick={closeAll} className="all-sidebar"/> : null}
            <div>
                <div className={isMobile ? "profile-screen-mobile" : "projects-screen"}>
                    {isMobile || context.size ? coverMobile() : cover()}
                    <div className="projects-container">
                        {projects.slice(index, 10 + (index)).map((value) => {
                            return <ProjectTileMobileComponent key={value.pid} data={value}/>
                        })}
                        <div className={"pagination"}>
                            <ReactPaginate
                                containerClassName={"pagination"}
                                breakLabel={'...'}
                                nextLabel={<ArrowCircleRight size="24"
                                                             color={index + 10 > projects.length ? "#E3E3E3" : "#014751"}
                                                             className={"pagination-icon"}/>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={10}
                                pageCount={pageCount}
                                activeClassName={"active-page"}
                                previousLabel={<ArrowCircleLeft size="24" color={index === 0 ? "#E3E3E3" : "#014751"}
                                                                className={"pagination-icon"}/>}
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        </>
    )
}
