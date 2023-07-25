import {isMobile} from "react-device-detect";
import {Google} from "iconsax-react";
import {useContext, useState} from "react";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {createUser, getUser} from "../../services/userService";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {createToken} from "../../services/authenticationService";
import {createUserChat} from "../../services/firebaseStorage";

export default function GoogleLoginButton(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    /*const loginGoogleMobile = () => {
        setLoadingGoogle(true)
        signInWithRedirect(context.auth, provider)
        getRedirectResult(context.auth).then((result) => {
                console.log(result)
                const user = result.user
                getUser(user.uid).then((r) => {
                    if (Object.keys(r).length === 0) {
                        const userLogin = {
                            'name': user.displayName.split(" ",)[0],
                            "lastname": user.displayName.split(" ")[1],
                            "email": user.email,
                            "location": "",
                            "uid": user.uid
                        }
                        createUser(userLogin).then((r) => {
                            context.setUser(r);
                            localStorage.setItem("user", JSON.stringify(r))
                            navigate('/me')
                        })
                    } else {
                        context.setUser(r)
                        localStorage.setItem("user", JSON.stringify(r))
                        navigate("/me")
                    }
                })
            }).catch((error) => {
                console.log(error.code);
                console.log(error.Message);
            });
    }*/

    const loginGoogle = () => {
        setLoadingGoogle(true)
        signInWithPopup(context.auth, provider)
            .then(async (result) => {
                const user = result.user
                await createUserChat(user.uid)
                result.user.getIdToken().then((token) => {
                    let tokenBody = {"auth_google_token": token, "user_id": user.uid}
                    createToken(tokenBody).then((authToken) => {
                        localStorage.setItem("auth_token", authToken.token)
                        getUser(user.uid, context).then((r) => {
                            if (r.status === 404) {
                                const userLogin = {
                                    'name': user.displayName.split(" ",)[0] !== undefined ? user.displayName.split(" ",)[0] : "",
                                    "lastname": user.displayName.split(" ")[1] !== undefined ? user.displayName.split(" ")[1] : "",
                                    "email": user.email,
                                    "location": "",
                                    "uid": user.uid
                                }

                                createUser(userLogin).then((r) => {
                                    context.setUser(r);
                                    localStorage.setItem("user", JSON.stringify(r))
                                    navigate('/home')
                                    setLoadingGoogle(false)
                                })
                            } else {
                                if (r.detail === "User is blocked") {
                                    setLoadingGoogle(false);
                                    return
                                }
                                context.setUser(r)
                                localStorage.setItem("user", JSON.stringify(r))
                                navigate("/home")
                                setLoadingGoogle(false)
                            }
                        })
                    })
                })
            }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    }

    return (
        <button disabled={loadingGoogle}
                className={loadingGoogle ? isMobile ? "google-loading-style-mobile" : "google-loading-style" : isMobile ? "google-button-style-mobile" : "google-button-style"}
                onClick={loginGoogle}>
            {loadingGoogle ? <i className="fa fa-circle-o-notch fa-spin"></i> :
                <Google size={isMobile ? "48" : "20"} variant={"Bold"} className={isMobile ? "iconMobile" : "icon"}
                        color="#FAFAFA"/>}
            {loadingGoogle ? "" : params.login ? "Sign In with Google" : "Join with Google"}
        </button>
    )

}
