import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Nav from './componentes/nav';
import Login from './componentes/Login';
import verregistros from './componentes/Verregistros';
import Crearregistro from './componentes/Crearregistro';
import Registrar from './componentes/Registrar';






function App() {
  return (
    <Router>
      <Nav/>
      <div className="container pt-5">
        <Route path="/" exact component={Login}/>
        <Route path='/verregistros' component={verregistros}/>
        <Route path='/editarregistro' component={Crearregistro}/>
        <Route path='/crearregistro' component={Crearregistro}/>
        <Route path='/registrar' component={Registrar}/>
      </div>

    </Router>
      
  );
}

export default App;
