/** 화살표 함수
 * function 키워드를 사용하지 않는다.
 * return 키워드로 로직이 시작하는 경우에는, 중괄호와 return 키워드를 제거하여 사용할 수 있다.
 * 매개변수를 가질 수 있는데, 매개변수가 단 한 개만 있다면, 매개변수를 감싸고 있는 소괄호를 생략할 수 있다.
 */
function sum(a, b) {
  return a + b;
}

const sum1 = (a, b) => {
  return a + b;
};

const sum2 = (a, b) => a + b;

const b = () => {
  return { value: 1 }; // 중괄호와 return 키워드 생략 불가능
};

const c = () => {
  value: 1;
}; // b의 중괄호와 return 키워드를 생략하면 마치 함수의 블록처럼 보이기 때문에, 자바스크립트가 문법적으로 이해할 수 있는 코드가 아니다.

const d = () => ({ value: 1 }); // 객체 데이터를 소괄호로 묶어서 표현한다.
