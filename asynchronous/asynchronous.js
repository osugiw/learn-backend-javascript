import { withDrawMoney } from "./chaining_asynchronous";

// Asynchronous using callback
function getUsers(isOffline, callback){
    setTimeout(() => {
        const users = ['John', 'Jack', 'Abigail'];

        if(isOffline){
            callback(new Error('cannot retrieve users due offline'), null);
            return;
        }

        callback(null, users);
    }, 3000);
}

function usersCallback(error, users){
    if(error){
        console.log('callback:', error.message);
        return;
    }
    console.log('callback:', users);
}

// Asynchronous using Promise
function getUsersPromise(isOffline){
    // return a Promise object
    return new Promise((resolve, reject) => {
        // simulate network delay
        setTimeout(() => {
            const users = ['John', 'Jack', 'Abigail'];

            if (isOffline){
                reject(new Error('cannot retrieve users due offline'));
                return
            }
            resolve(users);
        }, 3000);
    });
}

export {getUsers, getUsersPromise, usersCallback};