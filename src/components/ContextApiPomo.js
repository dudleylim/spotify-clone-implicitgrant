import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import Context from './ContextApi';

const ContextPomo = React.createContext();
export default ContextPomo;

export const ContextApiPomo = ({children}) => {

// general states and variables
    const contextApi = useContext(Context);

    const defaultWorkTime = 1500;
    const defaultRestShortTime = 300;
    const defaultRestLongTime = 900;

    // const defaultWorkTime = 3;
    // const defaultRestShortTime = 1;
    // const defaultRestLongTime = 2;

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
                        contextApi.pause();
                    } else {
                        setIsRestingShort(true);
                        setIsRestingLong(false);
                        setCurrentTime(restShortTime);
                        setTotalTime(restShortTime);
                        contextApi.pause();
                    }
                    setPomoCounter(pomoCounter + 1);
                } else {
                    setIsWorking(true);
                    setIsRestingShort(false);
                    setIsRestingLong(false);
                    setCurrentTime(workTime);
                    setTotalTime(workTime);
                    contextApi.resume();
                } 
            }
        }, [currentTime, isWorking, pomoCounter, workTime, restShortTime, restLongTime])

    // toggle play in player when timer starts
        // useEffect(() => {
        //     if (contextApi.isSongReady) {
        //         if (isTimerStarted) {
        //             isWorking ? contextApi.resume() : contextApi.pause();
        //         }
        //     }
        // }, [isTimerStarted, contextApi, isWorking])

    // toggle timer
        const toggleTimer = () => {
            setIsTimerStarted(!isTimerStarted);

            // toggle play if connected to spotify
            if (contextApi.isSongReady) {
                if (isWorking) {
                    !isTimerStarted ? contextApi.resume() : contextApi.pause();
                }
            }
        }

    // switch tab
        const switchTab = (tab) => {
            setIsTimerStarted(false);
            if (tab === 'work') {
                setIsWorking(true);
                setIsRestingShort(false);
                setIsRestingLong(false);
                setCurrentTime(workTime);
                setTotalTime(workTime);
                contextApi.resume();
            } else if (tab === 'restShort') {
                setIsWorking(false);
                setIsRestingShort(true);
                setIsRestingLong(false);
                setCurrentTime(restShortTime);
                setTotalTime(restShortTime);
                contextApi.pause();
            } else if (tab === 'restLong') {
                setIsWorking(false);
                setIsRestingShort(false);
                setIsRestingLong(true);
                setCurrentTime(restLongTime);
                setTotalTime(restLongTime);
                contextApi.pause();
            }
        }
    
    // skip tab by setting time to -1, triggering useeffect
        const skip = () => {
            setCurrentTime(-1);
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
        skip,
    };

// return function
    return (
        <ContextPomo.Provider value={contextData}>
            {children}
        </ContextPomo.Provider>
    )
}