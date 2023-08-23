import { useEffect, useState, useContext } from "react";
import Card from "../Card";
import styles from "./styles.module.scss";
import { ProposalsContext } from "../../../../utils/contexts/ProposalsContext";
import { VotingHubAddress } from "../../../../blockchain/constants";
import { Web3ModalContext } from "../../../../utils/contexts/Web3ModalProvider";
import { useSpaceContext } from "../../../../utils/contexts/SpaceContext";

const List = () => {
  const [data, setData] = useState<any>([]);
  const { proposals, byId, byContract, clear } = useContext(ProposalsContext);
  const { chainId } = useContext(Web3ModalContext);
  const { spaceType } = useSpaceContext();

  useEffect(() => {
    if(!chainId) return;
    if(proposals?.length === 0) {
      const getData = async () => {
        console.log(spaceType)
        await byContract(VotingHubAddress.Networks[chainId][spaceType]);
      };
      getData();
    }
    
    setData(proposals);
    
    if(proposals?.length > 0) {
      byId(proposals.length);
    }
  }, [proposals]);

  return (
    <div className={styles.listContainer}>
      {data?.map((value, index) => {
        return <Card key={index} data={data[index]} />;
      })}
    </div>
  );
};

export default List;
