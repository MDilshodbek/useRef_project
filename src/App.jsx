import "./App.css";
import { Button, Input, Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { v4 } from "uuid";

function App() {
  const [milliSecond, setmilliSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const [Lap, setLap] = useState([]);
  const [lapName, setLapName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changemilliSecond = (previous) => {
    if (previous === 100) {
      setSecond(changeSecond);
      return 0;
    }

    return previous + 1;
  };

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
    setmilliSecond(0);
  };

  const onLap = () => {
    setShowInput(true);
  };

  const addLap = () => {
    if (lapName.trim() !== "") {
      setLap((previous) => {
        return [
          ...previous,
          {
            hour: formatNumber(hour),
            minute: formatNumber(minute),
            second: formatNumber(second),
            milliSecond: formatNumber(milliSecond),
            name: lapName,
            id: v4(),
          },
        ];
      });
      setLapName("");
      setShowInput(false);
    }
  };

  const resetLaps = () => {
    setLap([]);
  };

  useEffect(() => {
    if (running)
      timerRef.current = setInterval(() => {
        setmilliSecond(changemilliSecond);
      }, 10);
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
          <h3>{formatNumber(second)}</h3>:<h3>{formatNumber(milliSecond)}</h3>
        </div>
        <div className="buttons">
          {showInput ? (
            <Input
              placeholder="Enter lap name"
              value={lapName}
              onChange={(e) => setLapName(e.target.value)}
            />
          ) : (
            <Button
              type="primary"
              onClick={onLap}
              disabled={
                hour === 0 && minute === 0 && second === 0 && milliSecond === 0
              }
            >
              Lap
            </Button>
          )}
          {showInput && (
            <Button
              type="primary"
              onClick={addLap}
              disabled={
                hour === 0 && minute === 0 && second === 0 && milliSecond === 0
              }
            >
              Add
            </Button>
          )}

          {running ? (
            <Button onClick={() => setRunning(false)}>Pause</Button>
          ) : (
            <Button onClick={() => setRunning(true)}> Start </Button>
          )}
          <Button danger type="primary" onClick={showModal}>
            Restart
          </Button>
          <Modal
            title="Reminder"
            open={isModalOpen}
            onOk={reset}
            onCancel={handleCancel}
          >
            <p>Are you sure you wanna clear datas ?</p>
          </Modal>
        </div>
        <div className="lapp">
          {Lap.map(({ id, hour, minute, second, milliSecond, name }) => {
            return (
              <div key={id} className="flex items-center">
                <h3>
                  {hour < 10 ? `${hour}` : formatNumber(hour)}:
                  {minute < 10 ? `${minute}` : formatNumber(minute)}:
                  {second < 10 ? `${second}` : formatNumber(second)}:
                  {milliSecond < 10
                    ? `${milliSecond}`
                    : formatNumber(milliSecond)
                    ? `${milliSecond}`
                    : milliSecond}{" "}
                  - {name}
                </h3>
              </div>
            );
          })}
          {Lap.length > 0 && (
            <Button
              onClick={() => {
                resetLaps();
              }}
              className="mr-[20px]"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
