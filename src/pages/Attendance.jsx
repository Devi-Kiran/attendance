import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
    const defaultMaterialTheme = createTheme();
    const [employers, setEmployers] = useState([]);
    const employersCollectionRef = collection(db, "employers");

    const updateUser = async (id, attendance) => {
        const employerDoc = doc(db, "employers", id);
        const newFields = {attendance: [...attendance, {
            date: 'hello',
            status: 'hii',
            fullDay: true,
            halfDay: false,
            loginTime: 'hoo',
            logoutTime: 'namasthe',
            HourseOfWork: 'vanakkam',
        }]}

        await updateDoc(employerDoc, newFields);
    }

    useEffect(() => {
        const getEmployers = async () => {
            const data = await getDocs(employersCollectionRef);
            setEmployers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        }

        getEmployers();
    }, []);

//   const [attendanceData, setAttendanceData] = useState([
//     { date: new Date(2024, 3, 9), status: "present", halfDay: false, incompleteDay: false },
//     { date: new Date(2024, 3, 10), status: "present", halfDay: true, incompleteDay: false },
//     { date: new Date(2024, 3, 11), status: "present", halfDay: false, incompleteDay: true },
//     { date: new Date(2024, 3, 12), status: "absent", halfDay: false, incompleteDay: false },
//     { date: new Date(2024, 3, 13), status: "present", halfDay: false, incompleteDay: true },
//     { date: new Date(2024, 3, 15), status: "absent", halfDay: false, incompleteDay: false },
//   ]);

//   const tileContent = ({ date, view }) => {
//     const attendance = attendanceData.find(
//       (item) => item.date.getTime() === date.getTime()
//     );
//     if (attendance) {
//         return (
//             <p style={{textTransform: 'capitalize'}}>
//                 {attendance.status} <br/>
//                 {attendance.halfDay ? ' (Half Day)' : ''}
//                 {attendance.incompleteDay ? ' (Half Day)' : ''}
//             </p>
//         );
//     }
//     return null;
//   };

//   const tileClassName = ({ date }) => {
//     const attendance = attendanceData.find(
//       (item) => item.date.getTime() === date.getTime()
//     );

//     if (date.getDay() === 6) { 
//         return 'saturday';
//     }

//     if (attendance) {
//         if (attendance.halfDay) {
//             return 'half-day';
//         } else if(attendance.incompleteDay) {
//             return 'incomplete-day';
//         } else if (attendance.status === 'present') {
//             return 'present-day';
//         } else if (attendance.status === 'absent') {
//             return 'absent-day';
//         }
//     }
//     return null;
//   };

    const columns = [
        { title: "ID", field: "id", },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: 'phone' },
        {
            title: "file",
            field: "buttons",
            render: (rowData) => (
                <>
                    <Button
                        onClick={() => updateUser(rowData.id, rowData.attendance)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                    >
                        Attendance
                    </Button>
                    {" "}
                    <Button
                        onClick={() => console.log(rowData)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                    >
                        Show
                    </Button>
                </>
            ),
        }
    ];

    return (
        <div>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={columns}
                    title="Employee Data"
                    data={employers}  
                />
            </ThemeProvider>

            
            {/* <Calendar
                tileClassName={tileClassName} tileContent={tileContent}
            /> */}
        </div>
    );
};

export default MyCalendar;
