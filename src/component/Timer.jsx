import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FiPlay } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="text-white font-semibold text-5xl ">Task Done</div>;
  }
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="flex items-center justify-center">
      <div className="text-white text-7xl">{`${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}</div>
    </div>
  );
};
const Timer = () => {
  const location = useLocation();
  const { task } = location.state;

  const [rtime, setRTime] = useState();
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [taskDuration, setTaksDuration] = useState(0);
  const [buttonStartInvalid, setButtonStartInvalid] = useState(false);
  const [isResumeRunning, setIsResumeRunning] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(null);

  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskCompletedTwo, setTaskCompletedTwo] = useState(false);
  const [taskCompletedThree, setTaskCompletedThree] = useState(false);

  const [currentTaskText, setCurrentTaskText] = useState();

  const [taskCount, setTaskCount] = useState(1);
  const taskText = useRef("");
  const taskTextTwo = useRef("");
  const taskTextThree = useRef("");

  const durationVariable = 30;
  const [durationVariableSecond, setDurationVariableSecond] = useState(1800);

  const timeStop = () => {
    setIsPlaying(false);

    const rminutes = Math.floor(rtime / 60);
    const rseconds = rtime % 60;

    setTaksDuration(taskDuration + (durationVariable - rminutes));
    setIsResumeRunning(true);
    audioPlaying.pause();
    setKey((prevKey) => prevKey + 1);
  };

  const beginAgain = () => {
    setKey((prevKey) => prevKey + 1);
    setButtonStartInvalid(false);
    audioPlaying.play();
  };

  const startResume = () => {
    setIsPlaying((prev) => !prev);
    setIsResumeRunning((prev) => !prev);

    audioPlaying &&
      (isResumeRunning ? audioPlaying.play() : audioPlaying.pause());
  };

  const setMusic = (e) => {
    console.log(e.target.value);
    audioPlaying && audioPlaying.pause();
    setAudioPlaying(new Audio(e.target.value));
  };

  const taskCounter = () => {
    setTaskCount(taskCount + 1);
    if (taskCount % 2 == 0) {
      setDurationVariableSecond(300);
    } else {
      setDurationVariableSecond(1800);
    }
  };

  useEffect(() => {
    audioPlaying && audioPlaying.pause();
    audioPlaying && audioPlaying.play();
  }, [audioPlaying]);
  return (
    <div>
      <div className="flex flex-col justify-center my-4 items-center gap-4">
        <div className="min-h-20 w-full p-3 border border-green-500 text-white flex">
          <h2 className="text-md mr-1.5">Focused Time:</h2>
          <p>{taskDuration}m</p>
        </div>
        <div className="min-h-20 w-full px-2 py-2 border border-green-500 text-white flex">
          <h2 className="text-md mr-1.5">Current Task:</h2>
          <p>{task}</p>
        </div>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          trailColor=""
          strokeWidth={15}
          size={300}
          duration={durationVariableSecond}
          colors={["#0BDA51", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[1800, 1200, 600, 200]}
          onUpdate={(remainingTime) => setRTime(remainingTime)}
          onComplete={() => {
            taskCounter();
            setButtonStartInvalid(true);
            audioPlaying.pause();
            setTaksDuration(taskDuration + durationVariable);
            return { shouldRepeat: false, delay: 1 };
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
        <div className="flex flex-row justify-center gap-12">
          <button
            className={`w-1/3 bg-transparent ${
              buttonStartInvalid
                ? "hover:bg-green-500 border-green-500 text-green-600 hover:text-white hover:border-transparent "
                : "border-gray-500 text-gray-600"
            }   py-2 px-4 border rounded text-lg`}
            onClick={beginAgain}
            disabled={!buttonStartInvalid}
          >
            New Timer
          </button>
          <button
            className="w-1/3 bg-transparent hover:bg-green-500 text-green-600  hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-lg"
            onClick={startResume}
          >
            {isResumeRunning ? "Start" : "Pause"}
          </button>
          <button
            className="w-1/3 bg-transparent hover:bg-green-500 text-green-600  hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded text-lg"
            onClick={timeStop}
          >
            Stop
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <select
            onChange={setMusic}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-[#1b1919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option defaultValue>Select White Noise</option>
            <option value="/arctic-white-noise.mp3">Arctic</option>
            <option value="/bird-chirp-white-noise.mp3">Bird Chirping</option>
            <option value="/brook-white-noise.mp3">Brook</option>
            <option value="/forest-white-noise.mp3">Forest</option>
            <option value="/traffic-white-noise.mp3">Traffic</option>
            <option value="/void-white-noise.mp3">Void</option>
          </select>
          <p className="text-white">To change the music, Pause the timer </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
