import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'


const CreateTournament = () => {

    let dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllTournaments())
        dispatch(actions.getAllTeams())
    }, [dispatch])



    let allTournaments = useSelector(state => state.tournaments)
    let allTeams = useSelector(state => state.teams)



    const [newTournament, setNewTournament] = React.useState({
        name: "",
        image: "",
        description: "",
        teams: []
    })


    const [errors, setErrors] = React.useState({})



    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)

    const [resume, setResume] = React.useState(false)

    
    const [teams, setTeams] = React.useState({
        tournamentTeams: [],
        allTeams: [...allTeams]
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        let tournamentExist = allTournaments.find(e => e.name.toLowerCase() == newTournament.name.toLowerCase())
        if(tournamentExist){
            alert('Ya existe un torneo con ese nombre')
        }else{
            setErrors(validation(newTournament))
        }if(Object.values(errors).length > 0){
            console.log('Errores ---> '+Object.keys(errors))
            alert('Hay datos incorrectos o faltan datos')
        }else{
            axios.post('http://localhost:3001/tournament/create', newTournament)
            alert('Torneo creado')
            setNewTournament({
                name: "",
                image: "",
                description: "",
                year:0,
                teams: []
            })
            setLoading(1)
            setResume(false)
            setTeams({
                tournamentTeams: [],
                allTeams: [...allTeams]
            })
            dispatch(actions.getAllTournaments())
        }
    }
    
    const handleTeamsList = () => {
        setTeams({
            tournamentTeams: [],
            allTeams: [...allTeams]
        })
    }

    const handleimg = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        let size = 0;
        if (files) {
            size += files[0].size;
        }

        data.append('file', files[0]);
        data.append('upload_preset', 'LigaImpro');
        setLoading(2);
        try {
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/maurodavid/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            let array = file.secure_url.split('.');
            let format = array[array.length - 1];

            if (size > 2000000) {
                setErrors({
                    ...errors,
                    img: 'El archivo es demasiado grande'
                });
            } else {
                if (format === 'jpg' || format === 'png') {
                    setErrors({
                        ...errors,
                        img: ""
                    });
                    setImage(file.secure_url);
                    setLoading(0);
                    setNewTournament({ ...newTournament, image: file.secure_url })
                } else {
                    setErrors({
                        ...errors,
                        img: 'Solo se admiten archivos formato jpeg o png'
                    });
                    setLoading(1);
                }
            }
        } catch (error) {
            setErrors({
                ...errors,
                img: 'Solo se admiten archivos formato jpeg o png'
            });
            setLoading(1);
        }
    };



    
    const selectTeam = (e, idTeam, name, image) => {
        e.preventDefault()
        if(resume){

        }else{
            let aux = teams.allTeams
            let filterTeams = aux.filter(e => e.name !== name)
            setTeams({
                ...teams,
                tournamentTeams: [
                    ...teams.tournamentTeams,
                    { id: idTeam, name: name, image: image }
                ],
                allTeams: [...filterTeams]
    
            })
        }
     

    }

    const removeTeam = (e, idTeam, name, image) => {
        e.preventDefault()
        let aux = teams.tournamentTeams
        let filterTeams = aux.filter(e => e.name !== name)
        setTeams({
            ...teams,
            tournamentTeams: [...filterTeams],
            allTeams: [
                ...teams.allTeams,
                { id: idTeam, name: name, image: image }
            ]

        })

    }

    const handleConfirm = (e) => {
        e.preventDefault()

        let aux = teams.tournamentTeams.map(e => e.id)
        setNewTournament({
            ...newTournament,
            teams: [...aux]
        })
        setResume(true)
    }

    const modifyData = (e) => {
        e.preventDefault()
        setResume(false)
    }


    const handleChange = (e) => {
        
        e.preventDefault()
            setNewTournament({
                ...newTournament,
                [e.target.name]: e.target.value
            })
    }

    const handleErrors = (e) => {
        e.preventDefault();
        setErrors(validation(newTournament));
    }

    const validation = (data) => {
        let error = {}

        if(!data.name){
            error = {
                ...error,
                name: "Campo requerido"
            }
        }else if(data.name.length <= 2){
            error = {
                ...error,
                name: "El nombre debe tener más de 2 carácteres"
            }
        }else if(data.name.length > 30){
            error = {
                ...error,
                name: "El nombre debe tener menos de 30 carácteres"
            }
        }
        if(!data.description){
            error = {
                ...error,
                description: "Campo requerido"
            }
        }else if(data.description.length <= 15){
            error = {
                ...error,
                description: "La descripción debe tener más de 15 carácteres"
            }
        }else if(data.description.length > 140){
            error = {
                ...error,
                description: "En la descripción debe haber menos de 140 carácteres"
            }
        }
        if(!data.year){
            error = {
                ...error,
                year: "Campo requerido"
            }
        }else if(data.year < 2011){
            error = {
                ...error,
                year: "No existen torneos antes del 2011"
            }
        }

        return error
    }

    return (
        <div>

            <h1>Crear Torneo</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre del Torneo</label>
                <br />
                <input type="text" name="name" disabled={resume} value={newTournament.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}  />
                {errors.name? errors.name : false}
                <br />
                <label>Logo</label>
                <br />
                <input
                    id="inputFile"
                    type="file"
                    name="image"
                    onChange={(e) => handleimg(e)}
                    disabled={resume}
                />
                {loading === 2 ? (
                    <p>
                        Cargando imagen...
                    </p>
                ) : (
                    false
                )}
                {loading === 0 ? (
                    <div>
                        <br />
                        <img src={image} alt="" />
                        <br />
                    </div>
                ) : (
                    false
                )}
                {errors.img ? errors.img : false}
                <br />
                <label >Año</label>
                <br />
                <input type="number" name="year" disabled={resume} value={newTournament.year} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.year? errors.year : false}
                <br />
                <label>Descripción</label>
                <br />
                <textarea type="text" name="description" disabled={resume} value={newTournament.description} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.description? errors.description : false}
                <br />
                <br />
                <h2> Equipos en el torneo: </h2>
                <br />
                {teams.tournamentTeams.length > 0 ? teams.tournamentTeams.map(el => <div>{!resume ?<button title="Remover equipo" onClick={e => removeTeam(e, el.id, el.name, el.image)}>❌</button>: false} <h5>{el.name}</h5> <br />  </div>) : <h4>Aun no se han elegido equipos</h4>}
                <br />
                <h6>Si un equipo no aparece en la lista es por que no está en base de datos, andá a "Equipos" para sumarlo</h6>
                {Object.keys(errors).length === 0 && newTournament.name !== "" && newTournament.description!== "" && teams.tournamentTeams.length > 1 ?<button onClick={e => handleConfirm(e)} >Confirmar Torneo</button> : false}
                {resume ? <div><b>Nombre del torneo: </b>{newTournament.name}<br /><b>Descripción: </b>{newTournament.description}<br/><b>Equipos: </b><ul>{teams.tournamentTeams.map(e => <li>{e.name}</li>)}</ul></div> : false}
                {resume ? <button type="submit" >Agregar a base de datos</button> : false}
                {resume ? <button onClick={e=> modifyData(e)}>Modificar datos</button> :false}
                <br />
                <h3>Equipos a seleccionar:</h3>
                <br />

                {teams.allTeams.length > 0 ? teams.allTeams.map(el => <div onClick={e => selectTeam(e, el.id, el.name, el.image)}>{el.name} <br /> <img src={el.image} alt="" /></div>) : <p>Si los equipos no aparecen hace click <div onClick={handleTeamsList}><b>aquí</b></div></p> }



            </form>
            <hr />
        </div>
    )

}

export default CreateTournament