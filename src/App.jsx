import { useEffect, useState } from 'react'
import './App.css'
import { FaCirclePlay } from "react-icons/fa6";

function App() {
  const [minutes, setMinutes] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [StopTimer, setStopTimer] = useState(false);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const hoursformatted = hours < 10 ? `0${hours}` : hours;
    const minutesformatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsformatted = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursformatted}:${minutesformatted}:${secondsformatted}`;
  };

  useEffect(() => {
    let remainingTime = minutes * 60;

    if(!StopTimer){
      const interval = setInterval(() => {
            if (remainingTime > 0) {
              remainingTime -= 1;
              setFormattedTime(formatTime(remainingTime));
            }else if(remainingTime == 0){
              setFormattedTime(formatTime(0)) 
            } else{
              clearInterval(interval);
            }
          }, 1000);
        return () => clearInterval(interval);
    }

  }, [StopTimer, minutes]);

  const handleInputChange = (event) => {
    const minutes = parseInt(event.target.value, 10);
    setMinutes(minutes);
  };

  const handleStopTimer = () => {
    setStopTimer(!StopTimer);
  }
  return (
    <div className='flex flex-col justify-center items-center my-[300px]'>
      <div className='mx-auto'>
        <p>Enter Minutes</p>
        <input className='border-2 border-gray-600 rounded-md w-[400px] text-white h-[40px]' id="countdownInput"  onChange={handleInputChange}/>
      </div>
      <div className='flex mx-auto mt-4'> 
        <FaCirclePlay color='#197DBB' 
          className='text-[35px] mt-[5px] m-[5px] cursor-pointer'
          onClick={handleStopTimer}
        />
        <p className='font-bold text-4xl'>{formattedTime}</p>
      </div>
    </div>
  )
}

export default App
