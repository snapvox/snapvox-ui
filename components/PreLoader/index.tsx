import Image from 'next/image'

import styles from './styles.module.scss'

import logo from '../../public/assets/logo/preloader.svg'

const PreLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src={logo} alt='Logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreLoader