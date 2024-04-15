import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([
    { date: new Date(2024, 3, 10), status: "present", halfDay: true },
    { date: new Date(2024, 3, 11), status: "present", halfDay: false },
    { date: new Date(2024, 3, 12), status: "absent", halfDay: false},
  ]);

  const tileContent = ({ date, view }) => {
    const attendance = attendanceData.find(
      (item) => item.date.getTime() === date.getTime()
    );
    if (attendance) {
        return (
            <p style={{textTransform: 'capitalize'}}>
                {attendance.status} <br/>
                {attendance.halfDay ? ' (Half Day)' : ''}
            </p>
        );
    }
    return null;
  };

  const tileClassName = ({ date }) => {
    const attendance = attendanceData.find(
      (item) => item.date.getTime() === date.getTime()
    );

    if (date.getDay() === 6) { 
        return 'saturday';
    }

    if (attendance) {
        if (attendance.halfDay) {
            return 'half-day';
        } else if (attendance.status === 'present') {
            return 'present-day';
        } else if (attendance.status === 'absent') {
            return 'absent-day';
        }
    }
    return null;
  };

  return (
    <div>
      <Calendar
        tileClassName={tileClassName} tileContent={tileContent}
      />
    </div>
  );
};

export default MyCalendar;
