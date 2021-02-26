import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/ChallengesCountDown';
import styles from '../styles/components/Challengedbox.module.css';

export function Challengebox() {
    const { activeChallenge,resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { ResetCountDown } = useContext(CountDownContext)

    function handleChallengesucceeded(){
        completeChallenge();
        ResetCountDown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        ResetCountDown();
    }


    return (
        <div className={styles.challengeBoxContainer}>
            {
                activeChallenge ? (
                    <div className={styles.challengeActive}>
                        <header>
                            Ganhe {activeChallenge.amount} xp
                        </header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} alt="body"/>
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button 
                                type="button"
                                className={styles.challengeFailButton}
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSucceededButton}
                                onClick={handleChallengesucceeded}
                           >
                                Completei
                            </button>
                        </footer>
                    </div>

                ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>
                            Inicie um ciclo para receber desafios a serem completados
                        </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"/>
                            Avance de level completrando desafios
                        </p>
                    </div>
                )
            }
            
        </div>
    )
}
