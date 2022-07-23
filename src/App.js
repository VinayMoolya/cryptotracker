import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import Header from "./Components/Header";
function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route
            path="https://vinaymoolya.github.io/cryptotracker"
            element={<Homepage />}
            exact
          />
          <Route
            path="https://vinaymoolya.github.io/cryptotracker/coins/:id"
            element={<CoinPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
