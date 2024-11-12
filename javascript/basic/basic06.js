/** 산술 연산자 */
console.log(10 + 20); // 30
console.log(20 - 10); // 10
console.log(10 * 20); // 200
console.log(20 / 10); // 2

/** 나머지 연산자를 통해 짝수/홀수를 구분지을 수 있다. */
console.log(20 % 2); // 0

function isEven(number) {
  return number % 2 === 0;
}

console.log(isEven(18)); // true
console.log(isEven(17)); // false

// const a = 10;
// a = a + 10;
let b = 10;
b += 10; // b = b + 10; 과 같은 식

/** 증감 연산자(Increment & Decrement) */
let c = 30;
console.log("c++: ", c++); // 30
console.log("c: ", c); // 31

let d = 30;
console.log("++d: ", ++d); // 31
console.log("d: ", d); // 31

let e = 30;
console.log("e--: ", e--); // 30
console.log("e: ", e); // 29

let f = 30;
console.log("--f: ", --f); // 29
console.log("f: ", f); // 29
