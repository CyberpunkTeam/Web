import './style.css'
import {isMobile} from "react-device-detect";
import {EmojiHappy, Share, User} from "iconsax-react";
import React, {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {formatDatePublish} from "../../utils/dateFormat";
import {likeArticle, unlikeArticle} from "../../services/contentService";

export default function PublicationTile(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [liked, setLike] = useState(params.publication.likes.includes(context.user.uid))
    const [likeLength, setLikeLength] = useState(params.publication.likes.length)

    const like = async () => {
        if (liked) {
            await unlikeArticle(params.publication.cid, context.user.uid)
            setLike(false)
            setLikeLength(likeLength - 1)
        } else {
            await likeArticle(params.publication.cid, context.user.uid)
            setLike(true)
            setLikeLength(likeLength + 1)
        }
    }

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

    const cover = () => {
        if (params.publication.cover_image === null || params.publication.cover_image === "default") {
            return (
                <div className={"publicationTileInformationCover"} onClick={goTo}/>
            )
        }
        return (
            <div className={"publicationTileInformationCoverWithImage"} onClick={goTo}>
                <img src={params.publication.cover_image} alt="" className={"publicationTileImage"}/>
            </div>
        )
    }

    return (
        <div className={"publicationTileContainer"}>
            {author(params.publication.author)}
            <div className={"publicationTileInformation"}>
                {cover()}
                <div className={"publicationTileInformationTitle"} onClick={goTo}>
                    {params.publication.title}
                </div>
                <div className={"publishButtons"}>
                    <div className={"publishButtonsLike"} onClick={like}>
                        <EmojiHappy size="24" color="#014751" variant={liked ? "Bold" : null} className={"icon"}/>
                        {likeLength}
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
