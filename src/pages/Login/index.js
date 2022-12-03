import './style.css';
import Logo from "../../components/logo";
import {useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";

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
                                        <Eye className="password-button" color="#B1B1B1" variant="outline" size={24}
                                             onClick={togglePassword}/> :
                                        <EyeSlash className="password-button" color="#B1B1B1" variant="outline"
                                                  size={24}
                                                  onClick={togglePassword}/>}
                                </div>
                            </label>
                        </div>
                    </from>
                    <div className="button-container">
                        <button className="button-style" onClick={() => {
                            console.log("unirse")
                        }}>Iniciar Sesión
                        </button>
                        <div className="container-button-login">
                            <text>
                                ¿No tienes una cuenta?
                            </text>
                            <button className="login">Únete ahora</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
