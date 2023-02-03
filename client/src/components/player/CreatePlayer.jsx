import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'





const CreatePlayer = () => {

    let dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllPlayers())
    }, [dispatch])

    let allPlayers = useSelector(state => state.players)

    const [newPlayer, setNewPlayer] = React.useState({
        name: "",
        image: "",
        age: "",
        birthday: "",
        description: ""
    })


    const [errors, setErrors] = React.useState({})



    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)


    const handleSubmit = (e) => {
        e.preventDefault()
        let playerExist = allPlayers.find(e => e.name.toLowerCase() == newPlayer.name.toLowerCase())
        if(playerExist){
            alert('Ya existe un/a jugador/a con ese nombre')
        }else{
            setErrors(validation(newPlayer))
        }if(Object.values(errors).length > 0){
            console.log('Errores ---> '+Object.keys(errors))
            alert('Hay datos incorrectos o faltan datos')
        }else{
            axios.post('http://localhost:3001/player/create', newPlayer)
            alert('Jugador/a creado/a')
            setNewPlayer({
                name: "",
                image: "",
                age: "",
                birthday: "",
                description: ""
            })
            setLoading(1)
            dispatch(actions.getAllPlayers())
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
                    setNewPlayer({ ...newPlayer, image: file.secure_url })
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
            setNewPlayer({
                ...newPlayer,
                [e.target.name]: e.target.value
            })
    }

    const handleErrors = (e) => {
        e.preventDefault();
        setErrors(validation(newPlayer));
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
        }else if(data.name.length > 15){
            error = {
                ...error,
                name: "El nombre debe tener menos de 15 carácteres"
            }
        }
        // else{
        //     error = {
        //         ...error,
        //         name: ""
        //     }
        // }
        if(!data.age){
            error = {
                ...error,
                age: "Campo requerido"
            }
        }else if(data.age.length <= 1){
            error = {
                ...error,
                age: "El nombre debe tener más de 1 carácteres"
            }
        }else if(data.age.length > 30){
            error = {
                ...error,
                age: "En la edad debe haber menos de 30 carácteres"
            }
        }
        // else{
        //     error = {
        //         ...error,
        //         age: ""
        //     }
        // }
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
        // else{
        //     error = {
        //         ...error,
        //         description: ""
        //     }
        // }
        return error
    }

    return (
        <div class="createContainer">

            <h1>Introducir Jugador/a</h1>
            <form onSubmit={handleSubmit}>
                <label><b>Nombre del Jugador</b></label>
                <input type="text" class="createInput" name="name" value={newPlayer.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}  />
                <br />
                {errors.name? errors.name : false}
                <br />
                <label><b>Fotografía</b> </label>
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
                        <img class="imggame" src={image} alt="" />
                        <br />
                    </div>
                ) : (
                    false
                )}
                <br />
                {errors.img ? errors.img : false}
                <br />
                <label><b>Edad</b></label>
                <input type="text" class="createInput" name="age" value={newPlayer.age} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                
                <br />
                {errors.age? errors.age : false}
                <br />
                <div class="margin"></div>
                <label><b>Cumpleaños</b> </label>
                <input type="date" class="createInput" name="birthday" value={newPlayer.birthday} onChange={e => handleChange(e)} />
                <br />
                <label ><b >Descripción</b></label>
                <br />                
                <br /><textarea type="text" class="descriptionInput" name="description" value={newPlayer.description} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)}/>
                {errors.description? errors.description : false}
                <br />
                <button type="submit" >Agragar a base de datos</button>


            </form>
        </div>
    )

}

export default CreatePlayer