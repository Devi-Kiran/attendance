import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/Aboute";
import Attendance from "./pages/Attendance";
import AddEmployer from "./pages/AddEmployer";
import EachAttendance from "./pages/EachAttendance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [time, setTime] = useState(new Date());
  const [isFourPM, setIsFourPM] = useState(false);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    if (time.getHours() >= 16 && time.getMinutes() >= 30 && !isFourPM) {
      setIsFourPM(true);
    }
  }, [time, isFourPM]);

  function tick() {
    const newTime = new Date();
    setTime(newTime);
  }

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/attendance"
          element={<Attendance time={time.toLocaleTimeString()} isFourPM={isFourPM} />}
        />
        <Route path="/attendance/:id" element={<EachAttendance />} />
        <Route path="/add-employer" element={<AddEmployer />} />
        
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
