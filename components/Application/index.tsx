import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Image from "next/image"
import { default as back } from "../../public/assets/svgicons/backArrow.svg";

const ApplicationModal = () => {
  const [width, setWidth] = useState(Number)
  const [height, setHeight] = useState(Number)
  const route = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.container}>
        <div className={styles.formContainer}>

          <div className={styles.title}>
            <div
              className={styles.backContainer}
              onClick={() => route.push("/")}
            >
              <Image src={back} alt="Back" width={17} />
              <div className={styles.text}>Back</div>
            </div>
          </div>

          <div>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf5fAwjQRsR_xBhHuQugdlrDTeCPoD6KOZ2zlEKPXz6_s6TgA/viewform?embedded=true&scrolling=no" width={width} height='2600'>Loading…</iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationModal