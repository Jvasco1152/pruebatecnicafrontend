import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function Crearregistro(){

    const [nombre,setNombre]=useState('')
    const [apellido,setApellido]=useState('')
    const [genero,setGenero]=useState([])
    const [selectgenero,setSelectgenero]=useState('')
    const [nacimiento,setNacimiento]=useState(new Date())
    const [pais,setPais]=useState('')
    const [administrador,setAdministrador]=useState('')
    const [editar,setEditar]=useState('')

    useEffect(()=>{
        if(sessionStorage.getItem('ideditar')){
            const token=sessionStorage.getItem('token')
            const idregistro=sessionStorage.getItem('ideditar')
            setEditar(true)
            Axios.get('http://localhost:4000/registro/'+idregistro,{
                headers:{'autorizacion': 'bearer '+token}
            }).then(respuesta=>{
                setNombre(respuesta.data.nombre)
                setApellido(respuesta.data.apellido)
                setSelectgenero(respuesta.data.genero)
                setNacimiento(new Date(respuesta.data.nacimiento))
                setPais(respuesta.data.pais)
                setAdministrador(respuesta.data.administrador.id)
                setGenero(['Masculono','Femenino'])
            })           
        }else{
            const id=sessionStorage.getItem('id')
            setAdministrador(id)
            setSelectgenero('Masculino')
            setEditar(false)
            setGenero(['Masculino','Femenino'])
        }
        // eslint-disable-next-line
    },[])

    const guardar=async(e)=>{
        e.preventDefault()
        const token=sessionStorage.getItem('token')
        const nuevoregistro={
            nombre,
            apellido,
            genero: selectgenero,
            nacimiento,
            pais,
            administrador,


        }
        if(editar){
            const idregistro=sessionStorage.getItem('ideditar')
            const respuesta=await Axios.put('http://localhost:4000/registro/actualizar/'+idregistro,nuevoregistro,{headers: {'autorizacion': 'bearer '+token}
            })
            const mensaje=respuesta.data.mensaje
            Swal.fire({
                icon:'success',
                text: mensaje,
                showConfirmButton:false,
            })
            sessionStorage.removeItem('ideditar')          

        }else{
            const respuesta=await Axios.post('http://localhost:4000/registro/crear',nuevoregistro,{headers: {'autorizacion': 'bearer '+token}})

            const mensaje=respuesta.data.mensaje
            Swal.fire({
                icon:'success',
                text: mensaje,
                showConfirmButton:false,
            })
        }
        setTimeout(() => {
            window.location.href='/verregistros'
        }, 1500);
    }

    const onChangeDate=nacimiento=>{
        setNacimiento(nacimiento);
    }

    return (
        <div className="row pt-5">
        <div className="col-md-8 mx-auto pt-5">
            <div className="card">
                {
                    editar ?
                        <div className="card-header">
                            <h4>Editar Registro</h4>
                        </div>
                        :
                        <div className="card-header">
                            <h4>Crear Registro</h4>
                        </div>
                }
                <div className="card-body">
                    <form onSubmit={guardar}>
                        <div className="form-group">
                            <input name="nombre" type="text" placeholder="Nombre" required onChange={e=>setNombre(e.target.value)} value={nombre} />
                          

                        </div>
                        <div className="form-group">
                            <input name="apellido" type="text" placeholder="Apellido" required onChange={e=>setApellido(e.target.value)} value={apellido} />
                        </div>
                        <div className="form-group">
                            <select name="selectgenero" onChange={e => setSelectgenero(e.target.value)}value={selectgenero}>
                                {
                                    genero.map(genero=>
                                        <option key={genero}>
                                            {genero}
                                        </option>)
                                }
                            </select>
                            <div className="form-group">
                                <DatePicker className="form-control"
                                    selected={nacimiento}
                                    onChange={onChangeDate}/>
                            </div>
                            {
                                editar ? <button type="submit" className="btn btn-warning btn-block mt-2">
                                    Editar
                        </button> : 
                                    <button type="submit" className="btn btn-primary btn-block mt-2">
                                        Guardar
                            </button>
                            }
                        </div>
                    </form>


                </div>

            </div>

        </div>

        </div>
    )

}