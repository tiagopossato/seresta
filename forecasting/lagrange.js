// https://youtu.be/9LJOlkyedik?t=8m33s
// https://github.com/jerson/MetodosNumericosParaIng/blob/master/src/metodos/Lagrange.java
/**
 * At least two points are needed to interpolate something.
 * @class Lagrange polynomial interpolation.
 * The computed interpolation polynomial will be reffered to as L(x).
 * @example
 * var l = new Lagrange(0, 0, 1, 1);
 * var index = l.addPoint(0.5, 0.8);
 * console.log(l.valueOf(0.1));
 * 
 * var l = new Lagrange(0, 18.23, 1, 18.32);
 * l.addPoint(2, 18.27);
 * l.addPoint(3, 18.28);
 * l.addPoint(4, 18.32);
 * l.addPoint(5, 18.3);
 * x = [0, 1, 2, 3, 4, 5];
 * y = [18.23, 18.32, 18.27, 18.28, 18.32, 18.3];
 * l.changePoint(index, 0.5, 0.1);
 * console.log(l.valueOf(0.1));
 */
var Lagrange = function (x1, y1, x2, y2) {

    this.xs = [x1, x2];
    this.ys = [y1, y2];
    this.ws = [];
    this._updateWeights();
}

/**
 * Adds a new point to the polynomial. L(x) = y
 * @return {Number} The index of the added point. Used for changing the point. See changePoint.
 */
Lagrange.prototype.addPoint = function (x, y) {
    this.xs.push(x);
    this.ys.push(y);
    this._updateWeights();
    return this.xs.length - 1;
}

/**
 * Changes a previously added point.
 */
Lagrange.prototype.changePoint = function (index, x, y) {
    this.xs[index] = x;
    this.ys[index] = y;
    this._updateWeights();
}

/**
 * Recalculate barycentric weights.
 */
Lagrange.prototype._updateWeights = function () {
    var k = this.xs.length;
    var w;

    for (var j = 0; j < k; ++j) {
        w = 1;
        for (var i = 0; i < k; ++i) {
            if (i != j) {
                w *= this.xs[j] - this.xs[i];
            }
        }
        this.ws[j] = 1 / w;
    }
}

/**
 * Calculate L(x)
 */
Lagrange.prototype.valueOf = function (x) {
    var a = 0;
    var b = 0;
    var c = 0;

    for (var j = 0; j < this.xs.length; ++j) {
        if (x != this.xs[j]) {
            a = this.ws[j] / (x - this.xs[j]);
            b += a * this.ys[j];
            c += a;
        } else {
            return this.ys[j];
        }
    }

    return b / c;
}


var l = new Lagrange(0, 18.23, 1, 18.32);
l.addPoint(2, 18.27);
l.addPoint(4, 18.28);
l.addPoint(6, 18.32);
l.addPoint(8, 18.3);

console.log(l.valueOf(9));