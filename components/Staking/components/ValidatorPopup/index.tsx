import Image from 'next/dist/client/image'
import { useState } from 'react'

import styles from './styles.module.scss'

import close from '../../../../public/assets/svgicons/close.svg'

const ValidatorPopup = ({ isOpen, onClose }) => {
  const [buttonState, setButtonState] = useState('delegate')

  return (
    <div className={isOpen ? styles.screenContainerOpen : styles.screenContainerClosed}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.title}>
            Valislabs
          </div>

          <div className={styles.close} onClick={onClose}>
            <Image src={close} alt='Close' />
          </div>
        </div>

        <div className={styles.description}>
          Valis Labs Validator
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <div className={styles.title}>
              Delegation
            </div>

            <div className={styles.data}>
              {'0.0'}
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.title}>
              Available Balance
            </div>

            <div className={styles.data}>
              {0}
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.title}>
              Commission
            </div>

            <div className={styles.data}>
              {'0.0%'}
            </div>
          </div>
        </div>

        <div className={styles.stateButtons}>
          <div className={buttonState == 'delegate' ? styles.activeButton : styles.disabledButton} onClick={() => setButtonState('delegate')}>
            Delegate
          </div>

          <div className={buttonState == 'undelegate' ? styles.activeButton : styles.disabledButton} onClick={() => setButtonState('undelegate')}>
            Undelegate
          </div>

          <div className={buttonState == 'redelegate' ? styles.activeButton : styles.disabledButton} onClick={() => setButtonState('redelegate')}>
            Re-Delegate
          </div>
        </div>

        <div className={styles.delegateStatesContainer}>
          {buttonState == 'delegate' ?
            <div className={styles.delegateContainer}>
              <div className={styles.inputContainer}>
                <input type="number" min={0} placeholder='Enter Amount' />

                <div className={styles.max}>
                  Max
                </div>
              </div>

              <div className={styles.checkboxContainer}>
                <input type="checkbox"/>

                <div className={styles.text}>
                  Staking will lock up your funds for at least 21 days once you undelegate your staked canto, you will need to wait 21 days for your tokens to be liquid
                </div>
              </div>
            </div>
          : buttonState == 'undelegate' ?
            <div className={styles.undelegateContainer}>
              <div className={styles.inputContainer}>
                <input type="number" min={0} placeholder='Enter Amount' />

                <div className={styles.max}>
                  Max
                </div>
              </div>
            </div>
          : buttonState == 'redelegate' ?
            <div className={styles.redelegateContainer}>
              <div className={styles.inputContainer}>
                <input type="number" min={0} placeholder='Enter Amount' />

                <div className={styles.max}>
                  Max
                </div>
              </div>
            </div>
          : null}
        </div>

        <div className={styles.confirmButtons}>
          <div className={styles.button}>
            {buttonState == 'delegate' ? 'Delegate' : buttonState == 'undelegate' ? 'Undelegate' : buttonState == 'redelegate' ? 'Re-Delegate' : null}
          </div>
        </div>

        <div className={styles.warning}>
          Not enough funds for delegation fee
        </div>
      </div>
    </div>
  )
}

export default ValidatorPopup