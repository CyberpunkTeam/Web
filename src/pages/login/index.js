
import './style.css';
import pana from "../../assests/pana.svg";
import logo from "../../assests/logo-complete.svg";

function Login() {
    return (
        <div>
            <div className="title-container">
                <img src={logo} className="logo-style" alt="logo" />
                <h2>
                    Find My Team
                </h2>
            </div>
            <div className="flexbox-container">
                <div className="image-container">
                    <h1 className="title-style">
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </h1>
                    <img src={pana} className="pana-style" alt="logo" />
                </div>
                <div className="form-container">
                    <h1>
                        Hola
                    </h1>
                </div>
            </div>
        </div>

    );
}

export default Login;
