import Head from 'next/Head'
import { GetServerSideProps } from 'next';


import { Completedchallenges } from "../Components/CompletedChallenges";
import { Countdown } from "../Components/CountDown";
import ExperienceBar from "../Components/ExperienceBar";
import Profile from "../Components/Profile";


import styles from '../styles/Pages/Home.module.css';
import { Challengebox } from "../Components/ChallengeBox";
import { CountDownProvider } from "../contexts/ChallengesCountDown";
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface Homeprops{
  level: number;
  currentExperience: number;
  challengesComplited: number;
}

export default function Home(props:Homeprops) {
  
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesComplited={props.challengesComplited}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.It</title>
        </Head>
        <ExperienceBar/>
        
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <Completedchallenges />
              <Countdown />
            </div>
            <div>
              <Challengebox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  );
}


export const getServerSideProps: GetServerSideProps = async(ctx) =>{

  const {
    moveitLevel,
    moveitCurrentExperience,
    moveitChallengesComplited
  } = ctx.req.cookies;

  return{
    props: {
      level: Number(moveitLevel),
      currentExperience: Number(moveitCurrentExperience),
      challengesComplited: Number(moveitChallengesComplited)
    }
  }
}
