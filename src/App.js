import { Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/Aboute';
import Attendance from './pages/Attendance';


function App() {
  return (
    <div className="App">
      <div>
        <Link to='/'>home</Link>{" "}
        <Link to='/attendance'>attendance</Link>{" "}
        <Link to='/about'>about</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
