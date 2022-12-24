import './style.css';
export default function TechnologyTag (params) {
    return (
        <div key={params.technology} className={"tech-tag"}>
            {params.technology}
        </div>
    )
}
