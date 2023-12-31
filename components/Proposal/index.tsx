/* eslint-disable react/no-children-prop */
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";
import { ExplorerUrl } from "../../blockchain/constants";
import { ProposalsContext } from "../../utils/contexts/ProposalsContext";
import { Theme, ThemeContext } from "../../utils/contexts/ThemeContext";
import { Web3ModalContext } from "../../utils/contexts/Web3ModalProvider";
import { BlockchainContext } from "../../utils/contexts/BlockchainProvider";
import { StatusContext } from "../../utils/contexts/StatusUpdater";
import { PreviewContext } from "../../utils/contexts/PreviewContext";
import { default as back } from "../../public/assets/svgicons/backArrow.svg";
import edit from "../../public/assets/svgicons/edit.svg";
import share from "../../public/assets/svgicons/share.svg";
import { ellipseAddress } from "../../utils";
import Button from "../reusable/Button";
import Status, { StatusType } from "../reusable/Status";
import { VotingHubAddress } from "../../blockchain/constants";
import Contract from "./components/Contract";
import Results from "./components/Results";
import VoteCard from "./components/VoteCard";
import VotersList from "./components/VotersList";
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from "../../styles/atom-dark.js";
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { useSpaceContext } from "../../utils/contexts/SpaceContext";

interface Votes {
  yes: number;
  no: number;
  abstain: number;
}

const ProposalComponent = ({href}) => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);
  const { value, title, startDate, endDate, tags } = useContext(PreviewContext);

  const [data, setData] = useState<any>({});
  const [status, setStatus] = useState<StatusType>(StatusType.ACTIVE);
  const [votes, setVotes] = useState<Votes>({
    yes: 0,
    no: 0,
    abstain: 0,
  });
  const [ postedOn, setPostedOn ] = useState<string>("");
  const { current, byId } = useContext(ProposalsContext);

  const { votingHub } = useContext(BlockchainContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);
  const { account, chainId, web3 } = useContext(Web3ModalContext);
  const [ receipt, setReceipt ] = useState<any>([]);
  const [ inChainData, setInChainData ] = useState<any>([]);
  const { spaceType } = useSpaceContext();
  const [passingPercentage, setPassingPercentage ] = useState<number>(0);

  const id = parseInt(route.asPath.split("/")[2]);
  const isPreview = route.pathname === "/preview";

  useEffect(() => {
    if (id && current?.proposal !== id) {
      const getData = async () => {
        await byId(id);
      };
      getData().then();
    }
    if (isPreview && account && chainId) {
      setData({
        created: Date.now() / 1000,
        opens: Math.floor(new Date(startDate).getSeconds()),
        closes: Math.floor(new Date(endDate).getSeconds()),
        creator: account,
        title: title,
        tags: tags,
        description: value,
        contract: VotingHubAddress.Networks[chainId][spaceType],
      })
      return
    }

    if(id && current?.proposal === id){
      setData(current);
    }
    // setData(current);
  }, [id, current]);

  useEffect(() => {
    if (!account) return;
    if (receipt.length === 0 && id.toString() !== 'NaN') {
      votingHub?.votingReceipt(id, account).then(
        (receipts) => {
          setReceipt(receipts);
          votingHub?.getProposal(id).then(
            (res) => {
              setInChainData(res)
            }
          ).catch((err) => {
            console.log(err);
          });
          setStatusUpdated(!statusUpdated);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [statusUpdated, id, account]);

  useEffect(() => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(data?.created * 1000);

    setPostedOn(
      date.getDate() +
      " - " +
      months[date.getMonth()] +
      " " +
      date.getFullYear()
    );

  }, [data]);

  useEffect(() => {

    if (!web3 || !account) return;
    votingHub?.getProposal(data.proposal).then((res) => {
      if (!res) return;
      setPassingPercentage(
        parseInt(res[6])/100
      );
    });

    if ((Date.now() / 1000) > Number(data.opens) && (Date.now() / 1000) < Number(data.closes)) {
      setStatus(StatusType.ACTIVE);
    } else if ((Date.now() / 1000) > Number(data.closes)) {
      if (votes.yes / ( votes.yes + votes.no ) >= passingPercentage) {
        setStatus(StatusType.PASSED);
      } else if (votes.yes / ( votes.yes + votes.no ) < passingPercentage) {
        setStatus(StatusType.FAILED);
      }
    }
  }, []);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <div className={styles.userOptions}>
            {!isPreview ? (
            <div
              className={styles.backContainer}
              onClick={() => route.push("/proposals")}
            >
              <Image src={back} alt="Back" width={17} />
              <div className={styles.text}>Back</div>
            </div>
            ) : (
            <div
              className={styles.backContainer}
              onClick={() => route.push("/editor")}
            >
              <Image src={back} alt="Back" width={17} />
              <div className={styles.text}>Back</div>
            </div>
            )}            
            {route.pathname === "/preview" ? (
              <div className={styles.rightContainer}>
                <div onClick={() => route.push("/editor")}>
                  <Button icon={edit} text="Edit" />
                </div>

                {/* <div onClick={() => NotificationManager.error("Beta Test Notification: This feature is not available yet!")}>
                  <Button icon={publish} text="Publish" />
                </div> */}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.top}>
                  <div className={styles.left}>
                    <div className={styles.icon} />
                    <div className={styles.walletId}>
                      {ellipseAddress(data?.creator)}
                    </div>
                    <div className={styles.postDate}>Posted on {postedOn}</div>
                  </div>

                  <div className={styles.title}>{data?.title}</div>

                  <div className={styles.footer}>
                    <div className={styles.left}>
                      <Status status={status} />

                      <div className={styles.tagList}>
                        {data?.tags &&
                          data?.tags.slice(0, 4).map((value, index) => {
                            return (
                              <div className={styles.tag} key={index}>
                                {data?.tags[index]}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.share}>
                        <a href={`https://twitter.com/intent/tweet?text=Vote%20on%20my%20Proposal%20on%20SnapVox%20at:%20`}>
                        <span>Share on Twitter</span>
                        </a>
                        <img src={share.src} alt="Search" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.infos}>
                  <div className={styles.text}>
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              language={match[1]}
                              PreTag="div"
                              style={atomDark}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                      {data?.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              <div className={styles.sides}>
                <VoteCard voterChoice={receipt.voterChoice} hasVoted={receipt.hasVoted} data={inChainData} />
                <Results data={inChainData} />
                <VotersList id={id}/>
                <Contract
                  contractAddress={data?.contract}
                  link={`${ExplorerUrl.Networks[chainId ? chainId : 50]
                    }xdc${String(data?.contract).slice(
                      2,
                      String(data?.contract).length
                    )}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComponent;
