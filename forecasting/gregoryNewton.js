// private final Double[] equacao = new Double[6];
// private int grau = 0;
// public Calcula(Double[] x, Double[] y, int grau, JTextArea jtaSaida) {
var calculaGregoryNewton = function (x, y) {
    var equacao = [];
    var grau = 5;
    // DecimalFormat formata = new DecimalFormat("#.###");
    // Double[] delta1 = new Double[5];
    var delta1 = [];
    // Double[] delta2 = new Double[4];
    var delta2 = [];
    // Double[] delta3 = new Double[3];
    var delta3 = [];
    // Double[] delta4 = new Double[2];
    var delta4 = [];
    // double delta5 = 0;
    var delta5 = [];
    // double z;
    var z = 0;
    // StringBuilder saida = new StringBuilder();

    var j = 1;

    for (var i = 0; i < grau; i++) {
        delta1[i] = y[j] - y[i];
        j++;
    }

    j = 1;

    for (var i = 0; i < grau - 1; i++) {
        delta2[i] = delta1[j] - delta1[i];
        j++;
    }

    j = 1;
    for (var i = 0; i < grau - 2; i++) {
        delta3[i] = delta2[j] - delta2[i];
        j++;
    }

    j = 1;
    for (var i = 0; i < grau - 3; i++) {
        delta4[i] = delta3[j] - delta3[i];
        j++;
    }

    j = 1;
    for (var i = 0; i < grau - 4; i++) {
        delta5 = delta4[j] - delta4[i];
        j++;
    }

    if (y[0] < 0.0000000000001) {
        equacao[0] = 0.0;
    } else {
        equacao[0] = y[0];
    }

    equacao[1] = delta1[0]
        - delta2[0] / 2 //z
        + 2 * delta3[0] / 6 //z
        - 6 * delta4[0] / 24 //z
        + 24 * delta5 / 120; //z

    if (Math.abs(equacao[1]) < 0.00000000001) {
        equacao[1] = 0.0;
    }

    equacao[2] = delta2[0] / 2 //z²
        - 3 * delta3[0] / 6 //z²
        + 11 * delta4[0] / 24 //z²
        - 50 * delta5 / 120; //z²

    if (Math.abs(equacao[2]) < 0.00000000001) {
        equacao[2] = 0.0;
    }

    equacao[3] = delta3[0] / 6 //z³
        - 6 * delta4[0] / 24 //z³
        + 35 * delta5 / 120; //z³

    if (Math.abs(equacao[3]) < 0.00000000001) {
        equacao[3] = 0.0;
    }

    equacao[4] = delta4[0] / 24 //z⁴
        - 10 * delta5 / 120; //z⁴

    if (Math.abs(equacao[4]) < 0.00000000001) {
        equacao[4] = 0.0;
    }

    equacao[5] = delta5 / 120; //z⁵

    if (Math.abs(equacao[5]) < 0.00000000001) {
        equacao[5] = 0.0;
    }

    //console.log("Equação: \n");
    if (grau > 4) {
        if (equacao[5] != 0.0) {
            //console.log(equacao[5]);
            //console.log(" z^5\n");
        }
    } else {
        equacao[5] = 0.0;
    }

    if (grau > 3) {
        if (equacao[4] != 0.0) {
            if (equacao[4] >= 0.0) {
                //console.log("+");
            }
            //console.log(equacao[4]);
            //console.log(" z^4\n");
        }
    } else {
        equacao[4] = 0.0;
    }

    if (grau > 2) {
        if (equacao[3] != 0.0) {
            if (equacao[3] >= 0.0) {
                //console.log("+");
            }
            //console.log(equacao[3]);
            //console.log(" z^3\n");
        }
    } else {
        equacao[3] = 0.0;
    }

    if (grau > 1) {
        if (equacao[2] != 0.0) {
            if (equacao[2] >= 0.0) {
                //console.log("+");
            }
            //console.log(equacao[2]);
            //console.log(" z^2\n");
        }
    } else {
        equacao[2] = 0.0;
    }

    if (grau > 0) {
        if (equacao[1] != 0.0) {
            if (equacao[1] >= 0.0) {
                //console.log("+");
            }
            //console.log(equacao[1]);
            //console.log(" z\n");
        }
    } else {
        equacao[1] = 0.0;
    }

    if (equacao[0] != 0.0) {
        if (equacao[0] != 0.0) {
            if (equacao[0] >= 0.0) {
                //console.log("+");
            }
            //console.log(equacao[0]);
        }
    }

    //console.log('\n');
    // jtaSaida.append(saida.toString());

    //calcula grau
    //var grauFinal;
    // grauFinal = grau;
    // for (var i = grau; i >= 0; i--) {
    //     if (equacao[i] != 0.0) {
    //         break;
    //     }
    //     grauFinal--;
    // }
    return equacao;
}

/**
 * Calcula função utilizando método de Briot-Rufini
 *
 * @param eq
 * @param valor
 * @param grau
 * @return resultado
 */
var calculaFuncao = function (eq, x, valor) {
    var vbf = (valor - x[0]) / (x[1] - x[0]);
    grau = 5;
    var res;
    res = eq[grau];
    for (var i = (grau - 1); i >= 0; i--) {
        res = eq[i] + (res * vbf);
    }
    return res;
}


x = [0, 1, 2, 3, 4, 5];
y = [18.23, 18.32, 18.27, 18.28, 18.32, 18.3];

var equacao = calculaGregoryNewton(x, y);
// console.log(equacao);
console.log(calculaFuncao(equacao, x, 9));