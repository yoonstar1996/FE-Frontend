import { BrowserRouter, Routes, Route } from "react-router-dom";
// 우리가 만든 페이지 컴포넌트
import HomePage from "./views/Home";
import BookmarkPage from "./views/Bookmark";

// shardcn ui toast 컴포넌트 사용을 위한 호출
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search/:id" element={<HomePage />}></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
