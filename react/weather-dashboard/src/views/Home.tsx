import Header from "@/components/common/Header/Header";

export default function HomePage() {
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <main>
          <section className="왼쪽"></section>
          <section className="오른쪽"></section>
        </main>
      </div>
    </div>
  );
}
