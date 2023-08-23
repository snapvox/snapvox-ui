import Image from 'next/image';
import { useContext } from 'react';
import { Theme, ThemeContext } from "../../../../utils/contexts/ThemeContext";

import styles from './styles.module.scss'

import verified from 'public/assets/svgicons/verified.svg';

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: any;
  isVerified: boolean;
  isActive: boolean;
}

const AboutDAO = (props: CardProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={theme == Theme.DARK ? styles.dark : styles.light}>
        <div
        className={styles.container}
      >
        <div className={styles.productImage}>
          <Image src={props.image} alt='Space Logo' width={180} height={180} />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>{props.title} {props.isVerified ? (<Image src={verified} alt='Verified' width={20} height={20} />) : null}</div>
          <div className={styles.description}> {props.description} </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AboutDAO