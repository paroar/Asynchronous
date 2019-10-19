function promiseAdd(x, y) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x + y);
        }, 1000);
    });
}

function promiseSumListRecursive(xs, acum) {
    if (xs.length === 0) {
        return acum;
    }
    return promiseSumListRecursive(xs.slice(0,xs.length-1), acum.then(r => promiseAdd(xs[xs.length-1], r)));
}

function promiseSumListIterative(xs) {
    let acum = Promise.resolve(0);
    for (let i = 0; i < xs.length; i++) {
        acum = acum.then(r => promiseAdd(xs[i], r));
    }
    return acum;
}

function promiseSumListReduce(xs) {
    return xs.reduce((acum, x) => acum.then(r => promiseAdd(r, x)), Promise.resolve(0));
}

promiseSumListRecursive([1, 2, 3, 4], Promise.resolve(0))
    .then(c => console.log(c));

promiseSumListIterative([1, 2, 3, 4])
    .then(c => console.log(c));

promiseSumListReduce([1, 2, 3, 4])
    .then(c => console.log(c));


//PROMISEMAP
function promiseInc(x) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x + 1);
        }, 50);
    });
}

function promiseMap(f, xs) {
    let ys = Promise.resolve([]);
    for (let i = 0; i < xs.length; i++) {
        ys = ys.then(r => f(xs[i]).then(s => r.concat(s)))
    }
    return ys;
}

promiseMap(promiseInc, [1, 2, 3, 4])
    .then(c => console.log(c));
