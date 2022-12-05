import './style.css';
import logo from "../../assests/logo-complete.svg";

function Logo() {
    return (
        <header className="container-logo">
            <img src={logo} className="logo" alt="logo"/>
            <h2>
                Find My Team
            </h2>
        </header>
    );
}

export default Logo;