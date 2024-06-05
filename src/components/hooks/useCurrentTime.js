import { useState, useEffect } from 'react';

function useCurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
}

export default useCurrentTime;
