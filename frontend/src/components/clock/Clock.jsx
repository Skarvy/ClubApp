import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  return (
    <div className="container text-center mt-4">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Hora y Fecha Actual</h2>
        <p className="card-text">{time.toLocaleTimeString()}</p>
        <p className="card-text">{time.toLocaleDateString()}</p>
      </div>
    </div>
  </div>
  );
};

export default Clock;
