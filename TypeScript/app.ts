// as HTMLInputElement will take care of the .value error by telling that it will have the .value 
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// ? strict mode tsc init: using the "!" is telling it will be a not null value, solves error of buttonElement line 9
const buttonElement = document.querySelector('button')!;

const numResults: Array<number> = [];
const textResults: string[] = [];

// TS feature: to combine the types 
type NumOrString = number | string;
type Result = {val: number, timestamp: Date}

interface ResultObj {
    val: number;
    timestamp: Date;
}

const add = (num1:NumOrString, num2:NumOrString) =>{
    if (typeof num1 === 'number' && typeof num2 === 'number'){
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string'){
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
};

const printResult = (resultObj: ResultObj) => {
    console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;

    const result = add(+num1, +num2);
    numResults.push(result as number);

    const stringResult = add(num1, num2);
    textResults.push(stringResult as string);

    printResult({val: result as number, timestamp: new Date()});

    console.log(numResults, textResults);
})

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
    const success = true;
    if (success) {
      resolve('It worked!');
    } else {
      reject('Not worked!');
    }
    }, 1000);
})

myPromise.then((result) => {
    console.log(result.split('w'));
})