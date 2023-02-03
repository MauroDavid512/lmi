import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"
import { NavLink, useParams } from 'react-router-dom';
import TeamCard from "../team/TeamCard";
import axios from "axios"

const PlayerDetail = () => {
    let params = useParams()
    let id = params.id
    const dispatch = useDispatch()

    

    React.useEffect(() => {
        dispatch(actions.getPlayerDetail(id))
    },[dispatch])


    let player = useSelector(state => state.playerDetail)
    let admin = useSelector(state => state.admin)

    const [edit, setEdit] = React.useState({
        name:false,
        image:false,
        birthday:false,
        age:false,
        description:false
    })

    const [value, setValue] = React.useState({
        name:"",
        image:"",
        birthday:"",
        age:"",
        description:""
    })

    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)

    const [errors, setErrors] = React.useState({})

    const handleEditOn = (e, prop) => {
        e.preventDefault()
        setValue({
            ...value,
            [prop] : player[prop]
        })
        if(edit[prop]){
            setEdit({
                ...edit,
                [prop]:false
            })
        } else {
            setEdit({
                ...edit,
                [prop]: true
            })
            setErrors(validation(value));
        }
        

    }

    const handleChange = (e) => {
        e.preventDefault()
        setValue({
            ...value,
            [e.target.name]: e.target.value
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
                    setValue({
                        ...value,
                        image: file.secure_url
                    })
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

    const handleErrors = (e) => {
        e.preventDefault();
        setErrors(validation(value));
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

        return error
    }

    const handleSubmitChange = (e, prop) => {
        e.preventDefault()
        let change = {
            [prop] : value[prop]
        }
        axios.put(`http://localhost:3001/player/update/${player.id}`, change)
        alert('Cambios realizados')
        dispatch(actions.getPlayerDetail(id))
        setEdit({
            ...edit,
            [prop] : false
        })

    }



    return (
        <div>
            <img src={player.image} alt="" />
            <br />
            {admin? <button onClick={e=> handleEditOn(e, "image")}>{edit.image? "Cancelar": "Cambiar imagen"}</button> : false}
            {admin && edit.image ? <div><input
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
                {errors.img ? errors.img : false}<br /><button onClick={e => handleSubmitChange(e, "image")}>Guardar cambios</button></div> : false}


            <h1>{player.name}</h1>
            {admin? <button onClick={e=> handleEditOn(e, "name")}>{edit.name? "Cancelar": "Editar"}</button> : false}
            {admin && edit.name ? <div><input type="text" name="name" value={value.name} onChange={e => handleChange(e)} onKeyUp={e=>handleErrors(e)}/><br />{errors.name? errors.name : false}<button onClick={e => handleSubmitChange(e, "name")}>Guardar cambios</button></div> : false}


            <h3>Cumpleañito: {player.birthday}</h3>
            {admin? <button onClick={e=> handleEditOn(e, "birthday")}>{edit.birthday? "Cancelar": "Editar"}</button> : false}
            {admin && edit.birthday ? <div><input type="date" name="birthday" value={value.birthday} onChange={e => handleChange(e)} /><br /><button onClick={e => handleSubmitChange(e, "birthday")}>Guardar cambios</button></div> : false}
            
            
            <h3>Edad: {player.age}</h3>
            {admin? <button onClick={e=> handleEditOn(e, "age")}>{edit.age? "Cancelar": "Editar"}</button> : false}
            {admin && edit.age ? <div><input type="text" name="age" value={value.age} onChange={e => handleChange(e)} onKeyUp={e=>handleErrors(e)}/><br />{errors.age? errors.age : false}<button onClick={e => handleSubmitChange(e, "age")}>Guardar cambios</button></div> : false}
            
            
            <h3>Descripción: {player.description}</h3>
            {admin? <button onClick={e=> handleEditOn(e, "description")}>{edit.description? "Cancelar": "Editar"}</button> : false}
            {admin && edit.description ? <div><textarea name="description"  value={value.description} onChange={e => handleChange(e)} onKeyUp={e=>handleErrors(e)}/><br />{errors.description? errors.description : false}<button onClick={e => handleSubmitChange(e, "description")}>Guardar cambios</button></div> : false}

            {player.teams? <div> <p>Equipos:</p> {player.teams.map(e => <div> <TeamCard id = {e.id} name = {e.name} image = {e.image} /> </div>)} </div>: <p>Este jugador aun no tiene equipos cargados</p> }

        </div>
    )
}

export default PlayerDetail