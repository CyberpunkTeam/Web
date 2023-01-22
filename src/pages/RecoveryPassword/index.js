import {sendPasswordResetEmail} from "firebase/auth";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import Logo from "../../components/logo";
import {isMobile} from "react-device-detect";

export default function RecoveryPassword() {
    let context = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [sendIt, setSendIt] = useState(false);
    const [userError, setUserError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const setEmailHandler = (event) => {
        setEmail(event.target.value);
        setUserError("");
    }

    const forgotPassword = () => {
        setButtonDisabled(true)
        sendPasswordResetEmail(context.auth, email)
            .then((r) => {
                setSendIt(true)
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setUserError("Usuario no encontrado")
                }
            }).finally(() => {
            setButtonDisabled(false);
        });
    }

    const verifyMessage = () => {
        return (
            <div className={isMobile ? "form-container-mobile" : "form-container"}>
                <div className="form-text">
                    Restablece tu contraseña
                </div>
                <div className="verify-text">
                    <div>
                        Enviamos un correo a <b>{email}</b>,
                    </div>
                    por favor veríficalo para continuar
                </div>
            </div>
        )
    }

    const recoveryForm = () => {
        return (
            <div className={isMobile ? "form-container-mobile" : "form-container"}>
                <div className={isMobile ? "form-text-mobile" : "form-text"}>
                    Recupera tu cuenta
                </div>
                <form className={isMobile ? "form-mobile" : "form"}>
                    <div className={isMobile ? "label-mobile" : "label"}>
                        <label>
                            Email
                            <input type="text" value={email} className={isMobile ? "input-mobile" : "input"}
                                   onChange={setEmailHandler}/>
                        </label>
                    </div>
                    <div className="login-user-not-found">
                        {userError !== "" ? userError : ""}
                    </div>
                </form>
                <div className="button-container">
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "button-style-disabled" : isMobile ? "button-style-mobile" : "button-style"}
                            onClick={forgotPassword}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : "Enviar"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <Logo/>
            <div className="data-container">
                {sendIt ? verifyMessage() : recoveryForm()}
            </div>
        </div>
    )
}
