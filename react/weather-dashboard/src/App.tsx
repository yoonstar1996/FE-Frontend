import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./views/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
