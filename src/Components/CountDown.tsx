import { useContext } from 'react';
import { CountDownContext } from '../contexts/ChallengesCountDown';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinish, 
        isActive, 
        ResetCountDown, 
        StartCountDown 
    } = useContext(CountDownContext)

    const [minuteleft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondleft, secondRight] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteleft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondleft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinish ? (
                <button
                    disabled
                    className={styles.CountDownButton}
                >
                    Ciclo Encerrado
                </button>
            ) : (
                    <>
                        { isActive ? (
                            <button
                                type="button"
                                className={`${styles.CountDownButton} ${styles.CountDownButtonActive}`}
                                onClick={ResetCountDown}
                            >
                                Abandonar ciclo
                            </button>

                        ) : (

                                <button
                                    type="button"
                                    className={styles.CountDownButton}
                                    onClick={StartCountDown}
                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}




        </div>
    )
}
