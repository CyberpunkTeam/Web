import './style.css';
import Logo from "../../components/logo";
import {useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";
import {Link} from "react-router-dom";

function Login() {
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
            <div className="data-container">
                <div className="form-container">
                    <text className="form-text">
                        Iniciar Sesión
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
                        <div className="forgot-container">
                            <Link to="/" className="forgot">
                                ¿Has olvidado tu contraseña?
                            </Link>
                        </div>
                    </from>
                    <div className="button-container">
                        <Link to="/" className="button-style">
                            Iniciar Sesión
                        </Link>
                        <div className="container-button-login">
                            <text>
                                ¿No tienes una cuenta?
                            </text>
                            <Link to="/main" className="login">
                                Únete ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
