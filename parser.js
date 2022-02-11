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

    /** ESERCIZIO 1 (risultato parsing su singola linea) **/
    static divideMultiLineStringThenParseToSingolarArray(string) {
        let resultArray = [];
        let initialString = string;
        let linesArrayFromString = Parser.stringToArrayByChar(initialString, /\r?\n/);
        linesArrayFromString = linesArrayFromString.filter(e => e !== "");
        console.log("Singolar array: ", linesArrayFromString);
        for (const string of linesArrayFromString) {
            const arrayOfThisStringParsed = Parser.oneLineStringParsingFunction(string);
            resultArray = resultArray.concat(arrayOfThisStringParsed);    
        }
        return resultArray;
    }

    /** ESERCIZIO 2 (risultato parsing su più linee) **/
    static divideMultiLineStringThenParseToArrayOfArray(string) {
        let resultArray = [];
        let initialString = string;
        let linesArrayFromString = Parser.stringToArrayByChar(initialString, /\r?\n/);
        linesArrayFromString = linesArrayFromString.filter(e => e !== "");
        console.log("Array of array: ", linesArrayFromString);
        for (const string of linesArrayFromString) {
            const arrayOfThisStringParsed = Parser.oneLineStringParsingFunction(string);
            resultArray.push(arrayOfThisStringParsed);
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
            let parsedArray = Parser.cleanStringFromSpacesAndCommasThenSplitBySemicolon(value);
            for (let a = 0; a < tableName.length; a++) {
                const propertyName = tableName[a];
                if (!isNaN(parsedArray[a])) {
                    obj[propertyName] = parseFloat(parsedArray[a]);
                } else {
                    obj[propertyName] = parsedArray[a]
                }
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
            const number = parseFloat(string);
            if (!isNaN(number)) {
                arrayStringParsed.push(number);
            } else{
                if (string.toLowerCase() === "true" || string.toLowerCase() === "false") {
                    switch (string.toLowerCase()) {
                        case "true":
                            arrayStringParsed.push(Boolean(string.toLowerCase()));
                            break;
                        case "false":
                            arrayStringParsed.push(!Boolean(string.toLowerCase()));
                            break;
                    }
                } else if (typeof string === "string") {
                    arrayStringParsed.push(string);
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