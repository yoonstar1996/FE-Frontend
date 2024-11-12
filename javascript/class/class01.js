/** prototype */
// const fruits = ["사과", "바나나", "체리"];
const fruits = new Array("사과", "바나나", "체리");

console.log(fruits);
console.log(fruits.length);
console.log(fruits.includes("바나나"));
console.log(fruits.includes("오렌지"));

/** 프로토타입
 * 아래 코드는 getName이라는 함수를 새롭게 만든것
 */
Array.prototype.getName = function () {
  console.log(this);
};

fruits.getName();

const newArr = [];
newArr.getName();

/** 정리하면, 프로토타입이라는 것은 new 키워드를 통해서 만든 생성자 함수에서 반환된 결과이다.
 * 여기서 fruits는 배열 데이터 or 인스턴스라고 일컫는다.
 * 이렇게 인스턴스에서 쓸 수 있는 별도의 속성이나 메서드를 등록하는 객체
 *
 * 우리가 원시 타입, 참조 타입들도 마찬가지로 다양하나 데이터들은 생성자 함수를 통해서 반한된 결과이고,
 * 우리가 그동안 생성자 함수를 사용하지 않고, 각각의 데이터를 만든 것은 더 쉽게 만들 수 있게 각각의 리터럴 방식으로 만들었을 뿐이다.
 */

const user = {
  firstName: "star",
  lastName: "Yoon",
  /**
   * 객체 데이터 내부에서 일반 함수를 통해 메서드를 만들게 되면 this라는 키워드를 통해 접근할 수 있다.
   * 또한 객체 데이터 내부에 있는 속성에서 function 키워드를 사용하는 일반함수를 할당한다면
   * 속성 뒤에 있는 콜론(;) 기호와 function 키워드를 생략할 수 있다.
   */
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};
/** 객체 데이터의 메서드를 일반 함수로 만들면, 일반 함수에서의 this는 함수가 호출되는 곳에서 정의된다.
 * 즉, user가 this가 된다.
 */
console.log(user.getFullName());

const user2 = {
  firstName: "경민",
  lastName: "윤",
};

/** 만약, user2 객체 데이터에서도 fullName을 반환하는 메서드를 만들어야 한다면 어떻게 할 수 있을까?
 * 1. getFullName을 복사해서 user2 내부에 똑같이 만드는 방법 -> 똑같은 로직을 가지고 있는 함수를 2번 만들어야 한다.(비효율적)
 * 2. user.getFullName.call(user2) -> 코드의 가독성이 떨어지고, 메서드를 빌려쓰는 구조에서 본래의 객체도 참조해야하고 따라서 불편하다.
 * 3. 따라서 prototype을 활용하는 것이 가장 좋다.
 */
console.log(user.getFullName.call(user2));
