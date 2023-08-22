import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import { Web3ModalContext } from "../../../../contexts/Web3ModalProvider";
import { StatusContext } from "../../../../contexts/StatusUpdater";
import Image from "next/image";
import styles from "./styles.module.scss";
import plus from '../../../../public/assets/svgicons/plus.svg';

const AddCard = () => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);
  const { web3, account } = useContext(Web3ModalContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);

  useEffect(() => {
    if (!web3 || !account) return;
    setStatusUpdated(!statusUpdated);
  }, [web3, account])

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div
        className={styles.container}
        onClick={() => route.push("/application")}
      >
        <div className={styles.productImage}>
          <Image src={plus} alt='Space Logo' width={120} height={120} />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>Add Your DAO Today!</div>
          <div className={styles.description}>Apply to add your DAO to the list of DAOs on SnapVox!</div>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
