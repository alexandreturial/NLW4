import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Completedchallenges.module.css';

export function Completedchallenges() {
    const { challengesComplited } = useContext(ChallengeContext);

    return (
        <div className={styles.completedChanllengesContainer}>
            <span>desafios completos</span>
            <span>{challengesComplited}</span>
        </div>
    )
}
