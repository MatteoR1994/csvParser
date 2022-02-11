const { log } = require("console");

class EmptyStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class InvalidStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class PartialInvalidStringError extends Error{
    constructor(message, partialResult){
        super(message);
        this.partialResult = partialResult
    }
}

class PotentialartialInvalidStringError extends Error{
    constructor(message){
        super(message);
    }
}

class Parser {

    // Funzioni degli esercizi //

    /** ESERCIZIO 1 (risultato parsing su singola linea, comando da terminale -a) - ESERCIZIO 2 (risultato parsing su più linee, default se non indicato -a) **/
    static parseCSV(string, outputType) {
        let resultArray = [];
        let initialString = string;
        let linesArrayFromString = Parser.stringToArrayByChar(initialString, /\r?\n/);
        linesArrayFromString = linesArrayFromString.filter(e => e !== "");
        console.log("Array of array: ", linesArrayFromString);
        for (const string of linesArrayFromString) {
            const arrayOfThisStringParsed = Parser.oneLineStringParsingFunction(string);
            if (outputType === "-a") { // a = array - else = default, array di array. Si mette il segno - davanti a tutti i comandi non di sistema come convenzione.
                resultArray = resultArray.concat(arrayOfThisStringParsed);
            } else {
                resultArray.push(arrayOfThisStringParsed);
            }
        }
        return resultArray;
    }

    /** ESERCIZIO 3 (risultato parsing matrice su più linee) **/
    static arrayOfObjectsFromStringMultiline(string) {
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota.");
        }
        let arrayOfStrings = string.split(/\r?\n/);
        arrayOfStrings = arrayOfStrings.filter(e => e !== "");
        let tableName = Parser.cleanStringFromSpacesAndCommasThenSplitBySemicolon(arrayOfStrings[0]);
        for (const element of arrayOfStrings) {
            let stringArray = Parser.cleanStringFromSpacesAndCommasThenSplitBySemicolon(element);
            if (stringArray.length < tableName.length) {
                throw new PotentialartialInvalidStringError("Qualcosa non va nel file, controllalo.");
            }
        }
        const finalArray = [];
        for (let i = 1; i < arrayOfStrings.length; i++) {
            const value = arrayOfStrings[i];
            let obj = {};
            let parsedArray = Parser.oneLineStringParsingFunction(value);
            console.log(parsedArray);
            for (let a = 0; a < tableName.length; a++) {
                const propertyName = tableName[a];
                obj[propertyName] = parsedArray[a];
            }
            finalArray.push(obj);        
        }
        return finalArray;
    }

    // Funzioni di appoggio a quelle degli esercizi //

    static oneLineStringParsingFunction(string) {
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota.");
        }
        let workString = string;
        let stringArray = Parser.cleanStringFromSpacesAndCommasThenSplitBySemicolon(workString);
        let arrayStringParsed = [];
        for (const string of stringArray) {
            if (!isNaN(string)) { // isNaN digerisce anche le stringhe. Se per esempio gli arriva la stringa "3", lui riconosce che è un numero, anche se non sarà in grado di processarlo.
                arrayStringParsed.push(parseFloat(string));
            } else {
                if (string.toLowerCase() === "true" || string.toLowerCase() === "false") {
                    switch (string.toLowerCase()) {
                        case "true":
                            arrayStringParsed.push(Boolean(string.toLowerCase()));
                            break;
                        case "false":
                            arrayStringParsed.push(!Boolean(string.toLowerCase()));
                            break;
                    }
                } else {
                    if ((new Date(string) !== "Invalid Date") && !isNaN(new Date(string))) {
                        arrayStringParsed.push(new Date(string));
                    } else if (typeof string === "string") {
                        arrayStringParsed.push(string);
                    }
                }
            }
        }
        return arrayStringParsed;
    }

    static replaceAll(string, charToReplace, newChar) {
        const re = new RegExp(charToReplace, 'g');
        return string.replace(re, newChar);
    }

    static stringToArrayByChar(string, char) {
        return string.split(char);
    }

    static cleanStringFromSpacesAndCommasThenSplitBySemicolon(string) {
        let noSpacesString = Parser.replaceAll(string, " ", "");
        let noSpaceAndCommaString = Parser.replaceAll(noSpacesString, ",", ".");
        let stringArray = Parser.stringToArrayByChar(noSpaceAndCommaString, ";");
        return stringArray;
    }

}

module.exports = {
    EmptyStringError,
    InvalidStringError,
    PartialInvalidStringError,
    PotentialartialInvalidStringError,
    Parser
}