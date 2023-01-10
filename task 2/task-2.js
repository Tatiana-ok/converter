'use strict';

// import dataServer from './data.json' assert { type: "json" };
const dataServer = 'data.json';
const dataServer2 = 'data2.json';
const pointEntry = document.querySelector('.contacts-list');
const pointEntrySecond = document.querySelector('.contacts-list-second');
let filterForm = document.getElementById('filterForm');
let filterFormSecond = document.getElementById('filterFormSecond');
const btnUpdateFirst = document.getElementById('first-btn-update');
const btnUpdateSecond = document.getElementById('second-btn-update');

// Получение json с сервера
async function getResponse (file){
    const request = await fetch(file)
    if(request.ok){
       const response = await request.json()
       return response
    }else {
        console.error('Server is not response')
    }
};

// Отрисовка разметки

const makeMarkup = function (data) {
    if (typeof data === 'object' && data.data) {
        const markup = data.data.map((key) => {
            const newArr = Object.entries(key).map(([key, value]) => { return `<p class="contacts-key">${key}: </p><p class="contacts-key">${value}</p>`}).join('');
            const newArrItems = `<li class="contacts-item"><p class="contacts-key">${newArr}</li>`;
            return newArrItems;
        }).join('');
        return markup;
    } else {
        alert("Вихідні дані не є об'єктом або не містять властивість data");
    }
};

const makeMarkupUpdate = function (data, pointEntry) {
    const inputs = document.querySelectorAll(".input-v");
    if (pointEntry.classList.contains('contacts-list')) {
        for (let i = 0; i < 4; i += 1) {
            inputs[i].value = "";
        };
    } if (pointEntry.classList.contains('contacts-list-second')) {
        for (let i = 4; i > 3 && i < 8; i += 1) { 
            inputs[i].value = "";
        };
    }
    const markupUpdate = makeMarkup(data);
    pointEntry.innerHTML = '';
    pointEntry.insertAdjacentHTML('afterbegin', markupUpdate);
}

//Фильтр

const sortObj = function (data, pointEntry, event) {
    event.preventDefault();
    pointEntry.innerHTML = '';
    const methodFilter = event.target[0].value;
    const keyFilter = event.target[1].value;
    const valueFilter = event.target[2].value;
    const sortByFilter = event.target[3].value;
    let sortedNewData = {};
    if (methodFilter == "Include") {
        const newData = data.data.filter(obj => {
            if (typeof obj[keyFilter] == 'string') {
                if (obj[keyFilter] == valueFilter) {
                    return obj;
                }
            } else {
                const keyFilterStr = String(obj[keyFilter]);
                if (keyFilterStr == valueFilter) {
                    return obj;
                }
            };
        });
        const sortedData = newData.sort(function (a, b) {
            if (a[sortByFilter] > b[sortByFilter]) { 
                return 1;
            }
            if (a[sortByFilter] < b[sortByFilter]) { 
                return -1;
            }
            return 0;
        });
        sortedNewData.data = sortedData;
        const markup = makeMarkup(sortedNewData);
        pointEntry.insertAdjacentHTML('afterbegin', markup);
    } if (methodFilter == "Exclude") {
        const newData = data.data.filter(obj => {
            if (typeof obj[keyFilter] == 'string') {
                if (obj[keyFilter] !== valueFilter) {
                    return obj;
                }
            } else {
                const keyFilterStr = String(obj[keyFilter]);
                if (keyFilterStr !== valueFilter) {
                    return obj;
                }
            };
        });
        const sortedData = newData.sort(function (a, b) {
            if (a[sortByFilter] > b[sortByFilter]) { 
                return 1;
            }
            if (a[sortByFilter] < b[sortByFilter]) { 
                return -1;
            }
            return 0;
        });
        sortedNewData.data = sortedData;
        const markup = makeMarkup(sortedNewData);
        pointEntry.insertAdjacentHTML('afterbegin', markup);
    }
};

// Выполнение кода

const responseJson = getResponse(dataServer);
const responseJson2 = getResponse(dataServer2);

responseJson.then(
    data => {
        let markup = makeMarkup(data);
        pointEntry.insertAdjacentHTML('afterbegin', markup);
        filterForm.addEventListener("submit", sortObj.bind(null, data, pointEntry));
        btnUpdateFirst.addEventListener("click", makeMarkupUpdate.bind(null, data, pointEntry));
    }
).catch((reject) => {
    alert("reject:" + reject);
});

responseJson2.then(
    data => {
        let markup = makeMarkup(data);
        pointEntrySecond.insertAdjacentHTML('afterbegin', markup);
        filterFormSecond.addEventListener("submit", sortObj.bind(null, data, pointEntrySecond));
        btnUpdateSecond.addEventListener("click", makeMarkupUpdate.bind(null, data, pointEntrySecond));
    }
).catch((reject) => {
    alert("reject:" + reject);
});


//Создаю объект условий для фильтра (лишняя функция)

// const makeConditionsObj = function (event) {
//     let conditions = {
//         "condition": {}
//     };
//     const filterMethod = event.target[0].value;
//     const arrKeys = [event.target[1].value];
//     const arrValues = [event.target[2].value];
//     const arrSortBy = [event.target[3].value];
//     const arrObj = arrKeys.reduce((acc, n, i) => ({ ...acc, [n]: arrValues[i] }), {});
//     conditions.condition[filterMethod] = [arrObj];
//     conditions.condition.sort_by = [arrSortBy];
//     return conditions;
// };