import { useRef, useState ,useEffect} from 'react'
import './App.css'
import pop from "./assets/lvl SFX.wav"
function App() {
const [thebreak,setThebreak]=useState(5)
const [thesession,setThesession]=useState(25)
const [startState,setStartState]=useState(false)
const [breakState,setBreakState]=useState(false)
const [minutes,setMinutes]=useState(9)
const [seconds,setSeconds]=useState(0)
const [timeoutId,setTimeoutId]=useState(null)
const audio=useRef(null)

function isession(){
  if(!startState){
  if(thesession<60){
    
    setThesession(thesession+1)
    
  }

  }

}
function dsession(){
  if(!startState){
  if(thesession>1){

    
    
    setThesession(thesession-1)
  }

  }
  
}
function ibreak(){
  if(!startState){

  if(thebreak<60){
    
    
    setThebreak(thebreak+1)
  }
  }
  
}
function dbreak(){
  if(!startState){

  if(thebreak>1){
    
    
    setThebreak(thebreak-1)
  }
  }
  
}
function handleState(){
  if(timeoutId)clearTimeout(timeoutId)
  setTimeoutId(null)
  setStartState(!startState)
  
}
function reset(){
audio.current.pause();
audio.current.currentTime=0;
setStartState(false)
setBreakState(false)
  if(timeoutId)clearTimeout(timeoutId)
  setTimeoutId(null)
  setThebreak(5)
  setThesession(25)
}
useEffect(()=>{
  setMinutes(thesession)
  setSeconds(0)
},[thesession])
useEffect(()=>{
  if(startState){

    const id=setTimeout(()=>{
       if(seconds>0)setSeconds(seconds-1)
        else{
      if(minutes>0){
        setMinutes(minutes-1);
        setSeconds((prev)=>59);
      }
      else{
        if(breakState){
          audio.current.play()
          setMinutes(thesession)
             setBreakState(false)
        }
        else{
          audio.current.play()
          setMinutes(thebreak)
          setBreakState(true)

        }
      }
      }
      setTimeoutId(null)
    },1000)
    setTimeoutId(id)

  }
  else{
    setTimeoutId(null)
  }
},[startState,seconds,minutes])
  return (
    <div id='container'>
      <h4>Pomodoro Clock</h4>
      <div id='controls'>
        <div id="session">
          <label id="session-label">Session Length</label>
          <div id='session-display'>
            <button id='session-increment' onClick={isession}>+</button>
            <label id='session-length'>{thesession}</label>
            <button id='session-decrement' onClick={dsession}>-</button>
        </div></div>

          <div id="break">
            <label id="break-label">Break Length</label>
            <div id='break-display'>
              <button id='break-increment' onClick={ibreak}>+</button>
              <label id='break-length'>{thebreak}</label>
              <button id='break-decrement' onClick={dbreak}>-</button>
            </div>
          </div>

        </div>
        <label id='timer-label'>{breakState?"Break":"Session"}</label>
        <div id='time-left'>{minutes<10&&"0"}{minutes}:{seconds<10&&"0"}{seconds}</div>
        <button id='start_stop' onClick={handleState}>Start/Stop</button>
        <button id='reset' onClick={reset}>Reset</button>
        <audio ref={audio} id='beep'  src={pop}/>
      </div>
  )
}

export default App


