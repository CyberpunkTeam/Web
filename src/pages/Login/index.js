import {signInWithEmailAndPassword} from "firebase/auth";
import {useContext, useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";
import {Link, useNavigate} from "react-router-dom";

import './style.css';
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";
import {getUser} from "../../services/userService";

function Login() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

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

    const loginButton = () => {
        signInWithEmailAndPassword(context.auth, email, password)
            .then((userCredential) => {
                getUser(userCredential.user.uid).then((userdata => {
                    const userLogin = {
                        'name': userdata.name,
                        "lastname": userdata.lastname,
                        "email": email,
                        "location": userdata.location,
                        "uid": userCredential.user.uid
                    }
                    context.setUser(userLogin);
                    localStorage.setItem("user", JSON.stringify(userLogin))
                    navigate('/me')
                    console.log(userCredential.user);
                })).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }

    return (
        <div className="container">
            <Logo/>
            <div className="data-container">
                <div className="form-container">
                    <div className="form-text">
                        Iniciar Sesión
                    </div>
                    <form className="form">
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
                                        <Eye className="password-button" color="#B1B1B1" variant="Outline" size={20}
                                             onClick={togglePassword}/> :
                                        <EyeSlash className="password-button" color="#B1B1B1" variant="Outline"
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
                    </form>
                    <div className="button-container">
                        <button className="button-style" onClick={() => {
                            loginButton()
                        }}>
                            Iniciar Sesión
                        </button>
                        <div className="container-button-login">
                            ¿No tienes una cuenta?
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
