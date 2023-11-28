import Admin from "./pages/admin";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
