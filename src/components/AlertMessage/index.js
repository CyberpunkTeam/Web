import './style.css'
import {useContext, useEffect, useState} from "react";
import AppContext from "../../utils/AppContext";
import {CloseCircle} from "iconsax-react";

export default function AlertMessage() {
    let context = useContext(AppContext);
    const [appear, setAppear] = useState(false)

    useEffect(() => {
        if (context.errorMessage !== undefined) {
            setAppear(true)
        }
    }, [context.errorMessage]);

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
        context.setErrorMessage(undefined)
    }

    if (context.errorMessage === undefined){
        return;
    }

    return (
        <div className={"error-position"}>
            <div className={appear ? "appear" : "error-container"}>
                {context.errorMessage}
                <CloseCircle size={24} className={"closeButton"} color={"#FAFAFA"} onClick={closeAll}/>
            </div>
        </div>
    )

}
