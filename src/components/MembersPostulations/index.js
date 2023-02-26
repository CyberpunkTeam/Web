import {UserCirlceAdd} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {getTeamVacants} from "../../services/teamService";
import MemberPostulationView from "../MemberPostulationView";
import {useNavigate} from "react-router-dom";

export default function MembersPostulations(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [vacants, setVacants] = useState(undefined)
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        getTeamVacants(params.tid).then((response) => {
            setVacants(response)
        })
    }, [params.tid, time])

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const changeApplications = (applications) => {
        setVacants(applications)
    }

    const redirect = () => {
        navigate("/new/vacant", {state: {tid: params.tid}})
    }

    const addButton = () => {
        if (params.owner !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={redirect}>
                    <UserCirlceAdd color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="createTeamButton" onClick={redirect}>
                <UserCirlceAdd color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                Create Vacant
            </button>
        )
    }

    const showPostulations = () => {
        if (vacants === undefined) {
            return;
        }

        if (params.members.includes(context.user.uid) && context.user.uid !== params.owner) {
            return
        }

        return (
            <div>
                {vacants.map((data) => {
                    return <MemberPostulationView key={data.tpid}
                                                  data={data}
                                                  owner={params.owner}
                                                  changeApplications={changeApplications}/>
                })}
            </div>
        )
    }

    return (
        <div className="profile-data-container">
            <div className={"user-team-container"}>
                {isMobile ? null : addButton()}
                {showPostulations()}
            </div>
        </div>
    )
}
