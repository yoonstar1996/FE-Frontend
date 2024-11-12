/** 콜백(Callback)
 * 함수는 하나의 데이터로써, 소괄호를 열고 닫지 않으면 하나의 함수 데이터이고,
 * 소괄호를 열고 닫아야지만, 함수를 실행한다.
 */
const a = () => {
  console.log("A");
};

const b = () => {
  console.log("B");
};

a(); // A
b(); // B

a(b); // b: 콜백, 콜백 함수라고 부른다. 함수가 실행될 때, 인자로 들어가는 또 다른 함수를 콜백이라고 한다.

const c = (callback) => {
  // callback은 함수 데이터이므로 소괄호를 열고 닫아서 실행시킬 수 있다.
  console.log("C");
  callback();
};

const d = () => {
  console.log("D");
};

c(d);

const sum = (a, b) => {
  setTimeout(() => {
    return a + b;
  }, 1000);
};

console.log(sum(1, 2)); // undefined

const sum2 = (a, b, c) => {
  setTimeout(() => {
    c(a + b);
  }, 1000);
};

sum2(1, 2, (value) => {
  console.log(value);
});
