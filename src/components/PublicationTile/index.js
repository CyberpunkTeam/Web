import './style.css'
import {isMobile} from "react-device-detect";
import {User, People, LampCharge, Notepad2} from "iconsax-react";
import React, {useContext} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {formatDatePublish} from "../../utils/dateFormat";

export default function PublicationTile(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const goTo = () => {
        if (params.publication.content_type === "new_team") {
            navigate("/team/" + params.publication.content.tid)
        } else if (params.publication.content_type === "new_project") {
            navigate("/project/" + params.publication.content.pid)
        } else {
            navigate("/articles/" + params.publication.content.cid)
        }
    }

    const author = (data) => {

        const displayName = params.publication.content_type === "content_by_team" ? data.name : data.name + " " + data.lastname
        const userNavigate = () => {
            const user_link = params.publication.content_type === "content_by_team" ? '/team/' + data.tid : data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

        const date = formatDatePublish(params.publication.created_date)

        const user_image = (data) => {
            if (params.publication.content_type === "content_by_team") {
                return (
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <People color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                    </div>
                )
            }


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
                <div key={data.uid} className="tile-publication-mobile">
                    <div className="publication-info-mobile">
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
                        {displayName}
                        <div className="owner">
                            {date}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const contentView = () => {
        if (params.publication.content_type === "new_team") {
            return (
                <div className={isMobile ? "publicationAllTileInformationMobile" : "publicationAllTileInformation"}>
                    <div
                        className={isMobile ? "publicationTileTeamInformationCoverMobile" : "publicationTileTeamInformationCover"}
                        onClick={goTo}>
                        <div>
                            Created a new team <br/> <b>"{params.publication.content.name}"</b>
                        </div>
                        <People color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className={"tileIcon"}/>
                    </div>
                </div>
            )
        } else if (params.publication.content_type === "new_project") {
            return (
                <div className={isMobile ? "publicationAllTileInformationMobile" : "publicationAllTileInformation"}>
                    <div
                        className={isMobile ? "publicationTileProjectInformationCoverMobile" : "publicationTileProjectInformationCover"}
                        onClick={goTo}>
                        <div>
                            Created a new project <br/> <b>"{params.publication.content.name}"</b>
                        </div>
                        <LampCharge color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className={"tileIcon"}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={isMobile ? "publicationAllTileInformationMobile" : "publicationAllTileInformation"}>
                    <div
                        className={isMobile ? "publicationTileArticleInformationCoverMobile" : "publicationTileArticleInformationCover"}
                        onClick={goTo}>
                        <div>
                            Created a new article <br/> <b>"{params.publication.content.title}"</b>
                        </div>
                        <Notepad2 color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className={"tileIcon"}/>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={isMobile ? "publicationTileContainerMobile" : "publicationTileContainer"}>
            {author(params.publication.creator)}
            {contentView()}
        </div>
    )
}
