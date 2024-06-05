import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import MainLayout from "../components/layouts/MainLayout";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const MyCalendar = ({ isFourPM, time }) => {
  const defaultMaterialTheme = createTheme();
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const employersCollectionRef = collection(db, "employers");

  function updateAbsentAttendance(data) {
    const currentDate = new Date().toDateString();

    data.forEach((obj) => {
      if (obj.hasOwnProperty("attendance")) {
        let currentDateExists = false;

        obj.attendance.forEach((entry) => {
          if (entry.date === currentDate) {
            currentDateExists = true;
          }
        });

        if (!currentDateExists) {
          const newEntry = {
            halfDay: false,
            hoursOfWork: "",
            logoutTime: "",
            uncompleteDay: false,
            status: "Absent",
            loginTime: "",
            date: currentDate,
            fullDay: false,
          };

          obj.attendance.push(newEntry);

          try {
            const employerDoc = doc(db, "employers", obj.id);
            async function xyz() {
              await updateDoc(employerDoc, {
                attendance: arrayUnion(newEntry),
              });
            }
            xyz();
            toast.success("Updated Absent Employers");
          } catch (error) {
            toast.error("something went wrong");
          }
        }
      }
    });
  }

  useEffect(() => {
    if (isFourPM) {
      updateAbsentAttendance(employers);
    }
  }, [isFourPM, employers]);

  const findHoursOfWork = (loginTime = "", logoutTime = "") => {
    const [hours1, minutes1, seconds1] = loginTime?.split(":").map(Number);
    const [hours2, minutes2, seconds2] = logoutTime?.split(":").map(Number);

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

    console.log(isPresent);

    if (!isPresent) {
      try {
        const loginData = {
          attendance: [
            ...attendance,
            {
              date: date.toDateString(),
              status: "present",
              fullDay: false,
              uncompleteDay: false,
              halfDay: false,
              loginTime: new Date().toTimeString()?.split(" ")[0],
              logoutTime: "",
              hoursOfWork: "",
            },
          ],
        };
        await updateDoc(employerDoc, loginData);
        toast.success("You have successfully logged in");
      } catch (e) {
        toast.error("something went wrong");
      }
    } else {
      function logoutData(
        fullDay,
        uncompleteDay,
        halfDay,
        hoursOfWork,
        status
      ) {
        return attendance.map((data) => {
          if (
            new Date(data.date).getTime() === new Date(isPresent.date).getTime()
          ) {
            return {
              ...data,
              logoutTime: new Date().toTimeString()?.split(" ")[0],
              fullDay,
              uncompleteDay,
              halfDay,
              hoursOfWork,
              status,
            };
          }
          return data;
        });
      }

      try {
        const workedTime = findHoursOfWork(
          isPresent.loginTime,
          new Date().toTimeString()?.split(" ")[0]
        );

        console.log(workedTime);

        const workedHours = `${workedTime.hours}.${
          (workedTime.minutes / 60) * 100
        }`;

        if (workedTime.hours >= 8) {
          await updateDoc(employerDoc, {
            attendance: logoutData(true, false, false, workedHours, "Present"),
          });
        } else if (workedTime.hours >= 5 && workedTime.minutes >= 30) {
          await updateDoc(employerDoc, {
            attendance: logoutData(false, true, false, workedHours, "Present"),
          });
        } else if (workedTime.hours >= 4) {
          await updateDoc(employerDoc, {
            attendance: logoutData(false, false, true, workedHours, "Present"),
          });
        } else {
          await updateDoc(employerDoc, {
            attendance: logoutData(false, false, false, "", "Absent"),
          });
        }

        toast.success("You have successfully logged out");
      } catch (e) {
        toast.error("something went wrong");
      }
    }
  };

  useEffect(() => {
    const getEmployers = async () => {
      try {
          const data = await getDocs(employersCollectionRef);
          setEmployers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
      } catch (e) {
        console.log(e.message)
      }
    };

    getEmployers();
  }, []);

  const columns = [
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
          <Link to={`${rowData.id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ textTransform: "none" }}
              size="small"
            >
              Show
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <MainLayout time={time}>
        {loading ? (
          <Loading />
        ) : (
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              columns={columns}
              title="Employers"
              data={employers}
            />
          </ThemeProvider>
        )}
      </MainLayout>
    </>
  );
};

export default MyCalendar;
