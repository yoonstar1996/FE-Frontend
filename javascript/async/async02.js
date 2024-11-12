const a = (cb) => {
  setTimeout(() => {
    console.log(1);
    cb();
  }, 1000);
};

const b = () => console.log(2);

// a(() => b());

/** Promise */
const c = () => {
  // callback을 대신해서 매개변서 resolve를 callback이 실행되는 부분에서 대신해서 실행시켜준다.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3);
      resolve();
    }, 1000);
  });
};

const d = () => console.log(4);
// c().then(() => d());

/** Promise에서 만들어진 인스턴스에서는 then이라는 메서드를 이어서 (메서드)체이닝 형식으로 활용할 수 있다.
 * 그리고 화살표 함수에서는 return 키워드가 바로 나옴녀 중괄호와 return 키워드를생략할 수 있다.
 */

const e = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(5);
      resolve();
    }, 1000);
  });
};

const f = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(6);
      resolve();
    }, 1000);
  });
};

const g = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(7);
      resolve();
    }, 1000);
  });
};

const h = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(8);
      resolve();
    }, 1000);
  });
};

e().then(() => {
  f().then(() => {
    g().then(() => {
      h();
    });
  });
});

e()
  .then(() => {
    return f();
  })
  .then(() => {
    return g();
  })
  .then(() => {
    return h();
  });

e()
  .then(() => f())
  .then(() => g())
  .then(() => h());

//** Promise에서 resolve는 하나의 함수 데이터만 받으면 된다. */
e().then(f).then(g).then(h);
