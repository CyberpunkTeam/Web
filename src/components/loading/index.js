import logo from '../../assests/fmt-logo.svg';
import './style.css';
import {isMobile} from "react-device-detect";

function Loading() {
    return (
        <div className={isMobile ? "App-mobile-loading" : "App-header"}>
            <img src={logo} className={isMobile ? "App-logo-mobile" : "App-logo"} alt="logo"/>
        </div>
    );
}

export default Loading;
