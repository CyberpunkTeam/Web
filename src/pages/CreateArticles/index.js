import './style.css'
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import React, {useContext, useRef, useState} from "react";
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import AppContext from "../../utils/AppContext";
import {GalleryImport} from "iconsax-react";
import {saveArticle} from "../../services/firebaseStorage";
import {createArticle} from "../../services/contentService";

export default function CreateArticles() {
    let context = useContext(AppContext);
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState(undefined);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [buttonDisabled, setButtonDisabled] = useState(false);

    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    const setError = (msg) => {
        if (context.errorMessage !== msg) {
            context.setErrorMessage(msg);
        }
    }

    const createFile = async () => {
        if (title.length === 0) {
            setError("Title can not be empty")
            return
        }

        if (contentState.getPlainText('\u0001').length === 0) {
            setError("The article can not be empty")
            return
        }

        setButtonDisabled(true)
        const fileData = stateToHTML(contentState);
        const blob = new Blob([fileData], {type: "text/html"});
        const file = await saveArticle(context.app, blob,`${title}.html`, context.user.uid )

        const body = {
            "title": title,
            "author_uid": context.user.uid,
            "href": file,
        }
        createArticle(body).then((r) => {
            console.log(r)
        }).catch((e) => {
            console.log(e)
        }).finally(() =>
            setButtonDisabled(false)
        )
    }

    const focus = () => editorRef.current.focus();
    const onChange = (editorState) => {
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
                    <input type="text" className={"input-article-title"} placeholder={"Write title here"} onChange={setTitleHandler}/>
                    <label className="custom-cover-article-file-upload">
                        <input type="file" onChange={handleCoverChange} accept="image/jpeg, image/png"/>
                        <GalleryImport size="24" color="#014751"/>
                    </label>
                </div>
                {coverImage()}
            </div>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                New Article
            </div>
            {cover()}
            <div className={"create-article-text-container"}>
                <div className="RichEditor-root">
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
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "button-style-mobile" : "save-edit-button-style"}
                        onClick={createFile}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Publish"}
                </button>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
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
