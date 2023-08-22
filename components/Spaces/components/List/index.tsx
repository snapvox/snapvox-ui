import { useEffect, useState, useContext } from "react";
import Card from "../Card";
import AddCard from "../AddCard";
import styles from "./styles.module.scss";
import snapvoxLogo from '../../../../public/assets/spaces/snapvox-logo.svg';
import xdcLogo from '../../../../public/assets/spaces/xdc-logo.svg';

const List = () => {


  return (
    <div className={styles.listContainer}>
      <AddCard />
      <Card id={2} title={'XDC Community'} description={'A hub for proposals related to the XDC Community.'} image={xdcLogo} isVerified={false} isActive={false}/>
      <Card id={1} title={'SnapVox DAO'} description={'A hub for making decisions about the future of the Snapvox dApp.'} image={snapvoxLogo} isVerified={true} isActive={true} />
    </div>
  );
};

export default List;
