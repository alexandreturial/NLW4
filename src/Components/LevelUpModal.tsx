import { useContext } from 'react'
import { ChallengeContext, ChallengesProvider } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelupModal.module.css'

export function Levelupmodal() {
    const {level, closeLevelUpModal} = useContext(ChallengeContext)

    return (
        <div  className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                
                <strong>parabéns</strong>
                <p>você alcançou um novo level</p>
                
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="fechar modal"/>
                </button>
            </div>
        </div>
        
    )
}
