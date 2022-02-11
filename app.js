"use strict"

const fs = require('fs');
const {EmptyStringError, InvalidStringError, PartialInvalidStringError, PotentialartialInvalidStringError, Parser} = require('./parser.js'); // Con o senza estensione è indifferente.

/************************** Leggo i comandi, gli argomenti **************************/

const argie = process.argv.splice(2);

const fileToRead = argie[0];
const fileToWrite = argie[1];
//const howWriteToFile = argie[2];

// const fileToRead = "./assets/input/ex1and2.csv";
// const fileToWrite = "./assets/output/resultEx2.json";

/**************************************************************************************/

/************************** Leggo il file **************************/

// fs.readFile(fileToRead, 'utf8', (error, data) => { // Lettura del file in modo asincrono. Il risultato arriverà dopo la fine del programma.
//     if (error) {
//         console.log(error);
//     } else {
//         const array = Parser.divideMultiLineStringThenParseToSingolarArray(data);
//         console.log(array);
//     }
// })

fs.readFile(fileToRead, 'utf8', manageFileData);

function manageFileData(error, data) {
    if (error) {
        console.log(error);
    } else {
        const array = Parser.divideMultiLineStringThenParseToSingolarArray(data);
        //console.log(array);
        const json = JSON.stringify(array);
        writeJSONFile(json);
    }
}

function writeJSONFile(json) {
    fs.writeFile(fileToWrite, json, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("File '" + fileToWrite + "' scritto con successo!");
        }
    });
}

// let data;
// try {
//     data = fs.readFileSync(fileToRead, 'utf8'); // Lettura del file in modo sincrono. Il risultato arriverà durante il flusso del programma.
//     //console.log(data);
// } catch (err) {
//     console.log("\nProblemi durante la lettura del file.\n");
//     console.error(err);
// }

/**************************************************************************************/

/************************** Parso il contenuto del file **************************/

// let result;
// try {
//     /** ESERCIZIO 1 (risultato parsing su singola linea) **/
//     //result = Parser.divideMultiLineStringThenParseToSingolarArray(data);

//     /** ESERCIZIO 2 (risultato parsing su più linee) **/
//     result = Parser.divideMultiLineStringThenParseToArrayOfArray(data);
//     //result = Parser.divideMultiLineStringThenParseToChosenArray(data, howWriteToFile);

//     /** ESERCIZIO 3 (risultato parsing matrice su più linee) **/
//     //result = Parser.arrayOfObjectsFromStringMultiline(data);

//     console.log("Array risultato: ", result);
// } catch (error) {
//     console.log(error);
// }

/**************************************************************************************/

/************************** Scrivo il risultato del parse in un nuovo file **************************/

// try {
//     fs.writeFileSync(fileToWrite, JSON.stringify(result)); // JSON.stringify() -> trasforma qualsiasi elemento in una stringa
// } catch (error) {
//     console.log(error.message);
// }

/**************************************************************************************/

console.log("\nQui finisce il programma.");