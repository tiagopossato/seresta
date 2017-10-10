/**
 * Sensor Energy Save Algorithm
 * 
 * Algoritmo para economia de energia em sensores sem fio
 */

/** Calcula média móvel */
//Função que armazena os valores
//Programado desta forma para facilitar 
//a portabilidade para c/c++
//buffer com os valores para o cálculo
var storagedMax = 5;
var storageQtd = 0;
var storageData = []; // storageData[storagedMax]
//Classe que representa um valor
// representada por uma struct em c/c++
class Value {
    constructor() {
        this.v = 0;
        this.t = 0;
    }
};
var storage = function (newValue, timestamp) {
    value = new Value();
    value.v = newValue;
    value.t = timestamp;
    if (storageQtd < storagedMax) {
        storageData[storageQtd] = value
        storageQtd = storageQtd + 1;
    } else {
        for (var i = 0; i < storagedMax; i++) {
            if (i == storagedMax - 1) {
                storageData[i] = value;
            } else {
                storageData[i] = storageData[i + 1];
            }
        }
    }
    // console.log(storageData);
};

var mvAvgCalc = function (value, timestamp) {
    storage(value, timestamp);
    var sum = 0;
    for (var i = 0; i < storageQtd; i++) {
        sum = sum + storageData[i].v.v;
    }
    return sum / storageQtd;
};

/**
 * Fuzzifica Taxa de variacao
 * NÃO USADO
 */
var fuzzyRate = function (rate) {
    //verifica se é um número
    if (isNaN(rate)) {
        throw "The value must be a number";
    }
    //verifica se valor está nebuloso
    if (rate < 0 || rate > 1) {
        throw "The value must be between 0 and 1";
    }
    /** Calcula taxa baixa y^2 */
    //inverte valor    
    var rinv = interpolate(rate, 0, 1, 1, 0);
    var rb = rinv * rinv;

    /** Calcula taxa média (-(x^2)+x)*4 */
    var rm = (-(rate * rate) + rate) * 4;

    /** Calcula taxa alta x^2*/
    var ra = rate * rate;
    return { 'high': ra, 'medium': rm, 'low': rb };
};

/**
 * Fuzzifica média móvel conforme a pertinência
 * @param {*} avg 
 */
var fuzzyMvAvg = function (avg) {
    //verifica se é um número
    if (isNaN(avg)) {
        throw "The value must be a number";
    }
    //verifica se valor está nebuloso
    if (avg < 0 || avg > 1) {
        throw "The value must be between 0 and 1";
    }
    //calcula valor baixo
    var low = 0;
    if (avg < 0.75) {
        low = interpolate(avg, 0, 0.75, 1, 0);
    }

    //calcula valor médio
    var medium = 0;
    if (avg < 0.125) {
        medium = 0;
    }
    if (avg >= 0.125 && avg <= 0.875) {
        if (avg == 0.5) {
            medium = 1;
        }
        if (avg < 0.5) {
            medium = interpolate(avg, 0.125, 0.5, 0, 1);
        }
        if (avg > 0.5) {
            medium = interpolate(avg, 0.5, 0.875, 1, 0);
        }
    }
    if (avg > 0.875) {
        medium = 0;
    }

    //calcula valor alto
    var high = 0;
    if (avg > 0.25) {
        high = interpolate(avg, 0.25, 1, 1, 0);
    }

    return { 'high': high, 'medium': medium, 'low': low };
}

/**
 * Calula interpolação linear
 * 
 * @param {*} input 
 * @param {*} inMin 
 * @param {*} inMax 
 * @param {*} outMin 
 * @param {*} outMax 
 */
var interpolate = function (input, inMin, inMax, outMin, outMax) {
    //verifica se é um número
    if (isNaN(input) || isNaN(inMin) || isNaN(inMax) || isNaN(outMin) || isNaN(outMax)) {
        throw "The value must be a number";
    }
    if (input > inMax || input < inMin) {
        throw "'input' must be between 'inMax' and 'inMin'";
    }
    return (outMax - outMin) * (input - inMin) / (inMax - inMin) + outMin;
};

/** --------------- FUNCOES DE SIMULACAO COM NODEJS PARA TESTES ---------------*/
// var rawData;
// fs = require('fs');
// fs.readFile('dados.json', 'utf8', function (err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     rawData = JSON.parse(data).l;
//     for (var i = 0; i < 100; i++) {
//         var favg = mvAvgCalc(rawData[i], i);
//         var dif = Math.abs(rawData[i].v - favg);
//         if (dif > 1) dif = 1;
//         console.log(fuzzyMvAvg(dif));

//     }
// });