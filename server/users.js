const users = [];

const addUser = ({ id, name, lastName}) => {

    name        = name.trim().toLowerCase();
    lastName    = lastName.trim().toLowerCase();

    const existingUser = users.find( ( user ) => user.lastName == lastName && user.name === name ) ;

    if(existingUser){
        return {
            error : 'El usuario ya existe'
        };
    }

    const user = {
        id, 
        name, 
        lastName
    };

    users.push(user);

    return { user };
}

const removeUser = ( id ) => {

    const index = users.findIndex( ( user ) => user.id === id );

    if( index !== -1 ){
        return users.splice( index, 1 )[0];
    }

}

const getUser = ( id ) => users.find( (user) => user.id === id ); 
const getUsersLastName = (lastName) => users.filter( ( user ) => user.lastName === 'admin' || user.lastName === 'user'); 

module.exports = { addUser, removeUser, getUser, getUsersLastName };