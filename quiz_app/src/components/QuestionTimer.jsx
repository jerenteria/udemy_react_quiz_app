import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); // dependecies allow the function to be reexecuted if the dependencies change

  // store in useEffect so that it doesnt re-execute that will cause an infite loop and cause program to crash
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100)
    return () => {
      clearInterval(interval)
    };
  }, []);
  return <progress id="question-time" max={timeout} value={remainingTime} />;
}

