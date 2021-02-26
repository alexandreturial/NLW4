import {createContext, useState, ReactNode, useEffect} from 'react'
import Cockies from 'js-cookie';
import challenges from '../../challenges.json';
import { Levelupmodal } from '../Components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level:number;
    currentExperience: number; 
    challengesComplited: number;
    activeChallenge: Challenge;
    experienceToNexetLevel: number;
    levelUp: () => void;
    startNewChallenge:  () => void;
    resetChallenge: () => void;
    completeChallenge:() =>void;
    closeLevelUpModal:() =>void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesComplited: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ 
        children,
        ...rest
    }:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesComplited, setChallengesCompleted] = useState(rest.challengesComplited ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNexetLevel = Math.pow((level +1 ) * 4,2)

    useEffect(() =>{
        Notification.requestPermission();
    },[]);

    useEffect(() =>{
        Cockies.set('moveitLevel', String(level));
        Cockies.set('moveitCurrentExperience', String(currentExperience));
        Cockies.set('moveitChallengesComplited', String(challengesComplited));
    },[level, currentExperience, challengesComplited]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    function startNewChallenge(){

        const randomChallengeIndex = Math.floor(Math.random()* challenges.length) ;
        
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('novo desafio', {
                body: `Valendo: ${challenge.amount} xp`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge) return;
        
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNexetLevel){
            finalExperience = finalExperience - experienceToNexetLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesComplited +1);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengeContext.Provider 
        value={{
            level, 
            currentExperience, 
            challengesComplited, 
            activeChallenge,
            experienceToNexetLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
            }}
        >
            { children}
            {
                isLevelUpModalOpen &&
                <Levelupmodal/> 
            }
            
        </ChallengeContext.Provider>
    );
}