import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AppContext from "../../utils/AppContext";
import Loading from "../../components/loading";
import {getArticle, likeArticle, unlikeArticle} from "../../services/contentService";
import HTMLRenderer from 'react-html-renderer'
import {EmojiHappy, People, Share, User} from "iconsax-react";
import {formatDatePublish} from "../../utils/dateFormat";


export default function Article() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [article, setArticle] = useState(undefined)
    const [text, setText] = useState(undefined)

    useEffect(() => {
        getArticle(params.id).then((ArticleResponse) => {
            fetch(ArticleResponse.href).then((response) => {
                response.text().then((body) => {
                    setText(body)
                })
            })
            setArticle(ArticleResponse)
        })
    }, [params.id]);

    const like = async () => {
        if (article.likes.includes(context.user.uid)) {
            await unlikeArticle(article.cid, context.user.uid)

        } else {
            await likeArticle(article.cid, context.user.uid)
        }

        getArticle(params.id).then((ArticleResponse) => {
            setArticle(ArticleResponse)
        })
    }

    if (article === undefined || text === undefined) {
        return <Loading/>
    }

    const cover = () => {

        const coverImage = () => {
            if (article.cover_image === null || article.cover_image === "default") {
                return (
                    <div className={isMobile ? "cover-user-container-mobile" : "cover-user-container"}/>
                )
            }
            return <img src={article.cover_image} className={isMobile ? "image-container-mobile" : "image-container"}
                        alt=""/>
        }

        if (isMobile) {
            return (
                <div className="team-cover-container-mobile">
                    <div
                        className={article.cover_image === null || article.cover_image === "default" ? "article-title-container-mobile" : "article-title-container-mobile-WithCover"}>
                        <div className="team-name-mobile">
                            {article.title}
                        </div>
                        <div className={"publish-date-mobile"}>
                            <div className={"publishButtonsLikeMobile"} onClick={like}>
                                <EmojiHappy size={48} color="#FAFAFA"
                                            variant={article.likes.includes(context.user.uid) ? "Bold" : "Outline"}
                                            className={"iconMobile"}/>
                                {article.likes.length}
                            </div>
                            <div className={"publishButtonsShareMobile"}>
                                <Share size="48" color="#FAFAFA" className={"iconMobile"}/>
                                Share
                            </div>
                            {formatDatePublish(article.created_date)}
                        </div>
                    </div>
                    {coverImage()}
                </div>
            )
        }

        return (
            <div className="cover-container">
                <div
                    className={article.cover_image === null || article.cover_image === "default" ? "article-title-container" : "article-title-container-withCover"}>
                    <div className="team-name">
                        {article.title}
                    </div>
                    <div className="publish-date">
                        <div className={"publishButtonsLike"} onClick={like}>
                            <EmojiHappy size="24" color="#FAFAFA"
                                        variant={article.likes.includes(context.user.uid) ? "Bold" : "Outline"}
                                        className={"icon"}/>
                            {article.likes.length}
                        </div>
                        <div className={"publishButtonsShare"}>
                            <Share size="24" color="#FAFAFA" className={"icon"}/>
                            Share
                        </div>
                        {formatDatePublish(article.created_date)}
                    </div>
                </div>
                {coverImage()}
            </div>
        )
    }

    const team = (data, team) => {
        if (data === null) {
            return
        }

        const teamNavigate = () => {
            navigate('/team/' + team.tid);
        }

        const image = () => {
            return (
                <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                    <People color="#FAFAFA" size={isMobile ? "32" : "18"} variant="Bold"/>
                </div>
            )
        }

        if (isMobile) {
            return (
                <div key={data.uid} className="members-info-container-mobile-article">
                    <div className="members-info-mobile">
                        {image()}
                        <div className="member-name-mobile" onClick={teamNavigate}>
                            {team.name}
                            <div className="owner-mobile">
                                Published by
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div key={data.uid} className={context.size ? "team-info-container-reduced" : "author-info-container"}>
                <div className="members-info">
                    {image()}
                    <div className="member-name" onClick={teamNavigate}>
                        {team.name}
                        <div className="owner">
                            Published by
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const author = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

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
                <div key={data.uid} className="members-info-container-mobile-article">
                    <div className="members-info-mobile">
                        {user_image(data)}
                        <div className="member-name-mobile" onClick={userNavigate}>
                            {data.name} {data.lastname}
                            <div className="owner-mobile">
                                Author
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div key={data.uid}
                 className={context.size && article.tid !== null ? "author-info-container-reduced" : "author-info-container"}>
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name" onClick={userNavigate}>
                        {data.name} {data.lastname}
                        <div className="owner">
                            Author
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <div className="team-container">
                {cover()}
            </div>
            <div className={context.size || isMobile ? "article-container-reduced" : "article-container"}>
                <div className={isMobile || context.size ? "author-data-container-reduced" : "author-data-container"}>
                    {author(article.author)}
                    {team(article.tid, article.team)}
                </div>
                <div className={isMobile ? "article-data-container-mobile" : context.size ? "article-data-container-reduced" : "article-data-container"}>
                    <HTMLRenderer html={text}/>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )
}
