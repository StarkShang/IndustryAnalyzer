import { Message } from "element-ui";
import { apolloClient } from "@/plugins/apollo";
import {
    ConceptRelatedCorporationInfo,
    Connection,
    Corporation,
    CreateConceptRelatedCorporationInput,
    CreateOrUpdateCorporationInput
} from "@/common/models";

import CreateOrUpdateCorporation from "./CreateOrUpdateCorporation.graphql";
import SearchCorporation from "./SearchCorporation.graphql";
import CreateConceptRelatedCorporations from "./CreateConceptRelatedCorporations.graphql";

export async function createOrUpdateCorporation(input: CreateOrUpdateCorporationInput): Promise<Corporation | null> {
    if (!input.name || !input.country) { return null; }
    try {
        const response = await apolloClient.mutate({
            mutation: CreateOrUpdateCorporation,
            variables: { input }
        });
        return response.data.createOrUpdateCorporation as Corporation;
    } catch (error) {
        console.error(error);
        Message.error(input.id ? "更新企业失败" : "创建企业失败");
        return null;
    }
}

export async function searchCorporations(keyword: string): Promise<Corporation[]> {
    if (!keyword) { return []; }
    try {
        const response = await apolloClient.query({
            query: SearchCorporation,
            variables: { keyword }
        });
        const corporations = response.data.searchCorporation as Connection<Corporation>;
        return corporations.edges.map(edge => edge.node);
    } catch (error) {
        console.error(error);
        Message.error("搜索企业失败");
        return [];
    }
}

export async function createConceptRelatedCorporations(input: CreateConceptRelatedCorporationInput[]): Promise<ConceptRelatedCorporationInfo[]> {
    if (!input || input.length <= 0) { return []; }
    try {
        const response = await apolloClient.mutate({
            mutation: CreateConceptRelatedCorporations,
            variables: { input }
        });
        return response.data.createConceptRelatedCorporations as ConceptRelatedCorporationInfo[];
    } catch (error) {
        console.error(error);
        Message.error("添加企业失败");
        return [];
    }
}
