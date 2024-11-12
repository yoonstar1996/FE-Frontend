/** 형 변환(Type Conversion) */
const A = 1; // number
const B = "1"; // string

// 동등 연산자(자동 형 변환이 일어남)
console.log(A == B); // true

// 일치 연산자(타입 까지 비교함)
console.log(A === B); // false

const C = 0;
const D = false;
const E = true;
console.log(C == D); // true
console.log(C == E); // false

/** 참과 거짓(Truthy & Falsy)
 *
 * 숫자 0은 거짓에 해당한다.
 * null, undefined, false도 거짓에 해당한다.
 * NaN, ""(빈 문자열)도 거짓에 해당한다.
 */
const fruits = ["사과", "바나나", "포도", "수박", "딸기"];
const emptyArr = [];
if (fruits) {
  console.log("배열 안에 데이터가 있습니다.");
}

if (emptyArr.length) {
  console.log("배열 안에 데이터가 있습니다.");
} else {
  console.log("배열 안에 데이터가 없습니다.");
}
