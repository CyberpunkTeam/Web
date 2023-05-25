import './style.css'
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle, TickCircle} from "iconsax-react";

export default function CreateMessage() {
    let context = useContext(AppContext);
    const [appear, setAppear] = useState(false)

    useEffect(() => {
        if (context.errorMessage !== undefined) {
            setAppear(true)
        }
    }, [context.createMessage]);

    useEffect(() => {
        const interval = setTimeout(() => {
            closeAll()
        }, 30000);
        return () => {
            clearInterval(interval);
        };
    }, [appear]);

    const closeAll = () => {
        setAppear(false);
        context.setCreateMessage(undefined)
    }

    if (context.createMessage === undefined){
        return;
    }

    return (
        <div className={"create-position"}>
            <div className={appear ? "appearCreate" : "create-container"}>
                <TickCircle size={24} variant={"Bold"} className={"tickIcon"} color={"#FAFAFA"}/>
                {context.createMessage}
                <CloseCircle size={24} className={"closeButton"} color={"#FAFAFA"} onClick={closeAll}/>
            </div>
        </div>
    )

}
