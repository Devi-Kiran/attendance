import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
    const defaultMaterialTheme = createTheme();
    const [employers, setEmployers] = useState([]);
    const employersCollectionRef = collection(db, "employers");

    const findHoursOfWork = (loginTime, logoutTime) => {
        const [hours1, minutes1, seconds1] = loginTime.split(":").map(Number);
        const [hours2, minutes2, seconds2] = logoutTime.split(":").map(Number);

        let hourDiff = hours2 - hours1;
        let minuteDiff = minutes2 - minutes1;
        let secondDiff = seconds2 - seconds1;

        if (secondDiff < 0) {
            secondDiff += 60;
            minuteDiff--;
        }
        if (minuteDiff < 0) {
            minuteDiff += 60;
            hourDiff--;
        }
        if (hourDiff < 0) {
            hourDiff += 24;
        }

        return {
            hours: hourDiff,
            minutes: minuteDiff,
            seconds: secondDiff,
        };
    };

    const updateEmployerData = async (id, attendance) => {
        const employerDoc = doc(db, "employers", id);
        const date = new Date();

        const isPresent = attendance.find((data) => {
            return new Date(data.date).getTime() === date.setHours(0, 0, 0, 0);
        });

        if (!isPresent) {
            const loginData = {
                attendance: [
                    ...attendance,
                    {
                        date: date.toDateString(),
                        status: "present",
                        fullDay: false,
                        halfDay: false,
                        loginTime: date.toTimeString().split(" ")[0],
                        logoutTime: "",
                        hoursOfWork: "",
                    },
                ],
            };
            await updateDoc(employerDoc, loginData);
        } 
        else {
            function logoutData(fullDay,halfDay, hoursOfWork) {
                return attendance.map((data) => {
                    if (
                        new Date(data.date).getTime() === new Date(isPresent.date).getTime()
                    ) {
                        return {
                            ...data,
                            logoutTime: new Date().toTimeString().split(" ")[0],
                            halfDay,
                            fullDay,
                            hoursOfWork,
                        };
                    }
                    return data;
                });
            }

            const workedTime = findHoursOfWork(
                isPresent.loginTime,
                "02:08:00"
                // new Date().toTimeString().split(" ")[0]
            );

            const workedHours = `${workedTime.hours}.${(workedTime.minutes / 60) * 100}`;

            if (workedTime.hours >= 8) {
                console.log(logoutData(true,false, workedHours));
                await updateDoc(employerDoc, {attendance: logoutData(true,false, workedHours)});
            } else if (workedTime.hours >= 5 && workedTime.minutes >= 30) {
                console.log("uncompleted");
            } else if (workedTime.hours >= 4) {
                console.log("halfday");
            } else {
                console.log("nothing");
            }
        }
    };

    useEffect(() => {
        const getEmployers = async () => {
            const data = await getDocs(employersCollectionRef);
            setEmployers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getEmployers();
    }, []);

    const date = new Date();

    const [attendanceData, setAttendanceData] = useState([
        {
            date: new Date(2024, 3, 9),
            status: "present",
            halfDay: false,
            incompleteDay: false,
        },
        {
            date: new Date(2024, 3, 10),
            status: "present",
            halfDay: true,
            incompleteDay: false,
        },
        {
            date: new Date(2024, 3, 11),
            status: "present",
            halfDay: false,
            incompleteDay: true,
        },
        {
            date: new Date(2024, 3, 12),
            status: "absent",
            halfDay: false,
            incompleteDay: false,
        },
        {
            date: new Date(2024, 3, 13),
            status: "present",
            halfDay: false,
            incompleteDay: true,
        },
        {
            date: new Date(2024, 3, 15),
            status: "absent",
            halfDay: false,
            incompleteDay: false,
        },
        {
            date: new Date(new Date().setHours(0, 0, 0, 0)),
            status: "absent",
            halfDay: false,
            incompleteDay: false,
        },
    ]);

    const tileContent = ({ date, view }) => {
        const attendance = attendanceData.find(
            (item) => item.date.getTime() === date.getTime()
        );
        if (attendance) {
            return (
                <p style={{ textTransform: "capitalize" }}>
                {attendance.status} <br />
                {attendance.halfDay ? " (Half Day)" : ""}
                {attendance.incompleteDay ? " (Half Day)" : ""}
                </p>
            );
        }
        return null;
    };

    const tileClassName = ({ date }) => {
        const attendance = attendanceData.find((item) => {
            return item.date.getTime() === date.getTime();
        });

        if (date.getDay() === 6) {
            return "saturday";
        }

        if (attendance) {
            if (attendance.halfDay) {
                return "half-day";
            } else if (attendance.incompleteDay) {
                return "incomplete-day";
            } else if (attendance.status === "present") {
                return "present-day";
            } else if (attendance.status === "absent") {
                return "absent-day";
            }
        }
        return null;
    };

    const columns = [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "phone" },
        {
        title: "file",
        field: "buttons",
        render: (rowData) => (
            <>
            <Button
                onClick={() => updateEmployerData(rowData.id, rowData.attendance)}
                color="primary"
                variant="contained"
                style={{ textTransform: "none" }}
                size="small"
            >
                Attendance
            </Button>{" "}
            <Button
                onClick={() => console.log(rowData)}
                color="primary"
                variant="contained"
                style={{ textTransform: "none" }}
                size="small"
            >
                Show
            </Button>
            </>
        ),
        },
    ];

    return (
        <>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                columns={columns}
                title="Employee Data"
                data={employers}
                />
            </ThemeProvider>

            <Calendar tileClassName={tileClassName} tileContent={tileContent} />
        </>
    );
};

export default MyCalendar;
