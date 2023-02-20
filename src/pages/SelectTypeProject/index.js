import './style.css'
import {Bitcoin, Box1, ChartSquare, CpuSetting, Hex, Mobile, Monitor, Scroll} from "iconsax-react";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";

export default function SelectTypeProject() {
    const navigate = useNavigate();
    let context = useContext(AppContext);

    const redirect = (type) => {
        navigate("/new/projects/data", {state: {type: type}})
    }

    const type = () => {
        if (isMobile) {
            return (
                <>
                    <div className="projectTypeButtonsContainerMobile">
                        <div className="projectTypeButtonLeftMobile" onClick={() => redirect("Base")}>
                            <Box1 size="80" color="#222222" className="projectTypeIcon"/>
                            Empty
                        </div>
                        <div className="projectTypeButtonRightMobile" onClick={() => redirect("Backend")}>
                            <Scroll size="80" color="#222222" className="projectTypeIcon"/>
                            Backend
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainerMobile">
                        <div className="projectTypeButtonLeftMobile" onClick={() => redirect("Web")}>
                            <Monitor size="80" color="#222222" className="projectTypeIcon"/>
                            Web
                        </div>
                        <div className="projectTypeButtonRightMobile" onClick={() => redirect("Mobile")}>
                            <Mobile size="80" color="#222222" className="projectTypeIconPhone"/>
                            Mobile
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainerMobile">
                        <div className="projectTypeButtonLeftMobile" onClick={() => redirect("Crypto")}>
                            <Bitcoin size="80" color="#222222" className="projectTypeIcon"/>
                            Crypto
                        </div>
                        <div className="projectTypeButtonRightMobile" onClick={() => redirect("Data Analytics")}>
                            <ChartSquare size="80" color="#222222" className="projectTypeIcon"/>
                            Data Analytics
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainerMobile">
                        <div className="projectTypeButtonLeftMobile" onClick={() => redirect("Data Science")}>
                            <Hex size="80" color="#222222" className="projectTypeIcon"/>
                            Data Science
                        </div>
                        <div className="projectTypeButtonRightMobile" onClick={() => redirect("Data Engineering")}>
                            <CpuSetting size="80" color="#222222" className="projectTypeIcon"/>
                            Data Engineering
                        </div>
                    </div>
                </>
            )
        } else if (context.size) {
            return (
                <>
                    <div className="projectTypeButtonsContainer">
                        <div className="projectTypeButtonLeft" onClick={() => redirect("Base")}>
                            <Box1 size="40" color="#222222" className="projectTypeIcon"/>
                            Empty
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Backend")}>
                            <Scroll size="40" color="#222222" className="projectTypeIcon"/>
                            Backend
                        </div>
                        <div className="projectTypeButtonRight" onClick={() => redirect("Web")}>
                            <Monitor size="40" color="#222222" className="projectTypeIcon"/>
                            Web
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainer">
                        <div className="projectTypeButtonLeft" onClick={() => redirect("Mobile")}>
                            <Mobile size="40" color="#222222" className="projectTypeIconPhone"/>
                            Mobile
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Crypto")}>
                            <Bitcoin size="40" color="#222222" className="projectTypeIcon"/>
                            Crypto
                        </div>
                        <div className="projectTypeButtonRight" onClick={() => redirect("Data Analytics")}>
                            <ChartSquare size="40" color="#222222" className="projectTypeIcon"/>
                            Data Analytics
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainer">
                        <div className="projectTypeButtonLeft" onClick={() => redirect("Data Science")}>
                            <Hex size="40" color="#222222" className="projectTypeIcon"/>
                            Data Science
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Data Engineering")}>
                            <CpuSetting size="40" color="#222222" className="projectTypeIcon"/>
                            Data Engineering
                        </div>
                        <div className="projectTypeButtonWhiteRight"/>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="projectTypeButtonsContainer">
                        <div className="projectTypeButtonLeft" onClick={() => redirect("Base")}>
                            <Box1 size="40" color="#222222" className="projectTypeIcon"/>
                            Empty
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Backend")}>
                            <Scroll size="40" color="#222222" className="projectTypeIcon"/>
                            Backend
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Web")}>
                            <Monitor size="40" color="#222222" className="projectTypeIcon"/>
                            Web
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Mobile")}>
                            <Mobile size="40" color="#222222" className="projectTypeIconPhone"/>
                            Mobile
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Crypto")}>
                            <Bitcoin size="40" color="#222222" className="projectTypeIcon"/>
                            Crypto
                        </div>
                    </div>
                    <div className="projectTypeButtonsContainer">
                        <div className="projectTypeButtonLeft" onClick={() => redirect("Data Analytics")}>
                            <ChartSquare size="40" color="#222222" className="projectTypeIcon"/>
                            Data Analytics
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Data Science")}>
                            <Hex size="40" color="#222222" className="projectTypeIcon"/>
                            Data Science
                        </div>
                        <div className="projectTypeButton" onClick={() => redirect("Data Engineering")}>
                            <CpuSetting size="40" color="#222222" className="projectTypeIcon"/>
                            Data Engineering
                        </div>
                        <div className="projectTypeButtonWhite"/>
                        <div className="projectTypeButtonWhiteRight"/>
                    </div>
                </>
            )
        }
    }


    return (
        <div className={isMobile ? "profile-screen-mobile" :"profile-screen"}>
            <div className="projectTypeContainer">
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    Select a Project Type
                </div>
                {type()}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
