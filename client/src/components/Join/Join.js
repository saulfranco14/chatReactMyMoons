import React,   { Component, useState } from 'react';
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
                    <input 
                        placeholder     = "Apellido" 
                        className       = "joinInput mt-20" 
                        type            = "text" 
                        onChange        =   { (event)  => 
                                                setLastName(event.target.value)
                                            }
                    />
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