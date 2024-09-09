// // Trying Asynchronous with callback as well as promise
// import {getUsers, getUsersPromise, usersCallback} from "./asynchronous.js";
// import { promisify } from "util";  // Import util library

// const  status = false;

// // Callback method
// getUsers(status, usersCallback);

// // Promise method
// getUsersPromise(status)
//     .then(users => console.log(`Promise: ${users}`))
//     .catch(err => console.log(`Promise: ${err.message}`));

// // Convert the callback-based function as Promise
// const getUsersPromisify = promisify(getUsers);
// getUsersPromisify(status)
//     .then(users => console.log(`Promisify: ${users}`))
//     .catch(err => console.log(`Promisify: ${err}`));

// Chaining asynchronous
import {withDrawMoney, buyCinemaTicket, goInsideCinema} from "./chaining_asynchronous.js";

// // Using promise method
// function watchMovie() {
//     withDrawMoney(10)
//       .then((money) => buyCinemaTicket(money))
//       .then((ticket) => goInsideCinema(ticket))
//       .then((result) => console.log(result))
//       .catch((error) => console.log(error.message));
// }
// watchMovie();

// Using async and await method
async function watchMovie(){
    try {
        const money = await withDrawMoney(10);
        const ticket = await buyCinemaTicket(money);
        const result = await goInsideCinema(ticket);

        console.log(result);
    } catch (error){
        console.log(error.message);
    }
}
watchMovie().then(() => console.log('done'));