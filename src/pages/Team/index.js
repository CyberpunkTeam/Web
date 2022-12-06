import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";

export default function TeamScreen() {
    let context = useContext(AppContext);

    const IMAGE = 'https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg'

    const tech = ["python", "react"]
    const pref = ["web", "crypto"]

    const tech_tag = (technology) => {
        return(
            <div className={"tech-tag"}>
                {technology}
            </div>
        )
    }

    const pref_tag = (preference) => {
        return(
            <div className={"pref-tag"}>
                {preference}
            </div>
        )
    }

    const cover = () => {
        return(
            <div className="cover-container">
                <div className="team-data-container">
                    <h1 className="team-name">
                        Equipo Alfa
                    </h1>
                    <div className="tags-container">
                        {tech.map((data) => {
                            return(tech_tag(data))
                        })}
                        {pref.map((data) => {
                            return(pref_tag(data))
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
