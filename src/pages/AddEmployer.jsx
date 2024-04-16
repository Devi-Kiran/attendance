import React, {useState} from 'react';
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function AddEmployer() {
    const [employerDetails, setEmployersDetails] = useState({
        name: '',
        salaryPerAnnum: '',
        email: '',
        phone: '',
        attendanceCode: '',
        attendance: []
    });

    const employersCollectionRef = collection(db, "employers");



    const createEmployer = async () => {
        await addDoc(employersCollectionRef, {...employerDetails});
    }

    return (
        <>
            <input type="text" value={employerDetails.name} onChange={(e) => setEmployersDetails(prev => ({...prev, name: e.target.value}))} placeholder="employer name"/>
            <input type="number" value={employerDetails.salaryPerAnnum} onChange={(e) => setEmployersDetails(prev => ({...prev, salaryPerAnnum: e.target.value}))} placeholder="Salart P/A"/>
            <input type="text" value={employerDetails.email} onChange={(e) => setEmployersDetails(prev => ({...prev, email: e.target.value}))} placeholder="email"/>
            <input type="number" value={employerDetails.phone} onChange={(e) => setEmployersDetails(prev => ({...prev, phone: e.target.value}))} placeholder="phone"/>
            <input type="text" value={employerDetails.attendanceCode} onChange={(e) => setEmployersDetails(prev => ({...prev, attendanceCode: e.target.value}))} placeholder="Attendance Code"/>
            
            <button onClick={createEmployer}>create</button>
        </>
    )
}

export default AddEmployer