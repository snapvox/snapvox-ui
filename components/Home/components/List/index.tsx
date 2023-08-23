import { useEffect, useState, useContext } from "react";
import Card from "../Card";
import styles from "./styles.module.scss";
import { ProposalsContext } from "../../../../contexts/ProposalsContext";
import { VotingHubAddress } from "../../../../blockchain/constants";
import { Web3ModalContext } from "../../../../contexts/Web3ModalProvider";

const List = () => {
  const [data, setData] = useState<any>([]);
  const { proposals, byId, byContract } = useContext(ProposalsContext);
  const { chainId } = useContext(Web3ModalContext);

  useEffect(() => {
    if(!chainId) return;
    if(proposals && proposals.length === 0) {
      const getData = async () => {
        await byContract(VotingHubAddress.Networks[chainId]['SNAPVOX']);
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
