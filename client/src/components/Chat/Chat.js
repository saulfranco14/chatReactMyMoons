import React, { useState, useEffect }   from 'react';
import queryString                      from 'query-string';
import io                               from 'socket.io-client';

let socket;

const Chat = ( { location } ) => {

    const [ name, setName ]         = useState('');
    const [ lastName , setLastName] = useState('');
    const [ message , setMessage]   = useState('');
    const [ messages , setMessages] = useState([]);
    const endPoint                  = 'localhost:5000';


    useEffect ( () => {

        const { name , lastName } = queryString.parse(location.search);
        socket  = io( endPoint );
        setName(name);
        setLastName(lastName);

        socket.emit('join', { name, lastName }, () => {
        });
        
        return () =>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [ endPoint, location.search ]);

    useEffect( () => {

        socket.on('message', () => {
            setMessages( [...messages, message] );
        })
    }, [messages] );

    const sendMessage = ( event ) => {
        event.preventDefault();
        if(message){
            socket.emit( 'sendMessage', message, () => setMessage('') );
        }
    }

    console.log(message, messages);
    return(
        <div className="outerContainer">
            <div className="container">
                <input
                        value       = { message}
                        onChange    = { (event) => setMessage(event.target.value) }
                        onKeyPress  = { event => event.key === 'Enter' ? sendMessage(event) : null }  
                />
               
            </div>
        </div>
    )
}

export default Chat;