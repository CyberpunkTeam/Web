import './style.css'
import {isMobile} from "react-device-detect";
import {EmojiHappy, Share, User} from "iconsax-react";
import React, {useContext} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {formatDatePublish} from "../../utils/dateFormat";

export default function PublicationTile(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const goTo = () => {
        navigate("/articles/" + params.publication.cid)
    }

    const author = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

        const date = formatDatePublish(params.publication.created_date)

        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <User color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt=''
                            className={isMobile ? "user-mobile-image" : "user-sidebar"}/>
            }
        }

        if (isMobile) {
            return (
                <div key={data.uid} className="members-info-container-mobile">
                    <div className="members-info-mobile">
                        {user_image(data)}
                        <div className="member-name-mobile" onClick={userNavigate}>
                            {data.name} {data.lastname}
                            <div className="owner-mobile">
                                {date}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div key={data.uid} className={"author-publication-info-container"}>
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name" onClick={userNavigate}>
                        {data.name} {data.lastname}
                        <div className="owner">
                            {date}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"publicationTileContainer"}>
            {author(params.publication.author)}
            <div className={"publicationTileInformation"} onClick={goTo}>
                <div className={"publicationTileInformationCover"}>

                </div>
                <div className={"publicationTileInformationTitle"}>
                    {params.publication.title}
                </div>
                <div className={"publishButtons"}>
                    <div className={"publishButtonsLike"}>
                        <EmojiHappy size="24" color="#014751" className={"icon"}/>
                        2k
                    </div>
                    <div className={"publishButtonsShare"}>
                        <Share size="24" color="#014751" className={"icon"}/>
                        Share
                    </div>
                </div>
            </div>
        </div>
    )
}
