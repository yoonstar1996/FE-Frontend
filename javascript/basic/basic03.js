/** 참조형 데이터 타입 */

/** 배열 */
const fruits = new Array("사과", "바나나", "체리", "멜론", "수박", "딸기");
console.log(fruits); // ['사과', '바나나', '체리', '멜론', '수박', '딸기']

/** 배열 리터럴
 * 배열을 만드는 방식으로 대괄호([])라는 기호를 통해 만들었는데,
 * 이것을 리터럴 방식으로 만들었다고 한다.
 */
const animals = ["호랑이", "사자", "코끼리", "원숭이", "악어"];
console.log(animals); // ['호랑이', '사자', '코끼리', '원숭이', '악어']
console.log(animals[1]); // 사자
console.log(animals.length); // 5
console.log(animals[animals.length - 1]); // 악어
console.log(animals[0]); // 호랑이

/** 객체
 * key-value 형태로 조회가 된다.
 * key는 속성 혹은 프로퍼티(property)라고도 하며, value는 값이라고 부르기도 한다.
 */
const user = new Object(); // 생성자 함수를 통해 객체를 생성
user.name = "Yoonstar";
user.age = 29;
user.job = "FE Developer";
console.log(user); // {name: 'Yoonstar', age: 29, job: 'FE Developer'}

/** 객체 리터럴
 * 객체를 만드는 방식으로 중괄호({})라는 기호를 통해 만들었는데,
 * 이것을 리터럴 방식으로 만들었다고 한다.
 *
 * 객체 데이터에서의 key는 고유하며, 순서는 중요하지 않다.
 * 단, 동일한 키 값일 경우, 나중에 작성된 값으로 덮어써진다.
 */
const member = {
  name: "Yoonstar",
  age: 29,
  job: "FE Developer",
};
console.log(member); // {name: 'Yoonstar', age: 29, job: 'FE Developer'}
console.log(member["job"]); //FE Developer(대괄호 표기법)

const userA = {
  name: "유저 A",
  age: 25,
  job: "student",
};

const userB = {
  name: "유저 B",
  age: 23,
  brother: userA,
};
console.log(userB.brother); // {name: '유저 A', age: 25, job: 'student'}

const family = [userA, userB];
console.log(family); // [{name: '유저 A', age: 25, job: 'student'}, {name: '유저 B', age: 23, brother: {name: '유저 A', age: 25, job: 'student'}}]
