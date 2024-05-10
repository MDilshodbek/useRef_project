import "./App.css";
import { Button } from "antd";
import { useEffect, useState, useRef } from "react";
import { v4 } from "uuid";

function App() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const [Lap, setLap] = useState([]);

  // className="flex items-center justify-center"
  // className="w-[500px] h-[500px] bg-orange-500 mt-52"
  // className="flex justify-center gap-[10px] text-7xl w-full mt-[20px]"
  // className="w-[80%] flex justify-between m-auto mt-[20px]"

  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute);
      return 0;
    }

    return previous + 1;
  };

  const changeMinute = (previous) => {
    if (previous === 59) {
      setHour((previous) => {
        return previous + 1;
      });
      return 0;
    }

    return previous + 1;
  };

  const reset = () => {
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const onLap = () => {
    setLap((previous) => {
      return [
        ...previous,
        {
          hour,
          minute,
          second,
          id: v4(),
        },
      ];
    });
  };

  useEffect(() => {
    if (running)
      timerRef.current = setInterval(() => {
        setSecond(changeSecond);
      }, 1000);
    else clearInterval(timerRef.current);
  }, [running]);

  const formatNumber = (num) => {
    return String(num).padStart(2, "0");
  };

  return (
    <div id="main" className="conatiner">
      <div className="box">
        <div className="details">
          <h3>{formatNumber(hour)}</h3>:<h3>{formatNumber(minute)}</h3>:
          <h3>{formatNumber(second)}</h3>
        </div>
        <div className="buttons">
          <Button
            type="primary"
            onClick={onLap}
            disabled={hour === 0 && minute === 0 && second === 0}
          >
            Lap
          </Button>
          {running ? (
            <Button onClick={() => setRunning(false)}>Pause</Button>
          ) : (
            <Button onClick={() => setRunning(true)}>Start</Button>
          )}
          <Button danger type="primary" onClick={reset}>
            Restart
          </Button>
        </div>
        <div className="lapp">
          {Lap.map(({ id, hour, minute, second }) => {
            return (
              <div key={id} className="history">
                <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
