import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'





const CreatePlayer = () => {

    let dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllPlayers())
        console.log(img)
    },[dispatch])

    let allPlayers = useSelector(state => state.players)

    const [newPlayer, setNewPlayer] = React.useState({
        name: "",
        image: "",
        age: "",
        birthday: "",
        description: ""
    })


    const [errors, setErrors] = React.useState({})

    const [img, setImg] = React.useState({})


    const handleSubmit = (e) => {
        e.preventDefault()
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
        setImg({
            ...img,
            loading:2
        });
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
                    img: 'El archivo es demasiado grande'});
            } else {
                if (format === 'jpg' || format === 'png') {
                    console.log('url de la imagen '+ file.secure_url)
                    setErrors({
                        errors,
                        img:""
                    });
                    setImg({
                        ...img,
                        image: file.secure_url});
                    setImg({
                        ...img,
                        loading:0
                    });
                    console.log('Propiedad de img '+img.image)
                    setNewPlayer({ ...newPlayer, image: file.secure_url })
                } else {
                    setErrors({
                        ...errors,
                        img:'Solo se admiten archivos formato jpeg o png'});
                    setImg({
                        ...img,
                        loading:1
                    });
                }
            }
        } catch (error) {
            setErrors({
                ...errors,
                img:'Solo se admiten archivos formato jpeg o png'});
            setImg({
                ...img,
                loading: 1
            });
        }
    };


    return (
        <div>

            <h1>Introducir Jugador/a</h1>
            <form>
                <label>Nombre del Jugador</label>
                <br />
                <input type="text" />
                <br />
                <label>Fotografía</label>
                <br />
                <input
                    id="inputFile"
                    type="file"
                    name="image"
                    onChange={(e) => handleimg(e)}
                />
                {img.loading === 2 ? (
                    <p>
                        Cargando imagen...
                    </p>
                ) : (
                    false
                )}
                {img.loading === 0 ? (
                    <div>
                        <br />
                        <img src={img.image} alt="" />
                        <br />
                    </div>
                ) : (
                    false
                )}
                {errors.img ? errors.img : false}
                <br />
                <label>Edad</label>
                <br />
                <input type="text" />
                <br />
                <label>Cumpleaños</label>
                <br />
                <input type="date" />
                <br />
                <label>Descripción</label>
                <br />
                <textarea />


            </form>
        </div>
    )

}

export default CreatePlayer