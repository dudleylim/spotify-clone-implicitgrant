import React from 'react'
import { useState, useEffect } from 'react';

const ContextPomo = React.createContext();
export default ContextPomo;

export const ContextApiPomo = ({children}) => {

// general states and variables
    const defaultWorkTime = 3;
    const defaultRestShortTime = 1;
    const defaultRestLongTime = 2;

    const [workTime, setWorkTime] = useState(defaultWorkTime);
    const [restShortTime, setRestShortTime] = useState(defaultRestShortTime);
    const [restLongTime, setRestLongTime] = useState(defaultRestLongTime);

    const [currentTime, setCurrentTime] = useState(defaultWorkTime);
    const [totalTime, setTotalTime] = useState(defaultWorkTime);
    const [pomoCounter, setPomoCounter] = useState(1);
    const [isTimerStarted, setIsTimerStarted] = useState(false);

    let seconds = currentTime % 60;
    let minutes = ((currentTime - seconds) / 60).toFixed(0);
    let progress = (((totalTime - currentTime) / totalTime) * 100).toFixed(0);

    const [isWorking, setIsWorking] = useState(true);
    const [isRestingShort, setIsRestingShort] = useState(false);
    const [isRestingLong, setIsRestingLong] = useState(false);

    // count timer down
        useEffect(() => {
            if (isTimerStarted && currentTime >= 0) {
                const interval = setInterval(() => {
                    setCurrentTime(currentTime - 1);
                    // console.log(currentProgress);
                }, 1000);
                return () => clearInterval(interval);
            }
        }, [isTimerStarted, currentTime])

    // auto switch tab when current time hits 0
    // also sets time when tab switches
        useEffect(() => {
            if (currentTime < 0) {
                if (isWorking) {
                    setIsWorking(false);
                    if (pomoCounter % 4 === 0 && pomoCounter !== 0) {
                        setIsRestingShort(false);
                        setIsRestingLong(true);
                        setCurrentTime(restLongTime);
                        setTotalTime(restLongTime);
                    } else {
                        setIsRestingShort(true);
                        setIsRestingLong(false);
                        setCurrentTime(restShortTime);
                        setTotalTime(restShortTime);
                    }
                    setPomoCounter(pomoCounter + 1);
                } else {
                    setIsWorking(true);
                    setIsRestingShort(false);
                    setIsRestingLong(false);
                    setCurrentTime(workTime);
                    setTotalTime(workTime);
                } 
            }
        }, [currentTime, isWorking, pomoCounter, workTime, restShortTime, restLongTime])



    // toggle timer
        const toggleTimer = () => {
            setIsTimerStarted(!isTimerStarted);
        }

    // switch tab
        const switchTab = (tab) => {
            if (tab === 'work') {
                setIsWorking(true);
                setIsRestingShort(false);
                setIsRestingLong(false);
            } else if (tab === 'restShort') {
                setIsWorking(false);
                setIsRestingShort(true);
                setIsRestingLong(false);
            } else if (tab === 'restLong') {
                setIsWorking(false);
                setIsRestingShort(false);
                setIsRestingLong(true);
            }
        }

// context data
    const contextData = {
        currentTime,
        isTimerStarted,
        seconds, minutes, progress,
        isWorking, isRestingShort, isRestingLong,
        pomoCounter,

        toggleTimer,
        switchTab,
    };

// return function
    return (
        <ContextPomo.Provider value={contextData}>
            {children}
        </ContextPomo.Provider>
    )
}