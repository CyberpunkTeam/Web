import './style.css';
import SideBar from "../../components/SideBar";
import {useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import {getTeam} from "../../services/teamService";
import {AddCircle, People, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";

export default function TeamScreen() {
    const params = useParams();
    let context = useContext(AppContext);
    const [teamData, setTeamData] = useState(undefined)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTeam(params.id).then((response) => {
            const res = {
                tid: response.tid,
                name: response.name,
                technologies: response.technologies,
                project_preferences: response.project_preferences,
                owner: response.owner
            }
            setTeamData(res)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, [params.id]);

    if (loading) {
        return <Loading/>
    }

    const IMAGE = 'https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg'

    const tech_tag = (technology) => {
        return (
            <div key={technology} className={"tech-tag"}>
                {technology}
            </div>
        )
    }

    const pref_tag = (preference) => {
        return (
            <div key={preference} className={"pref-tag"}>
                {preference}
            </div>
        )
    }

    const cover = () => {
        return (
            <div className="cover-container">
                <div className="team-data-container">
                    <h1 className="team-name">
                        {teamData.name}
                    </h1>
                    <div className="tags-container">
                        {teamData.technologies.map((data) => {
                            return (tech_tag(data))
                        })}
                        {teamData.project_preferences.map((data) => {
                            return (pref_tag(data))
                        })}
                    </div>
                </div>
                <img src={IMAGE} className="image-container" alt=""/>
            </div>
        )
    }

    const members = () => {
        return (
            <div className="members-info-container">
                {teamData.owner === context.user.uid ?
                    <AddCircle size="24" color="#B1B1B1" className="add-button"/> : null}
                <div className="members-info">
                    <div className="data-title">
                        <People size="32" color="#014751" className={"icon"}/>
                        Miembros
                    </div>
                    <div className="members-data">
                        1 Usuario
                        <div className="members">
                            <div className="member">
                                <div className="user-sidebar">
                                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                                </div>
                                <div className="member-name">
                                    Gonzalo Marino
                                    <div className="owner">
                                        owner
                                    </div>
                                </div>
                            </div>
                            <div className="member">
                                <div className="user-sidebar">
                                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                                </div>
                                <div className="member-name">
                                    Gonzalo Marino
                                </div>
                            </div>
                        </div>
                        <div className="members">
                            <div className="member">
                                <div className="user-sidebar">
                                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                                </div>
                                <div className="member-name">
                                    Gonzalo Marino
                                </div>
                            </div>
                            <div className="member">
                                <div className="user-sidebar">
                                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                                </div>
                                <div className="member-name">
                                    Gonzalo Marino
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (teamData.tid === undefined) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="team-screen">
                <div className="team-container">
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {members()}
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }
}
