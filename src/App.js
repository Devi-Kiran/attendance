import { Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/Aboute';
import Attendance from './pages/Attendance';
import Photo from './pages/Photo';
import AddEmployer from './pages/AddEmployer';
import EachAttendance from './pages/EachAttendance';


function App() {
  return (
    <div className="App">
      <div>
        <Link to='/'>home</Link>{" "}
        <Link to='/attendance'>attendance</Link>{" "}
        <Link to='/add-employer'>Add</Link>{" "}
        <Link to='/about'>about</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/attendance/:id" element={<EachAttendance/>} />
        <Route path="/add-employer" element={<AddEmployer/>} />
        <Route path="/photo" element={<Photo/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
