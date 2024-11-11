/** 함수
 * 1. 함수 선언문(Declaration)
 * 2. 함수 표현식(Expression)
 */

/** 1. 함수 선언문(Declaration)
 * 예) function 함수이름() {}
 */

/** 2. 함수 표현식(Expression)
 * 예) const 함수이름 = function() {}
 */

/** 함수 호이스팅(Hoisting)
 * 자바스크립트에서 함수 호이스팅(Function Hoisting)은 함수 선언이 해당 함수의 호출보다 먼저 평가되는 개념이다.
 * 즉, 자바스크립트 엔진은 함수 선언을 코드의 실행 전에 '끌어 올려서' 처리하기 때문에,
 * 함수가 선언되기 전에 호출해도 에러가 발생하지 않는다.
 *
 * 따라서, 하단의 hello() 함수 호출의 코드가 함수 선언 이전에 작성되어도 작동하는 것이 바로 이 이유때문.
 *
 * 단, 함수 호이스팅 현상은 '함수 선언문'에서만 발생하고, 함수 표현식(문)에서는 발생하지 않는다.
 */

hello(); // hello 함수 호출
fn(); // Uncaught ReferenceError: Cannot access 'fn' before initialization

function hello() {
  console.log("hello 함수 호출");
}

const fn = function () {
  console.log("fn함수 호출");
};
