import { Corporation, CreateOrUpdateCorporationInput } from "@/common/models";
import { apolloClient } from "@/plugins/apollo";
import { Message } from "element-ui";
import CreateOrUpdateCorporation from "./CreateOrUpdateCorporation.graphql";

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
