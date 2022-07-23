import './App.css';
import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import Header from './Components/Header';
function App() {
  return (
      <Router>
      <div className='App' style={{backgroundColor:"#14161a",color:"white",minHeight:"100vh"}}>
      <Header/>
        <Routes>
              <Route path="/" element={<Homepage/>} exact/>
              <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
      </div>
      </Router>
    
  );
}
// "homepage": "https://vinaymoolya.github.io/Crytpo_Tranalyzer/",
export default App;
