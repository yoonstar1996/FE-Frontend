import styles from "./Home.module.scss";

const datas = [
  { time: "오전 0시", icon: "달", tem: "온도" },
  { time: "오전 1시", icon: "해", tem: "온도" },
  { time: "오전 2시", icon: "구름", tem: "온도" },
];

const weekdaysDatas = [
  {
    icon: "구름",
    high: "22도",
    low: "14도",
    date: `${new Date().getMonth() + 1}월 ${String(
      new Date().getDate()
    ).padStart(2)}일`,
    day: "일요일",
  },
  {
    icon: "해",
    high: "17도",
    low: "9도",
    date: `${new Date().getMonth() + 1}월 ${String(
      new Date().getDate() + 1
    ).padStart(2)}일`,
    day: "월요일",
  },
  {
    icon: "해",
    high: "13도",
    low: "8도",
    date: `${new Date().getMonth() + 1}월 ${String(
      new Date().getDate() + 2
    ).padStart(2)}일`,
    day: "화요일",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <header className={styles.header}>
          <div>날씨 아이콘</div>
          <div className={styles.title}>Weather.io</div>
          <div>
            <input placeholder="검색할 지역 이름을 입력하세요." />
          </div>
        </header>
        <main className={styles.main}>
          <section className={styles.left}>
            <div className={styles.left__top}>
              <div className={styles.Today}>
                <div>Today</div>
                <div>오늘 현재 날씨를 조회하고 있습니다.</div>
                <div className={styles.flex}>
                  <div>해 아이콘</div>
                  <div>온도</div>
                </div>
                <div className={styles.flex}>
                  <div>달력 아이콘</div>
                  <div>{new Date().toLocaleDateString()}</div>
                </div>
                <div className={styles.flex}>
                  <div>위치 아이콘</div>
                  <div>현재 위치</div>
                </div>
              </div>
              <div className={styles.Hourly}>
                <div>Hourly</div>
                <div>오늘의 시간대별 날씨를 조회하고 있습니다.</div>
                <div className="시간대별날씨박스">
                  <div className={styles.flex}>
                    {datas.map((data) => (
                      <li key={data.time}>
                        <div>{data.time}</div>
                        <div>{data.icon}</div>
                        <div>{data.tem}</div>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.left__bottom}>
              <div>
                <div>Today's Highlights</div>
                <div>
                  오늘 날씨 중 주의깊게 살펴보아야 할 이벤트를 조회하고
                  있습니다.
                </div>
                <div className={styles.flex}>
                  <div className={styles.왼}>
                    <div className={styles.flex}>
                      <div>해양 및 조수 데이터</div>
                      <div>Marine and Sailing</div>
                    </div>
                    <div className={styles.flex}>
                      <div>파도 아이콘</div>
                      <div>
                        <div>1회 - 만조</div>
                        <div>05:48am</div>
                      </div>
                      <div>
                        <div>2회 - 만조</div>
                        <div>11:56am</div>
                      </div>
                      <div>
                        <div>3회 - 만조</div>
                        <div>18:14pm</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.오른}>
                    <div className={styles.flex}>
                      <div>일출/일몰</div>
                      <div>Sunrise & Sunset</div>
                    </div>
                    <div className={styles.flex}>
                      <div className={styles.flex}>
                        <div>해 아이콘</div>
                        <div>
                          <div>Sunrise</div>
                          <div>07:00AM</div>
                        </div>
                      </div>
                      <div className={styles.flex}>
                        <div>달 아이콘</div>
                        <div>
                          <div>Sunset</div>
                          <div>05:34PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.right}>
            <div className={styles.right__top}>
              <div className={styles.Map}>
                <div>지도 위치</div>
              </div>
            </div>
            <div className={styles.right__bottom}>
              <div>
                <div>
                  <div>7 Days</div>
                  <div>이번주 날씨를 조회하고 있습니다.</div>
                </div>
                <div>
                  {weekdaysDatas.map((data) => (
                    <li key={data.day} className={styles.listData}>
                      <div>{data.icon}</div>
                      <div className={styles.flex}>
                        <div>{data.high}</div>
                        <div>{data.low}</div>
                      </div>
                      <div className={styles.flex}>
                        <div>{data.date}</div>
                        <div>{data.day}</div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
