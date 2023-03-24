import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useContext, useEffect, useState} from "react";
import Loading from "../../components/loading";
import {getAllTeamPositions, getUserOpportunities} from "../../services/teamService";
import AppContext from "../../utils/AppContext";
import TeamOpportunity from "../../components/TeamOpportunity";
import logo from "../../assests/projects-pana.svg";
import ReactPaginate from "react-paginate";
import {ArrowCircleLeft, ArrowCircleRight} from "iconsax-react";

export default function JobsScreen() {
    let context = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(Date.now());

    const [jobs, setJobs] = useState([]);
    const [index, setIndex] = useState(0);

    const [recommendationsIndex, setRecommendationsIndex] = useState(0);
    const [recommendations, setRecommendations] = useState([]);

    const pageCount = Math.ceil(jobs.length / 10);

    const recommendationsCount = recommendations.length;

    useEffect(() => {
        getAllTeamPositions().then((response) => {
            setJobs(response)
            setLoading(false)
        })
    }, [time]);

    useEffect(() => {
        /*getUserOpportunities(context.user).then((recommendationsResponse) => {
            setRecommendations(recommendationsResponse)
            if (jobs.length !== 0) {
                setLoading(false)
            }
        })*/
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 8000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (loading) {
        return <Loading/>
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % jobs.length;
        window.scrollTo(0, 0);
        setIndex(newOffset);
    };

    const handleRecommendations = (event) => {
        const newOffset = (event.selected * 1);
        setRecommendationsIndex(newOffset);
    };

    const cover = () => {
        return (
            <div className="opportunity-header">
                <div className="projects-cover">
                    <img src={logo} className="pana-projects-style" alt="logo"/>
                    <div className={"projects-cover-title"}>
                        Find the team of your dreams to work on the best projects
                    </div>
                </div>
            </div>
        )
    }

    const coverMobile = () => {

        return (
            <div className={isMobile ? "projects-header-mobile" : "opportunity-header"}>
                <div className="projects-cover-reduced">
                    <div className={isMobile ? "projects-cover-title-reduced-mobile" : "projects-cover-title-reduced"}>
                        Find the team of your dreams to work on the best projects
                    </div>
                    <img src={logo} className={isMobile ? "pana-projects-style-mobile" : "pana-projects-style-reduced"}
                         alt="logo"/>
                </div>
            </div>
        )
    }

    const recommendationsContainer = () => {
        if (recommendations.length === 0) {
            return
        }

        return (
            <div className={"recommendations-container"}>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Recommendations
                </div>
                <TeamOpportunity key={recommendations[recommendationsIndex].tid}
                                 data={recommendations[recommendationsIndex]}/>
                <ReactPaginate
                    containerClassName={isMobile ? "paginationMobile" : "pagination"}
                    breakLabel={'...'}
                    nextLabel={<ArrowCircleRight size={isMobile ? "64" : "24"}
                                                 color={index + 1 >= recommendations.length ? "#E3E3E3" : "#014751"}
                                                 className={"pagination-icon"}/>}
                    onPageChange={handleRecommendations}
                    pageRangeDisplayed={10}
                    pageCount={recommendationsCount}
                    activeClassName={"active-page"}
                    previousLabel={<ArrowCircleLeft size={isMobile ? "64" : "24"}
                                                    color={index === 0 ? "#E3E3E3" : "#014751"}
                                                    className={"pagination-icon"}/>}
                    renderOnZeroPageCount={null}
                />
            </div>

        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            {isMobile || context.size ? coverMobile() : cover()}
            {recommendationsContainer()}
            <div>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Opportunities
                </div>
                {jobs.slice(index, 10 + (index)).map((data) => {
                    return <TeamOpportunity key={data.tid} data={data}/>
                })}
            </div>
            <div className={isMobile ? "paginationMobile" : "pagination"}>
                <ReactPaginate
                    containerClassName={isMobile ? "paginationMobile" : "pagination"}
                    breakLabel={'...'}
                    nextLabel={<ArrowCircleRight size={isMobile ? "64" : "24"}
                                                 color={index + 10 >= jobs.length ? "#E3E3E3" : "#014751"}
                                                 className={"pagination-icon"}/>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    pageCount={pageCount}
                    activeClassName={"active-page"}
                    previousLabel={<ArrowCircleLeft size={isMobile ? "64" : "24"}
                                                    color={index === 0 ? "#E3E3E3" : "#014751"}
                                                    className={"pagination-icon"}/>}
                    renderOnZeroPageCount={null}
                />
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
