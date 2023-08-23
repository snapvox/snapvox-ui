import { createContext, useState } from "react";
import type { Proposal, Tag } from "../../services/api";
import { getAllProposals, getProposal, fullTextSearch, getProposalsByTag, getProposalByContract } from "../../services/api";

interface IProposalsContext {
    proposals: Proposal[];
    current: Proposal;
    query(query: string): any;
    byId(id: number): any;
    byTag(tag: Tag): any;
    clear(): any;
    all(): any;
    byContract(contract: string): any;
    loading: boolean;
}

export const ProposalsContext = createContext<IProposalsContext>({} as IProposalsContext);

const ProposalsProvider = ({ children }) => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [current, setCurrent] = useState<Proposal>({} as Proposal);
    const [loading, setLoading] = useState<boolean>(false);

    const all = async () => {
        setLoading(true);
        await getAllProposals().then(
            (result) => {
                // order descending by data.proposal
                result?.data.sort((a, b) => b.proposal - a.proposal);
                setProposals(result?.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const query = async (query: string) => {
        setLoading(true);
        await fullTextSearch(query).then(
            (result) => {
                result?.data.sort((a, b) => b.proposal - a.proposal);
                setProposals(result?.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const byId = async (id: number) => {
        setLoading(true);
        await getProposal(id).then(
            (result) => {
                setCurrent(result?.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const byTag = async (tag: Tag) => {
        setLoading(true);
        await getProposalsByTag(tag).then(
            (result) => {
                result?.data.sort((a, b) => b.proposal - a.proposal);
                setProposals(result?.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const byContract = async (contract: string) => {
        setLoading(true);
        await getProposalByContract(contract).then(
            (result) => {
                result?.data.sort((a, b) => b.proposal - a.proposal);
                setProposals(result?.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const clear = () => {
        setProposals([]);
    }


    return (
        <ProposalsContext.Provider value={{ proposals, current, query, byId, all, byTag, byContract, clear, loading }}>
            {children}
        </ProposalsContext.Provider>
    )
}

export default ProposalsProvider;