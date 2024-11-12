/** resolve, reject 그리고 에러 핸들링
 * 정상적으로 로직이 동작하게 되면, 두 번째 인수 부분의 콜백이 실행되는 것이고
 * 정상적으로 로직이 동작하지 않으면, 세 번째 인수 부분의 콜백이 실행되는 구조이다.
 */
const delayAdd = (index, cb, err) => {
  setTimeout(() => {
    if (index > 10) {
      err(`${index}는 10보다 클 수 없습니다.`);
      return;
    }
    console.log("index: ", index);
    cb(index + 1);
  }, 1000);
};
// delayAdd(
//   4,
//   (res) => console.log(res),
//   (err) => console.log(err)
// );

// delayAdd(
//   13,
//   (res) => console.log(res),
//   (err) => console.log(err)
// );

const newDelayAdd = (idx) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idx > 10) {
        reject(`${idx}는 10보다 클 수 없습니다.`);
        return;
      }
      console.log("idx: ", idx);
      resolve(idx + 1);
    }, 1000);
  });
};
// newDelayAdd(4);

/** Promise 인스턴스를 반환하기 때문에 then 메서드를 사용할 수 있다.
 * finally메서드나 구문 같은 경우 비동기 코드 내부의 resolve, reject가 실행되는 것과 상관없이
 * 항상 실행되는 구조다.
 */
// newDelayAdd(13)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("done!"));

const wrap = async () => {
  try {
    const res = await newDelayAdd(9);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("끝!");
  }
};
wrap();
