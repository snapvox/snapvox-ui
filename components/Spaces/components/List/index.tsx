import { useEffect, useState, useContext } from "react";

import Card from "../Card";
import AddCard from "../AddCard";
import { useSpaceContext } from '../../../../utils/contexts/SpaceContext';

import styles from "./styles.module.scss";

import snapvoxLogo from '../../../../public/assets/spaces/snapvox-logo.svg';
import xdcLogo from '../../../../public/assets/spaces/xdc-logo.svg';

const List = () => {
  const { updateSpaceType } = useSpaceContext()

  return (
    <div className={styles.listContainer}>
      <AddCard />

      <div onClick={() => updateSpaceType('XDC')}>
        <Card id={2} title={'XDC Community'} description={'A hub for proposals related to the XDC Community.'} image={xdcLogo} isVerified={false} isActive={false}/>
      </div>

      <div onClick={() => updateSpaceType('Snapvox')}>
        <Card id={1} title={'SnapVox DAO'} description={'A hub for making decisions about the future of the Snapvox dApp.'} image={snapvoxLogo} isVerified={true} isActive={true} />
      </div>
    </div>
  );
};

export default List;
