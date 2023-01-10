'use strict';
import valuesJson from './valuesOfQuantities.json' assert { type: "json" };
const valuesOfMeasures = Object.entries(valuesJson);

let convertForm = document.getElementById('form');
let resultInput = document.getElementById("result");
const addValueForm = document.getElementById("addValueForm");
const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');


import * as fs from 'fs';


let dataInit = {
    "distance": { "measure": "", "value": 0 },
    "convert_to": ""
};
let dataResult = {
    "measure": "",
    "value": 0
};

//Получение данных от пользователя

convertForm.onsubmit = function (event) {
    event.preventDefault();
    dataInit.distance.value = parseFloat(event.target[0].value.replace(' ', '').replace(',', '.'));
    dataInit.distance.measure = event.target[1].value;
    dataInit.convert_to = event.target[2].value;
    convertToM(dataInit);
    return dataInit;
};

// Конвертация

let convertToM = function (data) {
    data.distance.measure && data.distance.value ? valuesOfMeasures.find(([key, value]) => {
        if (key === data.distance.measure) {
            dataResult.value = data.distance.value / value
        }
    }) : alert('Недопустима величина');
    data.distance.measure = "m";
    data.distance.value = dataResult.value.toFixed(2);
    data.convert_to == 'm' ? setResult(data) : convert_to_measure(data);
    return data;
};

let convert_to_measure = function (data) {
    data.distance.measure && data.convert_to ? valuesOfMeasures.find(([key, value]) => {
        if (key === data.convert_to) {
            dataResult.value = data.distance.value * value
        }
    }) : alert('Недопустима величина');
    dataResult.value = dataResult.value.toFixed(2);
    dataResult.measure = data.convert_to;
    setResult(dataResult);
    return dataResult;
};

// Запись результата

const setResult = function (dataResult) {
    resultInput.value = `${dataResult.value} ${dataResult.measure}`;
    return;
};

// Добавить значение для конвертации

// addValueForm.onsubmit = function (event) {
//     event.preventDefault();
//     var file = JSON.parse(fs.readFileSync('./valuesOfQuantities.json', 'utf-8'));
//     const keyConvertFrom = `${event.target[0].value}`;
//     file[keyConvertFrom] = event.target[2].value;
//     const keyConvertTo = `${event.target[1].value}`;
//     file[keyConvertTo] = event.target[3].value;
//     fs.writeFileSync('./valuesOfQuantities.json', JSON.stringify(file));
//     const markupFrom = `<option value="${convertFrom}">${convertFrom}</option>`
//     select1.insertAdjacentHTML('beforeend', markupFrom);
//     const markupTo = `<option value="${convertTo}">${convertTo}</option>`
//     select2.insertAdjacentHTML('beforeend', markupTo);
//     event.target[0].value = '';
//     event.target[1].value = '';
//     event.target[2].value = '';
// };

