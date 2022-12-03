import './style.css';
import pana from "../../assests/pana.svg";
import Logo from "../../components/logo";
import {useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";
import {Link} from "react-router-dom";

function MainScreen() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [passwordShown, setPasswordShown] = useState(false);
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

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
                <div className="form-container">
                    <text className="form-text">
                        Únete y forma parte de nuestra comunidad
                    </text>
                    <from className="form">
                        <div className="label">
                            <label>
                                Email:
                                <div className="form-input">
                                    <input type="text" value={email} className="input" onChange={setEmailHandler}/>
                                </div>
                            </label>
                        </div>
                        <div className="label">
                            <label>
                                Password:
                                <div className="form-input">
                                    <input type={passwordShown ? "text" : "password"} value={password}
                                           className="input"
                                           onChange={setPasswordHandler}/>
                                    {passwordShown ?
                                        <Eye className="password-button" color="#B1B1B1" variant="outline" size={20}
                                             onClick={togglePassword}/> :
                                        <EyeSlash className="password-button" color="#B1B1B1" variant="outline"
                                                  size={20}
                                                  onClick={togglePassword}/>}
                                </div>
                            </label>
                        </div>
                    </from>
                    <div className="button-container">
                        <Link to="/" className="button-style">
                            Únirse
                        </Link>
                        <div className="container-button-login">
                            <text>
                                ¿Ya tienes una cuenta?
                            </text>
                            <Link to="/login" className="login">
                                Inicia Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
