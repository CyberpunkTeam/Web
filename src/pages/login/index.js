import './style.css';
import pana from "../../assests/pana.svg";
import Logo from "../../components/logo";

function Login() {
    return (
        <div className="container">
            <Logo/>
            <div className="container-login">
                <div className="pana-container">
                    <text className="title-style">
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                    <img src={pana} className="pana-style" alt="logo"/>
                </div>
                <div className="form">
                    <text>
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                    <text>
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                    <text>
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                    <text>
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                    <text>
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </text>
                </div>
            </div>
        </div>
    );
}

export default Login;
