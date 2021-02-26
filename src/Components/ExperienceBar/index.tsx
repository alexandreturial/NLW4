import React, { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/experienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNexetLevel } = useContext(ChallengeContext)

  const percentToNextLevel = Math.round((currentExperience * 100)/experienceToNexetLevel);


  return (
      <header className={styles.experienceBar}>
          <span>0 xp</span>
          <div>
            <div style={{width: `${percentToNextLevel}%`}}/>
            <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                {currentExperience} xp
            </span>
          </div>
          <span>{experienceToNexetLevel} xp</span>
      </header>
  );
}

export default ExperienceBar;