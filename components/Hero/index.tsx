import Navbar from '../Navbar'

import styles from './styles.module.scss'

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.title}>
          hey, welcome to <span>snapvox</span>
        </div>

        <div className={styles.description}>
          Choose an option in the menu to continue.
        </div>

        <div className={styles.buttonsContainer}>
          <div className={styles.button}>
            Vote Spaces
          </div>

          <div className={styles.button}>
            Staking
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero