// as HTMLInputElement will take care of the .value error by telling that it will have the .value 
var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
// ? strict mode tsc init: using the "!" is telling it will be a not null value, solves error of buttonElement line 9
var buttonElement = document.querySelector('button');
var numResults = [];
var textResults = [];
var add = function (num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
};
var printResult = function (resultObj) {
    console.log(resultObj.val);
};
buttonElement.addEventListener('click', function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    numResults.push(result);
    var stringResult = add(num1, num2);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});
// https://stackoverflow.com/questions/76195252/typescript-compiler-giving-error-redeclare-block-scoped-variable-but-it-is-not-r
// export {}
