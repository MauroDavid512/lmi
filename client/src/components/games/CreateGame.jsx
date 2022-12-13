import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'





const CreateGame = () => {

    let dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllGames())
    }, [dispatch])

    let allGames = useSelector(state => state.games)

    const [newGame, setNewGame] = React.useState({
        name: "",
        image: "",
        description: "",
        type: "",
        playersNumber: 2,
        teamsNumber: 2
    })


    const [errors, setErrors] = React.useState({})

    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)

    const optionsPlayers = []

    for(let i = 1; i<16; i++){
        optionsPlayers.push(i+1)
    }

    const optionsTeams = []

    for(let i = 1; i<4; i++){
        optionsTeams.push(i+1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let gameExist = allGames.find(e => e.name.toLowerCase() == newGame.name.toLowerCase())
        if(gameExist){
            alert('Ya existe un/a jugador/a con ese nombre')
        }else{
            setErrors(validation(newGame))
        }if(Object.values(errors).length > 0){
            console.log('Errores ---> '+Object.keys(errors))
            alert('Hay datos incorrectos o faltan datos')
        }else{
            axios.post('http://localhost:3001/game/create', newGame)
            alert('Juego Creado')
            setNewGame({
                name: "",
                image: "",
                description: "",
                type: "",
                playersNumber: 2,
                teamsNumber: 2
            })
            setLoading(1)
            dispatch(actions.getAllGames())
        }
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
                    setNewGame({ ...newGame, image: file.secure_url })
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


    const handleChange = (e) => {
        
        e.preventDefault()
            setNewGame({
                ...newGame,
                [e.target.name]: e.target.value
            })
    }

    const handleErrors = (e) => {
        e.preventDefault();
        setErrors(validation(newGame));
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
        }else if(data.name.length > 25){
            error = {
                ...error,
                name: "El nombre debe tener menos de 25 carácteres"
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
        }else if(data.description.length > 300){
            error = {
                ...error,
                description: "En la descripción debe haber menos de 300 carácteres"
            }
        }
        return error
    }

    return (
        <div>

            <h1>Crear Juego</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre del Juego</label>
                <br />
                <input type="text" name="name" value={newGame.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}  />
                {errors.name? errors.name : false}
                <br />
                <label>Fotografía</label>
                <br />
                <input
                    id="inputFile"
                    type="file"
                    name="image"
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
                <textarea type="text" name="description" value={newGame.description} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.description? errors.description : false}
                <br />
                <label>Cantidad de jugadores: </label>
                <select name="playersNumber" value={newGame.playersNumber} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}>
                    {optionsPlayers.map(e=> <option value={e}>{e}</option>)}
                </select>
                <br />
                <label>Cantidad de equipos: </label>
                <select name="teamsNumber" value={newGame.teamsNumber} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}>
                    {optionsTeams.map(e=> <option value={e}>{e}</option>)}
                </select>
                <br />
                <select name="type" value={newGame.type} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}>
                    <option value="Comparada">Comparada</option>
                    <option value="Combinada">Combinada</option>
                    <option value="Mixta">Mixta</option>
                    <option value="Continua">Continua</option>
                </select>
                <br />
                {newGame.name !== "" ? <button type="submit" >Agragar a base de datos</button> : false}
                


            </form>
            <hr />
        </div>
    )

}

export default CreateGame