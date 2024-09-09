// const {coffeeStock, isCoffeeMachineReady} = require('./state'); // Import module using CommonJS
import { coffeeStock, isCoffeeMachineReady } from "./state.js";    // Import module using ES6

const makeCoffee = (type, miligrams) => {
    console.log(isCoffeeMachineReady ? "Mesin siap dipakai!" : "Mesin belum siap dipakai!");

    if(coffeeStock[type] >= miligrams){
        console.log("Kopi berhasil dibuat!");
    } else{
        console.log("Biji kopi habis!");
    }
}

// makeCoffee("robusta", 80);

// // Test try catch
// try {
//     console.log("Awal blok try");   // (1)
//     errorCode;                      // (2)
//     console.log("Akhir blok try");  // (3)
// } catch (error) {
//     console.log(error.name);
//     console.log(error.message);
//     console.log(error.stack);
// }