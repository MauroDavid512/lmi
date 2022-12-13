import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions"
import axios from "axios"

const TournamentDetail = () => {
    let params = useParams()
    let dispatch = useDispatch()
    let id = params.id

    React.useEffect(() => {
        dispatch(actions.getTournamentDetail(id))
    }, [dispatch])

    let tournament = useSelector(state => state.tournamentDetail)
    let admin = useSelector(state => state.admin)

    const [edit, setEdit] = React.useState({
        name:false,
        image:false,
        description:false
    })

    const [value, setValue] = React.useState({
        name:"",
        image:"",
        description:""
    })

    const [image, setImage] = React.useState("")

    const [loading, setLoading] = React.useState(1)

    const [errors, setErrors] = React.useState({})
    
    const handleEditOn = (e, prop) => {
        e.preventDefault() 
        setValue({
            ...value,
            [prop] : tournament[prop]
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
        axios.put(`http://localhost:3001/tournament/update/${tournament.id}`, change)
        alert('Cambios realizados')
        dispatch(actions.getTeamDetail(id))
        setEdit({
            ...edit,
            [prop] : false
        })

    }





    return (
        <div>
            <img src={tournament.image} alt="" />
            <h1>{tournament.name}</h1>
            <h2>{tournament.description}</h2>

            <br />
            <b>Equipos que participaron</b>
            <br />
            {tournament.teams ? 
                tournament.teams.map(e => <NavLink to={`/lmi/team/${e.id}`}>
                    <b>{e.name}</b>
                    <br />
                </NavLink>)
            : false }
            <br />
            {tournament.galery ? tournament.galery.map(e => <img src={e} alt={`Fotografía ${tournament.name}`} /> ) : false}
        </div>
    )
}

export default TournamentDetail