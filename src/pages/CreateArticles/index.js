import './style.css'
import {Editor, EditorState, RichUtils} from 'draft-js';
import React, {useContext, useEffect, useRef, useState} from "react";
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {GalleryImport} from "iconsax-react";
import Modal from "react-modal";
import {modalStyle} from "../../styles/commonStyles";
import {PublishArticleModal} from "../../components/PublishArticleModal";
import {getMyTeams} from "../../services/teamService";
import Loading from "../../components/loading";

export default function CreateArticles() {
    const errorMessageCompleteData = "Please complete the required fields"
    let context = useContext(AppContext);
    const editorRef = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [allTeams, setAllTeams] = useState(undefined);
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState(undefined);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const validateFields = () => {
        let error = false;
        if (title === "" || title.length <= 3) {
            error = true;
            setErrorName(true)
        }

        if (contentState.getPlainText('\u0001').length < 30) {
            error = true;
            setErrorDescription(true)
        }

        return error;
    }

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    useEffect((() => {
        getMyTeams(context.user.uid, context).then((teams) => {
            if (teams === undefined) {
                setError("An error has occurred while loading user's teams. Please, try again later");
            } else {
                if (teams.details === "User is blocked") {
                    return;
                }
                let t = []
                teams.forEach((team) => {
                    if (!team.temporal && team.state !== "BLOCKED") {
                        t.push(team)
                    }
                })
                setAllTeams(t);
            }
        })
    }), [])

    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    const createFile = async () => {
        if (validateFields()) {
            setError(errorMessageCompleteData)
            return;
        }

        setIsOpen(true)
    }

    const focus = () => editorRef.current.focus();
    const onChange = (editorState) => {
        if (contentState.getPlainText('\u0001').length > 30) {
            setErrorDescription(false)
        }
        setEditorState(editorState)
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    };

    const onTab = (e) => {
        const maxDepth = 4;
        onChange(RichUtils.onTab(e, editorState, maxDepth));
    };

    const toggleBlockType = (type) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                type
            )
        );
    };

    const toggleInlineStyle = (style) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                style
            )
        );
    };

    const cover = () => {
        function handleCoverChange(e) {
            setCoverImg(e.target.files[0]);
        }

        const setTitleHandler = (event) => {
            if (title.length > 3) {
                setErrorName(false)
            }
            setTitle(event.target.value);
        }

        const coverImage = () => {
            if (coverImg === undefined) {
                return (
                    <div className="cover-article-edit-container"/>
                )
            }

            let url;
            try {
                url = URL.createObjectURL(coverImg);
            } catch (e) {
                url = coverImg;
            }

            return <img src={url} className="image-article-edit-container" alt=""/>
        }

        return (
            <div className="cover-article-container">
                <div className="article-background-container">
                    <input type="text" className={errorName ? "input-article-title-error" : "input-article-title"}
                           placeholder={"Write title here"}
                           onChange={setTitleHandler}/>
                    <label className="custom-cover-article-file-upload">
                        <input type="file" onChange={handleCoverChange} accept="image/jpeg, image/png"/>
                        <GalleryImport size="24" color="#014751"/>
                    </label>
                </div>
                {coverImage()}
            </div>
        )
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <PublishArticleModal title={title} closeModal={closeModal} contentState={contentState} teams={allTeams}
                                     coverImg={coverImg}/>
            </Modal>
        )
    }

    if (allTeams === undefined) {
        return <Loading/>
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                New Article
            </div>
            {cover()}
            <div className={"create-article-text-container"}>
                <div className={errorDescription ? "RichEditor-root-error" : "RichEditor-root"}>
                    <div className={"controllers"}>
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={toggleInlineStyle}
                        />
                    </div>
                    <div className={className} onClick={focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={onChange}
                            onTab={onTab}
                            ref={editorRef}
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
            <div
                className={isMobile ? "new-vacant-button-mobile" : context.size ? "new-vacant-button-reduced" : "new-vacant-button"}>
                <button className={isMobile ? "cancel-edit-button-style-mobile" : "cancel-edit-button-style"}>
                    Cancel
                </button>
                <button className={isMobile ? "button-style-mobile" : "save-edit-button-style"}
                        onClick={createFile}>
                    Publish
                </button>
            </div>
            {modal()}
            <SearchBar/>
            <SideBar/>
        </div>
    )

}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

function StyleButton(props) {
    const onToggle = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
    };

    let className = 'RichEditor-styleButton';
    if (props.active) {
        className += ' RichEditor-activeButton';
    }

    const label = () => {
        if (props.label === 'Bold') {
            return (
                <b>
                    B
                </b>
            )
        } else if (props.label === 'Italic') {
            return (
                <i>
                    i
                </i>
            )
        } else if (props.label === 'Underline') {
            return (
                <u>
                    U
                </u>
            )
        } else {
            return props.label
        }
    }

    return (
        <span className={className} onMouseDown={onToggle}>
          {label()}
        </span>
    );
}

const BLOCK_TYPES = [
    {label: 'Title', style: 'header-two'},
    {label: 'List', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
