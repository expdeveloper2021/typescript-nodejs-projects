import inquirer from "inquirer";
let allCurrencies = [];
async function askForAddCurrency() {
    let isLoop = true;
    let mainCurrencyQuestion = await inquirer.prompt([
        { type: "input", name: "mainCurrency", message: `Enter your Main Currency: ` },
    ]);
    // let allCurrencies = []
    if (mainCurrencyQuestion.mainCurrency) {
        let objectToPush = {
            currency: mainCurrencyQuestion.mainCurrency,
            convertedCurrencies: [],
        };
        while (isLoop) {
            let allQuestions = await inquirer.prompt([
                { type: "input", name: "currenyToAdd", message: `Enter Converted Currency Name: ` },
                { type: "number", name: "currenyAmount", message: `Enter Converted Currency Amount:` },
                { type: "confirm", name: "moreCurrencyToAdd", message: `Do you want to add more currencies with conversion amount?` },
                // { type: "confirm", name: "addmoretodos", message: "Do you want to add more items in list?", default: false },
            ]);
            let objectConverted = {
                currency_name: allQuestions.currenyToAdd,
                currency_amount: allQuestions.currenyAmount,
            };
            objectToPush.convertedCurrencies.push(objectConverted);
            if (!allQuestions.moreCurrencyToAdd) {
                isLoop = false;
                allCurrencies.push(objectToPush);
                askForAddMoreCurrencies();
            }
        }
    }
}
async function askForAddMoreCurrencies() {
    let addMoreCurrency = await inquirer.prompt([
        { type: "confirm", name: "addmorecurrencies", message: "Do you want to add more currencies data?", default: false },
    ]);
    if (addMoreCurrency.addmorecurrencies) {
        askForAddCurrency();
    }
    else {
        askForConversion();
    }
}
async function askForConversion() {
    let calculationsData = await inquirer.prompt([
        { type: "list", name: "currency_to_convert_from", choices: allCurrencies.map(item => item.currency), message: "Which currency you want to convert from?" },
        // { type: "input", name: "currency_to_convert_at", message: "Which currency you want to conver to?" },
        // { type: "number", name: "amount_to_convert", message: "Enter Amount: " },
    ]);
    if (calculationsData.currency_to_convert_from) {
        let filteredMainCurrency = allCurrencies.filter((t) => {
            return t.currency === calculationsData.currency_to_convert_from;
        });
        if (filteredMainCurrency.length > 0) {
            let calculationsDataSecond = await inquirer.prompt([
                { type: "list", choices: filteredMainCurrency[0].convertedCurrencies.map(item => item.currency_name), name: "currency_to_convert_at", message: "Which currency you want to conver to?" },
                { type: "number", name: "amount_to_convert", message: "Enter Amount: " },
            ]);
            if (calculationsDataSecond.currency_to_convert_at && calculationsData.currency_to_convert_from && calculationsDataSecond.amount_to_convert) {
                let filteredInnerCurrency = filteredMainCurrency[0].convertedCurrencies.filter((t) => {
                    return t.currency_name === calculationsDataSecond.currency_to_convert_at;
                });
                if (filteredInnerCurrency.length > 0) {
                    let converted = Number(filteredInnerCurrency[0].currency_amount) * calculationsDataSecond.amount_to_convert;
                    console.log(`${calculationsDataSecond.amount_to_convert} ${calculationsData.currency_to_convert_from} = ${converted} ${calculationsDataSecond.currency_to_convert_at}`);
                }
            }
            else {
                console.log("Invalid Data");
            }
        }
    }
    else {
        console.log("Invalid Data");
    }
    askForMoreConversion();
}
async function askForMoreConversion() {
    let calculationsData = await inquirer.prompt([
        { type: "confirm", name: "convert_again", message: "Do you want to perform more conversions?", default: false },
    ]);
    if (calculationsData.convert_again) {
        askForConversion();
    }
}
askForAddCurrency();
