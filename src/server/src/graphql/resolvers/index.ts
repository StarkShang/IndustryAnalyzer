import _ from "lodash";
import concept from "./concept";

const multiMerge = (arr: Record<string, any>[]) => arr.reduce((state, item) => _.merge(state, item), arr[0]);

export default multiMerge([
    concept
]);
