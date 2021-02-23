import { Completedchallenges } from "../Components/CompletedChallenges";
import { Countdown } from "../Components/CountDown";
import ExperienceBar from "../Components/ExperienceBar";
import Profile from "../Components/Profile";

import Head from 'next/Head'

import styles from '../styles/Pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.It</title>
      </Head>
      <ExperienceBar/>
      <section>
        <div className=''>
          <Profile />
          <Completedchallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  );
}
