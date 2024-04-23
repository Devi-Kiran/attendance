import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Calendar from "react-calendar";
import MainLayout from "../components/layouts/MainLayout";
import Loading from "../components/Loading";

function EachAttendance() {
  const { id } = useParams();
  const employersCollectionRef = collection(db, "employers");
  const [employer, setEmployer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployer = async () => {
      try {
        const data = await getDocs(employersCollectionRef);
        const employers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEmployer(() => {
          return employers.find((employer) => {
            return employer.id === id;
          });
        });
        setLoading(false)
      } catch (e) {
        console.log(e.message);
      }
    };

    getEmployer();
  }, []);

  const attendanceData = employer?.attendance?.map((attendance) => {
    return {
      ...attendance,
      date: new Date(attendance.date),
    };
  });

  const tileClassName = ({ date, view }) => {
    const attendance = attendanceData?.find(
      (item) => item.date.getTime() === date.getTime()
    );

    if (date.getDay() === 6) {
      return "saturday";
    }

    if (attendance) {
      if (attendance.halfDay) {
        return "half-day";
      } else if (attendance.uncompleteDay) {
        return "incomplete-day";
      } else if (attendance.status === "Present") {
        return "present-day";
      } else if (attendance.status === "Absent") {
        return "absent-day";
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    const attendance = attendanceData?.find(
      (item) => item.date.getTime() === date.getTime()
    );
    if (attendance) {
      return (
        <p style={{ textTransform: "capitalize" }}>
          {attendance.status} <br />
          {attendance.halfDay ? " (Half Day)" : ""}
          {attendance.uncompleteDay ? " (Inc Day)" : ""}
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <MainLayout>
        {loading ? <Loading/> : (
          <>
            <div class="rounded-md bg-indigo-600 text-white font-semibold mb-4">
              <div class="border-b border-gray-900/10 p-2">
                <div class="grid gap-x-6 gap-y-8 grid-cols-12">
                  <div class="sm:col-span-2 md:col-span-3 sm:col-start-1">
                    Employer Name: {employer.name}
                  </div>
    
                  <div class="sm:col-span-2 md:col-span-3">
                    Email: {employer.email} <br />
                  </div>
    
                  <div class="sm:col-span-2 md:col-span-3">
                    Phone: {employer.phone}
                  </div>
    
                  <div class="sm:col-span-2 md:col-span-3">
                    Salary P/A: {employer.salaryPerAnnum}
                  </div>
                </div>
              </div>
            </div>
    
            <Calendar
              tileContent={tileContent}
              tileClassName={tileClassName}
              onClickDay={(value, event) => console.log(value, event)}
            />
          </>
        )}
      </MainLayout>
    </>
  );
}

export default EachAttendance;
