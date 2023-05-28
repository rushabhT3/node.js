// as HTMLInputElement will take care of the .value error by telling that it will have the .value 
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button')!;

const add = (num1:number, num2:number) => num1 + num2;

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    console.log(result);
})

console.log(add(1, 6));

// https://stackoverflow.com/questions/76195252/typescript-compiler-giving-error-redeclare-block-scoped-variable-but-it-is-not-r
export {}

