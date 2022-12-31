import './style.css'
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {User} from "iconsax-react";
import NotFound from "../NotFound";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";

export default function SearchResults() {
    let context = useContext(AppContext);
    const [filter, setFilter] = useState(context.search === undefined ? "" : context.search.users.length !== 0 ? "users" : "teams" )

    if (context.search === undefined) {
        return <NotFound/>
    }

    const teamView = (data) => {
        const link_url = "/team/" + data.tid

        return (
            <div key={data.uid} className="search-result-view">
                <div className="search-result-view-info">
                    <div className="search-result-view-data">
                        <Link to={link_url} className="search-link">
                            {data.name}
                        </Link>
                        <div className="search-result-view-data-location">
                            <div className="tags-modal">
                                {data.technologies.map((data) => {
                                    return <TechnologyTag key={data + "-modal"} technology={data}/>
                                })}
                            </div>
                            <div className="tags-modal">
                                {data.project_preferences.map((data) => {
                                    return <PreferenceTag key={data + "-modal"} preference={data}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const userView = (data) => {
        if(context.user.uid === data.uid){
            return
        }
        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className="search_user_image">
                        <User color="#FAFAFA" size="40px" variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt='' className="search_user_image"/>
            }
        }

        const link_url = "/user/" + data.uid

        return (
            <div key={data.uid} className="search-result-view">
                <div className="search-result-view-info">
                    {user_image(data)}
                    <div to={link_url} className="search-result-view-data">
                        <Link to={link_url} className="search-link">
                            {data.name} {data.lastname}
                        </Link>
                        <div className="search-result-view-data-location">
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

    return (
        <div className="screen">
                <div className="search-header">
                    <div className="search-header-buttons">
                        <button className={filter === "users" ? "button-members-left-selected" : "button-members-left"} onClick={() => {
                            setFilter("users")
                        }}>
                            Usuarios
                        </button>
                        <button className={filter === "users" ? "button-members-right" : "button-members-right-selected"} onClick={() => {
                            setFilter("teams")
                        }}>
                            Equipos
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