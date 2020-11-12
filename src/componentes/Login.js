import Axios from 'axios'
import React, {useState} from 'react'
import Swal from 'sweetalert2'


export default function Login(){

    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')
    

    const login=async(e)=>{
        e.preventDefault()
        const usuario={
            correo,contrasena
        }
        const respuesta=await Axios.post('http://localhost:4000/admin/login',usuario)
        const mensaje=respuesta.data.mensaje
        if(mensaje==='Bienvenido'){
            const token=respuesta.data.token
            const id=respuesta.data.id
            const nombre=respuesta.data.nombre
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('id',id)
            sessionStorage.setItem('nombre',nombre)
            Swal.fire({
                icon: 'success',
                title: mensaje,
                showCancelButton: false,
            })
            setTimeout(()=>{
                window.location.href='/verregistros'
            },1500)
        }else{
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showCancelButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="row pt-4">
            <div className="col-lg-6 col-md-8 mx-auto">
                <div className="card">
                    <div className="container text-center fa-5x">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="card-header">
                        Iniciar Sesión
                    
            </div>
                    <div className="card-boddy m-2">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <input type="email" name="correo" className="form-control" placeholder="Correo" requiredautoFocus onChange={e =>setCorreo(e.target.value)}
                                    value={correo}/>
                            </div>
                            <div className="form-group">
                                <input type="password"name="contrasena" className="form-control" placeholder="Contraseña" required onChange={e =>setContrasena(e.target.value)}
                                    value={contrasena}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Aceptar</button>
                        </form>
                    </div>
                    </div>
            </div>
        </div>
    )
}