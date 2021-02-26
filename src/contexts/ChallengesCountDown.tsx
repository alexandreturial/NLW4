import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from '../contexts/ChallengesContext';

interface CountDownContextData{
    isActive: boolean;
    hasFinish: boolean;
    minutes: number;
    seconds: number;
    StartCountDown: () => void;
    ResetCountDown: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}


export const CountDownContext = createContext({} as CountDownContextData);


let CountDownTimeOut: NodeJS.Timeout;


export function CountDownProvider({ children }:ChallengesProviderProps){
    const { startNewChallenge } =useContext(ChallengeContext);
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    function StartCountDown() {
        setIsActive(true);
    }
    function ResetCountDown() {
        clearTimeout(CountDownTimeOut);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinish(false);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            CountDownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountDownContext.Provider value={{
            isActive,
            hasFinish,
            minutes,
            seconds,
            StartCountDown,
            ResetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}