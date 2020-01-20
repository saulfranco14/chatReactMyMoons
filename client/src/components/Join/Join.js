import React,   { useState } from 'react';
import          { Link }                from 'react-router-dom';

import  './Join.css';

const Join = () => {

    const [ name, setName ]         = useState('');
    const [ lastName , setLastName] = useState('');

    return(

        <div className="containerOuter">
            <div className="containerInner">
                <h1 className="heading"> Chat Moons</h1>
                <div> 
                    <input 
                        placeholder     = "Nombre" 
                        className       = "joinInput" 
                        type            = "text" 
                        onChange        =   { (event)   => 
                                                setName(event.target.value)
                                            }
                    />
                </div>
                <div>
                    <select className   = "joinInput mt-20" 
                            placeholder ="Selecciona el tipo de usuario" 
                            onChange    =   { (event)  => 
                                                setLastName(event.target.value)
                                            } >
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {/* Dinamyc Link */}
                <Link 
                    onClick =   {
                                    event => ( !name || !lastName ) ? event.preventDefault() : null
                                }
                    to      =   {
                                    `/chat?name=${name}&lastName=${lastName}`
                                }
                >
                    <button className="button mt-20" type="submit"> Iniciar</button>
                </Link>
            </div>
        </div>

    )
}

export default Join;