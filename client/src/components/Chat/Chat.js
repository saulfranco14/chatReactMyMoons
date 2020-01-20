import React, { useState, useEffect }   from 'react';
import queryString                      from 'query-string';
import io                               from 'socket.io-client';
import InfoBar                          from '../InfoBar/InfoBar';
import Input                            from '../Input/Input';
import Messages                         from '../Messages/Messages';
import './Chat.css';



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

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message ]);
        });
    
        return () => {
          socket.emit('disconnect');
          socket.off();
        }
    }, [messages])

    console.log(message, messages);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar name={ name } />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />                
               
            </div>
        </div>
    )
}

export default Chat;