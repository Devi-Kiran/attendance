import React from 'react';
import { useParams } from 'react-router-dom';

function EachAttendance() {
  const { id } = useParams();
  return (
    <div>EachAttendance {id}</div>
  )
}

export default EachAttendance