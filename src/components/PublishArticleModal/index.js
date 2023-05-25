import './style.css'
import {ArrowDown2, CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";
import {stateToHTML} from "draft-js-export-html";
import {saveArticle, savePhoto} from "../../services/firebaseStorage";
import {createArticle} from "../../services/contentService";
import {useNavigate} from "react-router-dom";

export function PublishArticleModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const user = context.user.name + " " + context.user.lastname;
    const [reason, setReason] = useState(user)
    const errorMessage = "An error has occurred while publishing article. Please, try again later"

    const setReasonHandler = (event) => {
        setReason(event.target.value);
    }

    const abandon = async () => {
        setButtonDisabled(true)

        const fileData = stateToHTML(params.contentState);
        const blob = new Blob([fileData], {type: "text/html"});
        const file = await saveArticle(context.app, blob, `${params.title}.html`, context.user.uid, reason)

        let body = {
            "title": params.title,
            "author_uid": context.user.uid,
            "href": file
        }

        if (params.coverImg !== undefined) {
            body.cover_image = await savePhoto(context.app, params.coverImg, `/articles/${params.title}-cover`)
        } else {
            body.cover_image = "default"
        }

        if (reason !== user) {
            body.tid = reason
        }

        createArticle(body).then((r) => {
            if (r === undefined) {
                context.setErrorMessage(errorMessage);
            } else {
                context.setCreateMessage("Article published successfully")
                navigate("/articles/" + r.cid)
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() =>
            setButtonDisabled(false)
        )
    }


    return (
        <div className={isMobile ? "abandonModalMobile" : "abandonModal"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to publish this article?
            </div>
            <form className={isMobile ? "modal-form-modal" : "modal-form"}>
                <label className={isMobile ? "modal-label-options" : "create-project-label"}>
                    Publish as
                    <div className="create-project-input">
                        <select value={reason} className={isMobile ? "selectMobile" : "select"}
                                onChange={setReasonHandler}>
                            <option key={context.user.uid} value={user}>
                                {user}
                            </option>
                            {params.teams.map((team) => {
                                return (
                                    <option key={team.tid} value={team.tid}>
                                        {team.name}
                                    </option>
                                )
                            })}
                        </select>
                        <ArrowDown2 className={isMobile ? "from-button-mobile" : "from-button"} color="#B1B1B1"
                                    variant="Outline" size={isMobile ? 40 : 20}/>
                    </div>
                </label>
            </form>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"}
                        onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={abandon}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "save-edit-button-style-mobile" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Publish"}
                </button>
            </div>
            {isMobile ? null :
                <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
