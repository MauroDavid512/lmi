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
        playersNumber: 0,
        teamsNumber: ""
    })


    const [errors, setErrors] = React.useState({})



    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)


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
            axios.post('http://localhost:3001/player/create', newGame)
            alert('Jugador/a creado/a')
            setNewPlayer({
                name: "",
                image: "",
                description: "",
                type: "",
                playersNumber: 0,
                teamsNumber: ""
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
                    setNewPlayer({ ...newGame, image: file.secure_url })
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
        if(!data.playersNumber){
            error = {
                ...error,
                playersNumber: "Campo requerido"
            }
        }else if(data.playersNumber < 1 || data.playersNumber > 16){
            error = {
                ...error,
                playersNumber: "Número invalido"
            }
        }
        if(!data.teamsNumber){
            error = {
                ...error,
                teamsNumber: "Campo requerido"
            }
        }else if(data.teamsNumber < 1 || data.teamsNumber > 4){
            error = {
                ...error,
                teamsNumber: "Número invalido"
            }
        }
        return error
    }

    return (
        <div>

            <h1>Introducir Jugador/a</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre del Jugador</label>
                <br />
                <input type="text" name="name" value={newPlayer.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}  />
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
                <label>Edad</label>
                <br />
                <input type="text" name="age" value={newPlayer.age} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.age? errors.age : false}
                <br />
                <label>Cumpleaños</label>
                <br />
                <input type="date" name="birthday" value={newPlayer.birthday} onChange={e => handleChange(e)} />
                <br />
                <label>Descripción</label>
                <br />
                <textarea type="text" name="description" value={newPlayer.description} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.description? errors.description : false}
                <br />
                <button type="submit" >Agragar a base de datos</button>


            </form>
        </div>
    )

}

export default CreatePlayer