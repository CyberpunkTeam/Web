import './style.css'

export default function PostulationsModal(params){
    console.log(params)
    const postulationView = (data) => {
        console.log(data)
        return (
            <div>
                data
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Postulaciones
            </div>
            <div className="memberDiv">
                {postulationView(params.postulations)}
            </div>
        </div>
    )

}
