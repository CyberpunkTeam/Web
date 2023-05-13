import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle, SearchNormal1, User} from "iconsax-react";
import NotFound from "../NotFound";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import FrameworkTag from "../../components/FrameworkTag";
import PlatformTag from "../../components/PlatformTag";
import {isMobile} from "react-device-detect";
import CloudTag from "../../components/CloudTag";
import AlertMessage from "../../components/AlertMessage";
import {search} from "../../services/searchService";

export default function SearchResults() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [filter, setFilter] = useState(context.search === undefined ? "" : context.search.users.length !== 0 ? "users" : "teams")

    const [searchWord, setSearchWord] = useState("")

    const teamView = (data) => {
        const goTo = () => {
            navigate("/team/" + data.tid)
        }
        const teamTags = (data) => {
            return (
                <div className={isMobile || context.size ? "teamTagsMobile" : "teamTags"}>
                    {data.technologies.programming_language.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                    {data.technologies.frameworks.map((data) => {
                        return <FrameworkTag key={data} framework={data}/>
                    })}
                    {data.technologies.platforms.map((data) => {
                        return <PlatformTag key={data} platform={data}/>
                    })}
                    {data.technologies.databases.map((data) => {
                        return <CloudTag key={data} cloud={data}/>
                    })}
                    {data.project_preferences.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                    {data.idioms === null ? null : data.idioms.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                    {data.methodologies === null ? null : data.methodologies.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                </div>
            )
        }

        const teamViewTitle = (data) => {

            const team_link = "/team/" + data.tid;

            return (
                <div key={data.tid}
                     className={isMobile ? "teamDataInfoMobile" : context.size ? "teamDataInfoReduce" : "teamDataInfo"}>
                    <Link to={team_link} className={isMobile ? "teamLinkNameMobile" : "teamLinkName"}>
                        {data.name}
                    </Link>
                </div>
            )
        }

        return (
            <div key={data.tid} className={isMobile ? "teamContainerMobile" : "teamContainer"} onClick={goTo}>
                <div className={isMobile || context.size ? "teamInfoMobile" : "teamInfo"}>
                    {teamViewTitle(data)}
                    {teamTags(data)}
                </div>
            </div>
        )
    }

    const userView = (data) => {
        if (context.user.uid === data.uid) {
            return
        }
        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className={isMobile ? "search_user_image-mobile" : "search_user_image"}>
                        <User color="#FAFAFA" size={isMobile ? "40" : "40px"} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt=''
                            className={isMobile ? "search_user_image-mobile" : "search_user_image"}/>
            }
        }

        const link_url = "/user/" + data.uid

        return (
            <div key={data.uid}
                 className={isMobile ? "search-result-view-mobile" : context.size ? "search-result-view-reduced" : "search-result-view"}>
                <div className={isMobile ? "search-result-view-info-mobile" : "search-result-view-info"}>
                    {user_image(data)}
                    <div to={link_url}
                         className={isMobile ? "search-result-view-data-mobile" : "search-result-view-data"}>
                        <Link to={link_url} className="search-link-user">
                            {data.name} {data.lastname}
                        </Link>
                        <div
                            className={isMobile ? "search-result-view-data-location-mobile" : "search-result-view-data-location"}>
                            {data.location}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const showUsers = () => {
        return context.search.users.map((user) => {
            return userView(user)
        })
    }

    const showTeams = () => {
        return context.search.teams.map((team) => {
            return teamView(team)
        })
    }

    if (isMobile) {
        const setSearchHandler = (event) => {
            setSearchWord(event.target.value);
            if (event.target.value === "") {
                context.setSearch({})
                return
            }
            search(event.target.value).then((response) => {
                context.setSearch(response)
            })
        }

        const clearSearch = () => {
            setSearchWord("")
        }

        const showResults = () => {
            if (context.search === undefined || Object.keys(context.search).length === 0) {

            } else {
                return (
                    <div>
                        <div className="search-header-buttons-mobile">
                            <button
                                className={filter === "users" ? "button-members-selected-mobile" : "button-members-mobile"}
                                onClick={() => {
                                    setFilter("users")
                                }}>
                                Users
                            </button>
                            <button
                                className={filter === "users" ? "button-members-mobile" : "button-members-selected-mobile"}
                                onClick={() => {
                                    setFilter("teams")
                                }}>
                                Teams
                            </button>
                        </div>
                        <div className="search-result-page-mobile-container">
                            {filter === "users" ? showUsers() : showTeams()}
                        </div>
                    </div>
                )
            }
        }


        return (
            <div className={"chatDivMobile"}>
                <div className={"search-mobile-container"}>
                    <div className="search-input-mobile">
                        <input type="text" value={searchWord}
                               className="search-input-text-mobile"
                               onChange={setSearchHandler}/>
                        <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={48}/>
                        {searchWord !== "" ?
                            <CloseCircle className="clear-icon" color="#B1B1B1" variant="Outline" size={48}
                                         onClick={clearSearch}/> : null}
                    </div>
                    {showResults()}
                </div>
                <SearchBar/>
                <SideBar/>
                <AlertMessage/>
            </div>
        )
    }

    if (context.search === undefined) {
        return <NotFound/>
    }

    return (
        <div className="screen">
            <div className="search-header">
                <div className="search-header-buttons">
                    <button className={filter === "users" ? "button-members-selected" : "button-members"}
                            onClick={() => {
                                setFilter("users")
                            }}>
                        Users
                    </button>
                    <button className={filter === "users" ? "button-members" : "button-members-selected"}
                            onClick={() => {
                                setFilter("teams")
                            }}>
                        Teams
                    </button>
                </div>
            </div>
            <div className="search-result-page-container">
                {filter === "users" ? showUsers() : showTeams()}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
