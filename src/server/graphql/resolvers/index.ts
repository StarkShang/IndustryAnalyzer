import _ from "lodash";
import hello from "./hello";

const multiMerge = (arr: Record<string, any>[]) => arr.reduce((state, item) => _.merge(state, item), arr[0]);

export default multiMerge([
    hello
]);
