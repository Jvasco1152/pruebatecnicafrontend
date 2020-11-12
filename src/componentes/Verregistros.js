import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import {format} from 'timeago.js'

export default function Verregistros(){

    const [registro,setRegistro]=useState([])
    const [notieneregistro,setNotieneregistro]=useState('')

    useEffect(()=>{
        obtenerRegistros()

    },[])

    const obtenerRegistros=async()=>{
        const token=sessionStorage.getItem('token')
        const respuesta=await Axios.get('http://localhost:4000/registrousuario',{
            headers:{'autorizacion': 'bearer '+token}
        })
        if(respuesta.data.length>0){
            setRegistro(respuesta.data)
            setNotieneregistro(false)
        }else{
            setNotieneregistro(true)
        }
    }

    const eliminar=async(id)=>{
        const token=sessionStorage.getItem('token')
        const respuesta=await Axios.delete('http://localhost:4000/registro/eliminar/'+id,{
            headers:{'autorizacion': 'bearer '+token}
        })
        obtenerRegistros()
        const mensaje=respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            text: mensaje,
            showConfirmButton: false,
        })
        setTimeout(()=>{
            window.location.href='/verregistros'
        },1500)
    }

    const editar=(id)=>{
        sessionStorage.setItem('ideditar',id)
        window.location.href='/editarregistro'
    }

    return(
        <div className="row pt-5">
           {
               notieneregistro ? <div className="container text-center pt-4">
                   <div className="card border-0">
                       <div className="card-header">
                           <h4 className="">USTED NO TIENE REGISTROS, TE INVITO A CREAR UNO</h4>
                       </div>
                       <Link className="btn btn-primary" to="/crearregistro">
                           Crear
            </Link>
                   </div>
               </div> :
                    registro.map(registro => (
                        <div className="col-md-4 pt-4" key={registro._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <strong>{registro.nombre} {registro.apellido}</strong>
                                </div>
                                <div className="card-body">
                                    <strong>Genero</strong>
                                    <p>{registro.genero}</p>
                                    <strong>Fecha de Nacimiento</strong>
                                    <p>{format(registro.nacimiento)}</p>
                                    <strong>Pais</strong>
                                    <p>{registro.pais}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={()=> eliminar(registro._id)}>
                                        Eliminar
                            </button>
                                    <button className="btn btn-warning" onClick={()=>editar(registro._id)}>
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))

} 

        </div>
    )
}