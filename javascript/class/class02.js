/** 파스칼 케이스로 함수를 만들어 준다. */
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const user = new User("star", "Yoon");
const user2 = new User("경민", "윤");

/** 객체 리터럴 방식을 통해서 만든 객체나, 함수 내부에서 this라는 키워드로 각각의 속성을 만들고
 * new라는 키워드를 함께 호출해서 생성하는 객체 데이터는 같다고 볼 수 있다.
 *
 * 그러나 생성자 함수의 장점:
 * getFullName이라는 메서드를 보다 효율적으로 사용하기 위함이다.
 *
 * prototype을 통해 일반 함수를 할당해주면 되는데, 주의할 점은 여기서 화살표 함수를 작성하면 안된다.
 * 그러한 이유로, this라는 키워드의 정의가 달라지기 때문에 -> function/fn07.js 참조
 */

User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(user);
console.log(user2);
console.log(user.getFullName());
console.log(user2.getFullName());
