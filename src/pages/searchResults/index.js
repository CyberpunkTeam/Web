import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle, Notepad2, People, SearchNormal1, User} from "iconsax-react";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import FrameworkTag from "../../components/FrameworkTag";
import PlatformTag from "../../components/PlatformTag";
import {isMobile} from "react-device-detect";
import CloudTag from "../../components/CloudTag";
import {search} from "../../services/searchService";
import FollowingTag from "../../components/FollowingTag";
import BlockTag from "../../components/BlockTag";

export default function SearchResults() {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [filter, setFilter] = useState(context.search === undefined ? "users" : context.search.users.length !== 0 ? "users" : "teams")
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
                    {data.state === "BLOCKED" ? <BlockTag/> : null}
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

    const ArticleView = (data) => {
        const goTo = () => {
            navigate("/articles/" + data.cid)
        }

        const coverImage = () => {
            if (data.cover_image === "default") {
                return (
                    <div className={isMobile ? "article-cover-container-mobile" : "article-cover-container"}/>
                )
            }
            return <img src={data.cover_image} className={isMobile ? "image-container-mobile" : "image-container"}
                        alt=""/>
        }

        const articleViewTitle = (data) => {

            const article_link = "/article/" + data.cid;

            return (
                <div key={data.cid}
                     className={isMobile ? "teamDataInfoMobile" : context.size ? "teamDataInfoReduce" : "teamDataInfo"}>
                    <Link to={article_link} className={isMobile ? "teamLinkNameMobile" : "teamLinkName"}>
                        {data.title}
                    </Link>
                </div>
            )
        }


        return (
            <div key={data.cid} className={isMobile ? "cover-container-mobile-search" : "cover-container-search"}
                 onClick={goTo}>
                <div className={isMobile ? "user-cover-container-mobile" : "user-cover-container"}>
                    <div className={isMobile || context.size ? "teamInfoMobile" : "articleInfo"}>
                        {articleViewTitle(data)}
                    </div>
                </div>
                {coverImage()}
            </div>
        )
    }

    const userView = (data) => {
        if (context.user.uid === data.uid) {
            return
        }

        const goToUser = () => {
            navigate("/user/" + data.uid)
        }

        const user_data = () => {
            return (
                <div key={data.uid} className="user-data-container">
                    <div className={isMobile ? "name-mobile" : "name"}>
                        {data.name} {data.lastname}
                        {context.user.following.users.includes(data.uid) ? <FollowingTag/> : null}
                    </div>
                    <div className={isMobile ? "extra-data-mobile" : "extra-data"}>
                        {data.email}
                    </div>
                </div>
            )
        }

        const user_image = () => {
            if (data.profile_image === "default") {
                return (
                    <div className={isMobile ? "user-svg-mobile" : "user-svg"}>
                        <User color="#FAFAFA" size={isMobile ? "100px" : "50px"} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt={'user'}
                            className={isMobile ? "user-svg-mobile" : "user"}/>
            }
        }

        const coverImage = () => {
            if (data.cover_image === "default") {
                return (
                    <div className={isMobile ? "cover-user-container-mobile" : "cover-user-container"}/>
                )
            }
            return <img src={data.cover_image} className={isMobile ? "image-container-mobile" : "image-container"}
                        alt=""/>
        }

        return (
            <div key={data.uid} className={isMobile ? "cover-container-mobile-search" : "cover-container-search"}
                 onClick={goToUser}>
                <div className={isMobile ? "user-cover-container-mobile" : "user-cover-container"}>
                    <div className={context.size ? "user-data-reduce" : "user-data"}>
                        {user_image()}
                        {user_data()}
                    </div>
                </div>
                {coverImage()}
            </div>
        )
    }

    const showUsers = () => {
        if (context.search === undefined) {
            return
        }

        return context.search.users.map((user) => {
            return userView(user)
        })
    }

    const showTeams = () => {
        if (context.search === undefined) {
            return
        }

        return context.search.teams.map((team) => {
            return teamView(team)
        })
    }

    const showArticles = () => {
        if (context.search === undefined) {
            return
        }

        return context.search.contents.map((article) => {
            return ArticleView(article)
        })
    }

    const searchMobile = () => {

        const setSearchHandler = (event) => {
            setSearchWord(event.target.value);
            if (event.target.value === "") {
                context.setSearch({})
                return
            }
            search(event.target.value, context).then((response) => {
                context.setSearch(response)
            })
        }

        const clearSearch = () => {
            setSearchWord("")
        }

        return (
            <div className="search-input-mobile">
                <input type="text" value={searchWord}
                       className="search-input-text-mobile"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={48}/>
                {searchWord !== "" ?
                    <CloseCircle className="clear-icon" color="#B1B1B1" variant="Outline" size={48}
                                 onClick={clearSearch}/> : null}
            </div>
        )
    }

    const users = () => {
        const create = () => {
            setFilter("users")
        }

        if (isMobile) {
            return (
                <button className="createProjectButtonMobile" onClick={create}>
                    <User color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonUserReduced" : "homeButtonUsers"} onClick={create}>
                <User color="#FAFAFA" size={24} variant="Bold" className={context.size ? null : "icon"}/>
                {context.size ? null : "Users"}
            </button>
        )
    }

    const team = () => {
        const change = () => {
            setFilter("teams")
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={change}>
                    <People color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonTeamReduced" : "homeButtonTeam"} onClick={change}>
                <People color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Teams"}
            </button>
        )
    }

    const articles = () => {
        const change = () => {
            setFilter("articles")
        }

        if (isMobile) {
            return (
                <button className="createArticleButtonMobile" onClick={change}>
                    <Notepad2 color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonReduced" : "homeButton"} onClick={change}>
                <Notepad2 color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Articles"}
            </button>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div>
                {isMobile ? searchMobile() : null}
                <div className={context.size || isMobile ? "article-container-reduced" : "article-container"}>
                    <div className={isMobile || context.size ? "buttonsCreations" : "buttons-home-container"}>
                        <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                            Filter by: {filter.slice(0, 1).toUpperCase() + filter.slice(1, filter.length)}
                        </div>
                        <div className={isMobile || context.size ? "buttonsMobileCreations" : null}>
                            {users()}
                            {team()}
                            {articles()}
                        </div>
                    </div>
                    <div className={"home-data-container-reduced"}>
                        <div
                            className={isMobile || context.size ? "article-data-container-reduced" : "article-data-container"}>
                            {filter === "users" ? showUsers() : filter === "teams" ? showTeams() : showArticles()}
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar show={false}/>
            <SideBar/>
        </div>
    )
}
