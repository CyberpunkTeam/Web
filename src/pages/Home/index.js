import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useContext} from "react";
import AppContext from "../../utils/AppContext";
import {People} from "iconsax-react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

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
            <button className="createTeamButton" onClick={create}>
                <People color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Create new Team
            </button>
        )
    }

    const createProject = () => {
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
            <button className="createTeamButton" onClick={create}>
                <People color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Create new Project
            </button>
        )
    }

    const createArticle = () => {
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
            <button className="createTeamButton" onClick={create}>
                <People color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                Create new Article
            </button>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Welcome {context.user.name}
                </div>
                <div className={context.size || isMobile ? "article-container-reduced" : "article-container"}>
                    <div className={isMobile || context.size ? "author-data-container-reduced" : "author-data-container"}>
                        {createTeam()}
                        {createProject()}
                        {createArticle()}
                    </div>
                    <div className={isMobile || context.size ? "article-data-container-reduced" : "article-data-container"}>
                        a
                    </div>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )

}
