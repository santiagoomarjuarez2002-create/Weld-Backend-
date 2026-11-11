const num1: number=5;
const num2: number=10;
const num3: number=20;

function calcularPromedio(num1:number, num2:number, num3:number): number {
    return (num1 + num2 + num3) / arguments.length;
}

console.log(calcularPromedio(num1, num2, num3));

export default class Ejercicios {}
