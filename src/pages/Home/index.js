import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {LampCharge, Notepad2, People} from "iconsax-react";
import {useNavigate} from "react-router-dom";
import {getArticles} from "../../services/contentService";
import PublicationTile from "../../components/PublicationTile";
import Loading from "../../components/loading";

export default function Home() {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [articles, setArticles] = useState(undefined)

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    useEffect(() => {
        getArticles().then((articlesResponse) => {
            if (articlesResponse === undefined) {
                setError("An error has occurred while loading user's information. Please, try again later");
                return
            }
            setArticles(articlesResponse)
        })
    }, [])

    if (articles === undefined) {
        return <Loading/>
    }

    const createTeam = () => {
        const create = () => {
            navigate("/team/new")
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={create}>
                    <People color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonTeamReduced" : "homeButtonTeam"} onClick={create}>
                <People color="#FAFAFA" variant="Bold" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Create Team"}
            </button>
        )
    }

    const createProject = () => {
        const create = () => {
            navigate("/new/projects/type")
        }

        if (isMobile) {
            return (
                <button className="createProjectButtonMobile" onClick={create}>
                    <LampCharge color="#FAFAFA" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonProjectReduced" : "homeButtonProject"} onClick={create}>
                <LampCharge color="#FAFAFA" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Create Project"}
            </button>
        )
    }

    const createArticle = () => {
        const create = () => {
            navigate("/new/articles")
        }

        if (isMobile) {
            return (
                <button className="createArticleButtonMobile" onClick={create}>
                    <Notepad2 color="#FAFAFA" size={48}/>
                </button>
            )
        }

        return (
            <button className={context.size ? "homeButtonReduced" : "homeButton"} onClick={create}>
                <Notepad2 color="#FAFAFA" size={24} className={context.size ? null : "icon"}/>
                {context.size ? null : "Create Article"}
            </button>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div>
                <div className={context.size || isMobile ? "article-container-reduced" : "article-container"}>
                    <div className={isMobile || context.size ? "buttonsCreations" : "buttons-home-container"}>
                        <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                            Welcome {context.user.name}
                        </div>
                        <div className={isMobile || context.size ? "buttonsMobileCreations" : null}>
                            {createTeam()}
                            {createProject()}
                            {createArticle()}
                        </div>
                    </div>
                    <div className={"home-data-container-reduced"}>
                        <div
                            className={isMobile || context.size ? "article-data-container-reduced" : "article-data-container"}>
                            {articles.map((article) => {
                                return <PublicationTile key={article.cid} publication={article}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )

}
