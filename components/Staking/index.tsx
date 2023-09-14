import { useState } from 'react'

import Navbar from '../Navbar'

import styles from './styles.module.scss'
import Search from '../Home/components/Search'
import Validators from './components/Validators'

const Staking = () => {
  const [contentState, setContentState] = useState('mystaking')

  return (
    <div className={styles.container}>
       <div className={styles.navbar}>
          <Navbar />
       </div>

       <div className={styles.contentContainer}>
          <div className={styles.alternateInput}>
            <div className={contentState == 'mystaking' ? styles.activeOption : styles.inactiveOption} onClick={() => setContentState('mystaking')}>
              My Staking
            </div>

            <div className={contentState == 'allvalidators' ? styles.activeOption : styles.inactiveOption} onClick={() => setContentState('allvalidators')}>
              All Validators
            </div>
          </div>

          {contentState == 'mystaking' ?
            <div className={styles.myStakingContainer}>
              <div className={styles.left}>
                <div className={styles.infoCard}>
                  <div className={styles.title}>
                    Total Staked:
                  </div>

                  <div className={styles.info}>
                    0
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.title}>
                    APR:
                  </div>

                  <div className={styles.info}>
                    0
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.title}>
                    Rewards:
                  </div>

                  <div className={styles.info}>
                    0
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.button}>
                  Claim Rewards
                </div>
              </div>
            </div>
          :
            <div className={styles.allValidatorsContainer}>
              <div className={styles.filterContainer}>
                <div className={styles.searchbar}>
                  <Search />
                </div>

                <div className={styles.validators}>
                  <Validators />
                </div>
              </div>
            </div>
          }
       </div>
    </div>
  )
}

export default Staking