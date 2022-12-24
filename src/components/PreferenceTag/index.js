import './style.css';
export default function PreferenceTag (params) {
    return (
        <div key={params.preference} className={"pref-tag"}>
            {params.preference}
        </div>
    )
}
