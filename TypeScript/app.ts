// as HTMLInputElement will take care of the .value error by telling that it will have the .value 
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// ? strict mode tsc init: using the "!" is telling it will be a not null value, solves error of buttonElement line 9
const buttonElement = document.querySelector('button')!;

const add = (num1:number | string, num2:number | string) =>{
    if (typeof num1 === 'number' && typeof num2 === 'number'){
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string'){
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
};

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2);
    console.log(result);
    console.log(stringResult);
    // console.log(add(true, false));

})

console.log(add(1, 6));

// https://stackoverflow.com/questions/76195252/typescript-compiler-giving-error-redeclare-block-scoped-variable-but-it-is-not-r
export {}

