/** 원시형 데이터 타입 */

/** 문자열, String */
const str1 = "Hello, World!";
const str2 = "World!";
const str3 = `Hello, ${str2}`;
console.log(str3); // Hello, World!

/** 숫자, Number
 * 주의할 점
 * 숫자 데이터와 다른 타입의 값을 연산할 경우 -> 2-1로 가기
 */
const num1 = 123;
const num2 = -123;
const num3 = -123.5678;
const pi = 3.14;
console.log(num3 + undefined); // 2-1: 출력 값이 NaN(Not a Number)이 나온다.
console.log(typeof (num3 + undefined)); // number
console.log(typeof pi); // number

/** NaN: Not a Number의 약자.
 * 데이터 타입 자체는 숫자 데이터이지만, 특정한 숫자 값으로 표현할 수 없기 때문에 NaN으로 표시하여 출력, 반환한다.
 * 따라서 NaN의 값이 나왔다는 것은 숫자 연산에 숫자가 아닌 다른 값이 포함되어있을 가능성이 있다는 것을 의미한다.
 */
const a = 0.1;
const b = 0.2;
console.log(a + b); // 0.30000000000000004
console.log(typeof (a + b).toFixed(1)); // string
console.log(typeof Number((a + b).toFixed(1))); // number -> 타입 형 변환
console.log(Number((a + b).toFixed(1))); // 0.3

/** Boolean
 * true, false라는 두 가지 값만 사용하는 논리 데이터
 * true: 참
 * false: 거짓
 */
const truthy = true;
const falsy = false;

if (truthy) {
  console.log("조건식이 참이다.");
} else {
  console.log("조건식이 거짓이다.");
}

/** null, undefined
 * null: 값이 비어있다. 존재하지 않는다.를 명시적으로 표현한 것이다.
 * 의도적으로 변수를 비우거나, 특정 상황에서 값이 없음을 나타내기 위해 사용된다.
 *
 * undefined: 변수가 선언되었지만, 값이 할당되지 않았음을 의미한다.
 * 함수가 값을 반환하지 않거나, 객체에서 존재하지 않는 속성에 접근했을 때도 undefined를 반환한다.
 */
let value1 = null; // 개발자의 의도가 있다.
console.log(value1, typeof value1); // null 'object'

setTimeout(() => {
  value1 = 30;
  console.log(value1); // 30
}, 1000);

let value2;
console.log(value2, typeof value2); // undefined 'undefined'

const user = {
  // key - value
  name: "Yoonstar",
  age: 29,
};
console.log(user.name); // Yoonstar
console.log(user.age); // 29
console.log(user.email); // undefined
