import React, { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";

function About() {
  function fillMissingDates(data, date) {
    const lastUpdatedDate = new Date(date);
    lastUpdatedDate.setDate(lastUpdatedDate.getDate() + 1);
    const currentDate = new Date();
    const newData = [];

    if (date) {
      for (
        let date = new Date(lastUpdatedDate);
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString();
        const existingEntry = data.find((entry) => entry.date === dateString);

        // If no entry exists for the current date, add an Absent entry
        if (!existingEntry) {
          const newEntry = {
            halfDay: false,
            hoursOfWork: "",
            logoutTime: "",
            uncompleteDay: false,
            status: "Absent",
            loginTime: "",
            date: dateString,
            fullDay: false,
          };
          newData.push(newEntry);
        } else {
          newData.push(existingEntry);
        }
      }
    }

    console.log(newData);

    return [...data, ...newData];
  }

  // Example usage
  const data = [
    {
      logoutTime: "15:39:09",
      loginTime: "15:38:12",
      date: "2024-06-01T18:30:00.000Z",
      status: "Present",
      uncompleteDay: false,
      fullDay: true,
      hoursOfWork: "",
      halfDay: false,
    },
  ];

  const lastUpdatedAttendanceDate = data[data.length - 1]?.date
    ? new Date(data[data.length - 1]?.date).toISOString()
    : false;

  const updatedData = fillMissingDates(data, lastUpdatedAttendanceDate);

  console.log(updatedData);

  return (
    <>
      <MainLayout>hello world</MainLayout>
    </>
  );
}

export default About;
