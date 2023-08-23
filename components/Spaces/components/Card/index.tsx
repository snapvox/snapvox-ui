import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../../../utils/contexts/ThemeContext";
import { Web3ModalContext } from "../../../../utils/contexts/Web3ModalProvider";
import { StatusContext } from "../../../../utils/contexts/StatusUpdater";
import { NotificationManager } from 'react-notifications'
import verified from '../../../../public/assets/svgicons/verified.svg';
import styles from "./styles.module.scss";
import Image from 'next/image'
import soon from '../../../../public/assets/soon.png'


interface CardProps {
  id: number;
  title: string;
  description: string;
  image: any;
  isVerified: boolean;
  isActive: boolean;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);
  const { chainId, web3, account } = useContext(Web3ModalContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);

  useEffect(() => {
    if (!web3 || !account) return;
    setStatusUpdated(!statusUpdated);
  }, [web3, account])

  const handleClick = () => {
/*     if (!account) { // CHECA SE TEM METAMASK
      NotificationManager.error('Please connect your wallet to continue', 'Error', 5000);
      return;
    }

    if ((chainId != 50 && chainId != 51)) { // CHECA SE TA NA XDC
      NotificationManager.error('Please switch to XDC Network to continue', 'Error', 5000);
      return;
    }

    if (!props.isActive) { // DISABILITA O XDC COMMUNITY
      NotificationManager.info('This space is coming soon! Please keep tuned.', 'info', 5000);
      return;
    } */
    route.push(`/proposals`);

  }

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
        <div
        className={styles.container}
        /* onClick={() => route.push("/")} */
        onClick={handleClick}
      >
        <div className={styles.productImage}>
          <Image src={props.image} alt='Space Logo' width={180} height={180} />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>{props.title} {props.isVerified ? (<Image src={verified} alt='Verified' width={20} height={20} />) : (<></>)}</div>
          <div className={styles.description}> {props.description} </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
