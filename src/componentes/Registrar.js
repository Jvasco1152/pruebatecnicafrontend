import React, {useState} from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function Registrar() {

    const [nombre,setNombre]=useState('')
    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')

    const registrar = async (e)=>{
        e.preventDefault()
        const usuario={
            nombre,correo,contrasena
        }
        const respuesta=await Axios.post('http://localhost:4000/admin/registrar',usuario)
        const mensaje=respuesta.data.mensaje
        if(mensaje==='Bienvenido'){
            const token=respuesta.data.token
            const id = respuesta.data.id
            const nombre=respuesta.data.nombre
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('id',id)
            sessionStorage.setItem('nombre',nombre)
            Swal.fire({
                icon: 'succes',
                tittle: mensaje,
                showConfirmButton: false,
            })
            setTimeout(()=> {
                window.location.href='/verregistros'
            },1500)
        }else{
            Swal.fire({
                icon: 'error',
                tittle: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
   
    return (
        <div className="row pt-4">
        <div className="col-md-8 mx-auto">
            <div className="card">
                Registro
    </div>
            <div className="card-body">
                <form onSubmit={registrar}>
                    <div className="form-group">
                        <input type="text" name="nombre" className="form-control" placeholder="Nombre" requiredautoFocus onChange={e=> setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="email" name="correo" className="form-control" placeholder="Correo" required onChange={e => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" name="contrasena" className="form-control" placeholder="Contraseña" required onChange={e => setContrasena(e.target.value)} />
                    </div>
                    <div className="form-group" type="submit">
                        <button  className="form-control btn btn-primary btn-block">
                            Aceptar
            </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
