// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AIGenerate from "./aigenerate/AIGenerate";
import Books from "./books/Books";
import BookR from "./books/bookr";
import Login from "./components/Login";   // <-- import Login

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-generate" element={<AIGenerate />} />
      <Route path="/books" element={<Books />} />
      <Route path="/bookr" element={<BookR />} />
      <Route path="/login" element={<Login />} />   {/* <-- Login route */}
    </Routes>
  );
}

export default App;
