import './style.css';
import logo from "../../assests/logo-complete.svg";
import { isMobile,} from "react-device-detect";

function Logo() {
    return (
        <header className={isMobile ? "container-logo-mobile" : "container-logo"}>
            <img src={logo} className={isMobile ? "logo-mobile" : "logo"} alt="logo"/>
            <h3>
                Find My Team
            </h3>
        </header>
    );
}

export default Logo;
