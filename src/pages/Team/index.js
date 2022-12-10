import './style.css';
import SideBar from "../../components/SideBar";
import {useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useEffect, useState} from "react";
import {getTeam} from "../../services/teamService";

export default function TeamScreen() {
    const params = useParams();
    const [teamData, setTeamData] = useState(undefined)
    const [loading, setLoading] = useState(true);
    console.log(params)

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

    return (
        <div className="team-screen">
            <SideBar/>
            <div className="team-container">
                {cover()}
            </div>
        </div>
    )
}
