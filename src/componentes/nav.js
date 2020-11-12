import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


export default function Nav(){

    const[menu, setMenu] = useState(false);

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setMenu(true);
        }
    },[])

    const salir=()=>{
        sessionStorage.clear()
        setMenu(false)
    }

    const crearR=()=>{
        sessionStorage.removeItem('ideditar')
        window.location.href='/crearregistro'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0 fixed-top">
            <div className="container">
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    menu ?
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle nav-link" to="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                        Registro
                        </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link className="dropdown-item" to="/verregistros">Mis Registros</Link>
                                        <Link className="dropdown-item" to="" onClick={()=>crearR()}>Crear Registro</Link>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mr-3">
                                    <a href="/index" className="nav-link">
                                        <i className="fas fa-user"></i> Bienvenido {sessionStorage.getItem('nombre')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-item nav-link" to="/" onClick={()=>salir()}>Salir</Link>
                                </li>
                            </ul>
                        </div> :
                        <div className="navbar-nav ml-auto menu">
                            <Link className="nav-item nav-link" to="/registrar">Registrarme</Link>
                        </div>
                }
            </div>
        </nav>
    )
}