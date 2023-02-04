import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';


const CreateTeam = () => {

    let dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTeams())
    }, [dispatch])

    React.useEffect(() => {
        dispatch(actions.getAllPlayers())
        handlePlayersList()
    }, [dispatch])

    

    let allTeams = useSelector(state => state.teams)
    let allPlayers = useSelector(state => state.players)

    const [newTeam, setNewTeam] = React.useState({
        name: "",
        image: "",
        description: "",
        players: []
    })


    const [errors, setErrors] = React.useState({})

    const [players, setPlayers] = React.useState({
        teamPlayers: [],
        allPlayers: [...allPlayers]
    })



    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)

    const [resume, setResume] = React.useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        let teamExist = allTeams.find(e => e.name.toLowerCase() == newTeam.name.toLowerCase())
        if (teamExist) {
            alert('Ya existe un equipo con ese nombre')
        } else {
            setErrors(validation(newTeam))
        } if (Object.values(errors).length > 0) {
            console.log('Errores ---> ' + Object.values(errors))
            alert('Hay datos incorrectos o faltan datos')
        } else {
            console.log('NewTeam submit: '+newTeam.players)
            axios.post('http://localhost:3001/team/create', newTeam)
            alert('Equipo creado')
            setNewTeam({
                name: "",
                image: "",
                description: "",
                players: []
            })
            setLoading(1)
            setResume(false)
            setPlayers({
                teamPlayers: [],
                allPlayers: [...allPlayers]
            })
            dispatch(actions.getAllTeams())
        }
    }

    const handlePlayersList = () => {
        setPlayers({
            teamPlayers: [],
            allPlayers: [...allPlayers]
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
                    setNewTeam({ ...newTeam, image: file.secure_url })
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


    const selectPlayer = (e, idPlayer, name, image) => {
        e.preventDefault()
        if(resume){

        }else{
            let aux = players.allPlayers
            let filterPlayers = aux.filter(e => e.name !== name)
            setPlayers({
                ...players,
                teamPlayers: [
                    ...players.teamPlayers,
                    { id: idPlayer, name: name, image: image }
                ],
                allPlayers: [...filterPlayers]
    
            })
        }
     

    }

    const removePlayer = (e, idPlayer, name, image) => {
        e.preventDefault()
        let aux = players.teamPlayers
        let filterPlayers = aux.filter(e => e.name !== name)
        setPlayers({
            ...players,
            teamPlayers: [...filterPlayers],
            allPlayers: [
                ...players.allPlayers,
                { id: idPlayer, name: name, image: image }
            ]

        })

    }

    const handleConfirm = (e) => {
        e.preventDefault()
        console.log('newTeam en confirm : '+newTeam)
        let aux = players.teamPlayers.map(e => e.id)
        setNewTeam({
            ...newTeam,
            players: [...aux]
        })
        setResume(true)
    }

    const modifyData = (e) => {
        e.preventDefault()
        setResume(false)
    }

    const handleChange = (e) => {

        e.preventDefault()
        setNewTeam({
            ...newTeam,
            [e.target.name]: e.target.value
        })
    }

    const handleErrors = (e) => {
        e.preventDefault();
        setErrors(validation(newTeam));
    }

    const validation = (data) => {
        let error = {}

        if (!data.name) {
            error = {
                ...error,
                name: "Campo requerido"
            }
        } else if (data.name.length <= 2) {
            error = {
                ...error,
                name: "El nombre debe tener más de 2 carácteres"
            }
        } else if (data.name.length > 25) {
            error = {
                ...error,
                name: "El nombre debe tener menos de 25 carácteres"
            }
        }

        if (!data.description) {
            error = {
                ...error,
                description: "Campo requerido"
            }
        } else if (data.description.length <= 15) {
            error = {
                ...error,
                description: "La descripción debe tener más de 15 carácteres"
            }
        } else if (data.description.length > 140) {
            error = {
                ...error,
                description: "En la descripción debe haber menos de 140 carácteres"
            }
        }

        return error
    }

    return (
        <div>

            <h1>Introducir equipo</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre del Equipo</label>
                <br />
                <input type="text" name="name" disabled={resume} value={newTeam.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} />
                {errors.name ? errors.name : false}
                <br />
                <label>Logo</label>
                <br />
                <input
                    id="inputFile"
                    type="file"
                    name="image"
                    disabled={resume}
                    onChange={(e) => handleimg(e)}
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

                <label>Descripción</label>
                <br />
                <textarea type="text" name="description" disabled={resume} value={newTeam.description} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} />
                {errors.description ? errors.description : false}
                <br />
                <h2> Jugadores del equipo: </h2>
                <br />
                {players.teamPlayers.length > 0 ? players.teamPlayers.map(el => <div>{!resume ?<button class="deletePlayer" title="Remover jugador/a" onClick={e => removePlayer(e, el.id, el.name, el.image)}>❌</button>: false} <h5>{el.name}</h5> <br />  </div>) : <h4>Aun no se han elegido jugadores</h4>}
                <br />
                {players.teamPlayers.length < 4 && players.teamPlayers.length !== 0 ? <div>Falta{players.teamPlayers.length === 3? ` 1 jugador` : `n ${4 - players.teamPlayers.length} jugadores`} <br /><h6>Si un jugador no aparece en la lista es por que no está en base de datos, andá a "Jugadores" para sumarle</h6></div> :false}
                {players.teamPlayers.length === 4 && Object.keys(errors).length === 0 && newTeam.name !== "" && newTeam.description!== "" ? <button onClick={e => handleConfirm(e)}>Confirmar Equipo</button> : false}
                {players.teamPlayers.length > 4 ? <div>Recordá que los equipos solo tienen hasta 4 jugadores</div> : false}
                <br />
                {resume ? <div><b>Nombre del equipo: </b>{newTeam.name}<br /><b>Descripción: </b>{newTeam.description}<br/><b>Jugadores: </b><ul>{players.teamPlayers.map(e => <li>{e.name}</li>)}</ul></div> : false}
                {resume ? <button type="submit" >Agregar a base de datos</button> : false}
                {resume ? <button onClick={e=> modifyData(e)}>Modificar datos</button> :false}
                <br />
                <h3>Jugadores a seleccionar:</h3>
                <br />

                {players.allPlayers.length > 0 ? players.allPlayers.map(el => <div onClick={e => selectPlayer(e, el.id, el.name, el.image)}>{el.name} <br /> <img src={el.image} alt="" /></div>) : <p>Si los jugadores no aparecen hace click <div onClick={handlePlayersList}><b>aquí</b></div></p> }



            </form>
            <hr />
        </div>
    )

}

export default CreateTeam